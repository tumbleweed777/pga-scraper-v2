const fsPromises = require("fs/promises");
const path = require("path");

async function main() {
  const dataPath = path.join(__dirname, "AllGolfGourseJsonData");
  const urlsPath = path.join(__dirname, "allGolfCourseUrlPaths.txt");

  const jsonData = await fsPromises.readFile(dataPath, "utf8");
  const urlsData = await fsPromises.readFile(urlsPath, "utf8");

  const golfCourseJsonData = jsonData.split("\r\n");
  const urlPathList = urlsData.split("\r\n");

  let i = 0;
  for (const data of golfCourseJsonData.splice(0, 20)) {
    const dataObject = JSON.parse(data);
    console.log(dataObject);
  }
}
