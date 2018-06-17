import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import eventData from './data.json';
import EventMarker from './EventMarker';
import { PropTypes } from 'prop-types';
import FiltersModal from './FiltersModal';
import { withStyles } from '@material-ui/core/styles';
import { FormDate } from './DateUtils';

const styles = () => ({
  mapContainer: {
    height: "100%"
  }
});

class HistoryMap extends Component {
  render() {
    const { classes, filters, handleFiltersSaved } = this.props;

    const fromTime = FormDate(
      filters.fromDate.year,
      filters.fromDate.month,
      filters.fromDate.day
    );
    const toTime = FormDate(
      filters.toDate.year,
      filters.toDate.month,
      filters.toDate.day
    );

    const markers = eventData.filter(
      (event) => {
        return (
          event.end_time >= fromTime &&
          event.start_time <= toTime
        );
      }
    ).map(
      (event, i) => {
        return (
          <EventMarker event={event} key={i} />
        );
      }
    );

    const modal = (
      <FiltersModal
        open={this.props.modalOpen}
        onClose={() => this.props.handleModalClose()}
        onSetFilters={handleFiltersSaved}
        actualFilters={filters}
      />
    );

    return (
      <div className={classes.mapContainer}>
        <Map center={[0, 0]} zoom={2}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </Map>
        {modal}
      </div>
    );
  }
}

HistoryMap.propTypes = {
  classes: PropTypes.object.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  handleFiltersSaved: PropTypes.func.isRequired
};

const HistoryMapWrapped = withStyles(styles)(HistoryMap);

export default HistoryMapWrapped;