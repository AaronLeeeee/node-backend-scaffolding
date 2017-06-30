'use strict'

import Koa from 'koa'
import promise from 'bluebird'
global.Promise = promise

const app = new Koa()
import routes from 'routes'
import { host } from './config'

app.use((ctx, next) => {
	return next().catch((err) => {
		console.log(err.stack)
		ctx.status = 500;
		ctx.body = '服务器繁忙'
	})
})
app.use(routes.routes(), routes.allowedMethods())
module.exports = app