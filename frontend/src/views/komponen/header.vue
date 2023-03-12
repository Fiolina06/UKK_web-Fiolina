<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data(){
        return{
            token : "",
            role : ""
        }
    },
    created(){
        this.token = localStorage.getItem('token'),
        this.role = localStorage.getItem('role')
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
    <div class="fixed left-[16.8rem] right-0 w-auto bg-white px-14 py-8 border-b border-gray-300 flex justify-between">
        <p class="text-2xl font-bold">Admin</p>
        <button class=" bg-teal-600 text-white px-3 py-2 rounded-lg" @click="logout()">
                Logout
        </button>
    </div>
</template>