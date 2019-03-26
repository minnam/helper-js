// server.js
import axios from 'axios'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { 
  GITHUB_ISSUE_URL,
  GITHUB_TOKEN 
} from './config'
import processMessage from './process-message'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/chat', async (req, res) => {
  const { message } = req.body
  const processedMessage = await processMessage(message)

  res.status(200).json(processedMessage)
});

app.post('/report', async (req, res) => {
  const { title } = req.body

  axios.post(`${GITHUB_ISSUE_URL}`, { title }, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`
    }
  }).then(({ data, status }) => {
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

app.set('port', process.env.PORT || 5000)
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})