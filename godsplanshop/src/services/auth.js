import Cookies from 'js-cookie'; 
import { jwtDecode } from 'jwt-decode'; 

const isAuthenticated = () => {
    const token = Cookies.get('token'); 

    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 

        return currentTime < decodedToken.exp; 
    }

    return false; 
}

export default isAuthenticated; 