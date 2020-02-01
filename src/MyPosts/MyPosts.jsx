import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import {required, maxLengthCreator} from '../utils/validators/validators'
import { Textarea } from '../components/common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10)

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field 
        component={Textarea} 
        name='newPostText' 
        validate={[required, maxLength10]}
        placeholder='Post message' />
      </div>
      <button>Add post</button>
      {/* <button>Remove</button> */}
    </form>
  )
}

const AddNewPostRedux = reduxForm({form:'ProfileAddNewPostForm'})(AddNewPostForm)

const MyPosts = (props) => {

  let postsElements = props.posts.map(p => (<Post name={p.name} likesCount={p.likesCount} />));

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>

      <AddNewPostRedux onSubmit={onAddPost} />
      
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>

  );
}

export default MyPosts;