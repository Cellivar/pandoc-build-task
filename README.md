# Pandoc build tasks

A simple wrapper to run files through [Pandoc](http://pandoc.org/index.html) during a build.

#### Target files
The files to convert from the input format to the output format. Accepts match patterns a la the Copy Files build 
task. Any matched files will be processed, and an output file of the appropriate file name generated in the same 
directory as the input file.

#### Input format
The format to attempt to parse the input files as.

#### Output format
The resulting file format to save the files as.

#### Standalone
Whether to generate the appropriate header and footer for the output file so that it may be standalone. You probably 
want this left on.

#### Command line options
Any additional command line switches to pass to the pandoc command.