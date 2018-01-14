import React from 'react'
import { connect } from 'react-redux'
import { fetchAssignment, updateAssignment, createAssignment, deleteAssignment } from 'actions'
import AssignmentOptions from 'components/AssignmentOptions'

class Assignment extends React.Component {
  componentWillMount () {
    this.props.fetchAssignment()
  }

  render () {
    const { assignment } = this.props
    document.title = `${assignment ? assignment.name : 'Assignment'} | Taxicab`
    return <AssignmentOptions {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {
    matchedId: id,
    isFetching: state.assignments.isFetchingIds.has(id),
    hadErrorFetching: state.assignments.hadErrorFetchingIds.has(id),
    assignment: state.assignments.items[id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {
    fetchAssignment: () => dispatch(fetchAssignment(id)),
    deleteAssignment: () => dispatch(deleteAssignment(id)),
    updateAssignment: fieldValues => dispatch(updateAssignment(id, fieldValues)),
    createAssignment: fieldValues => dispatch(createAssignment(id, fieldValues))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment)
