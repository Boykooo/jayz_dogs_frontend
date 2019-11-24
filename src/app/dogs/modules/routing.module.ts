import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CuratorComponent } from '../components/curator/curator.component';
import { DogComponent } from '../components/dog/dog/dog.component';
import { DogListComponent } from '../components/dog/dog-list/dog-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'curator'
  },
  {
    path: 'curator',
    component: CuratorComponent,
  },
  {
    path: 'curator/:id/dogs',
    component: DogListComponent,
  },
  {
    path: 'curator/:id/dogs/:dogId',
    component: DogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
