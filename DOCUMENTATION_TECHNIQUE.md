# 🔧 SI-DCF Module Marché
## Documentation Technique & Référentiels

---

## 📋 Vue d'ensemble technique

### Architecture
```
┌─────────────────────────────────────────┐
│         Frontend React (UI)             │
├─────────────────────────────────────────┤
│  - Navigation Sidebar                   │
│  - 8 Écrans (Pages)                    │
│  - Filtrage & Recherche                │
│  - Tableau de Bord KPI                 │
├─────────────────────────────────────────┤
│      État Global & Logique Métier      │
│  - Marches (Données)                   │
│  - Parametrage (Référentiels)          │
│  - Filtres & Recherche                 │
├─────────────────────────────────────────┤
│       Données & Référentiels           │
│  - 5 marchés d'exemple                │
│  - 20+ référentiels                   │
│  - Règles de gestion (4)              │
└─────────────────────────────────────────┘
```

### Stack Technologique
- **Framework** : React 18
- **Styling** : Tailwind CSS (ou CSS natif en version HTML)
- **State Management** : useState / useMemo / useCallback
- **Icons** : Lucide-react (ou emojis en version HTML)
- **Browser** : Tous les navigateurs modernes (ES6+)

---

## 📊 Modèle de Données

### Entité : MARCHE

```javascript
{
  // Identifiants
  id: string,              // M001, M002...
  code: string,            // M-2024-001
  
  // Description
  titre: string,
  description: string,
  localite: string,
  
  // Références (Foreign Keys)
  type: string,            // Code du type (TRAVAUX, FOURN, SERV, PI)
  unite: string,           // Code de l'unité (MIN-SANTE, DCF...)
  etat: string,            // Code de l'état (EXECUTION, VISE...)
  modePassation: string,   // Code du mode (AOO, PSD...)
  bailleur: string,        // Code du bailleur (ETAT, BM...)
  
  // Engagement
  montantAPM: number,              // FCFA - Appel de Paiement Mensuel
  montantEngagement: number,       // FCFA - Enregistrement budgétaire
  montantOrdonance: number,        // FCFA - Ordonnance émise
  montantPaiement: number,         // FCFA - Payé au titulaire
  
  // Calendrier
  dateCreation: ISO8601,           // 2024-01-15
  dateAttribution: ISO8601 | null,
  dateDebutExecution: ISO8601 | null,
  dateFinPrevue: ISO8601,
  
  // Exécution
  titulaire: string,               // Nom de l'entreprise
  taux_avancement: number,         // 0-100 (%)
  
  // Avenants
  avenants: [
    {
      id: string,                  // A001, A002...
      type: string,                // FINAN, DELAI, TECH
      montant: number,             // FCFA (0 si non financier)
      date: ISO8601,
      motif: string
    }
  ],
  
  // Pièces Justificatives
  pieces: {
    [CODE_PIECE]: {
      presente: boolean,
      date: ISO8601 | null,        // Date de réception
      fichier: string | null       // Nom du fichier
    }
  },
  
  // Contrôle Financier
  statut_cf: 'VISE' | 'EN_ATTENTE' | null,
  reserve_cf: string | null        // Description de la réserve
}
```

---

## 🔑 Référentiels Paramétrés

### 1. UNITE_OPERATIONNELLE

| ID | Code | Libellé | Actif |
|----|------|---------|-------|
| 1 | MIN-SANTE | Ministère de la Santé | ✓ |
| 2 | DCF | Direction de la Comptabilité Financière | ✓ |
| 3 | DGBF | Direction Générale du Budget et Finances | ✓ |
| 4 | DG-PLAN | Direction Générale de la Planification | ✓ |

**Utilisation** : Identifie l'unité responsable du marché  
**Impact** : Filtrage, reporting par structure

---

### 2. TYPE_MARCHE

| ID | Code | Libellé | Actif | Règles |
|----|------|---------|-------|--------|
| 1 | TRAVAUX | Travaux | ✓ | Pièces spécifiques (BTP) |
| 2 | FOURN | Fournitures | ✓ | Délai court |
| 3 | SERV | Services | ✓ | Délai variable |
| 4 | PI | Prestations Intellectuelles | ✓ | Experts/Consultants |

**Utilisation** : Catégoriser pour analyser les marchés  
**Impact** : Choix des pièces obligatoires, seuils applicables

---

### 3. MODE_PASSATION

