import {RouterModule, Routes} from '@angular/router';
import * as CONST from '../core/constants';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';
import {AdminGuard} from "../shared/roles/admin.guard";

const routes: Routes = [
  {path: '', redirectTo: CONST.frontendUrl.AUTH, pathMatch: 'full'},
  {
    path: CONST.frontendUrl.DASHBOARD,
    canActivate: [AdminGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: CONST.frontendUrl.USER_MANAGER,
    canActivate: [AdminGuard],
    loadChildren: () => import('./user/User.module').then(m => m.UserModule)
  },
  {path: CONST.frontendUrl.AUTH, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: CONST.frontendUrl.NOT_FOUND, component: NotFoundComponent}
];
export const AppRoutes = RouterModule.forRoot(routes);
