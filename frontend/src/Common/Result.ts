export type Result<T> = Success<T> | Failure

interface Success<T> {
  isSuccess: true
  value: T
}

interface Failure {
  isSuccess: false
  error: {
    message: string
  }
}

export const success = <T>(value: T): Success<T> => ({
  isSuccess: true,
  value,
})

export const failure = (message: string): Failure => ({
  isSuccess: false,
  error: {
    message,
  },
})
