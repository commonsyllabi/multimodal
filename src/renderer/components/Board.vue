<template>
  <div>

    <div class="menu-container">
      <div class="menu-top">
        <div class="menu-item">
          {{new Date().toDateString()}}
        </div>

        <hr>
        <div class="menu-item">
        <button  @click="showCreate = true">create</button>
        </div>

        <div class="menu-item">
          <button  @click="importFrom">import</button>
        </div>

        <div class="menu-item">
          <button>settings</button>
        </div>
      </div>

      <div class="menu-bottom">
        <a href="mailto:pierre.depaz@gmail.com?subject=feedback">pierre depaz</a> | <a href="https://multimodal.cc" target="_blank">multimodal.cc</a>
      </div>

    </div>

    <!-- MIDDLE -->
    <div class="subjects-container">
      <div class="subjects">
        <h1>My Syllabi</h1>
        <!-- LIST SUBJECTS -->
        <div v-for="single in data.subjects" :class="current.subject.name == single.subject.name ? 'subject-container unfolded' : 'subject-container folded'">
          <div class="subject">

            <!-- SUBJECT NAME -->
            <div  class="subject-name">
              <div v-if="single.isEdit">
                <input type="text" v-model:value="single.subject.name" placeholder="subject name">
              </div>
              <div v-else @click="setSubject($event, single.subject)">
                {{single.subject.name}}
              </div>
            </div>


              <div class="subject-buttons">
                <button @click="toggleEdit($event, single)">{{single.isEdit ? 'save' : 'edit'}}</button>
                <button @click="">duplicate</button>
                <button @click="exportTo('subject', 'html', single.subject.name, single.subject.path)">to html</button>
                <button @click="exportTo('subject', 'pdf', single.subject.name, single.subject.path)">to pdf</button>
                <button @click="removeSubject(single.subject)">remove</button>
              </div>

              <div v-if="current.subject.name == single.subject.name" class="subject-info-container">
                <div class="subject-info-item">
                  <b>Description:</b><br>
                  <div v-if="!single.isEdit" v-html="markdown(single.subject)"></div>
                  <div v-else class="">
                    <textarea v-model:value="single.subject.description.text" placeholder="description of the subject"></textarea>
                  </div>

                </div>
                <div class="subject-info-item">
                  <b>Created at:</b><br>
                  {{single.subject.created}}
                </div>
                <div class="subject-info-item">
                  <b>Path:</b><br>
                  {{single.subject.path}}
                </div>
              </div>

          </div>
        </div>

        <!-- WELCOME MESSAGE -->
        <div v-if="data.subjects.length == 0" class="welcome-message">
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

    <!-- RIGHT -->
    <div class="topics-container">
      <div class="topics" v-if="current.subject.name != undefined">
        <h1>My Classes</h1>
        <ul>
          <li v-for="topic in current.subject.topics" class="topic">
          <div class="topic-name" @click="openTopic($event, topic.name)">
            {{topic.name}}
          </div>

            <div class="topic-buttons">
              <button @click="exportTo('topic', 'html', topic.name)">to html</button>
              <button @click="exportTo('topic', 'pdf', topic.name)">to pdf</button>
              <button @click="removeTopic(topic)">remove</button>
            </div>
          </li>
        </ul>
        <button class="topic-create" @click="createTopic(current.subject)">create new topic</button>
      </div>
    </div>

    <!-- OVERLAY -->
    <Create v-if="showCreate" @close="showCreate = false" @create-subject="createSubject"/>

    <div class="msg-log" id="msg-log"></div>

  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

h1{
  margin-bottom: 50px;
}


