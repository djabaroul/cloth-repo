import React from 'react';
import './App.css';
import {setCurrentUser} from './redux/user/user.action';

import {connect} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth , createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {
  /*constructor(){
    super();

    this.state ={
       currentUser:null
    }
  }*/
    
    unsubscribeFromAuth = null

   componentDidMount() {
     const {setCurrentUser} =this.props;
      this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
        //this.setState({ currentUser: user});
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            setCurrentUser({
             
                id:snapShot.id,
                ...snapShot.data()
              
          });
          
          });
          
        }else{
          setCurrentUser(userAuth);
        }

        
      });
   }

   componentWillUnmount() {
     this.unsubscribeFromAuth();
   }

  render(){
    return (
      <div >
      <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUp}/>
        </Switch>
        
  
      </div>
    );

  }
  
}

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps) (App);
