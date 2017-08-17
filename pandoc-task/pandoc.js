"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task = require("vsts-task-lib/task");
function runPandoc(tool, filePath, pandocArgs) {
    var toolPath = task.which('pandoc');
    var atool = task.tool(toolPath).arg();
}
async function run() {
    try {
        console.log(process.env["INPUT_SAMPLESTRING"]);
        let tool;
        if (process.platform == 'win32') {
            let cmdPath = task.which('cmd');
            tool = task.tool(cmdPath).arg('/c').arg('echo ' + task.getInput('samplestring', true));
        }
        else {
            let echoPath = task.which('echo');
            tool = task.tool(echoPath).arg(task.getInput('samplestring', true));
        }
        let rc1 = await tool.exec();
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
//# sourceMappingURL=pandoc.js.map