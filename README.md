# Hentry

<p align="center">
  <img width="460"  src="https://raw.githubusercontent.com/YashKumarVerma/hentry-server/master/illustrations/hentry-logo.png">
</p>

Hentry, is a hackathon sentry that allows organizers to provide a fair competing platform in the online events. Since plagiarism and re-use are the major problems in such submissions which ruins the spirit of hackathons,  It utilizes intelligent algorithms to calculate project entropy and snapshots of participants' projects in real-time and visualizes the same for the organizers as a live graph in a pleasant user interface.


## Components

- [Hentry Server](https://github.com/YashKumarVerma/hentry-server) : web server written in TypeScript to act as the service to expose data for hentry-dashboards. Provides routes which utilize Redis-JSON and Redis-TimesSeries to return data for business logic. Handle user creation, team creation, initial dashboard data fetch and polling updates for live graphs.
- [Hentry Client](https://github.com/YashKumarVerma/hentry-client) : CLI written in Golang utilizing go-routines for performance ⚡ which calculates project entropy and snapshots and emits them to hentry-feeder

- [Hentry Feeder](https://github.com/YashKumarVerma/hentry-feeder) : micro service written in GoLang utilizing go-routines for performance, exposes a simple HTTP server to accept requests from henry-client instances running on participants' devices and write data to Redis TimeSeries Database.
-  [Hentry Dashboard](https://github.com/YashKumarVerma/hentry-dashboard) : a responsive and dynamic single page application build using React and TailWind CSS, designed in a monochrome and minimal UI to focus on important data. Also provisions realtime graphs which render live feed of project status.


API Collection: [Here](https://documenter.getpostman.com/view/10043948/TzRLmqrE#intro)

## Architecture
![https://raw.githubusercontent.com/YashKumarVerma/hentry-server/master/illustrations/map.png](https://raw.githubusercontent.com/YashKumarVerma/hentry-server/master/illustrations/map.png)

## Hentry Client

![https://i.imgur.com/hfATaxW.png](https://i.imgur.com/hfATaxW.png)

- Generates a unique signature of each machine, used to uniquely identify machine.
- Allows user to log into hentry servers, create and join teams, and register devices.
- Can identity old devices and avoid duplicate logins, based on device signatures.
- Interactive command line interface, with indicators showing validation results.
- Written implementing go-routines, utilizes minimal system resources, non blocking.
- Creates an internal directory mapping as hashmap and transmits data to hentry-server
- Written in Golang, can be compiled for any operating system and architecture.
- Deployment configurations embedded into binary, just run on terminal and use. If required, can pass data into binary for custom configurations.
- Who uses this
  - The participants of the event are supposed to place this in their project directory. That's all they are required to do.
- Compiling Again?
  - open hentry-client, then run `make build` and you'll get your binary in the `build folder`
- ToDo
  - add encryption to allow secure communication and no tampering of data.

User Interface

![https://i.imgur.com/kJ68yQI.png](https://i.imgur.com/kJ68yQI.png)
![https://i.imgur.com/qXyTdN7.png](https://i.imgur.com/qXyTdN7.png)
![https://i.imgur.com/YqchQvD.png](https://i.imgur.com/YqchQvD.png)

Picks up device name by itself
![https://i.imgur.com/nVfna3p.png](https://i.imgur.com/nVfna3p.png)
![https://i.imgur.com/FHlHBha.png](https://i.imgur.com/FHlHBha.png)

Now the client will automatically calculate snapshot score and entropy of all directories which are child of the directory in which hentry-client is present.


## Hentry Server

![https://i.imgur.com/TlCaJbc.png](https://i.imgur.com/TlCaJbc.png)

- Hentry Server is written in typescript with modern tooling to quickly prototype the application.
- The server is available on docker hub as yashkumarverma[](https://hub.docker.com/repository/docker/yashkumarverma/hentry-server)/hentry-server
- Connects to reddismod instance and ensures that connection with json and timeseries module is made.
- Provides routes for team formation, team joining, device registration, fetching all timeseries data and polling for updates in timeseries data.
- To run locally, run `yarn install` then `yarn start:dev` or use the docker image.
- Follows a uniform logging scheme to make it easier to debug.
- Supports keywords like `now` to fetch all data till the present timestamp.
- Divided into modules and services keep related codebase together and therefore make it easier to maintain.
- Configurations can be accessed in `config` directory.

![https://i.imgur.com/9HEwswE.png](https://i.imgur.com/9HEwswE.png)
![https://i.imgur.com/SqBM14v.png](https://i.imgur.com/SqBM14v.png)

## Hentry Feeder

![https://i.imgur.com/gXnIxAV.png](https://i.imgur.com/gXnIxAV.png)

- Hentry feeder is a tiny microservice, designed to run in clusters depending upon the number of participants on the system.
- Only purpose is to inject data received from the clients (hentry-client which can go upto thousands in number depending on event) into redis timeseries database.
- To compile manually, run `make build` or compile `internal/main.go` for your architecture.
- Also available as a docker container : [yashkumarverma/hentry-feeder](https://hub.docker.com/repository/docker/yashkumarverma/hentry-feeder)

## Hentry Dashboard

![https://i.imgur.com/AFGOWdM.png](https://i.imgur.com/AFGOWdM.png)
- main interface that is used by event organizers.
- clean, minimal ui
- option to search via team ID in landing page

![https://i.imgur.com/PebX7cQ.png](https://i.imgur.com/PebX7cQ.png)

- shows the friendly name of each device in team, and also their platforms.
![https://i.imgur.com/XOUdZYP.png](https://i.imgur.com/XOUdZYP.png)

- When a device a hovered 
![https://i.imgur.com/Nqp6ecN.png](https://i.imgur.com/Nqp6ecN.png)

- opening the details of any device shows a live graph of project snapshot and entropy.
- (refer video)


## Deployment
after running respective docker images, something like this should be accessible. or you can use the hosted docker images directly instead of building them manually.

The images are
- yashkumarverma/hentry-server
- yashkumarverma/hentry-feeder
- redismod
![https://i.imgur.com/aGDxRG1.png](https://i.imgur.com/aGDxRG1.png)
