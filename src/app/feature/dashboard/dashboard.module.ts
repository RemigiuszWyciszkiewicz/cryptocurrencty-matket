import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetsModule } from '@coin-market/data-access/assets';
import { ChartsModule as ChartsModuleDataAccess } from '@coin-market/data-access/charts';
import { CryptocurrenciesModule } from '@coin-market/data-access/cryptocurrencies';
import { RankingModule } from '@coin-market/data-access/ranking';
import { TransactionsModule as TransactionsModuleDataAccess } from '@coin-market/data-access/transactions';
import { CardModule } from '@coin-market/ui/card';
import { ChartsModule } from '@coin-market/ui/charts';
import { LabelModule } from '@coin-market/ui/label';
import { LoaderModule } from '@coin-market/ui/loader';
import { ThemeDirectivesModule } from '@coin-market/utils/directives';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AssetItemComponent } from './dashboard/asset-item/asset-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioSummaryComponent } from './dashboard/portfolio-summary/portfolio-summary.component';
import { TransactionsListWidgetComponent } from './dashboard/transactions-list-widget/transactions-list-widget.component';
import { UserRankWidgetComponent } from './dashboard/user-rank-widget/user-rank-widget.component';

const COMPONENTS = [
  DashboardComponent,
  UserRankWidgetComponent,
  TransactionsListWidgetComponent,
  PortfolioSummaryComponent,
  AssetItemComponent,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    CryptocurrenciesModule,
    AssetsModule,
    ChartsModuleDataAccess,
    TransactionsModuleDataAccess,
    RankingModule,
    LoaderModule,
    CardModule,
    LabelModule,
    ThemeDirectivesModule,
  ],
})
export class DashboardModule {}
