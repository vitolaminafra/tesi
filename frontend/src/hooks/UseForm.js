import {useState} from "react";

const useForm = () => {
    const [formInputs, setFormInputs] = useState({});

    const handleInputChange = (event) => {
        setFormInputs((formInputs) => ({
            ...formInputs,
            [event.target.name]: event.target.value
        }));
    };

    const resetFormInputs = (event) => {
        setFormInputs((formInputs) => ({ }));
    };

    return {handleInputChange, formInputs, resetFormInputs};
};

export default useForm;