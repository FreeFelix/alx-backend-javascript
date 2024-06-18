const http = require('http');
const fs = require('fs');

// Define the port and host for the server
const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath - The path to the CSV data file.
 * @returns {Promise<String>} - A promise that resolves to a report string.
 * @throws Will reject with an error if the database cannot be loaded.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  // Check if the data path is provided
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
    return;
  }

  // Read the file asynchronously
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    if (data) {
      const reportParts = [];
      const fileLines = data.toString('utf-8').trim().split('\n'); // Split the file content by new lines
      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(','); // Get the field names from the first line
      const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1); // Get student property names, excluding the field name

      // Process each line after the header
      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(','); // Split each line by commas to get individual fields
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1); // Get student property values
        const field = studentRecord[studentRecord.length - 1]; // Get the field (major)

        // Initialize the field if it does not exist
        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = [];
        }

        // Map student property names to their respective values
        const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
        // Add the student to the appropriate field group
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      // Calculate the total number of students
      const totalStudents = Object.values(studentGroups).reduce((pre, cur) => (pre || []).length + cur.length);
      reportParts.push(`Number of students: ${totalStudents}`);

      // Log the number of students and their names for each field
      for (const [field, group] of Object.entries(studentGroups)) {
        reportParts.push([
          `Number of students in ${field}: ${group.length}.`,
          'List:',
          group.map((student) => student.firstname).join(', '),
        ].join(' '));
      }

      // Resolve the promise with the report
      resolve(reportParts.join('\n'));
    }
  });
});

// Define the route handlers for the server
const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      // Set the headers for the response
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;

      // Write the response text to the response stream
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      // Count the students and generate the report
      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');

          // Set the headers for the response
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;

          // Write the response text to the response stream
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const responseText = responseParts.join('\n');

          // Set the headers for the response
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;

          // Write the response text to the response stream
          res.write(Buffer.from(responseText));
        });
    },
  },
];

// Handle incoming requests
app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

// Start the server and listen on the specified port and host
app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
