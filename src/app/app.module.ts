import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SuggestChainComponent } from './suggest-chain/suggest-chain.component';
import {ChainRegistryService} from "./shared/services/chain-registry.service";
import {HttpClient} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    SuggestChainComponent
  ],
    imports: [
        BrowserModule,
        SharedModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        MatButtonModule,
        MatProgressBarModule
    ],
  providers: [ChainRegistryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
