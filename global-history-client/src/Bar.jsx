import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = () => ({
  appBar: {
    textAlign: 'left',
  },
  appBarTitle: {
    flex: 1,
  }
});

class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };
  }

  render() {
    const { classes, showFiltersButton, history } = this.props;
    const filtersButton = (showFiltersButton) ? (
      <Button
        color="inherit"
        onClick={() => this.props.handleFiltersButtonPress()}>
          Set Filters
      </Button>
    ) : null;
    return (
      <AppBar
        className={classes.appBar}
        position="static"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => this.handleToggleMenu()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.appBarTitle}>
            Global History
          </Typography>
          {filtersButton}
        </Toolbar>

        <Drawer
          open={this.state.menuOpen}
          onClose={() => this.setState({menuOpen:false})}
        >
          <MenuItem onClick={() => {
            history.push('/');
            this.handleToggleMenu();
          }}>
            World History Map
          </MenuItem>
          <MenuItem onClick={() => {
            history.push('/about');
            this.handleToggleMenu();
          }}>
            About
          </MenuItem>
        </Drawer>
      </AppBar>
    );
  }

  handleToggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  }
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFiltersButtonPress: PropTypes.func.isRequired,
  showFiltersButton: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const BarWrapped = withRouter(withStyles(styles)(Bar));

export default BarWrapped;