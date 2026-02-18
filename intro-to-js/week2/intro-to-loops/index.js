//Create a for loop that logs out the numbers from 74 - 98
// for (let i = 74; i < 99; i++) {
//   console.log(`i = `, i);
// }

/**
 * Create a function that has two parameters: stringToLog and numberOfTimesToLog
 * When calling the function it should log out the stringToLog 
 * the amount of times specified in numberOfTimesToLog. Use a for loop.
*/
function logString(stringToLog, numberOfTimesToLog) {
  for (let i = 0; i < numberOfTimesToLog; i+=1){
    console.log(stringToLog + i); //without concatenating, the browser would display just one "hello" and show a number of times it appears.
  }
}

logString("hello", 3);

/**
 * Send emails
 * Imagine we work at a company.
 * Anna from the HR department wants us to send out 
 * a couple of emails to some recipients.
 * The only problem is that she sent us the email 
 * in a weird format: benjamin@gmail.com|peter@gmail.com|hans@gmail.com|ahmad@gmail.com|sana@gmail.com|virgeen@gmail.com|mohammed@gmail.com
 * Use the sendEmailTo function to send an email to all the recipients that we got from Anna.
*/

const recipients = "benjamin@gmail.com|peter@gmail.com|hans@gmail.com|ahmad@gmail.com|sana@gmail.com|virgeen@gmail.com|mohammed@gmail.com";

// This function emulates sending emails to recipients,
// but really it only logs out a string
function sendEmailTo(recipient) {
  console.log("email sent to " + recipient);
}

function sendEmails(recipients){
  let emails = recipients.split("|");
  for(let i = 0; i < emails.length; i++){
    sendEmailTo(emails[i]);
  }
}

sendEmails(recipients);

