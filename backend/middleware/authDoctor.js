import jwt from 'jsonwebtoken'

const authDoctor = (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) return res.json({ success: false, message: 'Not authorized' })
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET)
        if (decoded.role !== 'doctor' || !decoded.id) return res.json({ success: false, message: 'Doctor access required' })
        req.doctor = decoded
        next()
    } catch (error) {
        res.json({ success: false, message: 'Session expired. Please log in again' })
    }
}

export default authDoctor