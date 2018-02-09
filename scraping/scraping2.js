const cheerio = require('cheerio');
const fetch = require('node-fetch');

// factory function for the Cities Handler
const Cities = () => {

  const UrlCities = [];

  const Links = ["https://restaurant.michelin.fr/restaurants-etoiles-france/",
    "https://restaurant.michelin.fr/restaurants-etoiles-france/page-2/",
    "https://restaurant.michelin.fr/restaurants-etoiles-france/page-3/",
    "https://restaurant.michelin.fr/restaurants-etoiles-france/page-4/"];

  //get all the links for all the cities
  //this function return a Promise so once it's been called on all the links
  //and it's been resolved, you can safely access to UrlCities
  const loadUrlsCitiesFromLinks = async url =>{
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = await cheerio.load(html);

      //get the sub-divs of the div which contains the urls of each cities
      const divs = $("div.field__items").children();

      //push all the links into the UrlCities Array except the last 6 ones
      //they are the same on each pages
      divs.slice(0, divs.length - 6)
      .map(id => UrlCities.push(divs[id].children[0].attribs.href));

      return UrlCities; //return the UrlCities propreties of the object
    }
    catch(error) {
      console.log(error);
    }
  }

  return {
    getLink: (n) => { return Links[n]; },
    getUrlCities: () => { return UrlCities; },

    loadUrlsCitiesFromLinks: (url) => {return loadUrlsCitiesFromLinks(url);}
  }
}


const cities = Cities();

Promise.all([
  cities.loadUrlsCitiesFromLinks(cities.getLink(0)),
  cities.loadUrlsCitiesFromLinks(cities.getLink(1)),
  cities.loadUrlsCitiesFromLinks(cities.getLink(2)),
  cities.loadUrlsCitiesFromLinks(cities.getLink(3))
]).then(() => {
  cities.getUrlCities().map(url => console.log(url));
});
