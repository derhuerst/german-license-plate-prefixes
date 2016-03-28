#!/usr/bin/env node
'use strict'

const download = require('got')
const parser   = require('csv-parse')
const fs       = require('fs')



const source = 'https://raw.githubusercontent.com/DaHoC/kennzeichenAndroid/4b24d99c1b1477a6d7cc2ca4e4aa9a913fe9d921/res/raw/kfzliste'
const data = {}

download.stream(source)
.pipe(parser({delimiter: ';'}))
.on('data', (entry, _, cb) => {
	data[entry[0]] = entry[1]
})
.on('end', _ => {
	let file = fs.createWriteStream('./index.json')
	file.on('finish', _ => console.log('Done.'))
	file.end(JSON.stringify(data))
})
