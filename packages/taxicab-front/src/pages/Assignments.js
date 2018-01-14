import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'antd'
import SortedAssignmentList from 'containers/SortedAssignmentList'

export default class Assignments extends React.Component {
  render () {
    document.title = 'Assignments | Taxicab'
    return <Card title='Assignments' extra={<CreateAssignmentButton />}>
      <SortedAssignmentList />
    </Card>
  }
}

class CreateAssignmentButton extends React.PureComponent {
  render = () =>
    <Link to='/assignments/create'>
      <Button type='primary' icon='plus'>Create New</Button>
    </Link>
}
