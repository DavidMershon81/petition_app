import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const useFetchData = ({ url, getRequestParams, authToken, requireAuth=true }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const clearLoadingErrorStates = () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
    };

    const onResponseError = (error) => {
      setLoading(false);
      setError(true);
      setErrorMessage(error.response.data['message']);
    };

    const getData = useCallback(() => {
      clearLoadingErrorStates();
      const requstConfig = { 
        'headers' : {'Authorization' : authToken},
        'params' : getRequestParams
      };

      axios.get(url, requstConfig).then((response) => {
        setData(response.data);
        setLoading(false);
      }, onResponseError);
    }, [url, getRequestParams, authToken])

    useEffect(() => {
      if(authToken || !requireAuth) {
        getData();
      }
    },[getData, authToken, requireAuth]);

    const addData = (newData) => {
      postData(newData, (responseData) => {
        setData([...data, responseData]);
      });
    };

    const postData = (newData, onResponse) => {
      clearLoadingErrorStates();
      const requstConfig = { 
        'headers' : {'Authorization' : authToken} 
      };
      axios.post(url, newData, requstConfig).then((response) => {
        setLoading(false);
        onResponse(response.data)
      }, onResponseError);
    }

    return { data, getData, postData, addData, loading, error, errorMessage };
}

export default useFetchData
