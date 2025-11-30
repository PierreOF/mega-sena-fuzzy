"""
Configuration settings for the backend application
"""

import os
from typing import List


class Settings:
    """Application settings."""

    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

    # CORS - Allow frontend origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",  # Local development
        "http://localhost:3000",  # Alternative local port
        "https://fuzzy-frontend.onrender.com",  # Production (update with your actual domain)
    ]

    # Add custom domain if provided
    CUSTOM_DOMAIN = os.getenv("CUSTOM_DOMAIN")
    if CUSTOM_DOMAIN:
        CORS_ORIGINS.append(f"https://{CUSTOM_DOMAIN}")

    # Data file path
    DATA_PATH: str = os.path.join(
        os.path.dirname(__file__), "..", "data", "megascsv.csv"
    )

    # API settings
    API_VERSION: str = "1.0.0"
    API_TITLE: str = "Sistema Fuzzy Mega-Sena API"
    API_DESCRIPTION: str = """
    API for fuzzy logic analysis of Mega-Sena lottery numbers.

    **Educational purposes only. Does not improve lottery odds.**

    This API implements a fuzzy inference system with:
    - 5 input variables (antecedents)
    - 1 output variable (consequent)
    - 12 fuzzy rules
    - Mamdani inference method
    """

    # Variable descriptions (Portuguese)
    VARIABLE_DESCRIPTIONS: dict = {
        "frequencia_historica": "Frequência com que o número apareceu historicamente",
        "tempo_ausencia": "Tempo desde a última aparição do número",
        "distribuicao_posicional": "Uniformidade nas 6 posições de sorteio",
        "equilibrio_par_impar": "Balanceamento entre pares e ímpares",
        "tendencia_soma": "Alinhamento com tendência de soma dos sorteios"
    }

    # Default weights (all 50%)
    DEFAULT_WEIGHTS: dict = {
        "frequencia_historica": 50,
        "tempo_ausencia": 50,
        "distribuicao_posicional": 50,
        "equilibrio_par_impar": 50,
        "tendencia_soma": 50
    }

    # Enable/disable debug mode
    DEBUG: bool = ENVIRONMENT == "development"

    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")


settings = Settings()
