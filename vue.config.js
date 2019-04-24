const { Marp } = require('@marp-team/marp-core')
const fs = require('fs')

// Base URL
let publicPath = process.env.URL || '/'
if (!publicPath.endsWith('/')) publicPath += '/'

// Parse title and description from Markdown
const marp = new Marp()

marp.customDirectives.global.title = title => ({ title })
marp.customDirectives.global.description = description => ({ description })
marp.render(fs.readFileSync(`${__dirname}/public/slide.md`).toString())

const title = marp.lastGlobalDirectives.title || 'Marp Vue Slide'
const description = marp.lastGlobalDirectives.description || 'Marp Vue Slide'

module.exports = {
  publicPath,
  lintOnSave: false,
  pages: {
    index: { entry: 'src/main.js', title, description },
    presenter: { entry: 'src/presenter.js', title },
  },
  chainWebpack: config =>
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('markdown')
      .loader('raw-loader'),
}
