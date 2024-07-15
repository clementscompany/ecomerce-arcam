function TextLogin(){
    
    const sessionUser = localStorage.getItem('session_token') || sessionStorage.getItem('session_token');

    if (!sessionUser) {
        return false; 
    } else {
        return true;
    }   

}
export default TextLogin;