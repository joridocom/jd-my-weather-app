#!/bin/bash
npx playwright test --reporter=json > test-results.json
node test-report-generator.js