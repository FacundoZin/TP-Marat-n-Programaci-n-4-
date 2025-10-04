import type { Result } from '@/Common/Result'
import type { Atleta } from '@/Types/Atleta'
import type { Ciudad } from '@/Types/Ciudad'
import type { InsertAtletaDto } from '@/Types/InsertAtletaDto'
import type { InsertCiudadDto } from '@/Types/InsertCiudadDto'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

const getErrorMessage = (error: any) => {
  return error.response?.data?.message || 'Error de conexión o error desconocido.'
}

export class ApiService {
  static async findAllCiudades(): Promise<Result<Ciudad[]>> {
    try {
      const response = await axios.get(`${API_URL}/ciudad`)
      return { isSuccess: true, value: response.data }
    } catch (error) {
      return { isSuccess: false, error: { message: getErrorMessage(error) } }
    }
  }

  static async findOneCiudad(id: number): Promise<Result<Ciudad>> {
    try {
      const response = await axios.get(`${API_URL}/ciudad/${id}`)

      return { isSuccess: true, value: response.data }
    } catch (error) {
      return { isSuccess: false, error: { message: getErrorMessage(error) } }
    }
  }

  static async createCiudad(data: InsertCiudadDto): Promise<Result<Ciudad>> {
    try {
      const response = await axios.post(`${API_URL}/ciudad`, data)
      return { isSuccess: true, value: response.data }
    } catch (error) {
      return { isSuccess: false, error: getErrorMessage(error) }
    }
  }

  static async updateCiudad(id: number, data: InsertCiudadDto): Promise<Result<Ciudad>> {
    try {
      const response = await axios.put(`${API_URL}/ciudad/${id}`, data)
      return { isSuccess: true, value: response.data }
    } catch (error) {
      return { isSuccess: false, error: getErrorMessage(error) }
    }
  }

  static async removeCiudad(id: number): Promise<Result<null>> {
    try {
      await axios.delete(`${API_URL}/ciudad/${id}`)
      return { isSuccess: true, value: null }
    } catch (error) {
      return { isSuccess: false, error: getErrorMessage(error) }
    }
  }

  static async findAllAtletas(): Promise<Result<Atleta[]>> {
    try {
      const response = await axios.get(`${API_URL}/atleta`)
      return { isSuccess: true, value: response.data }
    } catch (error) {
      return { isSuccess: false, error: getErrorMessage(error) }
    }
  }

  static async findOneAtleta(id: number): Promise<Result<Atleta>> {
    try {
      const response = await axios.get(`${API_URL}/atleta/${id}`)
      return { isSuccess: true, value: response.data }
    } catch (error) {
      return { isSuccess: false, error: getErrorMessage(error) }
    }
  }

  static async createAtleta(data: InsertAtletaDto): Promise<Result<Atleta>> {
    try {
      const response = await axios.post(`${API_URL}/atleta`, data)
      return { isSuccess: true, value: response.data }
    } catch (error) {
      return { isSuccess: false, error: getErrorMessage(error) }
    }
  }

  static async updateAtleta(id: number, data: InsertAtletaDto): Promise<Result<Atleta>> {
    try {
      const response = await axios.put(`${API_URL}/atleta/${id}`, data)
      return { isSuccess: true, value: response.data }
    } catch (error) {
      return { isSuccess: false, error: getErrorMessage(error) }
    }
  }

  static async removeAtleta(id: number): Promise<Result<null>> {
    try {
      await axios.delete(`${API_URL}/atleta/${id}`)
      return { isSuccess: true, value: null }
    } catch (error) {
      return { isSuccess: false, error: getErrorMessage(error) }
    }
  }
}
