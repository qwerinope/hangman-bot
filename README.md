# Hangman-bot

discord bot that plays hangman!!!
YIPPEEE

# how to run
use docker compose lmao

```yaml
services:
  hangman:
    image: ghcr.io/qweri0p/hangman-bot:main
    container_name: hangman-bot
    environment:
      - TOKEN=$TOKEN
      - CLIENT_ID=$CLIENT_ID

  postgres:
    image: postgres:latest
    container_name: db
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=123password #this doesn't matter as this is only exposed in the local docker network
    volumes:
      - db:/var/lib/postgresql/data

volumes:
  db: 
```

once docker compose is running, run `docker compose exec hangman yarn createdb` to setup the database correctly

also rename .example.env to .env and put the correct data in it in regards to the discord bot

who/cares
