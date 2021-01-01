'use strict'

var Functions = require('./functions')

function HasConsequence(result, l3, other, typename) {
  var functions = new Functions({
    then: f => Functions.ValOtw.newInstance(result, result ? Functions.resolveResult3(f, l3, other) : undefined, l3, other, typename + 'Then'),
    thenValueOf: f => result ? Functions.resolveResult3(f, l3, other) : undefined
  })

  this.then = f => Functions.invokeFunction(functions, f, 'then')

  this.thenValueOf = f => Functions.invokeFunction(functions, f, 'thenValueOf')

  this.typename = typename
}

HasConsequence.newInstance = (...params) => Object.freeze(new HasConsequence(...params))

function Comparable(checkLogic3) {
  this.equals = other => checkLogic3(other) &&
    ((other.isTrue() && this.isTrue()) || (other.isFalse() && this.isFalse()) || (other.isNil() && this.isNil()))

  this.notEquals = other => !this.equals(other)

  this.whenEquals = other => HasConsequence.newInstance(this.equals(other), this, other, 'Logic3WhenEquals')

  this.whenNotEquals = other => HasConsequence.newInstance(!this.equals(other), this, other, 'Logic3WhenNotEquals')
}

module.exports = Comparable

