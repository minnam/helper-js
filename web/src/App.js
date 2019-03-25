 // react-bot/src/App.js

 import React, { Component } from 'react';
 import GitHubButton from 'react-github-btn'
 import Pusher from 'pusher-js';
 import ANIMATIONS from './animations'
 import './App.css';
 import { classes } from 'typestyle'


 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       userMessage: '',
       conversation: [
         {
           user: 'bot',
           text: 'Greetings!'
         },
         {
           user: 'bot',
           text: 'Welcome to js-helpbot'
         }
       ],
     };
   }

   componentDidMount() {
    //  const pusher = new Pusher('ce896079d3b413a9da88', {
    //    cluster: 'us2',
    //    encrypted: true,
    //  });

    //  const channel = pusher.subscribe('bot');
    //  channel.bind('bot-response', data => {
    //    const msg = {
    //      text: data.message,
    //      user: 'bot',
    //    };
    //    this.setState({
    //      conversation: [...this.state.conversation, msg],
    //    });
    //  });
   }

   handleChange = event => {
     this.setState({ userMessage: event.target.value });
   };

   handleSubmit = event => {
     event.preventDefault();
     if (!this.state.userMessage.trim()) return;

     const msg = {
       text: this.state.userMessage,
       user: 'you',
     };

     this.setState({
       conversation: [...this.state.conversation, msg],
     });

     this.conversationView.scrollTop=this.conversationView.scrollHeight

     fetch('http://localhost:5000/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         message: this.state.userMessage,
       }),
     }).then(res => {
       res.json().then(body => {
         let msg;

         if (body.response && !body.isFallback) {
           msg = {
             text: `${body.response}`,
             user: 'bot',
           }
           this.setState({
            conversation: [...this.state.conversation, msg],
          });
         } else {
          msg = {
            text: `There is no response for <i>${body.phrase}</i>`,
            user: 'bot',
          }
          this.setState({
            conversation: [...this.state.conversation, msg],
          });

          msg = {
            component: <span>
              Would you like to <button onClick={() => {this.handleIssueReport(body.phrase)}}>create an issue?</button>
            </span>,
            user: 'bot',
          }
          this.setState({
            conversation: [...this.state.conversation, msg],
          });
         }
         this.conversationView.scrollTop=this.conversationView.scrollHeight
       })
     })

     this.setState({ userMessage: '' });
   };

   handleIssueReport = title => {
    fetch('http://localhost:5000/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    }).then(res => {
      res.json().then(body => {
        let msg = {
          text: `${body.response}${body.url ? ` at <a href=${body.url}>${body.url}</a>` : ''}`,
          user: 'bot',
        }
        this.setState({
         conversation: [...this.state.conversation, msg],
        });
        
        this.conversationView.scrollTop=this.conversationView.scrollHeight
      })
    })
   }

   render() {
     const ChatBubble = param => {       
       const {
        text, i, user, className, component
       } = param
       return (
         <div
          key={`${user}-${i}`} 
          className={`${user} chat-bubble`}
         >
          <div className='avatar'>
            {user}
          </div>
           <div className={classes(className, 'chat-content-wrapper')}>
            {
              (() => {
                if (component) {
                  return <span className="chat-content">
                    {component}
                  </span>
                } else {
                  return <span className="chat-content" dangerouslySetInnerHTML={{__html: text}} />
                }
              })()
            }
            
          </div>
         </div>
       );
     };

     const chat = this.state.conversation.map((e, index) =>
       ChatBubble({
        text: e.text, 
        i: index, 
        user: e.user, 
        className: e.user === 'bot' ? ANIMATIONS.fadeInLeft : ANIMATIONS.fadeInRight,
        component: e.component
       })
     );

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
            <h1>js-helpbot</h1>
            <GitHubButton href="https://github.com/minnam/js-helpbot" data-icon="octicon-star" aria-label="Star ntkme/github-buttons on GitHub">Star</GitHubButton>
          </div>
        </div>
         <div className="chat-window">
            <nav className={ANIMATIONS.fadeInRight}>
              <h1><a href="https://github.com/minnam/js-helpbot">js-helpbot</a></h1>
            </nav>
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
       </div>
     );
   }
 }

 export default App;