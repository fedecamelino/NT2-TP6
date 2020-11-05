export default {
    methods: {
        formatearFechaHora(fyh) {
            return new Date(fyh).toLocaleString()
        }
    }
}