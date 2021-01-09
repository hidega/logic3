'use strict'

var evaluate = require('./evaluate')
var assertions = require('./assertions')
var values = require('./values')

module.exports = {
  typename: 'Logic3',
  of: evaluate,
  filter: values.filter,
  test: values.test,
  check: values.check,
  True: values.True,
  False: values.False,
  Nil: values.Nil,
  assertions
}

