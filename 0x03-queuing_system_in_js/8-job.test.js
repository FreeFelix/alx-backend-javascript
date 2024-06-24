import kue from 'kue';
import chai from 'chai';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job.js';

const expect = chai.expect;
const queue = kue.createQueue();

describe('createPushNotificationsJobs', () => {
  beforeEach(() => {
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('display a error message if jobs is not an array', () => {
    expect(() => {
      createPushNotificationsJobs('InvalidJobs', queue);
    }).to.throw('Jobs is not an array');
  });

  it('create two new jobs to the queue', () => {
    const jobData = [
      {
        phoneNumber: '1234567890',
	message: 'This is the code 1234 to verify your account'
      },
      {
	phoneNumber: '9876543210',
	message: 'This is the code 4321 to verify your account'
      },
    ];
    createPushNotificationsJobs(jobData, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
  });
});
