import {App} from './app';
import {AboutRoute, Dashboard, DashboardRoute, Login, LoginRoute, NotFoundRoute} from './pages';

export const AppRoute = {
    childRoutes: [
        {
            path: '/',
            component: App,
            indexRoute: {
                component: Dashboard
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
