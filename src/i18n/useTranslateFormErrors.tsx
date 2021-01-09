import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

// When change language is triggered, re-validate the form as to get all errors translated
// the parameters here are part of the FormikProps<Values> render props
// https://jaredpalmer.com/formik/docs/api/formik#formik-render-methods-and-props
const useTranslateFormErrors = (formikObject: any) => {
  const { errors, touched, setFieldTouched } = formikObject;

  useEffect(() => {
    i18n.on('languageChanged', (lng) => {
      Object.keys(errors).forEach((fieldName) => {
        debugger;
        if (Object.keys(touched).includes(fieldName)) {
          setFieldTouched(fieldName);
        }
      });
    });
    return () => {
      i18n.off('languageChanged', (lng) => {});
    };
  }, [errors]);
};

export default useTranslateFormErrors;
