const [, , operation, a, b] = process.argv;

let output;

switch (operation) {
  case "add":
    output = Number(a) + Number(b);
    break;

  case "sub":
    output = Number(a) - Number(b);
    break;

  case "mul":
    output = Number(a) * Number(b);
    break;

  default:
    output = "Invalid entry";
}

console.log(output);
