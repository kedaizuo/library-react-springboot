import React from 'react';

import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch , useHistory} from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js'
import { Security , LoginCallback, SecureRoute} from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { MessagePage } from './layouts/MessagePage/MessagePage';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage';
const oktaAuth=new OktaAuth(oktaConfig)
export const App = () => {


  const customAuthHandler=()=>{
    history.push('/login')
  }

  const history=useHistory();
  const restoreOriginalUrl = async(_oktaAuth:any, originalUri:any)=>{
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin))

  }
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUrl} 
      // onAuthRequired={customAuthHandler}
      >
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <SecureRoute path='/search' exact>
            <SearchBooksPage />
          </SecureRoute>
          <SecureRoute path='/reviewlist/:bookId'>
            <ReviewListPage/>
          </SecureRoute>
          <SecureRoute path='/checkout/:bookId'>
            <BookCheckoutPage/>
          </SecureRoute>
          {/* <Route path='/login' render=
          {()=><LoginWidget config={oktaConfig}/>
          }
          /> */}
          <SecureRoute path='/login'>
            <HomePage/>
          </SecureRoute>
          <Route path='/callback' component={LoginCallback}/>
          <SecureRoute path='/shelf'><ShelfPage/></SecureRoute>
          <SecureRoute path='/message'><MessagePage/></SecureRoute>
          <SecureRoute path='/admin'><ManageLibraryPage/></SecureRoute>
        </Switch>
      </div>
      <Footer />
      </Security>
    </div>

  );
}


