import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import { createAssignment } from 'actions'
import AssignmentEditor from 'components/AssignmentEditor'

class AssignmentCreate extends React.Component {
  goBackToHomepage = () => {
    setTimeout(() => this.props.history.push('/assignments'), 500)
  }

  render () {
    const { createAssignment } = this.props
    document.title = 'Create a New Assignment | Taxicab'
    return <Card title='Create a New Assignment'>
      <AssignmentEditor
        onSuccess={this.goBackToHomepage}
        createAssignment={createAssignment}
      />
    </Card>
  }
}

const mapDispatchToProps = dispatch => ({
  createAssignment: formValues => dispatch(createAssignment(formValues))
})

export default connect(null, mapDispatchToProps)(AssignmentCreate)
