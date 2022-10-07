import profileReducer, {addPostActionCreator, deletePost} from "./Profile-reducer";
import {render, screen} from "@testing-library/react";
import App from "../App";


let state = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 12},
        {id: 2, message: 'It is my first post', likesCount: 10},
        {id: 3, message: 'It is my first post', likesCount: 10},
        {id: 4, message: 'It is my first post', likesCount: 10}
    ]
}

test('length of posts should be incremented', () => {
    let action = addPostActionCreator("yoyoy")
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)
});

test('after deleting length of messages should be decrement', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
});

