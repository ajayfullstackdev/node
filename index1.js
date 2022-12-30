import fs from "fs";
const [, , operation, pathName, value] = process.argv;

let path = pathName;

let output;

switch (operation) {
  case "insert":
    fs.writeFile(path, value, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    break;

  case "update":
    fs.appendFile(path, value, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    break;

  case "read":
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      output = data;
      console.log(output);
    });
    break;

  default:
    output = "Invalid entry";
    console.log(output);
}
