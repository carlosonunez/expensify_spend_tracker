#!bats
load clasp_helper

@test "We get the right range" {
  run_function "generateExpensifySheetRange" '["1", "1"]'
  [[ "$output" == "A1:F1" ]]
}
