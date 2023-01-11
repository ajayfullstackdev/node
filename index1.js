const fs = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeFile = (path, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, data, (err) => {
      if (err) return rej("file doesn't exist !");
      res("successfully written !");
    });
  });
};

const readlineAskQ = (question) => {
  return new Promise((res, rej) => {
    readline.question(question, (ans) => {
      if (!question) {
        return rej("Ask question !");
      }

      res(ans);
    });
  });
};

console.log("Welcome to user Regsitration System ?");

const processReadline = async () => {
  let name = await readlineAskQ("What's your Name: ");
  let age = await readlineAskQ("What's your Age: ");
  let Professional = await readlineAskQ("What's your Professional: ");

  await writeFile("user.json", JSON.stringify({ name, age, Professional }));
  readline.close();
};

processReadline();
