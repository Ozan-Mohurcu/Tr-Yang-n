const { chromium } = require('playwright-extra');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

(async () => {
  console.log('🔥 Twitter Scraper - Yangın Tweetleri');
  console.log('=============================================\n');

  const username = await question('Twitter kullanıcı adınızı girin: ');
  const password = await question('Twitter şifrenizi girin: ');

  rl.close();

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n🔐 Twitter\'a giriş yapılıyor...');
  await page.goto('https://twitter.com/login');
  await page.waitForTimeout(3000);
  await page.fill('input[name="text"]', username);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  await page.fill('input[name="password"]', password);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(10000);

  const keyword = 'yangın OR "orman yangını" OR itfaiye OR alev OR duman OR yanıyor OR "yangın var"';
  console.log(`\n🔍 Yangın ile ilgili tweetler aranıyor...`);
  await page.goto(`https://twitter.com/search?q=${encodeURIComponent(keyword)}%20lang%3Atr&src=typed_query&f=live`);
  await page.waitForTimeout(7000);

  const csvPath = './yangin_tweets.csv';
  const headers = ['Author', 'Date', 'Likes', 'Replies', 'Reposts', 'Text', 'Hashtag'];

  const existingKeys = new Set();
  if (fs.existsSync(csvPath)) {
    const lines = fs.readFileSync(csvPath, 'utf-8').split('\n').slice(1);
    for (const line of lines) {
      const cols = line.split(',');
      const key = cols[0] + cols[1];
      existingKeys.add(key);
    }
  } else {
    fs.writeFileSync(csvPath, headers.join(',') + '\n', 'utf-8');
  }

  const matchedTerms = [
    "yangın", "yangin", "orman yangını", "orman yangini", "itfaiye",
    "yanıyor", "yanıyorlar", "alev", "alevler", "duman", "yangın var",
    "ateş", "tutuştu", "yanmaya", "yangına", "yangından", "yangındayız"
  ];

  const tweets = new Set();
  const tweetData = [];

  console.log('\n📊 Tweet toplama başladı...\n');

  while (tweetData.length < 50000) {
    const retryBtn = await page.$('div[role="button"]:has-text("Retry")');
    if (retryBtn) {
      console.log("🔄 Retry bulundu, tıklanıyor...");
      await retryBtn.click();
      await page.waitForTimeout(8000);
    }

    const elements = await page.$$('article');
    if (elements.length === 0) {
      console.log("⛔ Tweet bulunamadı, sayfa yeniden yükleniyor...");
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(10000);
      continue;
    }

    for (let el of elements) {
      try {
        const contentEl = await el.$('div[lang]');
        const text = await contentEl?.textContent() || '';
        if (!text) continue;

        const lowerText = text.toLowerCase();
        if (!matchedTerms.some(term => lowerText.includes(term))) continue;

        const turkishCharRatio = (text.match(/[a-zçğışöüA-ZÇĞİŞÖÜ]/g) || []).length / text.length;
        if (turkishCharRatio < 0.7) continue;

        const authorEl = await el.$('a[role="link"][href^="/"]');
        const author = await authorEl?.getAttribute('href') || '';
        const timestampEl = await el.$('time');
        const date = await timestampEl?.getAttribute('datetime') || '';

        const metricsEl = await el.$$('[data-testid="app-text-transition-container"]');
        const likes = metricsEl[0] ? await metricsEl[0].textContent() : '0';
        const replies = metricsEl[1] ? await metricsEl[1].textContent() : '0';
        const retweets = metricsEl[2] ? await metricsEl[2].textContent() : '0';

        const row = {
          Author: author.replace('/', '@'),
          Date: date,
          Likes: likes.trim(),
          Replies: replies.trim(),
          Reposts: retweets.trim(),
          Text: text.trim().replace(/\s+/g, ' '),
          Hashtag: 'yangin'
        };

        const rowKey = row.Author + row.Date;
        if (tweets.has(rowKey) || existingKeys.has(rowKey)) continue;

        tweets.add(rowKey);
        tweetData.push(row);

        console.log(`\n📢 @${row.Author} (${row.Date})\n❤️ ${row.Likes} 🔁 ${row.Reposts} 💬 ${row.Replies}\n📝 ${row.Text}\n`);

        const line = headers.map(h => `"${(row[h] || '').replace(/"/g, '""')}"`).join(',');
        fs.appendFileSync(csvPath, line + '\n', 'utf-8');
      } catch {
        continue;
      }
    }

    if (tweetData.length % 10000 === 0 && tweetData.length > 0) {
      console.log("🔁 DOM temizliği için sayfa yenileniyor...");
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(10000);
    }

    if (tweetData.length % 2500 === 0 && tweetData.length > 0) {
      const rest = 60000 + Math.floor(Math.random() * 40000);
      console.log(`🛌 Dinlenme molası: ${rest / 1000} saniye`);
      await page.waitForTimeout(rest);
    }

    await page.mouse.wheel(0, 1500 + Math.floor(Math.random() * 1500));
    await page.waitForTimeout(4000 + Math.floor(Math.random() * 3000));
  }

  console.log(`\n✅ Toplam ${tweetData.length} tweet kaydedildi → ${csvPath}`);
  await browser.close();
})();
