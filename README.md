# Helsinki City Bike App (frontend)

Helsinki City Bike App is a angular frontend displaying bike journey data and details about bike stations. 

This project is inspired by https://github.com/solita/dev-academy-2023-exercise

![Journey list](https://kk4.fi/u/hcbapp_1.png)
Journey list consists of a table of journeys (of course), user is also able to see details of each journey.

![Station map](https://kk4.fi/u/hcbapp_2.png)
Stations are displayed on a map where each station is clickable and once again more details are shown. Basic search for station names is also included.

### Installation
Make sure you have [backend](https://github.com/lthu/hcbapp-backend) running. Download the hcbapp repo, run `npm install` and `ng serve`. This frontend is looking for backend at your localhost:3000/api. To change this edit src/app/data.service.ts