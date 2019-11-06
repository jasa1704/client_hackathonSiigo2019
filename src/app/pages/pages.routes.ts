import { FullLayoutComponent } from '../containers';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { BillComponent } from './bill/bill.component';

// Guards
import { VerificaTokenGuard, LoginGuardGuard } from '../services/service.index';

export const routingPages =
{
  path: 'siigo',
  component: FullLayoutComponent,
  canActivate: [ VerificaTokenGuard, LoginGuardGuard],
  children:[
    {
      path: 'client',
      component: ClientComponent,
      data: { titulo: 'Clientes' },
    },
    {
      path: 'product',
      component: ProductComponent,
      data: { titulo: 'Productos' },
    },
    {
      path: 'bill',
      component: BillComponent,
      data: { titulo: 'Facturas' },
    }
  ]
}
