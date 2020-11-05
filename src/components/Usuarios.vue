<template>
  <div class="jumbotron">
    <h2>Usuarios registrados</h2>
    <hr />

    <div v-if="usuarios.length">
      <table class="table text-left"> 
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">Email</th>
          <th scope="col">Fecha</th>
        </tr>
        <tr v-for="(usuario, index) in usuarios" :key="index">
          <td scope="col"> <p>{{ usuario.id }}</p> </td>
          <td scope="col"> <p>{{ usuario.nombre }}</p> </td>
          <td scope="col"> <p>{{ usuario.edad }}</p> </td>
          <td scope="col"> <p>{{ usuario.email }}</p> </td>
          <td scope="col"> <p>{{ formatearFechaHora(usuario.createdAt) }}</p> </td>                   
        </tr>
      </table>
    </div>
    <div v-else class="alert alert-warning"> <h5>No hay usuarios registrados</h5> </div>
  </div>
</template>

<script>
  import filters from '../filters'

  export default  {
    name: 'src-components-usuarios',
    props: [],
    mixins: [filters],
    mounted () {
      this.getDatosFormAxios()
    },
    data () {
      return {
        url: 'https://5f92eb01eca67c001640a201.mockapi.io/form',
        usuarios: []
      }
    },
    methods: {
      async getDatosFormAxios() {
        try {
          let res = await this.axios(this.url)
          this.usuarios = res.data
          console.log(res.data)
        }
        catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      }
    },
    computed: {

    }
  }
</script>

<style scoped lang="css">
  .src-components-usuarios {

  }
</style>
