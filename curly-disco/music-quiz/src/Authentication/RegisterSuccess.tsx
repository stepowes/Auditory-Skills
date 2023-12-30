import React from 'react';
//import { LuCheckCircle } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { SubmitButton, RegisterDone, RegisterText, IconMade} from './Style/User.styles';

const RegisterSuccess = () => {
    const navigate = useNavigate();

    const GoBack = () => {
        navigate("/");
    }

    return(
        <RegisterDone>
            
            <IconMade />
            
            
            <RegisterText>Congratulation! You have been reset successfully!</RegisterText>
            <SubmitButton type="submit" onClick={GoBack}>
                  Go Back To Login In!
            </SubmitButton>
        </RegisterDone>
    );

}

export default RegisterSuccess;