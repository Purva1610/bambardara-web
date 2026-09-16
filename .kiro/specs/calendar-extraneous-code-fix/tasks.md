# Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - File Contains Extraneous Code After Export Statement
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped Approach**: Focus on the concrete failing case - extraneous code exists after `export default Calendar;`
  - Read Calendar.jsx file and parse its content
  - Locate the `export default Calendar;` statement position
  - Check if any non-whitespace content exists after the export statement
  - Assert that NO content should exist after export statement (this represents expected behavior)
  - Document the extraneous code found (jsx keyword, import statement, pages object)
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - The test failure confirms that extraneous code is present, validating the bug condition
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Component Content Before Export Unchanged
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code: all content before `export default Calendar;` includes imports, helper functions, Calendar component, JSX, and styling
  - Create a snapshot or checksum of content from start of file up to and including `export default Calendar;` line
  - Write test that captures the structure: imports section, helper functions (pad, dateKey, getTodayKey, formatDisplayDate, formatTime, eventStartDate, eventEndDate), Calendar component definition, all hooks and state, all event handlers, JSX structure, style tag, export statement
  - Assert that these sections exist in the correct order and are complete
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 3. Fix for extraneous code after export statement

  - [ ] 3.1 Implement the fix
    - Open src/pages/Calendar.jsx file
    - Locate the `export default Calendar;` statement (approximately line 1192)
    - Identify all content after the export statement including empty lines, "jsx" text, import statement, and pages object
    - Delete all lines from the line immediately after `export default Calendar;` to the end of file
    - Ensure file ends cleanly with `export default Calendar;` followed by a single newline
    - Save the file
    - _Bug_Condition: isBugCondition(file) where file.hasContentAfterExport() AND file.contentAfterExport.length > 0_
    - _Expected_Behavior: NOT hasContentAfterExport(fixedFile) AND fixedFile.endsWithExportStatement()_
    - _Preservation: All content before export statement (imports, helper functions, Calendar component, JSX, styling, export statement) must remain unchanged_
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 3.1, 3.2, 3.3_

  - [ ] 3.2 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - File Ends with Export Statement (No Extraneous Code)
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior (no content after export)
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - Verify no content exists after `export default Calendar;` statement
    - Verify file ends with export statement as final executable code
    - _Requirements: 2.1, 2.2_

  - [ ] 3.3 Verify preservation tests still pass
    - **Property 2: Preservation** - Component Content Remains Intact
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Verify all content before export statement matches the original snapshot
    - Verify imports, helper functions, component code, and export statement are unchanged
    - Confirm all tests still pass after fix (no regressions)

- [ ] 4. Checkpoint - Ensure all tests pass and application runs correctly
  - Run all tests created in steps 1-3
  - Verify Calendar.jsx can be successfully imported by the application
  - Start the development server and navigate to the Calendar page
  - Verify the Calendar component renders correctly
  - Test basic calendar functionality (view current month, navigate months, view events)
  - Check browser console for any module loading errors or runtime errors
  - Ensure all tests pass and application functions without issues
