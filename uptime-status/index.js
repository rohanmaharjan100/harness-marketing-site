const fs = require('fs');
const Papa = require('papaparse');

const csvData = fs.readFileSync('./csv.csv', 'utf8');

const parsed = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

const filteredRows = parsed.data.filter((row) => row['Cluster name'] === 'Prod 3');

// const outputCSV = Papa.unparse(filteredRows);

// fs.writeFileSync('filtered-file.csv', outputCSV);

const data = filteredRows.map((row) => ({
  component: row['Component'] || '', // default to empty string if missing
  date: row['Date'], // make sure your CSV has this column
  uptime: row['Uptime'], // or '100' if it's hardcoded
  cluster: row['Cluster name'],
}));

fs.writeFileSync('filtered-data.json', JSON.stringify(data, null, 2));
