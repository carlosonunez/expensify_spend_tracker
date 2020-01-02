#!bats
load clasp_helper

@test "Fetches credit card from v1 tagging format" {
  test_tag="Carlos:Credit:Foo 1234"
  run_function getCreditCardFromTag "\"$test_tag\""
  [[ "$output" == "Foo 1234" ]]
}
