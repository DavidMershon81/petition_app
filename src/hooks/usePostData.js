import { useState } from 'react'
import axios from 'axios';

const usePostData = ({ url, authToken, onConfirm, confirmText }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [responseData, setResponseData] = useState(null);

    const onResponseError = (error) => {
      setLoading(false);
      setError(true);
      setErrorMessage(error.response.data['message']);
    };

    const post = (newData) => {
        setLoading(true);
        setError(false);
        setErrorMessage("");
        setConfirmMessage("");
        setResponseData(null);

        const requstConfig = { 
            'headers' : {'Authorization' : authToken} 
        };
        axios.post(url, newData, requstConfig).then((response) => {
            setLoading(false);
            setResponseData(response.data);
            setConfirmMessage(confirmText);

            if(onConfirm) {
                onConfirm();
            }
        }, onResponseError);
    }

    return { post, responseData, loading, error, confirmMessage, errorMessage  };
}

export default usePostData;
