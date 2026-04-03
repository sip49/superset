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
import { t } from '@apache-superset/core/translation';
import { validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  dndGroupByControl,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'source',
            config: {
              ...dndGroupByControl,
              label: t('Source'),
              multi: false,
              description: t(
                'The column to be used as the source of the edge.',
              ),
              validators: [validateNonEmpty],
              freeForm: false,
            },
          },
        ],
        [
          {
            name: 'target',
            config: {
              ...dndGroupByControl,
              label: t('Target'),
              multi: false,
              description: t(
                'The column to be used as the target of the edge.',
              ),
              validators: [validateNonEmpty],
              freeForm: false,
            },
          },
        ],
        ['metric'],
        ['adhoc_filters'],
        ['row_limit'],
        ['sort_by_metric'],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['color_scheme'],
        [
          {
            name: 'orient',
            config: {
              type: 'SelectControl',
              label: t('Orientation'),
              description: t('Layout direction of the Sankey chart.'),
              default: 'horizontal',
              renderTrigger: true,
              choices: [
                ['horizontal', t('Horizontal')],
                ['vertical', t('Vertical')],
              ],
            },
          },
        ],
        [
          {
            name: 'node_align',
            config: {
              type: 'SelectControl',
              label: t('Node alignment'),
              description: t(
                'How nodes are aligned in the chart. "Justify" spreads nodes to use the full width, "Left" aligns source nodes to the left, and "Right" aligns target nodes to the right.',
              ),
              default: 'justify',
              renderTrigger: true,
              choices: [
                ['justify', t('Justify')],
                ['left', t('Left')],
                ['right', t('Right')],
              ],
            },
          },
        ],
        [
          {
            name: 'node_width',
            config: {
              type: 'SliderControl',
              label: t('Node width'),
              description: t('Width of each node rectangle in pixels.'),
              default: 20,
              renderTrigger: true,
              min: 4,
              max: 60,
              step: 1,
            },
          },
        ],
        [
          {
            name: 'node_gap',
            config: {
              type: 'SliderControl',
              label: t('Node gap'),
              description: t(
                'Gap between nodes in the same column, in pixels.',
              ),
              default: 8,
              renderTrigger: true,
              min: 0,
              max: 60,
              step: 1,
            },
          },
        ],
        [
          {
            name: 'link_opacity',
            config: {
              type: 'SliderControl',
              label: t('Link opacity'),
              description: t(
                'Opacity of the flow links, 0 means fully transparent, 1 means fully opaque.',
              ),
              default: 0.2,
              renderTrigger: true,
              min: 0,
              max: 1,
              step: 0.1,
            },
          },
        ],
        [
          {
            name: 'draggable',
            config: {
              type: 'CheckboxControl',
              label: t('Draggable nodes'),
              description: t(
                'Whether nodes can be dragged to adjust their position.',
              ),
              default: true,
              renderTrigger: true,
            },
          },
        ],
      ],
    },
  ],
};

export default config;
