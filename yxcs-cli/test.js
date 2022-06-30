
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
console.log(isMainThread)