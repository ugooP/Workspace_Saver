const { exec } = require('child_process');
const open = require('open')

async function run(path) {
    await open(`/${path}`)
    console.log('Done');
}

run('System/Applications/Utilities/Activity Monitor.app')