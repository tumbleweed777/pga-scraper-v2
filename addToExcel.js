const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

function convertJsonToExcel() {
  const dataPath = path.join(__dirname, "CompleteGolfCourseData.txt");

  const data = fs.readFileSync(dataPath, "utf8");
  const golfCourseJsonStringData = data.split("\r\n");

  let golfCourseJsonData = [];
  for (const data of golfCourseJsonStringData) {
    const obj = JSON.parse(data);
    golfCourseJsonData.push(obj);
  }

  const worksheet = xlsx.utils.json_to_sheet(golfCourseJsonData);
  const workbook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(workbook, worksheet, "Golf Course Directory");

  xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });

  xlsx.write(workbook, { bookType: "xlsx", type: "binary" });

  xlsx.writeFile(workbook, "golfCourseDataHttp.xlsx");
}

convertJsonToExcel();
