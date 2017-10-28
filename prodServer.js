const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, '/build')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(3000, (err) => {
	if (err) {
		console.log(err) //eslint-disable-line
	}
	console.info('Listening on port %s.', 3000) //eslint-disable-line
})
