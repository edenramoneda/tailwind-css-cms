import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem("userToken") ; //${import.meta.env.VITE_API_TOKEN
    if (token) {
        config.headers['Content-Type'] =  "application/json"
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("userToken")}`;//${import.meta.env.VITE_API_TOKEN
    }
    return config;
});

export async function fetchData(endpoint) {
    try {
        const response = await instance.get(endpoint);
        return response.data
    } catch (error) {
        throw error;
    }
}

export async function postData(endpoint, data) {

    try {
        const response = await instance.post(endpoint, JSON.stringify({data: data}));
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        throw error;
    }
}

export async function updateData(endpoint, data) {
    try {
        const response = await instance.put(endpoint, JSON.stringify({data: data}));
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        throw error;
    }
}

export async function deleteData(endpoint) {
    try {
        const response = await instance.delete(endpoint);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        throw error;
    }
}

export async function loginData(endpoint, data) {

    try {
        const response = await instance.post(endpoint, data);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        throw error;
    }
}

export async function updateAdminData(endpoint, data) {

    try {
        const response = await instance.put(endpoint, data);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        throw error;
    }
}
