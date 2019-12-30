#!bash
push_functions() {
  [ "$BATS_TEST_NUMBER" -eq 1 ] && {
    >&2 echo "INFO: Updating functions in GAS."
    >&2 clasp push --force
  }
}

# clasp uses cli-spinner and does not disable it in the absence of a TTY.
# this mucks with its output by adding invisible escape characters
# zap them before sending the output back.
run_function() {
  if [ -z "$2" ]
  then
    run clasp run "$1"
  else
    echo "INFO: Sending parameters: $2"
    run clasp run "$1" -p "$2"
  fi
  output="$(echo "${output//$'\r'}" | \
    sed 's,\x1B\[[0-9;]*[a-zA-Z],,g' | \
    grep -v 'Running in dev mode.')"
  echo "INFO: Result from GAS: $output"
}
