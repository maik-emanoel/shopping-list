import { ItemsArrayProps } from "../App"

export function saveItemsToLocalStorage(items: ItemsArrayProps[]) {
    localStorage.setItem('shoppingListItems', JSON.stringify(items))
}

export function loadItemsFromLocalStorage() {
    const storedItems = localStorage.getItem('shoppingListItems')
    return storedItems ? JSON.parse(storedItems) : []
}