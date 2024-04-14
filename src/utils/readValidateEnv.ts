import { cleanEnv, str, port, num, bool } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        DATABASE_URL: str(),
        PORT: port({ default: 1337 }),
        SALTWORKFACTOR: num({default: 10}),
        ACCESS_TOKEN_EXPIRES_IN: str(),
        REFRESH_TOKEN_EXPIRES_IN: str(),
        ME_CONFIG_MONGODB_URL: str(),
        ME_CONFIG_MONGODB_ADMINUSERNAME: str(),
        ME_CONFIG_MONGODB_ADMINPASSWORD: str(),
        MONGO_INITDB_ROOT_USERNAME: str(),
        MONGO_INITDB_ROOT_PASSWORD: str(),
        ME_CONFIG_BASICAUTH: bool,
        ACCESS_TOKEN_PUBLIC_KEY: str(),
        ACCESS_TOKEN_PRIVATE_KEY: str(),
        REFRESH_PRIVATE_KEY: str(),
        REFRESH_PUBLIC_KEY: str(),
    });
}

export default validateEnv;