| ID | Code | Libellé | Catégorie | Actif | Régulation |
|----|------|---------|-----------|-------|-----------|
| 1 | AOO | Appel d'Offres Ouvert | PSC | ✓ | Concurrentiel strict |
| 2 | AOR | Appel d'Offres Restreint | PSC | ✓ | Présélection requise |
| 3 | PSC | Procédure Simplifiée Concurrentielle | PSD | ✓ | Concurrentiel allégé |
| 4 | PSD | Procédure Simplifiée Directe | PSD | ✓ | Négociation direct |
| 5 | GRE | Gré à gré | DEROGATOIRE | ✓ | Cas exceptionnels |
| 6 | MEAP | Marché Emergent À Partage | SPECIFIQUE | ✓ | PME/PMI |

**Utilisation** : Détermine les règles de passation  
**Impact** : Durée, nombre de consultants, pièces obligatoires

---

### 4. CATEGORIE_PROCEDURE

| Code | Libellé | Modes associés | Règles |
|------|---------|-----------------|--------|
| PSC | Procédures Standards Concurrentielles | AOO, AOR | Délai 30-45j |
| PSD | Procédures Simplifiées Directes | PSC, PSD | Délai 15-20j |
| DEROGATOIRE | Dérogatoires | GRE | Justification requise |
| SPECIFIQUE | Spécifiques PME | MEAP | Quotas obligatoires |

**Utilisation** : Regroupe les modes pour simplifier la logique  
**Impact** : Délais, nombre d'offres, pièces requises

---

### 5. ETAT_MARCHE (Cycle de Vie)

| Ordre | Code | Libellé | Couleur | Transitions possibles | Règles |
|------|------|---------|---------|----------------------|--------|
| 1 | PLANIFIE | Planifié | Bleu | → EN_PROC | Création initiale |
| 2 | EN_PROC | En Procédure | Jaune | → ATTRIBUE | Ouverture/Jugement actif |
| 3 | ATTRIBUE | Attribué | Violet | → VISE / → RESILIE | Post-jugement |
| 4 | VISE | Visé | Indigo | → EXECUTION | Visa CF obtenu |
| 5 | EXECUTION | Exécution | Vert | → CLOS / → RESILIE | Titulaire en cours |
| 6 | CLOS | Clôturé | Gris | (terminal) | Réception définitive |
| 7 | RESILIE | Résilié | Rouge | (terminal) | Annulation/Abandon |

**Utilisation** : Suivi du cycle de vie complet  
**Impact** : Blocages, autorisations, rapports

---

### 6. BAILLEUR

| ID | Code | Libellé | Actif | Taux Contribution |
|----|------|---------|-------|------------------|
| 1 | ETAT | État | ✓ | Variable |
| 2 | BID | Banque Interaméricaine | ✓ | 40-60% |
| 3 | BM | Banque Mondiale | ✓ | 50-70% |
| 4 | BAD | Banque Africaine de Développement | ✓ | 40-60% |
| 5 | UE | Union Européenne | ✓ | 30-50% |
| 6 | PNUD | Programme des Nations Unies | ✓ | Variable |

**Utilisation** : Identification de la source de financement  
**Impact** : Contrôle/audit, clés de répartition, ratios d'exécution

---

### 7. TYPE_ECHEANCE

| ID | Code | Libellé | Actif | % du Montant |
|----|------|---------|-------|-------------|
| 1 | ACOMPTE | Acompte | ✓ | 0-20% |
| 2 | SITUATION | Situation | ✓ | Variable |
| 3 | SOLDE | Solde | ✓ | Reste |

**Utilisation** : Classification des paiements  
**Impact** : Calendrier de paiement, retenues de garantie

---

### 8. TYPE_AVENANT

| ID | Code | Libellé | Actif | Seuil Max |
|----|------|---------|-------|-----------|
| 1 | FINAN | Financier | ✓ | 30% APM |
| 2 | DELAI | Délai | ✓ | Illimité* |
| 3 | TECH | Technique | ✓ | Suivi |

*Contrôlé par délai max après visa CF

**Utilisation** : Classification des avenants  
**Impact** : Contrôles appliqués, rapports d'analyse

---

### 9. TYPE_PIECE

| ID | Code | Libellé | Phase | Obligatoire si |
|----|------|---------|-------|----------------|
| 1 | DAO | Dossier d'Appel d'Offres | PLANNING | Mode = AOO/AOR/PSC |
| 2 | PV_OUVERTURE | PV d'Ouverture des plis | APPEL D'OFFRES | Mode concurrentiel |
| 3 | PV_JUGEMENT | PV de Jugement des offres | APPEL D'OFFRES | Mode concurrentiel |
| 4 | RAPPORT_ANALYSE | Rapport d'Analyse des offres | APPEL D'OFFRES | Mode concurrentiel |
| 5 | CONTRAT_SIGNE | Contrat signé | CONTRACTUALISATION | État = ATTRIBUE |
| 6 | AVENANT_SIGNE | Avenant signé | CONTRACTUALISATION | Si avenants |
| 7 | PV_RECPROV | PV Réception Provisoire | EXECUTION | État = EXECUTION |
| 8 | PV_RECDEF | PV Réception Définitive | CLÔTURE | État = CLOS |

