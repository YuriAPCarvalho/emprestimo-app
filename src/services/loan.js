import axios from 'axios'

class SellerService {
    static async findAll() {
        const {data} = await  axios.get('http://localhost:3000/loan')
        return data
    }
    static async create(payload) {
        const {data} = await  axios.post('http://localhost:3000/loan', payload)
        return data
    }
    static async remove(id) {
        const {data} = await  axios.delete(`http://localhost:3000/loan/${id}`)
        return data
    }
    static async edit(id, payload) {
        const {data} = await  axios.patch(`http://localhost:3000/loan/${id}`, payload)
        return data
    }
}

export default SellerService
