class ApiError extends Error {
  public status: number
  constructor(status: number, message: string) {
    super();
    this.status = status
    this.message = message
  }
  static badRequest(message: string) {
    return new ApiError(404, message)
  }
  static internal(message: string) {
    return new ApiError(500, message)
  }
  static forbiden(message: string) {
    return new ApiError(403, message)
  }
}
  
export default ApiError