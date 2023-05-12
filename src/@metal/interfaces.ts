import { MetalData } from '@lib/metal-data';
import { MetalExportHeaders } from '@mtl/components/metal-query-export/metal-query-export.component';

export interface MetalExtendedConfig {
  index?: string;
  csvHeaders?: MetalExportHeaders<any>;
}

export interface MetalExtendedMeta {
  indexed?: number;
}

export interface MetalExtendedOptions {
  noindex?: boolean;
}

export interface MetalExtendedParams {
  include?: string;
}

export interface MetalSettings {
  enabled?: boolean;
  enabledGlobally?: boolean;
  memoryCache?: boolean;
  persistentCache?: boolean;
  serverCache?: boolean;

  realtimeEvents?: boolean;
  slowNetworkSimulation?: boolean;
}

export interface MetalAPIData extends MetalData {
  created_at?: Date | string;
  updated_at?: Date | string;
}
