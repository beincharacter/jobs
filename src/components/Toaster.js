import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = () => toast("This is a toast notification!");

export const Toaster = () => {
  return <ToastContainer />;
};
