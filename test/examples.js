'use strict'

var L3 = require('..')

var f = (a, b, c) => console.log(a, '-', b, '-', c)

var g = (...p) => f(...p)

g(1,2,3,4)
