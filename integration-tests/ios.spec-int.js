import { test } from '@playwright/test'
import { DashboardPage } from './DashboardPage'
import { testDataStates } from '../shared/js/ui/views/tests/states-with-fixtures'

test.describe('page data (no trackers)', () => {
    test('should fetch initial data', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates['04']])
        await dash.showsPrimaryScreen()
    })
    test('should accept updates when on trackers list screen', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates['04']])
        await dash.viewTrackerCompanies()
        await dash.screenshot('tracker-list-before.png')
        await dash.addStates([testDataStates.cnn])
        await dash.waitForCompanyName('Google LLC')
        await dash.screenshot('tracker-list-after.png')
    })
    test('should accept updates when on non-trackers list screen', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates['04']])
        await dash.viewThirdParties()
        await dash.screenshot('non-tracker-list-before.png')
        await dash.addStates([testDataStates.cnn])
        await dash.waitForCompanyName('Google LLC')
        await dash.screenshot('non-tracker-list-after.png')
    })
    test('does not alter the appearance of connection panel', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates['04']])
        await dash.viewConnection()
        await dash.screenshot('connection-before.png')
        await dash.addStates([testDataStates.cnn])
        await dash.screenshot('connection-before.png')
    })
})

test.describe('page data (with trackers)', () => {
    test('should display correct primary screen', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates.cnn])
        await dash.showsPrimaryScreen()
        await dash.screenshot('primary-screen.png')
    })
})

test.describe('breakage form', () => {
    test('should call webkit interface and not use HTML form', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates.cnn])
        await dash.clickReportBreakage()
        await dash.mocks.calledForShowBreakageForm()
    })
})

test.describe('open external links', () => {
    test('should call ios interface for links', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates['04']])
        await dash.viewTrackerCompanies()
        await dash.clickAboutLink()
        await dash.mocks.calledForAboutLink()
    })
})

test.describe('localization', () => {
    test('should load with `pl` locale', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates['locale-pl']])
        await dash.hasPolishLinkTextForConnectionInfo()
    })
    test('should load with `fr` locale', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates['locale-fr']])
        await dash.hasFrenchLinkTextForConnectionInfo()
    })
})

test.describe('Close', () => {
    test('pressing close should call native API on iOS', async ({ page }) => {
        const dash = await DashboardPage.ios(page)
        await dash.addStates([testDataStates['04']])
        await dash.clickClose()
        await dash.mocks.calledForClose()
    })
})

test.describe('cookie prompt management', () => {
    test.describe('none-configurable', () => {
        test('primary screen', async ({ page }) => {
            const dash = await DashboardPage.ios(page)
            await dash.addStates([testDataStates['consent-managed']])
            await dash.indicatesCookiesWereManaged()
        })
    })
    test.describe('configurable', () => {
        test.describe('non-cosmetic', () => {
            test('primary screen', async ({ page }) => {
                const dash = await DashboardPage.ios(page)
                await dash.addStates([testDataStates['consent-managed-configurable']])
                await dash.indicatesCookiesWereManaged()
            })
            test('secondary screen', async ({ page }) => {
                const dash = await DashboardPage.ios(page)
                await dash.addStates([testDataStates['consent-managed-configurable']])
                await dash.viewCookiePromptManagement()
                await dash.disableCookiesInSettings()
                await dash.mocks.calledForOpenSettings()
                await dash.clickCloseFromSecondaryScreen()
                await dash.mocks.calledForClose()
            })
        })

        test.describe('cosmetic', () => {
            test('primary screen', async ({ page }) => {
                const dash = await DashboardPage.ios(page)
                await dash.addStates([testDataStates['consent-managed-configurable-cosmetic']])
                await dash.indicatesCookiesWereHidden()
            })
            test('secondary screen', async ({ page }) => {
                const dash = await DashboardPage.ios(page)
                await dash.addStates([testDataStates['consent-managed-configurable-cosmetic']])
                await dash.viewCookiePromptManagement()
                await dash.disableCookiesInSettings()
                await dash.mocks.calledForOpenSettings()
                await dash.clickCloseFromSecondaryScreen()
                await dash.mocks.calledForClose()
            })
        })
    })
})

if (!process.env.CI) {
    test.describe('screenshots', () => {
        const states = [
            { name: '01', state: testDataStates['01'] },
            { name: '02', state: testDataStates['02'] },
            { name: '03', state: testDataStates['03'] },
            { name: '04', state: testDataStates['04'] },
            { name: '05', state: testDataStates['05'] },
            { name: 'ad-attribution', state: testDataStates['ad-attribution'] },
            { name: 'new-entities', state: testDataStates['new-entities'] },
            { name: 'upgraded+secure', state: testDataStates['upgraded+secure'] },
            { name: 'google-off', state: testDataStates['google-off'] },
            { name: 'cnn', state: testDataStates.cnn },
        ]
        for (const { name, state } of states) {
            test(name, async ({ page }) => {
                const dash = await DashboardPage.ios(page)
                await dash.screenshotEachScreenForState(name, state)
            })
        }
    })
    test.describe.only('primary screen screenshots', () => {
        /** @type {{name: string, state: any}[]} */
        const states = [
            {
                name: 'primary-insecure',
                state: testDataStates['insecure'],
            },
            {
                name: 'primary-broken',
                state: testDataStates['09'],
            },
            {
                name: 'primary-user-allow-listed',
                state: testDataStates['allowlisted'],
            },
            {
                name: 'primary-major-tracking-network',
                state: testDataStates['google'],
            },
            {
                name: 'primary-major-tracking-network-blocked',
                state: testDataStates['google-with-blocked'],
            },
            {
                name: 'primary-none-blocked-some-special-allowed',
                state: testDataStates['02'],
            },
            {
                name: 'primary-none-blocked-third-party-allowed',
                state: testDataStates['07'],
            },
            {
                name: 'primary-none-blocked',
                state: testDataStates['04'],
            },
        ]
        for (const { name, state } of states) {
            test(name, async ({ page }, testInfo) => {
                const dash = await DashboardPage.ios(page)
                const screen = await dash.screenshotPrimary(name, state)
                await page.pause()
                const { certificate, ...rest } = state
                await testInfo.attach(name, {
                    body: JSON.stringify(rest, null, 2),
                    contentType: 'application/json',
                })
                await testInfo.attach(state + '-screen', {
                    body: screen,
                    contentType: 'image/png',
                })
            })
        }
    })
}
