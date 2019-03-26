import React from 'react'
import './index.css'

const RESERVES = [
  'abstract ',
  'else ',
  'instanceof ',
  'super ',
  'boolean ',
  'enum ',
  'int ',
  'switch ',
  'break ',
  'export ',
  'interface ',
  'synchronized ',
  'byte ',
  'extends ',
  'let ',
  'this ',
  'case ',
  'false ',
  'long ',
  'throw ',
  'catch ',
  'final ',
  'native ',
  'throws ',
  'char ',
  'finally ',
  'new ',
  'transient ',
  'class ',
  'float ',
  'null ',
  'true ',
  'const ',
  'for ',
  'package ',
  'try ',
  'continue ',
  'function ',
  'private ',
  'typeof ',
  'debugger ',
  'goto ',
  'protected ',
  'var ',
  'default ',
  'if ',
  'public ',
  'void ',
  'delete ',
  'implements ',
  'return ',
  'volatile ',
  'do ',
  'import ',
  'short ',
  'while ',
  'double ',
  'in ',
  'static ',
  'with '
]

const colorString = (str, color, override) => {
  return `<span style = 'color: ${color};'>${ override ? str.replace(/color:.+?;/g, ' ') : str}</span>`
}

function highlightSyntax (code, colors = {
  string: '#ffba54', // '#FF9800', // orange
  object: '#E57373', // '#E57373', // red
  function: '#00BCD4', // '#00BCD4', // cyan
  reserve: '#64B5F6', // '#64B5F6', // blue
  cont: '#85e6be',
  comment: '#a0a0a0', // '#64B5F6', // blue
}) {
  // object
  code = code.replace(/[a-zA-Z][a-zA-Z0-9]*[.][a-zA-Z][a-zA-Z0-9]*[(]/g, (str) => {
    return colorString(str.split('.')[0], colors.object) + '.' + str.split('.')[1]
  })
  // function
  code = code.replace(/[a-zA-Z][a-zA-Z0-9]*[ ]*[(]/g, (str) => {
    return colorString(str.replace( '(','' ), colors.function) + '('
  })

  RESERVES.map((str) => {
    code = code.replace(new RegExp(str, 'g'), colorString(str, colors.reserve))
  })

  // continue
  code = code.replace(/[.][.][.]/g, (str) => {
    return colorString(str, colors.cont, true)
  })

  // string
  code = code.replace(/"([^"]*)"/g, (str) => {
    return colorString(str, colors.string, true)
  })

  // comment
  code = code.replace(/\/[/]+.*/g, (str) => {
    return colorString(str, colors.comment, true)
  })

  return code
}

export default class Code extends React.Component {
  state = {
    copied: false
  }

  render () {
    const { copied } = this.state

    return <code>
      <button
        className={ copied ? 'disabled' : '' }
        onClick={() => {
          this.code.select()
          document.execCommand('copy')

          if (!copied) {
            this.setState({ copied: true })
            setTimeout(() => {
              this.setState({ copied: false })
            }, 2500)
          }
        }}
      >
        { copied ? 'Copied to clipboard!' : 'Copy'}
      </button>
      <div dangerouslySetInnerHTML={{ __html: highlightSyntax(this.props.children) }}/>
      <textarea
        value={this.props.children}
        ref = {code => { this.code = code }}
      />
    </code>
  }
}