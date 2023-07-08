import React, {ReactElement, useState} from "react";

type Props = 
{
	children: ReactElement;
};

type IUserContext =
{
    user:
    {
        id: string,
        email: string,
        token: string,
        userType: string
    };
    setUser: (newUserState: {id: string, email: string, token: string, userType: string}) => void
}

const initialUser = 
{
    user: 
    {
        id: '',
        email: '',
        token: '',
        userType: ''
    },
    setUser: () => {}
}

export const UserContext = React.createContext<IUserContext>(initialUser);

const UserProvider = ({ children }: Props) =>
{
    const [user, setUser] = useState(initialUser.user);
    return (<UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>);
}

export default UserProvider;