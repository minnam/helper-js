// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const generate = require('./src/generate')
const reference = require('./src/reference')
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  let intentMap = new Map();

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function setIntentMap (category, items) {
    items.map(item => {
      intentMap.set(`${category}.${item.name}`, item.callback);
    })
  }

  function gatherIntents (intents) {
    return intents.map(item => {
      return {
        name: item.name,
        description: item.description,
        example: item.example
      }
    })
  }
  
  
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  
  intentMap.set('navigation', agent => {
    agent.add(JSON.stringify({
      Generate: gatherIntents(generate),
      Reference: gatherIntents(reference),
    }))
  });

  setIntentMap('generate', generate)
  setIntentMap('reference', reference)

  agent.handleRequest(intentMap);
});
