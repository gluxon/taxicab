import React from 'react'
import styled from 'styled-components'
import { Icon, Table } from 'antd'
import { format } from 'date-fns'

export default class SubmissionsTable extends React.Component {
  selectedInitialSubmission = false

  columns = [
    {
      key: 'time',
      title: 'Submitted',
      render: submission => format(submission.createdAt, 'dddd, MMM Do YYYY [at] h:mm:ssa')
    },
    {
      key: 'earned',
      title: 'Earned',
      render: submission =>
        ['pending', 'running'].includes(submission.status)
          ? {
            children: <Icon type='loading' style={{ transform: 'scale(1.5)' }} />,
            props: {
              colSpan: 3,
              style: {
                backgroundColor: 'rgba(0,0,0, .03)',
                textAlign: 'center'
              }
            }
          }
          : { children: submission.earned }
    },
    {
      key: 'total',
      title: 'Points',
      render: submission => ['pending', 'running'].includes(submission.status)
        ? { props: { colSpan: 0 } }
        : { children: submission.total }
    },
    {
      key: 'grade',
      title: 'Grade',
      render: submission => ['pending', 'running'].includes(submission.status)
        ? { props: { colSpan: 0 } }
        : { children: submission.total !== 0
            ? (submission.earned / submission.total * 100).toFixed(3) + '%'
            : '-' }
    }
  ]

  componentWillUnmount = () => {
    this.props.resetSelectedSubmission()
  }

  componentDidUpdate = () => {
    const { isFetching, submissions, selectSubmission } = this.props
    if (!this.selectedInitialSubmission && !isFetching && submissions.length > 0) {
      selectSubmission(submissions[0].id)
      this.selectedInitialSubmission = true
    }
  }

  render () {
    let { isFetching, submissions = [], selectedSubmission, selectSubmission } = this.props

    return <TableContainer>
      <Table
        rowKey='id'
        dataSource={submissions}
        columns={this.columns}
        size='middle'
        bordered
        loading={isFetching}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedSubmission ? [selectedSubmission] : [],
          onChange: selectedRowKeys => this.setState({ selectedRowKeys })
        }}
        onRow={row => ({
          // Make the entire row clickable
          onClick: () => selectSubmission(row.id)
        })}
        pagination={{
          pageSize: 3,
          showSizeChanger: true,
          hideOnSinglePage: true,
          pageSizeOptions: ['3', '6', '12']
        }}
        footer={() => `${submissions.length} total submissions`}
      />
    </TableContainer>
  }
}

const TableContainer = styled.div`
  margin: 2em 0;

  tbody tr {
    cursor: pointer;
  }
`
