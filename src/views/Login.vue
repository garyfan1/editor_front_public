<template>
  <div class="Login">

    <h1>Log In</h1>
    
    <v-text-field
      v-model="username"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      @keyup.enter="login()"
      required
    ></v-text-field>

    <v-btn
      type="submit"
      color="success"
      class="mr-4"
      @click="login()"
    >
      log in
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset()"
    >
      clear
    </v-btn>

  
  </div>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth'

export default {
    name: 'SignUp',
    data() {
      return {
        username:"",
        password:"",
      }
    },
    methods:{
      reset(){
        this.username = "";
        this.password = "";
      },
      login(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "username": this.username,
          "password": this.password
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          credentials: 'include',
          redirect: 'follow'
        };

        fetch("http://localhost:8000/accounts/login/", requestOptions)
          .then((response) => {
            if (response.status==200){
              return;
            }
            else{
              return response.json();
            }
          })
          .then((result) => {
            if(result != null){
              alert("error loggin in");
              return;
            }
            console.log(result);
            this.$emit("show_snackbar", "Logged in!");
            this.$store.commit("signedIn", true);
            this.$router.push('/');
          })
          .catch(error => console.log('error', error));
      }
    }

    
  }
</script>

