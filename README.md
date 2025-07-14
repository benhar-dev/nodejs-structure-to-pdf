# Structure to PDF

## Disclaimer

This is a personal guide not a peer reviewed journal or a sponsored publication. We make
no representations as to accuracy, completeness, correctness, suitability, or validity of any
information and will not be liable for any errors, omissions, or delays in this information or any
losses injuries, or damages arising from its display or use. All information is provided on an as
is basis. It is the reader’s responsibility to verify their own facts.

The views and opinions expressed in this guide are those of the authors and do not
necessarily reflect the official policy or position of any other agency, organization, employer or
company. Assumptions made in the analysis are not reflective of the position of any entity
other than the author(s) and, since we are critically thinking human beings, these views are
always subject to change, revision, and rethinking at any time. Please do not hold us to them
in perpetuity.

## Overview

This tool reads a PLC structure variable using ADS, applies its contents to a PDF template, and outputs a nicely formatted document.  
It’s ideal for generating reports, logs, or forms directly from structured PLC data.

An example of the output can be found [here](./output/report.pdf)

## Screenshot

![image](./docs/images/Screenshot.png)

## Getting Started

### Dependencies

- Node.js (v18.16.1 or later recommended)
- TwinCAT 4024.65 or later

---

### Installation

```bash
git clone https://github.com/benhar-dev/nodejs-structure-to-pdf.git
cd nodejs-structure-to-pdf
npm install
```

---

## Usage

### 1. Prepare the TwinCAT program

Make sure the TwinCAT runtime is running. A sample project is included under the `twincat/` folder.

### 2. Prepare the template

Edit `./template/template.json` to define the layout and data bindings for your report.  
You can use Lodash-style syntax like `<%= myValue %>` for variables.

### 3. Run the program

```bash
# Using default template and output paths
npm start
```

By default, the program will:

- Read from `./template/template.json`
- Write output to `./output/report.pdf`
- Use `127.0.0.1.1.1:851` as the ADS target

#### Optional full usage:

```bash
node app.js \
  --pdfPath "./output/custom-report.pdf" \
  --templatePath "./template/template.json" \
  --variable "Main.myReport" \
  --address "127.0.0.1.1.1" \
  --port 851
```

#### Shorthand version:

```bash
node app.js -p "./output/custom-report.pdf" -t "./template/template.json" -v "Main.myReport" -a "127.0.0.1.1.1" -r 851
```

### CLI Help

```bash
node app.js --help
```

Outputs:

```
Options:
  -p, --pdfPath       Output PDF path [default: ./output/report.pdf]
  -t, --templatePath  Template JSON path [default: ./template/template.json]
  -v, --variable      PLC structure variable name (e.g. Main.myReport) [required]
  -a, --address       ADS Net ID [default: 127.0.0.1.1.1]
  -r, --port          ADS Port [default: 851]
  --help              Show help
  --version           Show version
```