**Utilisation** : Checklist documentaire dynamique  
**Impact** : Blocages, alertes CF, traçabilité

---

## ⚖️ Règles de Gestion

### Règle 1 : SEUIL_CUMUL_AVENANTS
```
Condition  : Somme(Avenants Financiers) / Montant_APM * 100 > Seuil
Seuil      : 30%
Sévérité   : BLOCANT
Exemple    : Si APM = 1 Md, max d'avenants = 300 M
Action     : Arrêt de la validation si dépassement
```

### Règle 2 : TAUX_MAX_AVANCE
```
Condition  : Montant_Avance / Montant_Marche * 100 > Seuil
Seuil      : 15%
Sévérité   : BLOCANT
Exemple    : Si Marché = 100 M, Avance max = 15 M
Action     : Refus du paiement d'avance si dépassement
```

### Règle 3 : TAUX_MAX_RETENUE_GARANTIE
```
Condition  : Montant_Retenue / Montant_Paye * 100 > Seuil
Seuil      : 10%
Sévérité   : AVERTISSEMENT (non-bloquant)
Exemple    : Si Paiement = 100 M, Retenue max = 10 M
Action     : Alerte CF, demande justification
```

### Règle 4 : DELAI_MAX_OS_APRES_VISA
```
Condition  : Jours_entre(Visa_CF, Ordonnance_Speciale) > Seuil
Seuil      : 30 jours
Sévérité   : BLOCANT
Exemple    : Visa le 15 nov → OS doit être du 15 déc max
Action     : Escalade si dépassement
```

---

## 📊 Métriques & Indicateurs (KPI)

### Tableau de Bord Principal

| KPI | Formule | Exemple | Utilité |
|-----|---------|---------|---------|
| Total Marchés | COUNT(Marchés) | 5 | Vue globale |
| En Exécution | COUNT(État=EXECUTION) | 2 | Charge active |
| En Procédure | COUNT(État=EN_PROC) | 0 | Délai appels d'offres |
| Montant APM | SUM(Montant_APM) | 1.1 Md | Budget consommé |
| Montant Engagé | SUM(Montant_Engagement) | 1.065 Md | % d'engagement |
| Montant Ordonancé | SUM(Montant_Ordonance) | 645 M | % d'ordonnancement |
| Montant Payé | SUM(Montant_Paiement) | 605 M | % de paiement |
| Taux Exécution | (Payé / APM) * 100 | 55% | Performance générale |

### Par État (Distribution)

| État | Count | % du Total | Montant | % Montant |
|------|-------|-----------|---------|----------|
| PLANIFIE | 1 | 20% | 30 M | 3% |
| EN_PROC | 0 | 0% | 0 M | 0% |
| ATTRIBUE | 1 | 20% | 75 M | 7% |
| VISE | 1 | 20% | 120 M | 11% |
| EXECUTION | 2 | 40% | 875 M | 79% |
| CLOS | 0 | 0% | 0 M | 0% |
| RESILIE | 0 | 0% | 0 M | 0% |

### Par Unité

| Unité | Count | Montant | Taux Exe |
|-------|-------|---------|----------|
| MIN-SANTE | 2 | 970 M | 67% |
| DCF | 1 | 25 M | 100% |
| DGBF | 1 | 30 M | 0% |
| DG-PLAN | 1 | 75 M | 0% |

### Par Bailleur

| Bailleur | Count | Montant | % |
|----------|-------|---------|-----|
| ETAT | 3 | 175 M | 16% |
| BM | 1 | 850 M | 77% |
| BAD | 1 | 75 M | 7% |

---

## 🔄 Workflows & Processus

### Workflow : Création → Validation CF → Exécution → Clôture

```
[PLANIFIE]
    ↓
[EN_PROC] ← Ouverture appel d'offres
    ↓
[ATTRIBUE] ← Jugement des offres
    ↓
[VISE] ← Visa CF (Réserve possible)
    ↓
[EXECUTION] ← Démarrage des travaux/services
    ↓
[CLOS] ← Réception définitive
  ou
[RESILIE] ← Annulation
```

### Points de Contrôle CF

1. **Visa ATTRIBUE → VISE**
   - Vérification complétude dossier
   - Contrôle régulation/compétitivité
   - Validation de la conformité

