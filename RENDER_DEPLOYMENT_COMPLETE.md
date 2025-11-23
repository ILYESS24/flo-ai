# 🚀 Déploiement Complet Flo AI sur Render

Guide complet avec toutes les commandes et variables d'environnement pour déployer Flo AI sur Render.

## 📋 Prérequis

1. **Compte Render** : https://render.com
2. **Repository GitHub** : Votre code Flo AI poussé sur GitHub
3. **Clés API LLM** :
   - OpenAI API Key
   - Anthropic API Key (optionnel)
   - Google AI API Key (optionnel)

## 🗄️ 1. Créer la Base de Données PostgreSQL

### Commandes Render CLI (si installé) :
```bash
# Se connecter à Render
render login

# Créer la base de données PostgreSQL
render postgres create flo-ai-db \
  --plan free \
  --region oregon \
  --version 16
```

### Via l'Interface Web :
1. Aller sur https://dashboard.render.com
2. Cliquer "New" → "PostgreSQL"
3. Configurer :
   - **Name** : `flo-ai-db`
   - **Plan** : Free ($0/mois)
   - **Region** : Oregon (US West)
   - **Version** : 16

### Variables d'environnement générées :
Après création, Render fournit automatiquement :
- `DATABASE_URL` : URL de connexion complète PostgreSQL
- Format : `postgresql://user:password@host:5432/database`

## 🐍 2. Déployer l'API Python (Backend)

### Via l'Interface Web :
1. Aller sur https://dashboard.render.com
2. Cliquer "New" → "Web Service"
3. Connecter votre repository GitHub
4. Configurer :

#### ⚙️ Paramètres de base :
- **Name** : `flo-ai-api`
- **Runtime** : `Python 3`
- **Build Command** :
  ```bash
  pip install -r flo_ai/requirements.txt
  ```
- **Start Command** :
  ```bash
  cd flo_ai && python api.py
  ```

#### 🌍 Variables d'environnement :
```bash
# Python version
PYTHON_VERSION=3.11

# API Keys (OBLIGATOIRE pour le fonctionnement)
OPENAI_API_KEY=sk-your-openai-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
GOOGLE_API_KEY=your-google-ai-key-here

# Database (fourni automatiquement par Render)
DATABASE_URL=postgresql://flo_ai_db_user:password@host:5432/flo_ai_db

# Configuration optionnelle
PORT=8000
DEBUG=false
LOG_LEVEL=INFO
```

#### 📊 Plan et région :
- **Plan** : Starter ($7/mois)
- **Region** : Oregon (US West)

#### 🔍 Health Check :
- **Health Check Path** : `/health`

## 🎨 3. Déployer le Studio (Frontend)

### Via l'Interface Web :
1. Aller sur https://dashboard.render.com
2. Cliquer "New" → "Static Site"
3. Connecter votre repository GitHub
4. Configurer :

#### ⚙️ Paramètres de base :
- **Name** : `flo-ai-studio`
- **Build Command** :
  ```bash
  cd studio && npm install && npm run build
  ```
- **Publish Directory** : `./studio/dist`

#### 🌍 Variables d'environnement :
```bash
# URL de l'API backend (IMPORTANT)
API_URL=https://flo-ai-api.onrender.com

# Configuration optionnelle
VITE_API_URL=https://flo-ai-api.onrender.com
NODE_ENV=production
```

#### 📊 Plan :
- **Plan** : Free ($0/mois)

## 🔧 4. Configuration Post-Déploiement

### Mettre à jour les URLs dans le Studio

Après déploiement, mettre à jour `studio/src/lib/config.ts` :

```typescript
export const config = {
  API_BASE_URL: 'https://flo-ai-api.onrender.com',
  // ... autres configs
};
```

### Variables d'environnement détaillées :

#### Pour l'API (flo-ai-api) :
```bash
# === OBLIGATOIRE ===
OPENAI_API_KEY=sk-proj-your-actual-openai-key-here
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-anthropic-key-here
GOOGLE_API_KEY=AIzaSy-your-actual-google-key-here

# === FOURNI PAR RENDER ===
DATABASE_URL=postgresql://flo_ai_db_xxx:yyy@dpg-zzz.render.com/flo_ai_db

# === CONFIGURATION PYTHON ===
PYTHON_VERSION=3.11
PORT=8000

# === CONFIGURATION APPLICATION ===
DEBUG=false
LOG_LEVEL=INFO
CORS_ORIGINS=https://flo-ai-studio.onrender.com,http://localhost:5173

# === OPENTELEMETRY (optionnel) ===
OTEL_SERVICE_NAME=flo-ai-api
OTEL_TRACES_EXPORTER=otlp
OTEL_EXPORTER_OTLP_ENDPOINT=https://your-otel-endpoint.com
```

