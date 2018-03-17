$(document).ready(initializeApp);

var productObject = {
    wholeList:[],
    showItems:[],
    availableList:[],
    unavailableList:[]
};

function initializeApp() {
    handleAPI();
    // $('.productName').click(clickFunction);
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
    // productObject.wholeList = [];
    for(var i=0; i<arr.length; i++){
        productObject.wholeList.push(handleItem(arr[i]));
        if(handleItem(arr[i]).hasClass('available')){
            productObject.availableList.push(handleItem(arr[i]));
        }else{
            productObject.unavailableList.push(handleItem(arr[i]));
        }
    }
    $('.listContainer').append(productObject.availableList);
    $('.listContainer').append(productObject.unavailableList);
}

function handleItem(itemSrc) {
    var item = $('<div>',{
        class: 'item col-md-3 filterDiv show availability',
        name: itemSrc.title,
        price: itemSrc['variants'][0]['price'],
        compareAtPrice: itemSrc['variants'][0]['compare_at_price'],
        availability: itemSrc['variants'][0]['available'],
        color: itemSrc['options'][0]['values'][0],
        backUpColor: itemSrc['tags'][1]
    });

    // console.log();
    // console.log(itemSrc['variants'][0]['available']);
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
    var itemAvailability = $('<h5>');

    var price = itemSrc['variants'][0]['price'];
    switch (true){
        case (price<10):
            item.addClass('under_10');
            break;
        case (price<=20 && price>10):
            item.addClass('10_to_20');
            break;
        case (price<=30  && price>20):
            item.addClass('20_to_30');
            break;
        case (price>30):
            item.addClass('over_30');
            break;
    }

    item.append(itemImg);
    item.append(itemName);
    item.append($('<br>'));
    if(itemSrc['variants'][0]['available'] === true){
        item.addClass('available');
        item.append(itemAvailability.text('Available'));
    }else{
        item.append(itemAvailability.text('Unavailable').attr('style', 'color: red'));
    }

    item.append(itemPrice);
    if(itemSrc['variants'][0]['compare_at_price'] !== null) {
        item.append(itemComparePrice);
    }
    return item;
}

function sortProduct() {
    var selectValue = $('#sortMenu').val();
    console.log('clicked' + selectValue);
    switch (selectValue){
        case ('Default'):
            sortSuggested();
            break;
        case ('lowToHigh'):
            sortLowToHigh();
            break;
        case ('highToLow'):
            sortHighToLow();
///working on
    }
}

function sortSuggested() {
    $('.listContainer').empty();
    $('.listContainer').append(productObject.availableList);
    $('.listContainer').append(productObject.unavailableList);
    // noShowItemErrMsg();
}

function sortLowToHigh() {
    var wrapper = $('.listContainer');
    wrapper.find('.filterDiv').sort(function (a, b) {
        return parseFloat(a.getAttribute('price')) - parseFloat(b.getAttribute('price'));
    }).appendTo( wrapper );
}

function sortHighToLow() {
    var wrapper = $('.listContainer');
    wrapper.find('.filterDiv').sort(function (a, b) {
        return parseFloat(b.getAttribute('price')) - parseFloat(a.getAttribute('price'));
    }).appendTo( wrapper );
}


    function noShowItemErrMsg() {
        if (productObject.showItems.length === 0) {
            $('.listContainer').text('Sorry, there\'s match item!');
        }
    }

// **************************** Project section filter menu *****************

    filterSelection("all");

    function filterSelection(c) {
        var x, i;
        productObject.showItems = [];
        // x = productObject.wholeList;
        x = document.getElementsByClassName("filterDiv");
        if (c === "all") {
            c = "";
            // for (i = 0; i < x.length; i++) {
            //     removeClass(x[i], "show");
            //     if (x[i].className.indexOf(c) > -1) {
            //         toggleClass(x[i], "show");
            //     }
            // }
            productObject.showItems = productObject.wholeList;
        }
        // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
        for (i = 0; i < x.length; i++) {
            removeClass(x[i], "show");
            if (x[i].className.indexOf(c) > -1) {
                toggleClass(x[i], "show");
                // if(productObject.showItems.indexOf(x[i]) === -1) {
                productObject.showItems.push(x[i]);
                // }
                // productObject.showItems[i] = x[i];

            }
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
        btns[i].addEventListener("click", function () {
            var current = $('.activeBtn');
            // var current = document.getElementsByClassName("activeBtn");
            // current.toggleClass('activeBtn');
            current[0].className = current[0].className.replace(" activeBtn", "");
            this.className = "filterBtn activeBtn";
        });
    }



