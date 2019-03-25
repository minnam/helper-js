// process-message.js
const Dialogflow = require('dialogflow');
import {
    DIALOGFLOW_PRIVATE_KEY,
    DIALOGFLOW_CLIENT_EMAIL,
    DIALOGFLOW_PROJECT_ID,
    DIALOGFLOW_SESSION_ID,
    DIALOGFLOW_LANGUAGE_CODE
} from './config'

const sessionClient = new Dialogflow.SessionsClient({
  credentials: {
    private_key: DIALOGFLOW_PRIVATE_KEY,
    client_email: DIALOGFLOW_CLIENT_EMAIL,
  },
});
const sessionPath = sessionClient.sessionPath(DIALOGFLOW_PROJECT_ID, DIALOGFLOW_SESSION_ID);

const processMessage = async message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        languageCode: DIALOGFLOW_LANGUAGE_CODE,
        text: message,
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