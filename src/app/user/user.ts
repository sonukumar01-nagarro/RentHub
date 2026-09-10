import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { Login } from "./login/login";
import { Register } from './register/register';

@Component({
  selector: 'app-user',
  imports: [TabsModule, Login, Register],
  templateUrl: './user.html',
})
export class User {}
