import { useState, useEffect } from 'react';

function useToLocalStorage(key) {
    const initialValue = JSON.parse(localStorage.getItem(key)) && {};

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useToLocalStorage;
