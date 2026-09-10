import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  imports: [ProgressSpinnerModule],
  template: `
    <div class="flex justify-center items-center h-[calc(100dvh-64px-40px-32px-64px)]">
      <p-progress-spinner ariaLabel="loading" />
    </div>
  `,
  styles: ``,
})
export class Loading {}
