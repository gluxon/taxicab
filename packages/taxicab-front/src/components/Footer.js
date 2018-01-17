import styled from 'styled-components'
import { pure } from 'recompose'
import { Layout } from 'antd'

const Footer = () =>
  <Container>
    Taxicab is open source. File any issues on <a rel='noreferrer noopener' target='_blank' href='https://github.com/gluxon/taxicab'>GitHub</a>.
  </Container>

export default pure(Footer)

const Container = styled(Layout.Footer)`
  padding: 2em;
  background-color: white;
`
