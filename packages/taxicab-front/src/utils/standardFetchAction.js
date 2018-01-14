import fetch from 'isomorphic-fetch'

/*
 * A reusable thunk action for fetching api items
 */
export default opts => (...args) =>
  async (dispatch, getState) => {
    if (opts.shouldFetch && !opts.shouldFetch(getState(), ...args)) {
      return
    }

    if (opts.requestAction) dispatch(opts.requestAction(...args))

    const url = typeof opts.url === 'string'
      ? opts.url
      : opts.url(...args)

    const fetchOpts = typeof opts.fetchOpts === 'function'
      ? opts.fetchOpts(...args)
      : opts.fetchOpts

    try {
      var response = await fetch(url, fetchOpts)
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Unexpected response status code: ${response.status}`)
      }
    } catch (err) {
      if (opts.receiveErrorAction) {
        dispatch(opts.receiveErrorAction(err, ...args))
      }
      throw err
    }

    if (opts.receiveAction) {
      if (opts.parseResponse || opts.parseResponse === undefined) {
        const json = await response.json()
        dispatch(opts.receiveAction(json, ...args))
        return json
      } else {
        dispatch(opts.receiveAction(...args))
      }
    }

    return response
  }
