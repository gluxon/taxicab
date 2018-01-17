import { connect } from 'react-redux'
import { fetchUtilities, updateUtility, updateUtilityName } from 'actions'
import UtilityList from 'components/UtilityList'

const mapStateToProps = state => ({
  isFetching: state.utilities.isFetchingAll,
  hadErrorFetching: state.utilities.hadErrorFetchingAll,
  utilities: Object.values(state.utilities.items),
  creating: state.routing.location.pathname.startsWith('/testing/create')
})

const mapDispatchToProps = dispatch => ({
  fetchUtilities: () => dispatch(fetchUtilities()),
  updateUtility: (id, fieldValues) => dispatch(updateUtility(id, fieldValues)),
  updateUtilityName: (id, name) => dispatch(updateUtilityName(id, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(UtilityList)
