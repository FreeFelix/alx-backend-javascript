import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

/**
 * Binds the routes to the appropriate handler in the
 * given Express application.
 * 
 * @param {Express} app The Express application.
 * @author Free Felix
 */
const mapRoutes = (app) => {
  // Route for the homepage
  app.get('/', AppController.getHomepage);
  
  // Route for getting all students
  app.get('/students', StudentsController.getAllStudents);
  
  // Route for getting students by major
  app.get('/students/:major', StudentsController.getAllStudentsByMajor);
};

export default mapRoutes;
module.exports = mapRoutes;
