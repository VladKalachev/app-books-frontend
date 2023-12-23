import { Navigate, useLocation } from 'react-router-dom';
import { getLoginPage } from '@/shared/consts/router';
import useStore from '../../StoreProvider/config/useStore';

interface RequireAuthProps {
    children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
    const { user } = useStore();
    const location = useLocation();

    if (!user.isAuth) {
        return (
            <Navigate to={getLoginPage()} state={{ from: location }} replace />
        );
    }


    return children;
}
