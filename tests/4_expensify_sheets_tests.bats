#!bats
load clasp_helper

@test "We get the right range" {
  run_function "generateExpensifySheetRange" '["1", "1"]'
  [[ "$output" == "A1:F1" ]]
}

@test "We get the right year" {
  run_function "getExpenseYear" '"2016-11-18 22:56:26"'
  [[ "$output" == "2016" ]]
}
