import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import { UnpackDate } from './DateUtils';

class EventMarker extends Component {

  render() {
    const { event } = this.props;
    if (
      (event.latitude == null && event.longitude == null)||
      (event.links == null || event.links.length === 0) ||
      (event.start_time == null || event.end_time == null)
    ) {
      return (null);
    }
    var displayDates = [];
    if (event.start_time === event.end_time) {
      displayDates.push(
        <div key="date">Date: {UnpackDate(event.start_time)}</div>
      );
    } else {
      displayDates.push(
        <div key="start">
          Start Date: {UnpackDate(event.start_time)}
        </div>
      );
      displayDates.push(
        <div key="end">End Date: {UnpackDate(event.end_time)}</div>
      );
    }
    return (
      <Marker position={[event.latitude, event.longitude]}>
        <Popup>
          <span>
            <a href={event.links[0]} target="_blank">
              {event.title}
            </a>
            {displayDates}
          </span>
        </Popup>
      </Marker>
    );
  };
}

EventMarker.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventMarker;