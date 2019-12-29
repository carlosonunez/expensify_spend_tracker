#!/usr/bin/env bash
DEBUG="${DEBUG:-false}"

turn_on_debugging() {
  [ "$DEBUG" == "true" ] && set -x
}

turn_off_debugging() {
  [ "$DEBUG" == "true" ] && set +x
}
