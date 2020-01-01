#!bats
load clasp_helper

setup() {
  [ "$BATS_TEST_NUMBER" -eq 1 ] && push_functions || true
}

@test "Our Expensify API works" {
  run_function tellExpensifyToSayHi
  [ "$output" == "Your Expensify scripts say 'Hi!'" ]
}

@test "requestJobDescriptions for Expensify API are generated correctly (w/o inputs)" {
  run_function generateRequestJobDescription '["foo", "bar", "baz"]'
  [[ "$output" =~ "type: 'foo'" ]]
  [[ "$output" =~ "credentials: { partnerUserSecret: 'baz', partnerUserID: 'bar' }" ]]
  [[ "$output" =~ "inputSettings: {}" ]]
  [[ "$output" =~ "outputSettings: {}" ]]
}

@test "requestJobDescriptions for Expensify API are generated correctly (with inputs)" {
  run_function generateRequestJobDescription '["foo", "bar", "baz", { "key1": "val1" }]'
  [[ "$output" =~ "type: 'foo'" ]]
  [[ "$output" =~ "credentials: { partnerUserSecret: 'baz', partnerUserID: 'bar' }" ]]
  [[ "$output" =~ "inputSettings: { key1: 'val1' }" ]]
  [[ "$output" =~ "outputSettings: {}" ]]
}

@test "We can issue API requests to Expensify" {
  job_description=$(cat <<-JSON
{ \
  "type": "policyList", \
  "adminOnly": "false", \
  "userEmail": "${EXPENSIFY_EMAIL_USERNAME}" \
}
JSON
)
  run_function runExpensifyFunction "[ $job_description ]"
  [[ "$output" =~ "\"owner\":\"${EXPENSIFY_EMAIL_USERNAME}\"" ]]
}
