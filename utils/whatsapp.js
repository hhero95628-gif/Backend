const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process"
    ]
  }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp Connected");
});

client.initialize();

const sendWhatsApp = async (number, message) => {
  try {
    const chatId = number + "@c.us";
    await client.sendMessage(chatId, message);
  } catch (err) {
    console.log("WhatsApp error:", err);
  }
};

module.exports = sendWhatsApp;