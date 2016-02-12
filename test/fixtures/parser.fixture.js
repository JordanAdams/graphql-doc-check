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

export default { args, fields }
