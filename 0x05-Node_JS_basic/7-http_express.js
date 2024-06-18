const express = require('express'); // Import the Express framework
const fs = require('fs'); // Import the Node.js file system module

const app = express(); // Create an instance of Express
const PORT = 1245; // Specify the port number for the server
const DB_FILE = process.argv.length > 2 ? process.argv[2] : ''; // Get the CSV file path from command line arguments

/**
 * Counts the students in a CSV data file asynchronously.
 * @param {String} dataPath The path to the CSV data file.
 * @returns {Promise<String>} A promise that resolves to a report string.
 * @throws {Error} If the database cannot be loaded.
 * @author Free Felix <https://github.com/FreeFelix>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database')); // Reject the promise if dataPath is empty
    return;
  }
  
  // Read the CSV file asynchronously
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database')); // Reject the promise if there's an error reading the file
      return;
    }

    const reportParts = []; // Array to hold parts of the report
    const fileLines = data.toString('utf-8').trim().split('\n'); // Split file data into lines
    const studentGroups = {}; // Object to store student groups
    const dbFieldNames = fileLines[0].split(','); // Extract field names from the first line
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1); // Extract property names

    // Process each line of the CSV file
    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(','); // Split each line into fields
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1); // Extract property values
      const field = studentRecord[studentRecord.length - 1]; // Last field is the grouping field (e.g., major)

      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = []; // Initialize array if field does not exist in studentGroups
      }

      // Map property names to values and add to studentGroups
      const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    // Generate the report
    const totalStudents = Object.values(studentGroups).reduce((pre, cur) => (pre || []).length + cur.length);
    reportParts.push(`Number of students: ${totalStudents}`);

    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(`Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`);
    }

    resolve(reportParts.join('\n')); // Resolve the promise with the generated report
  });
});

// Route handler for the root endpoint '/'
app.get('/', (_, res) => {
  res.send('Hello Holberton School!'); // Send a plain text response
});

// Route handler for the '/students' endpoint
app.get('/students', (_, res) => {
  const responseParts = ['This is the list of our students']; // Initialize response parts array

  // Call countStudents function to get the report asynchronously
  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report); // Append the report to response parts
      const responseText = responseParts.join('\n'); // Join all response parts into a single string

      // Set response headers and status
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText)); // Write the response text to the response stream
      res.end(); // End the response
    })
    .catch((err) => {
      responseParts.push(err instanceof Error ? err.message : err.toString()); // Append error message to response parts
      const responseText = responseParts.join('\n'); // Join all response parts into a single string

      // Set response headers and status
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 500;
      res.write(Buffer.from(responseText)); // Write the response text to the response stream
      res.end(); // End the response
    });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`); // Log a message when the server starts listening
});

module.exports = app; // Export the Express application
