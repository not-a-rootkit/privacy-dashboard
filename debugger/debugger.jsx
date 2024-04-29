// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, render } from 'preact'
import styles from './debugger.module.css'
import { createDataStates } from '../shared/js/ui/views/tests/generate-data.mjs'

import google from '../schema/__fixtures__/request-data-google.json'
import cnn from '../schema/__fixtures__/request-data-cnn.json'

const states = createDataStates(/** @type {any} */ (google), /** @type {any} */ (cnn))
const keys = Object.keys(states)

const items = [
    {
        platform: 'android',
        height: 780,
    },
    {
        platform: 'ios',
        height: 780,
    },
    {
        platform: 'macos',
        height: 600,
    },
    {
        platform: 'windows',
        height: 780,
    },
    {
        platform: 'browser',
    },
]
let searchParams = new URL(window.location.href).searchParams
let initialState = searchParams.get('state')
if (!initialState || !keys.includes(initialState)) {
    initialState = 'protectionsOn_blocked'
}

let reflectList = ['screen']
let reflectParams = new URLSearchParams(Object.entries({ state: initialState }))
for (let [key, value] of searchParams) {
    if (reflectList.includes(key)) {
        reflectParams.set(key, value)
    }
}

let platforms = (() => {
    let subject = searchParams.get('platforms')
    const known = items.map((x) => x.platform)
    if (subject) {
        const selected = subject
            .split(',')
            .map((x) => x.trim())
            .filter((x) => known.includes(x))
        if (selected.length > 0) {
            return selected
        }
    }
    return known.slice(0, 3)
})()

function update(value) {
    const url = new URL(window.location.href)

    // remove existing reflected params
    for (let key of reflectList) {
        url.searchParams.delete(key)
    }

    // set the new state (as chosen in the dropdown)
    url.searchParams.set('state', value)
    const selected = states[value]

    // reflect explicit url params
    for (let [key, value] of Object.entries(selected.urlParams)) {
        url.searchParams.set(key, String(value))
    }

    // reload the page with all new URL
    window.location.href = url.href
}

function updatePlatforms(value) {
    const url = new URL(window.location.href)
    url.searchParams.set('platforms', value.join(','))
    window.location.href = url.href
}

function App() {
    return (
        <div class={styles.grid}>
            <div class={styles.header}>
                <Selector selected={initialState} onChange={update} />
                <Toggles selected={platforms} onChange={updatePlatforms} />
            </div>
            <div class={styles.content}>
                <Frames platforms={platforms} initialState={initialState} />
            </div>
        </div>
    )
}

function Selector({ selected, onChange }) {
    return (
        <select onChange={(/** @type {any} */ e) => onChange(e.target.value)}>
            {Object.entries(states).map(([key]) => {
                return (
                    <option value={key} selected={selected === key}>
                        {key}
                    </option>
                )
            })}
        </select>
    )
}

function Toggles({ selected, onChange }) {
    function onChanged(e) {
        const d = new FormData(e.target.form)
        onChange(d.getAll('platform'))
    }
    return (
        <form onChange={onChanged}>
            {items.map((item) => {
                return (
                    <label class={styles.label}>
                        <input type="checkbox" name="platform" value={item.platform} checked={selected.includes(item.platform)}></input>{' '}
                        {item.platform}
                    </label>
                )
            })}
        </form>
    )
}

function Frames({ platforms, initialState }) {
    const previewJSON = states[initialState]
    const { certificate, ...rest } = previewJSON
    rest.certificate = certificate
    return (
        <div class={styles.frames}>
            <div class={styles.code} data-state="ready">
                <pre>
                    <code>{JSON.stringify(rest, null, 2)}</code>
                </pre>
            </div>
            {items.map((item) => {
                const { platform } = item
                const src = item.platform + '.html?' + reflectParams.toString()
                const height = item.height ?? 600
                return (
                    <div class={styles.frame} data-state={platforms.includes(platform) ? 'ready' : 'hidden'}>
                        <p>
                            <a href={src} target="_blank">
                                Open in new tab
                            </a>
                        </p>
                        <p>
                            <code>{item.platform}</code> <small>{initialState}</small>
                        </p>
                        <iframe
                            src={src}
                            frameBorder="0"
                            style={{
                                width: '360px',
                                height: height + 'px',
                            }}
                        ></iframe>
                    </div>
                )
            })}
        </div>
    )
}

render(<App />, /** @type {HTMLDivElement} */ (document.querySelector('#app')))
