import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { FormDate } from './DateUtils';


const styles = theme => ({
  paper: {
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    margin: "20px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto'
  },
  modal: {
    justifyContent: 'center',
    height: 'auto'
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px',
    alignItems: 'flex-end'
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: '20px',
    width: '100%'
  },
  dateInputRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px'
  },
  numberInput: {
    width: '20%'
  }
});

class FiltersModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: this.props.actualFilters,
    };
  };

  render() {
    const { classes } = this.props;

    const filtersForm = (
      <form autoComplete="off">
        <Typography variant="subheading">
          Show events from:
        </Typography>
        {this.getDateInputRow("fromDate")}
        <Typography variant="subheading">
          Show events to:
        </Typography>
        {this.getDateInputRow("toDate")}
      </form>
    );

    return (
      <Modal
        open={this.props.open}
        onClose={() => this.close()}
        className={classes.modal}
      >
        <div className={classes.paper}>
          <div className={classes.modalHeader}>
            <Typography variant="title">
              Set the filters for the World Map
            </Typography>
            <IconButton
              onClick={() => this.close()}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {filtersForm}
          <div className={classes.modalFooter}>
            <Button
              variant="raised"
              color="primary"
              onClick={() => {
                if (this.filtersValid) {
                  this.close();
                }
              }}
              disabled={!this.filtersValid()}>
              Update Filters
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  close(updateFilters) {
    const { filters } = this.state;
    if (updateFilters) {
      this.onSetFilters(filters);
    } else {
      this.resetFilters();
    }
    this.props.onClose();
  }

  getDateInputRow(stateDateName) {
    const { classes } = this.props;
    const { filters } = this.state;
    const fields = [
      { label: "Year", key: "year" },
      { label: "Month", key: "month" },
      { label: "Day", key: "day" }
    ];
    const inputs = fields.map(
      field => {
        return (
          <TextField
            key={stateDateName + field.key}
            id={stateDateName + field.key}
            label={field.label}
            value={String(filters[stateDateName][field.key])}
            onChange={this.handleChangeDate(stateDateName, field.key)}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="none"
            className={classes.numberInput}
          />
        );
      }
    );
    return (
      <div className={classes.dateInputRow}>
        {inputs}
      </div>
    );
  };

  handleChangeDate(date, field) {
    return (
      event => {
        let newFilters = this.state.filters;
        newFilters[date][field] = (
          !isNaN(event.target.value) ?
            parseInt(
              event.target.value,
              10
            ) : ''
        );
        this.setState({
          filters: newFilters
        });
      }
    );
  }

  filtersValid() {
    const { filters } = this.state;
    return (
      _dateValid(filters.fromDate) &&
      _dateValid(filters.toDate) &&
      _dateBefore(filters.fromDate, filters.toDate)
    );
  }

  resetFilters() {
    const { actualFilters } = this.props;
    this.setState({ filters: actualFilters });
  }
};

function _dateValid(date) {
  return (
    Number.isInteger(date.year) &&
    Number.isInteger(date.month) &&
    Number.isInteger(date.day) &&
    date.month >= 1 && date.month <= 12 &&
    date.day >= 1 && date.day <= 31
  );
};

function _dateBefore(beforeDate, afterDate) {
  return (
    FormDate(beforeDate.year, beforeDate.month, beforeDate.day) <=
    FormDate(afterDate.year, afterDate.month, afterDate.day)
  );
}

FiltersModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSetFilters: PropTypes.func.isRequired,
  actualFilters: PropTypes.object.isRequired,
};

const FiltersModalWrapped = withStyles(styles)(FiltersModal);

export default FiltersModalWrapped;