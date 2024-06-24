// Import the Kue library for creating job queues
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Define the data for the job
const jobData = {
  phoneNumber: '4153518780',
  message: 'This is the code to verify your account',
};

// Create a job for the 'push_notification_code' queue with the specified data
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    // Log a message when the job is successfully created
    if (!err) {
      console.log(`Notification job created ${job.id}`);
    }
  });

// Event listener for job completion
job.on('complete', () => {
  // Log a message when the job is completed
  console.log('Notification job completed');
});

// Event listener for job failure
job.on('fail', () => {
  // Log a message when the job fails
  console.log('Notification job failed');
});
