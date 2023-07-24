const ADSReadSymbol = require("./src/adsReadSymbol");
const PDFCreator = require("./src/pdfCreator");

async function makePdfFromSymbol () {

  const pdf = new PDFCreator("C:/temp/myPdf.pdf", "C:/temp/Template.json");
  const data = await ADSReadSymbol.getValueFromClient(
    "Main.myVariable",
    "127.0.0.1.1.1",
    851
  );

  await pdf.create(data);

}
makePdfFromSymbol();
