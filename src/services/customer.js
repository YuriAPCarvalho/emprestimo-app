import axios from 'axios'

class CustomerService {
    static async findAll() {
        const {data} = await  axios.get('http://localhost:3000/customer')
        return data
    }
    static async create(payload) {
        const {data} = await  axios.post('http://localhost:3000/customer', payload)
        return data
    }
    static async remove(id) {
        const {data} = await  axios.delete(`http://localhost:3000/customer/${id}`)
        return data
    }
    static async edit(id, payload) {
        const {data} = await  axios.patch(`http://localhost:3000/customer/${id}`, payload)
        return data
    }
}

export default CustomerService
