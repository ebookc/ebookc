/***************************************************************************
Author   : Raül Pérez
Email    : repejota@gmail.com
Homepage : http://github.com/ebookc/ebookc
Source   : http://github.com/ebookc/ebookc
License  : Simplified BSD License
Version  : 1.0

Copyright 2011 Raül Pérez. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY JOEY MAZZARELLI 'AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
EVENT SHALL JOEY MAZZARELLI OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
***************************************************************************/

var fs = require('fs')
  , md = require("node-markdown").Markdown
  , mustache = require("mustache")
  , puts  = console.log

exports.version = '0.0.1';

exports.init = function() {
  var ebook = { 
    title     : 'Untitled ebook'
  , version   : '0.0.1' 
  , author    : {
      name  : 'Author Name'
    , email : 'author@email'
    , url   : 'author url'  
    }
  , chapters  : {
      cover : {
        file: './src/cover.md'
      , title: 'Cover'
      }
    }
  , theme     : 'default'
  }
  fs.open("ebook.json", "w+", function(err, fd) {
    fs.write(fd,JSON.stringify(ebook,'', 2), function (err, written, buf) {
      fs.closeSync(fd);
    }); 
  });
  fs.mkdirSync('src', 0766);
  fs.mkdirSync('build', 0766);
};

exports.compile = function() {
  var header = fs.readFileSync('./theme/header.tpl', 'utf-8')
    , footer = fs.readFileSync('./theme/footer.tpl', 'utf-8')
    , ebook = JSON.parse(fs.readFileSync('ebook.json', 'utf-8'));
  // Prepare
  fs.mkdirSync('build/html', 0776);
  // Build
  ebook.chapters.forEach(function(element, index, array) {
    var file_contents = fs.readFileSync(element.file, 'utf-8')
      , context = { title: ebook.title }
      , html = mustache.to_html(header+md(file_contents)+footer, context);
    fs.open("build/html/"+element.name+".html", "w+", function(err, fd) {
      fs.write(fd, html, function (err, written, buf) {
        fs.closeSync(fd);
      });
    });
  });
};

exports.usage = function() {
  var str = 'usage: ebookc [-v|--version]\n';
     str += '              [-h|--help]\n';
     str += '              <command> [<args>]\n';
     str += '\n';
     str += 'The most commonly used ebookc commands are:\n';
     str += '   init       Create an empty ebook\n';
     str += '   compile    Compiles ebook sources\n'
  puts(str);
};

exports.show_version = function() {
  puts('ebookc version '+exports.version);
};
