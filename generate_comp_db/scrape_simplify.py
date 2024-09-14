from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

import time
from datetime import datetime

class simplify_scraper():
    def __init__(self):
        # Set up the WebDriver using webdriver_manager
        self.service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=self.service)
        self.driver.get('https://simplify.jobs/companies')
            
    def scrape(self):
        """
        Scrapes companies page of Simplify to build company database.
        """
        # Scroll to the bottom of the page
        last_height = self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        print(f'height at {datetime.now()}: {last_height}')

        while True:
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(5)  # Wait for the page to load
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        print(f'height at {datetime.now()}: {last_height}')

        # Wait for "rounded-md shadow" elements to be present
        try:
            elements = WebDriverWait(self.driver, 20).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, 'rounded-md.shadow'))
            )
            print(f"Found {len(elements)} elements with class 'rounded-md shadow'")
            
        except:
            print("Elements not found")

        for element in elements:
            print(f'[{element.text}')
            print(f'{element.get_attribute("href")}]')

        print(f'height at {datetime.now()}: {last_height}')
        
        
    def close_driver(self):
        '''
        Close the WebDriver. Only call when COMPLETELY done and want to close connection
        to Simplify website
        '''
        self.driver.quit()


if __name__ == "__main__":
    scraper = simplify_scraper()
    scraper.scrape()
    scraper.close_driver()