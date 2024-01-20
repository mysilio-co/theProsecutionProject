import { forEach } from 'lodash';

export const SEARCH = 'Search Data';
export const SORT = 'Sort Data';
export const FILTER = 'Filter Data';
export const DATASET = 'Select Dataset';
export const VISUALIZE = 'Visualize Data';
export const DOWNLOAD = 'Download Data';
export const SAVE = 'Save Query';

export class HowToContent {
  _title = '';
  _description = '';
  _slides = [];

  constructor(title, description, slides) {
    this._title = title;
    this._description = description;
    forEach(slides, slide => {
      this._slides.push(
        new HowToSlide(slide.subtitle, slide.description, slide.imgSrc),
      );
    });
  }
}

export class HowToSlide {
  _subtitle = '';
  _description = '';
  _imgSrc = '';

  constructor(subtitle, description, imgSrc) {
    this._subtitle = subtitle;
    this._description = description;
    this._imgSrc = imgSrc;
  }

  get subtitle() {
    return this._subtitle;
  }

  set subtitle(value) {
    this._subtitle = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get imgSrc() {
    return this._imgSrc;
  }

  set imgSrc(value) {
    this._imgSrc = value;
  }
}

export const SEARCH_CONTENT = isMobile => {
  return new HowToContent(
    SEARCH,
    `Learn how to search for specific keywords in our dataset.`,
    [
      {
        subtitle: '1. Enter keyword',
        description: `Type the keyword you'd like to search in the search bar. Searches are executed automatically after a short delay`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/search-1.png`,
      },
      {
        subtitle: '2. Select column',
        description: `Click on the "Search By" dropdown to select which column will be searched on. Selecting “Any” will show matches from any column. This dropdown only includes open-ended columns (ones that can't be easily placed into categories), all other columns are covered in the "Filter Data" section. `,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/search-2.png`,
      },
    ],
  );
};

export const SORT_CONTENT = isMobile => {
  return new HowToContent(
    SORT,
    `Learn how to sort the data by different variables.`,
    [
      {
        subtitle: '1. Sort ascending',
        description: `Click the variable name in the table header to sort in ascending order.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/sort-1.png`,
      },
      {
        subtitle: '2. Sort descending',
        description: `Click the same variable a second time to sort in descending order.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/sort-2.png`,
      },
      {
        subtitle: '3. Sort by default',
        description: `Click a third time to return to the default order (by date).`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/sort-3.png`,
      },
    ],
  );
};

export const FILTER_CONTENT = isMobile => {
  return new HowToContent(
    FILTER,
    `Learn how to filter our data by date, categorical variable, or numerical variable.`,
    [
      {
        subtitle: '1. Open filter modal',
        description: `Click the “Filter Data” button to open the filter modal.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/filter-1.png`,
      },
      {
        subtitle: '2a. Filter by date',
        description: `Enter a date into the “From” textbox to select an inclusive start date.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/filter-2a.png`,
      },
      {
        subtitle: '2b. Filter by date',
        description: `Enter a date into the “To” textbox to select an inclusive end date.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/filter-2b.png`,
      },
      {
        subtitle: '3a. Filter by categorical variable',
        description: `Select an option in the dropdown box for the variable you'd like to filter.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/filter-3a.png`,
      },
      {
        subtitle: '3b. Filter by categorical variable',
        description: `Check the “Exclude” box to remove any cases that match what's selected in the dropdown box.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/filter-3b.png`,
      },
      {
        subtitle: '4a. Filter by numerical variable',
        description: `Activate the filter by selecting the checkbox on the left. This will automatically exclude any cases that have an undefined or non-numerical value for this variable.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/filter-4a.png`,
      },
      {
        subtitle: '4b. Filter by numerical variable',
        description: `Select the range of numbers to be included by dragging the slider, typing the number into the textbox, or clicking the arrows next to the textbox.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/filter-4b.png`,
      },
    ],
  );
};

export const DATASET_CONTENT = isMobile => {
  return new HowToContent(
    DATASET,
    `Learn about our different datasets and how to navigate between them.`,
    [
      {
        subtitle: '1. Display "General" tab',
        description: `Click on the “General” tab (selected by default). This tab includes completed cases.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/dataset-1.png`,
      },
      {
        subtitle: '2. Display "Summer-Fall 2020 Protests" tab',
        description: `Click on the “Summer-Fall 2020 Protests” tab. This covers cases occurring during that time period in response to the death of George Floyd.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/dataset-2.png`,
      },
      {
        subtitle: '3. Display "Capitol Raid" tab',
        description: `Click on the “Capitol Raid” tab. This displays federal and non-federal charges levied against protesters active in and around the US Capitol building on January 6, 2021.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/dataset-3.png`,
      },
      {
        subtitle: '4. Display "In Progress" tab',
        description: `Click on the “In Progress” tab. This includes cases currently being investigated and coded by researchers as well as those still proceeding through the courts. These cases have not been completed, will change over time, and have not been audited. These cases are provided as a resource, but should be independently investigated and verified before being included in research products.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/dataset-4.png`,
      },
    ],
  );
};

export const VISUALIZE_CONTENT = isMobile => {
  return new HowToContent(
    VISUALIZE,
    `Learn how to visualize your data query in app.`,
    [
      {
        subtitle: '1. Open visualizer modal',
        description: `Click on the “Visualize Data” button to open the visualizer modal.`,
        imgSrc: `/how-to-img/${
          isMobile ? `mobile` : `desktop`
        }/visualize-1.png`,
      },
      {
        subtitle: '2. Select chart type',
        description: `Click the chart type you'd like to use to visualize the data.`,
        imgSrc: `/how-to-img/${
          isMobile ? `mobile` : `desktop`
        }/visualize-2.png`,
      },
      {
        subtitle: '3. Modify chart',
        description: `Depending on which chart type you've selected, click the option dropdowns to modify your chart.`,
        imgSrc: `/how-to-img/${
          isMobile ? `mobile` : `desktop`
        }/visualize-3.png`,
      },
      {
        subtitle: '4. Toggle display options',
        description: `Toggle the “Display Title” and “Display Filters” switches to show or hide the text surrounding the chart (note: these texts will be included in a chart download).`,
        imgSrc: `/how-to-img/${
          isMobile ? `mobile` : `desktop`
        }/visualize-4.png`,
      },
      {
        subtitle: '5a. Download chart',
        description: `Click the “Download” button to open the chart download options.`,
        imgSrc: `/how-to-img/${
          isMobile ? `mobile` : `desktop`
        }/visualize-5a.png`,
      },
      {
        subtitle: '5b. Download chart',
        description: `Click the content you want to download. This can be the chart only (including the title and filters), the table only, or both together.`,
        imgSrc: `/how-to-img/${
          isMobile ? `mobile` : `desktop`
        }/visualize-5b.png`,
      },
      {
        subtitle: '5c. Download chart',
        description: `Click the “Download” button again (note: the downloaded image is dependent on the current window size).`,
        imgSrc: `/how-to-img/${
          isMobile ? `mobile` : `desktop`
        }/visualize-5c.png`,
      },
    ],
  );
};

export const DOWNLOAD_CONTENT = isMobile => {
  return new HowToContent(DOWNLOAD, `Learn how to download your query.`, [
    {
      subtitle: '1. Open download modal',
      description: `Click the “Download Data” button to open the download modal.`,
      imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/download-1.png`,
    },
    {
      subtitle: '2. Fill out form',
      description: `Read the EULA, fill out the form, and click “Submit”.`,
      imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/download-2.png`,
    },
    {
      subtitle: '3. Download data',
      description: `Click the “Download” button.`,
      imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/download-3.png`,
    },
  ]);
};

export const SAVE_CONTENT = isMobile => {
  return new HowToContent(
    SAVE,
    `Learn how to save your query so you can return to it later.`,
    [
      {
        subtitle: '1. Copy URL',
        description: `Copy the current URL and save it somewhere you can access later.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/query-1.png`,
      },
      {
        subtitle: '2. Load URL',
        description: `Paste the URL into your address bar to return to where you left off.`,
        imgSrc: `/how-to-img/${isMobile ? `mobile` : `desktop`}/query-2.png`,
      },
    ],
  );
};

export const HOW_TO_CONTENT = isMobile => {
  return {
    [SEARCH]: SEARCH_CONTENT(isMobile),
    [SORT]: SORT_CONTENT(isMobile),
    [FILTER]: FILTER_CONTENT(isMobile),
    [DATASET]: DATASET_CONTENT(isMobile),
    [VISUALIZE]: VISUALIZE_CONTENT(isMobile),
    [DOWNLOAD]: DOWNLOAD_CONTENT(isMobile),
    [SAVE]: SAVE_CONTENT(isMobile),
  };
};
