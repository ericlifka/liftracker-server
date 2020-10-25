import { startServer } from './src/server'


const PORT = process.env.PORT || 3000

startServer(PORT).then(() => {
  console.log(`\nServer started on ${PORT}\n`)
})
