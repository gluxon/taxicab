import React from 'react'
import { Card } from 'antd'

export default class Grades extends React.Component {
  render () {
    document.title = 'Grades | Taxicab'
    return <Card title='Grades'>
      <p>Find your grades on Moodle.</p>
      <p><a rel='nooppener noreferrer' target='_blank' href='https://courses.engr.uconn.edu'>https://courses.engr.uconn.edu</a></p>
    </Card>
  }
}
