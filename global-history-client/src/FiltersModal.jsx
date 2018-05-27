import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  modal: {
      justifyContent: 'center'
  }
});

class FiltersModal extends React.Component {

  render() {
    const { classes } = this.props;

    return (
        <Modal
          open={this.props.open}
          onClose={() => this.props.onClose()}
          className={classes.modal}
        >
          <div className={classes.paper}>
            <Typography variant="title">
              Text in a modal
            </Typography>
            <Typography variant="subheading">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
    );
  }
}

FiltersModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose:  PropTypes.func.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FiltersModalWrapped = withStyles(styles)(FiltersModal);

export default FiltersModalWrapped;