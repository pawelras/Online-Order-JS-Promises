const {checkStock, processOrder, shipOrder} = require("./library.js")

const order = {
    items: [['laptops', 1], ['tablets', 2]], 
    ballance: 625.00
};


checkStock(order)
.then((resolvedValue2) => {
    return processOrder(resolvedValue2)
    })
.then((resolvedValue3) => {
    return shipOrder(resolvedValue3)
      })
.then((resolvedValue4) => {
    console.log(resolvedValue4)
      })
.catch((errorMessage) => {
    console.log(errorMessage);
      });