'use strict'

async function retrieveUserRepos(userName) {
    const API_URL = 'https://api.github.com/users/'
    if (typeof userName !== 'string' || userName.trim().length === 0) throw new TypeError('input is empty or blank')
    
    return (async()=>{
        const result = {}
        const userExists = await call(`${API_URL}${userName}`,{ method: 'GET' })

        if (userExists.status === 404) throw new Error('Not found')

        if (userExists.status === 200){
            const user= JSON.parse(userExists.body)
            result.user = {name: user.name, username: user.login, bio: user.bio || 'no info', image: user.avatar_url}

            const userRepos = await call(`${API_URL}${userName}/repos`,{ method: 'GET' })
    
            if (userRepos.status === 200) result.repos = JSON.parse(userRepos.body)
            if (userRepos.status === 404) throw new Error('Not found')
            
            return result
        }

    })()
}

