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

class Bar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            showFiltersButton: true,
        };
    }

  render() {
    const filtersButton = (this.state.showFiltersButton) ? (
        <Button
            color="inherit"
            className="App-bar-button"
            onClick={() => this.props.handleFiltersButtonPress()}>
            Set Filters
        </Button>
    ) : null;
    return (
        <AppBar
            className="App-bar"
            position="static"
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Menu"
                    className="App-bar-menu-button"
                    onClick={() => this.handleToggleMenu()}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className="App-bar-title">
                    Global History
                </Typography>
                {filtersButton}
            </Toolbar>

            <Drawer
                open={this.state.menuOpen}
                onClose={() => this.setState({menuOpen:false})}
            >
                <MenuItem onClick={() => this.handleToggleMenu()}>
                    World History Map
                </MenuItem>
                <MenuItem onClick={() => this.handleToggleMenu()}>
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
    handleFiltersButtonPress: PropTypes.func.isRequired
};

export default Bar;