/* eslint-disable max-len */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { LUX_FILE_PREVIEW_DATA } from '../lux-file-preview-config';
import { LuxFilePreviewRef } from '../lux-file-preview-ref';
import { LuxFilePreviewComponent } from '../lux-file-preview.component';
import { LuxFilePreviewService } from '../lux-file-preview.service';

import { LuxFilePreviewImgViewerComponent } from './lux-file-preview-imgviewer.component';

describe('LuxFilePreviewImgViewerComponent', () => {
  let component: LuxFilePreviewImgViewerComponent;
  let fixture: ComponentFixture<LuxFilePreviewImgViewerComponent>;
  const previewData = {
    fileComponent: null,
    fileObject: {
      name: 'eva.png',
      content:
        'data:image/png;base64,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',
      type: 'image/png'
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LuxFilePreviewImgViewerComponent, LuxFilePreviewComponent],
      imports: [OverlayModule, PortalModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        LuxFilePreviewService,
        { provide: LuxFilePreviewRef, useClass: MockLuxFilePreviewRef },
        { provide: LUX_FILE_PREVIEW_DATA, useValue: previewData }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [LuxFilePreviewComponent]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxFilePreviewImgViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockLuxFilePreviewRef {
  close() {
    console.log('Closed');
  }
}
