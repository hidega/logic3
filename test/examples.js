'use strict'

var Logic3 = require('..')                            // the Logic3 singleton
                                                      //
                                                      // there are 3 logical types
console.log(Logic3.True.toString())                   // True
console.log(Logic3.False.toString())                  // False
console.log(Logic3.Nil.toString())                    // Nil
                                                       
                                                      // check whether an object is a Logic3 type instance
console.log(Logic3.check(Logic3.True))                // true
console.log(Logic3.check({ foo: 1 }))                 // false
Logic3.test(Logic3.True)                              //
  .ok(() => console.log('Logic3 type'))               //
  .fail(() => { throw 'this is not called' })         // Logic3 type
Logic3.test(new Date())                               //
  .ok(() => { throw 'this is not called' })           // 
  .fail(() => console.log('Not Logic3 type'))         // Not Logic3 type
                                                       
                                                      // equality and value test
console.log(Logic3.Nil.equals(Logic3.True))           // false
console.log(Logic3.True.equals(Logic3.True))          // true
console.log(Logic3.True.isTrue())                     // true
console.log(Logic3.True.isNil())                      // false
                                                       
                                                      // operations on the three-valued logical type
console.log(Logic3.Nil.or(Logic3.True).toString())    // True
console.log(Logic3.False.and(Logic3.True).toString()) // False
console.log(Logic3.True.xor(Logic3.True).toString())  // False
console.log(Logic3.False.add(Logic3.True).toString()) // True
                                                       
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
                                                      //
Logic3.True.whenEquals(Logic3.True)                   //
  .then(() => console.log('equal'))                   //
  .otherwise(() => { throw 'this is not called' })    // equal
                                                       
                                                      // primitive representations
console.log(Logic3.True.toBoolean())                  // true 
console.log(Logic3.False.toBoolean())                 // false
console.log(Logic3.Nil.toBoolean())                   // undefined
console.log(Logic3.True.toNumber())                   // 1
                                                       
                                                      // convert plain object to logical value
console.log(Logic3.of(null).toString())               // null, undefined and NaN is converted to Nil
console.log(Logic3.of(undefined).toString())          //
console.log(Logic3.of(Math.sqrt(-1)).toString())      //
console.log(Logic3.of('').toString())                 // empty String is converted to False
console.log(Logic3.of('abc').toString())              // True
console.log(Logic3.of(1).toString())                  // a nonzero number is converted to True
console.log(Logic3.of(0).toString())                  // False
                                                       
                                                      // fluent test if an object is a Logic3 instance
Logic3.test(Logic3.False)                             //
  .ok(() => console.log('passed'))                    // passed
  .fail(() => { throw 'did not pass' })               //
                                                      //
result = Logic3.test(1)                               //
  .ok(() => console.log('OK'))                        //
  .fail(console.log)                                  // 1
console.log(result)                                   // false
                                                      //
result = Logic3.test(Logic3.True)                     //
  .ok(obj => console.log(obj.toBoolean()))            // true
  .fail(() => console.log('Failed'))                  //
console.log(result)                                   // true
                                                      //
result = Logic3.test(1)                               //
  .fail(console.log)                                  // 1
  .ok(() => console.log('OK'))                        //
console.log(result)                                   // false
                                                      //
result = Logic3.test(Logic3.True)                     //
  .fail(() => console.log('Failed'))                  //
  .ok(obj => console.log(obj.toBoolean()))            // true
console.log(result)                                   // true

                                                      // simple value check
console.log(Logic3.True.whenNilThen(5))               // undefined
console.log(Logic3.True.whenTrueThen(5))              // 5
                                                      //
result = Logic3.True.whenTrueThen(v => {              //
  console.log(v.toString())                           // True
  return 'A'                                          //
})                                                    //
console.log(result)                                   // A
                                                      //
result = Logic3.True                                  //
  .whenFalseThen(v => { throw 'this is not called'})  //
console.log(result)                                   // undefined


