import { child_process } from "../deps.js";

export function openPage(url) {
    const process = child_process.spawn("cmd", [ "/c", "start", url.href ]);
    
    return new Promise(resolve => {
        process.on("close", resolve);
    })
}