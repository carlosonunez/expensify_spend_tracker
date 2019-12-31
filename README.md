# Expensify Spend Tracker

Uses the Google App Script API to generate a sheet containing my expenses year-over-year
as reported by Expensify.

# How to use

1. Create `.env` from `.env.example` and fill out the values therein.
2. Follow [these](https://github.com/google/clasp/blob/master/docs/run.md) instructions for
   creating a Google Cloud project for `clasp`. This will let you run unit tests with
   `clasp run`.
3. Login: `docker-compose run --rm login`
4. Create a script: `docker-compose run --rm create`

# Adding new functions

Adding a new function is easy:

1. Write a test for it in the `tests/` folder.
2. Add your function (this project uses TypeScript).
3. Run your tests, ensure that they pass: `docker-compose run --rm test`
4. Deploy: `docker-compose run --rm deploy`

# Adding a secret

This project supports setting sensitive data to the script through its script properties.
These properties are only accessible to you, even if you share the script with others.
Here's how to add a new secret:

1. Add your secret to `.config.yml.tmpl`
2. Then add it to the script: `docker-compose run --rm configure`
