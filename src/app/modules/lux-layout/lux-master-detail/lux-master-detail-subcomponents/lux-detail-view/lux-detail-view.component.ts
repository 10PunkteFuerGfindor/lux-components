import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'lux-detail-view',
  template: ''
})
export class LuxDetailViewComponent {
  @ContentChild(TemplateRef) tempRef: TemplateRef<any>;

  constructor() {}
}
