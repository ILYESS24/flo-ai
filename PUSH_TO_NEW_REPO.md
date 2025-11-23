# 🚀 Pousser Flo AI vers un Nouveau Repository GitHub

Ce guide vous explique comment pousser tout le code Flo AI vers un nouveau repository GitHub.

## 📋 Prérequis

- Compte GitHub
- Git installé sur votre machine
- Accès à votre terminal/command prompt

## 🎯 Méthode 1 : Script Automatique (Recommandé)

### Pour Windows (PowerShell)
```powershell
# Exécuter le script PowerShell
.\push-to-new-repo.ps1
```

### Pour Linux/Mac (Bash)
```bash
# Rendre le script exécutable
chmod +x push-to-new-repo.sh
# Exécuter le script
./push-to-new-repo.sh
```

Le script vous demandera :
1. Le nom du nouveau repository
2. Votre nom d'utilisateur GitHub

## 🎯 Méthode 2 : Étapes Manuelles

Si le script ne fonctionne pas, voici les étapes manuelles :

### 1. Créer un nouveau repository sur GitHub

1. Allez sur https://github.com/new
2. **Repository name** : `flo-ai` (ou le nom de votre choix)
3. **Description** : `A Python framework that makes building production-ready AI agents as easy as writing YAML`
4. **Visibility** : Public ou Private
5. **⚠️ NE PAS** cocher "Add a README file"
6. Cliquez sur "Create repository"

### 2. Préparer le nouveau repository localement

```bash
# Créer un dossier temporaire
cd ..
mkdir flo-ai-new
cd flo-ai-new

# Initialiser Git
git init
git config user.name "VotreNom"
git config user.email "votre.email@exemple.com"
```

### 3. Copier tous les fichiers

```bash
# Copier depuis le projet original
cp -r ../flo-ai-develop/flo-ai/* ./
```

### 4. Créer le .gitignore (si nécessaire)

```bash
# Créer un .gitignore complet
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Render deployment
.render/
EOF
```

### 5. Commiter et pousser

```bash
# Ajouter tous les fichiers
git add .

# Créer le commit initial
git commit -m "🎉 Initial commit - Flo AI Complete Framework

🚀 Flo AI is a Python framework that makes building production-ready AI agents as easy as writing YAML.

✨ Key Features:
- 🔌 Truly Composable: Build complex AI systems by combining components
- 🏗️ Production-Ready: Built-in best practices and optimizations
- 📝 YAML-First: Define entire agent architecture in simple YAML
- 🧠 LLM-Powered Routing: Intelligent routing decisions by LLMs
- 🤝 Team-Oriented: Create and manage teams of AI agents
- 📊 OpenTelemetry Integration: Built-in observability

🎨 Flo AI Studio - Visual Workflow Designer:
- Drag-and-drop interface for creating agent workflows
- Export workflows as production-ready YAML configurations

📦 Includes:
- Python framework with multi-LLM support
- React/TypeScript visual studio
- Complete deployment configuration for Render
- REST API for agent interactions
- Multi-agent workflow orchestration
- Docker and production deployment scripts"

# Renommer la branche en main
git branch -M main

# Ajouter le remote (remplacez par votre URL)
git remote add origin https://github.com/VOTRE_USERNAME/flo-ai.git

# Pousser vers GitHub
git push -u origin main
```

## 🔧 Dépannage

### Erreur "Repository not found"
- Vérifiez que le repository existe sur GitHub
- Vérifiez l'URL du repository
- Vérifiez que vous avez les droits d'accès

### Erreur "Permission denied"
- Configurez votre token d'accès GitHub
- Utilisez SSH au lieu de HTTPS si configuré

### Erreur lors de la copie des fichiers
- Assurez-vous que le dossier source existe
- Vérifiez les permissions des fichiers

## 📊 Ce qui sera poussé

Le nouveau repository contiendra :

### Framework Python (`flo_ai/`)
- ✅ Framework complet d'agents IA
- ✅ Support multi-LLM (OpenAI, Anthropic, Google)
- ✅ API FastAPI pour déploiement
- ✅ Orchestration multi-agents (Arium)
- ✅ Système d'outils (@flo_tool)
- ✅ Intégration OpenTelemetry

### Studio Visuel (`studio/`)
- ✅ Interface React/TypeScript
- ✅ Éditeur visuel drag-and-drop
- ✅ Client API intégré
- ✅ Export YAML de workflows

### Configuration de déploiement
- ✅ Scripts pour Render
- ✅ Configuration Docker
- ✅ Tests de déploiement
- ✅ Documentation complète

## 🎉 Résultat Final

Après le push réussi, vous aurez :

1. **Repository GitHub** avec tout le code Flo AI
2. **Documentation complète** pour déploiement
3. **Scripts de déploiement** pour Render
4. **Code prêt pour production**

## 🚀 Prochaines Étapes

1. **Configurer le repository** :
   - Ajouter une description
   - Ajouter des topics (ai, agents, llm, python, react)
   - Configurer les GitHub Pages si souhaité

2. **Déployer** :
   - Suivre le guide `DEPLOYMENT.md`
   - Créer les services sur Render
   - Tester le déploiement

3. **Personnaliser** :
   - Modifier la configuration
   - Ajouter vos propres agents
   - Étendre les fonctionnalités

---

**🎊 Bonne chance avec votre nouveau repository Flo AI !** 🚀🤖
