<h1 align="center">Welcome to Pacedream Evaluation 👋</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

# Table of Contents
* [Project Overview](#Project-Overview)
* [Prerequisites](#Prerequisites)
* [Installation](#Installation)
* [Routes](#Routes)
* [support](#support)
* [License](#License)

---

## Project-Overview

This repository contains a project which was given to me by Mongso Inc as a test for a job opportunity. In summary, I had to create an API to serve as backend of part of one of their websites.</br>
For this project I used Javascript and Node js for the backend, Prisma and MongoDB for the database.</br>

---

## Prerequisites

For this project to run in your machine, you'll need to have installed:
- npm or another similar package - I recommend the version 10.2.3
- Node.js - I recommend the version 18.19.0 'Hydrogen' (LTS)
- Docker and Docker-compose

---

## Installation

First of all, clone this repository using the SSH option with the command:
```sh
git clone git@github.com:pedrohassen/pacedream-evaluation.git
```

Build the entire project using this command:

```sh
npm run build
```

---

## Routes

## POST

Feeds the database with the data from the client, specifically the info about the hotel being inscribed on the page.

```sh
http://localhost:3001/property/
```
Input - On this example 'method' is set to 0, depending on how you set the logic on the backend, this can represent that the pricing method is 'Hourly' or 'Daily'. There's also 'name' that stands for the name of the place and the weekdays 'monday' to 'sunday', which stand for the set price on each of these days.
```sh
{
  "name": "Grand Hotel",
  "method": 0,
  "monday": 50.20,
  "tuesday": 50.20,
  "wednesday": 50.20,
  "thursday": 50.20,
  "friday": 50.50,
  "saturday": 70.70,
  "sunday": 70.70
}
```

Output - Following the above example, the output would be just like this. You can see that MongoDB randomly generates an ID for the registered property, saving the 'name' as well as 'method' and weekdays and their pricing on the database.
```sh
{
  "properties": {
    "id": "6599f78e7c553ffe00a3f789",
    "name": "Grand Hotel"
  },
  "pricingWithoutIdAndPropertyId": {
    "method": 0,
    "monday": 50.2,
    "tuesday": 50.2,
    "wednesday": 50.2,
    "thursday": 50.2,
    "friday": 50.5,
    "saturday": 70.7,
    "sunday": 70.7
  }
}
```
## GET

This route finds and reproduces all the already registered places and their pricings.
It doesn't need an Input.

```sh
http://localhost:3001/property/
```

Output:
```sh
[
  {
    "id": "6599ecce7c553ffe00a3f786",
    "name": "Green House",
    "pricing": [
      {
        "method": 1,
        "monday": 45.2,
        "tuesday": 45.2,
        "wednesday": 45.2,
        "thursday": 50.2,
        "friday": 70.5,
        "saturday": 50.7,
        "sunday": 13412
      }
    ]
  },
  {
    "id": "6599f78e7c553ffe00a3f789",
    "name": "Grand Hotel",
    "pricing": [
      {
        "method": 0,
        "monday": 50.2,
        "tuesday": 50.2,
        "wednesday": 50.2,
        "thursday": 50.2,
        "friday": 50.5,
        "saturday": 70.7,
        "sunday": 70.7
      }
    ]
  }
]
```

## GET:id

This route finds and reproduces an already registered place, just one, which can be found if you search by using the ID.

```sh
http://localhost:3001/property/:id
```

## PUT

This route updates part of, or all the information provided by a previous registration. The ID is needed to search for an already existing place, as well as the new info, the format needs to be such as the creation route, as described on the above examples.

```sh
http://localhost:3001/property/:id
```

## DELETE

This route deletes information from the database, you need to pass the ID of the place and it's info you want to delete, by using the URL exemplified below.
```sh
http://localhost:3001/property/:id
```

---

## Author

👤 **Pedro Hasse Niemczewski**

* Github: [@pedrohassen](https://github.com/pedrohassen)
* Linkedin: [Pedro Hasse Niemczewski](https://www.linkedin.com/in/pedrohassen/)

## support

Give a ⭐️ if this project helped you!

***