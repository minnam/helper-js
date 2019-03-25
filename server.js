// server.js

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const processMessage = require('./process-message');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const processedMessage = await processMessage(message)

  // console.log(processedMessage)
  res.status(200).json(processedMessage)
});

app.post('/report', async (req, res) => {
  const { title } = req.body;

  axios.post(`https://api.github.com/repos/minnam/js-helpbot/issues`, { title }, {
    headers: {
      'Authorization': `token 416acdc72665227115f4ff8e35bb01d445ad9287`
    }
  }).then(({ data, status }) => {
    console.log(data.url)
    if (status === 201) {
      res.status(200).json({
        response: `Issue was created`,
        url: data.url
      })
    } else {
      res.status(status).json({
        response: `Something went wrong while creating an issue`
      })
    }

  }).catch((err) => {
    console.log(err)
  })
  

});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
})