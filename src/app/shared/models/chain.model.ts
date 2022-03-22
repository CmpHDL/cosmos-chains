import {AssetListModel} from "./asset-list.model";

export interface ChainModel {
  $schema:       string;
  chain_name:    string;
  status:        string;
  network_type:  string;
  pretty_name:   string;
  chain_id:      string;
  bech32_prefix: string;
  daemon_name:   string;
  node_home:     string;
  genesis:       Genesis;
  key_algos:     string[];
  slip44:        number;
  fees:          Fees;
  codebase:      Codebase;
  peers:         Peers;
  apis:          Apis;
  explorers:     Explorer[];

  asset_list: AssetListModel | null;
}

export interface Apis {
  rpc:  REST[];
  rest: REST[];
}

export interface REST {
  address:  string;
  provider: string;
}

export interface Codebase {
  git_repo:            string;
  recommended_version: string;
  compatible_versions: string[];
  binaries:            Binaries;
}

export interface Binaries {
  "linux/amd64":   string;
  "linux/arm64":   string;
  "darwin/amd64":  string;
  "windows/amd64": string;
}

export interface Explorer {
  kind:    string;
  url:     string;
  tx_page: string;
}

export interface Fees {
  fee_tokens: FeeToken[];
}

export interface FeeToken {
  denom:               string;
  fixed_min_gas_price: number;
}

export interface Genesis {
  genesis_url: string;
}

export interface Peers {
  seeds:            PersistentPeer[];
  persistent_peers: PersistentPeer[];
}

export interface PersistentPeer {
  id:       string;
  address:  string;
  provider: string;
}
