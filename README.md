# Sistema Fuzzy Mega-Sena

Sistema web educacional que demonstra o uso de **lógica fuzzy** para análise de números da Mega-Sena baseado em padrões históricos.

**⚠️ AVISO EDUCACIONAL IMPORTANTE:** Este é um projeto puramente acadêmico para demonstração de sistemas de inteligência artificial. **NÃO aumenta suas chances de ganhar na loteria.** Cada número da Mega-Sena tem exatamente a mesma probabilidade de ser sorteado (1/60). Jogue com responsabilidade.

---

## 🎯 O Que é Este Sistema?

Este sistema utiliza **lógica fuzzy** (lógica difusa) para analisar números da Mega-Sena com base em 2.221 sorteios históricos realizados entre 1996 e 2020. Diferente da lógica tradicional (onde algo é "verdadeiro" ou "falso"), a lógica fuzzy trabalha com graus de pertinência, permitindo que um número seja "parcialmente interessante" ou "moderadamente relevante".

### Como Funciona a Lógica Fuzzy Aqui?

O sistema avalia cada número de 1 a 60 usando **5 variáveis estatísticas**:

1. **📊 Frequência Histórica**
   - O quanto este número apareceu nos sorteios passados
   - Números que aparecem mais frequentemente recebem pontuação maior
   - Exemplo: Se o número 5 apareceu em 15% dos sorteios e o número 42 em 8%, o número 5 tem maior frequência

2. **📅 Tempo de Ausência**
   - Quantos sorteios se passaram desde a última vez que o número foi sorteado
   - Números que não aparecem há muito tempo podem ter pontuação diferenciada
   - Exemplo: Se o número 23 não aparece há 50 sorteios, ele tem alto "tempo de ausência"

3. **📍 Distribuição Posicional**
   - O quão uniforme é a aparição do número nas 6 posições de cada sorteio
   - Mega-Sena sorteia 6 números por concurso (da esquerda para direita)
   - Números que aparecem em todas as posições têm distribuição mais equilibrada
   - Exemplo: Número 10 aparece igualmente na 1ª, 2ª, 3ª, 4ª, 5ª e 6ª posição = boa distribuição

4. **⚖️ Equilíbrio Par/Ímpar**
   - Analisa se o número contribui para um equilíbrio entre pares e ímpares
   - Historicamente, sorteios tendem a ter mix de números pares e ímpares
   - Exemplo: Em um jogo com 4 pares e 2 ímpares, números ímpares podem ter maior pontuação

5. **➕ Tendência da Soma**
   - A soma dos 6 números sorteados geralmente fica em uma faixa específica
   - Números que contribuem para somas dentro dessa faixa histórica recebem melhor pontuação
   - Exemplo: Se a soma média é 180, números que ajudam a atingir esse valor pontuam melhor

### O Sistema de Pontuação

Após analisar essas 5 variáveis, o sistema usa **12 regras fuzzy** para atribuir um **Score de Interesse** (0 a 10) para cada número:

- **8-10 pontos**: Alto interesse estatístico
- **6-8 pontos**: Interesse médio-alto
- **4-6 pontos**: Interesse moderado
- **0-4 pontos**: Baixo interesse

**Importante:** Este score NÃO significa "probabilidade de sair". Todos os números têm a mesma probabilidade (1/60). O score reflete apenas padrões estatísticos históricos.

---

## 🖥️ Como Usar a Aplicação?

### 1️⃣ Página Inicial (Home)

Ao acessar o sistema, você verá:
- Uma explicação do que é lógica fuzzy
- O aviso educacional importante
- Um botão **"Iniciar Análise"** para começar

### 2️⃣ Página de Configuração

Aqui você ajusta a **importância** de cada uma das 5 variáveis usando controles deslizantes (sliders):

- **0%**: A variável é completamente ignorada no cálculo
- **50%**: Peso padrão e equilibrado (recomendado)
- **100%**: Máxima importância para essa variável

**Exemplos de Configuração:**

- **Focado em Frequência**: Frequência = 100%, outras = 0%
  → Sistema priorizará números que aparecem muito historicamente

- **Focado em Ausência**: Tempo de Ausência = 100%, outras = 0%
  → Sistema priorizará números que não aparecem há muito tempo

- **Balanceado**: Todas em 50%
  → Sistema considera todas as variáveis igualmente

