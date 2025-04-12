import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
    // currentUser: null,
    // token: null,
    // notification: null,
    // setNotification: () => {},
    // setUser: () => {},
    // setToken: () => {},
});

export const AuthUiProvider = ({ children }: any) => {
    const [currentCard, setCurrentCard] = useState('');
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const pageList = ['login', 'register', 'forgot-password'];

    const findPageIndex = (page: string) => pageList.indexOf(page);

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
