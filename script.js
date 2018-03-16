$(document).ready(initializeApp);

var productObject = {};

function initializeApp() {
    handleAPI();
}

function handleAPI() {
    $.ajax({
        method: 'get',
        // data: ,
        url: 'https://www.wirelessemporium.com/products.json',
        success: function (data) {
            productObject.productsList = data['products'];  //productList is an array
            console.log(data);
        },
        error: function () {
        }
    })
}

function handleAllItem(arr) {
    for(var i=0; i<arr.length; i++){
        
    }
}

function handleItem() {
    var item = $('<div>',{
        class: 'item',

    });
}