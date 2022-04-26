import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; //cspell:disable-line
import { toast } from 'react-toastify'; //cspell:disable-line
import 'react-toastify/dist/ReactToastify.css';

export default function useFormHandler(resolver, nextPage, isLastPage, close) {

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(resolver),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  function saveToSessionStorage(data) {
    Object.keys(data).forEach((key) => {
      sessionStorage.setItem(key, data[key]);
    });
  }
  
  function errorHandler(error) {
    Object.keys(error).forEach((key) => {
      const name = error[key].ref.placeholder;
      const message = error[key].message;
      toast('Error:' + name + ': ' + message, {
        type: 'error',
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    });
  }

  function sendForm(data) {
    toast('Form submitted', {
      type: 'success',
      position: 'top-right',
      autoClose: 2000,
      theme: 'dark',
    });
    console.table(data);
    console.table(sessionStorage);
    close();
  }
  
  function submitHandler(data) {
    saveToSessionStorage(data);
    return isLastPage ? sendForm(data) : nextPage();
  }
  
  return [register, handleSubmit(submitHandler, errorHandler)];
}