import {Component, OnInit} from '@angular/core';
import {AppCurrency, ChainInfo, Currency} from "@keplr-wallet/types";
import {ChainRegistryService} from "../shared/services/chain-registry.service";
import {ChainModel, FeeToken} from "../shared/models/chain.model";
import {filter, map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-suggest-chain',
  templateUrl: './suggest-chain.component.html',
  styleUrls: ['./suggest-chain.component.css']
})
export class SuggestChainComponent implements OnInit {
  public registryChains!: ChainModel[];
  public isKeplrConnected: boolean = false;
  public keplrVersion: string | null = null;
  public search = "";

  constructor(private crs: ChainRegistryService) {
    crs.getRegistryChains().pipe(
     map((chains) => {
       return chains.filter((chain) => {
         return chain.chain_name.length > this.search.length;
       })
     })
    ).subscribe((chains) => {
      this.registryChains = chains;
      console.log(this.registryChains.length);
    });
  }


  ngOnInit(): void {
    this.isKeplrConnected = !!window.keplr;
    if (!window.keplr) {
      console.log("Keplr is not installed!");
    } else {
      this.keplrVersion = window.keplr.version
      console.log("Keplr is installed! Version: " + window.keplr.version);
    }

  }

  suggestChain(chainInfo: ChainInfo) {
    return window.keplr.experimentalSuggestChain(chainInfo).catch((res) => {
      console.log(res);
    });
  }

  onAddToKeplr(chain: ChainModel) {
    console.log(chain);
    void this.suggestChain(this.convertChainToChainInfo(chain));
  }

  convertChainToChainInfo(chain: ChainModel): ChainInfo {
    // @todo make these into models / interfaces

    let chainInfo = {
      chainId: chain.chain_id,
      chainName: chain.chain_name,
      // @todo confirm index and or use random index
      rpc: chain.apis.rpc[0].address,
      rest: chain.apis.rest[0].address,
      bip44: {
        coinType: 118,
      },
      bech32Config: {
        bech32PrefixAccAddr: chain.bech32_prefix,
        bech32PrefixAccPub: chain.bech32_prefix + "pub",
        bech32PrefixValAddr: chain.bech32_prefix + "valoper",
        bech32PrefixValPub: chain.bech32_prefix + "valoperpub",
        bech32PrefixConsAddr: chain.bech32_prefix + "valcons",
        bech32PrefixConsPub: chain.bech32_prefix + "valconspub",
      },
      currencies: <Currency[]>[],
      feeCurrencies: <Currency[]>[],
      stakeCurrency: <Currency>{},
      coinType: 118,
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    };

    chain.asset_list?.assets.forEach((asset) => {
      // TODO: check the indexes
      const coinDenom = asset.denom_units.filter((denom) => denom.exponent == 6)[0].denom;
      const coinMinimalDenom = asset.denom_units.filter((denom) => denom.exponent == 0)[0].denom;
      const currency = <Currency>{
        coinDenom: coinDenom,
        coinMinimalDenom: coinMinimalDenom,
        coinDecimals: 6,
        coinGeckoId: asset.coingecko_id,
      };

      chainInfo.currencies.push(currency);
      chainInfo.feeCurrencies.push(currency);
      chainInfo.stakeCurrency = currency;
    })


    return chainInfo;
  }
}
