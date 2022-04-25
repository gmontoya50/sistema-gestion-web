import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "src/auth/authContext";
/* eslint-disable react/prop-types */
export const PublicRoute = ({ component: Component, ...rest }) => {
  const {user} = useContext(AuthContext); 
  return (
    <Route
      {...rest}
      render={props =>
          user.logged ? (
            <Redirect
              to={{
              pathname: '/',
              state: { from: props.location }
              }}
            />
        ) : (          
            <Component {...props} />          
        )
      }
    />


  );
};


