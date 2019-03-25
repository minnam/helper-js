// react-bot/src/App.js
import React, { Component } from 'react'
import ANIMATIONS from '../../common/animations'

import ChatView from '../chat-view/'

import './index.css'

class App extends Component {

  render () {
    return (
      <div className='parent'>
        <div className='home'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            className={ANIMATIONS.fadeInDown}
          >
            <h1>helpbot.js</h1>
          </div>
        </div>
        <ChatView />
      </div>
    )
  }
}

export default App