import { readable } from 'svelte/store'
import yaml from 'js-yaml'

export const i18n = readable([], set => {
    fetch('./teaTranslate.yaml').then(response => response.text()).then(texts =>
        set(yaml.safeLoad(texts))
    ).catch((error) => {
        throw new Error(error)
    })
})
