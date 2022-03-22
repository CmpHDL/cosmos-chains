import { Component } from '@angular/core';
import {Keplr} from "@keplr-wallet/types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cosmos-chains';
}

declare global {
  interface Window { keplr: Keplr; }
}
