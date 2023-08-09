import { faker} from "@faker-js/faker"
export class Signup 
{
    constructor(page)
    {
        this.page = page
        this.address1Input = page.locator('#address1')
        this.address2Inpupt = page.locator('#address2')
        this.birthDaysOptionsDropdown = page.locator('#days')
        this.birthMonthsDropdown = page.locator('#months')
        this.birthYearsDropdown = page.locator('#years')
        this.cittyInput = page.locator('#city')
        this.companyInput = page.locator('#company')
        this.continueBtn = page.locator('[data-qa="continue-button"]')
        this.countryDropdown = page.locator('#country')
        this.createAccountBtn = page.locator('[data-qa="create-account"]')
        this.emailInput = page.locator('#email')
        this.femaleRadioButton = page.locator('#id_gender2')
        this.firstNameInput = page.locator('#first_name')
        this.lastNameInput = page.locator('#last_name')
        this.maleRadioButton = page.locator('#id_gender1')
        this.mobileNumberInupit = page.locator('#mobile_number')
        this.nameInput = page.locator('#name')
        this.newsletterCheckbox = page.locator('#newsletter')
        this.passwordInput = page.locator('#password')
        this.specialOffersCheckbox = page.locator('#optin')
        this.stateInput = page.locator('#state')
        this.successMsg = page.locator('.title')
        this.zipcodeInput = page.locator('#zipcode')
    }

    //Generate adress information

    async generateAdressInfoAndCreateAccount()
    {
        await this.firstNameInput.fill(faker.person.firstName())
        await this.lastNameInput.fill(faker.person.lastName())
        await this.companyInput.fill(faker.company.name())
        await this.address1Input.fill(faker.location.streetAddress())
        await this.address2Inpupt.fill(faker.location.buildingNumber())
        await this.stateInput.fill(faker.location.state())
        await this.cittyInput.fill(faker.location.city())
        await this.zipcodeInput.fill(faker.location.zipCode())
        await this.mobileNumberInupit.fill(faker.phone.number())
        await this.createAccountBtn.click()
        await this.page.waitForLoadState('networkidle')

    }

    //Generate random password for a user
    async generatePassword()
    {
        const password = faker.internet.password()
        await this.passwordInput.fill(password)
        return password
    }

    //Check newsletter and special offers checboxes
    async checkNewsletterAndOffers()
    {
        await this.newsletterCheckbox.check()
        await this.specialOffersCheckbox.check()

    }

    //Uncheck newsletter and special offer checkboxes
    async uncheckNewsletterAndOffers()
    {
        await this.newsletterCheckbox.uncheck()
        await this.specialOffersCheckbox.uncheck()
    }

    //Select random country in dropdown
    async selectRandomCountry()
    {
        const randomCountryIndex = Math.floor(Math.random() * 7 )
        await this.countryDropdown.selectOption({index: randomCountryIndex})
    }

    //Select random day in dropdown
    async selectRandomDay()
    {
        const randomDayIndex = Math.floor(Math.random() * 31)
        await this.birthDaysOptionsDropdown.selectOption({index: randomDayIndex})
    }

    //Select random gender
    async selectRandomGender()
    {
        const randomGenderIndex = Math.floor(Math.random() * 2)
        const selectRadioButton = randomGenderIndex === 0 ? this.femaleRadioButton: this.maleRadioButton /*If index equals 0 select Mr, else select Mrs*/
        await selectRadioButton.check()
    }

    //Select random month
    async selectRandomMonth()
    {
        const randomMonthIndex = Math.floor(Math.random() *12)
        await this.birthMonthsDropdown.selectOption({index: randomMonthIndex})
    }

    //Select random year
    async selectRandomYear()
    {
        const randomYearIndex = Math.floor(Math.random() * 121)
        await this.birthYearsDropdown.selectOption({index: randomYearIndex})
    }

}