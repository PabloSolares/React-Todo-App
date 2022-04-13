import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signOutWithEmail } from '../../actions/auth';
import { useForm } from './../../hooks/useForm';
import { createNewTodo, startLoadingTodos } from './../../actions/todos';
import { TodoItem } from './TodoItem';
import { useEffect } from 'react';
import  Swal  from 'sweetalert2';

export const TodoScreen = () => {

    const [formValues, handleInputChange, reset] = useForm({
        info: ''
    })

    const { info } = formValues;

    useEffect(() => {
        dispatch(startLoadingTodos(auth.uid))
    }, [])
    
    // const reducers = useSelector( state => state );
    const {auth, todo:todos} = useSelector( state => state );
    const dispatch = useDispatch();
    const handleNewTodo = (e) => {
        e.preventDefault();

        Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'The todo has been created successfully',
            showConfirmButton: false,
            timer: 1500
          })
        
        dispatch(createNewTodo(info));
        reset();
    }
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(signOutWithEmail())
        
    }
  return (
    <div id='todos'>
        <img src='./images/bg-desktop-dark.jpg' className='banner' alt='banner'/>
        <div className='todo-container'>
            <div className='nav'>      
                <h1>TODO</h1>
                <ul>
                    <li>
                        <span>Hi {auth?.displayName}</span>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
            <div className='write-todo'>
                <form onSubmit={handleNewTodo}>
                    <input type="text" autoComplete="off" value={info} name="info" onChange={handleInputChange}  placeholder='Create a new todo...' />
                </form>
            </div>
            <div className='all-todo'>
            {
                todos?.todos &&
                todos?.todos?.map( item => {
                    return <TodoItem 
                    key={item?.id+1}
                    id={item?.id}
                    info={item?.info}
                    done={item?.done}
                />
                })
               
            }
                
            </div>
        </div>
        
    </div>
  )
}
