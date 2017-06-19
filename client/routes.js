import { App } from './app';
import { DashboardRoute, LoginRoute, NotFoundRoute } from './pages';
import LoginForm from './pages/login/login.component';

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
