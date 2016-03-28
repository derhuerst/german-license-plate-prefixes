#!/usr/bin/env node
'use strict'

const data   = require('./index.json')
const assert = require('assert')

for (let id in data) {
	assert.strictEqual(typeof data[id], 'string')
}

console.log(`Tested ${Object.keys(data).length} entries.`)
