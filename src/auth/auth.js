import jwtDecode from 'jwt-decode';
import moment from 'moment';


export const isExpired = ( token )=>{
  let data;

  if (token) {
    data = jwtDecode(token);
  }

  if (data !== undefined) {     
    return moment.unix(data.exp).isBefore(new Date());      
  }
  
  return true;
  
}