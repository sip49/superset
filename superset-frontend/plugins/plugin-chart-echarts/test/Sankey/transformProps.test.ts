/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { ChartProps } from '@superset-ui/core';
import { supersetTheme } from '@apache-superset/core/theme';
import transformProps from '../../src/Sankey/transformProps';
import { SankeyChartProps } from '../../src/Sankey/types';

const formData = {
  colorScheme: 'bnbColors',
  datasource: '3__table',
  granularity_sqla: 'ds',
  metric: 'sum__num',
  source: 'src',
  target: 'tgt',
};

const queriesData = [
  {
    data: [
      { src: 'A', tgt: 'B', sum__num: 10 },
      { src: 'B', tgt: 'C', sum__num: 5 },
    ],
  },
];

describe('Sankey transformProps', () => {
  test('should transform chart props for viz', () => {
    const chartProps = new ChartProps({
      formData,
      width: 800,
      height: 600,
      queriesData,
      theme: supersetTheme,
    });
    expect(transformProps(chartProps as SankeyChartProps)).toEqual(
      expect.objectContaining({
        width: 800,
        height: 600,
        echartOptions: expect.objectContaining({
          series: expect.objectContaining({
            type: 'sankey',
            links: [
              { source: 'A', target: 'B', value: 10 },
              { source: 'B', target: 'C', value: 5 },
            ],
          }),
        }),
      }),
    );
  });

  test('should apply default values for all series options', () => {
    const chartProps = new ChartProps({
      formData,
      width: 800,
      height: 600,
      queriesData,
      theme: supersetTheme,
    });
    const { echartOptions } = transformProps(chartProps as SankeyChartProps);
    const series = echartOptions.series as Record<string, unknown>;
    expect(series.nodeAlign).toEqual('justify');
    expect(series.orient).toEqual('horizontal');
    expect(series.nodeWidth).toEqual(20);
    expect(series.nodeGap).toEqual(8);
    expect(series.draggable).toEqual(true);
    expect((series.lineStyle as Record<string, unknown>).opacity).toEqual(0.2);
  });

  test('should pass nodeAlign to echarts series', () => {
    const chartProps = new ChartProps({
      formData: { ...formData, nodeAlign: 'left' },
      width: 800,
      height: 600,
      queriesData,
      theme: supersetTheme,
    });
    const { echartOptions } = transformProps(chartProps as SankeyChartProps);
    expect(
      (echartOptions.series as Record<string, unknown>).nodeAlign,
    ).toEqual('left');
  });

  test('should pass orient to echarts series', () => {
    const chartProps = new ChartProps({
      formData: { ...formData, orient: 'vertical' },
      width: 800,
      height: 600,
      queriesData,
      theme: supersetTheme,
    });
    const { echartOptions } = transformProps(chartProps as SankeyChartProps);
    expect(
      (echartOptions.series as Record<string, unknown>).orient,
    ).toEqual('vertical');
  });

  test('should pass nodeWidth and nodeGap to echarts series', () => {
    const chartProps = new ChartProps({
      formData: { ...formData, nodeWidth: 30, nodeGap: 16 },
      width: 800,
      height: 600,
      queriesData,
      theme: supersetTheme,
    });
    const { echartOptions } = transformProps(chartProps as SankeyChartProps);
    const series = echartOptions.series as Record<string, unknown>;
    expect(series.nodeWidth).toEqual(30);
    expect(series.nodeGap).toEqual(16);
  });

  test('should pass linkOpacity to lineStyle in echarts series', () => {
    const chartProps = new ChartProps({
      formData: { ...formData, linkOpacity: 0.5 },
      width: 800,
      height: 600,
      queriesData,
      theme: supersetTheme,
    });
    const { echartOptions } = transformProps(chartProps as SankeyChartProps);
    expect(
      (
        (echartOptions.series as Record<string, unknown>)
          .lineStyle as Record<string, unknown>
      ).opacity,
    ).toEqual(0.5);
  });

  test('should pass draggable to echarts series', () => {
    const chartProps = new ChartProps({
      formData: { ...formData, draggable: false },
      width: 800,
      height: 600,
      queriesData,
      theme: supersetTheme,
    });
    const { echartOptions } = transformProps(chartProps as SankeyChartProps);
    expect(
      (echartOptions.series as Record<string, unknown>).draggable,
    ).toEqual(false);
  });
});
