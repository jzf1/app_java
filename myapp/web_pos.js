var express = require('express');
var app = express();
app.get('/allItems', function (req, res) {
    var allItems=[
                    {   barcode: 'ITEM000000',
                       name: '可口可乐',
                       unit: '瓶',
                       price: 3.00
                   },
                   {
                       barcode: 'ITEM000001',
                       name: '雪碧',
                       unit: '瓶',
                       price: 3.00
                   },
                   {
                       barcode: 'ITEM000002',
                       name: '苹果',
                       unit: '斤',
                       price: 5.50
                   },
                   {
                       barcode: 'ITEM000003',
                       name: '荔枝',
                       unit: '斤',
                       price: 15.00
                   },
                   {
                       barcode: 'ITEM000004',
                       name: '电池',
                       unit: '个',
                       price: 2.00
                   },
                   {
                       barcode: 'ITEM000005',
                       name: '方便面',
                       unit: '袋',
                       price: 4.50
                   }
               ];

    res.send(allItems);

})
app.get('/promotion', function (req, res) {
    var promotions= [
                       {
                         "type": "BUY_TWO_GET_ONE_FREE",
                         "barcodes": [
                           "ITEM000000",
                           "ITEM000001",
                           "ITEM000005"
                         ]
                       }
                     ];
    res.send(promotions);
})


// POST method route
//app.post('/', function (req, res) {
//   console.log("Hello!")
//  res.send('POST request to the homepage')
//})


//app.use(express.static('public'));
sls
//app.use('/static',express.static('public'))


var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
