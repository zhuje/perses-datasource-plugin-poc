import { useTimeSeriesQuery, PanelPlugin } from '@perses-dev/plugin-system';
import { TimeSeriesQueryDefinition } from '@perses-dev/core';


/**
 * The Options object type supported by the TempoScatterChart panel plugin.
 */
export interface TempoSpec {
  query: string;
}

/**
 * Creates the initial/empty options for a TempoScatterChart panel.
 */
export function createInitialScatterChartOptions(): ScatterChartOptions {
  return {
    query: {
      kind: 'TimeSeriesQuery',
      spec: {
        plugin: {
          kind: 'PrometheusTimeSeriesQuery',
          spec: {
            query: 'up',
          },
        },
      },
    },
  };
}


/**
//  * The core Tempo Test panel plugin for Perses.
//  */
// export const TempoScatterChart: PanelPlugin<TempoSpec> = {
//   PanelComponent: TempoScatterChartPanel,
//   // JZ NOTE: Prop suggested by Chronosphere team -- this allows the Panels to be aware of which query type is supported 
//   // supportedQueryInterfaces?: Array<'TimeSeriesQuery' | 'LogQuery' | 'TraceQuery'>;
//   createInitialOptions: createInitialScatterChartOptions,
// };


interface TempoQueryDefinition  extends TimeSeriesQueryDefinition {

}

/**
 * The core Tempo Test panel plugin for Perses.
 */
export function TempoScatterChartPanel() {

  // JZ NOTE: can we reuse useTimeSeriesQuery for this?
  const { data, isLoading, error } = useTimeSeriesQuery(query);

  console.warn("TempoScatterChartPanel data, isloading, error : ", data, "\n", isLoading,  "\n", error);


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
 * The core ScatterChart panel plugin for Perses.
 */
export const TempoScatterChart: PanelPlugin<ScatterChartOptions> = {
  PanelComponent: TempoScatterChartPanel,
  // JZ NOTE: we'll need to update this in @perse-dev/<
  // supportedQueryTypes: TraceQL
  createInitialOptions: createInitialScatterChartOptions,
};

