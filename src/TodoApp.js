import React from 'react'
import { AppRoutes } from './routers/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const TodoApp = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}
