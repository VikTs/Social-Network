import { authAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        default: return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth } //передача данных об авторизации
    }
}

//THUNK - внутренняя ф-я, которая возвращает внешнюю ф-ю
export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setAuthUserData(id, email, login, true))
            }
        });
}

//THUNKcreator = () => THUNK()
export const login = (email, password, rememberMe) => (dispatch) => {    
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) { //если залогинены
                dispatch(getAuthUserData()) //запрашиваем авторизацию у auth/me
            } else {
                // stopSubmit:
                // - action creator из redux-form, 
                // - если произошла ошибка (resultCode=0), то сообщает форме эту информацию (для отображения для пользователя)
                // - стопает форму
                // 1) название нашей формы "login", там где оборачиваем ReduxForm
                // 2) поле, где была ошибка и сообщение о типе ошибки 
                let message = response.data.messages.length>0?response.data.messages[0]:'Smth wrong'
                dispatch(stopSubmit("login", { _error: message }))
            }
        });
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) { //если вылогинились, удаляются куки
                dispatch(setAuthUserData(null, null, null, false))
            }
        });
}

export default authReducer