'use strict'

const form = document.getElementsByClassName('form')[0]
const feedback = document.getElementsByClassName('feedback')[0]
const userInformation = document.getElementsByClassName('main')[0]

const showElement = (element) => {
    element.classList.remove('hide')
}

const hideElement = (element) => {
    element.classList.add('hide')
}

const showData = (data) =>{
    const {user, repos} = data
    console.log(data)
    const userName = document.getElementsByClassName('info__username')[0]
    const name = document.getElementsByClassName('info__name')[0]
    const bio = document.getElementsByClassName('info__bio')[0]
    const image = document.getElementsByClassName('user__image')[0]

    userName.textContent = user.username
    name.textContent = user.name
    bio.textContent = user.bio
    image.src = user.image

    const repostList = document.getElementsByClassName('repos__list')[0]
    repostList.innerHTML = ''

    const ul = document.getElementsByClassName('repos__list')[0]
    
    for(let index = 0; index < repos.length; index++){
        const starSvg = document.createElement('svg')
        starSvg.classList.add('details__star')

        const starpath = document.createElement('path')
        starpath.setAttribute('fill-rule','evenodd')
        starpath.setAttribute( 'd','M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z')

        const forkSvg = document.createElement('svg')
        forkSvg.classList.add('details__fork-icon')
        const forkpath = document.createElement('path')
        forkpath.setAttribute('fill-rule','evenodd')
        forkpath.setAttribute( 'd','M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z')

        const details = document.createElement('div')
        details.classList.add('element__details', 'details')
        
        const li = document.createElement('li')
        li.classList.add('list__element', 'element')
        ul.appendChild(li)

        const repoName = document.createElement('h3')
        repoName.classList.add('element__title')
        repoName.textContent = repos[index].name
        li.appendChild(repoName)
        li.appendChild(details) 


        
    }

    showElement(userInformation)
}




{/* <li class="list__element element">
                    <h3 class="element__title">Repo 1</h3>

                    <div class="element__details details">

                        <svg aria-label="star" height="16" class="details__star" viewBox="0 0 14 16" version="1.1" width="14" role="img">
                                    <path fill-rule="evenodd"
                                        d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z">
                                    </path>
                                </svg>

                        <p class="details__fork-number">50</p>

                        <svg class="details__fork-icon" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z">
                                    </path>
                                </svg>
                        <p details__star-number>10</p>
                    </div>
                </li>
 */}













const onSearch = async(event) => {
    event.preventDefault()
    const {username:{value:username}} = event.target

    hideElement(feedback)
    hideElement(userInformation)


    try{
     const result = await retrieveUserRepos(username)
     showData(result, userInformation)

    } catch({message}){
        feedback.textContent = message
        showElement(feedback)
    }
}

form.addEventListener('submit', onSearch)
