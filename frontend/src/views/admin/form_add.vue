<script> 
    import axios from 'axios';
    import Swal from 'sweetalert2';

    export default{
        meta:{
            layout:'admin'
        },
        data(){
            return {
                token : '',
                book: {
              id: '',
              judul : '',
              pengarang : '',
              penerbit : '',
              tahun_terbit : '',
              gambar: null,
          },
          imageUrl : null,
          formData: new FormData()
            }
        },
        methods:{
            onFileChange(e) {
          const file = e.target.files[0]
          this.book.gambar = file
          this.formData.set('gambar', file)
          this.imageUrl = URL.createObjectURL(file)
        },
        addBook() {
          this.formData.set('judul', this.book.judul)
          this.formData.set('pengarang', this.book.pengarang)
          this.formData.set('penerbit', this.book.penerbit)
          this.formData.set('tahun_terbit', this.book.tahun_terbit)

          // Kirim data dengan menggunakan axios atau library HTTP request lainnya
          axios.post('books', this.formData, {
            headers: {
              'Authorization' : `Bearer ${this.token}`,
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              // Success
              console.log(response.data)
              this.Success()
              this.$router.push('admin')
            })
            .catch(error => {
              // Error
              console.error(error.response.data)
            })
      },
      Success(){
        Swal.fire({
                    title: 'Success Insert!',
                    icon: 'success',
                });
      },
      
        },
        created(){
            this.token = localStorage.getItem('token')
            console.log(this.token)
        }
    }


</script>

<template>
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-4">Form Input Data Buku</h1>
      <form class="w-full max-w-lg" @submit.prevent="addBook">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="title">
            Judul Buku
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Masukkan judul buku"
            v-model="book.judul"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="author">
            Pengarang
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            placeholder="Masukkan nama pengarang"
            v-model="book.pengarang"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="publisher">
            Penerbit
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="publisher"
            type="text"
            placeholder="Masukkan nama penerbit"
            v-model="book.penerbit"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="year">
            Tahun Terbit
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="year"
            type="date"
            placeholder="Masukkan tahun terbit"
            v-model="book.tahun_terbit"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="image">
            Gambar Buku
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            name="gambar"
            type="file"
            accept="image/*"
            @change="onFileChange"
          >
          <div v-if="imageUrl" class="mt-2">
            <img :src="imageUrl" class="max-w-xs">
          </div>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </template>
 