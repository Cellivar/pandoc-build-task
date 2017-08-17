import task = require('vsts-task-lib/task');
import toolrunner = require('vsts-task-lib/toolrunner');
import path = require('path');

function getExtension(format: string) {
	switch (format) {
		case "markdown":
		case "markdown_strict":
		case "markdown_phpextra":
		case "markdown_github":
		case "markdown_mmd":
		case "commonmark":
			return ".md";
		case "textile":
			return ".textile";
		case "rst":
			return ".rst";
		case "html":
			return ".html";
		case "docbook":
			return ".db";
		case "docx":
			return ".docx";
		case "odt":
			return ".odt";
		case "epub":
			return ".epub";
		case "opml":
			return "opml";
		case "org":
			return ".org";
		case "man":
			return ".1";
		case "mediawiki":
			return ".wiki";
		case "latex":
			return ".tex";
		default:
			return ".txt";
	}
}

async function run() {
	let sourceFolder = task.getPathInput('sourceFolder', true, true);
	let targets = task.getDelimitedInput('targetfiles', '\n', true);
	let inputFormat = task.getInput('inputFormat', true);
	let outputFormat = task.getInput('outputFormat', true);
	let standaloneFormat = task.getBoolInput('standalone', false);
	let commandLineArgs = task.getInput('commandLineOptions', false);

	// normalize the source folder path. this is important for later in order to accurately
	// determine the relative path of each found file (substring using sourceFolder.length).
	sourceFolder = path.normalize(sourceFolder);

	let allPaths: string[] = task.find(sourceFolder); // Default find options including symlinks
	let matchedPaths: string[] = task.match(allPaths, targets, sourceFolder); // Default match options, matching the target patterns
	let matchedFiles: string[] = matchedPaths.filter((itemPath: string) => !task.stats(itemPath).isDirectory()); // Filter out directories

	console.log("Found " + matchedFiles.length + " files to convert");

	try {
		matchedFiles.forEach((file: string) => {
			// Get the file without the extension
			var newfile = path.basename(file, path.extname(file)) + getExtension;
			var outputFile = path.dirname(file) + '/' + newfile;


			let pandoc = task.tool(task.which('pandoc', true))
				.arg('--from=' + inputFormat) // Input format
				.arg('--to=' + outputFormat) // Output format
				.line(commandLineArgs) // Additional arguments
				.argIf(standaloneFormat, '--standalone')
				.arg(file) // Input file
				.arg('--output=' + outputFile);

			console.log("Converting " + file + " to " + newfile);

			pandoc.exec();
		});
	}
	catch (err) {
		task.setResult(task.TaskResult.Failed, err.message);
	}
}

run();