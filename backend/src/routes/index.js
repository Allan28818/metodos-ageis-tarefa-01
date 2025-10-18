import authRouter from './auth.routes.js'
import userRouter from './user.routes.js'

export default {
    attach(app){
        app.use('/auth', authRouter)
        app.use('/usuario', userRouter)
    }
}