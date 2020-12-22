'use strict'

var values = require('./values')

var isInvalidNumber = val => typeof val === 'number' && isNaN(val)

var isInvalisdDate = val => val instanceof Date && val.toString() === 'Invalid Date'

var isFalse = val => val === false

var isEmptyString = val => typeof val === 'string' && val.length === 0

var isEmptyArray = val => Array.isArray(val) && val.length === 0

var isEmptyObject = val => typeof val === 'object' && Object.keys(val).length === 0

var isZero = val => val === 0

var iterableHasntNext = val => typeof val[Symbol.iterator] === 'function' && !val.iterator.hasNext()

module.exports = val => {
  var result = values.true
  if(val === null || val === undefined || isInvalidNumber(val) || isInvalisdDate(val)) {
    result = values.nil
  } else if(isFalse(val) || isEmptyString(val) || isEmptyArray(val) || 
      isEmptyObject(val) || isZero(val) || iterableHasntNext(val)) {
    result = values.false
  }
  return result
}

