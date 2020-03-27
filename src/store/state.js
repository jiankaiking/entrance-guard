const state = {
    status: '',
    token: localStorage.getItem('token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMWVdMX1VTRVIiLCJsb2dpblN5c3RlbUlkIjoiMyIsImxvZ2luVXNlcklkIjoiMiIsImV4cCI6MTU4NTM3MzY3OCwidXNlck5hbWUiOiLmsYnljb8iLCJjbGFzcyI6ImNsYXNzIGNvbS5qZGtqLm1hbmFnZWNlbnRlci5sb2dpbi52by5KV1RJbmZvIiwidXNlcklkIjoiMiJ9.z2nEJRQyMiUXoLq_BqfG7EjQTUOSqjZUlPegZ3O69z8',
    user: JSON.parse(localStorage.getItem('user')) || '',
}
export default state
