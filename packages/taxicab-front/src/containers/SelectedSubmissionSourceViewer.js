import { connect } from 'react-redux'
import SchemeSource from 'components/SchemeSource'

const mapStateToProps = state =>
  ({ children: state.submissions.items[state.ui.selectedSubmission].code })

export default connect(mapStateToProps)(SchemeSource)
