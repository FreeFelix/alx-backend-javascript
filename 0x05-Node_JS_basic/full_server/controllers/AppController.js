/**
 * Contains the miscellaneous route handlers.
 * @author Free Felix <https://github.com/FreeFelix>
 */
class AppController {
  static getHomepage(request, response) {
    response.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
module.exports = AppController;
