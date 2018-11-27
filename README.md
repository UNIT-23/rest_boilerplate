## Getting Started

1. Clone the repo and make it yours:

```bash
git clone https://github.com/UNIT-23/rest_boilerplate.git
cd rest_boilerplate

To use this setup, you do not need a install nodejs on your host. All what you need a running docker. This howto is only
tested on linux. The images shares the files with the host. so you need no upload to deploy your images on the container

Change to folder `docker`

execute `make compose`
#### This command start the nodejs container and change the node user in the container to the UID of current user, so you have no problems to edit, change or delete files which will create by this container

execute `docker ps` you will should see that a mysql, nginx and 1 nodejs container is running.

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
48602f0ee300        nginx:latest        "nginx -g 'daemon of…"   18 minutes ago      Up 18 minutes       0.0.0.0:80->80/tcp       nginx
939615d384d6        node                "/node/createUser.sh"    About an hour ago   Up 18 minutes                                node-server
208b4b0d2e3d        mysql:5.7           "docker-entrypoint.s…"   3 hours ago         Up 18 minutes       0.0.0.0:3306->3306/tcp   mysql
```

## Server

First you have create a db. Change to folder docker and exec:
`make create-db name=nameForYourDb`

default db name for the backend is unit23_sam, if you need a other name edit `server/db/connect.js` and set the db name you have given in the make cmd.

For the connect we use [Sequelize](http://sequelize.readthedocs.io) a node.js orm.
In the file `server/models/demo.js` you can find a demo model.
If the table is not in the database, the model will create the table on server start.  


Now you can start the express backend, Go do folder `docker` and exec `make server'
You should see:

```javascript 1.8
[nodemon] 1.18.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/app.js`
Connection has been established successfully.
```
open http://localhost/api and you should see a JSON response like

```json
    {"count":1,"rows":[{"id":1,"title":"First one","description":"","createdAt":"2018-08-12T15:05:36.000Z","updatedAt":"2018-08-12T15:05:36.000Z"}]}
```
## REST API

The REST Api is enabled for the database User table demos.
You can easy test this with [POSTMAN](https://www.getpostman.com/), [examples](https://www.getpostman.com/collections/efe585783b9e91345439) to load in POSTMAN 

### For other REST Clients:
__IMPORTANT use x-www-form-urlencoded in REST Client__
Lets start with your code;

### To run Eslint for display linting errors in sever directory use

yarn lint or npm run lint

### To run prettier and write auto format on your code in server directory

yarn format or npm run format

you can change directories in package.json file.

