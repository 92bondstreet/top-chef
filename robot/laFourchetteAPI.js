const fetch = require('node-fetch');
const fs = require('fs');

const getRestaurantsFrom = path =>
{
    const content = fs.readFileSync(path, 'utf-8');
    const arrayResataurants = JSON.parse(content);

    return arrayResataurants;
}

console.log("hi there !");
const arrayResataurants = getRestaurantsFrom("./data/restaurant.json");



