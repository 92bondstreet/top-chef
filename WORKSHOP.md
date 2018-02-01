<!-- .slide: data-background="#ffffff" -->

![3-stars](./img/3-stars.png)

---

Macarons Michelin

---

1 star

A very good restaurant in its category

---

2 stars

Excellent cooking, worth a detour

---

3 stars

Exceptional cuisine, worth a special journey


---

L'arpège

---

Alain Passard

---

```
Je cultive mes légumes afin de pouvoir raconter une histoire
de la graine à l’assiette
```

---

420 euros

terre & mer

---

La Fourchette

---

Time consuming

---

Help me with a Web App

---

Find the best deal for France located starred restaurant

---

```
Node.js + React
+ Material Design (mdl, bootstrap, foundation...)
+ ES6
[+ docker + redis ...]
```

---

Steps

---

## 92bondstreet/top-chef

---

Investigation

---

Michelin Restaurant

---

1. How it works https://restaurant.michelin.fr
2. What are the given properties for a starred restaurant: name, adress, town, stars, chef... ?
...

---

Deals from LaFourchette

---

1. How it works?
1. What are the properties that we need to provide to lafourchette.com to get a deal ?

---

1. How to identify a deal on the page ?
1. ...

---

The web application

---

How to create a link between the starred restaurant and lafourchette?

---

Server-side with Node.js

---

Create a module called `michelin`

---

that return the list of restaurant

---

```js
const michelin = require('michelin');

console.log(michelin.get());
```

---

1. scrape list of France located starred restaurants
1. store the list into JSON file, nosql database (like redis, mongodb...)

---

1. create a node module that return the list
1. ...

---

Create a module called `lafourchette`

---

that return the available deal for a given restaurant

---

```js
const lafourchette = require('lafourchette');
...
const restaurant = {...};


console.log(lafourchette.getDeal(restaurant));
```

---

1. create the calls (api, http) to get the restaurant page
1. get the deal (by scraping or decoding api response)

---

1. return the deal
1. ...

---

Client-side with React

---

MVP

---

List France located starred restaurant and their current deals

---

* filtering by name
* sorting by stars
...

---

Display on a map only the starred restaurants with an active deal

---

Notification (bonus)

---

1. Notify me (discord or slack) a new deal for any starred restaurant
1. Monitor and notify a new deal for a given restaurant

Just tell me what to do

---

* Fork the project via `github`

---

* Clone the project

---

* Don't forget to commit/push before the end of the workshop AND the sessions end

---

<!-- .slide: data-background="#ffffff" -->

![bibendum](./img/bibendum.png)

---
