'use strict'

var evaluate = require('./evaluate')
var values = require('./values')

function Logic3() {
  this.evaluate = evaluate
  this.true = values.true
  this.false = values.false
  this.nil = values.nil
}

module.exports = new Logic3()

