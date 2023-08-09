import { Login } from "../models/Login"; 
import { test, expect, request } from "@playwright/test";

test.describe('Loginpage', () => {

    //Before every test should land on loginpage
    test.beforeEach(async ({page}) =>{
        const login = new Login(page)
        await login.visitLoginpage()
        await expect(page).toHaveURL('https://www.automationexercise.com/login')
    })

    test('Should login successfully with logout', async ({page}) =>{

        //Successfully login with data from .env file
        const login = new Login(page)
        await login.validLogin()
        await expect(login.loggedAs).toBeVisible()
        await login.logout()
        await expect(page).toHaveURL('https://www.automationexercise.com/login')
        await expect(login.loggedAs).not.toBeVisible()
    })

    test('Should NOT login with invalid data', async ({page}) =>{

        //Should not login with fake data created by faker
        const login = new Login(page)

        await login.invalidLogin()
        await expect(login.loginError).toBeVisible()
        await expect(page).toHaveURL('https://www.automationexercise.com/login')
    })

})