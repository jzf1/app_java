//TODO: Please write code in this file.
function printInventory(inputs){

var allItems=loadAllItems();
var Promotions=loadPromotions();
var Information=information(inputs,allItems)
var Mid_information=mid_information(Information);
var Cart_Items=cart_Items_first(Mid_information,allItems);
var Gifts=gifts(Cart_Items,Promotions);
var Cart_Items_real=cart_Items_second(Cart_Items,Gifts);
var Cost=cost(Cart_Items_real);
var Save=save(Gifts);
var result=receipt(Cart_Items_real,Gifts,Cost,Save);
console.log(result);


}
//
//function cart_Items(inputs,allItems) {
//var cart_Items=[];
//var information=[];
//var b=100;
////商品信息
//for(var i=0;i<inputs.length;i++){
//    for(var j=0;j<allItems.length;j++){
//        if(inputs[i].slice(0,10)==allItems[j].barcode){
//
//            information.push({barcode:allItems[j].barcode,
//                                name:allItems[j].name,
//                                unit:allItems[j].unit,
//                               price:allItems[j].price});
//            if(inputs[i].charAt(10)=='-'){
//              b=inputs[i].slice(11,12);//
//                //  b=i;
//
//            }
//        }
//    }
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

//最终输出

function receipt(Cart_Items_real,Gifts,Cost,Save) {
    var result='';
    result='***<没钱赚商店>购物清单***\n' ;
    for(var i=0;i<Cart_Items_real.length;i++) {
        result=result+'名称：'+Cart_Items_real[i].name+'，数量：'+Cart_Items_real[i].number+Cart_Items_real[i].unit
                 +'，单价：'+Cart_Items_real[i].price.toFixed(2)+'(元)'+'，小计：'+Cart_Items_real[i].total_price.toFixed(2)
                 +'(元)\n';
    }
    result=result+'----------------------\n' +'挥泪赠送商品：\n';
    for(var j=0;j<Gifts.length;j++) {
        result=result+ '名称：'+Gifts[j].name+'，数量：'+Gifts[j].count+Gifts[j].unit+'\n';
    }

    result=result+'----------------------\n' +
           '总计：'+Cost.toFixed(2)+'(元)\n' +
           '节省：'+Save.toFixed(2)+'(元)\n' +
            '**********************';
            //console.log(result);
    return result;
}