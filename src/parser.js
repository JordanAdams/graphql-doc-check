import _ from 'lodash'

const parser = function () {
  const makeDocumentationResult = (item) => {
    const missing = []

    if (_.isEmpty(item.description)) {
      missing.push('description')
    }

    return { name: item.name, missing }
  }

  return {
    parseArgs (args) {
      return _
        .chain(args)
        .map(makeDocumentationResult)
        .reject(result => _.isEmpty(result.missing))
        .value()
    },

    parseFields (fields) {
      return _
        .chain(fields)
        .map(field => {
          const args = this.parseArgs(field.args)

          field = makeDocumentationResult(field)
          field.args = args

          return field
        })
        .filter(field => {
          if (_.isEmpty(field.missing) === false) return true
          if (_.isEmpty(field.args) === false) return true

          return false
        })
        .value()
    }
  }
}

export default parser()
