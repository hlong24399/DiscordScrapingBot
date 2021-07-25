//discord
require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client()
const fs = require('fs');
const puppeteer = require('puppeteer');
var scrape = require('./scrape.js');
const NEWEGG_search_url=`https://www.newegg.com/p/pl?d=`;
const scraper = require('./modules/scraper');



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})


client.on("message", (msg) => {
  if (msg.content === "hey scraper" || msg.content === "test") {
    const scraper_ob = new scraper();
    msg.reply(scraper_ob.showMenu());
    msg.channel.awaitMessages(m => m.author.id == msg.author.id, {max: 1}).then(collected => {
      if (collected.first().content.toLowerCase() == '1') {
        msg.reply('You chose Newegg');
        //to do
      }
      else if (collected.first().content.toLowerCase() == '2') {
        msg.reply('You chose Amazon');
        //to do
      }
      else {
        msg.reply("cancelled");
      }
    }).catch(() => {
      msg.reply("timeout in this operation");
    });
  }
});

/*
client.on("message", (msg) => {
  if (message === "heh scraper")
    const scrap1 = new scraper();
    answer = scrap1.menu();
    

*/
client.on("message", (msg) => {
    if (msg.content[0] === "a" && msg.content[1] === ":") {
        (async () => {
          const browser = await puppeteer.launch({
            headless: true,
            'ignoreHTTPSErrors': true
          });
          const PRODUCT_NAME = msg.content.substring(2,msg.content.length);
          var product_url = NEWEGG_search_url+PRODUCT_NAME;
          console.log(`Extracting for prices of ${PRODUCT_NAME}`);
          console.log(`From ${product_url}`);
          
          var page = await browser.newPage();
          await page.goto(product_url);
          
          //Get total page
          var total_page = await page.evaluate(() => {
              const temp = parseInt(document.querySelector(".list-tool-pagination-text").innerText.split(" ")[1].split("/")[1]);
              return temp;
            });
          await page.close();

          console.log("Scraping" + total_page + "in total ... ");
          data = await scrape.get_prices(product_url, browser, total_page);
          await browser.close();
        }  
    )()};
});


client.login(process.env.TOKEN);