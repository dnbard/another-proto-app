var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

console.log('Bootstraping application');
require('./app');

setTimeout(function(){
    console.log('Running tests');
    // Instantiate a Mocha instance.
    var mocha = new Mocha();

    var testDirs = [
        './test/',
        './test/api/'
    ];

    testDirs.forEach((testDir)=>{
        // Add each .js file to the mocha instance
        fs.readdirSync(testDir).filter(function (file) {
            // Only keep the .js files
            return file.substr(-7) === 'Spec.js';
        }).forEach(function (file) {
            mocha.addFile( path.join(testDir, file) );
        });
    });

    // Run the tests.
    mocha.run(function (failures) {
        //process.on('exit', function () {
            process.exit(failures); // exit with non-zero status if there were failures
        //});
    });
}, 2000);
