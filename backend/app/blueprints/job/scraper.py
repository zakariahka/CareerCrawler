import requests
from bs4 import BeautifulSoup
from flask import current_app

def scrape_jobs(location: str, job: str):
    job = job.split(',')
    job = '+'.join(job)

    url = f'https://{location}.craigslist.org/search/jjj?query={job}'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    results_list = soup.find('ol', class_='cl-static-search-results')
    
    jobs = []
    if results_list:
        job_elements = results_list.find_all('li', class_='cl-static-search-result')
        
        for job in job_elements:
            title = job.find('div', class_='title').text.strip()
            link = job.find('a')['href']
            location = job.find('div', class_='location').text.strip()
            price = job.find('div', class_='price').text.strip() if job.find('div', class_='price') else 'N/A'
            
            job = {
                'title': title,
                'location': location,
                'price': price,
                'link': link
            }
            print(f"Scraped Job: {job}")
            jobs.append(job)
    else:
        print("No job listings found.")
    
    return jobs

def store_scraped_jobs():
    jobs = scrape_jobs()
    db = current_app.db
    for job in jobs:
        if not db.jobs.find_one({'title': job['title'], 'location': job['location'], 'link': job['link']}):
            db.jobs.insert_one(job)
            print(f"Inserted Job: {job}")