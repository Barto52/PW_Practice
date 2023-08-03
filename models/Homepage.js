import { faker } from '@faker-js/faker'

export class Homepage {
     
    constructor(page){
        this.page = page
        this.firstVisibleGrilInCarouseLocator = page.locator('[src="/static/images/home/girl2.jpg"]')
        this.kidsCategory = page.locator('a[href="#Kids"]')
        this.kidsSubcategories = page.locator('#Kids')
        this.menCategory = page.locator('a[href="#Men"]')
        this.menSubcategories = page.locator('#Men')
        this.productHoverOverlay = page.locator('.product-overlay')
        this.productsImage = page.locator('.product-image-wrapper')
        this.secondVisibleGirlInCarouseLocator = page.locator('[src="/static/images/home/girl1.jpg"]')
        this.scrollUpBtn = '#scrollUp'
        this.sliderNextLocator = page.locator('.right.control-carousel.hidden-xs')
        this.sliderPreviousLocator = page.locator('.left.control-carousel.hidden-xs')
        this.subscribeAllert = page.locator('.alert-success.alert')
        this.subscribeInput = page.locator('#susbscribe_email')
        this.subscribeBtn = page.locator('#subscribe')
        this.thirdVisibleGirlInCarouseLocator = page.locator('[src="/static/images/home/girl3.jpg"]')
        this.womenCategory = page.locator('a[href="#Women"]')
        this.womenSubcategories = page.locator('#Women')

        
    }

    //Expand and hide "Kids" category
    async expandAndHideKidsCategory()
    {
        await this.kidsCategory.click()
        await this.page.waitForTimeout(2000)
    }

    //Expand and hide "Men" category
    async expandAndHideMenCategory()
    {
        await this.menCategory.click()
        await this.page.waitForTimeout(2000)
    }

    //Expand and hide "Woman" category
    async expandAndHideWomanCategory()
    {
        await this.womenCategory.click()
        await this.page.waitForTimeout(2000)
    }    

    //Hover on a random product image //I think I must beautify this methond :) 
    async hoverOnProduct()
    {   
        const numberOfProducts = await this.productsImage.count()
        const randomProductIndex = Math.floor(Math.random() * numberOfProducts)
        await this.productsImage.nth(randomProductIndex).hover()  
        this.randomProductIndex = randomProductIndex  
        console.log(randomProductIndex)
    }

    //Scroll up the page with arrow button. Use 'evaluate' method to simulate scrolling up the page
    async scrollUp()
    {
        const unvisibleBtn = await this.page.$(this.scrollUpBtn)
        await unvisibleBtn.evaluate(node => node.click())
    }

    //Use carouse - next
    async sliderNext()
    {
        await this.sliderNextLocator.click()
        await this.page.waitForTimeout(2000)
    }

    //Use carouse - previous
    async sliderPrevious()
    {
        await this.sliderPreviousLocator.click()
        await this.page.waitForTimeout(2000)
        
    }

    //Subscrivbe with valid email 
    async subscribe(){
        await this.subscribeInput.type(faker.internet.email())
        await this.subscribeBtn.click()    
    }
 
    //Visit Homepage
    async visitHomepage()
    {
        await this.page.goto('/')
    }



}