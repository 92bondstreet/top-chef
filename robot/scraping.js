const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

// parameters to fetch the url
const fetchParameters = { method: 'GET',
headers: {},
follow: 20,
timeout: 0,
compress: true,
size: 0,
body: null,
agent: null
}

//get all the liks to the pages of each resaurants
async function getRestaurantLinksFrom(url)
{
  const response = await fetch(url, fetchParameters);
  const html = await response.text();
  const $ = await cheerio.load(html);

  //get the sub-divs of the div which contains the urls of each cities
  const aTag = $("a.poi-card-link");

  //get ride of all the divs which are not
  const filteraTag = aTag.filter(d => aTag[d].name == 'a');


  const links = [];

  //console.log(divs);
  for (let i = 0; i < filteraTag.length; i++)
  {
    links.push("https://restaurant.michelin.fr" + filteraTag[i].attribs.href)
  }

  return links;
}

//get the information of a restaurant from an url and put everything together in an object
async function getResaurantFrom(url)
{
  const Restaurant = (name, addresse, postalCode, locality, price, url, urlImage) => {
    return {
      "name": name,
      "addresse": addresse,
      "postalCode": postalCode,
      "locality": locality,
      "price": price,
      "url": url,
      "urlImage": urlImage
    }
  }

  const getDataFrom = selecteur => $(selecteur)[0].children[0].data;

  const response = await fetch(url, fetchParameters);
  const html = await response.text();
  const $ = await cheerio.load(html);

  let name = undefined;
  let address = undefined;
  let postalCode = undefined;
  let locality = undefined;
  let price = undefined;
  let urlImage = undefined;

  let error = 0;

  try
  {
    name = getDataFrom("h1");
  }
  catch (e)
  {
    name = null;
    error += 2;
  }

  try
  {
    address = getDataFrom("div.thoroughfare");
  }
  catch (e)
  {
    address = null;
    error += 4;
  }

  try
  {
    postalCode = getDataFrom("span.postal-code");
  }
  catch (e)
  {
    postalCode = null;
    error += 8;
  }

  try
  {
    locality = getDataFrom("span.locality");
  }
  catch (e)
  {
    locality = null;
    error += 16;
  }

  try
  {
    price = getDataFrom("div.poi_intro-display-prices").trim();
  }
  catch (e)
  {
    price = null;
    error += 32;
  }

  try
  {
    urlImage = $("img")[1].attribs['data-src'];
  }
  catch (e)
  {
    urlImage = null;
    error += 64;
  }

  if(error > 0) console.log("error: " + error + " on url: " + url);

  return Restaurant(name, address, postalCode, locality, price, url, urlImage);
}

//important consts of the programe
//baseUrl is the basic url to which we have to add "page-n" n is in the range 1 to 35
const baseUrl = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/";
const nbrPages = 35;


async function main()
{
  console.log("get the url of each restaurant...");
  const promiseUrls = [];
  for(let i = 0; i< nbrPages; i++)
  {
    const url = baseUrl + "page-" + i.toString();
    promiseUrls.push(getRestaurantLinksFrom(url));
  }

  //this is an array of array (it return severals arrays of url)
  const restaurantLinksArrays = await Promise.all(promiseUrls);

  //all the arrays are merged into one big array: it's a list of all the urls of each restaurants
  const restaurantLinks = restaurantLinksArrays
    .filter(arr => arr != undefined && arr != [])
      .reduce((accumulator, currentArray) => accumulator.concat(currentArray), []);

  console.log("get the data of each restaurants...")

  //fetch each links one by one to get all the data for each restaurant (1 link => 1 restaurant)
  const promiseRestaurants = restaurantLinks.map(link => getResaurantFrom(link));
  const restaurantArray = await Promise.all(promiseRestaurants);

  console.log("convert to json");

  //format the objects in JSON to write them in a file
  const jsonObj = restaurantArray.map(restaurant => JSON.stringify(restaurant, null, 4));
  const contentForFile = "[\n" + jsonObj.join(",\n") + "\n]";

  console.log("saving to file");

  fs.appendFileSync('./data/restaurant.json', '');
  fs.writeFileSync('./data/restaurant.json', contentForFile, "utf-8");

  console.log(restaurantArray.length.toString() + " restaurants have been scrapped");
  console.log("--\tDONE\t--");

}

main();
