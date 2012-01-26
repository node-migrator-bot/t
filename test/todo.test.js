
/**
 * Test dependencies
 */

var todo = require('../lib/todo')

describe('PATH constants', function () {

  it ('should have two PATH constants', function () {
    HOME.should.be.a('string')
    PWD.should.be.a('string')
  })

})

describe('version', function () {

  it ('should be a number separated with two punctuations', function () {
    todo.version.should.match(/^[\d]{1,2}\.[\d]{1,2}\.[\d]{1,2}$/)
  })

})