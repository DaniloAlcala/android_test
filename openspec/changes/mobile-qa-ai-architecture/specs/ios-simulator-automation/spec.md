## ADDED Requirements

### Requirement: Run tests on iOS Simulator using GitHub Actions
The system SHALL execute Maestro tests on iOS simulators using macOS GitHub Actions runners.

#### Scenario: iOS simulator launches in GitHub Actions
- **WHEN** the iOS test workflow runs on a macOS runner
- **THEN** the system MUST successfully boot an iOS simulator with Xcode installed

#### Scenario: App is installed and tested on iOS simulator
- **WHEN** the iOS test environment is ready
- **THEN** the target app MUST be installed on the iOS simulator and Maestro tests MUST execute

### Requirement: Support Maestro on iOS platform
The system SHALL execute the same test definitions (Maestro YAML) on iOS as on Android, with platform-specific configurations as needed.

#### Scenario: Same test file runs on both Android and iOS
- **WHEN** a test is defined in Maestro YAML format
- **THEN** it MUST be executable on both Android and iOS simulators without modification (assuming app APIs are identical)

### Requirement: Report iOS test results in GitHub Actions
The system SHALL display iOS test results separately from Android, allowing comparison and tracking across both platforms.

#### Scenario: iOS test results are visible in workflow
- **WHEN** iOS tests complete
- **THEN** GitHub Actions MUST show pass/fail status for iOS tests and allow filtering/viewing results separately from Android

### Requirement: Coordinate Android and iOS test execution
The system SHALL allow running Android and iOS tests in the same workflow with clear separation and status reporting.

#### Scenario: Both Android and iOS tests run in one workflow
- **WHEN** a developer pushes code
- **THEN** the workflow MUST run both Android and iOS tests, and provide a combined report showing status for both platforms
