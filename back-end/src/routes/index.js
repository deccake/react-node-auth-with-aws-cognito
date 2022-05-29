import { forgotPasswordRoute } from './forgotPasswordRoute';
import { getGoogleOauthCallbackRoute } from './getGoogleOauthCallbackRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { logInRoute } from './logInRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { signUpRoute } from './signUpRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    testRoute,
    signUpRoute,
    logInRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    getGoogleOauthUrlRoute,
    getGoogleOauthCallbackRoute
];
