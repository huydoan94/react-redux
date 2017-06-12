import {App} from './app';
import {AboutRoute, Dashboard, DashboardRoute, Login, LoginRoute, NotFoundRoute} from './pages';

export const AppRoute = {
    childRoutes: [
        {
            path: '/',
            component: App,
            indexRoute: {
                component: Login
            },
            childRoutes: [
                LoginRoute,
                DashboardRoute,
                AboutRoute,
                NotFoundRoute
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/dashboard',
            component: Dashboard
        }
    ]
};
