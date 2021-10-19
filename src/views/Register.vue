<template>
  <div class="Register">

    <h1>Register</h1>
    
    <v-text-field
      v-model="username"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password1"
      label="Password"
      required
    ></v-text-field>

    <v-text-field
      v-model="password2"
      label="re-enter Password"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      label="Email"
      required
      @keyup.enter="register()"
    ></v-text-field>

    <v-btn
      type="submit"
      color="success"
      class="mr-4"
      @click="register()"
    >
      register
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset()"
    >
      Reset Form
    </v-btn>

  
  </div>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth'

export default {
    name: 'Register',
    data() {
      return {
        username:"",
        password1:"",
        password2:"",
        email:""
      }
    },
    methods:{
      reset(){
        this.username = "";
        this.password1 = "";
        this.password2 = "";
        this.email = "";
      },
      register(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "username": this.username,
          "password1": this.password1,
          "password2": this.password2,
          "email": this.email
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          credentials: 'include',
          redirect: 'follow'
        };

        fetch("http://localhost:8000/accounts/registration/", requestOptions)
          .then(response => response.text())
          .then((result) => {
            console.log(result);
            this.$router.push('/login');
          })
          .catch((error) => {
            console.log('error', error);
            alert(error);
          });
      }
    }

    
  }
</script>

