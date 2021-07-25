const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   

var get_prices = async (product_url, browser, total_page) => {
    data = []
    for (var i = 1; i < total_page; i++) {
        var page = await browser.newPage();
        await page.setViewport();
    await page.goto(product_url+`&page=${i}`, {
        waitUntil: 'domcontentloaded'
    });
    
    try {
        var page_data = await page.evaluate(() => {
            // Prepare reply message
            total_item = document.querySelectorAll(".price-current").length;
            let itsprice = [];
                
            for (var j = 0; j < total_item; j++) {
                itsprice.push(document.querySelectorAll(".price-current")[j].children[1].innerText);
            }
            return itsprice;
        });
            
            console.log("Pushing from " + product_url + `&page=${i}`);
            await data.push(page_data);
            await page.close();
        } catch(e) {
            await page.screenshot({path: 'error_screen.png'});
            console.log("Error when evaluating the page: " + e);
            await page.close();
        }
    }
    return data;
};

exports.get_prices = get_prices;