var request = require('superagent');

function makeRequest(requestEntity){
    if (typeof requestEntity !== 'object' || typeof requestEntity.end !== 'function'){
        return Promise.reject('Invalid argument: requestEntity must be a valid object');
    }

    return new Promise((resolve, reject) => {
        requestEntity.end((err, response) => {
            if (err){
                return reject(err, response);
            }

            resolve(response);
        })
    });
}

function getJenkins(){
    return makeRequest(request.get('http://localhost:8079/job/Cloud9_Current_Development_Phase/job/Generic_RPM/api/json'));
}

export default {
    getJenkins:getJenkins
};
