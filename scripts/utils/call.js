'use strict'

function call(url, { method = 'GET', headers, body } = {}) {
    return new Promise((resolve, reject) => {
        try {
            const xhr = new XMLHttpRequest

            xhr.open(method, url)

            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status === 0) {

                        reject(new Error(`fail to call ${url}`))
                    } else {
                        const response = {
                            status: this.status,
                            body: this.responseText
                        }

                        resolve(response)
                    }
                }
            }

            if (headers)
                for (let key in headers)
                    xhr.setRequestHeader(key, headers[key])

            body ? xhr.send(body) : xhr.send()
        } catch (error) {
            reject(error)
        }
    })
}