import React from 'react'
import './index.css'

export default props => <ul className='chat-navigation'>
  {
    (() => {
      const components = []
      for (const objKey in props.data) {
        components.push(
          <NavigationItem
            title={objKey}
            children={props.data[objKey]}
            key={objKey}
            setChatText={props.setChatText}
          />
        )
      }

      return components
    })()
  }
</ul>

class NavigationItem extends React.Component {
  state = {
    toggled: false
  }

  render () {
    const { title, children, setChatText } = this.props
    const { toggled } = this.state
    return <li>
      <span
        className='chat-navigation-category-title'
        onClick={() => {
          this.setState({
            toggled: !toggled
          })
        }}
      >
        <i className='material-icons'>{ toggled ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }</i>
        {title}
      </span>
      <ul
        style={{
          display: toggled ? '' : 'none'
        }}
      >
        {
          children.map((item, key) => {
            return <li
              key={key}
              onClick={() => {setChatText(item.example)}}
            >
              {item.description}
            </li>
          })
        }
      </ul>
    </li>
  }
}
