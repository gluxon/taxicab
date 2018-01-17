import { connect } from 'react-redux'
import { createUtility, fetchUtility } from 'actions'
import UtilityEditor from 'components/UtilityEditor'

const mapDispatchToProps = (dispatch, ownProps) => ({
  createUtility: fieldValues => dispatch(createUtility(fieldValues)),
  onSuccess: res => {
    const id = Number(res.headers.get('location').replace('/api/utilities/', ''))
    dispatch(fetchUtility(id))
      .then(() => ownProps.history.replace('/testing'))
  }
})

export default connect(null, mapDispatchToProps)(UtilityEditor)
