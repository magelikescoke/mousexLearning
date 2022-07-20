function logIn(userid, username, accesstoken, area) {
    sessionStorage.setItem('userid', userid);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem(`access-token`, accesstoken);
    sessionStorage.setItem(`area`, area);
}

function logOut() {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('area');
}

function isLoggedIn() {
    return !!sessionStorage.getItem(`access-token`);
}

function getUserName() {
    return sessionStorage.getItem(`username`);
}

function getUserId() {
    return sessionStorage.getItem(`userid`);
}

function getAccessToken() {
    return sessionStorage.getItem(`access-token`);
}

function getArea() {
    return sessionStorage.getItem('area');
}

export default {
    logIn,
    logOut,
    isLoggedIn,
    getUserName,
    getUserId,
    getAccessToken,
    getArea
};
