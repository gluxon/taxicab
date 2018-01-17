import { pure } from 'recompose'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light'
import scheme from 'react-syntax-highlighter/languages/prism/scheme'
import style from 'react-syntax-highlighter/styles/prism/atom-dark'

registerLanguage('scheme', scheme)

const SourceViewer = ({ source }) =>
  <SyntaxHighlighter language='scheme' style={style}>
    {source}
  </SyntaxHighlighter>

export default pure(SourceViewer)
