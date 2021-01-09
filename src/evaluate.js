'use strict'

var values = require('./values')

var isInvalidNumber = val => typeof val === 'number' && isNaN(val)

var isInvalidDate = val => val instanceof Date && val.toString() === 'Invalid Date'

var isFalse = val => val === false

var isEmptyString = val => typeof val === 'string' && val.length === 0

var isEmptyArray = val => Array.isArray(val) && val.length === 0

var isEmptyObject = val => typeof val === 'object' && Object.keys(val).length === 0

var isZero = val => val === 0

module.exports = val => {
  var result = values.True
  if(values.check(val)) {
    result = val
  } else if(val === null || val === undefined || isInvalidNumber(val) || isInvalidDate(val)) {
    result = values.Nil
  } else if(isFalse(val) || isEmptyString(val) || isEmptyArray(val) || isEmptyObject(val) || isZero(val)) {
    result = values.False
  }
  return result
}

