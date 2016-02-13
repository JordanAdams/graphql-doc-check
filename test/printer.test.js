/* eslint-env mocha */

import expect from 'expect'
import chalk from 'chalk'
import printer from '../src/printer'

describe('printer', function () {
  const schema = {
    types: [
      { name: 'type1', description: '', fields: [] },
      { name: 'type2', description: '...', fields: [] },
      {
        name: 'type3',
        description: '...',
        fields: [
          { name: 'field1', description: '', args: [] },
          { name: 'field2', description: '...', args: [] },
          {
            name: 'field3',
            description: '...',
            args: [
              { name: 'arg1', description: '' },
              { name: 'arg2', description: '...' }
            ]
          }
        ]
      }
    ]
  }

  const expected = [
    chalk.yellow('✘ Found 3 fields with missing documentation') + '\n\n',
    chalk.red('type1') + ' ' + chalk.gray('[description]') + '\n\n',
    'type3\r\n',
    '├─ ' + chalk.red('field1') + ' ' + chalk.gray('[description]') + '\r\n',
    '└─ field3\r\n',
    '   └─ ' + chalk.red('arg1') + ' ' + chalk.gray('[description]')
  ].join('')

  it('should make results for missing docs', function () {
    expect(printer.print(schema))
      .toEqual(expected)
  })

  it('should make results for 1 field with missing docs', function () {
    expect(printer.print({ types: [schema.types[0]] }))
      .toEqual([
        chalk.yellow('✘ Found 1 field with missing documentation') + '\n\n',
        chalk.red('type1') + ' ' + chalk.gray('[description]')
      ].join(''))
  })

  it('should make results for no missing docs', function () {
    expect(printer.print({ types: [] }))
      .toEqual(chalk.green('✔︎ No fields are missing documentation') + '\n\n')
  })
})
