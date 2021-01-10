logic3
======

`logic3` implements three-valued logic.

Installation
------------
`npm install logic3`

Project status
--------------
Currently the project is in alpha status. The first production version will be `1.1.1`.
 
Examples
--------
```js
var Logic3 = require('..')                            // the Logic3 singleton
                                                      //
                                                      // three basic instances of Logic3Val  
console.log(Logic3.True.toString())                   // True
console.log(Logic3.False.toString())                  // False
console.log(Logic3.Nil.toString())                    // Nil
 
                                                      // check if an object of Logic3Val type
console.log(Logic3.check(Logic3.True))                // true
console.log(Logic3.check({ foo: 1 }))                 // false

                                                      // equality and value test
console.log(Logic3.Nil.equals(Logic3.True))           // false
console.log(Logic3.True.equals(Logic3.True))          // true
console.log(Logic3.True.isTrue())                     // true
console.log(Logic3.True.isNil())                      // false

                                                      // operations on the Logic3Val type
console.log(Logic3.Nil.or(Logic3.True).toString())    // True
console.log(Logic3.False.and(Logic3.True).toString()) // False

                                                      // fluent style operations
var result = Logic3.True                              //
  .whenFalse(() => { throw 'this is not called' })    //
  .whenNil(() => { throw 'this is not called' })      //
  .otherwise(() => 1)                                 //
console.log(result)                                   // 1
                                                      //
Logic3.True.whenEquals(Logic3.False)                  //
  .then(() => { throw 'this is not called' })         //
  .otherwise(() => console.log('not equal'))          // not equal

                                                      // primitive representations
console.log(Logic3.True.toBoolean())                  // true 
console.log(Logic3.Nil.toBoolean())                   // undefined

                                                      // convert plain object to logical value
console.log(Logic3.of(null).toString())               // null and undefined is converted to Nil
console.log(Logic3.of('').toString())                 // empty String is converted to False
console.log(Logic3.of(1).toString())                  // a nonzero number is converted to True

```
[More examples](https://github.com/hidega/logic3/blob/development/test/examples.js)

### [API documentation](https://htmlpreview.github.io/?https://github.com/hidega/logic3/blob/development/api-doc.html)


