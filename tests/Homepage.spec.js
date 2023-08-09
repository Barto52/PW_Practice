import { test, expect } from "@playwright/test"
import { Homepage } from "../models/Homepage";

test.describe('Homepage' , () =>{

    //Before every test included in this block, first visit homepage and check it's name
    test.beforeEach( async ({page})=>{
        const homepage = new Homepage(page)
        await homepage.visitHomepage()
        await expect(page).toHaveTitle('Automation Exercise')
        
    })

    test('Carouse should interract and be visible', async ({page}) =>{
        const homepage = new Homepage(page)

        //First image should be visible after navigation for homepage
        await homepage.firstVisibleGrilInCarouseLocator
        await expect(homepage.firstVisibleGrilInCarouseLocator).toBeVisible()
        
        //Change displayed girl, second image should be visible
        await homepage.sliderPrevious()
        await expect(homepage.thirdVisibleGirlInCarouseLocator).toBeVisible()
        
        //Change displayed girl, third image should be visible.
        await homepage.sliderNext()
        await homepage.sliderNext()
        await expect(homepage.secondVisibleGirlInCarouseLocator).toBeVisible()

    })

    test('Women category should expand and hide', async ({page}) =>{
        const homepage = new Homepage(page)

        //After clicking on "Women", subcategories should be visible
        await homepage.expandAndHideWomanCategory()
        await expect(homepage.womenSubcategories).toBeVisible()
        
        //After clicking on "Women", subcategories should hide
        await homepage.expandAndHideWomanCategory()
        await expect(homepage.womenSubcategories).not.toBeVisible()
    })

    test('Men category should expand and hide', async ({page}) =>{
        const homepage = new Homepage(page)

        //After clicking on "Men", subcategories should be visible
        await homepage.expandAndHideMenCategory()
        await expect(homepage.menSubcategories).toBeVisible()

        //After clicking on "Men", subcategories should hide
        await homepage.expandAndHideMenCategory()
        await expect(homepage.menSubcategories).not.toBeVisible()
    })

    test('Kids category should expand and hide', async ({page}) =>{
        const homepage = new Homepage(page)

        //After clicking on "Kids", subcategories should be visible
        await homepage.expandAndHideKidsCategory()
        await expect(homepage.kidsCategory).toBeVisible()

        //After clicking on "Kids", subcategories should hide
        await homepage.expandAndHideKidsCategory()
        await expect(homepage.kidsSubcategories).not.toBeVisible()

    })

    test('Verify subscription', async ({page}) =>{
        const homepage = new Homepage(page)

        //Insert random email adress and click subscribe button
        await homepage.subscribe()
        await expect(homepage.subscribeAllert).toBeVisible()
        await expect(homepage.subscribeAllert).toHaveText('You have been successfully subscribed!')
    })

    test('Scroll up with arrow button', async ({page}) =>{
        const homepage = new Homepage(page)

        //Click on arrow button, which should scroll the page up all the way to the top. Button appears after scrolling down the page
        await homepage.subscribeBtn.focus()
        await homepage.scrollUp()
        await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible()
    })

    test('Verify hover on a product image', async ({page}) =>{
        const homepage = new Homepage(page)
        await homepage.hoverOnProduct()
        const randomProductIndex  = await homepage.randomProductIndex
        console.log(randomProductIndex)
        await expect(homepage.productHoverOverlay.nth(randomProductIndex)).toBeVisible()
    })

})