<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';

    export default {
        meta:{
            layout:'admin'
        },
        created(){
            this.token = localStorage.getItem('token')
            this.role = localStorage.getItem('role')
            console.log(this.token)
            console.log(this.role)
            this.getBuku()
        },
        computed(){
            this.getBuku()
        },
        data(){
            return{
                role: '',
                token : '',
                buku:''
            }
        },
        methods:{
            getBuku(){
                axios.get('books')
                .then(ress=>{
                    this.buku=ress.data
                })
                .catch(error=>{
                    console.log(error)
                })
        },
        async deleteBook(id){
            const response = await axios.delete(`books/${id}`, {headers: {'Authorization': `Bearer ${this.token}`}})
            if(response){
            console.log(response);
            this.SuccessDelete()
            this.getBuku()
          }
      },
        SuccessDelete(){
            Swal.fire({
                    title: 'Success Delete!',
                    icon: 'success',
                });
        },
        exportToExcel() {
            const worksheet = XLSX.utils.json_to_sheet(this.buku);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Buku');
            XLSX.writeFile(workbook, 'data_buku.xlsx');
        }
  },
        
    }
</script>
<template>
    <div class="p-10">
        <div class="bg-white" >
            <div class="flex justify-between items-center p-5">
                <p class=" text-lg font-bold">Daftar Buku</p>
                <div class=" flex gap-2">
                    <RouterLink class=" bg-green-500 px-5 py-2 text-white hover:bg-green-600 rounded-md" to="insert">Insert</RouterLink>
                    <button class=" bg-amber-500 px-5 py-2 text-white hover:bg-amber-600 rounded-md" @click="exportToExcel">Export</button>
                </div>
            </div>
            <table class="table-auto border-collapse border w-full">
                <thead>
                <tr class=" text-center text-sm">
                    <th class="border-y border-gray-300 px-4 py-2">No</th>
                    <th class="border-y border-gray-300 px-4 py-2">Judul</th>
                    <th class="border-y border-gray-300 px-4 py-2">Pengarang</th>
                    <th class="border-y border-gray-300 px-4 py-2">Penerbit</th>
                    <th class="border-y border-gray-300 px-4 py-2">Tahun Terbit</th>
                    <th class="border-y border-gray-300 px-4 py-2">Gambar</th>
                    <th class="border-y border-gray-300 px-4 py-2">Aksi</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(data, index) in buku" class="bg-white text-center" :key="data.id">
                    <td class=" border-y border-gray-300 px-4 py-2"> {{ index + 1 }}</td>
                    <td class="border-y border-gray-300 px-4 py-2">{{ data.judul }}</td>
                    <td class="border-y border-gray-300 px-4 py-2">{{ data.pengarang }}</td>
                    <td class="border-y border-gray-300 px-4 py-2">{{ data.penerbit }}</td>
                    <td class="border-y border-gray-300 px-4 py-2">{{ data.tahun_terbit }}</td>
                    <td class="border-y border-gray-300 px-4 py-2"><img class="h-24 w-20 object-fill rounded m-auto" :src="data.gambar"></td>
                    <td class="border-y border-gray-300 px-4 py-2">
                    <div class="flex justify-center">
                        <router-link class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" :to="{
                            name : 'edit',
                            params : {
                                id : data.id
                            }
                        }">Edit</router-link>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click=" deleteBook(data.id)">Hapus</button>
                    </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
