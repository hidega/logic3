var Constants = require('./constants')
var Operations = require('./operations')

function OffersOperations(checkLogic3, ofInteger) {
  var operations = new Operations(Constants.trueInt, Constants.falseInt, Constants.nilInt)

  var performOperation = (f, other) => {
    if(!checkLogic3(other)) {
      throw new Error('Bad input, Logic3 value expected.')
    }
    return ofInteger(f(this.toNumber(), other.toNumber()))
  }

  this.add = other => performOperation(operations.add, other)

  this.subtract = other => performOperation(operations.sub, other)

  this.multiply = other => performOperation(operations.mul, other)

  this.divide = other => performOperation(operations.div, other)

  this.and = other => performOperation(operations.and, other)

  this.or = other => performOperation(operations.or, other)

  this.xor = other => performOperation(operations.xor, other)

  this.delta = other => performOperation(operations.del, other)

  this.imply = other => performOperation(operations.imp, other)

  this.negate = () => ofInteger(operations.negate(this.toNumber()))
}

module.exports = OffersOperations

