import useToggle from './useToggle';
import { useState } from 'react';

const useModal = () => {
    const [on, toggle] = useToggle(false);
    const [initValue, setInitValue] = useState();

    const openModal = (initValue) => {
        toggle(true);
        setInitValue(initValue);
    };

    const closeModal = () => {
        toggle(false);
    };

    return {
        initValue,
        openModal,
        visible: on,
        closeModal
    };

};

export default useModal;