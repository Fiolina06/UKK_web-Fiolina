<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="max-w-md w-full">
        <h1 class="text-2xl font-semibold text-center mb-6">Register</h1>
        <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="register">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name">
              Name
            </label>
            <input v-model="form.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter your name">
            <p v-if="errors.name" class="text-red-500 text-xs italic mt-1">{{ errors.name }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input v-model="form.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email">
            <p v-if="errors.email" class="text-red-500 text-xs italic mt-1">{{ errors.email }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="password">
              Password
            </label>
            <input v-model="form.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password">
            <p v-if="errors.password" class="text-red-500 text-xs italic mt-1">{{ errors.password }}</p>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2" for="confirm_password">
              Confirm Password
            </label>
            <input v-model="form.password_confirmation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirm_password" type="password" placeholder="Confirm your password">
            <p v-if="errors.password_confirmation" class="text-red-500 text-xs italic mt-1">{{ errors.confirm_password }}</p>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import * as yup from 'yup'; 

  const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        password_confirmation: yup.string().oneOf([yup.ref('password'), null]).required()
  });

  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
        errors: {},
        error: null,

      }
    },
    methods:{
      async register(){
        try{
          this.errors = {};
          this.error = null;
          await schema.validate(this.form, { abortEarly: false });
          const response = await axios.post("/register", this.form);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.user.role);
          this.$router.push("/");
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
          title: "Success Register!",
          icon: "success",
          text: "Anda sukses melakukan register"
        })
      }
    }
}
</script>
