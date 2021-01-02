'use strict'

var evaluate = require('./evaluate')
var assertions = require('./assertions')
var values = require('./values')

module.exports = {
  typename: 'Logic3',
  assertions,
  withObject: (l3, obj) => values.valueWithExtras(l3, obj),
  evaluate: subject => values.valueWithExtras(evaluate(subject), subject),
  of: evaluate,
  filter: values.filter,
  test: values.test,
  check: values.check,
  True: values.True,
  False: values.False,
  Nil: values.Nil
}

