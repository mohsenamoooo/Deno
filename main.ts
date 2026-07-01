Deno.serve(async (request) => {
  const upgradeHeader = request.headers.get("upgrade") || "";
  
  // اگر درخواست وب‌سوکت نبود، مانیتورینگ دینو را فریب بده و به گوگل بفرست
  if (upgradeHeader.toLowerCase() !== "websocket") {
    return Response.redirect("https://www.google.com", 302);
  }

  try {
    // خواندن تنظیمات از فایل کانفیگ کنار خود
    const configText = await Deno.readTextFile("./config.json");
    const config = JSON.parse(configText);
    
    // ارتقای کانکشن به وب‌سوکت استاندارد
    const { socket, response } = Deno.upgradeWebSocket(request);
    
    socket.onmessage = (event) => {
      // ترافیک وب‌سوکت در این بخش پردازش می‌شود
    };

    return response;
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
});