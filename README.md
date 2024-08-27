## This app is still in development !!
Hopefully will be finished soon :)

# Job Listings Aggregator Bot

A web-based platform that scrapes job listings from Craigslist (Indeed and Glassdoor coming soon!) and aggregates the data into a searchable and filterable platform for users.

## Features

- **User Authentication:**
  - Register a new account.
  - Login to an existing account.
  - Logout from the account.
  - User profile with saved job searches and alerts.

- **Job Listings Scraping:**
  - Scrape job listings from Indeed, Glassdoor, and other job boards.
  - Extract job title, company, location, salary, job description, and application link.

- **Data Storage:**
  - Store scraped job data in a database (e.g., MongoDB or PostgreSQL).

- **Search and Filter:**
  - Allow users to search for jobs by keyword, location, company, and other filters.

- **Job Alerts:**
  - Set up job alert notifications via email or SMS for new listings matching user criteria.

- **Dashboard:**
  - User dashboard to view and manage saved searches and job alerts.

## Usage

1. **Register a new account or login to an existing account.**
2. **Search for jobs by keyword, location, company, and other filters.**
3. **Save job searches to receive alerts.**
4. **Manage your saved searches and alerts in the dashboard.**
5. **View and apply to job listings directly through the application links.**

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) for web scraping.
- [React](https://reactjs.org/) for building the user interface.
- [Flask](https://flask.palletsprojects.com/) for the backend framework.
- [MongoDB](https://www.mongodb.com/) for the database solution.
- [Twilio](https://www.twilio.com/) for the notification service.