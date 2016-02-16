import _ from 'lodash'

const parser = function () {
  /**
   * Determines if a type should be ignored from parsing
   *
   * @param  {Object} type Type to check
   * @return {Boolean}     Should be ignored?
   */
  const typeShouldBeIgnored = (type) => {
    const ignores = [
      '__Type',
      '__Field',
      '__InputValue',
      '__EnumValue',
      '__Directive'
    ]

    if (ignores.indexOf(type.name) >= 0) {
      return true
    }

    return false
  }

  /**
   * Makes a documentation result for a schema item
   *
   * @param  {Object} item Schema item (type, field or arg)
   * @return {Object}      Result
   */
  const makeDocumentationResult = (item) => {
    const missing = []

    if (_.isEmpty(item.description)) {
      missing.push('description')
    }

    return { name: item.name, missing }
  }

  return {
    /**
     * Parses field arguments in a schema
     *
     * @param  {Array} args Field arguments to parse
     * @return {Array}      Parsed field arguments
     */
    parseArgs (args) {
      return _
        .chain(args)
        .map(makeDocumentationResult)
        .reject(result => _.isEmpty(result.missing))
        .value()
    },

    /**
     * Parses fields in a schema
     *
     * @param  {Array} fields Fields to parse
     * @return {Array}        Parsed fields
     */
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
    },

    /**
     * Parses types in a schema
     *
     * @param  {Array} types Types to parse
     * @return {Array}       Parsed types
     */
    parseTypes (types) {
      return _
        .chain(types)
        .reject(typeShouldBeIgnored)
        .map(type => {
          const fields = this.parseFields(type.fields)

          type = makeDocumentationResult(type)
          type.fields = fields

          return type
        })
        .filter(type => {
          if (_.isEmpty(type.missing) === false) return true
          if (_.isEmpty(type.fields) === false) return true

          return false
        })
        .value()
    },

    /**
     * Parse a given schema
     * @param  {Object} schema Schema to parse
     * @return {Object}        Parsed schema
     */
    parse (schema) {
      schema.types = this.parseTypes(schema.types)

      return schema
    }
  }
}

export default parser()
