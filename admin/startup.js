(function (global) {
    const LOGIN_PATH = "/admin/login";

    const authToken = global.localStorage.getItem("authToken");
    const currentPath = global.location.pathname;
    if (!currentPath.includes(LOGIN_PATH) && !authToken) {
        console.log("no authToken found in localStorage");
        const loginRedirect = `${LOGIN_PATH}?redirect=${encodeURIComponent(currentPath)}`;
        console.log("redirecting to", loginRedirect);
        global.location.href = loginRedirect;
    }
})(window);