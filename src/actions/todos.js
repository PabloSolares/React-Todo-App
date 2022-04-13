
import { addDoc, deleteDoc } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { loadTodo } from './../helpers/LoadTodo';
import { doc } from '@firebase/firestore';
import { updateDoc } from '@firebase/firestore';

export const createNewTodo = (title) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        
        const newNote = {
            info: title,
            done: false,
        }

        try{
            const doc = await addDoc( collection(db, `${uid}/app/todo`), newNote) 
            dispatch(addNewTodo(doc.id, newNote));
        } catch (error) {
            console.log(error)
        }
    }
}

export const startLoadingTodos =  ( uid ) => {
    return async ( dispatch ) => {
        const todos = await loadTodo( uid );
        dispatch(setTodos(todos))
        
    }
}

export const startChangeState = (todo) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const todoToFirestore = {...todo};
        delete todoToFirestore.id;

        const todoRef = doc(db,`${uid}/app/todo/${todo.id}`);
        await updateDoc(todoRef, todoToFirestore);

        dispatch( refreshTodo( todo.id, todo ) );

    }   
}

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const noteRef = doc(db,`${uid}/app/todo/${id}`);

        await deleteDoc(noteRef);

        dispatch( deleteTodo( id ) )
        

    }
}

export const deleteTodo = ( id ) => ({
    type: types.todoDelete,
    payload: id
})

export const refreshTodo = (id, todo) => ({
    type: types.todoUpdated,
    payload: {
        id,
        todo: {
            id,
            ...todo
        }
    }
})


export const addNewTodo = (id, todos) => ({
    type: types.todoAddNew,
    payload: {
        id,
        ...todos
    }
})

export const setTodos = ( todos ) => ({
    type: types.todoLoad,
    payload: todos
})

// export const changeState = ( todo ) => ({
//     type: types.todoChangeState,
//     payload: todo 
// })