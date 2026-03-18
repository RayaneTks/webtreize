# ⚙️ Configuration Cursor - WebTreize

## 📋 Résumé complet

### Skills .agents (2)
| Skill | Chemin |
|-------|--------|
| `vercel-react-best-practices` | `C:\Users\User\.agents\skills\vercel-react-best-practices` |
| `webapp-testing` | `C:\Users\User\.agents\skills\webapp-testing` |

### Skills Cursor (5)
| Skill | Usage |
|-------|-------|
| create-rule | Règles, conventions, RULE.md |
| create-skill | Créer des skills |
| create-subagent | Sous-agents |
| migrate-to-skills | Migration |
| update-cursor-settings | Settings.json, préférences |

### Skills Codex (3)
| Skill | Usage |
|-------|-------|
| openai-docs | API OpenAI, modèles GPT |
| skill-creator | Créer des skills |
| skill-installer | Installer des skills |

### Plugins Claude Code (6) — Terminal : `claude`
| Plugin | Commande |
|--------|----------|
| ralph-wiggum | `/ralph-loop` |
| frontend-design | Design UI/UX |
| superpowers | TDD, debugging, brainstorming |
| playwright | Tests E2E |
| vercel | Déploiement |
| mcp-builder | Serveurs MCP |

### MCP Cursor (3)
| MCP | Usage |
|-----|-------|
| plugin-playwright-playwright | Tests E2E |
| plugin-vercel-vercel | Déploiement |
| cursor-ide-browser | Tests navigateur, screenshots |

---

## 🔧 Configuration Cursor

### 1. Règles projet (déjà créées)
Les fichiers `.cursor/rules/` sont déjà en place :
- `claude-skills.mdc` : Skills et commandes
- `commands.mdc` : Commandes rapides

### 2. Custom Instructions (optionnel)
Dans Cursor : `Ctrl+,` → `Features` → `AI` → Custom Instructions :

```
# Projet WebTreize - Agence digitale
- Next.js 16, React 19, Tailwind, Framer Motion
- Skills : Vercel React Best Practices, WebApp Testing
- Répondre en français
```

### 3. Utilisation des skills

**Dans Cursor Chat :**

```
# Analyser un composant React
"Vérifie ce composant avec les best practices Vercel"

# Créer des tests
"Crée un test Playwright pour cette fonctionnalité"

# TDD
"Implémente cette fonction avec TDD"
```

---

## 📁 Fichiers à connaître

```
C:\Users\User\Desktop\WebTreize\
├── .cursor/rules/           # Configuration Cursor
├── docs/                    # Documentation
│   ├── CURSOR_SETUP.md      # Ce fichier
│   └── SEO_STRATEGIE_AUDIT_CONCURRENTS.md
├── app/                     # Next.js App Router
├── components/              # Composants React
└── lib/                     # Utilitaires
```

---

## 💡 Commandes rapides

| Besoin | Commande |
|--------|----------|
| Analyser React | "Vérifie avec Vercel best practices" |
| Tests E2E | "Crée un test Playwright" |
| TDD | "Implémente avec TDD" |
| Debug | "Debug étape par étape" |
| SEO | "Vérifie le SEO de cette page" |
