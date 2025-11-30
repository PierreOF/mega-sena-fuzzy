"""
FastAPI application for Fuzzy Mega-Sena System
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from config import settings
from models import (
    CalcularRequest,
    CalcularResponse,
    ResultadosData,
    ConfiguracaoPadrao,
    DadosHistoricos,
    HealthResponse,
    PesosInput
)
from fuzzy_engine import FuzzyMegaSenaEngine

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize fuzzy engine (singleton)
fuzzy_engine: FuzzyMegaSenaEngine = None


@app.on_event("startup")
async def startup_event():
    """Initialize the fuzzy engine on startup."""
    global fuzzy_engine
    try:
        logger.info("Initializing Fuzzy Mega-Sena Engine...")
        fuzzy_engine = FuzzyMegaSenaEngine(data_path=settings.DATA_PATH)
        logger.info("Fuzzy engine initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize fuzzy engine: {e}")
        raise


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Sistema Fuzzy Mega-Sena API",
        "version": settings.API_VERSION,
        "docs": "/docs",
        "health": "/api/health"
    }


@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    Health check endpoint.

    Returns the current status and version of the API.
    """
    return HealthResponse(
        status="ok",
        version=settings.API_VERSION
    )


@app.post("/api/calcular", response_model=CalcularResponse, tags=["Fuzzy"])
async def calcular_numeros(request: CalcularRequest):
    """
    Calculate fuzzy scores for all numbers based on provided weights.

    This endpoint applies the fuzzy inference system to all 60 numbers using
    the provided weights for each variable. Returns the top recommended numbers,
    an extended pool, statistics, and data for visualizations.

    **Parameters:**
    - **pesos**: Weights for each of the 5 fuzzy variables (0-100%)
    - **quantidade_principal**: Number of main recommendations (default: 6)
    - **quantidade_pool**: Size of extended pool (default: 12)

    **Returns:**
    - **numeros_principais**: Top recommended numbers with scores
    - **pool_estendido**: Extended pool of numbers
    - **estatisticas**: Statistical analysis of results
    - **dados_graficos**: Data for charts and visualizations

    **Example Request:**
    ```json
    {
      "pesos": {
        "frequencia_historica": 70,
        "tempo_ausencia": 50,
        "distribuicao_posicional": 50,
        "equilibrio_par_impar": 70,
        "tendencia_soma": 30
      },
      "quantidade_principal": 6,
      "quantidade_pool": 12
    }
    ```
    """
    try:
        logger.info(f"Calculating scores with weights: {request.pesos.model_dump()}")

        # Convert Pydantic model to dict
        pesos_dict = request.pesos.model_dump()

        # Get recommendations from fuzzy engine
        resultados = fuzzy_engine.get_recommendations(
            pesos=pesos_dict,
            top_n=request.quantidade_principal,
            pool_n=request.quantidade_pool
        )

        # Build response
        response_data = ResultadosData(**resultados)

        logger.info(f"Calculation successful. Top number: {resultados['numeros_principais'][0]['numero']}")

        return CalcularResponse(
            success=True,
            data=response_data
        )

    except Exception as e:
        logger.error(f"Error calculating scores: {e}", exc_info=True)
        return CalcularResponse(
            success=False,
            error=str(e)
        )


@app.get("/api/configuracao-padrao", response_model=ConfiguracaoPadrao, tags=["Configuration"])
async def get_configuracao_padrao():
    """
    Get default configuration.

    Returns the default weights for all fuzzy variables (all set to 50%)
    and descriptions of what each variable represents.

    **Returns:**
    - **pesos_padrao**: Default weights (all 50%)
    - **descricoes**: Portuguese descriptions of each variable
    """
    return ConfiguracaoPadrao(
        pesos_padrao=PesosInput(**settings.DEFAULT_WEIGHTS),
        descricoes=settings.VARIABLE_DESCRIPTIONS
    )


@app.get("/api/dados-historicos", response_model=DadosHistoricos, tags=["Data"])
async def get_dados_historicos():
    """
    Get information about the historical dataset.

    Returns metadata about the Mega-Sena historical data being used by the system.

    **Returns:**
    - **total_concursos**: Total number of draws in the dataset
    - **periodo_inicio**: Start date of the dataset
    - **periodo_fim**: End date of the dataset
    - **total_numeros**: Total numbers in the game (always 60)
    """
    try:
        # Get data from fuzzy engine
        df = fuzzy_engine.dados_megasena

        return DadosHistoricos(
            total_concursos=len(df),
            periodo_inicio=df['data'].min().strftime('%Y-%m-%d'),
            periodo_fim=df['data'].max().strftime('%Y-%m-%d'),
            total_numeros=60
        )

    except Exception as e:
        logger.error(f"Error getting historical data info: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error. Please try again later."
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
