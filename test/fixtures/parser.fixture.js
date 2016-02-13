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
    description: ''
  },
  {
    name: 'field2',
    description: 'Args has missing. Keep me',
    args: [
      { name: 'arg1', description: '' }
    ]
  },
  {
    name: 'field2',
    description: 'I have a desc. Ignore me'
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
