# Data Listing Component
A reusable and flexible table with infinte scroll that we can customize depending on the following options:

- Sorting
- Selectable Rows
- Customizable Width
- Aligning numeric columns right

It accepts following props:

1. Columns
It recieves an array of object in which each object contains details about that column

  Example:
  ```
    [{
      id: 'id',
      label: 'ID',
      numeric: true,
      sortable: true,
      width: '70px',
    },
    {
      id: 'title',
      label: 'Title',
      width: '500px',
      sortable: true,
    },
    {
      id: 'url',
      label: 'URL',
      sortable: true,
      width: '350px',
    },
    {
      id: 'thumbnailUrl',
      label: 'Thumbnail URL',
    },
  ];
  ```
  
  Each object accepts following keys:
  * id: Required. Unique id for each column
  * label: Required. It will be used as column name that is displayed in the UI
  * numeric: If true, column is aligned to right
  * sortable: If true, column is sortable
  * width: If width is provided, sets column to that width, otherwise it auto adjusts
  
2. Data -  Data containing these columns

3. defaultSortField - Could be any of the columns

4. isLoading - To handle loader for initial data fetching

5. isLoadingMore - To handle loader while loading more data at infinite scroll

6. selectableRows - If true, makes rows selectable

7. onRowClick - function to becalled when a row is clicked

Here's a demo: https://data-listing.herokuapp.com/


