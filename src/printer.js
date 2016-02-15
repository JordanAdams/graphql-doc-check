import asciiTree from 'ascii-tree'
import chalk from 'chalk'
import parser from './parser'

const printer = {
  missingTotal: 0,

  /**
   * Renders a schema's results
   *
   * @param  {Object} schema Schema to render
   * @return {String}        Result output
   */
  print (schema) {
    this.missingTotal = 0

    const types = parser.parseTypes(schema.types)
    const trees = this.renderTypes(types)
      .map(type => asciiTree.generate(type))
      .join('\n\n')

    return this.renderHeading() + '\n\n' + trees
  },

  /**
   * Renders the heading
   *
   * @return {String} Heading
   */
  renderHeading () {
    switch (this.missingTotal) {
      case 0: return chalk.green('✔︎ No fields are missing documentation')
      case 1: return chalk.yellow('✘ Found 1 field with missing documentation')
      default: return chalk.yellow(`✘ Found ${this.missingTotal} fields with missing documentation`)
    }
  },

  /**
   * Render a list of types
   *
   * @param  {Array} types Types to render
   * @return {Array}       Rendered types
   */
  renderTypes (types) {
    return types.map(type => {
      let output = this.renderResultLine(type)

      const fields = this.renderFields(type.fields)
      if (fields) {
        output += `\n${fields}`
      }

      return `#${output}`
    })
  },

  /**
   * Render a list of fields
   *
   * @param  {Array}  fields Fields to render
   * @return {String}        Rendered fields
   */
  renderFields (fields) {
    return fields.map(field => {
      let output = this.renderResultLine(field)

      const args = this.renderArgs(field.args)
      if (args) {
        output += `\n${args}`
      }

      return `##${output}`
    }).join('\n')
  },

  /**
   * Render a list of arguments
   *
   * @param  {Array}  args Args to render
   * @return {String}      Rendered args
   */
  renderArgs (args) {
    return args.map(arg => {
      return '###' + this.renderResultLine(arg)
    }).join('\n')
  },

  /**
   * Renders a single result line: "name [prop1 | prop2]"
   *
   * @param  {Object} ... Result to render
   * @return {String}     Rendered result line
   */
  renderResultLine ({ name, missing }) {
    if (missing.length > 0) {
      this.missingTotal++
      const missingList = this.renderMissingList(missing)
      return chalk.red(name) + ' ' + chalk.gray(missingList)
    }

    return name
  },

  /**
   * Render a missing list: "[prop1 | prop2]"
   *
   * @param  {Array}  missing Missing props
   * @return {String}         Rendered missing props
   */
  renderMissingList (missing) {
    return '[' + missing.join(' | ') + ']'
  }
}

export default printer
