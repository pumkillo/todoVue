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
        query: "",
    },
    methods: {
        addNewNote() {
            datetime = new Date();
            this.notes.push({
                name: "",
                color: "#000000",
                todolist: [],
                datetime: `${datetime.getHours()}:${datetime.getMinutes()}`,
            })
        },
        deleteNote(index) {
            this.notes.splice(index, 1);
        },
        addNewListItem(index) {
            if (event.target.value !== "") {
                this.notes[index].todolist.push(event.target.value);
                event.target.value = "";
            }

        }
    }
})