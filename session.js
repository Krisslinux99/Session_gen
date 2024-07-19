const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // For interactive input

const API_ID = process.env.API_ID;
const API_HASH = process.env.API_HASH;
const PHONE_NUMBER = process.env.PHONE_NUMBER;

const stringSession = new StringSession(''); // Empty string means new session

(async () => {
  console.log("Starting Telegram Client");
  const client = new TelegramClient(stringSession, parseInt(API_ID), API_HASH, {
    connectionRetries: 5,
  });

  console.log("Connecting...");
  await client.start({
    phoneNumber: async () => {
      console.log("Requesting phone number");
      return PHONE_NUMBER;
    },
    password: async () => {
      console.log("Requesting password");
      return await input.text('Please enter your password: ');
    }, // If you have 2FA enabled
    phoneCode: async () => {
      console.log("Requesting phone code");
      return await input.text('Please enter the code you received: ');
    },
    onError: (err) => {
      console.error("Error occurred:", err);
    },
  });

  console.log('Connected to Telegram!');
  console.log('Your session string:', client.session.save());

  await client.disconnect();
})();
