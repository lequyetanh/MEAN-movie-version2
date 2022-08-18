import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './content/index/index.component';
import { SearchComponent } from './content/search/search.component';
import { DetailmovieComponent } from './content/detailmovie/detailmovie.component';
import { FilterComponent } from './content/filter/filter.component';
import { AllmovieComponent } from './content/allmovie/allmovie.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EditComponent } from './admin/edit/edit.component';
import { CreateComponent } from './admin/create/create.component';
import { WatchmovieComponent } from './content/watchmovie/watchmovie.component';
import { AdminComponent } from './admin/admin.component';
import { CallComponent } from './call/call.component';
import { AboutComponent } from './about/about.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DonateComponent } from './user/donate/donate.component';
import { CollectionComponent } from './user/collection/collection.component';
import { PaginationComponent } from './content/common/pagination/pagination.component';
const routes: Routes = [
  {path: '', redirectTo: '/movie', pathMatch: 'full'},
  {path: 'movie', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'call', component: CallComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'about', component: AboutComponent},
  {path: 'detailmovie/:id', component: DetailmovieComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'create', component: CreateComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'movietype/:type', component: AllmovieComponent,
  children: [
    { path: ':year', component: AllmovieComponent },
  ] },
  {path: 'search/:name', component: SearchComponent},
  {path: 'watchmovie/:id', component: WatchmovieComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'donate', component: DonateComponent},
  {path: 'collection', component: CollectionComponent},
  {path: 'pagination', component: PaginationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
