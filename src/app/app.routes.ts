import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NosotrosComponent} from "./components/nosotros/nosotros.component";

export const routes: Routes = [
  {path: '',
    component: HomeComponent},
  {path: 'nosotros',
    component: NosotrosComponent}

];
