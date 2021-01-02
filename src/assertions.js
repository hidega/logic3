'use strict'

var values = require('./values')

var fail= msg => { throw new Error(msg) }

var error = msg => fail('Error: value is ' + msg)

var assertLogic3 = a => values.check(a) ? true : error(`not a Logic3 value : ${a}`)

module.exports = Object.freeze({
  typename: 'Logic3Assertions',
  fail,
  assertLogic3,
  assertNotLogic3: a => values.check(a) ? error(`a Logic3 value : ${a}`) : true,
  assertTrue: a => assertLogic3(a) && a.isTrue() ? true : error(`not True : ${a}`),
  assertNotTrue: a => assertLogic3(a) && a.isNotTrue() ? true : error(`True : ${a}`),
  assertFalse: a => assertLogic3(a) && a.isFalse() ? true : error(`not False : ${a}`),
  assertNotFalse: a => assertLogic3(a) && a.isNotFalse() ? true : error(`False : ${a}`),
  assertNil: a => assertLogic3(a) && a.isNil() ? true : error(`not Nil : ${a}`),
  assertNotNil: a => assertLogic3(a) && a.isNotNil() ? true : error(`Nil : ${a}`),
  assertEqual: (a, b) => assertLogic3(a) && assertLogic3(b) && a.equals(b) ? true : error(` not equal: ${a} ${b}`),
  assertNotEqual: (a, b) => assertLogic3(a) && assertLogic3(b) && a.notEquals(b) ? true : error(` equal: ${a} ${b}`)
})
