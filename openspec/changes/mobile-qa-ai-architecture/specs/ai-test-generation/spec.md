## ADDED Requirements

### Requirement: Generate Maestro test files from natural language descriptions
The system SHALL accept test descriptions in natural language and produce valid Maestro YAML test files using OpenAI GPT.

#### Scenario: AI generates a valid test file
- **WHEN** a QA engineer provides a description like "Login with valid email and password, then verify home screen appears"
- **THEN** the system MUST call OpenAI GPT and generate a valid Maestro YAML file with appropriate steps (launchApp, tapOn, inputText, assertVisible)

#### Scenario: Generated test file can be executed
- **WHEN** the AI-generated test file is saved to `/qa-automation/maestro/`
- **THEN** running it with Maestro MUST produce a valid result (pass or fail, not syntax error)

### Requirement: Support manual test review before execution
The system SHALL allow QA engineers to review and edit AI-generated tests before committing them to the test suite.

#### Scenario: Generated test is output for review
- **WHEN** the AI generation script completes
- **THEN** it MUST output the generated YAML to the console and/or a file for human review

#### Scenario: QA engineer can modify generated test
- **WHEN** a test is generated
- **THEN** the QA engineer MUST be able to edit the YAML file, adjust steps, add assertions, or fix issues before running it

### Requirement: Integrate with OpenAI API
The system SHALL call OpenAI's GPT API with appropriate prompts to generate test content.

#### Scenario: API call includes test description context
- **WHEN** generating a test
- **THEN** the system MUST send the test description, app ID, and Maestro syntax examples to GPT in the prompt
