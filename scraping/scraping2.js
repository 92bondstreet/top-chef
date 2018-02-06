import cheerio from 'cheerio';
import fetch from 'node-fetch';

// factory function for the Cities Handler
const Cities = () => {
  let IsReady = false;
  const Links = ["https://restaurant.michelin.fr/restaurants-etoiles-france/page-1",
    "https://restaurant.michelin.fr/restaurants-etoiles-france/page-2",
    "https://restaurant.michelin.fr/restaurants-etoiles-france/page-3",
    "https://restaurant.michelin.fr/restaurants-etoiles-france/page-4",
    "https://restaurant.michelin.fr/restaurants-etoiles-france/page-5"];
  const UrlCities = [];

  //get all the links for all the cities
  const getUrlsCitiesFromLinks = async url =>{

    try {
      const response = await fetch(url);
      const loadedHtml = await cheerio.load(response);
      //parse the loadedHtml
      return //the stuff and the promise resolved
    }
    catch(error) {
      console.log(error);
    }

  }

  return {
    getLink: (n) => { return Links[n]; },
    getUrlCities = () => { return UrlCities; }
  }
}
