'use strict'

const API_URL = 'https://api.github.com/users/'

async function retrieveUserRepos(userName) {
    if (typeof userName !== 'string' || userName.trim().length === 0) throw new ContentError(EMPTY_INPUT_ERROR_MESSAGE)

    return (async () => {
            const result = {}
            const user = await call(`${API_URL}${userName}`, { method: 'GET' })
            if (user.status && user.status === 404) throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE)
            if (!user.status) {
                result.user = { name: user.name, username: user.login, bio: user.bio || 'no info', image: user.avatar_url }

                const userRepos = await call(`${API_URL}${userName}/repos`, { method: 'GET' })
                if (!userRepos.status) result.repos =userRepos
                if (userRepos && userRepos.status === 404) throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE)

                return result
            }
    })()
}