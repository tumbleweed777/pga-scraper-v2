const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const path = require("path");

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const data = await fs.readFile(
    path.join(__dirname, "allGolfCourseUrlPaths.txt"),
    "utf8"
  );

  const allGolfCourseUrlPaths = data.split("\r\n");

  paths = allGolfCourseUrlPaths.slice();

  for (const path of paths) {
    await page.goto("https://www.pga.com" + path);

    const courseData = await page.evaluate(() => {
      const courseName = document.querySelector(
        "#__next > div > div > div > div > div > div > div > h4"
      ).textContent;

      const courseLocation = document.querySelector(
        "#__next > div > div > div > div > div > div > div > div > div > a"
      ).textContent;

      const coursePhoneNumber = Array.from(
        document.querySelectorAll(
          "#__next > div > div > div > div > div > div > div > div > div > a"
        )
      ).map((x) => {
        return x.textContent;
      })[1];

      const pgaProfessionals = Array.from(
        document.querySelectorAll(
          "#__next > div > div > div > div > div > div > div > div > a > div > div > h6"
        )
      ).map((x) => {
        return {
          name: x.textContent,
          title: x.nextElementSibling.textContent,
        };
      });

      return {
        courseName,
        courseLocation,
        coursePhoneNumber: coursePhoneNumber ? coursePhoneNumber : "N/A",
        pgaProfessionals,
      };
    });

    const { courseName, courseLocation, coursePhoneNumber, pgaProfessionals } =
      courseData;

    const splitLocation = courseLocation.split(", ");
    const stateAndZip = splitLocation.pop();
    const stateAndZipSplit = stateAndZip.split("  ");
    const zipCode = stateAndZipSplit[1];
    const state = stateAndZipSplit[0];
    const city = splitLocation.pop();
    const address = splitLocation.join(", ");

    const courseJson = {
      courseName,
      address,
      city,
      state,
      zipCode,
      coursePhoneNumber,
    };

    let i = 1;
    for (const pro of pgaProfessionals) {
      courseJson[`proName${i}`] = pro.name;
      courseJson[`protitle${i}`] = pro.title;
      i++;
    }

    golfCourseJson = `${JSON.stringify(courseJson)}\r\n`;

    await fs.appendFile("GolfCourseJsonData.txt", golfCourseJson);
  }

  await browser.close();
}

main();
