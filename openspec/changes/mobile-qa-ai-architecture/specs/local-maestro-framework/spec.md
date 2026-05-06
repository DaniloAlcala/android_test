## ADDED Requirements

### Requirement: Store and organize Maestro test files
The system SHALL provide a directory structure and convention for storing Maestro YAML test files that can be discovered and executed together.

#### Scenario: Test files are organized by feature
- **WHEN** a QA engineer creates a test for the login feature
- **THEN** the test MUST be stored in `/qa-automation/maestro/login/` with a descriptive filename like `login-success.yaml`

#### Scenario: Tests follow consistent naming
- **WHEN** tests are stored in the maestro directory
- **THEN** all test files MUST follow the pattern `<feature>-<scenario>.yaml` (e.g., `login-success.yaml`, `checkout-with-coupon.yaml`)

### Requirement: Execute all local tests with a single command
The system SHALL provide a script that discovers and runs all Maestro tests in the local framework without manual intervention.

#### Scenario: User runs all tests
- **WHEN** a QA engineer executes `bash scripts/run-tests.sh`
- **THEN** the script MUST start the emulator, deploy the app, run all tests in `/qa-automation/maestro/`, and report results

#### Scenario: Test output is readable
- **WHEN** tests complete execution
- **THEN** the output MUST show pass/fail status for each test with clear error messages for failures

### Requirement: Define test structure in YAML
The system SHALL support Maestro YAML syntax for defining test steps, assertions, and app interactions.

#### Scenario: Test includes app launch and assertions
- **WHEN** a test is defined with launchApp and assertVisible steps
- **THEN** Maestro MUST execute these steps in order and report results
