import { GlobalDatasource } from "@perses-dev/core";
import { DatasourceStoreProviderProps } from "@perses-dev/dashboards";

export function useDatasourceApi(): DatasourceStoreProviderProps["datasourceApi"] {
  return {
    getDatasource: async (/*project, selector*/) => {
      return undefined;
    },
    getGlobalDatasource: async (selector) => {
      if (selector.kind === "PrometheusDatasource") {
        return {
          resource: datasource,
          proxyUrl: "",
        };
      }
      if (selector.kind === "TempoDatasource") {
        return {
          resource: tempoDatasource,
          proxyUrl: "",
        }
      }
      return undefined;
    },
    listDatasources: async (/*project, pluginKind*/) => {
      return [];
    },
    listGlobalDatasources: async (pluginKind) => {
      if (pluginKind === datasource.spec.plugin.kind) {
        return [datasource];
      }
      if (pluginKind === tempoDatasource.spec.plugin.kind) {
        return [tempoDatasource];
      }
      return [];
    },
  };
}

const datasource: GlobalDatasource = {
  kind: "GlobalDatasource",
  metadata: {
    name: "PrometheusDemo",
    created_at: "",
    updated_at: "",
    version: 0,
  },
  spec: {
    default: true,
    display: {
      name: "Prometheus Demo",
    },
    plugin: {
      kind: "PrometheusDatasource",
      spec: {
        direct_url: "https://prometheus.demo.do.prometheus.io",
      },
    },
  },
};

const tempoDatasource: GlobalDatasource = {
  kind: "GlobalDatasource",
  metadata: {
    name: "Tempo Demo",
    created_at: "",
    updated_at: "",
    version: 0,
  },
  spec: {
    default: true,
    display: {
      name: "Tempo Demo",
    },
    plugin: {
      kind: "TempoDatasource",
      spec: {
        // must have a tempo instance running locally -- use docker-compose example : 
        // https://github.com/grafana/tempo/blob/main/example/docker-compose/local/readme.md
        direct_url: "http://localhost:3000/api/datasources/proxy/uid/tempo/",
      },
    },
  },
};