#### Pour le Studio (flo-ai-studio) :
```bash
# === URL DE L'API ===
API_URL=https://flo-ai-api.onrender.com
VITE_API_URL=https://flo-ai-api.onrender.com

# === CONFIGURATION BUILD ===
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

## 🧪 5. Tester le Déploiement

### Script de test Python :
```bash
# Créer un fichier test-deployment.py avec ce contenu :
import requests
import os

API_URL = "https://flo-ai-api.onrender.com"

def test_health():
    response = requests.get(f"{API_URL}/health")
    print(f"Health Check: {response.status_code}")
    return response.status_code == 200

def test_agent_chat():
    payload = {
        "prompt": "Bonjour, présente-toi en une phrase",
        "model": "gpt-4o-mini",
        "provider": "openai"
    }
    response = requests.post(f"{API_URL}/agent/chat", json=payload)
    print(f"Agent Chat: {response.status_code}")
    return response.status_code == 200

if __name__ == "__main__":
    print("🧪 Test du déploiement Flo AI")
    test_health()
    test_agent_chat()
```

### Commandes de test :
```bash
# Tester l'API
curl https://flo-ai-api.onrender.com/health

# Tester un agent
curl -X POST https://flo-ai-api.onrender.com/agent/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Hello, what is AI?",
    "model": "gpt-4o-mini",
    "provider": "openai"
  }'
```

## 📊 6. URLs Finales

Après déploiement réussi :

- **Studio Visuel** : `https://flo-ai-studio.onrender.com`
- **API Backend** : `https://flo-ai-api.onrender.com`
- **Base de données** : `postgresql://flo_ai_db_xxx:yyy@dpg-zzz.render.com/flo_ai_db`

## 🔧 7. Commandes de Maintenance

### Redéployer après modifications :
```bash
# Via Render CLI
render deploy flo-ai-api
render deploy flo-ai-studio

# Ou via l'interface web : Manual Deploy
```

### Voir les logs :
```bash
# Via Render CLI
render logs flo-ai-api
render logs flo-ai-studio

# Ou via l'interface web : Logs tab
```

### Variables d'environnement :
```bash
# Voir les variables
render env list flo-ai-api

# Ajouter une variable
render env set OPENAI_API_KEY=your-key flo-ai-api
```

## 🚨 8. Dépannage

### Problèmes courants :

#### ❌ "OpenAI API key not configured"
- Vérifier que `OPENAI_API_KEY` est défini dans les variables d'environnement
- S'assurer que la clé API est valide

#### ❌ "Application failed to start"
- Vérifier les logs : onglet "Logs" sur Render
- Vérifier les dépendances dans `requirements.txt`

#### ❌ "Build failed"
- Vérifier que tous les fichiers sont présents dans le repository
- Vérifier la syntaxe des commandes de build

#### ❌ Studio ne se connecte pas à l'API
- Vérifier que `API_URL` pointe vers la bonne URL de l'API
- Vérifier CORS dans l'API (`flo_ai/api.py`)

#### ❌ Erreur de base de données
- Vérifier que `DATABASE_URL` est correctement défini
- S'assurer que la base de données PostgreSQL est créée et accessible

### Commandes de debug :
```bash
# Vérifier la connectivité
curl -I https://flo-ai-api.onrender.com/health

# Tester les variables d'environnement
render env list flo-ai-api

# Voir les derniers logs
render logs flo-ai-api --tail 50
```

## 💰 9. Coûts sur Render

### Free Tier :
- **PostgreSQL** : 750 heures/mois (~$0)
- **Static Site** : Gratuit (illimité)

### Paid Tier :
- **Web Service (API)** : $7/mois (Starter plan)
  - 750 heures/mois
  - 512 MB RAM
  - 0.1 CPU

### Coûts totaux estimés : **$7/mois**

## 🎉 10. Checklist Finale

- [ ] Repository GitHub créé et poussé
- [ ] Base de données PostgreSQL créée
- [ ] API Python déployée avec variables d'environnement
- [ ] Studio React déployé
- [ ] URLs mises à jour dans la configuration
- [ ] Tests de déploiement réussis
- [ ] Health checks opérationnels
- [ ] Agent chat fonctionnel
- [ ] CORS configuré correctement

---

## 🚀 Déploiement Rapide

Pour un déploiement rapide, exécutez ces commandes dans l'ordre :

```bash
# 1. Créer la DB
render postgres create flo-ai-db --plan free --region oregon --version 16

# 2. Créer l'API
render web create flo-ai-api \
  --repo https://github.com/ILYESS24/flocursor \
  --runtime python3 \
  --build-command "pip install -r flo_ai/requirements.txt" \
  --start-command "cd flo_ai && python api.py" \
  --env-vars "PYTHON_VERSION=3.11,OPENAI_API_KEY=your_key_here" \
  --plan starter

# 3. Créer le Studio
render static create flo-ai-studio \
  --repo https://github.com/ILYESS24/flocursor \
  --build-command "cd studio && npm install && npm run build" \
  --publish-dir "./studio/dist"
```

**🎊 Votre Flo AI est maintenant déployé en production sur Render !**
