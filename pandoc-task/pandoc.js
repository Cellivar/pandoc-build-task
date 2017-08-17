"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task = require("vsts-task-lib/task");
const path = require("path");
function getExtension(format) {
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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let sourceFolder = task.getPathInput('sourceFolder', true, true);
        let targets = task.getDelimitedInput('targetfiles', '\n', true);
        let inputFormat = task.getInput('inputFormat', true);
        let outputFormat = task.getInput('outputFormat', true);
        let standaloneFormat = task.getBoolInput('standalone', false);
        let commandLineArgs = task.getInput('commandLineOptions', false);
        sourceFolder = path.normalize(sourceFolder);
        let allPaths = task.find(sourceFolder);
        let matchedPaths = task.match(allPaths, targets, sourceFolder);
        let matchedFiles = matchedPaths.filter((itemPath) => !task.stats(itemPath).isDirectory());
        console.log("Found " + matchedFiles.length + " files to convert");
        try {
            matchedFiles.forEach((file) => {
                var newfile = path.basename(file, path.extname(file)) + getExtension;
                var outputFile = path.dirname(file) + '/' + newfile;
                let pandoc = task.tool(task.which('pandoc', true))
                    .arg('--from=' + inputFormat)
                    .arg('--to=' + outputFormat)
                    .line(commandLineArgs)
                    .argIf(standaloneFormat, '--standalone')
                    .arg(file)
                    .arg('--output=' + outputFile);
                console.log("Converting " + file + " to " + newfile);
                pandoc.exec();
            });
        }
        catch (err) {
            task.setResult(task.TaskResult.Failed, err.message);
        }
    });
}
run();
//# sourceMappingURL=pandoc.js.map