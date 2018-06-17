import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Bar from './Bar.jsx';
import HistoryMap from './HistoryMap';
import Typography from '@material-ui/core/Typography';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';


const styles = () => ({
  app: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  appContent: {
    height: '90%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textContent: {
    maxWidth: '300px',
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersModalOpen: false,
      filters: {
        fromDate: {
          year: 1939,
          month: 9,
          day: 1,
        },
        toDate:{
          year: 1945,
          month: 9,
          day: 2,
        }
      }
    };
  }

  render() {
    const { classes } = this.props;
    const { filtersModalOpen, filters} = this.state;
    const theme = createMuiTheme({
      palette: {
        type: 'light',
      },
    });

    const historyMap = (
      <HistoryMap
        modalOpen={filtersModalOpen}
        handleModalClose={() => this.handleCloseFiltersModal()}
        filters={filters}
        handleFiltersSaved={
          (newFilters) => this.handleOpenFiltersModal(newFilters)
        }
      />
    );

    const about = (
      <div className="textContent">
        <Typography variant="subheading">
          Global History is an open source app for visualising humanity's
          past.
        </Typography>
        <Typography variant="subheading">
          The code is available on <a href='https://github.com/stuartgrigg/global-history'>
          GitHub</a>.
        </Typography>
        <Typography variant="subheading">
          Thanks to Wikidata, OpenStreetMap and Leaflet.
        </Typography>
      </div>
    );

    const notFound = (
      <div>
        <Typography variant="title">
          404 - Page not found, sorry.
        </Typography>
      </div>
    );

    return (
      <MuiThemeProvider
        theme={theme}
      >
        <div className={classes.app}>
          <Switch>
            <Route exact path='/' render={this.getBarRenderFunc(true)}/>
            <Route render={this.getBarRenderFunc(false)}/>
          </Switch>

          <div className={classes.appContent}>
            <Switch>
              <Route exact path='/' render={() => historyMap}/>
              <Route path='/about' render={() => about}/>
              <Route render={() => notFound}/>
            </Switch>



          </div>
        </div>
      </MuiThemeProvider>
    );
  };

  getBarRenderFunc(showSetFilters) {
    return () => (
      <Bar
        handleFiltersButtonPress={
          () => this.handleOpenFiltersModal()
        }
        showFiltersButton={showSetFilters}
      />
    );
  }

  handleOpenFiltersModal() {
    this.setState({filtersModalOpen: true});
  };

  handleCloseFiltersModal() {
    this.setState({filtersModalOpen: false});
  };

  handleFiltersSaved(newFilters) {
    this.setState({filters: newFilters});
  }
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const AppWrapped = withStyles(styles)(App);

export default AppWrapped;
