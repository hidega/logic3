'use strict'
 
var Constants = require('./constants')

function HasPrimitiveRepresentations(n) {
  var intVal = parseInt(n)
  var isTrue = intVal === Constants.trueInt
  var isFalse = intVal === Constants.falseInt
  var strVal = isTrue ? 'True' : (isFalse ? 'False' : 'Nil') 
  var boolVal = isTrue ? true : (isFalse ? false : undefined)

  this.toString = () => strVal

  this.toBoolean = () => boolVal

  this.toNumber = () => intVal
}

module.exports = HasPrimitiveRepresentations

