/* eslint-env mocha */

import expect from 'expect'
import parser from '../src/parser'
import fixtures from './fixtures/parser.fixture.js'

describe('parser', function () {
  it('should parse field arguments', function () {
    expect(parser.parseArgs(fixtures.args)).toEqual([
      {
        name: 'arg1',
        missing: ['description']
      }, {
        name: 'arg2',
        missing: ['description']
      }
    ])
  })

  it('should parse fields', function () {
    expect(parser.parseFields(fixtures.fields)).toEqual([
      {
        args: [],
        name: 'field1',
        missing: ['description']
      },
      {
        name: 'field2',
        missing: [],
        args: [
          { name: 'arg1', missing: ['description'] }
        ]
      }
    ])
  })
})
