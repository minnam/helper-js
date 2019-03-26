module.exports = [
  {
    name: 'array.functions',
    description: 'Array',
    example: 'Give me functions in array',
    callback: agent => {
      agent.add(`<code>// Create an Array  \n
      \n
    var fruits = ['Apple', 'Banana'];  \n
      \n
    console.log(fruits.length);  \n
    // 2  \n
      \n
    // Access (index into) an Array item  \n
      \n
    var first = fruits[0];  \n
    // Apple  \n
      \n
    var last = fruits[fruits.length - 1];  \n
    // Banana  \n
      \n
    // Loop over an Array  \n
      \n
    fruits.forEach(function(item, index, array) {  \n
      console.log(item, index);  \n
    });  \n
    // Apple 0  \n
    // Banana 1  \n
      \n
    // Add to the end of an Array  \n
      \n
    var newLength = fruits.push('Orange');  \n
    // ["Apple", "Banana", "Orange"]  \n
      \n
    // Remove from the end of an Array  \n
      \n
    var last = fruits.pop(); // remove Orange (from the end)  \n
    // ["Apple", "Banana"];  \n
      \n
    // Remove from the front of an Array  \n
      \n
    var first = fruits.shift(); // remove Apple from the front  \n
    // ["Banana"];  \n
      \n
    // Add to the front of an Array  \n
      \n
    var newLength = fruits.unshift('Strawberry') // add to the front  \n
    // ["Strawberry", "Banana"];  \n
      \n
    // Remove an item by index position  \n
      \n
    var removedItem = fruits.splice(pos, 1); // this is how to remove an item  \n
                                              \n
    // ["Strawberry", "Mango"]  \n
      \n
    // Remove items from an index position  \n
      \n
    var vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot'];  \n
    console.log(vegetables);   \n
    // ["Cabbage", "Turnip", "Radish", "Carrot"]  \n
      \n
    var pos = 1, n = 2;  \n
      \n
    var removedItems = vegetables.splice(pos, n);   \n
    // this is how to remove items, n defines the number of items to be removed,  \n
    // from that position(pos) onward to the end of array.  \n
      \n
    console.log(vegetables);   \n
    // ["Cabbage", "Carrot"] (the original array is changed)  \n
      \n
    console.log(removedItems);   \n
    // ["Turnip", "Radish"]  \n
      \n
    // Copy an Array  \n
      \n
    var shallowCopy = fruits.slice(); // this is how to make a copy  \n
    // ["Strawberry", "Mango"]  \n
    </code>
    `);
    }
  },
  {
    name: 'arrow-functions.example',
    description: 'Arrow Function Example',
    example: 'Give me an example of Arrow Functions',
    callback: agent => {
      agent.add(`
      Here it is!  \n
      Arrow functions – also called “fat arrow” functions, from CoffeeScript (a transcompiled language) — are a more concise syntax for writing function expressions. They utilize a new token, =>, that looks like a fat arrow. Arrow functions are anonymous and change the way this binds in functions.
        \n
      <code>
      var materials = [  \n
        \t'Hydrogen',  \n
        \t'Helium',  \n
        \t'Lithium',  \n
        \t'Beryllium'  \n
      ];  \n  \n
      console.log(materials.map(material => material.length));  \n
      // expected output: Array [8, 6, 7, 9]
      </code>
      `);
    }
  },
]