Feature: VoteResultSearchPage

  Scenario: Given I am on the "/" route
    Then the "vote-result-card" is present
    When I click the "go-to-create-question-button" button
    Then I am on the "/create_question" route