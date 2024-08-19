import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SignIn from './SignIn';

const mockStore = configureStore([]);

test('renders SignIn component', () => {
  const store = mockStore({});

  render(
    <Provider store={store}>
      <Router>
        <SignIn />
      </Router>
    </Provider>
  );

});
