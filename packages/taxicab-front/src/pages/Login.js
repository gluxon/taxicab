import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

export default class Login extends React.Component {
  render = () =>
    <WelcomeContainer>
      <TaxiEmojiContainer>🚕</TaxiEmojiContainer>
      <h1>Welcome!</h1>
      <p>Taxicab is an automated grading suite for Scheme courses. It enables instant grading feedback to students.</p>
      <a href='/api/user/login'><Button type='primary'>Login with NetID</Button></a>
    </WelcomeContainer>
}

const WelcomeContainer = styled.div`
  max-width: 500px;
  margin: auto; padding: 1em;
`

const TaxiEmojiContainer = styled.div`
  font-size: 5em;
  text-align: center;
`
