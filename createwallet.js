var https = require('https');

const fs = require('fs');

jsonObject = JSON.stringify({
    "PrivateKey": "",
    "PublicKey": "",
    "CryptoAsset": "Comine",
    "Identifier": ""
});

var postheaders = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
};

var optionspost = {
    host: 'www.cominecoin.com',
    path: '/api/cryptoasset10',
    method: 'POST',
    headers: postheaders
};

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');

// do the POST call
var reqPost = https.request(optionspost, function (res) {
    console.log("statusCode: ", res.statusCode);

    res.on('data', function (d) {
        console.info('POST result:\n');

        process.stdout.write(d);
        //add wallet file  //d.PublicKey + '\n' + d.PrivateKey
        fs.writeFile("wallet.dat", d , function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Wallet file was created!");
        }); 
        console.info('\n\nPOST completed');
    });
});

// write the json data
reqPost.write(jsonObject);
reqPost.end();

reqPost.on('error', function (e) {
    console.error(e);
});