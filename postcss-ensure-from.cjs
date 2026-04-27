const path = require('node:path')

const fallbackFrom = path.join(__dirname, 'app', 'globals.css')

const plugin = () => ({
  postcssPlugin: 'ensure-from',
  Once(_root, { result }) {
    if (!result.opts.from) {
      result.opts.from = fallbackFrom
    }
  },
})

plugin.postcss = true

module.exports = plugin
