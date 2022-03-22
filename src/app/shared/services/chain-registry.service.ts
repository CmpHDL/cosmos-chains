import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as JSZip from 'jszip';
import {ChainModel} from "../models/chain.model";
import {delay, Observable, switchMap, take} from 'rxjs';
import {AssetListModel} from "../models/asset-list.model";

// @todo browser will throw cors error
const registryZipUrl = "https://github.com/cosmos/chain-registry/archive/refs/heads/master.zip";

@Injectable()
export class ChainRegistryService {
  constructor(private http: HttpClient) {}

  downloadFile(filename: string) {
    return this.http.get(filename, {
      responseType: 'arraybuffer',
    });
  }

  parseRegistryZip(data: Blob): Promise<ChainModel[]> {
    return JSZip.loadAsync(data).then(async (zip) => {
      let chains: ChainModel[] = [];
      const objKeys = Object.keys(zip.files);
      for (const filename1 of objKeys
        .filter((filename) => filename.endsWith("chain.json"))) {
        await zip.files[filename1].async('string').then(async (chainData) => {
          let chain: ChainModel = JSON.parse(chainData);

          for (const filename2 of objKeys
            .filter((filename) => filename.endsWith("assetlist.json"))) {
             zip.files[filename2].async('string').then((assetList) => {
              let list: AssetListModel = JSON.parse(assetList);

              if (list.chain_id == chain.chain_id) {
                // Ensure chain has assets
                if (list.assets.length > 0) {
                  chain.asset_list = list;
                  chains.push(chain);
                }
              }
            });
          }
        });
      }

      return chains.sort((a, b) => {
        return a.asset_list!.assets!.length > b.asset_list!.assets!.length ? -1 : 1;
      });
    });
  }

  getRegistryChains(): Observable<ChainModel[]> {
   return this.downloadFile(registryZipUrl).pipe(
     take(1),
     switchMap((data) => {
       return this.parseRegistryZip(new Blob([data], {
         type: 'application/zip'
       }))
     })
   )
  }
}
