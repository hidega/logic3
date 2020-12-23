'use strict'

var Operations = require('./operations')

function Logic3Value(intVal) {
  var isTrue = intVal === Logic3Value.trueInt
  var isFalse = intVal === Logic3Value.falseInt
  var isNil = intVal === Logic3Value.nilInt 
  var strVal = isTrue ? 'True' : (isFalse ? 'False' : 'Nil') 
  var boolVal = isTrue ? true : (isFalse ? false : undefined)  

  var operations = new Operations(Logic3Value.trueInt, Logic3Value.falseInt, Logic3Value.nilInt)

  var performOperation = (f, other) => {
    if(!Logic3Value.checkLogic3(other)) {
      throw new Error('Bad input, Logic3 value expected.')
    }
    return Logic3Value.ofInteger(f(this.toNumber(), other.toNumber()))
  } 

  this.toString = () => strVal

  this.toBoolean = () => boolVal

  this.toNumber = () => intVal

  this.add = other => performOperation(operations.add, other)

  this.subtract = other => performOperation(operations.sub, other)

  this.multiply = other => performOperation(operations.mul, other)

  this.divide = other => performOperation(ooerations.div, other)

  this.and = other => performOperation(operations.and, other)

  this.or = other => performOperation(operations.or, other)

  this.xor = other => performOperation(operations.xor, other)

  this.delta = other => performOperation(operations.del, other)

  this.imply = other => performOperation(operations.imp, other)

  this.negate = () => Logic3Value.ofInteger(operations.negate(intVal))

  this.equals = other => Logic3Value.checkLogic3(other) && 
    ((other.isTrue() && this.isTrue()) || (other.isFalse() && this.isFalse()) || (other.isNil() && this.isNil()))

  this.notEquals = other => !this.equals(other)

  this.isTrue = () => isTrue 

  this.isFalse = () => isFalse 

  this.isNil = () => isNil

  this.isntTrue = () => !isTrue 

  this.isntFalse = () => !isFalse 

  this.isntNil = () => !isNil

  //this.whenEquals = (other, f) => {}
  //...
}

Logic3Value.checkLogic3 = obj => obj instanceof Logic3Value

Logic3Value.trueInt = 1

Logic3Value.falseInt = -1

Logic3Value.nilInt = 0

Logic3Value.instances = {}

Logic3Value.ofInteger = n => {
  var key = n.toString()
  var result = Logic3Value.instances[key]
  if(!result) {
    result = new Logic3Value(n)
    Logic3Value.instances[key] = result
  }
  return result
}

var test = obj => Logic3Value.checkLogic3(obj)

var values = {
  check: Logic3Value.checkLogic3,
  test,
  True: Logic3Value.ofInteger(Logic3Value.trueInt),
  False: Logic3Value.ofInteger(Logic3Value.falseInt),
  Nil: Logic3Value.ofInteger(Logic3Value.nilInt)
}

module.exports = values

