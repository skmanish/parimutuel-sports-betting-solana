import axios from 'axios';

const signUpForBeta = async (email: string) => {
    await axios.post(
        '/api/signupbeta',
        {email: email},
    );
}

export {signUpForBeta};