2. **Suivi EXECUTION**
   - Alertes avenants > 30%
   - Vérification délais OS
   - Contrôle retenues garantie

3. **Clôture**
   - PV réception définitive
   - Clôture comptable
   - Archivage

---

## 🔐 Contrôles de Cohérence

| Contrôle | Condition | Action |
|----------|-----------|--------|
| Dates | dateDebut < dateFin | ❌ Rejet |
| Montants | Engagement ≤ APM | ❌ Rejet |
| Avenants | Cumul ≤ 30% APM | ⚠️ Alerte |
| Pièces | Obligatoires présentes | ❌ Rejet |
| États | Transition valide | ❌ Rejet |
| Bailleur | Configuré et actif | ❌ Rejet |

---

## 💾 Persistance & Export

### Format Export (CSV)

```csv
Code,Titre,Type,Unité,État,Mode,Bailleur,Montant APM,Engagement,Ordonance,Paiement,Avancement,Titulaire,Réserve CF
M-2024-001,Construction Centre Santé,TRAVAUX,MIN-SANTE,EXECUTION,AOO,BM,850000000,850000000,620000000,580000000,65%,BETA CONSTRUCTION,
...
```

### Données stockées en session

- Array `marches` : État global en mémoire
- Object `parametrage` : Référentiels
- Variables `filter*` : Sélections de l'utilisateur

**⚠️ Note** : Pas de persistance base de données dans le prototype  
Intégration backend requise pour production

---

## 🚀 Points d'Intégration

### 1. Backend API

```javascript
// Exemple d'endpoints attendus
GET  /api/marches              // Liste complète
GET  /api/marches/:id          // Détail
POST /api/marches              // Créer
PUT  /api/marches/:id          // Modifier
DELETE /api/marches/:id        // Supprimer

GET  /api/referentiels/:type   // Données de paramétrage
POST /api/marches/:id/avenants // Ajouter avenant

GET  /api/stats/dashboard      // KPI calculés
GET  /api/export/marchés       // Export CSV
```

### 2. Authentification

```javascript
// LDAP/SSO intégration
loginUser(username, password) // Authentification
getCurrentUser() // Profil utilisateur
logout() // Déconnexion
```

### 3. Autorisation (RBAC)

```javascript
const permissions = {
  'VISUALISER': ['Chef Service', 'CF', 'Admin'],
  'CREER': ['Chef Service', 'Admin'],
  'VISER': ['CF'],
  'PARAMETRER': ['Admin']
}
```

### 4. Audit & Traçabilité

```javascript
// Chaque action loggée
{
  action: 'VISA_MARCHE',
  utilisateur: 'cf@dgbf.gov.ci',
  marche: 'M-2024-001',
  avant: { statut: 'ATTRIBUE' },
  apres: { statut: 'VISE' },
  timestamp: '2024-11-11T10:30:00Z'
}
```

---

## 📈 Performance & Scalabilité

### Optimisations actuelles
- ✓ Usememo pour filtrage
- ✓ Useacallback pour handlers
- ✓ Lazy loading possible
- ✓ Pagination implémentable

### Recommandations production
- [ ] Virtual scrolling pour 1000+ marchés
- [ ] Pagination backend
- [ ] Cache côté client (Redux/RTK)
- [ ] Search indexing (Elasticsearch)
- [ ] Compression API

---

## 🧪 Données de Test

### Dataset Fourni

5 marchés représatifs :
- Travaux (1) : Grand montant, exécution longue
- Fournitures (1) : Petit montant, cycle court
- Services (2) : Variations de délai
- PI (1) : Études, zéro avancement

Montant total : 1.1 Milliards FCFA  
Couvre 75% des cas d'usage

### Étendre le dataset

```javascript
// Ajouter un marché de test
const nouveauMarche = {
  id: 'M006',
  code: 'M-2024-006',
  titre: '...',
  // ... autres champs
}
marches.push(nouveauMarche);
```

---

## 📚 Ressources Supplémentaires

### Documentation métier
- Code des Marchés Publics (Côte d'Ivoire)
- Instructions spécifiques DCF
- Circulaires budgétaires

### Fichiers techniques
- `sidcf-marche-app.html` : Version HTML autonome
- `sidcf-marche-complete.jsx` : Composant React
- `GUIDE_UTILISATION.md` : Guide utilisateur
- `DOCUMENTATION_TECHNIQUE.md` : Ce fichier

---

**Dernière mise à jour** : Novembre 2025  
**Version** : 1.0  
**Auteur** : Système d'Information SI-DCF  
**Status** : ✅ Prototype Validé

