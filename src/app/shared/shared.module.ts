import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChainRegistryService} from "./services/chain-registry.service";
import {HttpClientModule} from "@angular/common/http";
import { NetworkBlockComponent } from './components/network-block/network-block.component';
import {MatButtonModule} from "@angular/material/button";
import {ChainFilterPipe} from "./pipes/filter.pipe";



@NgModule({
  declarations: [
    ChainFilterPipe,
    NetworkBlockComponent
  ],
  imports: [
      CommonModule,
      HttpClientModule,
      MatButtonModule,
  ],
  exports: [
    NetworkBlockComponent,
    ChainFilterPipe
  ],
  providers: [
    ChainRegistryService
  ]

})
export class SharedModule { }
