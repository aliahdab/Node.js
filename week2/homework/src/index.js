'use strict';

const fs = require('fs');

let jsSt = fs.readFileSync('./todo.json');

if (!process.argv[2] || process.argv[2] === 'help') {
  fs.readFile('./help.txt', 'utf8', (err, data) => {
    if (err) {
      console.log('Error');
    }
    console.log(data);
  });
}

if (process.argv[2] === 'add') {
  if (Object.entries(jsSt).length === 0) {
    jsSt = new Object();
    jsSt[process.argv[3]] = process.argv[4];

    fs.writeFile('./todo.json', JSON.stringify(jsSt), err => {
      if (err) throw err;
      console.log('object added');
    });
  } else {
    let data = JSON.parse(jsSt);
    let newKey = process.argv[3];
    let newVal = process.argv[4] + ' ' + process.argv[5];
    data[newKey] = newVal;
    console.log(JSON.stringify(data));
    fs.writeFile('./todo.json', JSON.stringify(data), err => {
      if (err) throw err;
      console.log('object added');
    });
  }
}

if (process.argv[2] === 'list') {
  fs.readFile('./todo.json', (err, data) => {
    let result = JSON.parse(data);
    if (err) {
      console.log('Error');
    }
    output(result);
  });
}

if (process.argv[2] === 'remove') {
  fs.readFile('./todo.json', (err, data) => {
    let result = JSON.parse(data);
    if (err) {
      console.log('Error');
    }
    let key = process.argv[3];
    delete result[key];
    fs.writeFile('./todo.json', JSON.stringify(result), err => {
      if (err) throw err;
      console.log('Object deleted');
    });
    console.log(result);
  });
}

if (process.argv[2] === 'reset') {
  fs.writeFile('./todo.json', '', err => {
    if (err) {
      console.log('Error');
    }
    console.log('reset');
  });
}

const output = res => {
  for (let [key, value] of Object.entries(res)) {
    console.log(`${value}`);
  }
};
