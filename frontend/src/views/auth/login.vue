<template>
    <div class="flex h-screen justify-center items-center bg-gray-100">
      <div class="bg-white rounded-lg p-20 shadow-md">
        <h1 class="text-2xl font-bold mb-8">Login</h1>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="username" class="block font-semibold mb-">Email:</label>
            <input type="text" id="username" v-model="form.email" class="shadow appearance-none border rounded-md border-gray-300 py-2 px-8" />
            <p class=" text-red-600" v-if="errors.email">{{ errors.email }}</p>
          </div>
          <div>
            <label for="password" class="block font-semibold mb-2">Password:</label>
            <input type="password" id="password" v-model="form.password" class="shadow appearance-none border rounded-md border-gray-300 py-2 px-8" />
            <p class=" text-red-600" v-if="errors.password">{{ errors.password }}</p>
          </div>
          <div>
            <button type="submit" class="bg-green-500 focus:shadow-outline text-black rounded-md py-2 px-4 font-semibold hover:bg-green-600 transition-colors duration-300">Login</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
    import axios from "axios";
    import Swal from 'sweetalert2';
    import * as yup from "yup";

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    });

  export default {
    data() {
      return {
      form: {
        email: "",
        password: "",
      },
      errors: {},
      error: null,
  
    };
    

    },
    methods: {
      async handleSubmit(){
                try{
                    this.errors = {};
                    this.error = null;
                    await schema.validate(this.form, { abortEarly: false });
                    const response = await axios.post("login", this.form);
                    console.log(response.data.token)
                    console.log(response.data.role)
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("role", response.data.user.role);
                    if(response.data.user.role == 'admin'){
                        this.$router.push("/admin");
                    } else {
                        this.$router.push("/");
                    }
                    this.successAlert();
                    
                } catch (error){
                    if (error.name === "ValidationError") {
                        error.inner.forEach(e => {
                        this.errors[e.path] = e.message;
                        });
                    } else {
                        this.error = error.response.data.message;
                    }
                }
            }, 
            successAlert(){
                Swal.fire({
                    title: 'Success Login!',
                    icon: 'success',
                });
            },
    },
  };
  </script>
  
  <style>
  input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4caf50;
  }
  </style>
  