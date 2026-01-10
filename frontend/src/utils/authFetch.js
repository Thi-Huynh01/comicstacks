const authFetch = async(url, options = {}) => {
    const access = localStorage.getItem("access");

    const headers = {
        "Content-Type":"application/json",
        ...(options.headers || {}),
    };

    if (access) {
        headers.Authorization = `Bearer ${access}`;
    }

    return fetch(url, {
        ...options,
        headers,
    });
};

export default authFetch;