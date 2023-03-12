<script>
    import Sidebar from './komponen/Sidebar.vue'
    import Header from './komponen/Header.vue'
    import { RouterLink, RouterView } from 'vue-router'
    import Swal from 'sweetalert2'

    
    export default{
        data(){
            return{
                role : "",
                token: "",
                error: ""
            }
        },
        components:{
            Header,
            Sidebar
        },
        created(){
            this.token = localStorage.getItem('token')
            this.role = localStorage.getItem('role')
            if(!this.token && this.role != "admin"){
                this.$router.push('/')
                this.alertValidation()
            }
        },
        methods:{
            alertValidation(){
                Swal.fire({
                    title: "Akses Ditolak",
                    icon: 'warning',
                    text: "Anda tidak memiliki akses"
                })
            }
        }
    }

</script>

<template>
    <Sidebar/>
    <div class=" absolute left-[15.5rem] right-0 top-0 bottom-0">
        <Header/>
        <div class=" fixed top-[7rem] right-0 left-[15.5rem] bottom-0 overflow-auto ">
            <router-view class=" h-full p-10"></router-view>
        </div>
    </div>
</template>