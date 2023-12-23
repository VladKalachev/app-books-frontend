import { Navigate, useLocation } from 'react-router-dom';
import { getRouteMain } from '@/shared/consts/router';
import useStore from '../../StoreProvider/config/useStore';

interface RequireAuthProps {
    children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
    const { user } = useStore();
    const location = useLocation();
    console.log(user)

    if (!user.isAuth) {
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        );
    }


    return children;
}
