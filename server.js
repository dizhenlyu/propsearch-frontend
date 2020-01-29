
const express = require('express')
const next = require('next')
const scrapeIt  = require('scrape-it')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
	.then(() => {
		const server = express()

		server.get('/test', (req, res) => {
			// const actualPage = '/restaurants'
			// const queryParams = { id: req.params.id }
			// console.dir("req.params.id = " + JSON.stringify(req.params.id))
      // app.render(req, res, actualPage, queryParams)
      scrapeIt('https://www.homes.com/property/19540-pulling-st-south-bend-in-46614/id-600034304784/', {
        price: ".home-estimate > .price"
    }).then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`)
        console.log(data)
    })
      return handle(req, res)
		})

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(3000, (err) => {
			if (err) throw err
			console.log('> Ready on http://localhost:3000')
		})
	})
	.catch((ex) => {
		console.error(ex.stack)
		process.exit(1)
	})