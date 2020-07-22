import {ex} from './possible-string-wasm-loader.js';
import {PossibleString} from './possible-string.js';

(async function runner(){
    const exports = (await ex()).instance.exports;
    console.log(exports);
    
    const jsprogTimer = document.getElementById('js-prog-time');
    const jsprogResult = document.getElementById('js-prog-result');

    const wasmprogTimer = document.getElementById('wasm-prog-time');
    const wasmprogResult = document.getElementById('wasm-prog-result');


    const countFromJS = () => {
        var start = +new Date();
        var temp = new PossibleString('1111111111111111111111111111111111111');
        
        var res = temp.countSTRs();

        var end = +new Date();

        jsprogTimer.innerHTML = end-start;
        jsprogResult.innerHTML = res.toString();
        start = end = res = temp = null;

    }

    const countFromWasm = () => {
        let main = exports.main;


        var start = +new Date();

        var res = main();

        var end = +new Date();

        wasmprogTimer.innerHTML = end-start;
        wasmprogResult.innerHTML = res.toString();
        start = end = res  = null;

    }

    let jsRunBtn = document.getElementById('run-js-prime');
    jsRunBtn.onclick  = countFromJS;

    let wasmRunBtn = document.getElementById('run-wasm-prime');
    wasmRunBtn.onclick  = countFromWasm;
    
})()

