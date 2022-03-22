import { Pipe, PipeTransform } from '@angular/core';
import {ChainModel} from "../models/chain.model";

@Pipe({ name: 'chainFilter' })
export class ChainFilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of chains based on the search text provided
   *
   * @param chains list of chains to search
   * @param searchText search string
   * @returns list of chains filtered by search text or []
   */
  transform(chains: ChainModel[], searchText: string): any[] {
    if (!chains) {
      return [];
    }
    if (!searchText) {
      return chains;
    }
    searchText = searchText.toLocaleLowerCase();

    return chains.filter(chain => {
      let searchDomain: string[] = [];
      searchDomain.push(chain.chain_name);
      searchDomain.push(chain.chain_id);
      searchDomain.push(chain.pretty_name);
      chain.asset_list?.assets.forEach((asset) => {
        searchDomain.push(asset.name);
        searchDomain.push(asset.symbol);
      });

      return JSON.stringify(searchDomain).toLocaleLowerCase().includes(searchText);
    });
  }
}
