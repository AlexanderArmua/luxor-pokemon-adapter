# Pokemon Adapter Service

## Project Description

The Pokemon Adapter Service is an application that acts as an intermediary between a client and other data sources, such as a database and a GraphQL API. Its main purpose is to provide a unified interface for obtaining Pokemon information.

## Prerequisites

- Docker
- Docker Compose
- NodeJs 18

## How to Run the Service

1. Clone the repository:

```bash
git clone git@github.com:AlexanderArmua/luxor-pokemon-adapter.git

cd luxor-pokemon-adapter
```

2. Copy the .env.example file and rename it to .env. Make sure to configure the necessary environment variables in the .env file. The most important ones are the variables that are between <<...>>

3. Run all:
```bash
npm run start:all
```

The service will be available at [http://localhost:3000](http://localhost:3000)

## API Documentation

The API exposed by the service is documented using OpenAPI. You can find the complete specification at the following link:

[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## Database Client
We can check the database status, connecting to it with any Postgresql client. The credentials are the same as the .env file.
- Username: alexander
- Password: admin1234

## Approach Taken

The project development followed an API-first approach. The API was first specified using OpenAPI, and then the logic and interface were implemented to comply with the specification.

## Project Structure

The project is organized into the following folders:

- src: Contains the application source code.
- src/config: Contains the entry point to read configurations.
- src/controllers: Intermediary between routes and services, handle error messages and status codes.
- src/lib: Contains files useful in the entire project db, events and logger.
- src/middlewares: Contains middleware files to handle errors.
- src/repositories: Contains access to database and graphql external api.
- src/routes: Routes definition.
- src/services: Contains bussiness logic, like decide if go to db or api and cache.
- src/types: Contains types definitions.
- prisma: Contains files related to the Prisma ORM and database migrations.

## Configuration of Environment Variables

The required environment variables to configure the service are as follows:

- NODE_ENV: Application environment (e.g., "development" or "production").
- DATABASE_URL: PostgreSQL database URL in the format postgresql://user:password@host:port/database.
- API_GRAPHQL_POKEMONS: External GraphQL API URL to retrieve Pokemon information.
- PORT: Port that the service uses.
- POKEMON_ADAPTER_URL: Current url where the service can be called.

## Useful Commands

- npm run dev: Start the service in development mode using nodemon for automatic restart.
- npm run migrate:prod: Deploy database migrations in production environment using Prisma.
- npm run prisma:generate: Generates Prisma Database client library to allow us to interact with the database using a type-safe API.

## Layer Diagram
![Luxor Pokemon Adapter Layer Diagram](./Pokemon%20Luxor%20Adapter.png)

## Mentions
Here is a list of assumtions or improvements that could be done
1. Evolutions: We request to GRAPHQL API for a maximum of 3 evolutions, then recursively start to inserting al pokemons. The adapter has to be modified if we want to support new evolutions types (like super-evolutions wich is with two pokemons fusionated).
2. Pokemon Repository and Concurrency: Another solution instead of an upser it could be to use a MUTEX. For example, we don't know if 2 different users request for the same pokemon that doesn't exist in our database, both will go to the API and both will generate an event to insert. If we have a micro-service architecture it will be necesary to implement an external MUTEX server, to lock the code flow for that pokemon and allowing only one thread to insert. I replaced that implementation using an upsert.
3. Pokemon Repository inserting evolutions (storeOne): I couldn't find a prisma query that allows me to do recursive inserts for a pokemon and it's evolutions, so I decided to implement a recursive function to insert a pokemon, then their evolutions and finally they relationship between the first pokemon and their evolutions. The only issue is if in the middle of the process something crashes and stop saving we could have inconcistent data. An approach to avoid it could be to create all transactions but call them all at the same time using prisma.$transaction so, we are sure is an atomic operation. And another could be to set a flag on each pokemon like "synced" and only return data from adapter if exists and the flag is on "true".
4. Pagination: The graphql adapter doesn't tell us how many pokemons exists in consecuence we cannot tell to the user how is the maximum. That's the reason because we only have "skip" and "take".
5. Pagination: We asume that pokemons on Graphql api are sorted by number, anyway it can be solved implementing a sort function or calling again itself after syncing all pokemons to return in good format.
6. Pagination trade offs on last results: As the adapter couldn't know how many pokemons exists on the API, if an user calls to the adapter and puts "skip: 150, take: 10", the database will only find 1 pokemon and then will call to the API, the API will return results and then will be returned to the user. But even though this result has been cached, we don't know if in the future the API implements new pokemons so maybe exists a pokemon 152.
7. ts-ignore on controllers: I created a middleware to add a function on "response" to return easily with the same format all success messages. But typescript on transpile time failed and I added that comment to allow me to continue working.
8. Credentials: In a real project I will never store them on a file like .env.example
9. Docker: I couldn't run the entire project on Docker because unfurtunately in the last development phases I discovered to use Docker and prisma at the same time requires a new file to handle migrations [Link](https://stackoverflow.com/questions/66646432/how-do-i-run-prisma-migrations-in-a-dockerized-graphql-postgres-setup). 

## License
This project is licensed under the MIT License - see the LICENSE file for details.


I hope this helps! If you have any further requests or questions, feel free to ask.

