const csv = require('csvtojson');
const transactions = [];

csv().fromFile('./presto-transactions.csv')
  .on('json', jsonObj => {
    let transaction;
    const { Amount, Date } = jsonObj;
    const isBeforeJuly = Number(Date.charAt(0)) < 7;
    const isNegativeNumber = Amount.indexOf('(') >= 0;
    if(isNegativeNumber && isBeforeJuly) {
      transaction = Number(Amount.replace('$', '').replace('(', '').replace(')', ''));
      transaction = -transaction;
      transactions.push(transaction);
    } else if(isBeforeJuly) {
      transaction = Number(Amount.replace('$', ''));
      transactions.push(transaction);
    }
  })
  .on('done', (error) => {
    const add = (a, b) => a + b;
    console.log(
      transactions.reduce(add, 0)
    )
  })
