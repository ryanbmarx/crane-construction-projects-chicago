/*
EXAMPLE USAGE
node scripts/downloadCSV.js "https://docs.google.com/spreadsheets/d/13HClfuz0V9fXLvdNRHllJW64Mue1JPOSe5kRU7aVYc4/pub?gid=125096750&single=true&output=csv" "./data/temps-data.csv"
*/

var fs = require('fs'),
  request = require('request');

var url = process.argv[2],
	outputPath = process.argv[3];

request
  .get(url)
  .on('error', function(err) {
    // handle error
  })
  .pipe(fs.createWriteStream(outputPath));

