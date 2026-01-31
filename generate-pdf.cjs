const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF(htmlFile, pdfFile, options = {}) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, htmlFile);
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  const pdfOptions = {
    path: pdfFile,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    ...options
  };

  await page.pdf(pdfOptions);

  await browser.close();
  console.log(`PDF généré : ${pdfFile}`);
}

(async () => {
  // Cartes de visite anciennes : 85mm x 55mm
  await generatePDF('carte-recto-blanc.html', 'carte-recto-blanc.pdf', {
    width: '85mm',
    height: '55mm'
  });
  await generatePDF('carte-verso-noir.html', 'carte-verso-noir.pdf', {
    width: '85mm',
    height: '55mm'
  });

  // Cartes de visite premium : 85mm x 55mm
  await generatePDF('carte-visite-premium-recto.html', 'carte-visite-premium-recto.pdf', {
    width: '85mm',
    height: '55mm'
  });
  await generatePDF('carte-visite-premium-verso.html', 'carte-visite-premium-verso.pdf', {
    width: '85mm',
    height: '55mm'
  });

  // Plaquette commerciale : A4
  await generatePDF('plaquette-commerciale.html', 'plaquette-commerciale-belitei.pdf', {
    format: 'A4'
  });

  console.log('Tous les PDFs ont été générés !');
})();
