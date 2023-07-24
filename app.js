const ADSReadSymbol = require("./src/adsReadSymbol");
const PDFCreator = require("./src/pdfCreator");

const args = process.argv.slice(2);

const pdfPath = args[0];
const templatePath = args[1];
const variable = args[2];
const address = args[3] || '127.0.0.1.1.1';
const port = args[4] || 851;

if (!pdfPath) {
  console.error('Error: PDF path is not provided. Exiting...');
  process.exit(1);
}

if (!templatePath) {
  console.error('Error: Template path is not provided. Exiting...');
  process.exit(1);
}

if (!variable) {
  console.error('Error: Variable name is not provided. Exiting...');
  process.exit(1);
}

async function makePdfFromSymbol () {
  const pdf = new PDFCreator("C:/temp/myPdf.pdf", "C:/temp/Template.json");
  const data = await ADSReadSymbol.getValueFromClient(
    variable,
    address,
    port
  );

  await pdf.create(data);
}

makePdfFromSymbol();