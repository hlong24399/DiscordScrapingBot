//Discord
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client()

//ReadFile
const fs = require('fs');

const puppeteer = require('puppeteer');

const TEST_PRODUCT=`https://www.newegg.com/p/pl?d=`;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})

client.on("message", (msg) => {
    if (msg.content === "important") {
        msg.pin({reason: "very crucial"});
    }
})

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

client.on("message", (msg) => {
    if (msg.content[0] === "a" && msg.content[1] === ":") {
        (async () => {
    const browser = await puppeteer.launch({
        headless: true,
        'ignoreHTTPSErrors': true
    });
    
    const PRODUCT_NAME = msg.content.substring(2,msg.content.length);
    const current_product = TEST_PRODUCT+PRODUCT_NAME;
    console.log(`Searching for prices of ${PRODUCT_NAME}`);
    console.log(`From ${current_product}`);
    

    const page = await browser.newPage();
    await page.goto(current_product);
    
    var data = await page.evaluate(() => {
        var rtx_prices = []
        TOTAL_ITEM = document.querySelectorAll(".price-current").length;
        for (var i = 0; i < TOTAL_ITEM ; i++) {
            rtx_prices.push(document.querySelectorAll(".price-current")[i].children[1].innerText);
        }
        return rtx_prices;
    });
    console.log(data);
    
    var data_string = data.join("\r\n");
    msg.reply(`List of price of ${PRODUCT_NAME} from Newegg today: \n` + data_string);
    
    // console.log(data_string);
    await browser.close();
        }   
    )()};
});


client.login(process.env.TOKEN);