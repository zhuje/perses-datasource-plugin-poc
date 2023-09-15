



// /**
//  * Runs a traceQL query using a plugin and returns the results.
//  */
// export function useTempoQuery(query:string) {

//     // JZ NOTES: will need to change this to TempoQuery eventually
//     // supported PluginTypes are : TimeSeriesQuery, Variable, Datasource, Panel 
//     // kind: we can customize 
//     const pluginType = 'TimeSeriesQuery' 
//     const kind = 'TempoQuery'

    
//     // usePlugin: Loads a list of plugins and returns the plugin implementation, along with loading/error state.
//     const { data: plugin } = usePlugin(pluginType, kind);
// }

const getHelloWorld = () => {
    return 'HelloWorld'
}


/**
 * The core Prometheus TimeSeriesQuery plugin for Perses.
 */
export const TempoQuery = {
  // getTimeSeriesData,
  // getTempoData,
  getHelloWorld, 
  createInitialOptions: () => ({
    query: '{}',
    datasource: undefined,
  }),
};
