import React from 'react'
import { Link } from 'react-router-dom'
import { List, Button, Tooltip } from 'antd'
import { format } from 'date-fns'
import StandardFetchIndicator from 'components/StandardFetchIndicator'

export default class AssignmentList extends React.Component {
  componentWillMount () {
    this.props.fetchAssignments()
  }

  render () {
    const { isFetching, hadErrorFetching, assignments } = this.props
    return <div>
      <StandardFetchIndicator
        hadErrorFetching={hadErrorFetching}
        resourceName='assignments'
      />
      { !hadErrorFetching && <List
        itemLayout='horizontal'
        dataSource={assignments}
        loading={isFetching}
        size='large'
        locale={{ emptyText: 'There are no assignments yet. You should make one!' }}
        renderItem={assignment => (
          <List.Item actions={assignment.description ? [<DownloadAssignment assignment={assignment} />] : []}>
            <List.Item.Meta
              title={<AssignmentTitle assignment={assignment} />}
            />
            <AssignmentDueDate assignment={assignment} />
          </List.Item>
        )}
      /> }
    </div>
  }
}

const DownloadAssignment = ({ assignment: { id } }) =>
  <a rel='noopener noreferrer' target='_blank' href={`/api/assignments/${id}/description`} >
    <Button icon='download'>Download</Button>
  </a>

const AssignmentDueDate = ({ assignment: { dueDate } }) =>
  dueDate
    ? <Tooltip title={dueDate}>
      {'Due ' + format(dueDate, 'dddd, MMM Do [at] h:mma')}
    </Tooltip>
    : ''

const AssignmentTitle = ({ assignment }) =>
  <Link to={`/assignments/${assignment.id}`}>{assignment.name}</Link>
