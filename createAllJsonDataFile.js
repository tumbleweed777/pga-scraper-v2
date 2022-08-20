const path = require("path");
const fsPromises = require("fs/promises");


const appendToFile = (dataList) => {
  for (const data of dataList) {
    await fsPromises.appendFile("AllGolfCourseJsonData.txt", data);
  }
};

async function main() {
  const dataPathOne = path.join(__dirname, "");

  const dataPathTwo = path.join(__dirname, "");

  const dataOne = await fsPromises.readFile(dataPathOne, "utf8");

  const dataTwo = await fsPromises.readFile(dataPathTwo, "utf8");

  golfCourseDataOne = dataOne.split("\r\n");

  golfCourseDataTwo = dataTwo.split("\r\n");

  appendToFile(golfCourseDataOne)
  appendToFile(golfCourseDataTwo)
}

main();