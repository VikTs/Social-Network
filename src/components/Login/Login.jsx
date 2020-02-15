import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Input, CreateField } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import style from '../common/FormsControls/FormsControls.module.css'

let LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField('Email', 'email', [required], Input)}
            {CreateField('Password', 'password', [required], Input, { type: "password" })}
            {CreateField(null, 'rememberMe', [], Input, { type: "checkbox"}, 'Remember me')}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ //hoc
    form: 'login' //уникальное строковое имя
    // форм много, им нужны индивидуальные имена, а стейт у всех них один
})(LoginForm) //форма,вокруг которой создаем редакс-форм

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profiles"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)