import { useRoutes} from 'react-router-dom';

import { publicRoutes } from './public';

import { protectedRoutes } from './protected';


export const AppRoutes = () => {

    const element= useRoutes([...publicRoutes, ...protectedRoutes]);

    return <>{element}</>;
};


