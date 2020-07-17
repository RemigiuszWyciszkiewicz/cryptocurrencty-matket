import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbLayoutModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';

import { LayoutComponent } from './layout/layout.component';

const PROVIDERS = [...NbThemeModule.forRoot().providers, ...NbSidebarModule.forRoot().providers];
@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [CommonModule, NbThemeModule, NbLayoutModule, NbSidebarModule],
})
export class LayoutModule {
  static providers = [PROVIDERS];
}
