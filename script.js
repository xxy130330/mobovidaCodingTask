$(document).ready(initializeApp);

var productObject = {};

function initializeApp() {
    handleAPI();
}

function handleAPI() {
    $.ajax({
        method: 'get',
        url: 'https://www.wirelessemporium.com/products.json',
        success: function (data) {
            var productsList = data['products'];  //productList is an array
            // productObject.title = productsList[0]['title'];
            console.log(productsList);
            handleAllItem(productsList); //?????

        },
        error: function () {
            //error msg
        }
    });
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
        price: itemSrc['variants'][0]['price'],
        compareAtPrice: itemSrc['variants'][0]['compare_at_price']
    });
    var itemImg = $('<img>',{
        src: itemSrc['images'][0]['src']
    });
    item.append(itemImg);
    return item;
}