#!bats
load clasp_helper

setup() {
  [ "$BATS_TEST_NUMBER" -eq 1 ] && push_functions || true
}

@test "Our Expensify API works" {
  run_function tellExpensifyToSayHi
  [ "$output" == "Your Expensify scripts say 'Hi!'" ]
}

@test "We can get receipts from Carlos's Expensify API" {
  run_function fetchExpenses '"2020-12-31"'
  [[ "$output" != "*NOT_FOUND*" ]]
  [[ "$output" =~ 'amount_dollars:' ]]
}
