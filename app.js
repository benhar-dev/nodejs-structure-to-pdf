const ADSReadSymbol = require("./src/adsReadSymbol");
const PDFCreator = require("./src/pdfCreator");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const path = require("path");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 -v <variable> [options]")
  .example("$0 -v Main.myReport", "Uses default template and output path")
  .option("pdfPath", {
    alias: "p",
    type: "string",
    default: path.join(__dirname, "output", "report.pdf"),
    description: "The path to the output PDF file.",
  })
  .option("templatePath", {
    alias: "t",
    type: "string",
    default: path.join(__dirname, "template", "template.json"),
    description: "The path to the template file.",
  })
  .option("variable", {
    alias: "v",
    type: "string",
    demandOption: true,
    description: "The name of the PLC variable (e.g., Main.myReport).",
  })
  .option("address", {
    alias: "a",
    type: "string",
    default: "127.0.0.1.1.1",
    description: "The ADS Net ID of the target PLC.",
  })
  .option("port", {
    alias: "r",
    type: "number",
    default: 851,
    description: "The ADS port.",
  })
  .help().argv;

async function makePdfFromSymbol() {
  const pdf = new PDFCreator(argv.pdfPath, argv.templatePath);
  const data = await ADSReadSymbol.getValueFromClient(
    argv.variable,
    argv.address,
    argv.port
  );

  await pdf.create(data);
}

makePdfFromSymbol();
