import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class LoginSentinel extends React.Component {
  render () {
    const { user, loginRender, authenticatedRender } = this.props
    return user
      ? authenticatedRender()
      : loginRender()
  }
}

const mapStateToProps = state => ({
  user: state.user.netid
})

// Using withRouter to prevent blocked updates isn't the best way of handling
// things. See: goo.gl/Pxsamy
export default withRouter(connect(mapStateToProps)(LoginSentinel))
