Feature: Test login feature

  Scenario Outline: Check login with valid credentials
    Given User is located on the main page of saucedemo website
    When User enters <username> and <password>
    And User clicks "Login" button
    Then User should see inventory container

    Examples:
      | username      | password     |
      | standard_user | secret_sauce |
      | visual_user   | secret_sauce |

  Scenario Outline: Check login with invalid credentials
    Given User is located on the main page of saucedemo website
    When User enters <username> and <password>
    And User clicks "Login" button
    Then User should see "Epic sadface: Username and password do not match any user in this service" error message

    Examples:
      | username      | password     |
      | wrong_user    | secret_sauce |
      | standard_user | wrong_sauce  |

  Scenario: Check login with empty credentials
    Given User is located on the main page of saucedemo website
    When User clicks "Login" button
    Then User should see "Epic sadface: Username is required" error message
