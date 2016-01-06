jQuery(document).ready(function(){
    //$('.button').data('data-barcode');
    //
//    $('button').on('click',function(){
//        var barcode=$(this).data('barcode');
//
//        if (JSON.parse(localStorage.getItem('inputs'))==null){
//            var inputs=[];
//            inputs.push(barcode);
//            localStorage.setItem('inputs',JSON.stringify(inputs));
//        } else {
//            var inputs=JSON.parse(localStorage.getItem('inputs'));
//            inputs.push(barcode);
//            localStorage.setItem('inputs',JSON.stringify(inputs));
//        }
//
//    });
//
// })
//server

    //$.ajax({url:"/inputs",method:"POST"}).done(function(input){
        // var input_temp=input;
         //alert( input_temp);


     $('button').on('click',function(){
        var barcode=$(this).data('barcode');
       // alert(barcode);
        $.ajax({url:"/inputs",type:"POST",data:{"input":barcode}});
     });



  //  })
})
