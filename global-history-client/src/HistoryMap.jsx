import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import eventData from './data.json';
import EventMarker from './EventMarker';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { PropTypes } from 'prop-types';
import FiltersModal from './FiltersModal';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  mapContainer: {
    height: "100%"
  }
});

class HistoryMap extends Component {
  render() {
    const { classes } = this.props;

    const markers = eventData.map(
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
  modalOpen: PropTypes.bool.isRequired
};

const HistoryMapWrapped = withStyles(styles)(HistoryMap);

export default HistoryMapWrapped;