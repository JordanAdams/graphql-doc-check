import request from 'request-promise'
import retriever from './retriever'
import printer from './printer'

retriever(request)
  .get('localhost:8888')
  .then(schema => printer.print(schema))
  .then(output => console.log(output))

//
// const typeShouldBeChecked = (type) => {
//   if (/^__/.test(type.name)) {
//     return false
//   }
//
//   if (type.kind === 'SCALAR') {
//     return false
//   }
//
//   return true
// }
//
// const typeContainsMissingDocs = (type) => {
//   if (!type.description) {
//     return true
//   }
//
//   if (!type.fields.filter(field => field.description.length < 1)) {
//     return true
//   }
//
//   return false
// }
//
// const renderFieldResults = (fields) => {
//   return fields.map(field => {
//     return '  ' + (_.isEmpty(field.description) ? '✘' : '✔') + ' ' + field.name
//   }).join('\n')
// }
//
// const renderTypeResults = (type) => {
//   const fieldLines = renderFieldResults(type.fields)
//   const typeLines = (_.isEmpty(type.description) ? '✘' : '✔') + ' ' + type.name
//
//   return `${typeLines}\n${fieldLines}\n`
// }
