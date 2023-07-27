# Pokemon Adapter Service

## Project Description

The Pokemon Adapter Service is an application that acts as an intermediary between a client and other data sources, such as a database and a GraphQL API. Its main purpose is to provide a unified interface for obtaining Pokemon information.

## Prerequisites

- Docker
- Docker Compose
- NodeJs 18
- Yarn

## How to Run the Service

1. Clone the repository:

```bash
git clone git@github.com:AlexanderArmua/luxor-pokemon-adapter.git

cd luxor-pokemon-adapter
```

2. Copy the .env.example file and rename it to .env. Make sure to configure the necessary environment variables in the .env file. The most important ones are the variables that are between <<...>>

3. Run all:
```bash
yarn start:all
```

The service will be available at http://localhost:3000.

## API Documentation

The API exposed by the service is documented using OpenAPI. You can find the complete specification at the following link:

[https://chat.openai.com/link-to-openapi-spec](API DOCUMENTATION)

## Approach Taken

The project development followed an API-first approach. The API was first specified using OpenAPI, and then the logic and interface were implemented to comply with the specification.

## Project Structure

The project is organized into the following folders:

- src: Contains the application source code.
- prisma: Contains files related to the Prisma ORM and database migrations.

## Configuration of Environment Variables

The required environment variables to configure the service are as follows:

- NODE_ENV: Application environment (e.g., "development" or "production").
- DATABASE_URL: PostgreSQL database URL in the format postgresql://user:password@host:port/database.
- API_GRAPHQL_POKEMONS: External GraphQL API URL to retrieve Pokemon information.

## Useful Commands

- yarn dev: Start the service in development mode using nodemon for automatic restart.
- yarn migrate:prod: Deploy database migrations in production environment using Prisma.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


I hope this helps! If you have any further requests or questions, feel free to ask.

