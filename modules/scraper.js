available_services = {'newegg': 'https://www.newegg.com/p/pl?d=',
                     'ebay': 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=king&_sacat=0'};



class scraper {
    constructor() {
            console.log("new scraper created")
            this.service = ""
            this.product_name = ""
            this.product_url = ""
            this.delivery_method = ""
            this.user_email = ""
        }

    showMenu() {
        return `You want prices from: \n1. Newegg \n2. Ebay `
    }

    prepare_service(selected_service) {
        this.service = available_services[selected_service];
    }


};

module.exports = scraper