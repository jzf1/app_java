jQuery(document).ready(function(){
        var allItems=[];
        var promotions=[];
        var input=[];
        var handler = function(allitems){
                                  // debugger;
                                  allItems=allitems;
                                 // alert(allItems);

                                  $.ajax({url:"/promotion",method:"GET"}).done(function(prom) {
                                      //alert(typeof(prom));
                                      promotions=prom;

                                       $.ajax({url:"/inputs",method:"GET"}).done(function(inputs) {
                                         //   alert(typeof(inputs));
                                        //   input=JSON.parse(inputs);
                                       input=inputs;



                                      // var input=JSON.parse(localStorage.getItem('inputs'));
                                         //   alert(promotions);
                                          //var allItems=loadAllItems();

                                          var Information=information(input,allItems);
                                          var Mid_information=mid_information(Information);
                                          var Cart_Items=cart_Items_first(Mid_information,allItems);
                                          var Gifts=gifts(Cart_Items,promotions);
                                          var Cart_Items_real=cart_Items_second(Cart_Items,Gifts);
                                          var Cost=cost(Cart_Items_real);
                                          var Save=save(Gifts);
                                          var receipt = {
                                                        cart_Items: Cart_Items_real,
                                                        gifts: Gifts,
                                                        cost: Cost,
                                                        save: Save
                                                    };


                                          var complied =_.template($('#items').text());
                                          $('#receipt').append(complied({'receipt':receipt}));
                                          $('#table3').find('tbody').append('<tr><td> '+ receipt.save+'$</td>'+'<td> '+ receipt.cost+'$</td></tr>');

                                      });
                                  });

                              };

        $.ajax({url:"/allItems",method:"GET"}).done(handler);
        console.log("aa")
})


    //$('table').addClass('receipt');
//    for (var i=0;i<receipt.cart_Items.length;i++){
//        $('#table1').find('tbody').append('<tr><td>'+ receipt.cart_Items[i].name+'</td>'
//                                          + '<td>'+ receipt.cart_Items[i].number+'</td>'
//                                          + '<td>'+ receipt.cart_Items[i].price+'<td>'
//                                          + receipt.cart_Items[i].total_price+'</td></tr>');
//    }
//    for (var i=0;i<receipt.gifts.length;i++){
//        $('#table2').find('tbody').append('<tr><td>'+receipt.gifts[i].name+
//        '</td>'+'<td>'+receipt.gifts[i].count+
//        '<td>'+receipt.gifts[i].price+'</td></tr>');
//    }



//利用lodash 的template


//



  ///// alert($('#items').text());

//    $(function (){
//
//        var gift =_.template($('#item').text());
//        $('#table2').find('tbody').append(gift({'obj':receipt.gifts}));
//     })


//input
//TODO: Please write code in this file.
//function loadAllItems() {
//    return [
//        {
//            barcode: 'ITEM000000',
//            name: '可口可乐',
//            unit: '瓶',
//            price: 3.00
//        },
//        {
//            barcode: 'ITEM000001',
//            name: '雪碧',
//            unit: '瓶',
//            price: 3.00
//        },
//        {
//            barcode: 'ITEM000002',
//            name: '苹果',
//            unit: '斤',
//            price: 5.50
//        },
//        {
//            barcode: 'ITEM000003',
//            name: '荔枝',
//            unit: '斤',
//            price: 15.00
//        },
//        {
//            barcode: 'ITEM000004',
//            name: '电池',
//            unit: '个',
//            price: 2.00
//        },
//        {
//            barcode: 'ITEM000005',
//            name: '方便面',
//            unit: '袋',
//            price: 4.50
//        }
//    ];
//}
//
//function loadPromotions() {
//    return [
//        {
//            type: 'BUY_TWO_GET_ONE_FREE',
//            barcodes: [
//                'ITEM000000',
//                'ITEM000001',
//                'ITEM000005'
//            ]
//        }
//    ];
//}








//修改版（第一模块：count,barcode）
function information(inputs,allItems){
    var Information=[];
    var equals_inputs=[];
    for(var i=0;i<inputs.length;i++){
        equals_inputs.push(inputs[i].split('-'));
        if(equals_inputs[i].length==1) {
            Information.push({barcode:equals_inputs[i][0],
                               number:1})
        } else {
             Information.push({barcode:equals_inputs[i][0],
                               number:parseInt(equals_inputs[i][1])})
        }
    }
    return Information;
}

    //console.log(information_1);

function mid_information(information){
    var mid_information=[];
    mid_information[0]={barcode:information[0].barcode,count:0};
    for (var i=0;i<information.length;i++) {
         var c=0;
         for(var j=0;j<mid_information.length;j++) {
           if(information[i].barcode==mid_information[j].barcode) {
               mid_information[j].count++;
                c=1; break;
           }
         }
         if(c==0) {
            mid_information.push({barcode:information[i].barcode,
                           count:information[i].number});
         }
    }
    return mid_information;
}

//翻译成cart_Items 信息

function cart_Items_first(information,allItems) {
    var cart_Items=[];
    for (var m=0;m<information.length;m++)  {
        for(var n=0;n<allItems.length;n++)  {
            if(information[m].barcode==allItems[n].barcode) {
                cart_Items.push({barcode:allItems[n].barcode,
                                    name:allItems[n].name,
                                   number:information[m].count,
                                     unit:allItems[n].unit,
                                    price:allItems[n].price,
                               total_price:(information[m].count)*(allItems[n].price)})
            }
        }
    }
    return cart_Items;
}

//促销信息
function gifts(Cart_Items,Promotions) {
    var gifts=[];
    for (var i=0;i<Cart_Items.length;i++) {
        for(var j=0;j<(Promotions[0].barcodes).length;j++) {
           if(Cart_Items[i].barcode==(Promotions[0].barcodes)[j]) {
              if (Cart_Items[i].number>2) {
                 gifts.push({barcode:(Promotions[0].barcodes)[j],
                 name:Cart_Items[i].name,
                 count:parseInt(Cart_Items[i].number/3),
                 price:Cart_Items[i].price,
                 unit:Cart_Items[i].unit});
              }
           }
        }
    }
    return gifts;
}

//实际付款
function cart_Items_second(Cart_Items,Gifts) {
    for(var i=0;i<Gifts.length;i++) {
        for(var j=0;j<Cart_Items.length;j++) {
            var number;
            if(Gifts[i].barcode==Cart_Items[j].barcode) {
                Cart_Items[j].total_price=Cart_Items[j].total_price-Cart_Items[j].price*Gifts[i].count;
            }
        }
    }
    return Cart_Items;
}


//实际花费
function cost(Cart_Items) {
    var Cost=0;
    for(var i=0;i<Cart_Items.length;i++) {
        Cost=Cost+Cart_Items[i].total_price;
    }
    return Cost;
}

//节省的
function save(Gifts) {
    var Save=0;
    for (var i=0;i<Gifts.length;i++) {
        Save=Save+Gifts[i].price*Gifts[i].count;
    }
    return Save;
}






