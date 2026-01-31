const puppeteer = require('puppeteer');
const path = require('path');

async function generatePlaquette() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, 'plaquette-commerciale.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  // Format A4
  await page.pdf({
    path: 'plaquette-commerciale-belitei.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log('Plaquette commerciale générée : plaquette-commerciale-belitei.pdf');
}

generatePlaquette().catch(console.error);
