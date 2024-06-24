// Import the Kue library for creating job queues
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

/**
 * Function to send a notification
 * @param {string} phoneNumber - The phone number to send the notification to
 * @param {string} message - The message to be sent
 */
const sendNotification = (phoneNumber, message) => {
  // Log the notification details
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

// Process jobs in the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  // Destructure phoneNumber and message from the job data
  const { phoneNumber, message } = job.data;
  
  // Call the sendNotification function with the job data
  sendNotification(phoneNumber, message);
  
  // Signal that the job is done
  done();
});
