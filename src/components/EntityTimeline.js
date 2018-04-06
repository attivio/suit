// @flow

import React from 'react';
import ReactHighcharts from 'react-highcharts';

import ObjectUtils from '../util/ObjectUtils';

export class EntityTimelineInstace {
  time: Date;
  count: number;

  constructor(time: Date, count: number) {
    this.time = time;
    this.count = count;
  }
}

type EntityTimelineProps = {
  instances: Array<EntityTimelineInstace>;
};

export default class EntityTimeline extends React.Component<void, EntityTimelineProps, void> {
  static displayName = 'EntityTimeline';

  static EntityTimelineInstace;

  shouldComponentUpdate(nextProps: EntityTimelineProps) {
    return !ObjectUtils.deepEquals(this.props.instances, nextProps.instances);
  }

  render() {
    const dataSet = this.props.instances.map((instance) => {
      return {
        date: instance.time,
        y: instance.count,
      };
    });
    const config = {
      chart: {
        type: 'TimeSeries',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      tooltip: {
        pointFormat: '{point.y}',
      },
      plotOptions: {
        Bar: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
        },
      },
      title: {
        text: null,
      },
      series: [
        {
          name: 'data',
          data: [],
        },
      ],
    };
    config.series[0].data = dataSet;

    return <ReactHighcharts config={config} />;
  }
}

EntityTimeline.EntityTimelineInstace = EntityTimelineInstace;
