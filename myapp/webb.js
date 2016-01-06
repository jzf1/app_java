var redis = require('redis');
var client = redis.createClient();
var express = require('express');
var app = express();
var http=require('http');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(express.static('static-html-site-project'));



var allItems=[
                {
                  "barcode": "ITEM000000",
                  "name": "可口可乐",
                  "unit": "瓶",
                  "price": 3.00
                },
                {
                  "barcode": "ITEM000001",
                  "name": "雪碧",
                  "unit": "瓶",
                  "price": 3.00
                },
                {
                  "barcode": "ITEM000002",
                  "name": "苹果",
                  "unit": "斤",
                  "price": 5.50
                },
                {
                  "barcode": "ITEM000003",
                  "name": "荔枝",
                  "unit": "斤",
                  "price": 15.00
                },
                {
                  "barcode": "ITEM000004",
                  "name": "电池",
                  "unit": "个",
                  "price": 2.00
                },
                {
                  "barcode": "ITEM000005",
                  "name": "方便面",
                  "unit": "袋",
                  "price": 4.50
                }
              ];


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
//var allItemsstring=JSON.stringify(allItems);
//var promotions=JSON.stringify(promotions);

//client.set("allItems", allItemsstring, redis.print);
//client.set("promotions",promotions,redis.print);

app.get('/allItems', function (req, res){
    client.get('allItems',function (err, reply) {
        var allItem=JSON.parse(reply);
//         console.log(allItem);
        res.send(allItem);
    });
})

client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/promotion', function (req, res) {
   client.get('promotions',function (err, reply) {
      var promotion=JSON.parse(reply);
      //console.log(promotion);
      //client.quit();
     res.send(promotion);
   });
})





 // for parsing application/json
//app.use(multer());

//client.set("in","aaa",redis.print);


app.post('/inputs',function(req,res){

    // var inputs=req.body.input;
//  console.log(req.body.input);
   var input = req.body.input;
   // console.log(input);
   client.get('inputs',function (err, inputsInRedis) {

            if (inputsInRedis==null){

               var inputsInRedis=[];
               inputsInRedis.push(input);
               var inputs_string=JSON.stringify(inputsInRedis);

               client.set("inputs", inputs_string, redis.print);

               //console.log(inputsInRedis);

            } else {
               var inputsInRedis=JSON.parse(inputsInRedis);

             // console.log(inputsInRedis);

               inputsInRedis.push(input);
              var inputs_string=JSON.stringify(inputsInRedis);
               client.set("inputs",inputs_string, redis.print);
               //console.log("bbb");
            }


      });


})
 //

app.get('/inputs',function(req,res){
   // console.log(inputs);
    var inputs=[];
    client.get('inputs',function (err, reply) {
    inputs=JSON.parse(reply);
      //console.log(typeof(reply));
     res.send(inputs);
    })


})




app.get('/http',function(req,res){

    var options='http://localhost:3000/carts/allitems';
    var callback=function(response){
        var str='';
        response.on('data',function(all_item){
        str+=all_item;
        });
        response.on('end',function(){
            //console.log(str);
            res.send(str);
        })
    }
    var allitem=http.request(options,callback);
   // console.log(allitem);
    allitem.end();
})

var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})










