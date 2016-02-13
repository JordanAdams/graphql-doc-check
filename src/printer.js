import asciiTree from 'ascii-tree'
import chalk from 'chalk'
import parser from './parser'

const printer = {
  missingTotal: 0,

  print (schema) {
    this.missingTotal = 0

    const types = parser.parseTypes(schema.types)
    const trees = this.renderTypes(types)
      .map(type => asciiTree.generate(type))
      .join('\n\n')

    return this.renderHeading() + '\n\n' + trees
  },

  renderHeading () {
    switch (this.missingTotal) {
      case 0: return chalk.green('✔︎ No fields are missing documentation')
      case 1: return chalk.yellow('✘ Found 1 field with missing documentation')
      default: return chalk.yellow(`✘ Found ${this.missingTotal} fields with missing documentation`)
    }
  },

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

  renderFields (fields) {
    return fields.map(field => {
      let output = this.renderResultLine(field)

      const args = this.parseArgs(field.args)
      if (args) {
        output += `\n${args}`
      }

      return `##${output}`
    }).join('\n')
  },

  parseArgs (args) {
    return args.map(arg => {
      return '###' + this.renderResultLine(arg)
    }).join('\n')
  },

  renderResultLine ({ name, missing }) {
    if (missing.length > 0) {
      this.missingTotal++
      const missingList = this.renderMissingList(missing)
      return chalk.red(name) + ' ' + chalk.gray(missingList)
    }

    return name
  },

  renderMissingList (missing) {
    return '[' + missing.join(' | ') + ']'
  }
}

export default printer

// Missing 18 descriptions

// Query [✗ desc | ✗ name]
//   person
//     id [✗ desc]
//   people [✗ desc | ✗ name]

// Query [desc|name]
// ├- person
// │	 ├- id [desc]
// └- people [desc|name]
