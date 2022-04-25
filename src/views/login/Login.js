import React, { useContext, useState } from 'react'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react-pro'
import ImgFondo from '../../assets/img/login-imgfondo-2.png'
import Logo from '../../assets/img/cliente-logo-blanco.png'
import { loginSchema as schema } from 'src/components/login/loginSchema'
import { validate, handlerInputChangeCreator } from 'src/utils'
import { useFormik } from 'formik'
import { AuthContext } from 'src/auth/authContext'
import { types } from 'src/types/types'
import LoginFormComponent from 'src/components/login/LoginForm'
import { login } from '../../services/login'
import { responseValidate } from '../../utils'
import { SpinerLoader } from 'src/components/SpinerLoader'

let stylesLayout = {
  backgroundImage: `url(${ImgFondo})`,
  backgroundSize: 'cover',
}

const Login = () => {
  const [formLoading, setFormLoading] = useState(false)
  const { dispatch } = useContext(AuthContext)
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxIiwianRpIjoiNWZjNzEyOGFkZmEyOGJiZjdkODUxZjcyNmY1OTZjNjFlZTUxZTdjMjZmYmJmNDRjNmI3NTI0Yjk4NjZlNTVkYjAyZjQxYmIxMzVmOGQ3YmUiLCJpYXQiOjE2NDIwMTUzNzIuODQ2MDA2LCJuYmYiOjE2NDIwMTUzNzIuODQ2MDExLCJleHAiOjQxMDM0NzU4ODgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.bSfx03ZT_SM7AtDUsG-eMoc9DZ_8KM8dVKNt7hp3zyA'
  const handleLogin = (token, role) => {
    const action = {
      type: types.login,
      payload: { email: formik.values.email, token: token, role: role },
    }
    dispatch(action)
  }

  const onSubmit = () => {
    setFormLoading(true)
    if (process.env.REACT_APP_FAKE_LOGIN === 'true') {
      handleLogin(token, 'user')
    } else {
      console.log('login')
      login({ email: formik.values.email, password: formik.values.password })
        .then((res) => {
          responseValidate(res, () => {
            handleLogin(res.data.result.access_token, res.data.result.user.role)
          })
        })
        .then(() => {
          setFormLoading(false)
        })
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validate(schema),
    onSubmit: onSubmit,
  })
  const handleTextChange = handlerInputChangeCreator(formik)

  return !!formLoading ? (
    <div className="LoginContainer bg-light min-vh-100 d-flex flex-row align-items-center">
      <SpinerLoader color={'primary'} loading={formLoading} />
    </div>
  ) : (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" style={stylesLayout}>
      <CContainer>
        <div className="text-center mb-5 ">
          <img src={Logo} alt="Logo" style={{ height: '100px' }} />
        </div>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <LoginFormComponent formik={formik} onChange={handleTextChange} />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
