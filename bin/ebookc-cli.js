#!/usr/bin/env node
;(function () { // wrapper in case we're in module_context mode

var ebookc = require("../lib/ebookc")

process.title = "ebookc"
process.version = ebookc.version

// No commands & no args
if (process.argv.length===2) {
  ebookc.usage();
}

/**
 * Options
 */

// --version
if ((process.argv[2]==='-v') || process.argv[2]==='--version') {
  ebookc.show_version();
}

// --help
if ((process.argv[2]==='-h') || process.argv[2]==='--help') {
  ebookc.usage();
}

/**
 * Commands
 */

// init
if (process.argv[2]==='init') {
  ebookc.init();
}

// compile
if (process.argv[2]==='compile') {
  ebookc.compile();
}

})()
