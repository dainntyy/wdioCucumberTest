Feature: Test sorting feature on inventory page

  Background:
    Given User is logged in to the inventory page

  Scenario Outline: Sort inventory items by <option>
    When User sorts items by "<option>"
    Then Items should be sorted correctly by "<option>"

    Examples:
      | option |
      | az     |
      | za     |
      | lohi   |
      | hilo   |
