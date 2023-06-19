import html from 'nanohtml'
import { i18n } from '../base/localize.js'

/**
 * @this {any}
 * @returns {null|HTMLElement}
 */
export default function () {
    const { showFireButton } = this.model
    const fireButton = showFireButton
        ? html`<button type="button" class="fire-button js-search-fire-button">${fireIcon()}</button>`
        : html``
    return html`
        <div class="search token-search-input">
            <form class="search-form js-search-form" name="x" data-test-id="search-form">
                <input
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="${i18n.t('site:searchPlaceholder.title')}"
                    name="q"
                    class="search-form__input js-search-input"
                    value=""
                />
                <button class="search-form__go js-search-go" type="submit" aria-label="${i18n.t('site:searchGoButton.title')}">
                    ${loupeIcon()}
                </button>
            </form>
            ${fireButton}
            <button type="button" class="cog-button js-search-cog-button" aria-label="${i18n.t('site:optionsButton.title')}">
                ${cogIcon()}
            </button>
        </div>
    `
}

function loupeIcon() {
    return html`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect class="loupe-handle" x="11.5" y="12.9142" width="2" height="6" rx="1" transform="rotate(-45 11.5 12.9142)" />
        <path
            class="loupe-glass"
            d="M12.6976 5.27292C14.7478 7.32317 14.7478 10.6473 12.6976 12.6975C10.6473 14.7478 7.32322 14.7478 5.27297 12.6975C3.22272 10.6473 3.22272 7.32317 5.27297 5.27292C7.32322 3.22267 10.6473 3.22267 12.6976 5.27292Z"
            stroke-width="1.5"
        />
    </svg>`
}

