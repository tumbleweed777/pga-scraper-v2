const fsPromises = require("fs/promises");
const path = require("path");

async function main() {
  const dataPath = path.join(__dirname, "GolfCourseJsonDataPrincipal.txt");
  const urlsPath = path.join(__dirname, "allGolfCourseUrlPaths.txt");

  const jsonData = await fsPromises.readFile(dataPath, "utf8");
  const urlsData = await fsPromises.readFile(urlsPath, "utf8");

  const golfCourseJsonData = jsonData.split("\r\n");
  const urlPathList = urlsData.split("\r\n");

  let i = 0;
  for (const data of golfCourseJsonData) {
    const dataObject = JSON.parse(data);

    golfCourseUrl = urlPathList[i];

    dataObject["urlPath"] = `https://www.pga.com${golfCourseUrl}`;
    console.log(dataObject);

    golfCourseJson = `${JSON.stringify(dataObject)}\r\n`;

    await fsPromises.appendFile("CompleteGolfCourseData.txt", golfCourseJson);

    i++;
  }
}

main();
