<template>
  <div class="jumbotron">
    <h2>Crear nuevo usuario</h2>
    <hr />

    <form novalidate autocomplete="off" @submit.prevent="enviar()">
      <!-- ------------ -->
      <!-- CAMPO NOMBRE -->
      <!-- ------------ -->
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input 
          type="text"
          id="nombre"
          class="form-control"
          v-model="$v.f.nombre.$model"
        >
        <!-- CARTELES DE VALIDACIÓN -->
        <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger mt-1">
          <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
          <div v-if="$v.f.nombre.minLength.$invalid">Este campo debe tener al menos {{$v.f.nombre.minLength.$params.length}} caracteres</div>
          <div v-if="$v.f.nombre.maxLength.$invalid">Este campo debe tener como máximo {{$v.f.nombre.maxLength.$params.max}} caracteres</div>
        </div>
      </div>

      <!-- ------------ -->
      <!--  CAMPO EDAD  -->
      <!-- ------------ -->
      <div class="form-group">
            <label for="edad">Edad</label>
            <input 
              type="number"
              id="edad"
              class="form-control"
              v-model.number="$v.f.edad.$model"
            >
            <!-- CARTELES DE VALIDACIÓN -->
            <div v-if="$v.f.edad.$error && $v.f.edad.$dirty" class="alert alert-danger mt-1">
              <div v-if="$v.f.edad.required.$invalid">Este campo es requerido</div>
              <div v-if="$v.f.edad.between.$invalid">La edad debe estar entre los {{$v.f.edad.between.$params.min}} y los {{$v.f.edad.between.$params.max}} años</div>
            </div>
      </div>
      <!-- ------------- -->
      <!--  CAMPO EMAIL  -->
      <!-- ------------- -->
      <div class="form-group">
            <label for="email">Email</label>
            <input 
                type="email"
                id="email"
                class="form-control"
                v-model="$v.f.email.$model"
            >
            <!-- CARTELES DE VALIDACIÓN -->
            <div v-if="$v.f.email.$error && $v.f.email.$dirty" class="alert alert-danger mt-1">
                <div v-if="$v.f.email.required.$invalid">Este campo es requerido</div>
                <div v-if="$v.f.email.email.$invalid">Debe proveer un email válido</div>
            </div>
      </div>
      <!-- ------------ -->
      <!-- BOTÓN ENVÍO  -->
      <!-- ------------ -->
      <div class="form-group">
            <input 
                type="submit"
                :disabled="$v.$invalid"
                class="btn btn-success mt-4"
                value="Enviar"
            >
      </div>
    </form>
  </div>
</template>

<script>
  import { required, minLength, maxLength, between, email } from '@vuelidate/validators'

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {
      this.getDatosFormAxios()
    },
    data () {
      return {
        f: this.resetForm(),
        url : 'https://5f92eb01eca67c001640a201.mockapi.io/form'
      }
    },
    validations: {
      f: {
        nombre: { 
          required,
          minLength: minLength(5),
          maxLength: maxLength(15)
        },
        edad: { 
          required,
          between: between(18,120)
        },
        email: { 
          required,
          email
        }
      }
    },
    methods: {
      delay : ms => new Promise(resolve => setTimeout(resolve, ms)),

      async sendDatosFormAxios(datos) {
        try {
          let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
          await this.delay(500)
          console.log(res.data)
        }
        catch(error) {
          console.log('HTTP POST ERROR', error)
        }
      },

      async getDatosFormAxios() {
        try {
          let res = await this.axios(this.url)
          console.log(res.data)
        }
        catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      },

      async enviar() {
        this.$v.$touch() //Chequea las validaciones
        if(!this.$v.$invalid) {
          let form = this.f
          console.log(form)
          await this.sendDatosFormAxios(form)
          this.f = this.resetForm()
          this.$v.$reset()
        }
      },
      
      /* valor inicial de los campos de datos del formulario */
      resetForm() {
        return {
          nombre: '',
          edad : '',
          email : ''
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-formulario {

  }
</style>
