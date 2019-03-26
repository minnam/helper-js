import React from 'react'
import { classes } from 'typestyle'

export default props => {
  const {
    className,
    component,
    index,
    text,
    user,
  } = props
  return (
    <div
      className={classes(user, 'chat-bubble')}
      key={`${user}-${index}`}
    >
      <div className='avatar'>
        {user}
      </div>
      <div className={classes(className, 'chat-content-wrapper')}>
        {
          (() => {
            if (component) {
              return <span className='chat-content'>
                {component}
              </span>
            } else {
              return <span className='chat-content' dangerouslySetInnerHTML={{__html: text}} />
            }
          })()
        }

      </div>
    </div>
  )
}