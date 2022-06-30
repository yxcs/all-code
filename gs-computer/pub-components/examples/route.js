import commonLayout from './components/commonLayout'
import mpLayout from './components/mpLayout'
import codeLayout from './components/codeLayout'
import HomePage from './views/home'

import Install from './docs/guide/install/install.md'
import QuikeStart from './docs/guide/start/quikeStart.md'
import GuideCodeRule from './docs/guide/rules/codeRule.md'
import Button from './docs/components/button/button.md'
import Checkbox from './docs/components/checkbox/checkbox.md'
import CascadeTree from './docs/components/tree/cascade-tree.md'
import Convention from './docs/code/rules/convention.md'
import CodeStart from './docs/code/start/start.md'
import ComponentUpdate from './docs/code/update/update.md'
import InputDir from './docs/directives/input/auto-foucs.md'
import DateFilter from './docs/filters/date/date-filters.md'
import onlyNumDir from './docs/directives/input/only-num.md'
import multipleSpaceDir from './docs/directives/input/multiple-space.md'
import strFilters from './docs/filters/string/str-filters.md'
// 图表路由
import chartsIntroduce from './docs/charts/introduce.md'
import chartsLine from './docs/charts/line.md'
import chartsHistogram from './docs/charts/histogram.md'
import chartsBar from './docs/charts/bar.md'
import chartsCandle from './docs/charts/candle.md'
import chartsFunnel from './docs/charts/funnel.md'
import chartsGauge from './docs/charts/gauge.md'
import chartsHeatmap from './docs/charts/heatmap.md'
import chartMap from './docs/charts/map.md'
import chartsPie from './docs/charts/pie.md'
import chartsRadar from './docs/charts/radar.md'
import chartsRing from './docs/charts/ring.md'
import chartsSankey from './docs/charts/sankey.md'
import chartsScatter from './docs/charts/scatter.md'
import chartsTree from './docs/charts/tree.md'
import chartsWaterfall from './docs/charts/waterfall.md'
import chartsLiquidfill from './docs/charts/liquidfill.md'
import chartsWordcloud from './docs/charts/wordcloud.md'
import chartsEvents from './docs/charts/events.md'
import chartsThirdMap from './docs/charts/thirdMap.md'

import editorIndex from './docs/components/editor/index.md'
import arkTable from './docs/components/table/ark-table.md'
import magnifier from './docs/components/magnifier/index.md'
import slideCheckIndex from './docs/components/slideCheck/slide-check.md'
import imgLabel from './docs/components/imgLabel/imgLabel.md'

import mpStart from './docs/mp/start.md'

const routes = [
  {
    path: '/',
    name: 'home_page',
    component: HomePage
  }, {
    path: '/guide',
    name: 'guide_page',
    component: commonLayout,
    children: [
      {
        path: '/guide/start',
        name: 'guide_start',
        component: QuikeStart
      },
      {
        path: '/guide/install',
        name: 'guide_install',
        component: Install
      }, {
        path: '/guide/coderule',
        name: 'guide_coderule',
        component: GuideCodeRule
      }
    ]
  }, {
    path: '/components',
    name: 'components_page',
    component: commonLayout,
    children: [
      {
        path: '/components/button',
        name: 'components_button',
        component: Button
      },
      {
        path: '/components/checkbox',
        name: 'components_checkbox',
        component: Checkbox
      },
      {
        path: '/components/tree/cascadeTree',
        name: 'components_tree',
        component: CascadeTree
      },
      {
        path: '/components/editor/index',
        name: 'components_editor_index',
        component: editorIndex
      },
      {
        path: '/components/table/ark-table',
        name: 'components_table_ark-table',
        component: arkTable
      },
      {
        path: '/components/magnifier/index',
        name: 'components_magnifier_index',
        component: magnifier
      },
      {
        path: '/components/slidecheck/index',
        name: 'components_slidecheck_index',
        component: slideCheckIndex
      },
      {
        path: '/components/imagelabel/index',
        name: 'components_imagelabel_index',
        component: imgLabel
      }
    ]
  }, {
    path: '/charts',
    name: 'charts_page',
    component: commonLayout,
    children: [
      {
        path: '/charts/introduce',
        name: 'charts_introduce',
        component: chartsIntroduce
      }, {
        path: '/charts/line',
        name: 'charts_line',
        component: chartsLine
      }, {
        path: '/charts/histogram',
        name: 'charts_histogram',
        component: chartsHistogram
      }, {
        path: '/charts/bar',
        name: 'charts_bar',
        component: chartsBar
      }, {
        path: '/charts/candle',
        name: 'charts_candle',
        component: chartsCandle
      }, {
        path: '/charts/funnel',
        name: 'charts_funnel',
        component: chartsFunnel
      }, {
        path: '/charts/gauge',
        name: 'charts_gauge',
        component: chartsGauge
      }, {
        path: '/charts/heatmap',
        name: 'charts_heatmap',
        component: chartsHeatmap
      }, {
        path: '/charts/pie',
        name: 'charts_pie',
        component: chartsPie
      }, {
        path: '/charts/map',
        name: 'charts_map',
        component: chartMap
      }, {
        path: '/charts/radar',
        name: 'charts_radar',
        component: chartsRadar
      }, {
        path: '/charts/ring',
        name: 'charts_ring',
        component: chartsRing
      }, {
        path: '/charts/sankey',
        name: 'charts_sankey',
        component: chartsSankey
      }, {
        path: '/charts/scatter',
        name: 'charts_scatter',
        component: chartsScatter
      }, {
        path: '/charts/tree',
        name: 'charts_tree',
        component: chartsTree
      }, {
        path: '/charts/waterfall',
        name: 'charts_waterfall',
        component: chartsWaterfall
      }, {
        path: '/charts/liquidfill',
        name: 'charts_liquidfill',
        component: chartsLiquidfill
      }, {
        path: '/charts/wordcloud',
        name: 'charts_wordcloud',
        component: chartsWordcloud
      }, {
        path: '/charts/events',
        name: 'charts_events',
        component: chartsEvents
      }, {
        path: '/charts/thirdMap',
        name: 'charts_thirdMap',
        component: chartsThirdMap
      }
    ]
  }, {
    path: '/directives',
    name: 'directives_page',
    component: commonLayout,
    children: [
      {
        path: '/directives/input/auto-foucs',
        name: 'directives_input_auto-foucs',
        component: InputDir
      }, {
        path: '/directives/input/only-num',
        name: 'directives_input_only-num',
        component: onlyNumDir
      }, {
        path: '/directives/input/multiple-space',
        name: 'directives_input_multiple-space',
        component: multipleSpaceDir
      }
    ]
  }, {
    path: '/filters',
    name: 'filters_page',
    component: commonLayout,
    children: [
      {
        path: '/filters/date/date-filters',
        name: 'filters_date_date-filters',
        component: DateFilter
      }, {
        path: '/filters/string/str-filters',
        name: 'filters_string_str-filters',
        component: strFilters
      }
    ]
  }, {
    path: '/code',
    name: 'code_page',
    component: codeLayout,
    children: [
      {
        path: '/code/start',
        name: 'code_start',
        component: CodeStart
      },
      {
        path: '/code/rules/convention',
        name: 'code_rules_convention',
        component: Convention
      },
      {
        path: '/code/update',
        name: 'code_update',
        component: ComponentUpdate
      }
    ]
  }, {
    path: '/mp',
    name: 'mp_init',
    component: mpLayout,
    children: [
      {
        path: '/mp/start',
        name: 'mp_start',
        component: mpStart
      }
    ]
  }, {
    path: '*',
    redirect: '/'
  }
]

export default routes
