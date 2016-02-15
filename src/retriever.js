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

export default (request) => {
  return {
    /**
     * Get a GraphQL schema at the given URL
     *
     * @param  {String} url GraphQL API URL
     * @return {Promise}    Schema object
     */
    get: (url = 'http://localhost/graphql', options = {}) => {
      const requestOptions = {
        url,
        qs: { query },
        headers: options.headers || {},
        json: true
      }

      return request(requestOptions)
        .then(
          res => res.data.schema,
          () => {
            console.error(`Unable to connect to ${url}.`)
            process.exit(1)
          }
        )
        .catch(() => {
          console.log(`GraphQL schema not found at ${url}.`)
          process.exit(1)
        })
    }
  }
}
