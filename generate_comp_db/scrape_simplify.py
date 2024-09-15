from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver

import time
from datetime import datetime


import undetected_chromedriver as uc


class simplify_scraper():
    def __init__(self, enable_stealth=True):
        # Set up the WebDriver using webdriver_manager
        self.service = Service(ChromeDriverManager().install())
        
        if enable_stealth:
            options = self.enable_stealth()
            self.driver = webdriver.Chrome(service=self.service, options=options)
        else:
            self.driver = webdriver.Chrome(service=self.service)
            
        self.driver.get('https://simplify.jobs/companies')
        self.driver.maximize_window()

        self.scroll_wait_time = 5 # sleep time between each scroll
        self.min_loaded_companies = 30 # min number of companies that must be be loaded before stopping scroll 
            
        # self.driver = uc.Chrome()
        # self.driver.get('https://simplify.jobs/companies')
    
    def enable_stealth(self):
        # create a ChromeOptions object
        options = webdriver.ChromeOptions()

        #run in headless mode
        # options.add_argument("--headless")

        # disable the AutomationControlled feature of Blink rendering engine
        options.add_argument('--disable-blink-features=AutomationControlled')

        # disable pop-up blocking
        options.add_argument('--disable-popup-blocking')

        # start the browser window in maximized mode
        options.add_argument('--start-maximized')

        # disable extensions
        options.add_argument('--disable-extensions')

        # disable sandbox mode
        options.add_argument('--no-sandbox')

        # disable shared memory usage
        options.add_argument('--disable-dev-shm-usage')
        
        custom_user_agent = 'Chrome/92.0.4515.159'
        options.add_argument(f"user-agent={custom_user_agent}")

        
        return options

    
    # Define a function to scroll to the bottom of the page
    def scroll_to_bottom(self):
        element = self.driver.find_element(By.TAG_NAME, 'a')
        i = 1
        time.sleep(3)
        
        # click to activate webpage - MUST DO VERY IMPORTANT OTHERWISE NO SCROLL
        elem = self.driver.find_element(By.TAG_NAME, "h1")
        elem.click()
                
        for i in range(100):
            print(i)
            # element.send_keys(Keys.PAGE_DOWN)
            # self.driver.execute_script("window.scrollBy(0, window.innerHeight);")
            tag = self.driver.find_element(By.TAG_NAME, 'body')
            tag.send_keys(Keys.PAGE_DOWN)
            time.sleep(1)

        # get number of elements
        try:
            elements = WebDriverWait(self.driver, 10).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, 'rounded-md.shadow'))
            )
            print(f"Found {len(elements)} elements with class 'rounded-md shadow'")
        except:
            print("Elements not found")

            
    def scrape(self):
        """
        Scrapes companies page of Simplify to build company database.
        """
        # Scroll to the bottom of the page
        last_height = self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        print(f'height at {datetime.now()}: {last_height}')

        zum_not_found = True
        
        while zum_not_found:
            self.driver.execute_script("window.scrollBy(0, 50);")
            time.sleep(self.scroll_wait_time)  # Wait for the page to load
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            print(f'height at {datetime.now()}: {new_height}')
            
            elements = self.driver.find_elements(By.CLASS_NAME, 'rounded-md.shadow')
            print(f'last element seen now {elements[-1].text}')
            for element in elements:
                if "Adyen" in element.text:
                    print("Found element with text 'Adyen':")
                    print(element.text)
                    zum_not_found = False
                    break


        # find # company entries loaded on page
        try:
            elements = WebDriverWait(self.driver, 20).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, 'rounded-md.shadow'))
            )
            print(f"Found {len(elements)} elements with class 'rounded-md shadow'")
        except:
            print("Elements not found")




        print(f'height at {datetime.now()}: {last_height}')

        # Wait for "rounded-md shadow" elements to be present
        

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
    scraper.scroll_to_bottom()
    scraper.close_driver()