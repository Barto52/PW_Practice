import { faker } from '@faker-js/faker'

export class ContactUs{

    constructor(page)
    {
        this.page = page
        this.contactUsBtn = page.locator('a[href="/contact_us"]')
        this.chooseFileBtn = page.locator('input[name="upload_file"]')
        this.emailInput = page.locator('[data-qa="email"]')
        this.homepageBtn = page.locator('.btn.btn-success')
        this.messageInput = page.locator('[data-qa="message"]')
        this.nameInput = page.locator('[data-qa="name"]')
        this.subjectInput = page.locator('[data-qa="subject"]')
        this.submitBtn = page.locator('[data-qa="submit-button"]')
        this.successAlert = page.locator('.status.alert.alert-success')
        
    }

    //Navigate to "Contact us" page
    async visitContactUs()
    {
        await this.contactUsBtn.click()
    }
    
    //Fill and send "Contact us" form
    async sendForm()
    {
        const filePath = './data/contactUsFile.txt'
        const firstNameFaker = await faker.person.firstName()

        console.log(firstNameFaker)
        await this.nameInput.fill(firstNameFaker)
        await this.emailInput.fill(faker.internet.email({firstName: firstNameFaker}))
        await this.subjectInput.fill(faker.lorem.sentence())
        await this.messageInput.fill(faker.lorem.text())
        await this.chooseFileBtn.setInputFiles(filePath)
        this.page.on('dialog', dialog => dialog.accept())
        await this.submitBtn.click()
    }

    //Navigate to homepage from "Contact us" page
    async goBackToHomepage()
    {
        await this.homepageBtn.click()
    }
}