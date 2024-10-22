<template>
  <div>

    <h1>User Profiles</h1>

    <div v-for="(user, index) in users" v-bind:key="index" class="user-card">
      <h2>{{ user.name }}</h2>
      <p><b>Age: </b>{{ user.age }}</p>
      <p><b>Occupation: </b>{{ user.occupation }}</p>
      <!-- <p><b>Occupation: </b>{{ user.occupation }}</p> -->

      <img :src="user.avatar" alt="User {{ user.name }} Avatar" class="avatar">

      <p v-if="user.email"><b>Email: </b><a :href="'mailto:' + user.email">{{ user.email }}</a></p>
      <p v-else>Email not available</p>

      <h3>Hobbies</h3>
      <ul>
        <li v-for="(hobby, index) in user.hobbies" :key="index">
          {{ hobby }}
        </li>
      </ul>


    </div>

     <!-- <pre> {{ users }}</pre> -->

  </div>
</template>

<script>

export default {
  data(){
    return  {
      users: [
        {
          name: 'George Bluth',
          age: 28,
          occupation: 'Graphic Designer',
          email: 'george.bluth@example.com',
          avatar: 'https://reqres.in/img/faces/1-image.jpg', 
          hobbies: ['Painting', 'Cycling', 'Photography'],
        },
        {
          name: 'Janet Weaver',
          age: 34,
          occupation: 'Data Scientist',
          email: 'janet.weaver@example.com',
          avatar: 'https://reqres.in/img/faces/2-image.jpg', 
          hobbies: ['Coding', 'Chess', 'Reading'],
        },
        {
          name: 'Emma Wong',
          age: 45,
          occupation: 'Marketing Manager',
          email: null, // No email provided
          avatar: 'https://reqres.in/img/faces/3-image.jpg', 
          hobbies: ['Golfing', 'Traveling'],
        },
      ]
    }
  }
}

</script>

<style scoped>

.user-card {
  border: 3px solid black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
}

.avatar {
  border-radius: 20px;
}

</style>