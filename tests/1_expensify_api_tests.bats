#!bats
load clasp_helper

setup() {
  [ "$BATS_TEST_NUMBER" -eq 1 ] && push_functions || true
}

@test "Expensify heartbeat" {
  run_function tellExpensifyToSayHi
  [ "$output" == "Your Expensify scripts say 'Hi!'" ]
}

@test "Expensify Request Job Descriptions (with no inputs)" {
  run_function generateRequestJobDescription '["foo", "bar", "baz"]'
  [[ "$output" =~ "type: 'foo'" ]]
  [[ "$output" =~ "credentials: { partnerUserSecret: 'baz', partnerUserID: 'bar' }" ]]
  [[ "$output" =~ "inputSettings: {}" ]]
  [[ "$output" =~ "outputSettings: {}" ]]
}
