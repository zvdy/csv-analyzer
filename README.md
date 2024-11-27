# CSV Analyzer Web Application

This project is a web-based CSV analyzer built with **Next.js**, **React**, and **Tailwind CSS**. The application allows users to upload a CSV file, filter the data based on specified search terms, and export the filtered data to a new CSV file.

## Features

- **CSV File Upload**: Upload CSV files and parse the data.
- **Filters**: Add filters to search specific columns for values.
- **Export**: Export the filtered data as a new CSV file.
- **Responsive**: The app is fully responsive and works well on mobile devices.
- **Custom Styling**: Tailwind CSS is used for styling with a custom color palette.

## Tech Stack

- **Next.js** (React framework for server-side rendering and routing)
- **Tailwind CSS** (Utility-first CSS framework)
- **PapaParse** (CSV parsing library)
- **TypeScript** (Static type-checking)

## Installation


### Prerequisites

- Node.js (preferably LTS version)
- Yarn package manager (You can also use npm, but yarn is recommended for this project)

### Steps to Install

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zvdy/csv-analyzer
   cd csv-analyzer
   ```

2. **Install dependencies**
    ```bash
    yarn install
    ```

3. ** Run the application**

    ```bash
    yarn dev
    ```

    This will start the Next.js development server at `http://localhost:3000`

## File Structure

The main files and folders in the project are:

    - src/app/components/CsvReader.tsx: The main component that handles CSV uploading, filtering, and exporting.
    - src/globals.css: Global CSS styles.
    - tailwind.config.js: Tailwind CSS configuration.
    - next.config.ts: Next.js configuration.
    - package.json: Contains project dependencies and scripts.
    - yarn.lock: Ensures that all dependencies are installed with the same versions.

### Custom Color Palette

This project uses the following custom color palette for the design:

    - #1f2335
    - #24283b
    - #292e42
    - #3b4261
    - #414868
    - #545c7e
    - #565f89
    - #737aa2

They are based on `Tokyo Night` color theme.

## Usage

Upload a CSV file by clicking the "Browse..." button.
Apply filters by selecting the column and entering a search term.
Export the filtered data by clicking "Export Filtered Data" to download a new CSV file with the filtered results.

## Contributing

Feel free to fork this repository and submit pull requests with improvements, fixes, or features. Please ensure that your changes are well-tested and documented.
License

## License
This project is open-source and available under the MIT License.