// process-message.js
import {
    PUSHER_APP_ID,
    PUSHER_APP_KEY,
    PUSHER_APP_SECRET,
    PUSHER_APP_CLUSTER,
    DIALOGFLOW_PRIVATE_KEY,
    DIALOGFLOW_CLIENT_EMAIL
} from './variables'

const Dialogflow = require('dialogflow');
const Pusher = require('pusher');

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

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_APP_KEY,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_APP_CLUSTER,
  encrypted: true,
});

console.log(config)

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      return pusher.trigger('bot', 'bot-response', {
        message: result.fulfillmentText,
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

module.exports = processMessage;