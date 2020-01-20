'use strict'

const API_URL = 'https://api.github.com/users/'

const retrieveUserRepos = async (userName) => {
    if (typeof userName !== 'string' || userName.trim().length === 0) throw new ContentError(EMPTY_INPUT_ERROR_MESSAGE)

    return (async () => {
        const result = {}
        let response = await fetch(`${API_URL}${userName}`, { method: 'GET' })

        if (response.status === 404) throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE)
        
        if (response.status === 200) {
            const { name, login: username, bio, avatar_url: image } = await response.json()
            result.user = { name: name || 'no name', username, bio: bio || 'no bio', image }

            response = await fetch(`${API_URL}${userName}/repos`, { method: 'GET' })
            
            if (response.status === 404) throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE)
            
            if (response.status === 200) {
                const repos = await response.json()
                result.repos = repos
                return result
            }
        }
        throw new Error('Unexpected error')
    })()
}