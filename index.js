var fs = require("fs");
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
            readXlsxFile(path).then((rows) => {
                // `rows` is an array of rows
                // each row being an array of cells.
                console.log("");
            })
            break;
        default:
            break;
    }
}

function getExtension(fn) {
    var i = fn.lastIndexOf('.');
    return (i < 0) ? '' : fn.substr(i);
}


