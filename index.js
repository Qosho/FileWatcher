var fs = require("fs");
var XLSX = require("xlsx");
//Define directory to watch
var filePath = __dirname;
var watching = false;

fs.watch(filePath, function (event, fileName) {
    if (watching) return;
    watching = true;
    if (fs.existsSync(filePath + "\\" + fileName)) {
        if (getExtension(fileName) === ".csv" || getExtension(fileName) === ".xls" || getExtension(fileName) === ".xlsx") {
            readFile(getExtension(fileName), filePath + "\\" + fileName);
        }
    } else
        console.log("File " + fileName + " was erased");

    setTimeout(() => {
        watching = false;
    }, 100);
})

function readFile(extension, path) {
    switch (extension) {
        case ".csv":
            console.log("Reading a csv");
            break;
        case ".xls":
            console.log("Reading a xls");
            break;
        case ".xlsx":
            console.log("Reading a xlsx");
            var workbook = XLSX.readFile(path);
            const sheet_list = workbook.SheetNames;
            console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_list[0]]));
            break;
        default:
            break;
    }
}

function getExtension(fn) {
    var i = fn.lastIndexOf('.');
    return (i < 0) ? '' : fn.substr(i);
}


