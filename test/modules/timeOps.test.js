'use strict'

// load the ENVIRONMENT variables
require('dotenv').config()

// load assertion library
const chai = require('chai')
const expect = chai.expect

const timeOps = require('../../modules/timeOps.js')
const today = new Date()

describe('Timestamp: adding date-time to OBJs before saving to db...', () => {
  it('should take datetime then return a string...', (done) => {
    timeOps.current_time(today).then((result) => {
      expect(result.time).to.be.a('string')
      expect(result.datetime).to.be.a('string')
      expect(result.dbname).to.be.a('string')
      done()
    })
  })
})
