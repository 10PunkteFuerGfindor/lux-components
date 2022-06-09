import { ConsoleLogger } from "@angular/compiler-cli/ngcc";
import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ComponentsOverviewNavigationService } from './demo/components-overview/components-overview-navigation.service';
import { LuxAppFooterButtonService } from './modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxAppFooterLinkInfo } from './modules/lux-layout/lux-app-footer/lux-app-footer-link-info';
import { LuxAppFooterLinkService } from './modules/lux-layout/lux-app-footer/lux-app-footer-link.service';
import { LuxSnackbarService } from './modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { LuxThemeService } from './modules/lux-theme/lux-theme.service';
import { LuxAppService } from './modules/lux-util/lux-app.service';
import { LuxConsoleService } from "./modules/lux-util/lux-console.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Input() luxAppHeader: 'normal' | 'minimal' | 'none' = 'normal';
  @Input() luxAppFooter: 'normal' | 'minimal' | 'none' = 'normal';
  @Input() luxMode: 'stand-alone' | 'portal' = 'stand-alone';

  window = window;

  constructor(
    public router: Router,
    private linkService: LuxAppFooterLinkService,
    private buttonService: LuxAppFooterButtonService,
    private snackbarService: LuxSnackbarService,
    public navigationService: ComponentsOverviewNavigationService,
    private sanitizer: DomSanitizer,
    private themeService: LuxThemeService,
    private elementRef: ElementRef,
    private appService: LuxAppService
  ) {
    (window as any).pdfWorkerSrc = '/assets/pdf/pdf.worker.min.js';

    themeService.loadTheme();
    router.initialNavigation();

    this.appService.appEl = elementRef.nativeElement;
  }

  ngOnInit() {
    this.linkService.pushLinkInfos(
      new LuxAppFooterLinkInfo('Datenschutz', 'datenschutz', true),
      new LuxAppFooterLinkInfo('Impressum', 'impressum')
    );
  }

  onSideNavExpandedChange(expanded: boolean) {
    LuxConsoleService.LOG(`SideNav ${expanded ? 'opened' : 'closed'}`);
  }

  onChangeTheme(themeName: string) {
    this.themeService.setTheme(themeName);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToComponents() {
    this.router.navigate(['components-overview']);
  }

  goToMasterDetail() {
    this.router.navigate(['components-overview/example/master-detail']);
  }

  goToStepper() {
    this.router.navigate(['components-overview/example/stepper']);
  }

  goToTabs() {
    this.router.navigate(['components-overview/example/tabs']);
  }

  goToForm() {
    this.router.navigate(['form']);
  }

  goToConfig() {
    this.router.navigate(['configuration']);
  }

  goToBaseline() {
    this.router.navigate(['baseline']);
  }

  actionClicked(text: string) {
    this.snackbarService.open(2000, {
      text
    });
  }

  onModuleClicked(moduleName: string) {
    // den expanded zustand im service merken
    this.navigationService.currentModules.set(moduleName, !this.navigationService.currentModules.get(moduleName));
  }
}
