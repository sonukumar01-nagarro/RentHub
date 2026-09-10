import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  template: `
    <div class="flex justify-center items-center h-[calc(100dvh-64px-40px-32px-64px)]">
      <img src="images/error.png" alt="error" />
    </div>
  `,
  styles: ``,
})
export class Error {}
