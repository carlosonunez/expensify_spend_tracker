# Expensify Spend Tracker

Uses the Google App Script API to generate a sheet containing my expenses year-over-year
as reported by Expensify.

# How to use

2. Follow [these](https://github.com/google/clasp/blob/master/docs/run.md) instructions for
   creating a Google Cloud project for `clasp`. This will let you run unit tests with
   `clasp run`.

   Take note of your project's auto-generated name and project number.
3. Create a new Google Sheet by visiting `https://sheets.new` from your browser.
   Log into your Google account when prompted.
4. Next, create a new script by clicking on "Tools", then "Script Editor." Click on
   "Untitled Project" and give it a name.
5. Next, click on "Resources" then "Cloud Platform Project". Paste the project number
   you saved from step 2, then click "Set Project", then click "Close."
6. Get the script's ID. Copy the URL in the address bar then run this command and paste it
   to the end, like this: `docker-compose run --rm get-script-id https://script.google.com/...`
7. Create `.env` from `.env.example` and fill out the values therein. This is where
   you use the script ID obtained from step [6].
8. Initialize clasp: `docker-compose run --rm initialize-clasp`
9. Login: `docker-compose run --rm login`
10. Create a script: `docker-compose run --rm create`

# Adding new functions

Adding a new function is easy:

1. Write a test for it in the `tests/` folder.
2. Add your function (this project uses TypeScript).
3. Run your tests, ensure that they pass: `docker-compose run --rm test`
4. Deploy: `docker-compose run --rm deploy`

## Adding new scopes

You may need to add new scopes for your function to work. If you need to do this:

1. Add the scope to the "oauthScopes" section in `appsscript.json`
2. Login again: `docker-compose run --rm login`

# Adding a secret

This project supports setting sensitive data to the script through its script properties.
These properties are only accessible to you, even if you share the script with others.
Here's how to add a new secret:

1. Add your secret to `.config.yml.tmpl`
2. Then add it to the script: `docker-compose run --rm configure`
