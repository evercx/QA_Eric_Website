const router = require('koa-router')();
const fs = require('fs');
const path = require('path');

router.get('/', async (ctx, next) => {
  const filePath = path.resolve('./','public/home.html')
  const html = fs.readFileSync(filePath);
  ctx.type = "html"
  ctx.response.body = html

})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
