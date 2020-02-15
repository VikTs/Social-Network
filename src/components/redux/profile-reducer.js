import { usersAPI, profileAPI } from "../../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

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

        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(e=>e.id!=action.postId )
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

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

//thunk - ф-я, которая принимает dispatch и диспатчит мелкие action 
//(до или после асинхронной операции или вообще без неё)

export const getUserProfile = (userId) => async(dispatch) => {
    const response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
}

//thunk for status
export const getUserStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) { //из документации (если =1 - ошибка, =0 - все ок)
            dispatch(setStatus(status));
        }
}

export default profileReducer








