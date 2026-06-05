import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? '/api',
    timeout: 15000,
});

api.interceptors.request.use((cfg) => {
    const raw = localStorage.getItem('auth');
    if (raw) {
        try {
            const { token } = JSON.parse(raw);
            if (token) cfg.headers.Authorization = `Bearer ${token}`;
        } catch {
            // ignore parse error
        }
    }
    return cfg;
});

api.interceptors.response.use(
    (r) => r,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('auth');
            window.location.assign('/login');
        }
        return Promise.reject(err);
    },
);
