const si = require('systeminformation')
let appList = []

async function apps() {
    try {
        const data = await si.processes();
        for (let i = 0; i < data.list.length; i++) {
            let app = data.list[i]
            let appName
            let regexp1 = new RegExp(`${appName}\.app\/Contents\/MacOS$`)
            let regexp2 = new RegExp('Helper')
            let regexp3 = new RegExp('^(\/Applications\/|\/System\/Applications)')
            
            if (/* regexp1.test(app.path) &&  */!regexp2.test(app.name) && regexp3.test(app.path)) {
                let obj = {
                    "name": app.name,
                    //"path": app.path
                }
                appList.push(obj)
            }
        }
        console.log(appList);
    } catch (e) {
      console.log(e)
    }
  }
apps()



