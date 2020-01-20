'use strict'

function call(url, { method = 'GET', headers, body } = {}) {

    return new Promise(async (resolve, reject) => {
        fetch(url, {method, headers, body})
            .then((response) => {
                if (!response.ok) resolve({ status: response.status })
                resolve(response.json())
            })
            .catch((err) => reject(err))
    })
}