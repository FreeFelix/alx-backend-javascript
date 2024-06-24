// Import the Kue library for creating job queues
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// List of blacklisted phone numbers
const blacklistedNo = ['4153518780', '4153518781'];

/**
 * Function to send a notification
 * @param {string} phoneNumber - The phone number to send the notification to
 * @param {string} message - The message to be sent
 * @param {object} job - The job object from the queue
 * @param {function} done - Callback to signal job completion
 */
const sendNotification = (phoneNumber, message, job, done) => {
  // Update job progress to 0%
  job.progress(0, 100);
  
  // Check if the phone number is blacklisted
  if (blacklistedNo.includes(phoneNumber)) {
    // If blacklisted, signal job failure with an error
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    // Update job progress to 50%
    job.progress(50, 100);
    
    // Log the notification details
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    
    // Signal job completion
    done();
  }
};

// Process jobs in the 'push_notification_code_2' queue with concurrency of 2
queue.process('push_notification_code_2', 2, (job, done) => {
  // Destructure phoneNumber and message from the job data
  const { phoneNumber, message } = job.data;
  
  // Call the sendNotification function with the job data
  sendNotification(phoneNumber, message, job, done);
});
