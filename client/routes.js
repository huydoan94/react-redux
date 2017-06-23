import { App } from './app';
import { LoginForm, DashboardRoute, LoginRoute, NotFoundRoute } from './pages';

export const AppRoute = {
    childRoutes: [
        {
            path: '/',
            component: App,
            indexRoute: {
                component: LoginForm
            },
            childRoutes: [
                LoginRoute,
                DashboardRoute,
                NotFoundRoute
            ]
        }
    ]
};
