$(document).ready(initializeApp);

// var productObject = {};

function initializeApp() {
    handleAPI();
    $('.productName').click(clickFunction);
    filterSelection("all");
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
        var divider = $('<hr>');
        itemsList.push(handleItem(arr[i]));
        if( $('body').clientWidth < '992px'){
            itemsList.push(divider);  //????
        }
    }
    $('.container').append(itemsList);
}

function handleItem(itemSrc) {
    var item = $('<div>',{
        class: 'item col-md-3 filterDiv show',
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
        class: 'productName',
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

function clickFunction() {
    console.log('clicked');
};

// **************************** Project section filter menu *****************

filterSelection("all");
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c === "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) toggleClass(x[i], "show");
    }
}

// Show filtered elements
function toggleClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
//
// var bodyContainer = document.getElementsByClassName('bodyContainer');
// var productContainer = bodyContainer.getElementsByClassName('container');
// var btnContainer = productContainer.getElementById("btnContainer");
// var btns = btnContainer.getElementsByClassName("filterBtn");
var btns = $('.filterBtn');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("activeBtn");
        current[0].className = current[0].className.replace(" activeBtn", "");
        this.className = "filterBtn activeBtn";
    });
}


