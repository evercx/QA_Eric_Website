/**
 * Created by EVERCX on 2017/12/16.
 */
const router = require('koa-router')();
const { exec,execSync } = require('child_process');
const config = require('config')
const fs = require('fs');




router.post('/api/v1/question', function (ctx, next) {

    let question = ctx.request.body.question || null;
    question = trimAll(question);

    if(!question){
        ctx.body = {
            "status":"failed",
            "answer":"输入不合法"
        };
        return;
    }

    if(question.length >= 30){
        ctx.body = {
            "status":"failed",
            "answer":"问句过长"
        };
        return;
    }

    const commandFilePath = config.get("commandFilePath");
    const fileName = guid()+".json";
    const command = "python " + commandFilePath + " " + question + " " + fileName;

    const e = execSync(command);
    var resultFilePath = config.get("homePath")+"/"+fileName;

    const resultStr = fs.readFileSync(resultFilePath);
    const result = JSON.parse(resultStr);
    console.log(result);
    fs.unlink(resultFilePath)
    ctx.body = result;
    //console.log(e);

    // exec(command, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`exec error: ${error}`);
    //         ctx.body = {
    //             "status":"failed",
    //             "answer":"服务器解析失败 请重试"
    //         };
    //         return;
    //     }
    //     //onsole.log(`stdout: ${stdout}`);
    //     var resultFilePath = config.get("homePath")+"/"+fileName;
    //     fs.readFile(resultFilePath,function(err,data){
    //         "use strict";
    //         if(err) {
    //             ctx.body = {
    //                 "status":"failed",
    //                 "answer":"服务器解析失败 请重试"
    //             };
    //             return ;
    //         }
    //         const result = JSON.parse(data);
    //         console.log(result);
    //         ctx.body = result;
    //
    //     });
    //     //fs.unlink(resultFilePath)
    //
    // });
    
});

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function trimAll(str){
    var string='';
    var arr = [];
    for(var i=0;i<str.length;i++){
        if(str.charCodeAt(i) == 32||str.charCodeAt(i) == 12288){
            continue;
        }else{
            arr.push(str[i]);
        }
    }
    return string = arr.join('');
}

module.exports = router;