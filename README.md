
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

    
### 📚 Description

This boilerplate is made to quickly prototype backend applications. It comes with database, logging, security, and authentication features out of the box.

---

### 🛠️ Prerequisites

#### Non Docker

- Please make sure to either have MongoDB Community installed locally or a subscription to Mongo on the cloud by configuration a cluster in [atlas](https://www.mongodb.com/cloud/atlas). 

#### Docker 🐳

- Please make sure to have docker desktop setup on any preferred operating system to quickly compose the required dependencies. Then follow the docker procedure outlined below.

**Note**: Docker Desktop comes free on both Mac and Windows, but it only works with Windows 10 Pro. A workaround is to get [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/) which will bypass the Windows 10 Pro prerequisite by executing in a VM.

---

### 🚀 Deployment

#### Manual Deployment without Docker

- Create a `.env` file using the `cp .env.example .env` command and replace the existing env variables with personal settings (MongoDB URL either `srv` or `localhost`)
	- Modify the connection string by modifying the following [line](https://github.com/msanvarov/nest-rest-mongo-boilerplate/blob/master/.env.example#L10).

- Download dependencies using `npm i` or `yarn`

- Start the app in pre-production mode using `yarn start` or `yarn start:dev` for development (the app will be exposed on the port 9000; not to conflict with React, Angular, or Vue)

#### Deploying with Docker 🐳

- Execute the following command in-app directory:

```bash
# creates and loads the docker container with required configuration
$ docker-compose up -d 
```
- The following command will set up and run the docker project for quick use. Then the web application, and MongoDB will be exposed to http://localhost:9000 and http://localhost:27017 respectively.

### 🔒 Environment Configuration

By default, the application comes with a config module that can read in every environment variable from the `.env` file.

**APP_ENV** - the application environment to execute as, either in development or production. Determines the type of logging options to utilize. Options: `dev` or `prod`. 

**APP_URL** - the base URL for the application. Made mainly to showcase the power of `ConfigService` and can be removed as it doesn't serve any other purpose

**WEBTOKEN_SECRET_KEY** - the secret key to encrypt/decrypt web tokens with. Make sure to generate a random alphanumeric string for this.

**WEBTOKEN_EXPIRATION_TIME** - **the time in seconds** indicating when the web token will expire; by default, it's 2400 seconds which is 40 mins.

**DB_URL** - the URL to the MongoDB collection

---

### 🏗 Choosing a Web Framework

Express:

```ts
// for express:
import * as headers from 'helmet';
import * as rateLimiter from 'express-rate-limit';
const app = await NestFactory.create(AppModule, {
  logger: console,
});
app.use(headers());
app.use(
  rateLimiter({
    windowMs: 60, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
```

### 💡 Format code use Prettier

```bash
# generate docs for code
$ yarn format
```

### 💡 TypeDocs

The documentation for this boilerplate can be found [on Github pages](https://msanvarov.github.io/nest-rest-mongo-boilerplate/).

The docs can be generated on-demand, simply, by typing `yarn typedocs`. This will produce a **docs** folder with the required front-end files and **start hosting on [localhost](http://localhost:8080)**.

```bash
# generate docs for code
$ yarn typedocs
```

---

### 📝 Open API

Out of the box, the web app comes with Swagger; an [open api specification](https://swagger.io/specification/), that is used to describe RESTful APIs. Nest provides a [dedicated module to work with it](https://docs.nestjs.com/recipes/swagger).

The configuration for Swagger can be found at this [location](https://github.com/msanvarov/nest-rest-mongo-boilerplate/tree/master/src/swagger).

---

### ✨ Mongoose

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box. Please view the [documentation](https://mongoosejs.com) for further details.

The configuration for Mongoose can be found in the [app module](https://github.com/msanvarov/nest-rest-mongo-boilerplate/blob/master/src/modules/app/app.module.ts#L17).

---

### 🔊 Logs

This boilerplate comes with an integrated Winston module for logging, the configurations for Winston can be found in the [app module](https://github.com/msanvarov/nest-rest-mongo-boilerplate/blob/master/src/modules/app/app.module.ts#L27).

---

### 👥 Support

Nest has been able to grown because of sponsors and support from backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

---

## License

Nest is [MIT licensed](LICENSE).

[Author](https://msanvarov.github.io/personal-portfolio/)

