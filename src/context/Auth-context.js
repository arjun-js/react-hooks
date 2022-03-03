import React, {useState} from 'react';

export const AuthContext = React.createContext();

const AuthContextProvider = (props)=>{

    const [isLogin, setLogin] = useState(false);

    const loginHandler = ()=>{
        setLogin(true);
    }

    return (
        <AuthContext.Provider value = {{login : loginHandler, isLogin : isLogin}}>
{props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;