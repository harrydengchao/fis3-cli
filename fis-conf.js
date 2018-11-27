// default settings. fis3 release
const eslintConfig = require('./eslint.config')

// eslint config
fis.match('*.js', eslintConfig);

// Global start
fis.match('::packager', {
  postpackager: fis.plugin('loader'),
  spriter: fis.plugin('csssprites-group')
});

// 支持相对路径
fis.hook('relative');
fis.match('**', {
  relative: true
});

fis.match('*.{css, scss}', {
  rExt: '.css',
  parser: fis.plugin('node-sass', {
    sourceMap: false
  }),
  postprocessor: fis.plugin('autoprefixer-latest', {
    browsers: ['last 3 versions', 'iOS >= 8', 'Android >= 4.1', 'ie >= 7']
  }),
  useSprite: true,
});

// fis.hook('commonjs', {
//   // 配置项
//   baseUrl: './src',
//   extList: ['.js', '.jsx', '.es', '.ts', '.tsx']
// });

// fis.unhook('components')
// fis.hook('node_modules')

fis.match('**.js', {
  rExt: 'js',
  preprocessor: [
    fis.plugin('js-require-file', {
      useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
    }),
    fis.plugin('js-require-css')
  ],
  parser: fis.plugin('babel-6.x', {
    "presets": [
      ["env", {"loose": true}],
      "stage-2"
    ],
  })
});

fis.match('../{node_modules}/**.js', {
  isMod: true,
  useSameNameRequire: true,
});

fis.match('../static/**.js', {
  parser: null,
  isMod: false
});

// 打包输出路径处理
fis.match('/templates/({*,**/*}.html)', {
  release: false,
});
fis.match('/views/({*,**/*}.html)', {
  release: '/$1'
});
fis.match('/images/({*,**/*}.{png,jpg,jpeg,gif,svg})', {
  release: '/static/image/$1',
});
fis.match('/scss/({**,**/*}.{scss, css})', {
  release: '/static/css/$1',
});
fis.match('/js/({**,**/*}.js)', {
  release: '/static/js/$1',
});
fis.match('/utils/({*,**/*}.js)', {
  release: '/static/utils/$1',
});
fis.match('/lib/**', {
  release: '/static/$0',
});
// Global end

// default media is `dev`
fis.media('develepment')
  .match('*', {
    useHash: false,
  });

// extends GLOBAL config
fis.media('production')
  .match('*.{css, scss}', {
    useHash: true,
    optimizer: fis.plugin('clean-css') // css 压缩
  })
  .match('*.js', {
    useHash: true,
    optimizer: fis.plugin('uglify-js') // js 压缩
  })
  .match('*.png', {
    optimizer: fis.plugin('png-compressor') // png 图片压缩
  })
  .match('::image', {
    useHash: true
  })
