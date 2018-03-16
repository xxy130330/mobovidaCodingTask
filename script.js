$(document).ready(initializeApp);

var productObject = {};

function initializeApp() {
    handleAPI();
    handleAllItem(productObject.productsList); //?????
}

function handleAPI() {
    $.ajax({
        method: 'get',
        url: 'https://www.wirelessemporium.com/products.json',
        success: function (data) {
            productObject.productsList = data['products'];  //productList is an array
            console.log(data);
        },
        error: function () {
            //error msg
        }
    })
}

function handleAllItem(arr) {
    var itemsList = [];
    for(var i=0; i<arr.length; i++){
        itemsList.push(handleItem(arr[i])); //??????
    }
    $('.bodyContainer').append(itemsList);

}

function handleItem(itemSrc) {
    var item = $('<div>',{
        class: 'item',
        name: itemSrc.title,
        price: itemSrc['variants']['price'],
        compareAtPrice: itemSrc['variants']['compare_at_price']
    });
    var itemImg = $('<img>',{
        src: itemSrc['images'][0]['src']
    });
    item.append(itemImg);
}