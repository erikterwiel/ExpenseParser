const fs = require("fs");
const prompt = require("prompt");
const parse = require("csv-parse");
const generate = require("csv-generate");
const vendorToNick = require("../../config/vendorToNick");

class ParseManager {

  async run() {
    prompt.start();
    prompt.get(["test"], (error, result) => {
      console.log(result.test);
    });
    const data = await this.fetchData();
    const sortedData = data.map(transaction => {

      // date
      const parsedTransaction = [];
      const splitDate = transaction[0].split("/");
      parsedTransaction[0] = `${parseInt(splitDate[0])}/${parseInt(splitDate[1])}/${splitDate[2]}`;

      // nick
      if (vendorToNick[transaction[1]]) {
        parsedTransaction[2] = vendorToNick[transaction[1]];
        console.log("happyword1")
      } else {

        console.log("aaaaaaaaaaA")
      }


      // category
      parsedTransaction[1] = "Test";


      return parsedTransaction;
    });
    console.log(sortedData);

  }

  async fetchData() {
    return new Promise(resolve => {
      const data = [];
      fs.createReadStream("./input/data.csv")
        .pipe(parse({ delimiter: ":" }))
        .on("data", row => data.push(row[0].split(",")))
        .on("end", () => resolve(data))
    })
  }
}

module.exports = ParseManager;
