import React from 'react'
import { Card } from 'antd'
import SortedAssignmentList from 'containers/SortedAssignmentList'
import CreateButton from 'components/CreateButton'

export default class Assignments extends React.Component {
  render () {
    document.title = 'Assignments | Taxicab'
    return <Card title='Assignments' extra={<CreateButton to='/assignments/create' />}>
      <SortedAssignmentList />
    </Card>
  }
}
