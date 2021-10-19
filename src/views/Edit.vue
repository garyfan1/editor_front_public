<template>
  <div class="edit">
    <v-btn @click="save()">save</v-btn>
    <br><br>
    <v-text-field label="Title" :readonly="!this.$store.getters.signedIn" v-model="title" style="text-align: center;"></v-text-field>
    
    <v-row>
    <v-col cols="6">
    <v-select
      v-model="my_category"
      :items="all_categories"
      label="Category"
    ></v-select>
    </v-col>
    <v-col cols="6">
    <v-select
      v-model="my_tags"
      :items="all_tags"
      label="Tags"
      multiple
    ></v-select>
    </v-col>
    </v-row>

    <editor v-if="editor_show" :ref="'editorJs'+post_id" :config="config" :holder="'editorJs'+post_id" :initialized="onInitialized"/>
  </div>
</template>

<script>
import Header from '@editorjs/header'
import List from '@editorjs/list'
import CodeTool from '@editorjs/code'
import Paragraph from '@editorjs/paragraph'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Checklist from '@editorjs/checklist'
import Marker from '@editorjs/marker'
import Warning from '@editorjs/warning'
import RawTool from '@editorjs/raw'
import Quote from '@editorjs/quote'
import InlineCode from '@editorjs/inline-code'
import Delimiter from '@editorjs/delimiter'
import SimpleImage from '@editorjs/simple-image'

import { Editor } from 'vue-editor-js/src/index.js'

export default {
  created(){
    if(this.$store.getters.signedIn){
      this.config.readOnly=false;
    }

    this.get_tags_and_categories();

    this.post_id = this.$route.params.post_id
    console.log("post_id = "+ this.post_id)

    if(this.post_id!=-1){
      this.get_post();
    }
    else{
      this.editor_show=true;
    }

    
    
  },
  components:{
      Editor
  },
  data() {
    return {
      title: "",
      editor_data: null,
      editor: null,
      editor_show: false,
      post_id: null,
      all_tags:[],
      pk_tag:{},
      tag_pk:{},
      my_tags:[],
      all_categories:[],
      categories_pk: {},
      my_category:"",
      config: {
        readOnly: true,
        tools:{
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 3,
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          code: {
            class: CodeTool
          },
          paragraph: {
            class: Paragraph,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
                imgur: true
              }
            }
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          checklist: {
            class: Checklist,
          },
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
              titlePlaceholder: 'Title',
              messagePlaceholder: 'Message',
            },
          },
          raw: RawTool,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
          },
          delimiter: Delimiter,
          image: SimpleImage,
        },
        onReady: () => {
          console.log('on ready')
        },
        onChange: (args) => {
          console.log('Now I know that Editor\'s content changed!')
        },
        data: {
            "time": 1591362820044,
            "blocks": [
                {
                    "type" : "header",
                    "data" : {
                        "text" : "Editor.js",
                        "level" : 2
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
                    }
                },
                {
                    "type" : "header",
                    "data" : {
                        "text" : "Key features",
                        "level" : 3
                    }
                },
                {
                    "type" : "list",
                    "data" : {
                        "style" : "unordered",
                        "items" : [
                            "It is a block-styled editor",
                            "It returns clean data output in JSON",
                            "Designed to be extendable and pluggable with a simple API"
                        ]
                    }
                },
                {
                    "type" : "header",
                    "data" : {
                        "text" : "What does it mean «block-styled editor»",
                        "level" : 3
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "There are dozens of <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> and the <a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
                    }
                },
                {
                    "type" : "header",
                    "data" : {
                        "text" : "What does it mean clean data output",
                        "level" : 3
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "Given data can be used as you want: render with HTML for <code class=\"inline-code\">Web clients</code>, render natively for <code class=\"inline-code\">mobile apps</code>, create markup for <code class=\"inline-code\">Facebook Instant Articles</code> or <code class=\"inline-code\">Google AMP</code>, generate an <code class=\"inline-code\">audio version</code> and so on."
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "Clean data is useful to sanitize, validate and process on the backend."
                    }
                },
                {
                    "type" : "delimiter",
                    "data" : {}
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
                    }
                },
                {
                    "type" : "image",
                    "data" : {
                        "file" : {
                            "url" : "https://codex.so/public/app/img/external/codex2x.png"
                        },
                        "caption" : "",
                        "withBorder" : false,
                        "stretched" : false,
                        "withBackground" : false
                    }
                },
            ],
            "version" : "2.18.0"
        }
      },
    };
  },
  methods: {
    onInitialized (editor) {
      this.editor = editor;
    },
    save(){
      if(!this.$store.getters.signedIn){
        alert("can't save without signing in!")
        return
      }
      this.editor.save().then((data)=>{
        console.log(data);
        console.log(this.post_id);
        let data_string = JSON.stringify(data)
        let my_tag_pk=[];
        for(let i=0; i<this.my_tags.length; i++){
          my_tag_pk.push(this.tag_pk[this.my_tags[i]]);
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "title": this.title,
          "editor_text": data_string,
          "tags": my_tag_pk
        });

        if(this.post_id == -1){
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            credentials: 'include',
            redirect: 'follow'
          };
          fetch("http://localhost:8000/post/", requestOptions)
          .then(response => response.json())
          .then((result) => {
            console.log(result);
            this.post_id = result.id;
            alert("saved!");
          })
          .catch(error => console.log('error', error));
        }
        else{
          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            credentials: 'include',
            redirect: 'follow'
          };
          fetch("http://localhost:8000/post/"+this.post_id+"/", requestOptions)
          .then(response => response.text())
          .then((result) => {
            console.log(result);
            alert("saved!");
          })
          .catch(error => console.log('error', error));
        }
      })
    },
    get_post(){

      var myHeaders = new Headers();

      var requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch("http://localhost:8000/post/" + this.post_id, requestOptions)
        .then(response => response.json())
        .then((result) => {
          console.log(result);
          this.editor_data = result;
          this.config.data = JSON.parse(this.editor_data.editor_text);
          this.title = this.editor_data.title;

          let tag_temp = this.editor_data.tags;
          for(let i=0 ; i<tag_temp.length; i++){
            this.my_tags.push(this.tag_pk[tag_temp[i]]);
          }

          this.editor_show = true;
        })
        .catch(error => console.log('error', error));

    },
    get_tags_and_categories(){

      var myHeaders = new Headers();

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        credentials: 'include'
      };

      fetch("http://localhost:8000/tag", requestOptions)
        .then(response => response.json())
        .then((result) => {
          console.log(result);
          for(let i=0; i<result.length; i++){
            let name = result[i]['tag_name'];
            let pk = result[i]['id'];
            this.all_tags.push(name);
            this.pk_tag[pk] = name;
            this.tag_pk[name]=pk;
          }
        
        })
        .catch(error => console.log('error', error));
    }
  }
};
</script>

<style>
</style>