<script>
import axios from 'axios';

export default{
    meta:{
        layout:'admin'
    },
    data(){
        return{
            data_user: '',
            token: ''
        }
    },
    methods:{
        getUser(){
            axios.get('user', {headers:{'Authorization':`Bearer ${this.token}`}})
                .then(ress => {
                    this.data_user = ress.data
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    },
    created(){
        this.token = localStorage.getItem('token')
        this.getUser()
    }
}
</script>

<template>
    <div class="p-10">
        <div class="bg-white" >
            <div class="flex justify-between items-center p-5">
                <p class=" text-lg font-bold">Daftar User</p>
            </div>
            <table class="table-auto border-collapse border w-full">
                <thead>
                <tr class=" text-center text-sm">
                    <th class="border-y border-gray-300 px-4 py-2">ID</th>
                    <th class="border-y border-gray-300 px-4 py-2">Name</th>
                    <th class="border-y border-gray-300 px-4 py-2">Email</th>
                    <th class="border-y border-gray-300 px-4 py-2">Role</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in data_user" class="bg-white text-center" :key="data.id">
                        <td class=" border-y border-gray-300 px-4 py-2">{{index + 1}}</td>
                        <td class="border-y border-gray-300 px-4 py-2">{{ data}}</td>
                        <td class="border-y border-gray-300 px-4 py-2">{{ data}}</td>
                        <td class="border-y border-gray-300 px-4 py-2">{{ data}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>