import readDatabase from '../utils';

/**
 * The list of supported majors.
 */
const VALID_MAJORS = ['CS', 'SWE'];

/**
 * Contains the student-related route handlers.
 * @author Free Felix
 */
class StudentsController {
  /**
   * Handles the request to get all students.
   * It reads the database, processes the student data, and sends a response.
   * 
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   */
  static getAllStudents(request, response) {
    // Determine the path to the database file
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';

    // Read the database and handle the response
    readDatabase(dataPath)
      .then((studentGroups) => {
        // Initialize the response message
        const responseParts = ['This is the list of our students'];

        // Comparison function for sorting student groups alphabetically
        const cmpFxn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) {
            return -1;
          }
          if (a[0].toLowerCase() > b[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };

        // Process and format the student data
        for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
          responseParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }

        // Send the response
        response.status(200).send(responseParts.join('\n'));
      })
      .catch((err) => {
        // Handle any errors that occur during database reading
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }

  /**
   * Handles the request to get students by major.
   * It reads the database, filters the students by the specified major, and sends a response.
   * 
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   */
  static getAllStudentsByMajor(request, response) {
    // Determine the path to the database file
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';

    // Extract the major from the request parameters
    const { major } = request.params;

    // Validate the major parameter
    if (!VALID_MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    // Read the database and handle the response
    readDatabase(dataPath)
      .then((studentGroups) => {
        let responseText = '';

        // Check if the major exists in the student groups
        if (Object.keys(studentGroups).includes(major)) {
          const group = studentGroups[major];
          responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
        }

        // Send the response
        response.status(200).send(responseText);
      })
      .catch((err) => {
        // Handle any errors that occur during database reading
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
