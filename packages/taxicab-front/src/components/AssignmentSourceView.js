import React from 'react'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light'
import scheme from 'react-syntax-highlighter/languages/prism/scheme'
import style from 'react-syntax-highlighter/styles/prism/atom-dark'

registerLanguage('scheme', scheme)

export default class AssignmentSourceView extends React.PureComponent {
  render () {
    const { source } = this.props
    return <div>
      <p>Click on edit above to change the code below.</p>
      <SyntaxHighlighter language='scheme' style={style}>
        {source}
      </SyntaxHighlighter>
    </div>
  }
}
