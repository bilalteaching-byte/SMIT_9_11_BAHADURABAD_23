import jwt from "jsonwebtoken"


const authMiddleware = (req, res, next) => {
    try {
        console.log(req?.headers?.authorization?.split(' ')[1])
        const token = req?.headers?.authorization?.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        console.log(decoded)
        if (decoded) {
            req.user = decoded
            next()
        } else {
            res.status(401).send({ status: 401, data: null, error: true, errorMsg: 'Unauthorized' })
        }
    }
    catch (error) {
        res.status(401).send({ status: 401, data: null, error: true, errorMsg: 'Unauthorized' })
    }
}

export default authMiddleware