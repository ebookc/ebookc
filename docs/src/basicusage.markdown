Basic Usage
===========

*ebookc* is basically a CLI tool that follows the command-subcommand pattern to
perfom its work.

That means that *ebookc* tool acts as a command line proxy to the diferent 
subcommands which implements every feature this program provides. 

In adition, every subcommand will have optional options in the form of arguments 
to allow the modification of subcommand behaviour.

To start just execute this:

    ebookc

You'll get this output:

    usage: ebookc [-v|--version]
                  [-h|--help]
                  <command> [<args>]

    The most commonly used ebookc commands are:
       init       Create an empty ebook
       compile    Compiles ebook sources

*ebookc* command line tool can have global options that affects to the entire 
execution.

Project creation
----------------

To create a new book first create a directory for your project and inside it 
execute:

    mkdir sambplebook
    ebookc init

*ebookc* will create a sample structure and configuration file like this:

    drwxrwxr-x  5 raul raul  4096 2011-12-26 04:05 .
    drwx------ 86 raul raul 20480 2011-12-26 01:50 ..
    drwxrw-r--  2 raul raul  4096 2011-12-26 04:05 build
    -rw-rw-r--  1 raul raul   170 2011-12-26 04:05 ebook.json
    drwxrw-r--  2 raul raul  4096 2011-12-26 04:05 src
    drwxrw-r--  3 raul raul  4096 2011-12-26 04:05 theme

Where *src* is for source files like chapters or images of the book, *build* is 
where the built result will be created and *ebook.json* is the project 
configuration options.

Finally *theme* contents are the themes used to skin the result book.

Project configuration
---------------------

Once you created a project, you should to configure your created project and 
add some pages before build.

### General configuration

Simply edit *ebook.json* file and replace the values as you want:

    {
      "title": "Untitled ebook",
      "version": "0.0.1",
      "author": {
        "name": "Author Name",
        "email": "author@email",
        "url": "author url"
      },
      "theme": "default",
      "chapters": []
    }

### Adding chapters

Adding chapters is easy. Just append them to *chapters* array.

Every chapter is like this:

    {
      "name"    : "chatper1",
      "file"    : "./src/chapter1.markdown",
      "title"   : "Chapter 1 Title"
    }

For example adding 3 chapters will be like that:

    {
      "name"    : "chatper1",
      "file"    : "./src/chapter1.markdown",
      "title"   : "Chapter 1 Title"
    },
    {
      "name"    : "chatper2",
      "file"    : "./src/chapter2.markdown",
      "title"   : "Chapter 2 Title"
    },
    {
      "name"    : "chatper3",
      "file"    : "./src/chapter3.markdown",
      "title"   : "Chapter 3 Title"
    }



Project compilation
-------------------

After you add pages to your book and compose them, you are ready to compile the book. Execute:

    ebookc compile

And you will get this output:

    Compiling chapter : ./src/chapter1.markdown ...
    Compiling chapter : ./src/chapter2.markdown ...
    Compiling chapter : ./src/chapter3.markdown ...

The resulting compiled book will be at *build* folder.
