import { useSelector } from '_state/useSelector';
import { Navigate, Outlet } from 'react-router-dom';

export const LoginLayout: React.FC = () => {
    const isUserLoggedIn = useSelector(({ user }) => user.isUserLoggedIn);
    return <>{!isUserLoggedIn ? <Outlet /> : <Navigate to={'/'} />}</>;
};
