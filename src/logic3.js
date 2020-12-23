'use strict'

var evaluate = require('./evaluate')
var values = require('./values')

function Logic3() {
  this.evaluate = evaluate
  this.test = values.test
  this.True = values.True
  this.False = values.False
  this.Nil = values.Nil
}

module.exports = new Logic3()

