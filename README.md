This is a chrome extension that facilitates the buying side of the Opskins bot, https://github.com/craked5/opskins_bot.

I used this because authenticating with opskins is a pain in the ass with Python and a chrome extension can use your browsers authentication directly which is pretty cool (it adds some latency tho, between the act of the server finding an item and this buying it unfortunately).

It communicates with the server via websockets (Socket.io).

The way this works is, everytime the bot server finds an item worth buying it sends a "buy_list" to this extension and this tries to buy that item, returning the result to the server.
