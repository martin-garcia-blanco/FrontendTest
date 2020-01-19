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

    } catch ({ message }) {
        feedback.textContent = message
        showElement(feedback)
    }
}

form.addEventListener('submit', onSearch)


