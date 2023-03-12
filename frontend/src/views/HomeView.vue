<script >
import navbar from '@/views/komponen/navbar.vue'
import axios from 'axios';

export default {
  data(){
    return{
      bukuById:{
        id: '',
        judul: '',
        pengarang: '',
        penerbit: '',
        gambar: ''
      },
      buku:'',
      modalDetail: false
    }
  },
  components:{
    navbar
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
    async getBukuById(id){
      const ress = await axios.get(`books/${id}`)
      this.bukuById.id = id
      this.bukuById.judul = ress.data.judul
      this.bukuById.penerbit = ress.data.penerbit
      this.bukuById.pengarang = ress.data.pengarang
      this.bukuById.gambar = `http://127.0.0.1:8000/storage/${ress.data.gambar}`
      this.bukuById.tahun_terbit = ress.data.tahun_terbit
    },
    reset(){
      this.bukuById.id = ''
      this.bukuById.judul = ''
      this.bukuById.penerbit = ''
      this.bukuById.pengarang = ''
      this.bukuById.gambar = ''
      this.bukuById.tahun_terbit = ''
      this.modalDetail = false
    }
  },
  created(){
    this.getBuku()
  }
  
}
</script>

<template>
<navbar/>
<div class="p-10 ">
  <div class="grid grid-cols-3 gap-10" >
    <div class="  border p-5 mx-5 hover:bg-gray-100" v-for="data in buku" :key="data.id" @click=" getBukuById(data.id), modalDetail = true">
      <img :src="data.gambar" class=" " alt="">
      <p class=" text-xl font-normal">{{ data.judul }}</p>
      <p class=" font-light">{{ data.pengarang }}</p>
    </div>
  </div>
</div>

<div class=" inset-0 fixed bg-[#00000081] flex flex-1" v-show="modalDetail">
  <div class="bg-white m-auto px-10 py-5 w-[30rem]">
    <div class=" flex justify-between">
      <p>Buku Detail</p>
      <p class=" cursor-pointer" @click="reset">X</p>
    </div>
    <div class="flex justify-start items-start mt-5 gap-10">
      <div class="image w-[10rem]">
        <img :src="this.bukuById.gambar " alt="">
      </div>
      <table class="detail">
        <tr>
          <td>Judul</td>
          <td>:</td>
          <td>{{ bukuById.judul }}</td>
        </tr>
        <tr>
          <td>Penerbit</td>
          <td>:</td>
          <td>{{ bukuById.penerbit }}</td>
        </tr>
        <tr>
          <td>Pengarang</td>
          <td>:</td>
          <td>{{ bukuById.pengarang }}</td>
        </tr>
        <tr>
          <td>Tahun Terbit</td>
          <td>:</td>
          <td>{{ new Date(bukuById.tahun_terbit).getFullYear() }}</td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>

<style scoped>
  .detail td{
    padding: 5px;
  }
</style>
