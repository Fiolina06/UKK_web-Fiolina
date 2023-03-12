<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default{
    data(){
        return{
            token: ''
        }
    },
    created(){
        this.token = localStorage.getItem('token')
    },
    methods:{
        async logout(){
            try{
                const ress = await axios.post('logout', '', {headers:{"Authorization": `Bearer ${this.token}`}})
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                this.token = localStorage.getItem(this.token)
                this.role = localStorage.getItem(this.role)
                this.successLogOut()
                this.$router.push('/')
            }
            catch(err){
                console.log(err)
            }
        },
         successLogOut(){
            Swal.fire({
                title: "Success",
                icon: 'success',
                text: "Berhasil Log Out"
            })
        }
    }
}
</script>


<template>
    <nav class=" py-10 px-[4rem]  bg-teal-300">
       <div class="flex justify-between"> 

        <div class="judul">
            <p class=" font-semibold text-lg" >Olin Book</p>
        </div>
        <div class="" v-if="this.token">
            <button class=" bg-teal-600 text-white px-3 py-2 rounded-lg" @click="logout()">
                Logout
            </button>
        </div>
        <div class="link flex gap-5" v-else>
            <RouterLink to="login">Login</RouterLink>
            <RouterLink to="register">Register</RouterLink>
        </div>
       </div>
    </nav>
</template>

