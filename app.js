const ADSReadSymbol = require("./src/adsReadSymbol");
const PDFCreator = require("./src/pdfCreator");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .option("pdfPath", { alias: "p", type: "string", demandOption: true, description: "The path to the PDF file." })
  .option("templatePath", { alias: "t", type: "string", demandOption: true, description: "The path to the template file." })
  .option("variable", { alias: "v", type: "string", demandOption: true, description: "The variable." })
  .option("address", { alias: "a", type: "string", default: '127.0.0.1.1.1', description: "The address." })
  .option("port", { alias: "r", type: "number", default: 851, description: "The port." })
  .help()
  .argv;

async function makePdfFromSymbol () {
  const pdf = new PDFCreator(argv.pdfPath, argv.templatePath);
  const data = await ADSReadSymbol.getValueFromClient(
    argv.variable,
    argv.address,
    argv.port
  );

  await pdf.create(data);
}

makePdfFromSymbol();
