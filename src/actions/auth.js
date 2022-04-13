
import { types } from './../types/types';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { updateProfile } from '@firebase/auth';
import { finishLoading, setError, startLoading } from './ui';
import Swal  from 'sweetalert2';

export const login = (uid,displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLoginEmailPassword = (email,password) => {
    return (dispatch) => {
        dispatch( startLoading());

        const auth = getAuth();
    

        return signInWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {
                
                dispatch(login(user.uid, user.displayName))
                dispatch( finishLoading());
            })

            .catch(e => {
                console.log(e.message)
                Swal.fire('Error', e.message, 'error')
            })

    }
}


export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        const auth = getAuth();        

        return createUserWithEmailAndPassword(auth, email, password )
            .then( async ({user}) => {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
                
                dispatch(
                    login(user.uid, user.displayName)
                )
            }) 
            .catch( e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error')
            })
    }

}

export const signOutWithEmail = () => {
    return async ( dispatch ) => {

        const auth = getAuth();
        await auth.signOut();

        dispatch( logout() );

      
    }

    
}

export const logout = () => ({
    type: types.logout
})