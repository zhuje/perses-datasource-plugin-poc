export * from './components/TempoScatterChart';


import { PrometheusTimeSeriesQuery } from './plugins/prometheus-time-series-query';
import { PrometheusDatasource } from './plugins/prometheus-datasource';

// Export plugins under the same name as the kinds they handle from the plugin.json
export {
  PrometheusTimeSeriesQuery,
  PrometheusDatasource,
};

