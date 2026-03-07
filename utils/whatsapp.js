const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
});

client.on("qr", async (qr) => {
  const qrImage = await qrcode.toDataURL(qr);
  console.log("Scan this QR:");
  console.log(qrImage);
});

client.on("ready", () => {
  console.log("WhatsApp Connected");
});

client.initialize();


// Function to send WhatsApp message
const sendWhatsApp = async (number, message) => {
  try {
    const chatId = number + "@c.us";
    await client.sendMessage(chatId, message);
    console.log("WhatsApp message sent");
  } catch (error) {
    console.error("WhatsApp send error:", error);
  }
};

module.exports = sendWhatsApp;