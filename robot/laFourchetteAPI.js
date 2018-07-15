const fetch = require('node-fetch');
const fs = require('fs');

const fetchParameters = 
{ 
    method: 'GET',
    headers: {},
    follow: 20,
    timeout: 0,
    compress: true,
    size: 0,
    body: null,
    agent: null
}

const getRestaurantsFrom = path =>
{
    const content = fs.readFileSync(path, 'utf-8');
    const arrayResataurants = JSON.parse(content);

    return arrayResataurants;
}

const getRestaurantIdFrom = async name =>
{
    const apiUrl = "https://m.lafourchette.com/api/restaurant-prediction?name=" + name;

    const response = await fetch(apiUrl, "utf-8", fetchParameters);
    const content = response.json();
    return content;
}

const getRestaurantOffersFrom = async id =>
{
    const apiUrl = "https://m.lafourchette.com/api/restaurant/"+ id +"/sale-type";

    const response = await fetch(apiUrl, "utf-8", fetchParameters);
    const content = response.json();
    return content;
}

const start = async () =>
{
    //const arrayResataurants = getRestaurantsFrom("./data/restaurant.json");

    const jardinRamparts = await getRestaurantIdFrom("Le Jardin des Remparts");
    const id = jardinRamparts[0].id;

    const offers = await getRestaurantOffersFrom(id);

    console.log(offers);
}

start();
