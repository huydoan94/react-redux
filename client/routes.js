import {App} from './app';
import {AboutRoute, Dashboard, DashboardRoute, LoginForm, LoginRoute, NotFoundRoute} from './pages';

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
            component: LoginForm
        },
        {
            path: '/dashboard',
            component: Dashboard
        }
    ]
};
