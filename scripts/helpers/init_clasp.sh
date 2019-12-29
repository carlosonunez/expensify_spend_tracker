#!/usr/bin/env bash
export $(egrep -v '^#' .env | xargs)

GCP_PROJECT_ID="${GCP_PROJECT_ID?Please create a GCP_PROJECT_ID; \
see --help for more info on this.}"
GCP_PROJECT_NUMBER="${GCP_PROJECT_NUMBER?Please create a GCP_PROJECT_NUMBER; \
see --help for more info on this.}"
DEBUG="${DEBUG:-false}"

[ "$DEBUG" == "true" ] && set -x

usage() {
  cat <<-USAGE
$(basename $0)
Initializes a Clasp GCP project.

ENVIRONMENT VARIABLES

  GCP_PROJECT_ID:       The project ID for the GAS project within Google Cloud Platform.
  GCP_PROJECT_NUMBER:   The project number corresponding to GCP_PROJECT_ID

TROUBLESHOOTING

Are you seeing 'Please create a...' when running this?
=======================================================

If so, you might need to create a GCP project to run your GAS function with.
If you've already done this, simply add these env vars to .env.

See this doc to set this up: https://github.com/google/clasp/blob/master/docs/run.md
USAGE
}

add_clasp_json_to_gitignore() {
  if ! grep -q '.clasp.json' .gitignore 2>/dev/null
  then
    echo '.clasp.json' >> .gitignore
  fi
}

add_creds_json_to_gitignore() {
  if ! grep -q 'creds.json' .gitignore 2>/dev/null
  then
    echo 'creds.json' >> .gitignore
  fi
}

check_for_creds_file() {
  test -f creds.json
}

check_for_clasp_project() {
  test -f .clasp.json
}

check_for_login_file() {
  test -f .clasprc.json
}

create_clasp_project() {
  if ! check_for_clasp_project
  then
    docker-compose run --rm create
  fi
}


generate_clasp_project_file() {
  add_clasp_json_to_gitignore
  if ! grep -q "$GCP_PROJECT_ID" .clasp.json
  then
    docker-compose run --rm clasp setting projectId "$GCP_PROJECT_ID"
  fi
}

configure_appsscript_file() {
  if ! grep -q '"access": "ANYONE"' appsscript.json
  then
    cat >appsscript.json <<appsscRIPT_FILE
  {
    "executionApi": {
      "access": "ANYONE"
    }
  }
appsscRIPT_FILE
  fi
}


login_to_clasp() {
  add_creds_json_to_gitignore
  if ! check_for_creds_file
  then
    usage
    >&2 echo "ERROR: Please create or download your credentials file from GCP. \
Run 'docker-compose run --rm clasp open creds' to get the URL that does this."
    exit 1
  fi
  if ! check_for_login_file
  then
    docker-compose run --rm login
  fi
}

initialize_clasp() {
  create_clasp_project &&
    generate_clasp_project_file &&
    configure_appsscript_file &&
    login_to_clasp
}

