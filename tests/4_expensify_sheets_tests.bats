#!bats
load clasp_helper

# see expensify/sheets.ts for a list of current headers we are testing against
@test "We get the right range" {
  run_function "generateExpensifySheetRange" '["1", "1"]'
  [[ "$output" == "A1:G1" ]]
}

@test "We get the right year" {
  run_function "getExpenseYear" '"2016-11-18 22:56:26"'
  [[ "$output" == "2016" ]]
}
