import { useState, useEffect } from 'react';

function useClientData(key) {
    const initialValue = JSON.parse(localStorage.getItem(key)) && {
        state: false,
    };

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useClientData;
