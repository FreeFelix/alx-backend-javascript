// Import the Kue library for creating job queues
import kue from 'kue';

/**
 * Function to create push notification jobs
 * @param {Array} jobs - Array of job data objects
 * @param {object} queue - Kue queue instance
 */
const createPushNotificationsJobs = (jobs, queue) => {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Iterate over each job data object
  jobs.forEach((jobData) => {
    // Create a new job in the 'push_notification_code_3' queue with the job data
    const job = queue.create('push_notification_code_3', jobData);

    // Save the job to the queue
    job.save((err) => {
      if (!err) {
        console.log(`Notification job created: ${job.id}`);
      }
    });

    // Event listener for job completion
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // Event listener for job failure
    job.on('fail', (err) => {
      console.log(`Notification job ${job.id} failed: ${err}`);
    });

    // Event listener for job progress updates
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  });
};

// Export the createPushNotificationsJobs function as the default export
export default createPushNotificationsJobs;
