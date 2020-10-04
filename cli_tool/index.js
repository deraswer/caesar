const { program } = require("commander");
const doRead = require("./stdinread");
const encode = require("./encodeCaesar");
const savewrite = require('./writeFile')
const fs = require("fs");

program.version("0.0.1");

program
  .requiredOption("-s, --shift <number>", "a shift")
  .option("-i, --input <string>", "an input file")
  .option("-o, --output <string>", "an output file")
  .requiredOption("-t, --task <type>", "an action encode or decode")

program.parse(process.argv);


if (program.task == "encode") {
  if (program.input === undefined) {

    doRead().then(function(str) {
      
      let encodedData = encode(str, program.shift)

      if (program.output === undefined) {
        console.log(`Encoded data --> ${encodedData}`)
      } else {
        savewrite(String(program.output), encodedData);
        console.log(`Encoded data saved to --> ${program.output}`)
      }
   
   })
  } else {
    fs.readFile(String(program.input), "utf8", (err, data) => {
      if(err) console.log('Error occured check filenames or permissons.');
      console.log(`Readed data from file ${program.input}`)
      let encodedData = encode(data, program.shift)

      if (program.output === undefined) {
        console.log(`Encoded data --> ${encodedData}`)
      } else {
        savewrite(String(program.output), encodedData);
        console.log(`Encoded data saved to --> ${program.output}`)
      }
    })
  }
} else {
  if (program.input === undefined) {

    doRead().then(function(str) {
      let decodedData = encode(str, -program.shift)

      if (program.output === undefined) {
        console.log(`Decoded data --> ${decodedData}`)
      } else {
        savewrite(String(program.output), decodedData);
        console.log(`Decoded data saved to --> ${program.output}`)
      }
   
   })
  } else {
    fs.readFile(String(program.input), "utf8", (err, data) => {
      if(err) console.log('Error occured check filenames or permissons.');
      console.log(`Readed data from file ${program.input}`)
      let decodedData = encode(data, -program.shift)

      if (program.output === undefined) {
        console.log(`Decoded data --> ${decodedData}`)
      } else {
        savewrite(String(program.output), decodedData);
        console.log(`Decoded data saved to --> ${program.output}`)
      }
    })
  }
}
