import React from 'react'
import {reduxForm, Field} from 'redux-form'
import { Input } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import {login} from '../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import style from '../common/FormsControls/FormsControls.module.css'

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'} 
                validate={[required]}
                component={Input} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={"password"}
                validate={[required]}
                component={Input} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} /> Remember me
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm ({ //hoc
    form: 'login' //уникальное строковое имя
    // форм много, им нужны индивидуальные имена, а стейт у всех них один
  })(LoginForm) //форма,вокруг которой создаем редакс-форм

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if(props.isAuth) {
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

export default connect(mapStateToProps, {login})(Login)