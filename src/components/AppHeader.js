import React, { useContext } from 'react'
// import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  // CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  // CNavLink,
  // CNavItem,
  CNavbarNav,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { 
  // cilApplicationsSettings, 
  cilMenu 
} from '@coreui/icons'
// import { useHistory } from "react-router";
// import { AppBreadcrumb } from './index'

import { logo } from 'src/assets/brand/logo'
import { AuthContext } from 'src/auth/authContext'
import { types } from 'src/types/types'

const AppHeader = () => {
  const { user, dispatch } = useContext(AuthContext)
  // const history = useHistory();
  const dispatchR = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  // const asideShow = useSelector((state) => state.asideShow)

  const handleLogout = () =>{
    dispatch({type:types.logout})
  }
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatchR({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        {/* <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        {/* <CHeaderToggler
          className="px-md-0 me-md-3"
          onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
        >
          <CIcon icon={cilApplicationsSettings} size="lg" />
        </CHeaderToggler> */}
        <CHeaderNav>
        <CNavbarNav className="ml-auto">
          <CDropdown >
            <CDropdownToggle className="text-white">{user.email}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={handleLogout}>Cerrar sesión</CDropdownItem>
              {/* <CDropdownItem onClick={logout}> */}
                {/* <Link to="/" onClick={logout} className="btn-logout dropdown-item">
                  Cerrar sesión
                </Link> */}
              {/* </CDropdownItem> */}
            </CDropdownMenu>
          </CDropdown>
        </CNavbarNav>
        </CHeaderNav>
      </CContainer>
      
      {/* <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
