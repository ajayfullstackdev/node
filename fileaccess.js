import fs from "fs";

const readFile = (pathName) => {
  return new Promise((res, rej) => {
    fs.readFile(pathName, "utf-8", (err, data) => {
      if (err) {
        return rej("File doesn't exist !");
      }

      res(data);
    });
  });
};

const writeFile = (pathName, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(pathName, data, (err) => {
      if (err) {
        return rej("File doesn't exist !");
      }

      res("Secessfully added !");
    });
  });
};

export { readFile, writeFile };
