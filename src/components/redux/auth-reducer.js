import { authAPI, securityAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null //if null, then captcha is not required
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
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

export const getCaptchaUrlSuccess = (captchaUrl) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    }
}

//THUNK - внутренняя ф-я, которая возвращает внешнюю ф-ю
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

//THUNKcreator = () => THUNK()
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) { //если залогинены
        dispatch(getAuthUserData()) //запрашиваем авторизацию у auth/me
    } else {

        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }

        // stopSubmit:
        // - action creator из redux-form, 
        // - если произошла ошибка (resultCode=0), то сообщает форме эту информацию (для отображения для пользователя)
        // - стопает форму
        // 1) название нашей формы "login", там где оборачиваем ReduxForm
        // 2) поле, где была ошибка и сообщение о типе ошибки 
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Smth wrong'
        dispatch(stopSubmit("login", { _error: message }))
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) { //если вылогинились, удаляются куки
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer