window.onload = function() {
    document.getElementById("button").onclick = function() {
        var __cfduid = document.getElementById("__cfduid").value;
        var cf_clearance = parseInt(document.getElementById("cf_clearance").value);
        var opskins_csrf = document.getElementById("opskins_csrf").value;
        var PHPSESSID = parseInt(document.getElementById("PHPSESSID").value);
        var avatar = document.getElementById("avatar").value;
        set_headers_cookies(__cfduid, opskins_csrf, PHPSESSID, avatar, cf_clearance);
        console.log(opskins_buy_headers)
    };
};

var opskins_buy_data = {
    "action":"buy",
    "tos":1
};

var opskins_add_to_cart_data = {
    'type':'cart',
    'param':'add',
    'id':''
};
var added_products = false;
var add_product_url = "";
var buy_url = "";
var headers_cookies = "";
var set_headers_cookies_bool = false;

var opskins_buy_headers = {

};


var socket = io('http://104.196.38.235:80');
console.log(socket.io.uri);

/**
 * Perform a POST request to a url
 * @param {string} url - The URL to request to
 * @param {object} data - the POST data
 * @param {function} callback - The function to call once the request is performed
 * @param {object} headers - a header object in the format {header: value}
 */
function post(url, data, callback, headers) {
    // create xmlhttprequest instance
    var xhr = new XMLHttpRequest(),
        formatted = [];

    if (typeof data === "object") {
        for (var k in data) {
            formatted.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
        }
        formatted = formatted.join("&");
    } else {
        formatted = data;
    }

    // init
    xhr.addEventListener("load", callback);
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    // set headers
    for (var h in headers) {
        if (headers.hasOwnProperty(h)) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }

    // save lastRequest for later re-sending
    lastRequest = {
        url: url,
        data: data,
        headers: headers
    };

    // send
    xhr.send(formatted);
}

/**
 * Perform a GET request to a url
 * @param string url - The URL to request to
 * @param function callback - The function to call once the request is performed
 */
function get(url, callback) {
    // create xmlhttprequest instance
    // we assume all supported browsers have XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // init
    xhr.addEventListener("load", callback);
    xhr.onerror = function () {
        callback.apply({status: 0, statusText: "Connection error"});
    };
    xhr.open("GET", url, true);

    // send
    xhr.send();
}

var set_headers_cookies =  function(__cfduid, opskins_csrf, PHPSESSID, avatar, cf_clearance) {

    headers_cookies = "__cfduid="+ __cfduid +"; opskins_csrf="+ opskins_csrf +";  PHPSESSID=" + PHPSESSID + "; avatar=" + avatar + "; cf_clearance=" + cf_clearance + "; timezone_offset=0%2C0";
    opskins_buy_headers["Cookie"] = "__cfduid="+ __cfduid +"; opskins_csrf="+ opskins_csrf +";  PHPSESSID=" + PHPSESSID + "; avatar=" + avatar + "; cf_clearance=" + cf_clearance + "; timezone_offset=0%2C0";
    set_headers_cookies_bool = true;
};

socket.on('connect', function () {
        console.log("connected to server good");
        socket.emit("ready", {"ready":"i am ready to start buying"});
});

function log (stuff){
    console.log(stuff);
}

socket.on('buy_list', function (msg){

    console.log("received stuff to buy, trying");
    var buy_list2 = msg.split(',');

    console.log(buy_list2);
    
    if(set_headers_cookies_bool === true){
        for(i=0; i < buy_list2.length; i++) {
            opskins_add_to_cart_data["id"] = buy_list2[i];
            post(add_product_url, opskins_add_to_cart_data, log, opskins_buy_headers);
            console.log(buy_list2[i]);
            added_products = true;
        }
    } else {
        console.log("cant buy because headers not set yet!");
    }
    /*
    if (added_products === true){
        added_products = false;
        post(buy_url, opskins_buy_data, log, opskins_buy_headers);

    }
    */
    //make a post to buy all the items in the cart
    socket.emit("ready",{"ready":"i am ready to start buying"});
    console.log("emited ready");
});