/* eslint-env mocha */

import expect from 'expect'
import chalk from 'chalk'
import printer from '../src/printer'

describe('printer', function () {
  const results = {
    types: [
      { name: 'type1', missing: ['description'], fields: [] },
      {
        name: 'type2',
        missing: [],
        fields: [
          { name: 'field1', missing: ['description'], args: [] },
          {
            name: 'field2',
            missing: [],
            args: [
              { name: 'arg1', missing: ['description'] }
            ]
          }
        ]
      }
    ]
  }

  const expected = [
    chalk.yellow('✘ Found 3 fields with missing documentation') + '\n\n',
    chalk.red('type1') + ' ' + chalk.gray('[description]') + '\n\n',
    'type2\r\n',
    '├─ ' + chalk.red('field1') + ' ' + chalk.gray('[description]') + '\r\n',
    '└─ field2\r\n',
    '   └─ ' + chalk.red('arg1') + ' ' + chalk.gray('[description]')
  ].join('')

  it('should make results for missing docs', function () {
    expect(printer.print(results))
      .toEqual(expected)
  })

  it('should make results for 1 field with missing docs', function () {
    const tweakedResults = {
      types: results.types.slice(0, 1)
    }

    expect(printer.print(tweakedResults))
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
