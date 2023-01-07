import fs from "fs";

const readFile = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) return rej("file doesn't exist !");
      res(data);
    });
  });
};

export { readFile };
