import { MainComponent } from './main.component';

// Guards
import { VerificaTokenGuard, LoginGuardGuard } from '../../services/service.index';

export const routingMAIN =
{
    path: 'main',
    component: MainComponent,
    canActivate: [VerificaTokenGuard, LoginGuardGuard],
}
