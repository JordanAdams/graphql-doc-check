#!/usr/bin/env node

import request from 'request-promise'
import retriever from './retriever'
import printer from './printer'

const url = process.argv[2]

retriever(request).get(url)
  .then(schema => printer.print(schema))
  .then(output => console.log(output))
