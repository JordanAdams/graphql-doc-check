const args = [
  {
    name: 'arg1',
    description: null
  },
  {
    name: 'arg2',
    description: ''
  },
  {
    name: 'arg3',
    description: 'ignore me'
  }
]

const fields = [
  {
    name: 'field1',
    description: '',
    isDeprecated: false,
    deprecationReason: null
  },
  {
    name: 'field2',
    description: 'Args has missing. Keep me',
    isDeprecated: false,
    deprecationReason: null,
    args: [
      { name: 'arg1', description: '' }
    ]
  },
  {
    name: 'field2',
    description: 'I have a desc. Ignore me',
    isDeprecated: false,
    deprecationReason: null
  },
  {
    name: 'field3',
    description: 'I\'m depricated but don\'t have a reason. Keep me',
    isDeprecated: true,
    deprecationReason: null
  },
  {
    name: 'field4',
    description: 'I\'m depricated and have a reason. Ignore me',
    isDeprecated: true,
    deprecationReason: 'Example'
  }
]

const types = [
  {
    name: '__Field',
    description: 'Known built-in type. Should be ignored',
    fields: [ { name: 'field', description: '' } ]
  },
  {
    name: 'type1',
    description: ''
  },
  {
    name: 'type2',
    description: 'Fields has missing. Keep me',
    fields: [
      { name: 'field1', description: '', args: [] }
    ]
  },
  {
    name: 'type3',
    description: 'Field Args has missing. Keep me',
    fields: [
      {
        name: 'field2',
        description: 'I\'m a field',
        args: [ { name: 'arg1', description: '' } ]
      }
    ]
  },
  {
    name: 'type4',
    description: 'I have a description. Ignore me'
  }
]

export default { args, fields, types }
