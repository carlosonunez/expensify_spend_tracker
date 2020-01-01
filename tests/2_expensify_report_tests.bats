#!bats
load clasp_helper

@test "Expensify creates a file with all of the expenses from a given start date" {
  run_function getExpensifyReportsFileName '["2016-01-01", "1"]'
  [[ "$output" =~ "trackingSpreadsheetDump" ]]
}

@test "Report JSON can be fetched and is correct" {
  run_function getExpensesFromExpensify '["2016-01-01", "1"]'
  expected=$(cat <<-JSON
[{"dateIncurred":"2018-12-08",\
"merchant":"Apple",\
"category":"Mobile",\
"tags":"$TEST_CREDIT_CARD_TAG",\
"amountUSD":5.4}]
JSON
)
  [[ "$output" =~ "$expected" ]]
}
