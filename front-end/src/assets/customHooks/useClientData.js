import { useState } from 'react';

function useClientData(key) {
    const initialValue = JSON.parse(localStorage.getItem(key)) && {
        state: false,
    };

    const [value, setCustomValue] = useState(initialValue);

    function setValue(newValue) {
        setCustomValue(newValue);

        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [value, setValue];
}

export default useClientData;
