import * as axios from 'axios'
// import { follow } from '../components/redux/users-reducer';

const instance = axios.create({
    withCredentials: true, //сервер должен поддерж
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { 'API-KEY': '916a03f6-7b8e-4743-b877-221854dab6ae' }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
            { withCredentials: true })
            .then(response => { return response.data });
    },
    follow(userId) {
        return instance.post(`follow/${userId.id}`)

    },
    unfollow(userId) {
        return instance.delete(`follow/${userId.id}`)
    },
    getProfile(userId) {
        console.warn('Obsolete method. Use profileAPI')
        return profileAPI.getProfile(userId);

    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status });
        //в put вторым свойством передаем json-объект, его тип смотрим в документации
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile) //image - из документации

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        //в put вторым свойством передаем json-объект, его тип смотрим в документации
    }
}

//методы запросов, связанных с авторизацией
export const authAPI = {
    me() {
        //get/delete - чтобы отправить данные - .get(`auth/me?var=10`), 
        //GET/DELETE - БЕЗ ЗАПЯТОЙ, через ?
        return instance.get(`auth/me`) //
    },
    // в auth/login есть post и delete
    //мы создаем новую сессию
    //auth/login - из документации
    login(email, password, rememberMe = false, captcha = null) { //email,password - required
        //данные - через запятую
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`) //отправляем delete запрос на тот же endpoint
    }

}

//captcha
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`) 
    }

}


// //???
// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`follow?page=${currentPage}&count=${pageSize}`)
//         .then(response => { return response.data });
// }