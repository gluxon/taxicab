import { connect } from 'react-redux'
import SourceViewer from 'components/SourceViewer'

const mapStateToProps = state =>
  ({ source: state.submissions.items[state.ui.selectedSubmission].code })

export default connect(mapStateToProps)(SourceViewer)
