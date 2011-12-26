Installation
============

*ebookc* is developed under node.js javascript framework so its source code is
100% javascript. It is presented as a CLI utility that follows subcommand 
pattern.

node.js and javascript provides a full speed powerful execution and a paradigm 
of event-based asynchronous development that no other traditional platforms 
have.

In addition *ebookc* development is based on decoupled components so its easy 
to extend or replace new features by the user.

Requirements
------------

You will only need node.js to proper install *ebookc*. 

Look at node.js [homepage](http://nodejs.org/) and 
its [installation process](http://nodejs.org/#download) to get a proper 
environment.

Also you will need npm package manager to install *ebookc*. It will provides
the most easy installation, and will take care of all dependencies needed.
In adition using npm you also will be able to upgrade *ebookc* any time you 
want to ensure you have the latest version available.
 
Look again at its [homepage](http://npmjs.org/) to install this tool on your 
system.

Installation using npm
----------------------

To install *ebookc* on your system execute this command:

    npm install ebookc
  
Its fine to install *ebookc* from your current user. No special permisions or
privileges are needed to complete the installation.

Upgrading using npm
-------------------

To upgrade a previously *ebookc* installation execute this command:

    npm update ebookc
    
Development
-----------

All the development process of *ebookc* happens on its Github project site at 
[https://github.com/ebookc/ebookc](https://github.com/ebookc/ebookc). 

Check all the [issues](https://github.com/ebookc/ebookc/downloads) already 
opened or go directly to the [downloads](https://github.com/ebookc/ebookc/downloads) 
section to grab the latest version available.

In adition, some developer information are available on its 
[wiki pages](https://github.com/ebookc/ebookc/wiki) if you are interested to 
contribute to the project.

Installation from source code
-----------------------------

Grab the latest version from our 
[downloads](https://github.com/ebookc/ebookc/downloads) section and execute:

    tar xvzmf ebookc.latest.tar.gz
    cd ebookc
    npm link

If you prefer to grab the latest code from our git repository:

    git clone https://github.com/ebookc/ebookc.git
    cd ebookc
    npm link

And every time you wan't to upgrade do:

    cd ebookc
    git pull
    npm link

Check your installation
-----------------------

Once your choosen installation is finished, execute this command to ensure
*ebookc* is installed and available to use:

    ebookc --version

You will get an output like this:

    ebookc version 0.0.1
    
If you don't get this result, start again from the beggining and follow 
carefully every step.
 

