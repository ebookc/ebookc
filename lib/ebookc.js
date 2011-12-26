/***************************************************************************
Ebookc - An ebook compiler

Author   : Raül Pérez
Email    : repejota@gmail.com
Homepage : http://github.com/ebookc/ebookc
Source   : http://github.com/ebookc/ebookc
License  : The GNU Affero General Public License 
Version  : 0.0.1

Copyright 2011 Raül Pérez.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
***************************************************************************/

var fs         = require('fs')
  , path       = require('path')
  , markdown   = require('markdown').markdown
  , mustache   = require('mustache')
  , ncp        = require('ncp').ncp  
  , skel       = require('./skel')
  , utils      = require('./utils')
  , puts       = console.log;

/**
 * Version number
 */
exports.version = '0.0.1';

/**
 * Initialize ebook project
 */
exports.init = function() {
  
  // check if there is no previous project
  if (path.existsSync('ebook.json') || 
      path.existsSync('src') || 
      path.existsSync('build') ||
      path.existsSync('theme')) {
    puts("ERROR!: directory is not empty.");
    process.exit(1);
  }
  
  // create project
  utils.write_file("ebook.json", JSON.stringify(skel.ebook_conf,'', 2));
  fs.mkdirSync('src', 0766);
  fs.mkdirSync('build', 0766);
  
  // create theme
  utils.mkdirp('theme/default', 0766, function(err) {
    if (err) { puts("ERROR!: " + err.message); process.exit(1); }
    utils.write_file("theme/default/header.tpl", skel.theme_header);
    utils.write_file("theme/default/footer.tpl", skel.theme_footer);
  });
  
};

/**
 * Compiles project
 */
exports.compile = function() {
  // get theme
  var ebook = JSON.parse(fs.readFileSync('ebook.json', 'utf-8'))
    , header = fs.readFileSync('theme/' + ebook.theme + '/header.tpl', 'utf-8')
    , footer = fs.readFileSync('theme/' + ebook.theme + '/footer.tpl', 'utf-8');
  // prepare
  fs.mkdirSync('build/html', 0776);
  ncp('theme/' + ebook.theme, 'build/html/', function(err) {
    // compile
    ebook.chapters.forEach(function(chapter, index, array) {
      var file_contents = fs.readFileSync(chapter.file, 'utf-8')
        , context = { title: ebook.title
          , page_title: chapter.title
          , meta_keywords: ebook.meta_keywords || ''
          , meta_description: ebook.meta_description || '' 
        }
        , html = mustache.to_html(header+markdown.toHTML(file_contents)+footer, context);
      puts('Compiling chapter : ' + chapter.file + ' ...');
      utils.write_file("build/html/"+chapter.name+".html", html);
    });
  });
};

/**
 * Shows usage message
 */
exports.usage = function() {
  var str = 'usage: ebookc [-v|--version]\n';
     str += '              [-h|--help]\n';
     str += '              <command> [<args>]\n';
     str += '\n';
     str += 'The most commonly used ebookc commands are:\n';
     str += '   init       Create an empty ebook\n';
     str += '   compile    Compiles ebook sources\n';
  puts(str);
};

/**
 * Shows version number
 */
exports.show_version = function() {
  puts('ebookc version '+exports.version);
};
