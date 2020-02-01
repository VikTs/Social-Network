import { usersAPI, profileAPI } from "../../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        { id: 1, name: 'Hi. How are you?', likesCount: 10 },
        { id: 2, name: 'It`s my first post', likesCount: 8 }
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:

            let newPost = {
                id: 5,
                name: action.addNewPost,
                likesCount: 0
            }

            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }

        default: return state;

    }
}

export const addPostActionCreator = (addNewPost) => {
    return {
        type: ADD_POST,
        addNewPost
    }
}

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}

//thunk - ф-я, которая принимает dispatch и диспатчит мелкие action 
//(до или после асинхронной операции или вообще без неё)

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    });
}

//thunk for status
export const getUserStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data));
    });
}

export const updateUserStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) { //из документации (если =1 - ошибка, =0 - все ок)
            dispatch(setStatus(status));
        }
    });
}

export default profileReducer