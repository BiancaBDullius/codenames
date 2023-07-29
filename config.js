import dotenv from 'dotenv';
dotenv.config()
import packageJson from '../package.json';

const config = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,

    nodeEnv: process.env.ENVIROMENT || 'development',
    port: process.env.PORT || 3000,
    
    clientOrigins: {
        'development': process.env.ORINGINS ?? '*',
        'production': process.env.ORINGINS ?? 'none' 
        }
}
export default config