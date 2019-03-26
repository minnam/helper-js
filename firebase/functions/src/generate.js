const WORDS = [  
  'Gucci',
  'Prada',
  'Canada Goose',
  'Louis Vutton',
  'Versace',
  'Bally',
  'Mercedes',
  'BMW',
  'Tesla',
  'Omega',
  'Rolex',
  'Boss'
]

const FIRST_NAMES = [
  'John',
  'Smith',
  'Tom',
  'Brad',
  'Jonny',
  'Liam',
  'Lily'
]
const LAST_NAMES = [
  'Smith',
  'Kim',
  'Ford',
  'Pitt',
  'Depp',
  'Cruz',
  'Ronaldo'
]

function generateRandomDate (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRandomByType (type) {
  switch (type) {
    case 'String':
    case 'string':
      return WORDS[parseInt(Math.random() * WORDS.length)]
    case 'Int':
    case 'int':
      return parseInt(Math.random() * 1000)
    case 'Float':
    case 'float':
      return parseInt(parseInt(Math.random() * 100000) / 100)
    case 'Boolean':
    case 'boolean':
    case 'bool':
      return parseInt(parseInt(Math.random() * 2) === 0)
    case 'date':
    case 'Date':
      return randomDate(new Date(2012, 0, 1), new Date()).toISOString()
  }
}

module.exports = [
  {
    name: 'array.months',
    description: 'Array of Month Names (full)',
    example: 'give me month names',
    callback: agent => {      
      agent.add(`Here it is,  \n <code>const MONTH_NAMES = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]</code>`)
    }
  },
  {
    name: 'random.data',
    description: 'Generate Random Test Data',
    example: 'give me 10 of { firstName: String }',
    callback: agent => {
      const number = agent.parameters['number'];
      const object =`${/{(.*)}/.exec(agent.query)[1]}`.split(',')
      .map(x => x.split(':').map(y => y.trim()))
      .reduce((a, x) => {
        a[x[0]] = x[1];
        return a;
      }, {});
      
      const objects = []

      for (let i = 0; i < number; i++) {
        const _object = Object.assign({}, object)
        for (const key in _object) {
          switch (key) {
            case 'firstName':
            case 'fName':
            case 'name': {
              if (_object[key] === 'String' || _object[key] === 'string') {
                _object[key] = FIRST_NAMES[parseInt(Math.random() * FIRST_NAMES.length)]
              } else {
                _object[key] = generateRandomByType(_object[key])
              }
              break
            }
            case 'lastName':
            case 'lName':
            case 'name': {
              if (_object[key] === 'String' || _object[key] === 'string') {
                _object[key] = LAST_NAMES[parseInt(Math.random() * LAST_NAMES.length)]
              } else {
                _object[key] = generateRandomByType(_object[key])
              }
              break
            }
            default: 
              _object[key] = generateRandomByType(_object[key])
          }
        }

        objects.push(_object)
      }
      agent.add(`Here it is!  \n <code>const TEST_DATA = ${JSON.stringify(objects)}</code>`)
    }
  }
]