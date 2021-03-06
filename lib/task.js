
/*!
 * ntask
 * Copyright(c) 2012 Henrik Kjelsberg <hkjels@me.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

var crypto = require('crypto')
  , stem = require('porter-stemmer').stemmer
  , _ = require('underscore')

/**
 * Expose `Task`
 */

exports = module.exports = Task

/**
 * Task
 * Model used by Barricane
 */

function Task(task) {
  _.extend(this, task)
  if (task != undefined) this.createId()

  // Short id
  this.__defineGetter__('id', function () {
    return this.__uuid__.substr(0, 8).toString()
  })

  // Keyword
  this.__defineGetter__('keyword', function () {
    return this.labels[0].replace('#', '').toUpperCase()
  })

  // Stemmed
  this.__defineGetter__('stemmed', function () {
    return (this.title+' '+this.body).toLowerCase().split(' ').map(stem).join(' ')
  })

  // All
  this.__defineGetter__('all', function () {
    return '*'
  })
}

/**
 * Create a unique id
 *
 * Strips trackable elements from the title & uses an md5-hash of the remainder
 * to create a unique id for the task
 *
 * @return {Task}
 * @api private
 */

Task.prototype.createId = function () {
  var variables = new RegExp('('+KEYWORDS+')((#|@)[^ ]*)', 'g')
    , title = this.title.replace(variables, '')
    , id

  /**
   * Title must be atleast ten characters long after trackable elements has
   * been stripped out.
   */

  if (title.length > 10) {
    title = title.substr(0, 140)
    title = new Buffer(title)
    this.__uuid__ = crypto.createHash('md5').update(title).digest('hex')
  }

  return this
}

/**
 * Validates task
 *
 * A list of criteria that a task should fulfill
 *
 * @return {Boolean}
 */

Task.prototype.isValid = function () {
  return (
    this.added instanceof Date &&
    typeof this.file == 'string' &&
    typeof this.line == 'number' &&
    typeof this.assignee == 'string' &&
    typeof this.labels == 'object' &&
    typeof this.__uuid__ == 'string' &&
    this.__uuid__.length === 32
  )
}

/**
 * Register task with Barricane
 */

Task.prototype.save = function () {
  process.db.registerInstance(this)
}

