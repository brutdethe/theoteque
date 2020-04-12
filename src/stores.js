import { writable, derived } from 'svelte/store'
import tea from './teaData.js'

export const type = writable('')
export const criteria = writable('')

export const teaGroup = derived([type, criteria], $selected => {
    if ($selected[0] && Number.isInteger($selected[1])) {
        return tea.brewList.filter(tea => tea.type === $selected[0])[
            $selected[1]
        ]
    } else {
        return undefined
    }
})
