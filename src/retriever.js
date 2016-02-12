import formatUrl from './format-url'

const query = `query {
  schema: __schema {
    types {
      kind
      name
      description
      fields {
        name
        description
        args {
          name
          description
        }
      }
    }
  }
}`

export default (request) => ({
  get: (url = 'http://localhost/graphql') => {
    const options = {
      url: formatUrl(url),
      qs: { query },
      json: true
    }

    return request(options)
      .then(res => res.data.schema)
  }
})
