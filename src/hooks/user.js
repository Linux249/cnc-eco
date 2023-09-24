// import { useContext, useState } from 'react';
//
//
// const UserContext = React.createContext({ user: null });
//
// export function useUser() {
//     const [user, setUser] = useContext(UserContext);
//     return [user, setUser];
// }
//
// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState({});
//     return <UserContext.Proivder value={[user, setUser]}>{children}</UserContext.Proivder>;
// };
