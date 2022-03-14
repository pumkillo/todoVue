Vue.component("color-block", {
    template: '<div :style="styles" class="color-block"></div>',
    props: ["color"],
    data() {
        return {

        };
    },
    computed: {
        styles: function () {
            return {
                backgroundColor: this.color,
            }
        }
    }
})

let app = new Vue({
    el: "#app",
    data: {
        notes: [{
            color: "#734529",
            name: "Shopping list",
            todolist: ["milk", "bread"],
            datetime: "12:15",
            
        }],
        queryRes: [],
        query: "",
    },
    mounted() {
        if (localStorage.getItem('notes')) {
            try {
                this.notes = JSON.parse(localStorage.getItem('notes'));
            } catch (e) {
                localStorage.removeItem('notes');
            }
        }
        this.queryRes = this.notes;
    },
    computed: {
        queryLength: function(){
            return this.queryRes.length;
        },
    },
    beforeUpdate() {
        this.putInLocalStorageNotes();
    },
    methods: {
        putInLocalStorageNotes() {
            const parsed = JSON.stringify(this.notes);
            localStorage.setItem('notes', parsed);
        },
        addNewNote() {
            datetime = new Date();
            let minutes = datetime.getMinutes() < 10 ? `0${datetime.getMinutes()}` : datetime.getMinutes();
            let month = datetime.getMonth() + 1 < 10 ? `0${datetime.getMonth() + 1}` : datetime.getMonth() + 1;
            this.notes.unshift({
                name: "",
                color: "#000000",
                todolist: [],
                datetime: `${datetime.getDate()}.${month}.${datetime.getFullYear()}    ${datetime.getHours()}:${minutes}`,
            });
        },
        deleteNote(index) {
            this.notes.splice(index, 1);
        },
        addNewListItem(index) {
            if (event.target.value !== "") {
                this.notes[index].todolist.push(event.target.value);
                event.target.value = "";
            }
        },
        search() {
            let query = this.query;
            if(query === "") {
                this.queryRes = this.notes;
                return;
            }
            queryRes = this.notes.filter(function (obj) {
                return RegExp(query).test(obj.name);
            })
            this.queryRes = queryRes;
        },
    }
})