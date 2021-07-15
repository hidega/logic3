function Operations(T, F, N) {
  var indexFor = val => T === val ? 0 : (F === val ? 1 : 2)

  var calculate = (a, b, truthTable) => truthTable[indexFor(a)][indexFor(b)]

  var tables = {
    xor: [
      [F, T, N],
      [T, F, N],
      [N, N, N]
    ],
    or: [
      [T, T, T],
      [T, F, N],
      [T, N, N]
    ],
    and: [
      [T, F, N],
      [F, F, F],
      [N, F, N]
    ],
    add: [
      [F, N, T],
      [N, T, F],
      [T, F, N]
    ],
    mul: [
      [T, F, N],
      [F, T, N],
      [N, N, N]
    ],
    sub: [
      [N, F, T],
      [F, N, F],
      [T, F, N]
    ],
    div: [
      [T, F],
      [F, T],
      [N, N]
    ],
    imp: [
      [T, F, N],
      [T, T, T],
      [T, N, N]
    ],
    del: [
      [N, T, T],
      [T, N, F],
      [T, F, N]
    ]
  }

  this.negate = val => T === val ? F : (F === val ? T : N)

  this.xor = (a, b) => calculate(a, b, tables.xor)

  this.or = (a, b) => calculate(a, b, tables.or)

  this.and = (a, b) => calculate(a, b, tables.and)

  this.add = (a, b) => calculate(a, b, tables.add)

  this.mul = (a, b) => calculate(a, b, tables.mul)

  this.sub = (a, b) => calculate(a, b, tables.sub)

  this.del = (a, b) => calculate(a, b, tables.del)

  this.imp = (a, b) => calculate(a, b, tables.imp)

  this.div = (a, b) => {
    if(b === N) {
      throw new Error('Division by zero element')
    }
    return calculate(a, b, tables.div)
  }
}

module.exports = Operations

