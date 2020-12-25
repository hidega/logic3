'use strict'

var HasPrimitiveRepresentations = require('./primitive-rep')
var OffersOperations = require('./offers-ops')
var HasPredicates = require('./predicates')
var Comparable = require('./comparable')
var Constants = require('./constants')

function Logic3Value(intVal) {
  HasPrimitiveRepresentations.call(this, intVal)
  HasPredicates.call(this, intVal)
  OffersOperations.call(this, Logic3Value.checkLogic3, Logic3Value.ofInteger)
  Comparable.call(this, Logic3Value.checkLogic3)
}

Logic3Value.checkLogic3 = obj => obj instanceof Logic3Value

Logic3Value.instances = {}

Logic3Value.ofInteger = n => {
  var key = n.toString()
  Logic3Value.instances[key] || (Logic3Value.instances[key] = Object.freeze(new Logic3Value(n)))
  return Logic3Value.instances[key]
}

var test = obj => Logic3Value.checkLogic3(obj)

var values = {
  check: Logic3Value.checkLogic3,
  test,
  True: Logic3Value.ofInteger(Constants.trueInt),
  False: Logic3Value.ofInteger(Constants.falseInt),
  Nil: Logic3Value.ofInteger(Constants.nilInt)
}

module.exports = values

