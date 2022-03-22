import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChainModel} from "../../models/chain.model";


@Component({
  selector: 'app-network-block',
  templateUrl: './network-block.component.html',
  styleUrls: ['./network-block.component.css']
})
export class NetworkBlockComponent implements OnInit {
  @Input() chain: ChainModel | null = null;

  // TODO: change to the chain
  @Output() addChain = new EventEmitter<ChainModel>();

  constructor() {}

  ngOnInit(): void {
    // console.log(this.chain);
  }

  onAddChainClick(chain: ChainModel) {
    this.addChain.emit(chain);
  }

  isChainLive(): boolean {
    return this.chain?.status == "live";
  }

  isChainKilled(): boolean {
    return this.chain?.status == "killed";
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/not-found-coin.png';
  }
}
