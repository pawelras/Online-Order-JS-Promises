const order = {
    items: [['laptops', 1], ['tablets', 2]], 
    ballance: 425.00
};


const stock = {
    laptops: {
        number: 350,
        price: 250.00
    }, 

    tablets: {
        number: 200,
        price: 125.00
    },

    smartphones: {
        number: 350,
        price: 250
    }
}

const checkStock = (order) => {
      return new Promise((resolve, reject) => {
        console.log('Checking stock for selected items');

        setTimeout(()=> {
            let itemsArr = order.items;
            let inStock = itemsArr.every(item => stock[item[0]].number >= item[1]);
                   
            if (inStock) {
                let total = 0;
                
                itemsArr.forEach(item => {
                total += item[1] * stock[item[0]].price
                ;
                });
                    resolve([order, total])
                    console.log(`All items are in stock, the total price is £${total}`)
                
            } else {
                reject('Order could not be comleted as some items are out of stock')
            }
        }, 2000)
      })
    }

const processOrder = (responseArr) => {
        let order = responseArr[0];
        let total = responseArr[1];

        return new Promise((resolve, reject) => {
            setTimeout(() => {
            let hasEnoughMoney = order.ballance <= total;
            if (hasEnoughMoney) {
                let trackingNum = generateTrackingNumber();
                console.log(`Payment successful, processing shipping`);
                resolve([order, trackingNum])
            } else {
                reject('Could not process payment. Please top up your ballance')
            }
            }, 2000)
        })
    }

const shipOrder = (responseArr) => {
    let order = responseArr[0];
    let trackingNum = responseArr[1];

    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve(`Your order has been processed and your tracking number is ${trackingNum} `)

        }, 2000)
    })
}



    function generateTrackingNumber() {
        return Math.floor(Math.random() * 1000000);
      }

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