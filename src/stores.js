import { writable, derived } from 'svelte/store'
import tea from './teaData.js'

export const type = writable('')
export const criteria = writable('')
export const brewStyle = writable('')

// on a plutôt besoin de l'infusion
export const brew = derived([type, criteria, brewStyle], $selected => {
    if ($selected[0] && $selected[1] && $selected[2]) {
        return tea.brewData.filter(
            tea =>
                tea.type === $selected[0] && tea.criteria[0].cn === $selected[1]
        )[0].brew_style[$selected[2]]
    } else {
        return ''
    }
})
