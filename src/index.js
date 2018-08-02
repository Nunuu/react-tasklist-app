import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form'

import './assets/styles/index.scss';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import tasksReducer from './store/reducers/tasks';
import authReducer from './store/reducers/auth';
import { watchTasks, watchAuth } from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  form: formReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchTasks);
sagaMiddleware.run(watchAuth);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/" >
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();