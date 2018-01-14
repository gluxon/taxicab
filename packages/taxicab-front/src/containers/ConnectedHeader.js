import { connect } from 'react-redux'
import Header from 'components/Header'

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Header)
