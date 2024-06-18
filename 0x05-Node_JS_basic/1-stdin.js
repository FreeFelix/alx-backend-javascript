// Write a welcome message to the standard output
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Set up an event listener on the standard input to handle readable events
process.stdin.on('readable', () => {
  // Read data from the standard input
  const chunk = process.stdin.read();

  // If there is data read, write it to the standard output
  if (chunk) {
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

// Set up an event listener on the standard input to handle end events
process.stdin.on('end', () => {
  // Write a closing message to the standard output
  process.stdout.write('This important software is now closing\n');
});
