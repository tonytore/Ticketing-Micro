export const auth = {
    login: ()=> localStorage.setItem('isAuthenticated', 'true'),
    logout: ()=> localStorage.removeItem('isAuthenticated'),
    isAuthenticated: ()=> localStorage.getItem('isAuthenticated') === 'true'
}