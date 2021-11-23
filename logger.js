#!/usr/bin/node
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let helo=false

// Enter logfile here
const logfile = path.join('/var/tmp/powerdns-queries.log')



function argv(test) {
    return (process.argv.includes(test))
}

function processInput(input,testing=true,testphase=0) {
    var reply = []
    var msg = false
    // HELO PHASE
    if (!helo) {
        if (input==="HELO\t1" || argv('--test')) {
            // kind of authentication from powerdns
            helo=true
            return {reply:["OK RESOLVER STARTED"],msg:'HELOOK'}
        }
        else  return {reply:["FAIL\n"],msg:'HELOFAILED'}
    }

    // parse the v1 pipe backend
    var data = input.trim().split(/\t/)
    if (data.length<6) {
        // does this case really happen ?
        return {reply:["FAIL\n"],msg:'INVALIDLENGTH'}
    }
    var type = data[0]
    var qname = data[1]
    var qclass = data[2]
    var qtype = data[3]
    var id = data[4]
    var dns_ip = data[5]

    // log
    let log_line = {
        t:Date.now(),
        tiso:new Date().toISOString(),
        type,qname,qclass,qtype,id,dns_ip
    }
    try {
        fs.appendFileSync(logfile,JSON.stringify(log_line)+"\n")
    }catch(_) {
        // lets ignore errors towards logfile, not to interrupe powerdns functionality
    }
    
    reply.push("END")
    return {reply,msg}
}

async function start() {
    try {
        rl.on('line', (input)=>{
            var resp =  processInput(input,false)
            if (resp && resp.hasOwnProperty('reply')) {
                for(var line of resp.reply)
                    console.log(line)
            } else {
                // trap, this should never happen
                console.log("END")
            }
        })
    } catch(err) {
        console.log(err)
    }
}

start()