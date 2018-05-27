import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
          <div className={classes.modalHeader}>
            <Typography variant="title">
              Text in a modal
            </Typography>
            <IconButton
              onClick={() => this.props.onClose()}
            >
              <CloseIcon />
            </IconButton>
          </div>
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

const FiltersModalWrapped = withStyles(styles)(FiltersModal);

export default FiltersModalWrapped;