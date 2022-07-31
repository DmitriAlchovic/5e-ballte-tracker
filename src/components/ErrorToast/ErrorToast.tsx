import React,{useState} from "react";
import { Toast } from "react-bootstrap";

const ErrorToast:React.FC = (error:any)=>{
    const [showMessage, setShowMessage] = useState(true);
    const toggleShowMessage = () => setShowMessage(!showMessage);
    
return(
<Toast show={showMessage} onClose={toggleShowMessage}>
<Toast.Header>
  <img
    src="holder.js/20x20?text=%20"
    className="rounded me-2"
    alt=""
  />
  <strong className="me-auto">Bootstrap</strong>
  <small>11 mins ago</small>
</Toast.Header>
<Toast.Body>{error.message}</Toast.Body>
</Toast>)
}

export default ErrorToast;