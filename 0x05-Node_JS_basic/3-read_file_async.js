const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * 
 * @param {String} dataPath - The path to the CSV data file.
 * @returns {Promise<Boolean>} - Resolves to true if counting is successful.
 * @throws Will reject with an error if the database cannot be loaded.
 * 
 * @see {@link https://github.com/freefelix}
 * 
 * @example
 * countStudents('path/to/database.csv')
 *   .then(() => console.log('Counting complete'))
 *   .catch((err) => console.error(err));
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  // Read the file asynchronously
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      // Reject the promise if there is an error reading the file
      reject(new Error('Cannot load the database'));
      return;
    }

    if (data) {
      // Process the CSV data if reading is successful
      const fileLines = data
        .toString('utf-8')
        .trim()
        .split('\n'); // Split the file content by new lines

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
        const studentEntries = studentPropNames
          .map((propName, idx) => [propName, studentPropValues[idx]]);

        // Add the student to the appropriate field group
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      // Calculate the total number of students
      const totalStudents = Object
        .values(studentGroups)
        .reduce((pre, cur) => (pre || []).length + cur.length);

      // Log the total number of students
      console.log(`Number of students: ${totalStudents}`);

      // Log the number of students and their names for each field
      for (const [field, group] of Object.entries(studentGroups)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }

      // Resolve the promise indicating successful completion
      resolve(true);
    }
  });
});

module.exports = countStudents;
