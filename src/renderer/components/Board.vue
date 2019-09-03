<template>
<div>
  <div class="subjects-container">
    <div class="subjects">
      <div v-for="subject in data.courses" class="inter-class">
        <div class="subject-title">
          {{subject.course.name}}
        </div>
        <ul>
          <li v-for="topic in subject.lessons" class="welcome-subject"
          @click="setTopic($event, subject.course.name, topic.name, subject.course.path)"
          @dblclick="openTopic(subject.course.name, topic.name, subject.course.path)">
            {{topic.name}}
          </li>
        </ul>
      </div>
      <div v-if="data.courses.length == 0" class="welcome-message">
        <h2> Welcome to Multimodal! </h2>
        <div>
          It seems you haven't added any subjects yet.
          <ul>
            <li>Click on 'Create' to get started...</li>
            <li>...or peruse the <a href="https://periode.github.io/multimodal/" target="_blank">homepage</a> to learn more.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="buttons-container">
    <button class="btn" @click="create"> create </button>
    <button class="btn" @click="exportTo"> export </button>
    <button class="btn" @click="remove"> remove </button>

    <div class="msg-log" id="msg-log"></div>
  </div>
</div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

//---------------- BUTTONS
.buttons-container {
	position: fixed;
	z-index: 3;
	bottom: 0px;
	left: 0px;
	padding-left: 10px;
	height: 5vh;
	width: 100%;

	background-color: $main-bg-color;
	border-top: 2px solid $main-fg-color;

	button {
		margin-right: 2%;
    border: none;
	}
}

.btn {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
  font-size: $btn-size;
	font-family: 'Inter UI';
	cursor: pointer;

  @media (max-width: $break-medium){
		font-size: 1.5em;
	}
}

.btn:hover{
	background-color: $main-bg-color;
	color: $main-fg-color;
}

.btn:active{
	border: none;
}
</style>

<script>
const ipc = require('electron').ipcRenderer

export default {
  components: {

  },
  props: {

  },
  data: function () {
    return {
      data: {},
      current: {
      	'course':'',
      	'name':'',
      	'path': ''
      }
    }
  },
  methods: {
    setTopic(_e, _c, _l, _p) {
      this.current.course = _c
      this.current.name = _l
      this.current.path = _p

      let all_lessons = document.getElementsByClassName('welcome-lesson')
      for(let l of all_lessons)
        l.setAttribute('class', 'welcome-lesson')


      _e.target.setAttribute('class', 'welcome-lesson selected')

      let btns = document.getElementsByClassName('inter-btn-main')
      for(let btn of btns)
        btn.disabled = false
    },
    openTopic(_c, _l, _p){
    	ipc.send('open-lesson', this.current)
    },
    create() {

    },
    exportTo() {

    },
    remove(){

    }
  },
  beforeMount(){
    this.data = window.data
  },
  mounted(){

  }
}
</script>
