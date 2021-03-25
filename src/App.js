import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
import styled from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chat/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login/Login';
import Spinner from './UI/Spinner/Spinner';
function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Spinner />
  }
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
            <>
              <AppBody>
                <Header />
                <Sidebar />
                <Switch>
                  <Route path="/">
                    <Chat />
                  </Route>
                </Switch>
              </AppBody>
            </>
          )}

      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
`