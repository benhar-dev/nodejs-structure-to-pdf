const fs = require("fs");
const fsPromises = fs.promises;
const PdfPrinter = require("pdfmake");
const _ = require("lodash");
const path = require("path");

const FONT_PATH = path.join(
  __dirname,
  "../node_modules/roboto-font/fonts/Roboto"
);
const FONT_FILES = {
  Roboto: {
    normal: path.join(FONT_PATH, "roboto-regular-webfont.ttf"),
    bold: path.join(FONT_PATH, "roboto-bold-webfont.ttf"),
    italics: path.join(FONT_PATH, "roboto-italic-webfont.ttf"),
    bolditalics: path.join(FONT_PATH, "roboto-bolditalic-webfont.ttf"),
  },
  FiraCode: {
    normal: path.join(
      __dirname,
      "../node_modules/@fontsource/fira-code/files/fira-code-latin-400-normal.woff"
    ),
    bold: path.join(
      __dirname,
      "../node_modules/@fontsource/fira-code/files/fira-code-latin-700-normal.woff"
    ),
    italics: path.join(
      __dirname,
      "../node_modules/@fontsource/fira-code/files/fira-code-latin-400-italic.woff"
    ),
    bolditalics: path.join(
      __dirname,
      "../node_modules/@fontsource/fira-code/files/fira-code-latin-700-italic.woff"
    ),
  },
  Arial: {
    normal: "Helvetica",
  },
};

module.exports = class PDFCreator {
  constructor(outputFile, templateFile) {
    this.outputFile = outputFile;
    this.templateFile = templateFile;
  }

  async create(data) {
    const printer = this.createPdfPrinter();
    const docDefinition = await this.createDocumentDefinition(data);

    const outputDir = path.dirname(this.outputFile);
    await fs.promises.mkdir(outputDir, { recursive: true });

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(this.outputFile));
    pdfDoc.end();
  }

  createPdfPrinter() {
    return new PdfPrinter(FONT_FILES);
  }

  async createDocumentDefinition(data) {
    if (!fs.existsSync(this.templateFile)) {
      throw new Error(`Template file not found: ${this.templateFile}`);
    }
    const template = await fsPromises.readFile(this.templateFile, "utf8");
    const compiled = _.template(template);
    let documentDefinition;
    try {
      documentDefinition = compiled(data);
      return JSON.parse(documentDefinition);
    } catch (err) {
      throw new Error(`Failed to parse template: ${err.message}`);
    }
  }
};
