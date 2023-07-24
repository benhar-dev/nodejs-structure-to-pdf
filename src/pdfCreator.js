const fs = require("fs");
const fsPromises = fs.promises;
const PdfPrinter = require("pdfmake");
const _ = require("lodash");
const path = require("path");

module.exports = class PDFCreator {
  constructor(outputFile, templateFile) {
    this.outputFile = outputFile;
    this.templateFile = templateFile;
  }

  async create(data) {
    const printer = this.createPdfPrinter();
    const docDefinition = await this.createDocumentDefinition(data);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(
      fs.createWriteStream(this.outputFile)
    );
    pdfDoc.end();
  }

  createPdfPrinter() {
    return new PdfPrinter({
      Roboto: {
        normal: path.join(
          __dirname,
          "../node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf"
        ),
        bold: path.join(
          __dirname,
          "../node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf"
        ),
      },
    });
  }

  async createDocumentDefinition(data) {
    const template = await fsPromises.readFile(this.templateFile, "utf8");
    const compiled = _.template(template);
    const documentDefinition = compiled(data);
    return JSON.parse(documentDefinition);
  }
};
