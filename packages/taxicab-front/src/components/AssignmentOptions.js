import React from 'react'
import { Card, Button, Popconfirm } from 'antd'
import StandardFetchIndicator from 'components/StandardFetchIndicator'
import AssignmentEditor from 'components/AssignmentEditor'
import AssignmentSourceView from 'components/AssignmentSourceView'
import AssignmentSubmissions from 'containers/AssignmentSubmissions'
import AssignmentTests from 'containers/AssignmentTests'

export default class AssignmentOptions extends React.Component {
  state = {
    tab: 'Submissions'
  }

  onDelete = () => {
    const { deleteAssignment, history } = this.props
    deleteAssignment().then(res => {
      history.push('/assignments')
    })
  }

  render () {
    const {
      isFetching,
      hadErrorFetching,
      fetchAssignment,
      createAssignment,
      updateAssignment,
      matchedId,
      assignment
    } = this.props

    const tabList = [
      { key: 'Submissions', tab: 'Submissions' },
      { key: 'Edit', tab: 'Edit' },
      { key: 'Tests', tab: 'Tests' }
    ]

    if (assignment && assignment.template) {
      tabList.push({ key: 'Template', tab: 'Template' })
    }
    if (assignment && assignment.solution) {
      tabList.push({ key: 'Solution', tab: 'Solution' })
    }

    return <Card
      title={assignment ? assignment.name : 'Assignment'}
      tabList={tabList}
      onTabChange={tab => this.setState({ tab })}
      extra={<div>
        <DeleteAssignment assignmentId={matchedId} onDelete={this.onDelete} />
        <DownloadAssignment assignmentId={matchedId} />
      </div>}
    >
      <StandardFetchIndicator
        isFetching={isFetching && assignment === undefined}
        hadErrorFetching={hadErrorFetching}
        resourceName='this assignment'
      />
      { assignment && this.state.tab === 'Submissions' &&
        <AssignmentSubmissions assignmentId={assignment.id} /> }
      { assignment && this.state.tab === 'Edit' &&
        <AssignmentEdit
          fetchAssignment={fetchAssignment}
          assignment={assignment}
          updateAssignment={updateAssignment}
          createAssignment={createAssignment}
        />
      }
      { assignment && this.state.tab === 'Tests' &&
        <AssignmentTests assignmentId={assignment.id} /> }
      { assignment && this.state.tab === 'Template' &&
        <AssignmentSourceView source={assignment.template} /> }
      { assignment && this.state.tab === 'Solution' &&
        <AssignmentSourceView source={assignment.solution} /> }
    </Card>
  }
}

const AssignmentEdit = ({ assignment, fetchAssignment, updateAssignment }) =>
  <AssignmentEditor
    assignment={assignment}
    updateAssignment={updateAssignment}
    // Download the assignment again with the lastest updated info
    onSuccess={() => fetchAssignment()}
  />

const DownloadAssignment = ({ assignmentId: id }) =>
  <a rel='noopener noreferrer' target='_blank' href={`/api/assignments/${id}/description`} >
    <Button type='primary' icon='download'>Download</Button>
  </a>

const DeleteAssignment = ({ onDelete, assignmentId: id }) =>
  <Popconfirm
    title={<p style={{ maxWidth: '20em' }}>
      Are you sure you want to delete this assignment?
      All tests and submissions associated with it will
      also removed.
    </p>}
    placement='bottom'
    onConfirm={onDelete}
  >
    <Button
      style={{ marginRight: '1em' }}
      type='danger'
      icon='close-circle-o'
    >
      Delete
    </Button>
  </Popconfirm>
