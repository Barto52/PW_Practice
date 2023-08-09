import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test"
import { ContactUs } from "../models/ContactUs";
import { Homepage } from "../models/Homepage";

test.describe('Contact Us', () =>{

    //Before test should land on homepage. After clicking 'Contact Us' button should navigate to the Contact Us form. After sending the messege should back on hompeage
    test.beforeEach(async ({page}) =>{
        const homepage = new Homepage(page)
        const contactUs = new ContactUs(page)

        await homepage.visitHomepage()
        await expect(page).toHaveTitle('Automation Exercise')
        await contactUs.visitContactUs()
        await expect(page).toHaveURL('https://www.automationexercise.com/contact_us')
    })

    test('Send form', async({page}) =>{
        const contactUs = new ContactUs(page)
        await contactUs.sendForm()
        await expect(contactUs.successAlert).toBeVisible()
        await contactUs.goBackToHomepage()
        await expect(page).toHaveURL('https://www.automationexercise.com/')
        await page.pause()
    })








})