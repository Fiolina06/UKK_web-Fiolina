<template>
    <div class=" fixed top-0 h-full bg-white border-gray-200 border-r z-[0]">
       <div class=" flex flex-col px-20 py-7 text-base gap-5">
            <p class=" font-bold text-xl mb-10">Olin Book</p>
            <RouterLink :to="{name: 'books'}"><span><font-awesome-icon :icon="[ 'fas', 'book' ]" class=" text-base mr-2"/></span> <span>Buku</span></RouterLink>
            <RouterLink to="user"><span><font-awesome-icon :icon="[ 'fas', 'users' ]" class=" text-base mr-2"/></span> <span>User</span></RouterLink>
       </div>
    </div>
</template>