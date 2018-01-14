export default fieldValues => {
  let formData = new window.FormData()
  for (const key of Object.keys(fieldValues)) {
    if (fieldValues[key]) {
      formData.append(key, fieldValues[key])
    }
  }
  return formData
}
