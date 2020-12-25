'use strict'

var Functions = require('./functions')

var resolveResult = (f, l3, other) => typeof f === 'function' ? f(l3, other) : f

function Then(result, mappedResult, l3, other) {
  var functions = new Functions({
    value: () => mappedResult,
    otherwise: f => result ? mappedResult : resolveResult(f, l3, other) 
  })

  this.value = f => Functions.invokeFunction(functions, f, 'value')

  this.otherwise = f => Functions.invokeFunction(functions, f, 'otherwise')  
}

Then.newInstance = (result, mappedResult, l3, other)  => Object.freeze(new Then(result, mappedResult, l3, other))

function HasConsequence(result, l3, other) {
  var functions = new Functions({
    then: f => Then.newInstance(result, result ? resolveResult(f, l3, other) : undefined, l3, other),
    thenValueOf: f => result ? resolveResult(f, l3, other)  : undefined
  })

  this.then = f => Functions.invokeFunction(functions, f, 'then')

  this.thenValueOf = f => Functions.invokeFunction(functions, f, 'thenValueOf')  
}

HasConsequence.newInstance = (result, l3, other) => Object.freeze(new HasConsequence(result, l3, other))

function Comparable(checkLogic3) {
  this.equals = other => checkLogic3(other) && 
    ((other.isTrue() && this.isTrue()) || (other.isFalse() && this.isFalse()) || (other.isNil() && this.isNil()))

  this.notEquals = other => !this.equals(other)

  this.whenEquals = other => HasConsequence.newInstance(this.equals(other), this, other)

  this.whenNotEquals = other => HasConsequence.newInstance(!this.equals(other), this, other)
}

module.exports = Comparable