- **Customizado**: Frequência = 70%, Equilíbrio Par/Ímpar = 70%, outras = 30%
  → Sistema prioriza frequência e equilíbrio, com menor peso nas demais

**Importante:** Alterar os pesos NÃO altera a probabilidade real do sorteio. Apenas muda quais critérios estatísticos o sistema considera mais importantes.

### 3️⃣ Página de Resultados

Após clicar em **"Gerar Resultados"**, você verá:

**📋 Números Principais (Top 6)**
- Os 6 números com maiores scores fuzzy
- Prontos para jogar (se você quiser)

**🎯 Pool Estendido (Top 12)**
- 12 números mais bem pontuados
- Útil para fazer múltiplas combinações ou dezenas

**📊 Gráficos Interativos**
- Distribuição dos scores de todos os 60 números
- Contribuição de cada variável para o score final
- Comparação visual entre os números recomendados

**📈 Estatísticas**
- Score médio geral
- Classificações (Alto Interesse, Médio, Baixo)
- Análise de padrões (pares/ímpares, distribuição, etc.)

---

## 🧠 Entendendo os Resultados

### O Que Significa Cada Resultado?

**Números Principais**: Os 6 números que, segundo os critérios estatísticos configurados, apresentam o maior "interesse fuzzy".

**Por que eles foram escolhidos?**
- Eles combinam altos valores nas variáveis que você priorizou
- O sistema aplicou as 12 regras fuzzy e eles obtiveram as maiores pontuações

**Isso garante que vou ganhar?**
- **NÃO.** A loteria é aleatória. Estes números têm a mesma chance (1/60) de qualquer outro.

### Exemplo Prático

**Configuração**: Todas variáveis em 50% (balanceado)

**Resultado**:
```
Números Principais: [5, 23, 33, 42, 51, 54]

Detalhamento:
- Número 5:  Score 8.7 → Frequência alta + Boa distribuição posicional
- Número 23: Score 8.5 → Tempo de ausência médio + Equilíbrio par/ímpar
- Número 33: Score 8.3 → Frequência moderada + Tendência de soma boa
- ...
```

**Interpretação**: Estes números apresentam combinação favorável nos critérios estatísticos. Mas lembre-se: estatística passada não prevê sorteios futuros.

---

## ⚙️ Instalação Rápida

### Backend (API)
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```
Acesse: http://localhost:8000

### Frontend (Interface)
```bash
cd frontend
npm install
npm run dev
```
Acesse: http://localhost:5173

---

## 📁 Estrutura do Projeto

```
fuzzy/
├── backend/          # API em Python (FastAPI + scikit-fuzzy)
├── frontend/         # Interface em React
├── data/             # Dados históricos (2.221 sorteios)
└── README.md         # Este arquivo
```

---

## 🎓 Propósito Educacional

Este projeto foi desenvolvido para:
- **Demonstrar lógica fuzzy** aplicada a um problema real
- **Ensinar inteligência artificial** de forma prática e visual
- **Ilustrar sistemas de inferência** com regras linguísticas
- **Mostrar análise estatística** de dados históricos

**Não deve ser usado para:**
- Garantir ganhos financeiros
- Substituir análise probabilística rigorosa
- Tomar decisões financeiras importantes
- Acreditar que padrões passados preveem o futuro

---

## ⚠️ Disclaimers Finais

✅ **Este sistema É:**
- Uma demonstração educacional de lógica fuzzy
- Uma análise estatística de padrões históricos
- Um projeto acadêmico de inteligência artificial

❌ **Este sistema NÃO É:**
- Uma forma de prever números futuros
- Uma garantia de ganhos na loteria
- Uma estratégia infalível ou vantajosa
- Uma ferramenta de investimento

🎲 **Lembre-se sempre:**
- Cada número tem probabilidade igual: 1/60
- Sorteios passados não influenciam sorteios futuros
- A loteria é um jogo de azar aleatório
- Jogue apenas por diversão e com responsabilidade

---

## 🤝 Contribuições

Este é um projeto acadêmico aberto. Contribuições são bem-vindas para melhorar a demonstração educacional de lógica fuzzy.

## 📄 Licença

Projeto educacional de uso livre com atribuição.

---

**Desenvolvido como projeto acadêmico de Inteligência Artificial**
