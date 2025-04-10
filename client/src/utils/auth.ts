import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken;
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return !!decodedToken && !this.isTokenExpired(token);
    }
    return false;
  }

  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp) {
      if (decodedToken.exp < currentTime) {
        return true;
      } else {
        return false;
      }
    }
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem("ID_Token");
    if (token) return token;
    return "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem("ID_Token", idToken);
    // TODO: redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem("ID_Token");
    // TODO: redirect to the login page
    window.location.assign("/");
  }
}

export default new AuthService();
