var Constants = require('./constants')

function HasPredicates(intVal) {
  this.isTrue = () => intVal === Constants.trueInt 

  this.isFalse = () => intVal === Constants.falseInt 

  this.isNil = () => intVal === Constants.nilInt

  this.isNotTrue = () => intVal !== Constants.trueInt 

  this.isNotFalse = () => intVal !== Constants.falseInt 

  this.isNotNil = () => intVal !== Constants.nilInt
}

module.exports = HasPredicates

