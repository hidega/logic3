'use strict'

var evaluate = require('./evaluate')
var assertions = require('./assertions')
var values = require('./values')

module.exports = {
  typename: 'Logic3',
  of: evaluate,
  test: values.test,
  check: values.check,
  True: values.True,
  False: values.False,
  Nil: values.Nil,
  assertions
}

