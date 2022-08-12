import React,{useEffect, useState} from "react";
import { Toast } from "react-bootstrap";
import './ErrorToast.css';

interface ErrorToastProps {
  error:any
  closeErrorHandler:Function;
}

const ErrorToast:React.FC<ErrorToastProps> = ({error, closeErrorHandler})=>{
    const [showMessage, setShowMessage] = useState(false);
    const toggleShowMessage = () => {closeErrorHandler(); setShowMessage(!showMessage)};


    useEffect(()=>{
      if(error){
        setShowMessage(true);
      }
    },[showMessage,error])
    
return(
<Toast className='toastDisplay' show={showMessage} onClose={toggleShowMessage}>
<Toast.Header>
  <img
    src="holder.js/20x20?text=%20"
    className="rounded me-2"
    alt=""
  />
  <strong className="me-auto">Error</strong>
</Toast.Header>
<Toast.Body>{error}</Toast.Body>
</Toast>)
}

export default ErrorToast;