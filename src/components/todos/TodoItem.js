import React from "react";
import { useDispatch } from "react-redux";
import { startChangeState, startDeleting } from './../../actions/todos';
import { useForm } from './../../hooks/useForm';
import  Swal  from 'sweetalert2';


export const TodoItem = ({ id, info, done }) => {
  // const { auth,todo: todos } = useSelector((state) => state);
  
  const [formValues, handleInputChange] = useForm({
    infoTo: info
  })

  const {infoTo} = formValues;


  const dispatch = useDispatch();
  
  const handleChangeState = (e) => {
    e.preventDefault();
    dispatch(startChangeState({id, info, done: !done}))
    if(!done){
      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'You have completed this todo',
        showConfirmButton: false,
        timer: 2000
      })
    }
  };


  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleting(id)) 

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    Swal.fire({
      position: 'middle',
      icon: 'success',
      title: 'The todo has been updated successfully',
      showConfirmButton: false,
      timer: 2000
    })
    dispatch(startChangeState({id, info:infoTo, done}))
  }

  

  return (
    <div className="todo" key={id}>
      <div className={`circle ${ done ? 'back' : ''}`}  onClick={handleChangeState}>
        <img src="./images/icon-check.svg" alt="x-button" />
      </div>
      <form onSubmit={handleUpdate}>
          <input type="text" autoComplete="off" value={infoTo} name="infoTo" onChange={handleInputChange} className={`${done ? 'line' : ''}`} placeholder='Create a new todo...' />
      </form>
      {/* <span></span> */}
      <img src="./images/icon-cross.svg" onClick={handleDelete} className="cross" alt="x-button" />
    </div>
  );
};
