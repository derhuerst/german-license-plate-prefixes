#!/usr/bin/env node
'use strict'

const parser = require('csv-parser')
const http = require('http')
const https = require('https')
const fs = require('fs')
const unzipper = require('unzipper')

const source = 'https://daten.gdz.bkg.bund.de/produkte/sonstige/kfz250/aktuell/kfz250.gk3.csv.zip';
const csvSource = './kfz250_2018-09.gk3.csv/kfz250/KFZ250.csv'
const data = {}

https.get(source, function(response) {
	response.pipe(unzipper.Extract({ path: '.' }))
	response.on('end', () => {
		try {
			fs.createReadStream(csvSource)
			.pipe(parser({"separator": ";"}))
			.on('data', (entry) => {
				entry.KFZ.split(/\s+/).forEach(function(char) {
					data[char] = entry.NAME
				})
			})
			.on('end', _ => {
				let file = fs.createWriteStream('./index.json')
				file.on('finish', _ => console.log('Done.'))
				file.end(JSON.stringify(data))
			})
		} catch (e) {
		console.error(e.message)
		}
	});
});
