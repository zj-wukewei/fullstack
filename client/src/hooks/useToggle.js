import { useCallback, useState } from 'react';

const useToggle = state => {
    const [value, setValue] = useState(state);
    const toggle = useCallback(
        (nextValue) => {
            if (typeof nextValue != 'undefined') {
                setValue(!!nextValue);
                return;
            }
            setValue(nextValue => !nextValue);
        },
        [setValue]
    );

    return [value, toggle];
}

export default useToggle;