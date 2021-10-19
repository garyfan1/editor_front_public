<template>
  <div class="demo">
    

    <div v-if="this.$store.getters.signedIn">
        <div v-if="!posts || posts.length==0">
            <v-btn to='/edit/-1'>edit</v-btn>
            <Article :editor_text="this.editor_text_null" :post_id="-1"></Article>
        </div>
        <div v-else v-for="post in posts" :key="post.id">
            <br>
            <v-btn :to="'/edit/'+post.id">edit</v-btn>
            <Article :editor_text="post.editor_text" :title="post.title" :post_id="post.id"></Article>
            <hr>
        </div>        
    </div>
    <div v-else>
        <h1>Not logged in QQ</h1>
    </div>


  </div>
</template>

<script>

import Article from '../components/Article.vue';

export default {
  components:{
    Article
  }
  ,
  created(){
      if(this.$store.getters.signedIn){
          this.get_posts();
      }    
  },
  
  data() {
    return {
      posts: null,
      editor_text_null: JSON.stringify({
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
        }),
    };
  },
  methods: {
    get_posts(){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
        redirect: 'follow'
      };

      fetch("http://localhost:8000/post/", requestOptions)
        .then(response => response.json())
        .then((result) => {
          console.log(result);
          this.posts=result;
        })
        .catch(error => console.log('error', error));

    }
  } 
};
</script>

<style>
</style>