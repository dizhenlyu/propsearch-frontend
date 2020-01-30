
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
    //   scrapeIt('https://www.homes.com/property/19540-pulling-st-south-bend-in-46614/id-600034304784/', {
    //     price: ".home-estimate > .price"
    // }).then(({ data, response }) => {
    //     console.log(`Status Code: ${response.statusCode}`)
    //     console.log(data)
    //     res.json(data);
    // })
    scrapeIt('https://www.homefacts.com/address/Indiana/St.-Joseph-County/South-Bend/46614/19540-Pulling-St/212333813.html', {
      price: "#forsale-listing-price"
    }).then(({ data, response }) => {
      console.log(response)
        console.log(response.statusCode)
        console.log(data)
        res.json(data);
    })
		})

		server.get('/property/:id', (req, res) => {
      const actualPage = '/property'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
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