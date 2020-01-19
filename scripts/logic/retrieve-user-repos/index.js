'use strict'

async function retrieveUserRepos(userName) {
    const API_URL = 'https://api.github.com/users/'
    const NOT_FOUND_ERROR_MESSAGE = 'Not found'
    const EMPTY_INPUT_ERROR_MESSAGE = 'input is empty or blank'
    const UNKNOWN_ERROR_MESSAGE = 'Sorry, try again later'


    if (typeof userName !== 'string' || userName.trim().length === 0) throw new TypeError(EMPTY_INPUT_ERROR_MESSAGE)
    
    return (async()=>{

        try{
        const result = {}
        const userExists = await call(`${API_URL}${userName}`,{ method: 'GET' })

        if (userExists.status === 404) throw new Error(NOT_FOUND_ERROR_MESSAGE)

        if (userExists.status === 200){
            const user= JSON.parse(userExists.body)
            result.user = {name: user.name, username: user.login, bio: user.bio || 'no info', image: user.avatar_url}

            const userRepos = await call(`${API_URL}${userName}/repos`,{ method: 'GET' })
    
            if (userRepos.status === 200) result.repos = JSON.parse(userRepos.body)
            if (userRepos.status === 404) throw new Error(NOT_FOUND_ERROR_MESSAGE)
            
            return result
        }
    } catch({message}){
        if(message === NOT_FOUND_ERROR_MESSAGE)
            throw new Error(NOT_FOUND_ERROR_MESSAGE)
        throw new Error(UNKNOWN_ERROR_MESSAGE)
        
    }

    })()
}

