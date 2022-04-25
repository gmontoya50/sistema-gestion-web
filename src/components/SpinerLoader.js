import React from 'react';
import { CContainer, CSpinner } from '@coreui/react-pro';


const SpinerLoader = ({loading, color}) => {

  return (
    <>
      {
        !!loading && 
        <CContainer fluid className='d-flex align-items-center justify-content-center'>
          <CSpinner color={color} />
        </CContainer>
      }
    </>
  )
};

export { SpinerLoader };