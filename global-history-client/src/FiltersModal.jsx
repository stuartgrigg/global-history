import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  paper: {
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    margin: "20px",
  },
  modal: {
    justifyContent: 'center'
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'horizontal',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '20px'
  },
  dateInputRow: {
    display: 'flex',
    flexDirection: 'horizontal',
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
      filters: {
        localFromDate: {
          year: -4000,
          month: 1,
          day: 1,
        },
        localToDate:{
          year: 2030,
          month: 1,
          day: 1,
        }
      }
    };
  };

  render() {
    const { classes } = this.props;
    const { filters } = this.state;

    const filtersForm = (
      <form autoComplete="off">
        <Typography variant="subheading">
            Show events from:
        </Typography>
        {this.getDateInputRow("localFromDate")}
        <Typography variant="subheading">
            Show events to:
        </Typography>
        {this.getDateInputRow("localToDate")}
      </form>
    );

    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}
        className={classes.modal}
      >
        <div className={classes.paper}>
          <div className={classes.modalHeader}>
            <Typography variant="title">
              Set the filters for the World Map
            </Typography>
            <IconButton
              onClick={() => this.props.onClose()}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {filtersForm}
        </div>
      </Modal>
    );
  }

  getDateInputRow(stateDateName) {
    const { classes } = this.props;
    const {filters} = this.state;
    const fields = [
      {label: "Year", key: "year"},
      {label: "Month", key: "month"},
      {label: "Day", key: "day"}
    ];
    const inputs = fields.map(
      field => {
        return (
          <TextField
            key={stateDateName + field.key}
            id={stateDateName + field.key}
            label={field.label}
            value={filters[stateDateName][field.key]}
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

  handleChangeDate(date, field){
    return (
      event => {
        let newFilters = this.state.filters;
        newFilters[date][field] = event.target.value;
        this.setState({
          filters: newFilters
        });
      }
    );
  }
}

FiltersModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose:  PropTypes.func.isRequired,
};

const FiltersModalWrapped = withStyles(styles)(FiltersModal);

export default FiltersModalWrapped;