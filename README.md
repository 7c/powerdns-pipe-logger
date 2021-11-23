# powerdns-pipe-logger

This is powerdns pipe backend for logging all the incoming queries in json format. Default path for logging is `/var/tmp/powerdns-queries.log`, you may want to change path inside logger.js. This version is adding itself to pipe backend, this way multiple pipe backends can co-exist. Important to have logger.js +x bit set because powerdns is calling scripts directly, it does not know which programming language we use. This is why we have first line in the .js pointing to node, depending on OS you might need to change this line too

## Powerdns Setup
Make sure you have `pdns-backend-pipe` installed and create a logger.conf file inside /etc/powerdns/pdns.d, restart powerdns. For now i have implemented ABI version 1.
```
# /etc/powerdns/pdns.d/logger.conf
pipe-command=/opt/powerdns-pipe-logger/logger.js
pipe-abi-version=1
pipe-timeout=45000
launch+=pipe
```

## Powerdns Docs
https://docs.powerdns.com/authoritative/backends/pipe.html


## Example output
```
{"t":1637674073634,"tiso":"2021-11-23T13:27:53.634Z","type":"Q","qname":"www.domain1.net","qclass":"IN","qtype":"SOA","id":"-1","dns_ip":"0.0.0.0"}
{"t":1637674073636,"tiso":"2021-11-23T13:27:53.636Z","type":"Q","qname":"www.domain1.net","qclass":"IN","qtype":"NS","id":"36","dns_ip":"201.6.88.6"}
{"t":1637674073637,"tiso":"2021-11-23T13:27:53.637Z","type":"Q","qname":"www.domain1.net","qclass":"IN","qtype":"ANY","id":"36","dns_ip":"201.6.88.6"}
{"t":1637674084013,"tiso":"2021-11-23T13:28:04.013Z","type":"Q","qname":"wer.domain2.xyz","qclass":"IN","qtype":"SOA","id":"-1","dns_ip":"0.0.0.0"}
{"t":1637674084016,"tiso":"2021-11-23T13:28:04.016Z","type":"Q","qname":"wer.domain2.xyz","qclass":"IN","qtype":"NS","id":"39","dns_ip":"12.121.89.18"}
{"t":1637674084017,"tiso":"2021-11-23T13:28:04.017Z","type":"Q","qname":"wer.domain2.xyz","qclass":"IN","qtype":"ANY","id":"39","dns_ip":"12.121.89.18"}
{"t":1637674124518,"tiso":"2021-11-23T13:28:44.518Z","type":"Q","qname":"www.domain3.com","qclass":"IN","qtype":"SOA","id":"-1","dns_ip":"0.0.0.0"}
{"t":1637674124521,"tiso":"2021-11-23T13:28:44.521Z","type":"Q","qname":"www.domain3.com","qclass":"IN","qtype":"NS","id":"32","dns_ip":"61.220.8.162"}
{"t":1637674124522,"tiso":"2021-11-23T13:28:44.522Z","type":"Q","qname":"www.domain3.com","qclass":"IN","qtype":"ANY","id":"32","dns_ip":"61.220.8.162"}
{"t":1637674126919,"tiso":"2021-11-23T13:28:46.919Z","type":"Q","qname":"ns1.domain4.io","qclass":"IN","qtype":"ANY","id":"33","dns_ip":"103.16.205.168"}
{"t":1637674126921,"tiso":"2021-11-23T13:28:46.921Z","type":"Q","qname":"ns2.domain4.io","qclass":"IN","qtype":"ANY","id":"33","dns_ip":"103.16.205.168"}
{"t":1637674154635,"tiso":"2021-11-23T13:29:14.635Z","type":"Q","qname":"stt.domain5.com","qclass":"IN","qtype":"SOA","id":"-1","dns_ip":"0.0.0.0"}
```