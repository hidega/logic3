'use strict'

var HasPrimitiveRepresentations = require('./primitive-rep')
var OffersOperations = require('./offers-ops')
var HasPredicates = require('./predicates')
var Comparable = require('./comparable')
var FluentLogic = require('./fluent-logic')
var Constants = require('./constants')
var test = require('./test-logic')

function Logic3Value(intVal, extras) {
  HasPrimitiveRepresentations.call(this, intVal)
  HasPredicates.call(this, intVal)
  OffersOperations.call(this, Logic3Value.checkLogic3, Logic3Value.ofInteger)
  Comparable.call(this, Logic3Value.checkLogic3)
  FluentLogic.call(this, extras)
}

Logic3Value.checkLogic3 = obj => obj instanceof Logic3Value

Logic3Value.instances = {}

Logic3Value.ofInteger = n => Logic3Value.instances[n.toString()]

Logic3Value.instances[Constants.trueInt.toString()] = Object.freeze(new Logic3Value(Constants.trueInt))
Logic3Value.instances[Constants.falseInt.toString()] = Object.freeze(new Logic3Value(Constants.falseInt))
Logic3Value.instances[Constants.nilInt.toString()] = Object.freeze(new Logic3Value(Constants.nilInt))

var values = {
  check: Logic3Value.checkLogic3,
  test: obj => test(Logic3Value.checkLogic3(obj), obj),
  True: Logic3Value.ofInteger(Constants.trueInt),
  False: Logic3Value.ofInteger(Constants.falseInt),
  Nil: Logic3Value.ofInteger(Constants.nilInt),
  valueWithExtras: (l3, extras) => new Logic3Value(l3.toNumber(), extras)
}

module.exports = values

