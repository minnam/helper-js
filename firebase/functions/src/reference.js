module.exports = [
  {
    name: 'array',
    description: 'Array',
    example: 'What is an Array',
    callback: agent => {
      agent.add(`Array\n\nmf`);
    }
  },
  {
    name: 'arrow-functions.example',
    description: 'Arrow Function Example',
    example: 'Give me an example of Arrow Functions',
    callback: agent => {
      agent.add(`
      Here it is!  \n  \n  \n
      <code>
      var materials = [  \n
        'Hydrogen',  \n
        'Helium',  \n
        'Lithium',  \n
        'Beryllium'  \n
      ];  \n  \n
      console.log(materials.map(material => material.length));  \n
      // expected output: Array [8, 6, 7, 9]  \n  \n
      </code>
      `);
    }
  },
]