//---------------- GENERAL
.subjects-container, .topics-container, .menu-container{
  display: inline-block;
  float: left;
	height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.subjects-container, .topics-container{
  position: absolute;
	float: left;
  width: 40vw;
  left: 0;
}

//---------------- MENU
.menu-container{
  position: fixed;
  width: 12vw;
  padding: 2vw;
  background-color: $main-fg-color;
  color: $main-bg-color;
}

.menu-container hr{
  border: 1px solid $main-bg-color;
}

.menu-bottom{
  position: absolute;
  bottom: 100px;
}

.menu-item, .menu-item button{
  font-size: 24px;
  width: 90%;
  text-align: center;
  background-color: transparent;
  color: $main-bg-color;
}

.menu-item button:hover{
  text-decoration: underline;
}

//---------------- SUBJECTS
.subjects-container{
  left: 16vw;
}

.subjects{
	padding: 5%;
	margin-bottom: 5%;
}

.subject-container{
  border-bottom: 2px solid $main-fg-color;
  overflow: hidden;
  transition: all 1.5s linear;
}

.subject {
	width: 100%;
	font-weight: bold;
	font-size: 2em;
}

.subject button, .topic button{
  text-align: center;
  border: none;
  margin: 0;
  padding: 0;
}

.subject button:hover, .topic button:hover, .subject-name:hover, .topic-name:hover{
  text-decoration: underline;
}

.subject-name, .subject-buttons, .subject-info-container{
  padding-left: 1vw;
}

.subject-info-container{
	color: $main-fg-color;
	background-color: $main-bg-color;
  padding: 10px;
}

.subject-info-item{
  font-size: 16px;
  font-weight: normal;
  margin: 10px;
}

.subject-info-item textarea{
  width: 100%;
  font-size: 1em;
  min-height: 150px;
  border-bottom: 2px solid $main-fg-color;
}

.subject-buttons{
  pointer-events: all;
  width: 100%;
  margin-top: -10px;
}

.subject-name{
  padding-top: 20px;
  cursor: pointer;
  overflow: hidden;
}

.subject-name input{
  width: 50%;
  font-size: 1em;
  background-color: transparent;
  border-bottom: 2px solid $main-fg-color;
}

//---------------- TOPICS
.topics-container{
  left: 56vw;
}

.topic, .topic-instance {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
	font-family: 'Inter UI';
	font-size: 1.2em;
}

.topics{
  padding: 5%;
	margin-bottom: 5%;
}

.topic {
	border: 2px solid $main-bg-color;
  padding: 1vw;
  list-style-type: none;
  color: $main-bg-color;
  background-color: $main-fg-color;
}

.topic button{
  color: $main-bg-color;
  background-color: $main-fg-color;
  cursor: pointer;
}

.topic-create{
  font-size: 18px;
  font-weight: bold;
}

.topic-name{
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  font-weight: bold;
}

.selected{
  background-color: $main-fg-color;
  color: $main-bg-color;
  border-color: $main-fg-color;
  font-weight: bold;
}

.folded {
  max-height: 15vh;
}

.unfolded{
  max-height: 100vh;
}
</style>

<script>
const ipc = require('electron').ipcRenderer
const {dialog} = require('electron').remote
const marked = require('marked')

import Create from './Create.vue'

export default {
  components: {
    Create
  },
  data: function () {
    return {
      data: {},
      current: {
        subject: {
          name: undefined,
          id: undefined,
          path: '',
          topics: [],
          description: {
            "text": '',
            "html": ''
          }
        },
        topic: {
          name: undefined
        }
      },
      showCreate: false
    }
  },
  computed: {
    // markdown: function(_subject) { //-- parse the text as markdown and render as html
    //   console.log(_subject);
    //   _subject.description.html = marked(_subject.description.text)
    //   return  _subject.description.html
    // }
  },
  methods: {
    markdown (_subject){
      _subject.description.html = marked(_subject.description.text)
      return  _subject.description.html
    },
    //------------
    //-- sets the current subject, taking event, subject, path and topics
    //-- removes styles from all subjects and topics
    //-- styles the current subject
    //------------
    setSubject(_e, _subject, _p, _t){
      for(let s of this.data.subjects)
        if(_subject.id != this.current.subject.id)
          s.isEdit = false

      this.current.subject.name = _subject.name
      this.current.subject.id = _subject.id
      this.current.subject.topics = _subject.topics
      this.current.subject.path = _subject.path
    },
    //------------
    //-- toggles edit mode independently for each subject
    //------------
    toggleEdit(_e, _single){
      this.setSubject(_e, _single.subject)

      for(let s of this.data.subjects)
        if(s.subject.id == _single.subject.id)
          s.isEdit = !s.isEdit
        else
          s.isEdit = false


      if(_single.isEdit){
        console.log('NEED TO WRITE THE LOGIC FOR SAVING');
      }
    },
    //------------
    //-- opens the topic
    //------------
    openTopic(_e, _n){
      this.current.topic.name = _n
      if(this.current.topic == {}) return

    	ipc.send('open-topic', this.current)
    },
    //------------
    //-- opens a dialog box to import a .mmd file
    //------------
    importFrom() {
      let options = {
        'title':'Select file to import',
        'defaultPath':'~/',
        'properties':['openFile']
      }

      dialog.showOpenDialog(options, (p) => {
    		ipc.send('import-subject', JSON.stringify({path: p[0]}))
    	})
    },

    //------------
    //-- opens a dialog box to export
    //-- either from subject or topic
    //-- either to html or to pdf
    //-- with a given path
    //-- and exports that
    //------------
    exportTo(_format, _type, _name, _path) {
      if(_format == 'topic') this.current.topic.name = _name

      let options = {
    		'title':'Select export path',
    		'defaultPath':'~/',
    		'properties':['openDirectory', 'createDirectory']
    	}

    	dialog.showOpenDialog(options, (_path) => {
    		ipc.send('export', JSON.stringify({info: this.current, path: _path, type: _type, format: _format}))
    	})
    },
    //------------
    //-- creates a topic, under a given subject
    //------------
    createTopic(_subject){
      ipc.send('create-topic', {subject: _subject})
    },
    //------------
    //-- removes a given topic
    //------------
    removeTopic(_topic){
      msgbox.setMessage("are you sure you want to remove this topic?", [{fn: () => {
        ipc.send('remove-topic', _topic)
      }, name: "remove"}], null, true)
    },
    //------------
    //-- creates a new subject
    //-- called from within the Create component
    //------------
    createSubject(_subject){
      ipc.send('create-subject', _subject)
    },
    //------------
    //-- removes a given subject
    //------------
    removeSubject(_subject){
      msgbox.setMessage("are you sure you want to remove this subject?", [{fn: () => {
        ipc.send('remove-subject', _subject)
      }, name: "remove"}], null, true)
    }
  },
  //------------
  //-- loads the data rendered with pug
  //------------
  beforeMount(){
    //-- populate edit flags for each subject
    for(let s of window.data.subjects)
      s.isEdit = false

    //-- check that the data has correct description fields
    for(let s of window.data.subjects)
      if(s.subject.description.text == undefined)
        s.subject.description = {"text": s.subject.description, "html": ''}

    this.data = window.data
  },
  mounted(){
    //------------
    //-- sets up the event listener
    //-- to display the result of exportTo
    //------------
    ipc.on('export-success', (event, d) => {
      let data = {
        path: JSON.parse(d.data).path,
        type: JSON.parse(d.data).type,
        name: JSON.parse(d.data).info.name
      }

      msgbox.setMessage("export successful!", [{fn: () => {
        data.location = "folder"
        ipc.send('open-export', JSON.stringify(data))
      }, name: "show in folder"},
      {fn: () => {
        data.location = "show"
        ipc.send('open-export', JSON.stringify(data))
      }, name: "open file"}], null, true)
    })
  }
}
</script>
