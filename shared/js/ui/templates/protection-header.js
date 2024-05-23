import html from 'nanohtml'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, h, Fragment, createContext } from 'preact'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'preact/hooks'
import { i18n, ns } from '../base/localize'
import { TextLink } from '../components/text-link.jsx'
import { ProtectionToggle } from '../components/toggle'

/**
 * @typedef MigrationModel
 * @property {boolean} isAllowlisted
 * @property {boolean} isBroken
 * @property {boolean} isDenylisted
 * @property {boolean} protectionsEnabled
 * @property {() => void} toggleAllowlist
 * @property {import("../platform-features.mjs").PlatformFeatures} platformFeatures
 */

/**
 * A wrapper around the preact render
 * @param {import('../models/site.js').PublicSiteModel} model
 * @returns {HTMLElement}
 */
export function protectionHeader(model) {
    const root = html`<div data-testid="protectionHeader"></div>`
    const migrationModel = {
        protectionsEnabled: model.protectionsEnabled,
        isAllowlisted: model.isAllowlisted,
        isDenylisted: model.isDenylisted,
        platformFeatures: model.features,
        isBroken: model.isBroken,
        toggleAllowlist: () => {
            return /** @type {any} */ (model).toggleAllowlist({ screen: 'primaryScreen' })
        },
    }
    render(
        <ProtectionHeader model={migrationModel}>
            <ProtectionHeaderText />
        </ProtectionHeader>,
        root
    )
    return root
}

/**
 * @typedef {'form-trigger' | 'site-not-working' | 'help-trigger' } UIState
 * @typedef {{text: string; label: string; active: boolean; disabled: boolean; toggled: boolean}} ToggleState
 */

const ProtectionContext = createContext(/** @type {{state: UIState, setState: (st: UIState) => void; model: MigrationModel}} */ ({}))

/**
 * @param {object} props
 * @param {MigrationModel} props.model
 * @param {UIState} [props.initialState]
 * @param {import("preact").ComponentChildren} [props.children] - children can use useContext(ProtectionContext) to access state
 */
export function ProtectionHeader(props) {
    /** @type {UIState} */
    let initial
    if (props.initialState) {
        initial = props.initialState
    } else {
        if (props.model.isBroken || props.model.isAllowlisted) {
            initial = 'form-trigger'
        } else {
            initial = 'help-trigger'
        }
    }
    const [state, setState] = useState(/** @type {UIState} */ (initial))

    return (
        <>
            <div class="card-list--bordered">
                {props.model.isBroken && <HeaderDisabled model={props.model} state={state} />}
                {!props.model.isBroken && <HeaderDefault model={props.model} state={state} />}
            </div>
            <ProtectionContext.Provider
                value={{
                    state,
                    setState,
                    model: props.model,
                }}
            >
                {props.children}
            </ProtectionContext.Provider>
        </>
    )
}

export function ProtectionHeaderText() {
    // prettier-ignore
    let buttonText = ns.site('websiteNotWorkingPrompt.title')

    function onClickTextLink(e) {
        e.preventDefault()
        // dispatching this for now, since there a few things that
        // are checked/used in the existing view
        window.dispatchEvent(new CustomEvent('open-feedback'))
    }

    return (
        <div className="text--center">
            <TextLink onClick={onClickTextLink} rounded={true}>
                {buttonText}
            </TextLink>
        </div>
    )
}

/**
 * @param {object} props
 * @param {UIState} props.state
 * @param {MigrationModel} props.model
 */
function HeaderDefault(props) {
    const text = ns.site('websiteNotWorkingAdvice.title')
    const showHelp = props.state === 'site-not-working' && !props.model.isAllowlisted
    return (
        <div className="protection-toggle">
            <div className="protection-toggle__row">
                <ProtectionToggle model={props.model} />
            </div>
            {showHelp && <div className="protection-toggle__row protection-toggle__row--alt">{text}</div>}
        </div>
    )
}

/**
 * @param {object} props
 * @param {UIState} props.state
 * @param {MigrationModel} props.model
 */
function HeaderDisabled(props) {
    let text = i18n.t('site:protectionsDisabledRemote.title')
    if (props.model.isDenylisted) {
        text = i18n.t('site:protectionsDisabledRemoteOverride.title')
    }
    return (
        <>
            <div className="padding-x padding-y--reduced">
                <ProtectionToggle model={props.model} />
            </div>
            <div className="note note--nested">{text}</div>
        </>
    )
}
