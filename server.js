
const express = require('express')
const next = require('next')
const scrapeIt  = require('scrape-it')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const Strapi = require('strapi-sdk-javascript').default;
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

app.prepare()
	.then(() => {
		const server = express()

		server.get('/estimate/:id', (req, res) => {
      
      const prices = {};
      strapi.getEntry('properties', req.params.id).then(entry => {
        const xome = scrapeIt(entry.xome_url, {
          price: ".xome-value-estimate"
        }).then(({ data, response }) => {
          return data.price.match(/\d+/g).join('');
        });
        const homes = scrapeIt(entry.homes_url, {
          price: ".home-estimate > .price"
        }).then(({ data, response }) => {
          return data.price.match(/\d+/g).join('');
        });
        const homefacts = scrapeIt(entry.homefacts_url, {
          price: "#forsale-listing-price"
        }).then(({ data, response }) => {
          return data.price.match(/\d+/g).join('');
        })
        Promise.all([xome, homes, homefacts]).then(([xome, homes, homefacts]) => {
          res.json([xome, homes, homefacts]);
        });
      });
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