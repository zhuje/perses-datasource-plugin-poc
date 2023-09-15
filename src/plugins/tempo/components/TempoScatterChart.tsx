import { PanelPlugin, useDataQueries, useDatasourceClient } from '@perses-dev/plugin-system';
import { TimeSeriesQueryDefinition } from '@perses-dev/core';
import { useDatasourceStore } from '@perses-dev/plugin-system';
import { TempoDatasource } from '../tempo-datasource';
import { usePlugin } from '@perses-dev/plugin-system';
import { TimeSeriesQueryPlugin } from '@perses-dev/plugin-system';
import { TempoClient } from '../model/tempo-client';
import { DatasourceSelector } from '@perses-dev/core';
import { TimeSeriesData } from '@perses-dev/core';
import { TimeSeries } from '@perses-dev/core';
import { useListDatasources } from '@perses-dev/plugin-system';

/**
 * The Options object type supported by the TempoScatterChart panel plugin.
 */
export interface TempoSpec {
  query: string;
}

/**
 * The core Tempo Test panel plugin for Perses.
 */
export function TempoScatterChartPanel() {

// JZ NOTE: verified that PluginRegistry/PluginProvider is working 
function testPluginRegistry() {

  // JZ NOTE: will need to change this to TempoQuery eventually
  // supported PluginTypes are : TimeSeriesQuery, Variable, Datasource, Panel 
  // kind: we can customize 
  const pluginType = 'TimeSeriesQuery' 
  const kind = 'TempoQuery'
  // const kind = 'PrometheusTimeSeriesquery'

  const { data: plugin } = usePlugin(pluginType, kind)
  console.log("JZ plugin: ", plugin)
}
testPluginRegistry();

// JZ NOTE: Test <DatasourceStoreProvider> is working correctly 
function testDatasourceStoreProvider() {
  const datasourceStore = useDatasourceStore();
  console.log("JZ datasource store: , ", datasourceStore);

  const { data, isLoading } = useListDatasources("TempoDatasource");
  console.log("JZ useListDatasources('TempoDatasource'): ",  data, isLoading) 


  const datasourceSelector = {
    kind: "TempoDatasource"
  }
  const datasourceClient = useDatasourceClient(datasourceSelector);
  console.log("JZ datasourceClient : ", datasourceClient);
}
testDatasourceStoreProvider();


// JZ NOTE: Test Andreas' Tempo Client still works 
const tempoStubClient = TempoDatasource.createClient(
  {
    direct_url: "http://localhost:3000/api/datasources/proxy/uid/tempo/",
  },
  {}
)
const testStubTempoClient = (query:string = '{}') => {
  (async () => {
    await tempoStubClient.searchTraces(query).then((response) => 
    console.log("JZ Tempo Repsonse: ", response)
    )
  })();
};
testStubTempoClient();


// JZ TODO: need to modify DataQueriesProvider to include filtering for Trace Components 
// ...create a custom DataQueriesProvider in Patternfly/components/

















  

  // JZ NOTE: Test that Panel is able to render 
  return (
    <div>
      <h1> hello world </h1>
    </div>
  
  ) 
};



export interface ScatterChartOptions {
  query: TimeSeriesQueryDefinition;
}


/**
 * Creates the initial/empty options for a TempoScatterChart panel.
 * // JZ NOTES: queryKind: TraceQuery, spec.plugin: TempoQuery
 * // JZ NOTES: queryKind: TimesSeriesQuery, spec.plugin: PrometheusTimeSeriesQuery
 */
export function createInitialScatterChartOptions(): ScatterChartOptions {
  return {
    query: {
      kind: 'TimeSeriesQuery', // JZ NOTES: Need to eventually change this to a TraceQuery
      spec: {
        plugin: {
          kind: 'TempoQuery',
          spec: {
            query: '{}',
          },
        },
      },
    },
  };
}

/**
 * The core ScatterChart panel plugin for Perses.
 */
export const TempoScatterChart: PanelPlugin<ScatterChartOptions> = {
  PanelComponent: TempoScatterChartPanel,
  // JZ NOTE: we'll need to update this in @perse-dev/<
  // supportedQueryTypes: TraceQL
  createInitialOptions: createInitialScatterChartOptions,
};

