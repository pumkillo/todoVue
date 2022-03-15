Vue.component("color-block", {
  template: '<div :style="styles" class="color-block"></div>',
  props: ["color"],
  data() {
    return {};
  },
  computed: {
    styles: function () {
      return {
        backgroundColor: this.color,
      };
    },
  },
});

let app = new Vue({
  el: "#app",
  data: {
    notes: [
      {
        color: "#734529",
        name: "Shopping list",
        todolist: [
          { name: "milk", checked: false, priority: [] },
          { name: "bread", checked: true, priority: [] },
        ],
        datetime: "12:15",
        timestamp: 3495834995,
      },
    ],
    sortingCriteria: "all",
    queryRes: [],
    query: "",
  },
  mounted() {
    if (localStorage.getItem("notes")) {
      try {
        this.notes = JSON.parse(localStorage.getItem("notes"));
      } catch (e) {
        localStorage.removeItem("notes");
      }
    }
    this.queryRes = this.notes;
  },
  computed: {
    queryLength: function () {
      return this.queryRes.length;
    },
    sortedQueryRes: function () {
      array = this.queryRes.slice(0);
      switch (this.sortingCriteria) {
        case "name":
          return array.sort(function (obj1, obj2) {
            if (obj1.name.toLowerCase() < obj2.name.toLowerCase()) return -1;
            if (obj1.name.toLowerCase() > obj2.name.toLowerCase()) return 1;
            return 0;
          });
        case "date":
          return array.sort(function (obj1, obj2) {
            return obj1.timestamp - obj2.timestamp;
          });
        case "priority":
          return this.queryRes;
        default:
          return this.queryRes;
      }
    },
  },
  beforeUpdate() {
    this.putInLocalStorageNotes();
  },
  methods: {
    putInLocalStorageNotes() {
      const parsed = JSON.stringify(this.notes);
      localStorage.setItem("notes", parsed);
    },
    addNewNote() {
      datetime = new Date();
      let minutes =
        datetime.getMinutes() < 10
          ? `0${datetime.getMinutes()}`
          : datetime.getMinutes();
      let month =
        datetime.getMonth() + 1 < 10
          ? `0${datetime.getMonth() + 1}`
          : datetime.getMonth() + 1;
      this.notes.unshift({
        name: "",
        color: "#000000",
        todolist: [],
        datetime: `${datetime.getDate()}.${month}.${datetime.getFullYear()}    ${datetime.getHours()}:${minutes}`,
        timestamp: Date.now(),
      });
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
    addNewListItem(index) {
      if (event.target.value !== "") {
        this.notes[index].todolist.push({
          name: event.target.value,
          checked: false,
          priority: [],
        });
        event.target.value = "";
      }
    },
    search() {
      let query = this.query;
      if (query === "") {
        this.queryRes = this.notes;
        return;
      }
      queryRes = this.notes.filter(function (obj) {
        return RegExp(query).test(obj.name);
      });
      this.queryRes = queryRes;
    },
  },
});
