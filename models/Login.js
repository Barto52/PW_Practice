import { faker } from "@faker-js/faker"
import { Request } from "@playwright/test"
import { dotenv } from 'dotenv'


export class Login{

    constructor(page)
    {
        this.page = page
        this.loggedAs = page.locator('.fa.fa-user')
        this.loginBtn = page.locator('[data-qa="login-button"]')
        this.loginEmailInput = page.locator('input[data-qa="login-email"]')
        this.loginError = page.locator('form[action="/login"] >> p')
        this.loginPasswordInput = page.locator('input[data-qa="login-password"]')
        this.logoutBtn = page.locator('a[href="/logout"]')
        this.registerNameInput = page.locator('input[data-qa="signup-name"]')
        this.registerEmailInput = page.locator('input[data-qa="signup-email"]')
        this.signupBtn = page.locator('[data-qa="signup-button"]')
    }

    //Invalid login with data from faker package
    async invalidLogin()
    {
        await this.loginEmailInput.fill(faker.internet.email())
        await this.loginPasswordInput.fill(faker.internet.password())
        await this.loginBtn.click()
    }

    //Logout from logged account
    async logout()
    {
        await this.logoutBtn.click()
    }

    //Valid login. Data defined in dev.env file
    async validLogin()
    {
        await this.loginEmailInput.fill(process.env.USER_MAIL)
        await this.loginPasswordInput.fill(process.env.USER_PASSWORD)
        await this.loginBtn.click()
    }

   //Visit LoginPage
   async visitLoginpage()
   {
       this.page.goto('https://www.automationexercise.com/login')
   }


}