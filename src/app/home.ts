import { Component } from '@angular/core';

import { copy } from './content';

@Component({
  selector: 'app-home',
  template: `<p>{{ copy.home.marker }}</p>`,
})
export class Home {
  protected readonly copy = copy;
}
