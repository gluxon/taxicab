// http://redux.js.org/docs/recipes/ReducingBoilerplate.html#generating-reducers
export default (initialState, reducers) =>
  (state = initialState, action) =>
    reducers.hasOwnProperty(action.type)
      ? reducers[action.type](state, action)
      : state
