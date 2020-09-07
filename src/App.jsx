import React, { Component } from 'react';
import InteractiveTable from './components/InteractiveTable';
import displayThumbnail, { columns } from './appHelper';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      isLoading: true,
      isLoadingMore: false,
      start: 0,
    };
  }

  componentDidMount() {
    this.getApiData(1);

    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e);
    });
  }

  getApiData = () => {
    const { data, start } = this.state;
    window.fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=20`)
      .then((res) => res.json())
      .then(
        (res) => {
          const modified = res.map((item) => ({
            ...item,
            thumbnailUrl: displayThumbnail(item.thumbnailUrl),

          }));
          this.setState({
            isLoading: false,
            isLoadingMore: false,
            data: [...data, ...modified],
          });
        },

        (error) => {
          this.setState({
            isLoading: false,
            isLoadingMore: false,
            error,
          });
        },
      );
  }

  handleScroll = () => {
    const lastLi = document.querySelector('div[id="tablebody"] > div[id^="row"]:last-child');

    if (lastLi) {
      const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > lastLiOffset) {
        const { start } = this.state;
        this.setState({
          isLoadingMore: true,
          start: start + 20,
        }, () => this.getApiData());
      }
    }
  };

  onRowClick = (row) => {
    // eslint-disable-next-line no-console
    console.log('Row Clicked', row);
  }

  render() {
    const {
      data, error, isLoading, isLoadingMore,
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {error
            ? 'Some Unexpected Error Occured'
            : (
              <InteractiveTable
                columns={columns}
                data={data}
                defaultSortField="id"
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                selectableRows
                onRowClick={this.onRowClick}
              />
            )}
        </header>
      </div>
    );
  }
}

export default App;
