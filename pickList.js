class pickList {
    items = ['Часы', 'Футболка', 'Фитнес - трекер', 'Портмоне', 'Браслет', 'Сережки']; // Все возможные значения
    itemsInAvailable = []; // Массив возможных значений
    itemsInSelect = []; // Массив выбранных значений
    selectedItem = null; // Текущее значение

    constructor() {
        const main = document.querySelector('.main'); 

        // Отрисовка контрола 

        const pickList = document.createElement('div') // Создание главного div контрола
        pickList.classList.add('pick-list') // Добавление класса 
        main.appendChild(pickList) // Добавление к родителю

        const available = document.createElement('div') // Блок поля возможных значений
        available.classList.add('available')
        pickList.appendChild(available)

        const nameTable = document.createElement('div') // Блок названия поля
        nameTable.classList.add('name-table')
        available.appendChild(nameTable)

        const h4 = document.createElement('h4') // Текст названия поля
        h4.innerHTML = 'Available'
        nameTable.appendChild(h4)

        const search = document.createElement('div') // Блок поиска поля
        search.classList.add('search')
        available.appendChild(search)

        const availInput = document.createElement('input') // input поиска
        availInput.classList.add('input')
        availInput.classList.add('availInput')
        search.appendChild(availInput)

        const ul = document.createElement('ul') // Список возможных значений
        ul.classList.add('items-in-table')
        ul.classList.add('avail')
        available.appendChild(ul)

        const selected = document.createElement('div') // Блок выбранных значений поля
        selected.classList.add('selected')
        pickList.appendChild(selected)

        const nameTableSelected = document.createElement('div') // Блок названия поля
        nameTableSelected.classList.add('name-table')
        selected.appendChild(nameTableSelected)

        const h4Selected = document.createElement('h4') // Текст названия поля
        h4Selected.innerHTML = 'Selected'
        nameTableSelected.appendChild(h4Selected)

        const searchSelected = document.createElement('div') // Блок поиска поля
        searchSelected.classList.add('search')
        selected.appendChild(searchSelected)

        const selectInput = document.createElement('input') // input поиска
        selectInput.classList.add('input')
        selectInput.classList.add('selectInput')
        searchSelected.appendChild(selectInput)

        const ulSelected = document.createElement('ul') // Список выбранных значений
        ulSelected.classList.add('items-in-table')
        ulSelected.classList.add('select')
        selected.appendChild(ulSelected)

        const buttons = document.createElement('div') // Создание блока с кнопками
        buttons.classList.add('buttoms')
        pickList.appendChild(buttons)

        const buttonSelect = document.createElement('div') // Создание кнопки перемещения элемента в поле выбранных значений
        buttonSelect.classList.add('buttom')
        buttonSelect.classList.add('to-select')
        buttonSelect.innerHTML = '>'
        buttons.appendChild(buttonSelect)

        const buttonAvail = document.createElement('div') // Создание кнопки перемещения элемента в поле возможных значений
        buttonAvail.classList.add('buttom')
        buttonAvail.classList.add('to-available')
        buttonAvail.innerHTML = '<'
        buttons.appendChild(buttonAvail)

        const buttonReset = document.createElement('div') // Создание кнопки Reset
        buttonReset.classList.add('buttom')
        buttonReset.classList.add('reset')
        buttonReset.innerHTML = 'Reset'
        buttons.appendChild(buttonReset)

        const buttonNewObj = document.createElement('div') // Кнопка для создания нового объекта контрола
        buttonNewObj.classList.add('buttom')
        buttonNewObj.classList.add('new-obj')
        buttonNewObj.innerHTML = 'New Obj'
        buttons.appendChild(buttonNewObj)

        this.ul = ul
        this.ulSelected = ulSelected

        // Слушатели событий на кнопки и поля

        buttonSelect.addEventListener('click', () => { 
            this.toSelected();
        })

        buttonAvail.addEventListener('click', () => {
            this.toAvailable();
        })

        ul.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('item')) {
                this.highlight(target)
            }
        })

        ulSelected.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('item')) {
                this.highlight(target)
            }
        })

        availInput.addEventListener('change', () => {
            this.sortAvailable(availInput.value)
        })
        
        selectInput.addEventListener('change', () => {
            this.sortSelect(selectInput.value)
        })

        buttonReset.addEventListener('click', () => {
            this.reset()
        })

        buttonNewObj.addEventListener('click', () => {
            this.newObj()
        })

    }

    // Методы объекта
    
    createAvailable() {  // Отрисовка списка возможных значений
        this.items.map(item => {
            const elem = document.createElement('li')
            elem.classList.add('item')
            elem.innerHTML = item
            this.ul.appendChild(elem)
            this.itemsInAvailable.push(item)
        })
    }

    highlight(item) { // Подсвечивание выбранного элемента 
        if (this.selectedItem) { 
            this.selectedItem.classList.remove('active');
        }
        this.selectedItem = item;
        this.selectedItem.classList.add('active'); 
    }

    toSelected() { // Отправка выбранного элемента в список выбранных значений
        this.ulSelected.appendChild(this.selectedItem)
        const myIndex = this.itemsInAvailable.indexOf(this.selectedItem.innerHTML);
        if (myIndex !== -1) {
            this.itemsInAvailable.splice(myIndex, 1);
        }
        this.itemsInSelect.push(this.selectedItem.innerHTML)
    }

    toAvailable() { //Отправка выбранного элемента в список возможных значений
        this.ul.appendChild(this.selectedItem)
        const myIndex = this.itemsInSelect.indexOf(this.selectedItem.innerHTML);
        if (myIndex !== -1) {
            this.itemsInSelect.splice(myIndex, 1);
        }
        this.itemsInAvailable.push(this.selectedItem.innerHTML)
    }

    sortAvailable(value) { //Сортировка списка возможных значений
        const data = this.itemsInAvailable.filter(item => {
            return item.toLowerCase().includes(value.toLowerCase())
        })
        this.ul.innerHTML = ''
        data.map(item => {
            const elem = document.createElement('li')
            elem.classList.add('item')
            elem.innerHTML = item
            this.ul.appendChild(elem)
        })
    }

    sortSelect(value) { //Сортировка списка выбранных значений
        const data = this.itemsInSelect.filter(item => {
            return item.toLowerCase().includes(value.toLowerCase())
        })
        this.ulSelected.innerHTML = ''
        data.map(item => {
            const elem = document.createElement('li')
            elem.classList.add('item')
            elem.innerHTML = item
            this.ulSelected.appendChild(elem)
        })
    }

    reset() { // Сброс значений к начальному состоянию
        this.ul.innerHTML = ''
        this.ulSelected.innerHTML = ''
        this.selectedItem = null
        this.itemsInAvailable = []
        this.itemsInSelect = []
        this.createAvailable()
    }

    randomValueItems() { // Случайные возможные значения
        this.items = []
        let randomNum = Math.floor(Math.random() * 10);
        for (let i = 0; i <= randomNum; i++) {
            let randomValue = Math.floor(Math.random() * 10);
            this.items.push(String(randomValue))
        }

    }

    newObj() { // Создание нового объекта
        let newObj = new pickList()
        newObj.randomValueItems()
        newObj.createAvailable()
    }
}

const first = new pickList()
first.createAvailable()












