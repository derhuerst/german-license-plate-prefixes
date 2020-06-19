#!/usr/bin/env node
'use strict'

const {basename, join: pJoin} = require('path')
const {Transform, Writable} = require('stream')
const pump = require('pump')
const unzipper = require('unzipper')
const csvParser = require('csv-parser')
const fs = require('fs')
const https = require('https')

const source = 'https://daten.gdz.bkg.bund.de/produkte/sonstige/kfz250/aktuell/kfz250.gk3.csv.zip';
const dest = pJoin(__dirname, 'index.json')

const parseAndWriteCsv = (file, cb) => {
	const data = {}
	const parser = new Transform({
		objectMode: true,
		write: (entry, _, cb) => {
			entry.KFZ.split(/\s+/).forEach(function(char) {
				data[char] = entry.NAME
			})
			cb()
		},
		final: (cb) => {
			parser.push(JSON.stringify(data) + '\n')
			cb()
		},
	})

	pump(
		file,
		csvParser({separator: ';'}),
		parser,
		fs.createWriteStream(dest),
		(err) => {
			cb(err || null)
		},
	)
}

const onError = (err) => {
	if (!err) return;
	console.error(err)
	process.exit(1)
}

https.get(source, (res) => {
	if (res.statusCode < 200 || res.statusCode >= 300) {
		const err = new Error('invalid HTTP status code')
		err.res = res
		return onError(err)
	}
	if (res.headers['content-type'] !== 'application/zip') {
		const err = new Error('invalid HTTP content-type')
		err.res = res
		return onError(err)
	}

	const unzip = unzipper.Parse()
	// todo [breaking]: use async iteration
	unzip.on('entry', (file) => {
		if (
			file.type === 'File' &&
			basename(file.path) === 'KFZ250.csv'
		) parseAndWriteCsv(file, onError)
		else file.autodrain() // discard data
	})

	pump(res, unzip, onError)
})
