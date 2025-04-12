import { usePage } from '@inertiajs/react';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface PageProps {
    auth: {
        user: any | null;
    };
}

interface AuthContextType {
    auth: PageProps['auth'];
    someGlobalData: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { auth } = usePage<PageProps>().props;
    const [globalData, setGlobalData] = useState<string>('');

    useEffect(() => {
        //example of fetching global data.
        setGlobalData('Global Data Loaded');
    }, []);

    return <AuthContext.Provider value={{ auth, someGlobalData: globalData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <div>{children}</div>
        </AuthProvider>
    );
}
