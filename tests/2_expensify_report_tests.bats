#!bats
load clasp_helper

@test "Expensify creates a file with all of the expenses from a given start date" {
  run_function getExpensifyReportsFileName '["2016-01-01", "1"]'
  [[ "$output" =~ "trackingSpreadsheetDump" ]]
}
