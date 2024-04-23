const fs = require("fs");
const readline = require("readline");
fs.open("date.txt", "w", (err) => {
  if (err) {
    console.log(err.message);
  }
});
const stream = fs.createWriteStream("date.txt");
const currentDate = new Date().toLocaleString();
stream.write(` ${currentDate}\n`);
stream.end();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Enter a string: ", (inputString) => {
  const stream = fs.createWriteStream("date.txt");
  stream.write(`${inputString}\n`);
  stream.end();
  console.log("String written to tp.txt successfully!");
  rl.close();
});