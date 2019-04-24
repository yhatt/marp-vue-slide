module.exports = {
  lintOnSave: false,
  pages: {
    index: 'src/main.js',
    presenter: 'src/presenter.js',
  },
  chainWebpack: config =>
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('markdown')
      .loader('raw-loader'),
}
