'use strict'

describe('logic retrieve-user-repos', () => {

    it('should retrieve an user and his repos', async () => {
        const user = 'martin-garcia-blanco'
        const data = await retrieveUserRepos(user)

        expect(data.user.username).toBeDefined()
        expect(data.user.username.length).toBeGreaterThan(0)

        expect(data.user.name).toBeDefined()
        expect(data.user.name.length).toBeGreaterThan(0)

        expect(data.user.bio).toBeDefined()
        expect(data.user.bio.length).toBeGreaterThan(0)

        expect(data.repos).toBeDefined()
        expect(data.repos).toBeInstanceOf(Array)

        if (data.repos) {
            expect(data.repos[0].name).toBeDefined()
            expect(data.repos[0].name.length).toBeGreaterThan(0)
            expect(data.repos[0].forks_count).toBeDefined()
            expect(data.repos[0].stargazers_count).toBeDefined()
        }
    })

    it('should throw an error because the user does not exist', async() => {
        const wrongUser = `wrong-username${Math.random()}`
        try{
            await retrieveUserRepos(wrongUser)
            throw Error('Should not reach this point')
        } catch({message}){
            expect(message).toBe('Not found')
        }
    })

    it('should throw an error, invalid input parameter', async() => {
       const emptyUsername = 2
       try{
            await retrieveUserRepos(emptyUsername)
       }catch({message}) {
           expect(message).toBe('input is empty or blank')
       }
    })

    it('should throw an error, empty string', async() => {
        const emptyUsername = ''
        try{
             await retrieveUserRepos(emptyUsername)
        }catch({message}) {
            expect(message).toBe('input is empty or blank')
        }
     })
})


