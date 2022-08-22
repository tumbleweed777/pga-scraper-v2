const path = require("path");
const fs = require("fs");

function addToFile(textFile) {
  const dataPath = path.join(__dirname, `${textFile}.txt`);
  const data = fs.readFileSync(dataPath, "utf8");

  golfCourseData = data.split("\r\n");

  for (const data of golfCourseData) {
    fs.appendFileSync("GolfCourseJsonDataPrincipal.txt", `${data}\r\n`);
  }
}

function main() {
  addToFile("GolfCourseJsonDataUno");
  addToFile("GolfCourseJsonDataDos");
}

main();
