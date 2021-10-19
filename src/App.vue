<template>
  <v-app id="inspire">
    <v-snackbar
      v-model="snackbar" 
      timeout="2000"
      bottom
      app
    >
      
      <span class="text-subtitle-1 font-weight-bold">{{snackbar_message}}</span>

    </v-snackbar>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          text
          to="/"
        >
          Home
        </v-btn>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  to="/logIn"
                  color="grey lighten-4"
                  v-if="!signedIn()"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Login
                    </v-list-item-title>
                  </v-list-item-content>                  
                </v-list-item>

                <v-list-item
                  to="/register"
                  color="grey lighten-4"
                  v-if="!signedIn()"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Register
                    </v-list-item-title>
                  </v-list-item-content>                  
                </v-list-item>

                <v-list-item
                  color="grey lighten-4"
                  v-if="signedIn()"
                  @click="logout()"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Log out
                    </v-list-item-title>
                  </v-list-item-content>                  
                </v-list-item>

              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <router-view class="pa-6" @show_snackbar="showSnackbar" @show_posts="showPosts"></router-view>
            </v-sheet>
          </v-col>
        </v-row>
        <v-btn
          fab
          fixed
          bottom
          right
          @click="scrollTop()"
        >
          <v-icon> mdi-arrow-up-bold</v-icon>
        </v-btn>
      </v-container>
    </v-main>    
  </v-app>
</template>

<script>
  import firebase from "firebase/app";
  import 'firebase/auth';


  export default {
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
      snackbar: false,
      snackbar_message: "",
      posts : []
    }),
    created(){

    }
    ,
    methods:{
      signedIn(){
        return this.$store.getters.signedIn;
      },
      logout(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          credentials: 'include',
          redirect: 'follow'
        };

        fetch("http://localhost:8000/accounts/logout/", requestOptions)
          .then(response => response.json())
          .then((result) => {
            console.log(result);
            this.showSnackbar("Signed out!");
            this.$store.commit("signedIn", false);
            if(this.$router.name!='Home'){
              this.$router.push('/');
            }
            this.$router.go(0);                    
          })
          .catch(error => console.log('error', error));
        
      },
      showSnackbar(message){
        this.snackbar_message = message;
        this.snackbar = true;
      },
      showPosts(posts){
        this.posts = posts;
      }
      ,
      scrollTop(){
        // window.scrollTo(0,0);
        this.$vuetify.goTo(0, {
          duration:1000,
          easing: "easeInOutCubic"
        })
      }
    }
  }
</script>