const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page,request }) => {
        await page.goto('http://localhost:5173')
        await page.evaluate(() => localStorage.clear())

        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'test',
                username: 'test',
                password: 'test'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('5.17 Login form is shown', async ({ page }) => {
        await page.click('text=login')
        const form = page.locator('form')
        await expect(form).toBeVisible()
    })

    describe('5.18 Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.click('text=login')
            await page.fill('input[name="username"]', 'test')
            await page.fill('input[name="password"]', 'test')
            await page.click('button:has-text("login")')
            await expect(page.locator('text=logged in')).toBeVisible({ timeout: 100000 })
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.click('text=login')
            await page.fill('input[name="username"]', 'test')
            await page.fill('input[name="password"]', 'wrong')
            await page.click('button:has-text("login")')
            const error = page.locator('.error')
            await expect(error).toBeVisible()
            await expect(error).toHaveText('wrong username or password')
            await expect(page.locator('text=logged in')).not.toBeVisible()
        })
    })

    describe('5.19 When logged in', () => {

        test('a new blog can be created', async ({ page }) => {
            await page.click('text=login')
            await page.fill('input[name="username"]', 'test')
            await page.fill('input[name="password"]', 'test')
            await page.click('button:has-text("login")')
            const createBtn = page.locator('text=create new blog')
            await createBtn.waitFor({ state: 'visible', timeout: 10000 })
            await createBtn.click()
            await page.fill('input[name="title"]', 'test title')
            await page.fill('input[name="author"]', 'playwright')
            await page.fill('input[name="url"]', 'http://playwright.test/blog')
            await page.click('form button[type="submit"]')
            await expect(page.locator('text=test title by playwright added')).toBeVisible({ timeout: 100000 })
        })
    })

    test('5.20 A blog can be liked', async ({ page }) => {
        await page.click('text=login')
        await page.fill('input[name="username"]', 'test')
        await page.fill('input[name="password"]', 'test')
        await page.click('button:has-text("login")')
        const createBtn = page.locator('text=create new blog')
        await createBtn.waitFor({ state: 'visible', timeout: 10000 })
        await createBtn.click()
        await page.fill('input[name="title"]', 'test title')
        await page.fill('input[name="author"]', 'playwright')
        await page.fill('input[name="url"]', 'http://playwright.test/blog')
        await page.click('form button[type="submit"]')

        const blog = page.locator('text=test title').locator('..')
        const viewBtn = blog.locator('text=view')
        await viewBtn.click()
        const likeBtn = blog.locator('button', { hasText: 'like' })
        await likeBtn.waitFor({ state: 'visible', timeout: 10000 })
        await likeBtn.click()
        const likesParagraph = blog.locator('p', { hasText: 'likes' })
        await expect(likesParagraph).toContainText('1 likes', { timeout: 5000 })

    })

    test ('5.21 The user who created a blog can delete it', async ({ page }) => {
        await page.click('text=login')
        await page.fill('input[name="username"]', 'test')
        await page.fill('input[name="password"]', 'test')
        await page.click('button:has-text("login")')
        const createBtn = page.locator('text=create new blog')
        await createBtn.waitFor({ state: 'visible', timeout: 10000 })
        await createBtn.click()
        await page.fill('input[name="title"]', 'test title')
        await page.fill('input[name="author"]', 'playwright')
        await page.fill('input[name="url"]', 'http://playwright.test/blog')
        await page.click('form button[type="submit"]')

        const blog = page.locator('text=test title').locator('..')
        const viewBtn = blog.locator('text=view')
        await viewBtn.click()
        const deleteBtn = blog.locator('button', { hasText: 'remove' })
        await deleteBtn.waitFor({ state: 'visible', timeout: 10000 })
        await deleteBtn.click()
        await expect(page.locator('div', { hasText: 'test title' }).filter({ hasText: 'playwright' })).toHaveCount(0)
    })

    test ('5.23 Blogs are ordered according to likes', async ({ page, request }) => {
        await page.click('text=login')
        await page.fill('input[name="username"]', 'test')
        await page.fill('input[name="password"]', 'test')
        await page.click('button:has-text("login")')
        const createBtn = page.locator('text=create new blog')
        await createBtn.waitFor({ state: 'visible', timeout: 10000 })

        const blogs = [
            { title: 'first blog', author: 'author1', url: 'http://blog1.test' },
            { title: 'second blog', author: 'author2', url: 'http://blog2.test' },
            { title: 'third blog', author: 'author3', url: 'http://blog3.test' }
        ]

        for (const blog of blogs) {
            await createBtn.click()
            await page.fill('input[name="title"]', blog.title)
            await page.fill('input[name="author"]', blog.author)
            await page.fill('input[name="url"]', blog.url)
            await page.click('form button[type="submit"]')
        }

        const likeBlog = async (title, likes) => {
            const blog = page.locator(`text=${title}`).locator('..')
            const viewBtn = blog.locator('text=view')
            await viewBtn.click()
            const likeBtn = blog.locator('button', { hasText: 'like' })
            for (let i = 0; i < likes; i++) {
                await likeBtn.click()
                await page.waitForTimeout(500) // wait for like to be registered
            }
        }

        await likeBlog('second blog', 2)
        await likeBlog('first blog', 1)
        // third blog gets 0 likes

        const blogElements = page.locator('.blog') // assuming each blog has a class 'blog'
        const firstBlogTitle = await blogElements.nth(0).locator('h2').innerText()
        const secondBlogTitle = await blogElements.nth(1).locator('h2').innerText()
        const thirdBlogTitle = await blogElements.nth(2).locator('h2').innerText()

        expect(firstBlogTitle).toContain('second blog')
        expect(secondBlogTitle).toContain('first blog')
        expect(thirdBlogTitle).toContain('third blog')
    })
})