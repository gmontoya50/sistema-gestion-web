

import React from "react";
import {
    CForm,
    CRow,
    CCol,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CButton,
    CFormFeedback,
} from "@coreui/react-pro";
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const LoginFormComponent = ({ formik, onChange }) => {

    return (
        <CForm onSubmit={formik.handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <p className="text-medium-emphasis">
            Ingresa tu usuario y contraseña
            </p>
            <CInputGroup className="mb-3">
                <CInputGroupText>
                    <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                    placeholder="Email"
                    autoComplete="username"
                    value={formik.values.email}
                    invalid={formik.touched.email && !!formik.errors.email}
                    onChange={onChange}
                    name="email"
                />
                <CFormFeedback invalid>{formik.errors.email}</CFormFeedback>                
            </CInputGroup>
            <CInputGroup className="mb-4">
                <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                    type="password"
                    placeholder="Contraseña"
                    autoComplete="current-password"
                    onChange={onChange}
                    value={formik.values.password}
                    invalid={formik.touched.password && !!formik.errors.password}
                    name="password"
                />
                <CFormFeedback invalid>{formik.errors.password}</CFormFeedback>
            </CInputGroup>
            <CRow>
            <CCol xs={6}>
                <CButton color="primary" className="px-4" type="submit">
                    Ingresar
                </CButton>
            </CCol>
            <CCol xs={6} className="text-right">
                <CButton color="link" className="px-0">
                    ¿Olvidaste tu contraseña?
                </CButton>
            </CCol>
            </CRow>
        </CForm>
    )
}

export default LoginFormComponent;
