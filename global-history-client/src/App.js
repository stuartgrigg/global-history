import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Bar from './Bar.jsx';
import HistoryMap from './HistoryMap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        filtersModalOpen: false
    };
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'light',
      },
    });
    return (
      <MuiThemeProvider
        theme={theme}
      >
        <div className="App">
          <Bar
            handleFiltersButtonPress={
              () => this.handleOpenFiltersModal()
            }
          />
          <div className="App-content">
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

export default App;
