import { Routes } from '@angular/router';

import { Home } from './home';
import { Tokens } from './tokens';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'tokens', component: Tokens },
];
