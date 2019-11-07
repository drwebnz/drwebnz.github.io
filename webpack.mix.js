const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
  devtool: 'source-map'
})

mix.options({
  processCssUrls: false,
  postCss: [
    require('postcss-discard-comments')({removeAll: true})
  ]
})

mix.sass('resources/sass/custom.scss', 'css')
mix.styles([
  'css/bootstrap.min.css',
  'css/swiper.min.css',
  'css/animate.css',
  'css/magnific-popup.css',
  'css/slicknav.css',
  'css/custom.css',
], 'public/css/app.css')

mix.js('resources/js/custom.js', 'js')
mix.scripts([
  'js/jquery-1.12.4.min.js',
  'js/bootstrap.min.js',
  'js/validator.min.js',
  'js/wow.js',
  'js/swiper.min.js',
  'js/waypoints.min.js',
  'js/jquery.counterup.min.js',
  'js/isotope.min.js',
  'js/jquery.magnific-popup.min.js',
  'js/jquery.slicknav.js',
  'js/SmoothScroll.js',
  'js/tilt.jquery.min.js',
  'js/function.js',
  'js/custom.js',
], 'public/js/app.js')
