const fs = require('fs');

/**
 * Counts the students in a CSV data file and logs the count and details to the console.
 * 
 * @param {String} dataPath - The path to the CSV data file.
 * @throws Will throw an error if the database cannot be loaded.
 * @example
 * countStudents('path/to/database.csv');
 * // Output:
 * // Number of students: 10
 * // Number of students in CS: 5. List: John, Jane, ...
 * // Number of students in SWE: 5. List: Alice, Bob, ...
 * 
 * @see {@link https://github.com/freefelix}
 * 
 * @function
 */
const countStudents = (dataPath) => {
  // Check if the file exists and is a file
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  // Read and process the CSV file
  const fileLines = fs
    .readFileSync(dataPath, 'utf-8')
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
};

module.exports = countStudents;
