#!/usr/bin/env node
'use strict'

const parser = require('csv-parser')
const fs = require('fs')

const source = './KFZ250.csv'
const data = {}

fs.createReadStream(source)
.pipe(parser({"separator": ";"}))
.on('data', (entry) => {
	entry.KFZ.split("  ").forEach(function(char) {
		data[char] = entry.NAME;
	})
})
.on('end', _ => {
	let file = fs.createWriteStream('./index.json')
	file.on('finish', _ => console.log('Done.'))
	file.end(JSON.stringify(data))
})
