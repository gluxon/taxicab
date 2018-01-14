import fetch from 'isomorphic-fetch'

export default url =>
  async payload => {
    let formData = new window.FormData()

    for (const key of Object.keys(payload)) {
      formData.append(key, payload[key])
    }

    return fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
  }
