#!/usr/bin/env node
'use strict'

const download = require('got')
const parser   = require('csv-parse')
const fs       = require('fs')



const source = 'http://berlin.de/daten/liste-der-kfz-kennzeichen/kfz-kennz-d.csv'
const data = {}

download.stream(source)
.pipe(parser({columns: () => ['id', 'name', '_']}))
.on('data', (entry) => {data[entry.id] = entry.name})
.on('end', _ => {
	let file = fs.createWriteStream('./index.json')
	file.on('finish', _ => console.log('Done.'))
	file.end(JSON.stringify(data))
})
