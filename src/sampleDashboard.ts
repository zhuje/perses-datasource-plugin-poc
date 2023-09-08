import { DashboardResource } from "@perses-dev/core";

export const sampleDashboard: DashboardResource = {
  kind: "Dashboard",
  metadata: {
    name: "Sample Dashboard",
    created_at: "",
    updated_at: "",
    project: "",
    version: 0,
  },
  spec: {
    datasources: {},
    duration: "1h",
    variables: [{ kind: "TextVariable", spec: { name: "job", value: "node" } }],
    panels: {
      TimeSeriesEx: {
        kind: "Panel",
        spec: {
          display: {
            name: "Time Series Panel Example",
            description: "Description text",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: { position: "bottom" },
              thresholds: {
                steps: [
                  {
                    name: "Alert: Critical condition example",
                    value: 0.5,
                    color: "red",
                  },
                ],
              },
              y_axis: {
                label: "Y Axis Label",
                unit: { kind: "Decimal", decimal_places: 1 },
              },
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'node_load1{instance=~"(demo.do.prometheus.io:9100)"}',
                    series_name_format: "job - {{job}}, {{env}} {{instance}}",
                  },
                },
              },
            },
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'node_load15{instance=~"(demo.do.prometheus.io:9100)"}',
                    series_name_format: "job - {{job}}, {{env}} {{instance}}",
                  },
                },
              },
            },
          ],
        },
      },
      GaugeEx: {
        kind: "Panel",
        spec: {
          display: { name: "Gauge Panel Example" },
          plugin: {
            kind: "GaugeChart",
            spec: {
              calculation: "LastNumber",

              thresholds: { steps: [{ value: 70 }, { value: 90 }] },
              unit: { kind: "Percent" },
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query: 'up{job=~"node|alertmanager"}',
                    series_name_format: "{{job}} {{env}} {{instance}}",
                  },
                },
              },
            },
          ],
        },
      },
      StatEx: {
        kind: "Panel",
        spec: {
          display: { name: "Stat Panel Example" },
          plugin: {
            kind: "StatChart",
            spec: {
              calculation: "Sum",
              unit: { kind: "Decimal" },
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query: 'up{job=~"node|alertmanager"}',
                    series_name_format: "{{job}} {{env}} {{instance}}",
                  },
                },
              },
            },
          ],
        },
      },
      ScatterEx: {
        kind: 'Panel',
        spec: {
          display: { name: 'Scatterplot Panel Example' },
          plugin: {
            kind: 'ScatterChart',
            spec: {
              query: {
                kind: 'TimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'PrometheusTimeSeriesQuery',
                    spec: {
                      query:
                        'avg without (cpu)(rate(node_cpu_seconds_total{job=~"node|alertmanager",instance="demo.do.prometheus.io:9100",mode=~"user|idle"}[30m]))',
                    },
                  },
                },
              },
              unit: { kind: 'Decimal' },
            },
          },
        },
      },
      TempoEx: {
        kind: 'Panel',
        spec: {
          display: { name: 'Tempo Panel Example' },
          plugin: {
            kind: 'TempoScatterChart',
            spec: {
              query: {
                kind: 'TempoTimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'TempoTimeSeriesQuery',
                    spec: {
                      query:
                        '{}',
                    },
                  },
                },
              },
            },
          },
        },
      },
  },
    layouts: [
      {
        kind: "Grid",
        spec: {
          display: { title: "Core Panel Plugins", collapse: { open: true } },
          items: [
            {
              x: 0,
              y: 0,
              width: 24,
              height: 8,
              content: {
                $ref: "#/spec/panels/TimeSeriesEx",
              },
            },
            {
              x: 0,
              y: 0,
              width: 16,
              height: 8,
              content: {
                $ref: "#/spec/panels/GaugeEx",
              },
            },
            {
              x: 16,
              y: 0,
              width: 8,
              height: 8,
              content: {
                $ref: "#/spec/panels/StatEx",
              },
            },
            {
              x: 0,
              y: 8,
              width: 8,
              height: 8,
              content: {
                $ref: "#/spec/panels/ScatterEx",
              },
            },
            {
              x: 8,
              y: 8,
              width: 8,
              height: 8,
              content: {
                $ref: "#/spec/panels/TempoEx",
              },
            },
          ],
        },
      },
    ],
  },
};
