'use strict'

var evaluate = require('./evaluate')
var values = require('./values')
var EvalCont = require('./eval-cont')

module.exports = {
  EvalCont,
  evaluate: subject => new EvalCont(evaluate(subject), subject),
  test: values.test,
  True: values.True,
  False: values.False,
  Nil: values.Nil
}

