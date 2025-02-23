# End-to-End Testing of Simple Weather App

![GitHub Actions Status](https://github.com/joridocom/jd-my-weather-app/actions/workflows/playwright.yml/badge.svg)

## Objective

The purpose of this repo is to create an end-to-end workflow for testing a simple web app and having traceability from requirements to test. The overall "system" should run regression tests after each new feature is implemented. The release candidate will be tested in the staging environment. If that passes the quality gates, then gets put into production.

This is only for personal learning purposes. :)

## Tasks

1. Write requirements [WIP] -> wrote a draft of business, user, and system requirements, with some more detailed requirements.
2. Implement only a portion of the front end -> two weather cards with weather generated randomly
3. Write a test and have it executed locally and GHA -> one is done
4. Write a script to create a report to link the test to the requirements --> done need work on making it easier
5. Create a workflow to create a release candidate
6. Create a workflow to create a staging environment and run tests
7. Create a workflow to provision the passing candidate to a "production" environment
   [Other tasks to be added when it comes to mind]

## Tech Stack

- FrontEnd - HTML, CSS (Tailwind), JS
- Backend - Node.js
- VersionControl - Git/GitHub
- CI/CD - GHA where possible
- Testing - Playwright
- Static Code Analysis - Prettier, ESlint
- Hosting - AWS EC2 (tent.)
- Provision - Terraform (tent.)
- Other - Husky
