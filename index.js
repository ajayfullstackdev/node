const fs = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to user Regsitration System ?");

readline.question(`What's your name?`, (name) => {
  let username = name;

  readline.question(`What's your age?`, (age1) => {
    let age = age1;

    readline.question(`What's your professions?`, (job1) => {
      let job = job1;

      fs.appendFile(
        "user.txt",
        JSON.stringify({ username, age, job }),
        (err) => {
          if (err) return console.log(err);
          readline.close();
        }
      );
    });
  });
});
