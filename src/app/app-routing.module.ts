import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'sign-up', loadChildren: () => import('./page/sign-up/sign-up.module').then(m => m.SignUpPageModule)},
  {
    path: 'board-list',
    loadChildren: () => import('./page/board-list/board-list.module').then( m => m.BoardListPageModule)
  },
  {
    path: 'board-detail/:idx',
    loadChildren: () => import('./page/board-detail/board-detail.module').then( m => m.BoardDetailPageModule)
  },
  {
    path: 'board-create',
    loadChildren: () => import('./page/board-create/board-create.module').then( m => m.BoardCreatePageModule)
  },
  {
    path: 'board-modify/:idxs',
    loadChildren: () => import('./page/board-modify/board-modify.module').then( m => m.BoardModifyPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
