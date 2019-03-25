// process-message.js
import {
    DIALOGFLOW_PRIVATE_KEY,
    DIALOGFLOW_CLIENT_EMAIL
} from './variables'

const Dialogflow = require('dialogflow');

// You can find your project ID in your Dialogflow agent settings
const projectId = 'brendan-40379'
const sessionId = '123456';
const languageCode = 'en-US';

const config = {
  credentials: {
    private_key: DIALOGFLOW_PRIVATE_KEY,
    client_email: DIALOGFLOW_CLIENT_EMAIL,
  },
};

const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = async message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  const response = await sessionClient.detectIntent(request)
  const result = response[0].queryResult;
  
  return {
    phrase: message,
    response: result.fulfillmentText,
    isFallback: result.intent.isFallback
  }
}

module.exports = processMessage;