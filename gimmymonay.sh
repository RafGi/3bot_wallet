#!/bin/bash
for (( c=1; c<=25; c++ ))
do  
    curl 'https://faucet.testnet.threefoldtoken.com/request/tokens' -H 'authority: faucet.testnet.threefoldtoken.com' -H 'pragma: no-cache' -H 'cache-control: no-cache' -H 'origin: https://faucet.testnet.threefoldtoken.com' -H 'upgrade-insecure-requests: 1' -H 'content-type: application/x-www-form-urlencoded' -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'referer: https://faucet.testnet.threefoldtoken.com/' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.9,nl;q=0.8' --data 'uh=0138405edd00412cf49d9622f5fa73d2b88436c839e34188f3363de6f6847ad5d9fbef82bb6607' --compressed	   
done