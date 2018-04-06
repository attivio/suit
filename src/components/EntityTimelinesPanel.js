// @flow
import React from 'react';

import Menu, { MenuItemDef } from './Menu';
import EntityTimeline from './EntityTimeline';

export class EntityTimelineData {
  label: string;
  entityName: string;
  entityType: string;
  timelinePoints: Map<Date, number>;

  constructor(label: string, entityName: string, entityType: string, timelinePoints: Map<Date, number> = new Map()) {
    this.label = label;
    this.entityName = entityName;
    this.entityType = entityType;
    this.timelinePoints = timelinePoints;
  }
}

type EntityTimelinesPanelProps = {
  data: Array<EntityTimelineData>;
};

type EntityTimelinesPanelState = {
  displayType: string;
  timeframe: string;
  selectedEntities: Array<string>; // The strings here include the entity type and label for each item
};

export default class EntityTimelinesPanel extends React.Component<void, EntityTimelinesPanelProps, EntityTimelinesPanelState> {
  static displayName = 'EntityTimelinesPanel';

  static EntityTimelineData;

  static showMore() {
  }

  constructor(props: EntityTimelinesPanelProps) {
    super(props);
    this.state = {
      displayType: '*', // Default to showing all types
      timeframe: '30', // Default to +/- 30 days
      selectedEntities: [], // Default to nothing selected
    };
    (this: any).addToSelection = this.addToSelection.bind(this);
    (this: any).removeFromSelection = this.removeFromSelection.bind(this);
  }

  state: EntityTimelinesPanelState;
  props: EntityTimelinesPanelProps;

  addToSelection(item: string) {
    const selection = this.state.selectedEntities;
    if (!selection.includes(item)) {
      selection.push(item);
      this.setState({
        selectedEntities: selection,
      });
    }
  }

  removeFromSelection(item: string) {
    const selection = this.state.selectedEntities;
    const index = selection.indexOf(item);
    if (index >= 0) {
      selection.splice(index, 1);
      this.setState({
        selectedEntities: selection,
      });
    }
  }

  render() {
    const displayTypeMenuItems = [
      new MenuItemDef('People', 'people'),
      new MenuItemDef('Companies', 'companies'),
      new MenuItemDef('Locations', 'locations'),
      new MenuItemDef('All Types', '*'),
    ];

    const timeframeMenuItems = [
      new MenuItemDef('±1 Week', '7'),
      new MenuItemDef('±30 Days', '30'),
      new MenuItemDef('±3 Months', '90'),
      new MenuItemDef('±6 Months', '180'),
      new MenuItemDef('±1 Year', '365'),
    ];

    const entitySelecitonCount = this.state.selectedEntities.length;
    const entitySelection = entitySelecitonCount === 1 ? '1 entity selected:' : `${entitySelecitonCount} entities selected:`;

    const entityTimelines = this.props.data.filter((entityData) => {
      // Only use selected entities
      const id = `${entityData.entityName}:${entityData.label}`;
      return this.state.selectedEntities.includes(id);
    }).map((entityData) => {
      return (
        <div className="col-xs-4 col-sm-4 col-lg-3">
          <div className="checkbox">
            <label className="attivio-document360-entity">
              <input type="checkbox" checked />
              <span>{entityData.label}</span> (2,175)
              <EntityTimeline instances={[]} />
            </label>
          </div>
        </div>
      );
    });

    const unselectedEntities = this.props.data.filter((entityData) => {
      // Only use unselected entities
      const id = `${entityData.entityName}:${entityData.label}`;
      return !this.state.selectedEntities.includes(id);
    }).map(() => {
      return (
        <div className="checkbox">
          <label className="attivio-document360-entity">
            <input type="checkbox" value="" />
            <span>Warren Buffet</span> (665)
          </label>
        </div>
      );
    });

    return (
      <div>
        <div className="attivio-360-toolbar">
          <Menu
            label="Display:"
            selection={this.state.displayType}
            items={displayTypeMenuItems}
            onSelect={() => {}}
          />
          <Menu
            label="Timeframe:"
            selection={this.state.timeframe}
            items={timeframeMenuItems}
            onSelect={() => {}}
          />
          <strong className="attivio-document360-selected">{entitySelection}:</strong>
          <button className="btn btn-default btn-xs">More Results With These</button>
        </div>
        <div className="row">
          {entityTimelines}
        </div>
        {unselectedEntities}
        <a
          className="attivio-morelink attivio-document360-entity-more"
          role="button"
          tabIndex={0}
          onClick={EntityTimelinesPanel.showMore}
        >
          {'More\u2026'}
        </a>
      </div>
    );
  }
}

EntityTimelinesPanel.EntityTimelineData = EntityTimelineData;
