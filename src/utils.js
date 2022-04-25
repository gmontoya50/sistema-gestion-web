import Swal from "sweetalert2";
export const validate = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values);
        try {
            validationSchema.validateSync(values, { abortEarly: false });
            return {};
        } catch (error) {
            return getErrorsFromValidationError(error);
        }
    };
};

export const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        };
    }, {});
};

export const getValidationResult = (condition) => condition ? 'valid' : 'invalid';
export const getInputValue = (target) => {
    if (target.type === 'checkbox') return { [target.name]: target.checked }
    return { [target.name]: target.value }
}

// CREATORS
export const handlerInputChangeCreator = (formik) => ({ target }) => formik.setValues({ ...formik.values, ...getInputValue(target) });


export const aletOnSuccess = (res, CB) =>{
    if(!!res.data.errors ){
      return Swal.fire({
        title: 'Error',
        text: Object.values(res.data.errors ),
        icon: res.data.success ? 'success': 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary text-white'
        },
        didClose: () => {
         CB();
        }
      })
    }
    const alert = Swal.fire({
      title: 'Success',
      text: res.data.message,
      icon: res.data.success ? 'success': 'error',
      buttonsStyling:false,
      customClass: {
        confirmButton: 'btn btn-primary text-white'
      },
      didClose: () => {
        CB();
      }
    })
    return alert; 
  
  }
  
  export const responseValidate = (res, onSucces = null, onError = null) => {
    if (!!res) {
      switch (res.status) {
        case 200:
          onSucces();
          break
        case 422:
          Swal.fire({
            title: res.data.message,
            text: Object.values(res.data.errors),
            icon: 'error',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-primary text-white'
            }
          })
          if (onError !== null) {
            return onError
          }
          break
        default:
          Swal.fire({
            title: 'error',
            text: 'ups ocurrio un error',
            icon: 'error',
            
          })
          if (onError !== null) {
            return onError
          }
          break
      }
    }
  }