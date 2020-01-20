const showData = (data) => {
    const { user, repos } = data

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

    repos.forEach(repo => {
        const li = document.createElement('li')
        li.classList.add('list__element', 'element')
        
        const repoName = document.createElement('h3')
        repoName.classList.add('element__title')
        repoName.innerText =repo.name
        
        const details = document.createElement('div')
        details.classList.add('element__details', 'details')  
        
        const starIcon = document.createElement('i')
        starIcon.classList.add('fas', 'fa-star')
        
        const starNumber = document.createElement('p')
        starNumber.classList.add('details__fork-number')
        starNumber.innerText =repo.stargazers_count
        
        const forkIcon = document.createElement('i')
        forkIcon.classList.add('fas', 'fa-code-branch')
        
        const forkNumber = document.createElement('p')
        forkNumber.innerText =repo.forks_count
        forkNumber.classList.add('details__fork-number')
        
        ul.appendChild(li)
        li.appendChild(repoName)
        li.appendChild(details)
        details.appendChild(starIcon)
        details.appendChild(starNumber)
        details.appendChild(forkIcon)
        details.appendChild(forkNumber)
    })
    
    showElement(userInformation)
}