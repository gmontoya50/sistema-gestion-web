import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "src/auth/authContext";
import { isExpired } from "src/auth/auth"
import { types } from 'src/types/types'
/* eslint-disable react/prop-types */

export const ProtectedRoute = ({ component: Component, ...rest }) => {  
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () =>{
    dispatch({type:types.logout})
  } 
  useEffect(()=>{
    if(isExpired(user.token)){
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <Route
      {...rest}
      render={props =>
          !isExpired(user.token) && user.logged  ?         
          (
          <Component {...props} />
        ) : (              
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />


  );
};


