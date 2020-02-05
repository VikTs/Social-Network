import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default: return state;
    }
}

export const initializedSuccess = (userId, email, login, isAuth) => {
    return {
        type: INITIALIZED_SUCCESS
    }
}

//THUNK - внутренняя ф-я, которая возвращает внешнюю ф-ю
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    // debugger;
    Promise.all([promise])
    .then(() => {
        dispatch(initializedSuccess());
    })
}

export default appReducer