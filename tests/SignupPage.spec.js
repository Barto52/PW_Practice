import { Login } from "../models/Login";
import { Signup } from "../models/Singup";
import { test, expect, request } from "@playwright/test";

test.describe('Register', () => {

    //Defining variable, because on login page are generate "name" and "email", rest data are generate on signup page
    let newUser

    //Before every test should land on loginpage
    test.beforeEach(async ({page}) =>{
        const login = new Login(page)

        await login.visitLoginpage()
        await expect(page).toHaveURL('https://www.automationexercise.com/login')
        await page.waitForLoadState('networkidle')
    })
    test.only('Create a new user', async ({page}) =>{
        const login = new Login(page)
        const signup = new Signup(page)
        newUser = await login.validSignup()

        await expect(page).toHaveURL('https://www.automationexercise.com/signup')
        await signup.selectRandomGender()
        await expect(signup.nameInput).toHaveValue(newUser.name)
        await expect(signup.emailInput).toHaveValue(newUser.email)

        //Assign password to the newUser object
        newUser.passowrd = await signup.generatePassword()

        await signup.selectRandomDay()
        await signup.selectRandomMonth()
        await signup.selectRandomYear()
        await signup.checkNewsletterAndOffers()
        await expect(signup.newsletterCheckbox).toBeChecked()
        await expect(signup.specialOffersCheckbox).toBeChecked()
        await signup.uncheckNewsletterAndOffers()
        await expect(signup.newsletterCheckbox).not.toBeChecked()
        await expect(signup.specialOffersCheckbox).not.toBeChecked()
        await signup.selectRandomCountry()
        await signup.generateAdressInfoAndCreateAccount()
        await expect(page).toHaveURL('https://www.automationexercise.com/account_created')
        await expect(signup.successMsg).toHaveText('Account Created!')
        await signup.continueBtn.click()
        await page.pause()
    })
    
})