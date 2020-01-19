'use strict'


call = async (query) => {
    fetch(query).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    })
}

call('https://api.github.com/users/martin-garcia-blanco/repos')

/******** Right version  *****************/
call = async (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then(function (response) {
            if (response.ok) {
                resolve(response.json())
            } else {
                reject(response)
            }
        }).catch(function (err) {
            reject(err)
        })
    })
}

await call('https://api.github.com/users/martin-garcia-blanco/repos')
/***********************/


call = async (url) => {
    return (async ()=> {
        try {
            const response = await fetch(url)
            console.log(response.json())
        } catch(err){
            console.log(err)
        }
    })(url)
}

await call('https://api.github.com/users/martin-garcia-blanco/repos')