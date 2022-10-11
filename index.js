require("dotenv").config();
const DiscordMusicBot = require("./structures/DiscordMusicBot");
const { exec } = require("child_process");
const https = require("https");
const client = new DiscordMusicBot();

if (process.env.REPL_ID) {
  console.log(
    "Replit system detected, initiating special `unhandledRejection` event listener"
  );
  process.on("unhandledRejection", (reason, promise) => {
    promise.catch((err) => {
      if (err.status === 429) {
        exec("kill 1");
      }
    });
  });
}

function selfPing() {
  https
    .get("https://music-bot-apz1.onrender.com", (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log("keep alive");
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });

  setTimeout(selfPing, 600000);
}

selfPing();

client.build();

module.exports = client; //;-;
