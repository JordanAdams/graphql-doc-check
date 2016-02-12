import chalk from 'chalk'

const printer = {
  print: function (schema) {
    parser.parse(schema)
    
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
