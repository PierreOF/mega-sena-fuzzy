"""
Pydantic models for API request/response validation
"""

from pydantic import BaseModel, Field, field_validator
from typing import Dict, List, Optional


class PesosInput(BaseModel):
    """Input model for fuzzy variable weights."""
    frequencia_historica: float = Field(
        default=50,
        ge=0,
        le=100,
        description="Weight for historical frequency (0-100%)"
    )
    tempo_ausencia: float = Field(
        default=50,
        ge=0,
        le=100,
        description="Weight for absence time (0-100%)"
    )
    distribuicao_posicional: float = Field(
        default=50,
        ge=0,
        le=100,
        description="Weight for positional distribution (0-100%)"
    )
    equilibrio_par_impar: float = Field(
        default=50,
        ge=0,
        le=100,
        description="Weight for even/odd balance (0-100%)"
    )
    tendencia_soma: float = Field(
        default=50,
        ge=0,
        le=100,
        description="Weight for sum tendency (0-100%)"
    )


class CalcularRequest(BaseModel):
    """Request model for calculating fuzzy scores."""
    pesos: PesosInput = Field(
        default_factory=PesosInput,
        description="Weights for each fuzzy variable"
    )
    quantidade_principal: int = Field(
        default=6,
        ge=1,
        le=20,
        description="Number of main recommendations (1-20)"
    )
    quantidade_pool: int = Field(
        default=12,
        ge=1,
        le=30,
        description="Size of extended pool (1-30)"
    )

    @field_validator('quantidade_pool')
    @classmethod
    def pool_must_be_greater_than_principal(cls, v, info):
        """Validate that pool size is >= principal quantity."""
        if 'quantidade_principal' in info.data and v < info.data['quantidade_principal']:
            raise ValueError('Pool size must be >= principal quantity')
        return v


class NumeroScore(BaseModel):
    """Model for a number with its fuzzy score."""
    numero: int = Field(ge=1, le=60, description="Number (1-60)")
    score: float = Field(ge=0, le=10, description="Fuzzy score (0-10)")


class DistribuicaoDezenas(BaseModel):
    """Distribution of numbers by tens."""
    range_1_10: int = Field(alias='1-10')
    range_11_20: int = Field(alias='11-20')
    range_21_30: int = Field(alias='21-30')
    range_31_40: int = Field(alias='31-40')
    range_41_50: int = Field(alias='41-50')
    range_51_60: int = Field(alias='51-60')

    class Config:
        populate_by_name = True


class Estatisticas(BaseModel):
    """Statistics about the recommendations."""
    soma_total: int = Field(description="Sum of recommended numbers")
    pares: int = Field(description="Count of even numbers")
    impares: int = Field(description="Count of odd numbers")
    media_score: float = Field(description="Average score")
    desvio_padrao: float = Field(description="Standard deviation of scores")
    distribuicao_dezenas: Dict[str, int] = Field(description="Distribution by tens")


class DistribuicaoScores(BaseModel):
    """Distribution of scores by category."""
    muito_baixo: int = Field(description="Count of very low scores (0-2)")
    baixo: int = Field(description="Count of low scores (2-4)")
    medio: int = Field(description="Count of medium scores (4-6)")
    medio_alto: int = Field(description="Count of medium-high scores (6-8)")
    alto: int = Field(description="Count of high scores (8-10)")


class DadosGraficos(BaseModel):
    """Data for charts and visualizations."""
    todos_scores: List[NumeroScore] = Field(description="Scores for all 60 numbers")
    distribuicao_scores: DistribuicaoScores = Field(description="Score distribution")


class CalcularResponse(BaseModel):
    """Response model for calculation results."""
    success: bool = Field(default=True, description="Whether calculation was successful")
    data: Optional['ResultadosData'] = Field(default=None, description="Calculation results")
    error: Optional[str] = Field(default=None, description="Error message if any")


class ResultadosData(BaseModel):
    """Data section of the calculation response."""
    numeros_principais: List[NumeroScore] = Field(description="Main recommended numbers")
    pool_estendido: List[int] = Field(description="Extended pool of numbers")
    estatisticas: Estatisticas = Field(description="Statistics about results")
    dados_graficos: DadosGraficos = Field(description="Data for charts")


class ConfiguracaoPadrao(BaseModel):
    """Default configuration model."""
    pesos_padrao: PesosInput = Field(description="Default weights")
    descricoes: Dict[str, str] = Field(description="Descriptions of each variable")


class DadosHistoricos(BaseModel):
    """Historical data information model."""
    total_concursos: int = Field(description="Total number of draws")
    periodo_inicio: str = Field(description="Start date (YYYY-MM-DD)")
    periodo_fim: str = Field(description="End date (YYYY-MM-DD)")
    total_numeros: int = Field(default=60, description="Total numbers in the game")


class HealthResponse(BaseModel):
    """Health check response model."""
    status: str = Field(default="ok", description="Service status")
    version: str = Field(default="1.0.0", description="API version")


# Update forward references
CalcularResponse.model_rebuild()
