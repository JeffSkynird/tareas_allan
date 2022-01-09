export const guardarSession = (user) => {
    localStorage.setItem('auth', user);
}
export const removeSession=()=>{
    localStorage.removeItem("auth");
}
export const obtenerSession = () => {

    return localStorage.getItem('auth');

}