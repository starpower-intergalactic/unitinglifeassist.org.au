##################
BUILD INSTRUCTIONS
##################

This template group uses GULP for all build tasks.
Run 'npm install' to install all necessary modules (you should also have GULP installed globally 'npm install -g gulp').
......

JS & CSS
--------

Running the default Gulp task will compile the SCSS into one file and also concatenate & minify all JavaScript files but for the "Options Selector" (aka "Wizard").


OPTIONS SELECTOR/WIZARD mini app
--------------------------------

The Wizard is a mini app based on Marionette/Backbone and RequireJS. The build task is NOT part of the default task.
Please first run 'gulp wizardjs' and when that is finished 'gulp wizardjs-optimize'.
The first task will do the default RequireJS optimization, the second will strip all logs and rename it to the final file.


##################
TEMPLATE STRUCTURE
##################

All page/nav/widget/util templates can be found in the 'publisher_templates' folder.
As the edit mode doesn't use the classical WYSIWYG style but is form based, EDIT & PUBLISH MODE have been split up into separate INC files that can be found in the 'edit_mode' and 'publish_mode' subfolders.
Example:
	"article" template
	/publisher_templates/
		article.page
		/edit_mode/
			article.inc
		/publish_mode/
			article.inc
