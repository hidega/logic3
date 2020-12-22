'use strict'

var operations = require('./operations')

function Value(strVal, boolVal, intVal, isTrue, isFalse, isNil) {
  this.toString = () => strVal

  this.toBoolean = () => boolVal

  this.toNumber = () => intVal

  this.add = other => operations.add(this, other)

  this.subtract = other => operations.subtract(this, other)

  this.multiple = other => operations.multiple(this, other)

  this.divide = other => operations.divide(this, other)

  this.and = other => operations.and(this, other)

  this.or = other => operations.or(this, other)

  this.xor = other => operations.xor(this, other)

  this.imply = other => operations.imply(this, other)

  this.negate = () => operations.negate(this)

  this.notEquals = other => !this.equals(other)

  this.isTrue = () => isTrue 

  this.isFalse = () => isFalse 

  this.isNil = () => isNil

  this.isntTrue = () => !isTrue 

  this.isntFalse = () => !isFalse 

  this.isntNil = () => !isNil

  this.whenEquals = (other, f) => {
    var result = { otherwise: g => g(this, other) }
    if(this.equals(other)) {
      f(this, other)
      result = { otherwise: () => {} }
    }
    return result
  }
}

function Logic3Nil() {
  Value.call(this, 'Nil', undefined, 0, false, false, true)

  this.equals = other => other instanceof Logic3Nil
}

function Logic3True() {
  Value.call(this, 'True', undefined, 0, false, true, false)

  this.equals = other => other instanceof Logic3True
}

function Logic3False() {
  Value.call(this, 'False', undefined, 0, false, true, false)

  this.equals = other => other instanceof Logic3False
}

module.exports = {
  true: new Logic3True(),
  false: new Logic3False(),
  nil: new Logic3Nil()
}

