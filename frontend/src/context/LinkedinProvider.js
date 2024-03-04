import { useState } from "react";
import LinkedinContext from "./LinkedinContext";

const LinkedinProvider = ({ children }) => {

    const [linkedinId, setLinkedinIdd] = useState('');


    const setLinkedinId = (response) => {
        setLinkedinIdd(response);
    };


    const values = {
        linkedinId,
        setLinkedinId,
    };

    return <LinkedinContext.Provider value={values}>{children}</LinkedinContext.Provider>;
};

export default LinkedinProvider;