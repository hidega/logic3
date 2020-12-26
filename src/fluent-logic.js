'use strict'

var Functions = require('./functions')

function FluentLogic(extras) {
  var then = (predicate, f) => predicate ? Functions.resolveResult3(f, this, extras) : undefined

  var whenNot = (predicate, f) => Functions.ValOtw.newInstance(predicate, then(predicate, f), this, extras)

  this.whenNotTrue = f => whenNot(this.isNotTrue(), f)

  this.whenNotFalse = f => whenNot(this.isNotFalse(), f)

  this.whenNotNil = f => whenNot(this.isNotNil(), f)

  this.whenNotTrueThen = f => then(this.isNotTrue(), f)

  this.whenNotFalseThen = f => then(this.isNotFalse(), f) 

  this.whenNotNilThen = f => then(this.isNotNil(), f)
}

module.exports = FluentLogic

