from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql://metrovision:metrovision@localhost:5432/metrovision"
    secret_key: str = "change-this-secret-in-production"
    access_token_expire_minutes: int = 1440
    cors_origins: str = "http://localhost:3000"

    class Config:
        env_file = (".env.example", ".env")

settings = Settings()
