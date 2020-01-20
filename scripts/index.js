'use strict'

const form = document.getElementsByClassName('form')[0]
const feedback = document.getElementsByClassName('feedback')[0]
const userInformation = document.getElementsByClassName('main')[0]

const onSearch = async (event) => {
    event.preventDefault()
    const { username: { value: username } } = event.target

    hideElement(feedback)
    hideElement(userInformation)


    try {
        const result = await retrieveUserRepos(username)
        showData(result, userInformation)
    } catch (error) {
        if (error instanceof NotFoundError) feedback.textContent = NOT_FOUND_ERROR_MESSAGE
        else if (error instanceof ContentError) feedback.textContent = EMPTY_INPUT_ERROR_MESSAGE
        else feedback.textContent = UNKNOWN_ERROR_MESSAGE
        
        showElement(feedback)
    }
}

form.addEventListener('submit', onSearch)


