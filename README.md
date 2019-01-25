# Palette-Picker

https://lkshamus-palette-picker.herokuapp.com/

## Description

Palette Picker is an interactive application that allows the user to add randomized palettes to current projects. 

## Getting Started

### Prerequisites 
In order to use the api, you must have the following installed:
* [Node.js](https://nodejs.org/en/)
* [NPM](https://nodejs.org/en/)

### Installation
Clone down this repo 

```` git clone https://github.com/lkshamus/BYOB.git ````

Next install dependencies 

```` npm install ```` 

This will install 
* Express
* Body-parser
* Knex
* PostgreSQL Database
* Mocha
* Chai
* Chai HTTP

Start the server with
````node server.js````
(or ````nodemon```` if you have it installed).

### Create local database

Create database in PostgreSQL: 

````psql````

````CREATE DATABASE albumfinder;````

Run migrations using: 

````knex migrate:latest ````

Seed database:

````knex seed:run````

## Tech-stack used
* Node.js
* JavaScript
* jQuery
* Knex/Express/Postgres database

## Wireframes and UI/UX design

<img width="1437" alt="screen shot 2018-12-02 at 6 51 45 pm" src="https://user-images.githubusercontent.com/39738807/49348572-687cba80-f663-11e8-8bce-08442204a801.png">

![img_4014](https://user-images.githubusercontent.com/39738807/49051995-4d173880-f1a7-11e8-9826-858eb1096034.jpeg)
