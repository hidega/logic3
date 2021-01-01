'use strict'

var Functions = require('./functions')

function Level2ValOtw(result, mappedResult, l3, other, predicateName, tn) {
  var pname = predicateName.replace('is', 'when')
  var otw = f => result ? mappedResult : Functions.resolveResult3(f, l3, other)

  var functions = new Functions({
    value: () => mappedResult,
    otherwise: otw,
    [pname]: otw
  })

  this.value = f => Functions.invokeFunction(functions, f, 'value')

  this.otherwise = f => Functions.invokeFunction(functions, f, 'otherwise')

  this[pname] = f => Functions.invokeFunction(functions, f, pname)

  this.typename = tn + pname.replace('when', 'When')
}

Level2ValOtw.newInstance = (...params) => Object.freeze(new Level2ValOtw(...params))

var getTypename = (n, extras) => 'Logic3' + (extras ? 'Ext' : '') + n 

function WhenIs(result, mappedResult, predicateNameA, predicateNameB, l3, extras) {
  var typename = getTypename('WhenNil', extras)
  if(predicateNameA === 'isFalse' && predicateNameB === 'isNil') {
    typename = getTypename('WhenTrue', extras)
  } else if(predicateNameA === 'isTrue' && predicateNameB === 'isNil') {
    typename = getTypename('WhenFalse', extras)
  }   

  var pnameA = predicateNameA.replace('is', 'when')
  var pnameB = predicateNameB.replace('is', 'when')
  var pnameAt = pnameA + 'Then'
  var pnameBt = pnameB + 'Then'

  var elseIs = (f, pn, rn) => {
    var r = result || l3[pn]()
    var fwd = result ? mappedResult : (r ? Functions.resolveResult3(f, l3, extras) : undefined)
    return Level2ValOtw.newInstance(r, r ? fwd : undefined, l3, extras, rn, typename)
  } 

  var elseThen = (pn, f) => result ? mappedResult : (l3[pn]() ? Functions.resolveResult3(f, l3, extras) : undefined)

  var functions = new Functions({
    value: () => mappedResult,
    otherwise: f => result ? mappedResult : Functions.resolveResult3(f, l3, extras),
    [pnameA]: f => elseIs(f, predicateNameA, predicateNameB),
    [pnameB]: f => elseIs(f, predicateNameB, predicateNameA),
    [pnameAt]: f => elseThen(predicateNameA, f),
    [pnameBt]: f => elseThen(predicateNameB, f)
  })

  this.typename = typename

  this.value = f => Functions.invokeFunction(functions, f, 'value')

  this.otherwise = f => Functions.invokeFunction(functions, f, 'otherwise')

  this[pnameA] = f => Functions.invokeFunction(functions, f, pnameA)

  this[pnameB] = f => Functions.invokeFunction(functions, f, pnameB)

  this[pnameAt] = f => Functions.invokeFunction(functions, f, pnameAt)

  this[pnameBt] = f => Functions.invokeFunction(functions, f, pnameBt)
}

WhenIs.newInstance = (...params) => Object.freeze(new WhenIs(...params))

function FluentWhenIs(extras) {
  var whenThen = (f, predicate) => predicate ? Functions.resolveResult3(f, this, extras) : undefined

  var whenIs = (f, predicate, predA, predB) => WhenIs.newInstance(predicate, predicate ? Functions.resolveResult3(f, this, extras) : undefined, predA, predB, this, extras)

  this.whenTrueThen = f => whenThen(f, this.isTrue())

  this.whenFalseThen = f => whenThen(f, this.isFalse())

  this.whenNilThen = f => whenThen(f, this.isNil())

  this.whenTrue = f => whenIs(f, this.isTrue(), 'isFalse', 'isNil')

  this.whenFalse = f => whenIs(f, this.isFalse(), 'isTrue', 'isNil')

  this.whenNil = f => whenIs(f, this.isNil(), 'isFalse', 'isTrue')
}

function FluentLogic(extras) {
  var then = (predicate, f) => predicate ? Functions.resolveResult3(f, this, extras) : undefined

  var whenNot = (predicate, f, tn) => Functions.ValOtw.newInstance(predicate, then(predicate, f), this, extras, tn)

  this.whenNotTrue = f => whenNot(this.isNotTrue(), f, getTypename('WhenNotTrue', extras))

  this.whenNotFalse = f => whenNot(this.isNotFalse(), f, getTypename('WhenNotFalse', extras))

  this.whenNotNil = f => whenNot(this.isNotNil(), f, getTypename('WhenNotNil', extras))

  this.whenNotTrueThen = f => then(this.isNotTrue(), f)

  this.whenNotFalseThen = f => then(this.isNotFalse(), f) 

  this.whenNotNilThen = f => then(this.isNotNil(), f)

  FluentWhenIs.call(this, extras)
}

module.exports = FluentLogic