function cogIcon() {
    return html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            class="settings-cog"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.43351 13.1462C3.06364 14.0391 3.48767 15.0628 4.3806 15.4327L5.30448 15.8154C6.19741 16.1853 7.2211 15.7612 7.59096 14.8683L7.84778 14.2483C7.89842 14.2495 7.94918 14.2501 8.00007 14.2501C8.05068 14.2501 8.10118 14.2495 8.15154 14.2483L8.40831 14.8682C8.77818 15.7611 9.80187 16.1852 10.6948 15.8153L11.6187 15.4326C12.5116 15.0628 12.9356 14.0391 12.5658 13.1461L12.3093 12.527C12.3828 12.457 12.4546 12.3853 12.5247 12.3118L13.1437 12.5682C14.0366 12.9381 15.0603 12.514 15.4302 11.6211L15.8129 10.6972C16.1827 9.8043 15.7587 8.7806 14.8658 8.41074L14.2482 8.15493C14.2494 8.10345 14.2501 8.05185 14.2501 8.00011C14.2501 7.94964 14.2495 7.89928 14.2483 7.84905L14.8659 7.59324C15.7588 7.22337 16.1828 6.19968 15.8129 5.30675L15.4303 4.38287C15.0604 3.48994 14.0367 3.06592 13.1438 3.43578L12.5273 3.69115C12.4568 3.61712 12.3845 3.54482 12.3105 3.47432L12.5658 2.85787C12.9357 1.96494 12.5117 0.94124 11.6188 0.571378L10.6949 0.188694C9.80195 -0.181168 8.77825 0.242858 8.40839 1.13579L8.15316 1.75196C8.10226 1.75073 8.05122 1.75011 8.00007 1.75011C7.94864 1.75011 7.89734 1.75074 7.84616 1.75198L7.59089 1.13569C7.22102 0.242766 6.19733 -0.181263 5.3044 0.1886L4.38052 0.571284C3.4876 0.941146 3.06357 1.96484 3.43343 2.85777L3.68905 3.47488C3.61513 3.54532 3.54293 3.61755 3.47254 3.69151L2.85533 3.43585C1.9624 3.06599 0.938705 3.49002 0.568843 4.38295L0.186159 5.30683C-0.183704 6.19975 0.240324 7.22345 1.13325 7.59331L1.75185 7.84955C1.75067 7.89961 1.75007 7.9498 1.75007 8.00011C1.75007 8.05168 1.7507 8.10312 1.75194 8.15443L1.13335 8.41066C0.240417 8.78052 -0.18361 9.80422 0.186252 10.6971L0.568936 11.621C0.938798 12.514 1.96249 12.938 2.85542 12.5681L3.47512 12.3114C3.54507 12.3848 3.6168 12.4565 3.69022 12.5265L3.43351 13.1462ZM1.61161 6.43846C1.35648 6.33279 1.23533 6.0403 1.34101 5.78518L1.72369 4.8613C1.82937 4.60618 2.12185 4.48503 2.37697 4.5907L3.47809 5.0468C3.69752 5.13769 3.94855 5.05988 4.09713 4.87459C4.32641 4.58865 4.58647 4.32845 4.87227 4.099C5.05738 3.95039 5.13507 3.69948 5.04422 3.48016L4.58828 2.37941C4.4826 2.12429 4.60375 1.83181 4.85888 1.72613L5.78276 1.34345C6.03788 1.23777 6.33036 1.35893 6.43604 1.61405L6.89159 2.71385C6.98246 2.93322 7.21488 3.05571 7.45092 3.02993C7.63126 3.01022 7.81448 3.00011 8.00007 3.00011C8.18541 3.00011 8.3684 3.0102 8.54851 3.02985C8.78452 3.0556 9.01691 2.93311 9.10776 2.71377L9.56324 1.61414C9.66891 1.35902 9.9614 1.23787 10.2165 1.34354L11.1404 1.72623C11.3955 1.8319 11.5167 2.12439 11.411 2.37951L10.9553 3.47967C10.8644 3.69901 10.9422 3.94995 11.1273 4.09856C11.4132 4.32802 11.6734 4.58826 11.9027 4.87425C12.0513 5.05952 12.3023 5.13731 12.5217 5.04642L13.6221 4.59063C13.8773 4.48495 14.1697 4.6061 14.2754 4.86122L14.6581 5.7851C14.7638 6.04023 14.6426 6.33271 14.3875 6.43839L13.2866 6.89438C13.0674 6.98521 12.9449 7.21748 12.9705 7.45343C12.99 7.63298 13.0001 7.81537 13.0001 8.00011C13.0001 8.18597 12.9899 8.36945 12.9702 8.55005C12.9443 8.78611 13.0668 9.01859 13.2862 9.10947L14.3874 9.56559C14.6425 9.67126 14.7637 9.96375 14.658 10.2189L14.2753 11.1427C14.1696 11.3979 13.8772 11.519 13.622 11.4133L12.5195 10.9566C12.3002 10.8658 12.0493 10.9435 11.9007 11.1285C11.6715 11.4139 11.4117 11.6736 11.1262 11.9026C10.941 12.0511 10.8632 12.3021 10.9541 12.5215L11.4109 13.6245C11.5166 13.8796 11.3954 14.1721 11.1403 14.2778L10.2164 14.6604C9.96132 14.7661 9.66884 14.645 9.56316 14.3898L9.1062 13.2866C9.01536 13.0673 8.78307 12.9449 8.54711 12.9705C8.36745 12.9901 8.18493 13.0001 8.00007 13.0001C7.81497 13.0001 7.63221 12.9901 7.45233 12.9705C7.21634 12.9447 6.984 13.0672 6.89316 13.2865L6.43611 14.3899C6.33044 14.6451 6.03796 14.7662 5.78283 14.6605L4.85895 14.2779C4.60383 14.1722 4.48268 13.8797 4.58836 13.6246L5.04545 12.521C5.13632 12.3017 5.05857 12.0507 4.87337 11.9021C4.58799 11.6731 4.32826 11.4135 4.09918 11.1282C3.95057 10.9431 3.69967 10.8654 3.48037 10.9563L2.37707 11.4133C2.12194 11.5189 1.82946 11.3978 1.72379 11.1427L1.3411 10.2188C1.23543 9.96367 1.35658 9.67119 1.6117 9.56551L2.71385 9.10898C2.93323 9.01811 3.05572 8.78566 3.02992 8.54962C3.01019 8.36916 3.00007 8.18582 3.00007 8.00011C3.00007 7.81552 3.01007 7.63327 3.02957 7.45386C3.0552 7.21793 2.93271 6.98568 2.71345 6.89486L1.61161 6.43846ZM6.12508 8.00008C6.12508 6.96455 6.96455 6.12508 8.00008 6.12508C9.03562 6.12508 9.87508 6.96455 9.87508 8.00008C9.87508 9.03562 9.03562 9.87508 8.00008 9.87508C6.96455 9.87508 6.12508 9.03562 6.12508 8.00008ZM8.00008 4.87508C6.27419 4.87508 4.87508 6.27419 4.87508 8.00008C4.87508 9.72597 6.27419 11.1251 8.00008 11.1251C9.72597 11.1251 11.1251 9.72597 11.1251 8.00008C11.1251 6.27419 9.72597 4.87508 8.00008 4.87508Z"
            fill-opacity="0.8"
        />
    </svg> `
}

export function fireIcon() {
    return html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            class="fire-icon"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.51018 15.53C5.52187 15.1832 4.62831 14.6102 3.90082 13.8566C3.17333 13.1031 2.63205 12.1899 2.32018 11.19C2.00674 10.2021 1.95815 9.14927 2.17926 8.1367C2.40038 7.12413 2.88345 6.18736 3.58018 5.42005C3.55105 5.89155 3.6297 6.36349 3.81018 6.80005C4.02356 7.25295 4.32236 7.6604 4.69018 8.00005C4.69018 8.00005 4.12018 6.49005 5.50018 4.00005C6.05384 3.11404 6.78312 2.35083 7.64306 1.75747C8.50299 1.16412 9.47535 0.7532 10.5002 0.550049C9.98701 1.37608 9.80819 2.36673 10.0002 3.32005C10.3002 4.32005 10.7902 4.86005 11.3402 6.32005C11.6533 7.02128 11.8102 7.78217 11.8002 8.55005C11.8926 8.00549 12.0787 7.48106 12.3502 7.00005C12.8054 6.23481 13.5124 5.65154 14.3502 5.35005C13.9624 6.24354 13.8043 7.21983 13.8902 8.19005C14.1302 9.57207 14.0026 10.9929 13.5202 12.31C13.1428 13.1433 12.5799 13.8792 11.8745 14.4616C11.1691 15.0439 10.3398 15.4573 9.45018 15.67C10.0364 15.44 10.5354 15.0313 10.8765 14.5018C11.2175 13.9723 11.3832 13.349 11.3502 12.72C11.252 11.9769 10.8985 11.2911 10.3502 10.78C10.0002 12.67 9.00018 12.89 9.00018 12.89C9.38752 12.0753 9.62788 11.1985 9.71018 10.3C9.76455 9.73167 9.71025 9.15813 9.55018 8.61005C9.35806 7.62829 8.80504 6.75416 8.00018 6.16005C8.05821 6.68407 8.0102 7.21441 7.85902 7.7195C7.70784 8.22458 7.45657 8.69408 7.12018 9.10005C6.31018 10.36 4.94018 11.29 5.00018 13.17C5.02637 13.6604 5.17925 14.1356 5.44391 14.5492C5.70856 14.9628 6.07594 15.3008 6.51018 15.53Z"
            fill-opacity="0.84"
        />
    </svg> `
}
