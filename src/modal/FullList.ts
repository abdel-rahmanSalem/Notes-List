import ListItem from './ListItem'

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObject: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List {
    //Instantiate One Object From This Class Since It Will Be One Note List 
    static instance: FullList = new FullList()

    private constructor(private _list: ListItem[] = []){}

    get list(): ListItem[] {
        return this._list
    }

    //Load Methode
    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const myListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(myListItem)
        })
    }

    //Save Methode >> Store The List In The Local Storage
    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    //Clear methode >> Clear All Items In The List
    clearList(): void {
        this._list = []
        this.save()
    }

    //Add Item Methode >> Adding Item At The End Of The List
    addItem(itemObject: ListItem): void {
        this._list.push(itemObject)
        this.save()
    }

    //Remove Item Methode >> Removing A Specific Item Using It's ID From The List
    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}