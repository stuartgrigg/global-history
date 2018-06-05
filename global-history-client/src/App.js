import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Bar from './Bar.jsx';
import HistoryMap from './HistoryMap';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  app: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  appContent: {
    height: '90%'
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersModalOpen: false
    };
  }

  render() {
    const { classes } = this.props;
    const theme = createMuiTheme({
      palette: {
        type: 'light',
      },
    });
    return (
      <MuiThemeProvider
        theme={theme}
      >
        <div className={classes.app}>
          <Bar
            handleFiltersButtonPress={
              () => this.handleOpenFiltersModal()
            }
          />
          <div className={classes.appContent}>
            <HistoryMap
              modalOpen={this.state.filtersModalOpen}
              handleModalClose={() => this.handleCloseFiltersModal()}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  };

  handleOpenFiltersModal() {
    this.setState({filtersModalOpen: true});
  };

  handleCloseFiltersModal() {
    this.setState({filtersModalOpen: false});
  };
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const AppWrapped = withStyles(styles)(App);

export default AppWrapped;
