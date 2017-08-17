"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("vsts-task-lib/task");
const mod = require("./taskmod");
async function run() {
    try {
        console.log(process.env["INPUT_SAMPLESTRING"]);
        let tool;
        if (process.platform == 'win32') {
            let cmdPath = tl.which('cmd');
            tool = tl.tool(cmdPath).arg('/c').arg('echo ' + tl.getInput('samplestring', true));
        }
        else {
            let echoPath = tl.which('echo');
            tool = tl.tool(echoPath).arg(tl.getInput('samplestring', true));
        }
        let rc1 = await tool.exec();
        if (rc1 == 0) {
            mod.sayHello();
        }
        console.log('Task done! ' + rc1);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}
run();
//# sourceMappingURL=index.js.map