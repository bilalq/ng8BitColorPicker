/* jshint node: true */

/**
 * Gulp plugins
 */
var gulp = require('gulp')
  , bower = require('gulp-bower')
  , jshint = require('gulp-jshint')

/*
 * Utitlity modules
 */
var karma = require('karma').server
  , stylish = require('jshint-stylish')
  , _ = require('lodash')

/**
 * Path declarations
 */
var paths = {
  dependencies: [
    'bower_components/angular/angular.js',
    'bower_components/eight-bit-color-picker/lib/eight-bit-color-picker.js',
    'bower_components/angular-mocks/angular-mocks.js'
  ],
  scripts: ['lib/**/*.js'],
  tests: ['test/**/*.spec.coffee']
}
paths.all = paths.dependencies.concat(paths.scripts, paths.tests)

/**
 * Configuration in common between all karma runs
 */
var karmaCommonConf = {
  files: paths.all,
  frameworks: ['jasmine'],
  browsers: ['Firefox'],
  preprocessors: {
    '**/*.coffee': 'coffee',
    'lib/**/*.js': 'coverage'
  },
  reporters: ['progress', 'coverage', 'growl'],
  coverageReporter: {
    reporters: [
      { type: 'lcov', dir: 'coverage/' },
      { type: 'text-summary' }
    ]
  }
}

/**
 * Task to retrieve dependencies from bower
 */
gulp.task('bower', bower)

/**
 * Task to lint code
 */
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
})

/**
 * Task to execute tests a single time
 */
gulp.task('test', ['bower', 'lint'], function(done) {
  var testConf = _.assign({}, karmaCommonConf, { singleRun: true })
  karma.start(testConf, done)
})

/**
 * Task that continuously runs tests
 */
gulp.task('tdd', ['bower', 'lint'], function(done) {
  karma.start(karmaCommonConf, done)
})

/**
 * Set default task to run tests
 */
gulp.task('default', ['test'])
