window.onload = function() {
    var headers_cookies = "__cfduid="+ "dd2effb05b3fe465b87d2ef499e9d2bb31449767701" +"; opskins_csrf="+ "Y8gSNDwTXOqWO8Ter2dzeATmWO0YO7yC" +";  PHPSESSID=" + "g5q7dd0lm80prvepalvjgchbr7" + "; avatar=" + "https%3A%2F%2Fsteamcdn-a.akamaihd.net%2Fsteamcommunity%2Fpublic%2Fimages%2Favatars%2F23%2F23fe5b1be95d16efbf1652151da896b04c2c3fcf.jpg" + "; cf_clearance=" + "0dbd845b1688da8a395a81213b8c325c5ffaf309-1453317924-3600" + "; timezone_offset=0%2C0";
    var opskins_add_to_cart_data = {
    'type':'cart',
    'param':'add',
    'id':'8578731'
    };

    var opskins_buy_headers = {
    'Accept':'*/*',
    'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'pt-PT,pt;q=0.8,en-US;q=0.6,en;q=0.4,fr;q=0.2,es;q=0.2',
    'Cache-Control':'no-cache',
    'Content-Length':'16',
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': headers_cookies,
    'Dnt':'1',
    'Origin':'https://opskins.com',
    'Pragma':'no-cache',
    'Referer':'https://opskins.com/index.php?loc=shop_checkout',
    'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
    'x-csrf':'yZJmNCyAZe93HuZF3CnJxKWnMLDVsOuQ',
    'x-requested-with':'XMLHttpRequest',
    'x-steamid':'76561197979199766'
    };
    function log (stuff){
        console.log(stuff);
    }
    var add_product_url = "https://opskins.com/ajax/shop_account.php";

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
        xhr.withCredentials = true;
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
        console.log(data);
        console.log(headers);

        console.log(lastRequest);

        // send
        xhr.send(formatted);

    }
    document.getElementById("stuff").onclick = function() {
        post(add_product_url, opskins_add_to_cart_data, log, opskins_buy_headers);
    };
};