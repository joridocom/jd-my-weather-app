const fs = require('fs');

function parseMarkdownTable(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter((line) => line.trim());
  const headers = lines[0]
    .split('|')
    .map((h) => h.trim())
    .filter(Boolean);
  const requirements = lines.slice(2).map((row) => {
    const cols = row
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean);
    return headers.reduce((obj, header, i) => {
      obj[header] = cols[i];
      return obj;
    }, {});
  });
  return requirements;
}

// Export as a named function
module.exports = { parseMarkdownTable };

const requirements = parseMarkdownTable('../docs/SR-requirements.md');
console.log(requirements);
