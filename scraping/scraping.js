const cheerio = require('cheerio');
const request = require('request');

//factory function to creat Restaurant (name, stars, details, price are private)
const Restaurant = (name, stars, details, price) => {
  const _name = name;
  const _stars = stars;
  const _details = details;
  const _price = price;

  return {
    ToString: () => {
      return String(_name) + "; "
      + String(_stars) + "; "
      + String(_details) + "; "
      + String(_price);
    }
  }

}

const ScrappedData = {
  lastPage : 0,
  arrayLinks : [],
  addLinks : function(links){

    this.arrayLinks = this.arrayLinks.concat(links);
    this.lastPage ++;

    if (this.lastPage === 5)//when the fives pages of links are done
    {
      console.log(this.arrayLinks.length);
      this.arrayLinks.map(link => console.log(link));

      for(let i = 0; i< this.arrayLinks.length; i++){
        console.log(this.arrayLinks[i]);
        getRestaurantsFromLink(this.arrayLinks[i]);
      }

    }
  }
}

function parserRestaurant($){
  const restaurants = $("div.poi_card-display-title");
  restaurants.map(id => console.log(restaurants[id].children[0].data.trim()));
}

function getRestaurantsFromLink(link)
{
  const restaurantList = [];
  request(link ,function (error, response, html) {
    if (!error && response.statusCode === 200) {

      const loadedHtml = cheerio.load(html);
      parserRestaurant(loadedHtml);
    }
    else console.log("An error has just occured");
  });
}

function parseUrl($)
{
  const linksList = []; //liste of links

  //get the href propreties of all items
  const cities = $("div.field__items").children();
  const linksCities = cities.map(id => cities[id].children[0].attribs.href);

  linksCities.map(id => linksList.push(linksCities[id]));

  //add the links to the ScrappedData Object
  ScrappedData.addLinks(linksList.slice(0, linksCities.length - 6));
}

function readPages(numPage)
{
  const page = "page-" + numPage;
  request('https://restaurant.michelin.fr/restaurants-etoiles-france/' + page,
  function (error, response, html) {

    if (!error && response.statusCode === 200) {
      const loadedHtml = cheerio.load(html);
      parseUrl(loadedHtml);
    }

    else console.log("An error has just occured");

  });
}

for(let i = 1; i <=5; i++) readPages(i);
