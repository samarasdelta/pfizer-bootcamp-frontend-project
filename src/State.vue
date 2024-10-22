<template> 
<!-- UserName: {{user.name, user.age}} -->
<h1>User</h1>
<p><span>Name: </span>{{ user.name }}</p>
<p><span>Age: </span>{{ user.age }}</p>
<p><span>Occupation: </span>{{ user.ocupation }}</p>


</template>

<script>
export default {

  data (){
    return {
      // username: 'Alice Cooper'

      user: {
        name: 'Alice Cooper',
        age: 50,
        ocupation: 'Singer'
      }
    }
  }
};

</script>

<style scoped>

span {
  font-weight: bold;
}

</style>