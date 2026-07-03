import dotenv from 'dotenv'

dotenv.config()

function fetchenv(name){
    const value = process.env[name]
    if(!value)
        throw new Error(`Environment variable is missing: ${name}`)
    return value
}

export const env = {
    PORT : process.env.PORT || 4000,
    NODE_ENV:process.env.NODE_ENV || "development",
    MONGODB_URI : fetchenv('MONGODB_URI'),

    JWT_ACCESS_SECRET : fetchenv('JWT_ACCESS_SECRET'),
    JWT_REFRESH_SECRET : fetchenv('JWT_REFRESH_SECRET'),
    JWT_ACCESS_EXPIRES_IN : process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    JWT_REFRESH_EXPIRES_IN : process.env.JWT_REFRESH_EXPIRES_IN || '7d',

    COOKIE_SECURE : process.env.COOKIE_SECURE ==='true',

    CLOUDINARY_CLOUD_NAME : fetchenv('CLOUDINARY_CLOUD_NAME'),
    CLOUDINARY_API_KEY : fetchenv('CLOUDINARY_API_KEY'),
    CLOUDINARY_API_SECRET : fetchenv('CLOUDINARY_API_SECRET')
}
