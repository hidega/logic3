'use strict'

var evaluate = require('./evaluate')
var values = require('./values')

module.exports = {
  typename: 'Logic3',
  withObject: (l3, obj) => values.valueWithExtras(l3, obj),
  evaluate: subject => values.valueWithExtras(evaluate(subject), subject),
  of: evaluate,
  test: values.test,
  check: values.check,
  True: values.True,
  False: values.False,
  Nil: values.Nil
}

