exports.init = () => {
    var fs = require('fs');
    var files = fs.readdirSync('./models');

    files.forEach(function(file){
        if (file !== 'index.js'){
            require(`./${file}`);
            console.log(`Database model: "${file.replace('.js', '')}" bootstraped`);
        }
    });
}
