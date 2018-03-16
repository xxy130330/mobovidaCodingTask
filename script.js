$(document).ready(initializeApp);

function initializeApp() {
    handleAPI();
}

function handleAPI() {
    $.ajax({
        method: 'get',
        // data: ,
        url: 'https://www.wirelessemporium.com/products.json',
        success: function (data) {
            var productsList = data['products'];
            console.log(productsList);
        },
        error: function () {
        }
    })
}