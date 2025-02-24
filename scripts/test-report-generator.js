// test-report-generator.js
const fs = require('fs');
const { parseMarkdownTable } = require('./parse-markdown');

// 1) A helper function that recursively gathers *all* specs from a suite tree.
function collectAllSpecs(suites = []) {
  let specs = [];
  for (const suite of suites) {
    // Add this suite's specs
    specs = specs.concat(suite.specs || []);
    // Recursively gather specs from child suites
    if (suite.suites) {
      specs = specs.concat(collectAllSpecs(suite.suites));
    }
  }
  return specs;
}

function generateReport(requirementsFile, testResultsFile) {
  // Load data
  const requirements = parseMarkdownTable(requirementsFile);
  const testResults = JSON.parse(fs.readFileSync(testResultsFile, 'utf8'));

  // 2) Collect every spec from the entire suite tree
  const allSpecs = collectAllSpecs(testResults.suites);

  // Map requirements to test results
  const report = requirements.map((req) => {
    // 3) Find a spec that has a test referencing this requirement code
    const linkedSpec = allSpecs.find((spec) =>
      // For each spec, check all "tests" for matching annotations
      (spec.tests || []).some((test) =>
        (test.annotations || []).some(
          (ann) => ann.type === 'requirement' && ann.description === req.Code
        )
      )
    );

    return {
      Code: req.Code,
      Requirement: req['Detailed Requirement'],
      Test: linkedSpec ? linkedSpec.title : 'No test linked',
      Status: linkedSpec ? (linkedSpec.ok ? 'Passed' : 'Failed') : 'Not Tested',
    };
  });

  // Calculate statistics
  const totalReqs = requirements.length;
  const testedReqs = report.filter((r) => r.Test !== 'No test linked').length;
  const passedReqs = report.filter((r) => r.Status === 'Passed').length;

  const coveragePercent = (testedReqs / totalReqs) * 100;
  const passPercent = (passedReqs / totalReqs) * 100;

  // Generate report output
  console.log('## Test Coverage Report');
  console.log(
    '| Requirement Code | Requirement Description | Test Description | Status |'
  );
  console.log(
    '| ---------------- | ----------------------- | ---------------- | ------ |'
  );
  report.forEach((r) => {
    console.log(`| ${r.Code} | ${r.Requirement} | ${r.Test} | ${r.Status} |`);
  });

  console.log('\n## Statistics');
  console.log(`- Total Requirements: ${totalReqs}`);
  console.log(
    `- Requirements with Tests: ${testedReqs} (${coveragePercent.toFixed(2)}%)`
  );
  console.log(
    `- Requirements with Passing Tests: ${passedReqs} (${passPercent.toFixed(2)}%)`
  );

  // Optionally write to a file
  const reportContent =
    report
      .map((r) => `${r.Code}: ${r.Requirement} -> ${r.Test} (${r.Status})`)
      .join('\n') +
    `\n\nTotal: ${totalReqs}, Tested: ${testedReqs} (${coveragePercent.toFixed(2)}%), Passed: ${passedReqs} (${passPercent.toFixed(2)}%)`;

  fs.writeFileSync('report.md', reportContent);
}

// Adjust the paths if your script folder is different
generateReport('../docs/SR-requirements.md', '../test-results.json');
