import React from 'react'
import ANIMATIONS from '../../common/animations'
import {
  ChatBubble,
  Code,
  Navigation
} from '../__modules__'
import { URL } from '../../config'

export default class ChatView extends React.Component {
  state = {
    userMessage: '',
    conversation: [
      {
        user: 'bot',
        text: 'Greetings!'
      },
      {
        user: 'bot',
        component: <span>
          Welcome to helpbot.js! Click <button onClick={() => {this.fetchNavigation()}}>here</button> for directory.
        </span>
      }
    ]
  }

  render () {
    const {
      conversation,
      chatInputFocused
    } = this.state

    const chat = conversation.map((item, index) =>
      ChatBubble({
        className: item.user === 'bot' ? ANIMATIONS.fadeInLeft : ANIMATIONS.fadeInRight,
        component: item.component,
        index,
        text: item.text,
        user: item.user,
      })
    )

    return <div className="chat-window">
      <nav
        className={ANIMATIONS.fadeInRight}
        style={{
          zIndex: chatInputFocused ? 5000 : 1,
          color: chatInputFocused ? 'white' : '',
        }}
      >
        <h1>helpbot.js</h1>
      </nav>
      <div
        className='chat-focus-dialog'
        onClick={() => {
          this.setState({ chatInputFocused: false })
        }}
        style={{
          display: chatInputFocused ? '' : 'none'
        }}
      >
        <span className={ANIMATIONS.fadeInUp}>
          Hit Enter to Send!
        </span>
      </div>
      <div className="conversation-view" ref={conversationView => { this.conversationView = conversationView }}>{chat}</div>
      <div
        className="message-box"
        onClick={() => {
          this.input.focus()
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.userMessage}
            onInput={this.handleChange}
            className="text-input"
            type="text"
            autoFocus
            placeholder="Type your message and hit Enter to send"
            ref={input => { this.input = input }}
          />
        </form>
      </div>
    </div>
  }

  handleChange = e => {
    this.setState({ userMessage: e.target.value })
  }

  fetchNavigation = () => {
    fetch(`${URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What can I ask?',
      }),
    }).then(res => {
      const { conversation } = this.state
      res.json().then(body => {
        const message = {
          component: <Navigation
            data={JSON.parse(body.response)}
            setChatText={text => {
              this.setState({ userMessage: text, chatInputFocused: true })
              this.input.focus()
            }}
          />,
          user: 'bot',
        }

        this.setState({ conversation: [...conversation, message] })
      })
    })
  }

  handleSubmit = e => {
    const {
      conversation,
      userMessage
    } = this.state

    e.preventDefault()
    if (!userMessage.trim()) return

    const message = {
      text: userMessage,
      user: 'you',
    }

    this.setState({
      conversation: [...conversation, message],
    })

    this.conversationView.scrollTop = this.conversationView.scrollHeight

    fetch(`${URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
      }),
    }).then(res => {
      const { conversation } = this.state

      res.json().then(body => {
        let message

        /** Render Navigation */
        if (body.isNavigation) {
          message = {
            component: <Navigation
              data={JSON.parse(body.response)}
              setChatText={text => {
                this.setState({ userMessage: text, chatInputFocused: true })
                this.input.focus()
              }}
            />,
            user: 'bot',
          }

          this.setState({ conversation: [...conversation, message] })

        /** Default */
        } else if (body.response && !body.isFallback) {

          if (body.response.includes('<code>')) {
            const original = body.response.split(/<code>(.*)<\/code>/s)

            message = {
              component: <span>
                <span>{original[0]}</span>
                <Code>{original[1]}</Code>
              </span>,
              user: 'bot',
            }

          } else {
            message = {
              text: `${body.response}`,
              user: 'bot',
            }
          }

          this.setState({ conversation: [...conversation, message] })

        /** Fallback Intent */
        } else {
          message = {
            text: `There is no response for <i>${body.phrase}</i>`,
            user: 'bot',
          }
          this.setState({
            conversation: [...conversation, message],
          })

          message = {
            component: <span>
              Would you like to <button onClick={() => {this.handleIssueReport(body.phrase)}}>create an issue?</button>
            </span>,
            user: 'bot',
          }
          this.setState({
            conversation: [...conversation, message],
          })
        }

        this.conversationView.scrollTop = this.conversationView.scrollHeight
      })
    })

    this.setState({ userMessage: '', chatInputFocused: false })
  };

  handleIssueReport = title => {
    fetch(`${URL}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    }).then(res => {
      res.json().then(body => {
        const message = {
          text: `${body.response}${body.url ? ` at <a href=${body.url}>${body.url}</a>` : ''}`,
          user: 'bot',
        }
        this.setState({
          conversation: [...this.state.conversation, message],
        })

        this.conversationView.scrollTop=this.conversationView.scrollHeight
      })
    })
  }
}