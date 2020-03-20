# Expensify Spend Tracker

Uses the Google App Script API to generate a sheet containing my expenses year-over-year
as reported by Expensify.

# How to use

## What You'll Need

- A computer :)
- Docker (You can install it by going to https://docker.io)
- Git (If you don't have Git installed, visit https://git-scm.org for instructions.)
- About 20-30 minutes

## Clone this repository

If you're on a  Mac, open Terminal by hitting the Command and Space keys and typing "Terminal."

If you're on Windows, click on "Start", then type "Run". Type "cmd", then press "Enter."

Clone this repository: `git clone https://github.com/contino/expensify_spend_tracker`.


## Create a new Google Cloud project

First, we are going to create a new Google Cloud project. This might seem daunting, but it's
actually really easy!

1. Go to https://console.cloud.google.com and login with your Google account.
2. Next, follow the steps to create a new project. You can view those
   here: https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project
3. Next, we need to enable the Apps Script API. You can learn how to do that
   here: https://cloud.google.com/apis/docs/getting-started?hl=fr#enable_an_api

   Scroll down to "Enabling APIs". Ensure that you select "Apps Script".

Take note of the "Project ID" and "Project Number", as you will need those later.

## Allow your app to talk to Google Sheets

Next, we need to create a credential to allow our project to talk to Google Sheets.
To do that, follow these instructions: https://support.google.com/cloud/answer/6158849?hl=en

Click on "User Content." When asked, you are creating an "Internal" app, and you can
name the app anything you want.

Create an OAuth 2.0 credential. Name the app anything you want. The type of application is "Other."

When the credential has been created, click on the Download button and save it into the folder
that you created at the "Clone this repository" step (it should be called
`expensify_spend_tracker`.) The file **MUST** be called `creds.json`.

## Enable Expensify Developer Access

You'll need to enable Expensify developer access for these scripts to work.
To do that, visit https://www.expensify.com/tools/integrations/. Take note of
the `partnerUserID` and `partnerUserSecret`, as you will need those later.

## Create a new Google Sheet and Script

Next, we are going to create a new Google sheet and script for that sheet. The script runs on Google
Apps Scripts. This is more-or-less equivalent to VBA for Microsoft Office, except it uses JavaScript
instead of VBA as its language of choice.

1. Create a new Google Sheet by visiting `https://sheets.new` from your browser.
   Log into your Google account when prompted.
2. Next, create a new script by clicking on "Tools", then "Script Editor." Click on
   "Untitled Project" and give it a name.
3. Next, click on "Resources" then "Cloud Platform Project". Paste the project number
   you saved from earlier, then click "Set Project", then click "Close."
4. Copy the URL in the address bar then run this command to get your script's ID:
   `docker-compose run --rm get-script-id https://script.google.com/...`

   Keep a note of this, as we will need it soon.

## Set up Clasp

[clasp](https://github.com/google/clasp) is the tool that this project uses to push the files in
this repository into your Google Sheet.

This step configures clasp so that it can talk to your Google Sheet, your Google Apps Script and
your project in Google Cloud. (whew!)

4. Get the script's ID. Copy the URL in the address bar then run this command and paste it
   to the end, like this: `docker-compose run --rm get-script-id https://script.google.com/...`
5. In the terminal or command prompt, type: `cp .env.example .env`. This will create a
   `.env` configuration file.
6. Open `.env` in an editor and fill out the values therein. This is where
   you use the script ID obtained from step [6].
   1. Lines 4 and 8 can be ignored.
   2. Use the project ID, project number and script ID that you obtained earlier here.
8. Initialize clasp: `docker-compose run --rm initialize-clasp`

## Login and deploy

9. Login: `docker-compose run --rm login`
10. Configure the script so that it uses stuff from your `.env`: `docker-compose run --rm configure`
11. Ensure that everything's working: `docker-compose run --rm tests`

    The results should look like the below:

    ```sh
    $: docker-compose run --rm tests
    1..11
    ok 1 Our Expensify API works
    ok 2 requestJobDescriptions for Expensify API are generated correctly (w/o inputs)
    ok 3 requestJobDescriptions for Expensify API are generated correctly (with inputs)
    ok 4 We can issue API requests to Expensify
    ok 5 Expensify creates a file with all of the expenses from a given start date
    ok 6 Report JSON can be fetched and is correct
    ok 7 Fetches credit card from v1 tagging format
    ok 8 Fetches credit card from v2 tagging format
    ok 9 Shows no card data when format is invalid
    ok 10 We get the right range
    ok 11 We get the right year
    ```

## Run the script and enjoy!

Reload the "Test Sheet" Google sheet. It should start populating values from Expensify.

This can take a while if you have a lot of expenses to load. If it gets stuck,
open the "Script Editor", click on "main.gs" on the left, then click on
"Select function", click on "onOpen" and press Play.

"Sheet1" will be deleted automatically. This is the only sheet that this
script will delete. You can add other sheets to further analyze the data retrieved.

# Questions

## I want to change the Expensify account used for this script. How can I do that?

1. Edit the `.env` file.
2. Re-configure clasp: `docker-compose run --rm configure`.

## What kinds of expenses does this tool pull?

Expensify Spend Tracker captures every expense from every report.
