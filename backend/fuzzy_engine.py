"""
Fuzzy Logic Engine for Mega-Sena Analysis
Extracted from the original Jupyter notebook
"""

import pandas as pd
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
from typing import Dict, List, Tuple
import os


class FuzzyMegaSenaEngine:
    """
    Fuzzy logic system for analyzing Mega-Sena numbers.

    Uses 5 input variables (antecedents) and 1 output variable (consequent):
    - Frequency Historic (0-100)
    - Absence Time (0-100)
    - Positional Distribution (0-100)
    - Even/Odd Balance (0-100)
    - Sum Tendency (0-100)

    Output: Interest Score (0-10)
    """

    def __init__(self, data_path: str = None):
        """Initialize the fuzzy engine and load data."""
        if data_path is None:
            # Default path to data file
            data_path = os.path.join(os.path.dirname(__file__), "..", "data", "megascsv.csv")

        self.data_path = data_path
        self.dados_megasena = None
        self.historico_numeros = None
        self.dados_fuzzy = None

        # Fuzzy system components
        self.sistema_controle = None
        self.simulador = None

        # Initialize the system
        self._load_data()
        self._calculate_fuzzy_variables()
        self._setup_fuzzy_system()

    def _load_data(self):
        """Load the Mega-Sena CSV data."""
        self.dados_megasena = pd.read_csv(self.data_path, delimiter=';')
        self.dados_megasena.columns = ['concurso', 'data', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6']
        self.dados_megasena['data'] = pd.to_datetime(self.dados_megasena['data'], format='%Y-%m-%d')
        self.dados_megasena = self.dados_megasena.sort_values('concurso', ascending=False).reset_index(drop=True)

        # Extract historical numbers
        self.historico_numeros = self._extrair_numeros_historicos(self.dados_megasena)

    def _extrair_numeros_historicos(self, df: pd.DataFrame) -> pd.DataFrame:
        """Extract historical numbers with metadata."""
        numeros_historicos = []

        for _, row in df.iterrows():
            concurso = row['concurso']
            data = row['data']
            numeros = [row['n1'], row['n2'], row['n3'], row['n4'], row['n5'], row['n6']]

            for posicao, numero in enumerate(numeros, 1):
                numeros_historicos.append({
                    'concurso': concurso,
                    'data': data,
                    'numero': numero,
                    'posicao': posicao
                })

        return pd.DataFrame(numeros_historicos)

    def _calculate_fuzzy_variables(self):
        """Calculate all 5 fuzzy input variables for all 60 numbers."""
        # 1. Frequency
        frequencia = self._calcular_frequencia_numeros(self.historico_numeros)

        # 2. Absence time
        tempo_ausencia = self._calcular_tempo_ausencia(self.dados_megasena, self.historico_numeros)

        # 3. Positional distribution
        dist_posicional = self._calcular_distribuicao_posicional(self.historico_numeros)

        # 4. Even/Odd balance
        equilibrio = self._calcular_equilibrio_par_impar(self.dados_megasena)

        # 5. Sum tendency
        tendencia = self._calcular_tendencia_soma(self.dados_megasena)

        # Consolidate all variables
        self.dados_fuzzy = self._consolidar_variaveis_fuzzy(
            frequencia, tempo_ausencia, dist_posicional, equilibrio, tendencia
        )

    def _calcular_frequencia_numeros(self, historico: pd.DataFrame) -> pd.DataFrame:
        """Calculate frequency of appearance for each number."""
        todos_numeros = pd.DataFrame({'numero': range(1, 61)})
        freq_count = historico['numero'].value_counts().reset_index()
        freq_count.columns = ['numero', 'frequencia']

        frequencia = todos_numeros.merge(freq_count, on='numero', how='left')
        frequencia['frequencia'] = frequencia['frequencia'].fillna(0)

        return frequencia.sort_values('numero')

    def _calcular_tempo_ausencia(self, df: pd.DataFrame, historico: pd.DataFrame) -> pd.DataFrame:
        """Calculate absence time for each number."""
        ultima_data = df['data'].max()
        tempo_ausencia = []

        for numero in range(1, 61):
            aparicoes = historico[historico['numero'] == numero]

            if len(aparicoes) > 0:
                ultima_aparicao = aparicoes['data'].max()
                dias_ausencia = (ultima_data - ultima_aparicao).days
            else:
                dias_ausencia = 999

            tempo_ausencia.append({
                'numero': numero,
                'dias_ausencia': dias_ausencia
            })

        return pd.DataFrame(tempo_ausencia)

    def _calcular_distribuicao_posicional(self, historico: pd.DataFrame) -> pd.DataFrame:
        """Calculate positional distribution uniformity for each number."""
        distribuicao_posicional = []

        for numero in range(1, 61):
            aparicoes_numero = historico[historico['numero'] == numero]

            if len(aparicoes_numero) > 0:
                count_posicoes = aparicoes_numero['posicao'].value_counts().sort_index()

                for pos in range(1, 7):
                    if pos not in count_posicoes.index:
                        count_posicoes.loc[pos] = 0

                count_posicoes = count_posicoes.sort_index()

                if len(count_posicoes) > 0:
                    media = count_posicoes.mean()
                    if media > 0:
                        cv = count_posicoes.std() / media
                        uniformidade = max(0, 100 - (cv * 100))
                    else:
                        uniformidade = 0
                else:
                    uniformidade = 0
            else:
                uniformidade = 0

            distribuicao_posicional.append({
                'numero': numero,
                'uniformidade_posicional': uniformidade
            })

        return pd.DataFrame(distribuicao_posicional)

    def _calcular_equilibrio_par_impar(self, df: pd.DataFrame) -> pd.DataFrame:
        """Calculate even/odd balance score for each number."""
        equilibrio_scores = []
        ultimos_concursos = df.head(20)

        for numero in range(1, 61):
            is_par = (numero % 2 == 0)
            total_pares = 0
            total_impares = 0

            for _, row in ultimos_concursos.iterrows():
                numeros_concurso = [row['n1'], row['n2'], row['n3'], row['n4'], row['n5'], row['n6']]
                pares_concurso = sum(1 for n in numeros_concurso if n % 2 == 0)
                impares_concurso = 6 - pares_concurso

                total_pares += pares_concurso
                total_impares += impares_concurso

            total_numeros = total_pares + total_impares
            prop_pares = total_pares / total_numeros if total_numeros > 0 else 0.5

            if is_par:
                score = (1 - prop_pares) * 100
            else:
                score = prop_pares * 100

            equilibrio_scores.append({
                'numero': numero,
                'equilibrio_par_impar': score
            })

        return pd.DataFrame(equilibrio_scores)

    def _calcular_tendencia_soma(self, df: pd.DataFrame) -> pd.DataFrame:
        """Calculate sum tendency score for each number."""
        ultimos_concursos = df.head(50)
        somas = []

        for _, row in ultimos_concursos.iterrows():
            soma = row['n1'] + row['n2'] + row['n3'] + row['n4'] + row['n5'] + row['n6']
            somas.append(soma)

        media_somas = np.mean(somas)
        tendencia_soma = []

        for numero in range(1, 61):
            contribuicao_ideal = media_somas / 6
            distancia = abs(numero - contribuicao_ideal)
            max_distancia = max(abs(1 - contribuicao_ideal), abs(60 - contribuicao_ideal))
            score = max(0, 100 * (1 - distancia / max_distancia))

            tendencia_soma.append({
                'numero': numero,
                'tendencia_soma': score
            })

        return pd.DataFrame(tendencia_soma)

    def _consolidar_variaveis_fuzzy(self, freq, ausencia, dist, equilibrio, tendencia) -> pd.DataFrame:
        """Consolidate and normalize all fuzzy variables."""
        dados_fuzzy = pd.DataFrame({'numero': range(1, 61)})

        # Normalize frequency
        freq_norm = freq.copy()
        max_freq = freq_norm['frequencia'].max()
        min_freq = freq_norm['frequencia'].min()
        freq_norm['frequencia_normalizada'] = (
            (freq_norm['frequencia'] - min_freq) / (max_freq - min_freq) * 100
        )

        # Normalize absence time
        ausencia_norm = ausencia.copy()
        max_ausencia = ausencia_norm['dias_ausencia'].max()
        min_ausencia = ausencia_norm['dias_ausencia'].min()
        ausencia_norm['ausencia_normalizada'] = (
            (ausencia_norm['dias_ausencia'] - min_ausencia) /
            (max_ausencia - min_ausencia) * 100
        )

        # Merge all variables
        dados_fuzzy = dados_fuzzy.merge(
            freq_norm[['numero', 'frequencia_normalizada']], on='numero'
        ).merge(
            ausencia_norm[['numero', 'ausencia_normalizada']], on='numero'
        ).merge(
            dist[['numero', 'uniformidade_posicional']], on='numero'
        ).merge(
            equilibrio[['numero', 'equilibrio_par_impar']], on='numero'
        ).merge(
            tendencia[['numero', 'tendencia_soma']], on='numero'
        )

        dados_fuzzy.columns = [
            'numero', 'frequencia_historica', 'tempo_ausencia',
            'distribuicao_posicional', 'equilibrio_par_impar', 'tendencia_soma'
        ]

        return dados_fuzzy

    def _setup_fuzzy_system(self):
        """Setup the fuzzy control system with rules."""
        # Create fuzzy variables (antecedents and consequent)
        frequencia_historica = ctrl.Antecedent(np.arange(0, 101, 1), 'frequencia_historica')
        tempo_ausencia = ctrl.Antecedent(np.arange(0, 101, 1), 'tempo_ausencia')
        distribuicao_posicional = ctrl.Antecedent(np.arange(0, 101, 1), 'distribuicao_posicional')
        equilibrio_par_impar = ctrl.Antecedent(np.arange(0, 101, 1), 'equilibrio_par_impar')
        tendencia_soma = ctrl.Antecedent(np.arange(0, 101, 1), 'tendencia_soma')
        score_interesse = ctrl.Consequent(np.arange(0, 11, 1), 'score_interesse')

        # Define membership functions for inputs (3 terms each)
        for var in [frequencia_historica, tempo_ausencia, equilibrio_par_impar, tendencia_soma]:
            var['baixa' if var == frequencia_historica or var == tendencia_soma else 'baixo'] = \
                fuzz.trimf(var.universe, [0, 0, 40])
            var['media' if var == frequencia_historica or var == tendencia_soma else 'medio'] = \
                fuzz.trimf(var.universe, [20, 50, 80])
            var['alta' if var == frequencia_historica or var == tendencia_soma else 'alto'] = \
                fuzz.trimf(var.universe, [60, 100, 100])

        # Positional distribution (ruim, media, boa)
        distribuicao_posicional['ruim'] = fuzz.trimf(distribuicao_posicional.universe, [0, 0, 40])
        distribuicao_posicional['media'] = fuzz.trimf(distribuicao_posicional.universe, [20, 50, 80])
        distribuicao_posicional['boa'] = fuzz.trimf(distribuicao_posicional.universe, [60, 100, 100])

        # Output variable (5 terms)
        score_interesse['muito_baixo'] = fuzz.trimf(score_interesse.universe, [0, 0, 2.5])
        score_interesse['baixo'] = fuzz.trimf(score_interesse.universe, [0, 2.5, 5])
        score_interesse['medio'] = fuzz.trimf(score_interesse.universe, [2.5, 5, 7.5])
        score_interesse['alto'] = fuzz.trimf(score_interesse.universe, [5, 7.5, 10])
        score_interesse['muito_alto'] = fuzz.trimf(score_interesse.universe, [7.5, 10, 10])

        # Define the 12 fuzzy rules
        regras = []

        regras.append(ctrl.Rule(
            frequencia_historica['alta'] & tempo_ausencia['baixo'],
            score_interesse['baixo']
        ))

        regras.append(ctrl.Rule(
            frequencia_historica['baixa'] & tempo_ausencia['alto'],
            score_interesse['muito_alto']
        ))

        regras.append(ctrl.Rule(
            distribuicao_posicional['boa'] & equilibrio_par_impar['alto'],
            score_interesse['alto']
        ))

        regras.append(ctrl.Rule(
            frequencia_historica['media'] & tempo_ausencia['medio'] & tendencia_soma['alta'],
            score_interesse['alto']
        ))

        regras.append(ctrl.Rule(
            frequencia_historica['baixa'] & tempo_ausencia['baixo'] &
            distribuicao_posicional['ruim'] & equilibrio_par_impar['baixo'] &
            tendencia_soma['baixa'],
            score_interesse['muito_baixo']
        ))

        regras.append(ctrl.Rule(
            frequencia_historica['baixa'] & distribuicao_posicional['boa'],
            score_interesse['alto']
        ))

        regras.append(ctrl.Rule(
            tempo_ausencia['alto'] & equilibrio_par_impar['alto'],
            score_interesse['alto']
        ))

        regras.append(ctrl.Rule(
            frequencia_historica['alta'] & distribuicao_posicional['ruim'],
            score_interesse['baixo']
        ))

        regras.append(ctrl.Rule(
            tendencia_soma['alta'] & equilibrio_par_impar['alto'] & tempo_ausencia['medio'],
            score_interesse['alto']
        ))

        regras.append(ctrl.Rule(
            frequencia_historica['media'] & tempo_ausencia['medio'] &
            distribuicao_posicional['media'] & equilibrio_par_impar['medio'] &
            tendencia_soma['media'],
            score_interesse['medio']
        ))

        regras.append(ctrl.Rule(
            frequencia_historica['baixa'] & tempo_ausencia['baixo'] & tendencia_soma['alta'],
            score_interesse['medio']
        ))

        regras.append(ctrl.Rule(
            distribuicao_posicional['boa'] & tendencia_soma['alta'],
            score_interesse['alto']
        ))

        # Create control system
        self.sistema_controle = ctrl.ControlSystem(regras)
        self.simulador = ctrl.ControlSystemSimulation(self.sistema_controle)

    def calculate_score(self, numero: int, pesos: Dict[str, float] = None) -> float:
        """
        Calculate fuzzy score for a specific number.

        Args:
            numero: Number to analyze (1-60)
            pesos: Optional weights for each variable (0-100%)
                   If None, uses original values. If provided, applies weights.

        Returns:
            Fuzzy score (0-10)
        """
        if numero < 1 or numero > 60:
            raise ValueError("Number must be between 1 and 60")

        # Get base values for the number
        linha_numero = self.dados_fuzzy[self.dados_fuzzy['numero'] == numero].iloc[0]

        # Apply weights if provided
        if pesos:
            # Weights are percentages (0-100), normalize to 0-1
            peso_freq = pesos.get('frequencia_historica', 100) / 100
            peso_ausencia = pesos.get('tempo_ausencia', 100) / 100
            peso_dist = pesos.get('distribuicao_posicional', 100) / 100
            peso_equilibrio = pesos.get('equilibrio_par_impar', 100) / 100
            peso_soma = pesos.get('tendencia_soma', 100) / 100

            # Apply weights by scaling the values
            freq = linha_numero['frequencia_historica'] * peso_freq
            ausencia = linha_numero['tempo_ausencia'] * peso_ausencia
            dist = linha_numero['distribuicao_posicional'] * peso_dist
            equilibrio = linha_numero['equilibrio_par_impar'] * peso_equilibrio
            soma = linha_numero['tendencia_soma'] * peso_soma
        else:
            freq = linha_numero['frequencia_historica']
            ausencia = linha_numero['tempo_ausencia']
            dist = linha_numero['distribuicao_posicional']
            equilibrio = linha_numero['equilibrio_par_impar']
            soma = linha_numero['tendencia_soma']

        try:
            # Feed inputs to simulator
            self.simulador.input['frequencia_historica'] = freq
            self.simulador.input['tempo_ausencia'] = ausencia
            self.simulador.input['distribuicao_posicional'] = dist
            self.simulador.input['equilibrio_par_impar'] = equilibrio
            self.simulador.input['tendencia_soma'] = soma

            # Compute fuzzy inference
            self.simulador.compute()

            return self.simulador.output['score_interesse']
        except Exception:
            return 0.0

    def calculate_all_scores(self, pesos: Dict[str, float] = None) -> pd.DataFrame:
        """
        Calculate fuzzy scores for all 60 numbers.

        Args:
            pesos: Optional weights for each variable (0-100%)

        Returns:
            DataFrame with all numbers and their scores
        """
        scores = []

        for numero in range(1, 61):
            score = self.calculate_score(numero, pesos)
            scores.append({
                'numero': numero,
                'score': score
            })

        df_scores = pd.DataFrame(scores)

        # Merge with original fuzzy data
        resultado = self.dados_fuzzy.merge(df_scores, on='numero')

        return resultado.sort_values('score', ascending=False).reset_index(drop=True)

    def get_recommendations(self, pesos: Dict[str, float] = None,
                           top_n: int = 6, pool_n: int = 12) -> Dict:
        """
        Get number recommendations based on fuzzy scores.

        Args:
            pesos: Optional weights for each variable
            top_n: Number of top recommendations (default 6)
            pool_n: Size of extended pool (default 12)

        Returns:
            Dictionary with recommendations and statistics
        """
        # Calculate all scores
        resultados = self.calculate_all_scores(pesos)

        # Get top numbers
        top_numeros = resultados.head(top_n)
        pool_numeros = resultados.head(pool_n)

        # Prepare response
        numeros_principais = [
            {
                'numero': int(row['numero']),
                'score': float(row['score'])
            }
            for _, row in top_numeros.iterrows()
        ]

        pool_estendido = [int(x) for x in pool_numeros['numero'].tolist()]

        # Calculate statistics
        main_numbers = [x['numero'] for x in numeros_principais]
        soma_total = sum(main_numbers)
        pares = sum(1 for n in main_numbers if n % 2 == 0)
        impares = top_n - pares

        # Distribution by tens
        distribuicao_dezenas = {
            '1-10': sum(1 for n in main_numbers if 1 <= n <= 10),
            '11-20': sum(1 for n in main_numbers if 11 <= n <= 20),
            '21-30': sum(1 for n in main_numbers if 21 <= n <= 30),
            '31-40': sum(1 for n in main_numbers if 31 <= n <= 40),
            '41-50': sum(1 for n in main_numbers if 41 <= n <= 50),
            '51-60': sum(1 for n in main_numbers if 51 <= n <= 60),
        }

        # Score distribution
        def classificar_score(score):
            if score >= 8:
                return 'muito_alto'
            elif score >= 6:
                return 'alto'
            elif score >= 4:
                return 'medio'
            elif score >= 2:
                return 'baixo'
            else:
                return 'muito_baixo'

        distribuicao_scores = {
            'muito_baixo': int(resultados[resultados['score'] < 2].shape[0]),
            'baixo': int(resultados[(resultados['score'] >= 2) & (resultados['score'] < 4)].shape[0]),
            'medio': int(resultados[(resultados['score'] >= 4) & (resultados['score'] < 6)].shape[0]),
            'medio_alto': int(resultados[(resultados['score'] >= 6) & (resultados['score'] < 8)].shape[0]),
            'alto': int(resultados[resultados['score'] >= 8].shape[0]),
        }

        # All scores for charts
        todos_scores = [
            {
                'numero': int(row['numero']),
                'score': float(row['score'])
            }
            for _, row in resultados.iterrows()
        ]

        return {
            'numeros_principais': numeros_principais,
            'pool_estendido': pool_estendido,
            'estatisticas': {
                'soma_total': soma_total,
                'pares': pares,
                'impares': impares,
                'media_score': float(resultados['score'].mean()),
                'desvio_padrao': float(resultados['score'].std()),
                'distribuicao_dezenas': distribuicao_dezenas
            },
            'dados_graficos': {
                'todos_scores': todos_scores,
                'distribuicao_scores': distribuicao_scores
            }
        }
