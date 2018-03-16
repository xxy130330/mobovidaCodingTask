$(document).ready(initializeApp);

// var productObject = {};

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
            handleAllItem(productsList);

        },
        error: function () {
            //error msg
        }
    });
}

function handleAllItem(arr) {
    var itemsList = [];
    for(var i=0; i<arr.length; i++){
        // var divider = $('<hr>');
        itemsList.push(handleItem(arr[i]));
        // itemsList.push(divider);
    }
    $('.container').append(itemsList);
}

function handleItem(itemSrc) {
    var item = $('<div>',{
        class: 'item col-md-3',
        name: itemSrc.title,
        price: itemSrc['variants'][0]['price'],
        compareAtPrice: itemSrc['variants'][0]['compare_at_price']
    });
    var itemImg = $('<img>',{
        src: itemSrc['images'][0]['src'],
        class: 'productImg'
    });
    var itemName = $('<h5>',{
        text: itemSrc.title,
        class: 'productName'
    });
    var itemPrice = $('<h4>',{
        text: `$${itemSrc['variants'][0]['price']}`,
        class: 'productPrice'
    });
    var itemComparePrice = $('<h5>',{
        text: `Compare with $${itemSrc['variants'][0]['compare_at_price']}`,
        class: 'productComparePrice'
    });
    item.append(itemImg);
    item.append(itemName);
    item.append(itemPrice);
    if(itemSrc['variants'][0]['compare_at_price'] !== null) {
        item.append(itemComparePrice);
    };
    return item;
}