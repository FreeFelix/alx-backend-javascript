import fs from 'fs';

/**
 * Reads the data of students in a CSV data file.
 * 
 * @param {String} dataPath - The path to the CSV data file.
 * @returns {Promise<{
 *   String: {firstname: String, lastname: String, age: number}[]
 * }>} - A promise that resolves to an object where the keys are major fields and the values are arrays of student objects.
 * @throws Will throw an error if the database cannot be loaded.
 * 
 * @example
 * readDatabase('path/to/database.csv')
 *   .then((studentGroups) => console.log(studentGroups))
 *   .catch((err) => console.error(err));
 * 
 * CSV file format:
 *   firstname,lastname,age,field
 *   John,Doe,20,CS
 *   Jane,Smith,22,SWE
 *   ...
 * 
 * Resulting studentGroups format:
 * {
 *   CS: [{ firstname: 'John', lastname: 'Doe', age: 20 }, ...],
 *   SWE: [{ firstname: 'Jane', lastname: 'Smith', age: 22 }, ...],
 *   ...
 * }
 * 
 * @see {@link https://github.com/FreeFelix}
 * 
 * @function
 */
const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    // Reject if no data path is provided
    reject(new Error('Cannot load the database'));
    return;
  }

  // Read the file at the specified data path
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      // Reject if there is an error reading the file
      reject(new Error('Cannot load the database'));
      return;
    }

    // Process the data if file reading is successful
    if (data) {
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

        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = []; // Initialize the field if it does not exist
        }

        // Map student property names to their respective values
        const studentEntries = studentPropNames
          .map((propName, idx) => [propName, studentPropValues[idx]]);

        // Add the student to the appropriate field group
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      // Resolve the promise with the student groups
      resolve(studentGroups);
    }
  });
});

export default readDatabase;
module.exports = readDatabase;
