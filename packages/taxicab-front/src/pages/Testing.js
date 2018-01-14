import React from 'react'
import { Card } from 'antd'

export default class Assignments extends React.Component {
  render () {
    document.title = 'Test Utilities | Taxicab'
    return <Card title='Test Utilities'>
      <p>Many of the assertions in test cases require special functions. Some of these functions may check for equality</p>
    </Card>
  }
}
