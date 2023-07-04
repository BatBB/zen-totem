import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'core/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('app/home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
    },
    {
        path: 'inventory',
        loadChildren: () => import('./inventory/inventory.module').then((m) => m.InventoryModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
    },
    {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
    },
    {
        path: 'billing',
        loadChildren: () => import('./billing/billing.module').then((m) => m.BillingModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
