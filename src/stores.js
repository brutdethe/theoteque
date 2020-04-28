import { readable } from 'svelte/store'
import yaml from 'js-yaml'

export const teas = readable([], set =>
    fetch('./teas.yaml').then(response => response.text()).then(teas =>
        set(yaml.safeLoad(teas))
    ).catch((error) => {
        throw new Error(error)
    }))

export const i18n = readable([], set =>
    fetch('./teaTranslate.yaml').then(response => response.text()).then(texts =>
        set(yaml.safeLoad(texts))
    ).catch((error) => {
        throw new Error(error)
    }))