window.onload = function() {

    chrome.storage.sync.get("server_ip", function(items) {
        if (!chrome.runtime.error) {
            console.log(items);
            document.getElementById("server_url").value = items.server_ip;
        } else {
            console.log("IP NOT FOUND IN STORAGE")
        }
    });

    document.getElementById("button").onclick = function() {
        var server_url_temp = document.getElementById("server_url").value;
        console.log(server_url_temp);
        if (server_url_temp === "") {
            console.log("Please input an IP!")
        } else {
            socket = io(server_url_temp);
            socketReady(socket);
            set_server_url_bool = true;
        }
    };

    document.getElementById("start_bot_button").onclick = function() {
        if (socket === null) {
            console.log("Please connect to server first!!")
        } else {
            socket.emit("start_bot", {"start":"start bot please!"});
        }
    };

    document.getElementById("stop_bot_button").onclick = function() {
        if (socket === null) {
            console.log("Please connect to server first!!")
        } else {
            socket.emit("stop_bot", {"stop_bot":"stop bot please!"});
        }
    };

    document.getElementById("save_button").onclick = function() {
        var server_url_temp = document.getElementById("server_url").value;
        console.log(server_url_temp);
        if (server_url_temp === "") {
            console.log("Please input an IP!");
            $( ".main" ).append( "<p>Please input an IP!</p>");
        } else {
            chrome.storage.sync.set({'server_ip': server_url_temp}, function() {
                // Notify that we saved.
                console.log("GOOD");
                $( ".main" ).append( "<p>IP saved!!</p>");
            });
        }
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

var socket;
var added_products = false;
var add_product_url = "https://opskins.com/ajax/shop_account.php";
var buy_url = "https://opskins.com/ajax/shop_buy_item.php";
var set_server_url_bool = false;

var opskins_buy_headers = {
    'x-csrf':'yZJmNCyAZe93HuZF3CnJxKWnMLDVsOuQ',
    'x-steamid':'76561197979199766',
    'x-requested-with':'XMLHttpRequest'
};

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

    // send
    xhr.send(formatted);
}

function log (stuff){
    console.log(stuff);
}

function socketReady (socket) {

    socket.on('connect', function () {
        console.log("Connected to the server! ");
        $( ".main" ).append( "<p>THIS EXTENSION IS WORKING!</p>" + "<p>YOU SHOULD SEE STUFF HAPPENING IN THE BOT!!</p>");
    });

    socket.on('disconnect', function () {
            console.log("Disconnected from server.");
            $( ".main" ).append( "<p>Disconnected from server!</p>");
    });

    socket.on('error', function () {
            console.log("FAILED TO CONNECT TO SERVER!");
            $( ".main" ).append( "<p>ERROR CONNECTING TO SERVER!</p>");
    });

    socket.on('bot_started', function (msg) {
        console.log(msg)
    });


    socket.on('bot_started_false', function (msg) {
        console.log(msg)
    });

    socket.on('bot_stopped', function (msg) {
        console.log(msg)
    });

    socket.on('buy_list', function (msg){

        console.log("received stuff to buy, trying");
        var buy_list2 = msg.split(',');

        console.log(buy_list2);

        if(set_server_url_bool){
            for(i=0; i < buy_list2.length; i++) {
                opskins_add_to_cart_data["id"] = buy_list2[i];
                post(add_product_url, opskins_add_to_cart_data, log, opskins_buy_headers);
                console.log(buy_list2[i]);
                added_products = true;
            }
        } else {
            console.log("Please set the URL!");
        }

        if (added_products === true){
            added_products = false;
            post(buy_url, opskins_buy_data, log, opskins_buy_headers);
        }

        //make a post to buy all the items in the cart
        socket.emit("ready",{"ready":"i am ready to start buying"});
        console.log("emited ready");
    });
}