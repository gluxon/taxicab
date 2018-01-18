import React from 'react'
import styled from 'styled-components'
import { Button, Table, Popconfirm } from 'antd'
import StandardFetchIndicator from 'components/StandardFetchIndicator'
import TestEditor from 'components/TestEditor'

export default class TestTable extends React.Component {
  state = {
    additionalRows: [],
    expandedRowKeys: []
  }

  componentWillMount = () => {
    this.props.fetchTests()
  }

  onExpand = (expanded, test) => {
    this.setState(state => ({
      additionalRows: !expanded && test.key === 'new'
        ? []
        : state.additionalRows,
      expandedRowKeys: expanded
        ? [...state.expandedRowKeys, test.key]
        : state.expandedRowKeys.filter(key => key !== test.key)
    }))
  }

  addCreationRow = () => {
    this.setState(state => ({
      additionalRows: [{ key: 'new', name: 'New Test', points: 3 }],
      expandedRowKeys: [...state.expandedRowKeys, 'new']
    }))
  }

  onEdit = (test) => {
    this.onExpand(!this.state.expandedRowKeys.includes(test.key), test)
  }

  onCreateOrUpdate = res => {
    const { fetchTest } = this.props
    const newTestId = Number(res.headers.get('location').replace('/api/tests/', ''))
    fetchTest(newTestId)
    this.setState(state => ({ additionalRows: [] }))
  }

  onCancel = test => {
    this.onExpand(false, test)
  }

  render () {
    const { additionalRows, expandedRowKeys } = this.state
    const { isFetching, hadErrorFetching, tests, fetchTest, deleteTest, createTestForAssignment, updateTest } = this.props
    const dataSource = tests.map(test => ({ key: test.id, ...test }))

    return <div>
      <StandardFetchIndicator
        hadErrorFetching={hadErrorFetching}
        resourceName='tests'
      />
      { !hadErrorFetching && <Table
        loading={isFetching}
        dataSource={[...dataSource, ...additionalRows]}
        columns={getColumns({ onEdit: this.onEdit, deleteTest })}
        expandedRowRender={test =>
          <InlineTestEditor
            test={test}
            fetchTest={fetchTest}
            createTestForAssignment={createTestForAssignment}
            updateTest={updateTest}
            onSuccess={this.onCreateOrUpdate}
            onCancel={() => this.onCancel(test)}
          />}
        pagination={false}
        expandedRowKeys={expandedRowKeys}
        onExpand={this.onExpand}
        locale={{ emptyText: 'There are no tests yet. You should make one!' }}
      /> }
      <AddTestButton icon='plus' onClick={this.addCreationRow}>
        Add Test
      </AddTestButton>
    </div>
  }
}

const getColumns = ({ onEdit, deleteTest }) => [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'points', title: 'Points', dataIndex: 'points' },
  {
    key: 'action',
    title: 'Action',
    render: (_, test) => test.key !== 'new'
      ? <div>
        <EditTestButton onClick={() => onEdit(test)} />
        <DeleteTestButton deleteTest={deleteTest} test={test} />
      </div>
      : null
  }
]

const AddTestButton = styled(Button)`
  float: right;
  margin: 2em 0 !important;
`

const DeleteTestButton = ({ deleteTest, test }) =>
  <Popconfirm
    title='Are you sure you want to delete this test?'
    // Prevent the table row from expanding/collapsing
    onClick={e => { e.stopPropagation() }}
    onConfirm={() => deleteTest(test)}
  >
    <Button icon='close-circle-o' size='small'>Delete</Button>
  </Popconfirm>

const EditTestButton = ({ onClick }) =>
  <Button style={{ marginRight: '1em' }} icon='edit' size='small' onClick={onClick}>Edit</Button>

const InlineTestEditor = ({ test, fetchTest, onSuccess, ...rest }) =>
  <TestEditor
    {...rest}
    test={test.key === 'new' ? null : test}
    onSuccess={res => {
      if (test.key === 'new') {
        onSuccess(res)
        return
      }
      fetchTest(test.id)
    }}
  />
