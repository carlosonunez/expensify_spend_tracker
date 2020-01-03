#!bats
load clasp_helper

@test "Expensify creates a file with all of the expenses from a given start date" {
  run_function getExpensifyReportsFileName '["2016-01-01", "1"]'
  [[ "$output" =~ "trackingSpreadsheetDump" ]]
}

@test "Report JSON can be fetched and is correct" {
  run_function getExpensesFromExpensify '["2016-01-01", "1", true]'
  for key in dateIncurred merchant category tags amountUSD expenseReport
  do
    key_test=$( echo "$output" | jq -r --arg KEY "$key" '.[0] | .[$KEY]?' )
    [ "$key_test" != "null" ]
    if [ "$key_test" == "null" ]
    then
      echo "Failed: Key not present -- $key (got: $key_test)"
    fi
  done
}
