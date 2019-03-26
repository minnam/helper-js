const FIRST_NAMES = [
  'John',
  'Smith',
  'Tom',
  'Brad',
  'Jonny',
  'Liam',
  'Lily'
]

module.exports = [
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

      // const object = JSON.parse(agent.parameters['unit-information'])
      const objects = []

      for (let i = 0; i < number; i++) {
        const _object = Object.assign({}, object)
        for (const key in _object) {
          switch (key) {
            case 'firstName':
            case 'fName':
            case 'name':
              _object[key] = FIRST_NAMES[parseInt(Math.random() * FIRST_NAMES.length)]
              break
          }
        }

        objects.push(_object)
      }
      agent.add(`Here it is, ${JSON.stringify(objects)}`)
    }
  }
]