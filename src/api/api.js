import {default as axios} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY" : "62eaae75-9d3b-4e69-82e5-606546fd8d93"}
})


export const usersApi = {
    requestUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },

    unfollow (id) {
        return instance.delete(`follow/${id}`)
    },

    follow (id) {
        return instance.post(`follow/${id}`, {})
    }
}

export const authApi = {
    authMe() {
        return instance.get(`auth/me`)
    },

    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },

    logout() {
        return instance.delete(`auth/login`)
    }
}

export const profileApi = {
    getUserProfile (userId) {
        return instance.get(`profile/`+ userId)
    },

    getStatus (userId) {
        return instance.get(`profile/status/${userId}`)
    },

    updateStatus (status) {
        return instance.put(`profile/status`, {status: status})
    },

    savePhoto (photoFile) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}