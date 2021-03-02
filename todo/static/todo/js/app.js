let task = {
  delimiters: ['[[', ']]'],

  data: function () {
    return {
      name: 'New Task',
      desc: 'Description',
      finished: false
    }
  },
  
  template: 
  `
  <div class="card">

  <div class="card-body">

    <input v-model="name" 
    type="name" class="card-title">

    <input v-model="desc" 
    type="text" class="card-text">
    
    <a @click="add_to_board" class="btn btn-primary">add</a>
  </div>

</div>
  `,

  methods: {
    add_to_board: function () {
      todolist.add_task(this)
    },
    finish: function () {
      this.finished = true
    },
    close: function () {
      this.$destroy()
    }
  },

}

let todolist = new Vue({
    el: "#todo-list",
    delimiters: ['[[', ']]'],
    components: {task},

    data: {
      tasks: [],
      count: 0,
    },

    props: {

    },

    methods: {
      //Tasks
      add_task: function (task) {
        data = {
          name: task.name, 
          desc: task.desc,
          finished: task.finished
        }

        this.tasks.push(data)
        this.count++
      },
      finish_task: function (index) {
        this.tasks[index].finished = !this.tasks[index].finished
      },
      remove_task: function (index) {
        this.tasks.splice(index, 1)
        this.count--
      }
    },

    
    created:    function() {
      this.tasks = TASKS
      count = this.tasks.length
    },

    updated:    function() {
      var data = new FormData();
      data.append('csrfmiddlewaretoken', CSRF)
      data.append('tasks', this.tasks)
      post_url = window.location.origin + '/update_session/'

      var xhr = new XMLHttpRequest();
      xhr.open('POST', post_url, true );
      xhr.send(data);
    },

    /*
    mounted:    function() {},
    
    computed:   function() {},
    destroyed:  function() {},
    */
  });

function reset_session() {
  var data = new FormData();
      data.append('csrfmiddlewaretoken', CSRF)
      post_url = window.location.origin + '/reset_session/'

      var xhr = new XMLHttpRequest();
      xhr.open('POST', post_url, true );
      xhr.send(data);
}