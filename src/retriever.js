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
  /**
   * Get a GraphQL schema at the given URL
   *
   * @param  {String} url GraphQL API URL
   * @return {Promise}    Schema object
   */
  get: (url = 'http://localhost/graphql') => {
    const options = {
      url: url,
      qs: { query },
      json: true
    }

    return request(options)
      .then(
        res => res.data.schema,
        () => {
          console.error(`Unable to connect to ${url}.`)
          process.exit()
        }
      )
      .catch(() => {
        console.log(`GraphQL schema not found at ${url}.`)
        process.exit()
      })
  }
})
