// process-message.js
require('dotenv').config()
const Dialogflow = require('dialogflow');

const sessionClient = new Dialogflow.SessionsClient({
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
});
const sessionPath = sessionClient.sessionPath(process.env.DIALOGFLOW_PROJECT_ID, process.env.DIALOGFLOW_SESSION_ID);

const processMessage = async message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
        text: message,
      },
    },
  };

  const response = await sessionClient.detectIntent(request)
  const result = response[0].queryResult;
  
  return {
    phrase: message,
    response: result.fulfillmentText,
    isFallback: result.intent.isFallback,
    isNavigation: result.intent.displayName === 'navigation'
  }
}

module.exports = processMessage;