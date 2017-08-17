import task = require('vsts-task-lib/task');
import toolrunner = require('vsts-task-lib/toolrunner');

function runPandoc(tool: toolrunner.ToolRunner, filePath: string, pandocArgs: string) {
	var toolPath = task.which('pandoc');
	var atool:toolrunner.ToolRunner = task.tool(toolPath).arg(
}

async function run() {
	try {
		console.log(process.env["INPUT_SAMPLESTRING"]);
		let tool: toolrunner.ToolRunner;
		if (process.platform == 'win32') {
			let cmdPath = task.which('cmd');
			tool = task.tool(cmdPath).arg('/c').arg('echo ' + task.getInput('samplestring', true));
		}
		else {
			let echoPath = task.which('echo');
			tool = task.tool(echoPath).arg(task.getInput('samplestring', true));
		}

		let rc1: number = await tool.exec();

		// call some module which does external work
		if (rc1 == 0) {
			mod.sayHello();
		}

		console.log('Task done! ' + rc1);
	}
	catch (err) {
		task.setResult(task.TaskResult.Failed, err.message);
	}
}

run();