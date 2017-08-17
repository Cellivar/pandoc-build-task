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



Pandoc Build Step  
Copyright (C) 2017 Cliff Chapman

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.