import {  collection, getDocs, query } from "@firebase/firestore";
import { db } from "../firebase/firebaseConfig"


export const loadTodo = async ( uid ) => {

    const todosSnap = await getDocs(query(collection(db,`${uid}/app/todo`)));
    const todos = [];

    todosSnap.forEach( snapHijo => {
        
        todos.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })
    return todos;
}