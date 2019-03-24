 // react-bot/src/App.js

 import React, { Component } from 'react';
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
     const pusher = new Pusher('ce896079d3b413a9da88', {
       cluster: 'us2',
       encrypted: true,
     });

     const channel = pusher.subscribe('bot');
     channel.bind('bot-response', data => {
       const msg = {
         text: data.message,
         user: 'bot',
       };
       this.setState({
         conversation: [...this.state.conversation, msg],
       });
     });
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

     fetch('http://localhost:5000/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         message: this.state.userMessage,
       }),
     });

     this.setState({ userMessage: '' });
   };

   render() {
     const ChatBubble = (text, i, user, className) => {       
       return (
         <div
          key={`${user}-${i}`} 
          className={`${user} chat-bubble`}
         >
          <div className='avatar'>
            {user}
          </div>
           <div className={classes(className, 'chat-content-wrapper')}>
            <span className="chat-content" dangerouslySetInnerHTML={{__html: text}} />
          </div>
         </div>
       );
     };

     const chat = this.state.conversation.map((e, index) =>
       ChatBubble(e.text, index, e.user, e.user === 'bot' ? ANIMATIONS.fadeInLeft : ANIMATIONS.fadeInRight)
     );

     console.log(this.state.conversation)

     return (
       <div className='parent'>
        <div className='home'>
          js-helpbot
        </div>
         <div className="chat-window">
           <div className="conversation-view">{chat}</div>
           <div className="message-box">
             <form onSubmit={this.handleSubmit}>
               <input
                 value={this.state.userMessage}
                 onInput={this.handleChange}
                 className="text-input"
                 type="text"
                 autoFocus
                 placeholder="Type your message and hit Enter to send"
               />
             </form>
           </div>
         </div>
       </div>
     );
   }
 }

 export default App;