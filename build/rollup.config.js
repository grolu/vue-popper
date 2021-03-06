import fs from 'fs';
import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    file: process.env.NODE_ENV === 'production' ? 'dist/js/vue-popper.min.js' : 'dist/js/vue-popper.js',
    format: 'umd',
    name: 'VuePopper',
  },
  plugins: [
    vue({
      css (style, styles, compiler) {
        fs.writeFileSync('dist/css/vue-popper.css', style)
      }
    }),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      externalHelpers: false,
      exclude: 'node_modules/**',
      presets: [['es2015', {'modules': false}]],
      plugins: [
        'transform-object-assign',
        'external-helpers'
      ]
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
};
