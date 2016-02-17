#!/usr/bin/env node

import yargs from 'yargs'
import request from 'request-promise'
import retriever from '../retriever'
import printer from '../printer'
import parser from '../parser'

// Parse arguments & options
const argv = yargs
  .version()
  .usage('Usage: graphql-doc-check <url> [options]')
  .option('H', {
    alias: 'header',
    describe: 'Add a HTTP request header',
    type: 'array',
    default: []
  })
  .help().alias('h', 'help')
  .argv

// Parse header options
const headers = argv.header.reduce((acc, header) => {
  if (/.*?:.*?/.test(header) === false) {
    console.error('Unable to parse header: ' + header)
    process.exit(1)
  }

  const [name, value] = header.split(':')
  acc[name] = value

  return acc
}, {})

// Retrieve schema and print results
const options = { headers }
retriever(request).get(argv._[0], options)
  .then(schema => parser.parse(schema))
  .then(results => printer.print(results))
  .then(output => console.log(output))
