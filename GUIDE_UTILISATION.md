# 📋 SI-DCF - Module Marché
## Guide d'Utilisation du Prototype

---

## 🎯 Vue d'ensemble

Le prototype SI-DCF Module Marché est une application web complète et interactive pour la gestion des marchés publics avec un accent sur le contrôle financier.

### Caractéristiques principales :
- ✅ **8 écrans complets** avec interactions fluides
- ✅ **Filtrage avancé** sur tous les tableaux
- ✅ **5 marchés** d'exemple avec données réalistes
- ✅ **Paramétrages complets** de tous les référentiels
- ✅ **Règles de gestion** paramétrables
- ✅ **Logique métier** intégrée (états, avenants, réserves CF)

---

## 🚀 Accès au Prototype

### Option 1 : Fichier HTML (Recommandé - Exécutable directement)
```
📄 sidcf-marche-app.html
- Double-cliquez pour ouvrir dans le navigateur
- Aucune dépendance requise
- Fonctionne hors-ligne
```

### Option 2 : Fichier React (.jsx)
```
📄 sidcf-marche-complete.jsx
- À utiliser dans : CodeSandbox, Stackblitz, ou intégré dans un projet React
- Requiert React 18+
```

---

## 📱 Navigation

### Menu Principal (Barre latérale)

#### 📊 **ACCUEIL**
- Vue d'ensemble du système
- Accès rapides aux principales fonctionnalités
- Indicateurs de synthèse
- Information système

#### 💼 **GESTION DES MARCHÉS**
- Liste complète des marchés
- Filtres par : Code, État, Type, Unité, Bailleur
- Recherche texte (Code ou Titre)
- Export CSV
- Accès au détail de chaque marché

#### 📊 **TABLEAU DE BORD**
- KPI (4 indicateurs)
- Flux de trésorerie (APM, Engagements, Ordonnancement, Paiements)
- Distribution par état des marchés
- Analyse par Unité Opérationnelle
- Top Bailleurs par montant

#### 📄 **SUIVI EXÉCUTION & AVENANTS**
- Marchés en exécution
- Suivi de l'avancement
- Visualisation des avenants
- Montants payés vs prévus

#### ⚙️ **PARAMÉTRAGES**
- Configuration des Unités Opérationnelles
- Types de Marchés
- Modes de Passation
- Bailleurs
- États du Marché
- Types de Pièces

#### ⚠️ **RÈGLES DE GESTION**
- Seuil cumul avenants (%)
- Taux max avance (%)
- Taux max retenue garantie (%)
- Délai max Ordonnance Spéciale (jours)
- Ajustement des sévérités (BLOCANT / AVERTISSEMENT)

---

## 🔍 Utilisation des Filtres

### Sur la page "Gestion des Marchés"

1. **Recherche** : Tapez un code (ex: M-2024) ou titre (ex: Construction)
2. **État** : Sélectionnez parmi : Planifié, En Procédure, Attribué, Visé, Exécution, Clôturé, Résilié
3. **Type** : Travaux, Fournitures, Services, Prestations Intellectuelles
4. **Unité** : Sélectionnez l'unité opérationnelle
5. **Bailleur** : Filtre par source de financement

Les filtres fonctionnent en **combinaison** (AND) et se mettent à jour **en temps réel**.

---

## 📊 Détail d'un Marché

Cliquez sur **"Détail"** dans la liste pour accéder à la fiche complète :

### Sections affichées :
1. **En-tête** : Titre, Code, État
2. **Informations Générales** : Type, Unité, Mode, Bailleur, Titulaire, Localité
3. **Montants (FCFA)** : APM, Engagement, Ordonnancement, Paiement
4. **Calendrier** : Dates de création, attribution, exécution, fin
5. **Avancement** : Barre de progression, statut des avenants
6. **Avenants** : Tableau des avenants financiers/technique/délais
7. **Pièces Justificatives** : Statut de chaque pièce (présente/manquante)
8. **Statut CF** : Visa ou réserve du Contrôleur Financier

---

## 📈 Données d'Exemple (Jeu de Test)

### 5 Marchés pré-configurés :

| Code | Titre | Type | État | Montant APM | Avancement |
|------|-------|------|------|-----------|-----------|
| M-2024-001 | Construction Centre Santé | TRAVAUX | EXECUTION | 850 M | 65% |
| M-2024-002 | Équipements médicaux | FOURN | VISE | 120 M | 5% |
| M-2024-003 | Audit financier 2024 | SERV | EXECUTION | 25 M | 90% |
| M-2024-004 | Étude Route Nationale 3 | PI | ATTRIBUE | 75 M | 0% |
| M-2024-005 | Maintenance informatique | SERV | PLANIFIE | 30 M | 0% |

**Montant Total APM : 1.1 Milliards FCFA**

---

## ⚙️ Paramétrages Disponibles

### Unités Opérationnelles
- MIN-SANTE : Ministère de la Santé
- DCF : Direction de la Comptabilité Financière
- DGBF : Direction Générale du Budget et Finances
- DG-PLAN : Direction Générale de la Planification

### Types de Marchés
- TRAVAUX
- FOURN (Fournitures)
- SERV (Services)
- PI (Prestations Intellectuelles)

### Modes de Passation
- AOO : Appel d'Offres Ouvert
- AOR : Appel d'Offres Restreint
- PSC : Procédure Simplifiée Concurrentielle
- PSD : Procédure Simplifiée Directe
- GRE : Gré à gré

### Bailleurs de Fonds
- ETAT
- BM (Banque Mondiale)
- BAD (Banque Africaine de Développement)
- UE (Union Européenne)
- BID (Banque Interaméricaine)
- PNUD

### États du Marché (Cycle de vie)
1. **PLANIFIE** (Bleu) - Phase initiale
2. **EN_PROC** (Jaune) - Ouverture/Jugement
3. **ATTRIBUE** (Violet) - Après jugement
4. **VISE** (Indigo) - Après validation CF
5. **EXECUTION** (Vert) - En cours
6. **CLOS** (Gris) - Finalisé
7. **RESILIE** (Rouge) - Annulé

### Types de Pièces Justificatives
- DAO : Dossier d'Appel d'Offres
- PV_OUVERTURE : PV d'Ouverture des plis
- PV_JUGEMENT : PV de Jugement des offres
- RAPPORT_ANALYSE : Rapport d'Analyse des offres
- CONTRAT_SIGNE : Contrat signé
- AVENANT_SIGNE : Avenant signé
- PV_RECPROV : PV Réception Provisoire
- PV_RECDEF : PV Réception Définitive

---

## 📊 Règles de Gestion

### Seuil cumul avenants (%) - BLOCANT
- **Valeur par défaut** : 30%
- **Règle** : La somme des avenants ne peut pas dépasser 30% du montant APM initial
- **Exemple** : Sur 1 Md FCFA, max 300 M en avenants

### Taux max avance (%) - BLOCANT
- **Valeur par défaut** : 15%
- **Règle** : Une avance ne peut pas dépasser 15% du montant du marché
- **Exemple** : Sur 100 M, avance max = 15 M

### Taux max retenue garantie (%) - AVERTISSEMENT
- **Valeur par défaut** : 10%
- **Règle** : La retenue de garantie ne doit pas dépasser 10% du montant payé
- **Exemple** : Sur 100 M payés, retenue max = 10 M

### Délai max OS après visa (jours) - BLOCANT
- **Valeur par défaut** : 30 jours
- **Règle** : L'Ordonnance Spéciale doit être émise dans les 30 jours suivant le visa CF
- **Contrôle** : Alertes si délai dépassé

---

## 💡 Fonctionnalités Clés

### 1️⃣ **Filtrage Multi-Critères**
- Combinez plusieurs filtres pour affiner les résultats
- Les compteurs se mettent à jour en temps réel
- Recherche texte incluse

### 2️⃣ **Dashboard KPI**
- Indicateurs de synthèse automatiquement calculés
- Flux de trésorerie en cascade (APM → Engagement → Ordonnancement → Paiement)
- Pourcentages de réalisation

### 3️⃣ **Détail Marché Complet**
- Accès à toutes les informations d'un marché
- Historique des avenants
- Statut des pièces justificatives
- Validation CF (visa/réserve)

### 4️⃣ **Gestion des Avenants**
- Visualisation des avenants par marché
- Types d'avenants : Financiers, Délai, Techniques
- Montants et motifs saisis

### 5️⃣ **Traçabilité Financière**
- Suivi APM → Engagement → Ordonnancement → Paiement
- Taux d'avancement en % avec barre visuelle
- Calculs automatiques

### 6️⃣ **Paramétrages Flexibles**
- Activez/Désactivez les référentiels
- Modifiez les règles de gestion
- Exportez les données

---

## 🎨 Charte Graphique

### Couleurs SI-DCF
- **Logo** : Orange (#FF9500) + Teal (#0D7377)
- **Accent principal** : Teal foncé (#0D7377)
- **États** : Codes couleurs cohérents
  - Planifié : Bleu
  - En Procédure : Jaune
  - Attribué : Violet
  - Vise : Indigo
  - Exécution : Vert
  - Clôturé : Gris
  - Résilié : Rouge

### Icônes
- Utilisation d'emojis pour la compatibilité
- Interface responsive et moderne
- Design épuré et professionnel

---

## 🔢 Indicateurs KPI

### Tableau de Bord Principal

| KPI | Description | Exemple |
|-----|-------------|---------|
| Total Marchés | Nombre de marchés | 5 |
| En Exécution | Marchés en cours | 2 |
| En Procédure | Marchés en appel d'offres | 0 |
| Attribués | Marchés attribués | 1 |
| Montant APM | Somme des APM | 1.1 Md |
| Taux Exécution | % Paiement/APM | 53% |

---

## 💾 Export & Intégration

### Export CSV
- Exporte la liste filtrée des marchés
- Inclut tous les colonnes visibles
- Compatible Excel/Google Sheets

### Intégration Système
- Fichier HTML : Standalone, aucune dépendance
- Fichier React : Intégrable dans projet existant
- Architecture modulaire et réutilisable

---

## 🛠️ Cas d'Usage

### Scénario 1 : Validation CF d'un marché
1. Allez dans "Gestion des Marchés"
2. Recherchez le marché
3. Cliquez "Détail"
4. Vérifiez les pièces justificatives
5. Consultez les réserves CF

### Scénario 2 : Suivi exécution
1. Allez dans "Suivi Exécution & Avenants"
2. Consultez les marchés en cours
3. Identifiez ceux avec avenants
4. Vérifiez les montants payés

### Scénario 3 : Analyse par bailleur
1. Allez dans "Tableau de Bord"
2. Consultez "Top Bailleurs"
3. Filtrez sur "Gestion des Marchés" par bailleur
4. Exportez les données

### Scénario 4 : Contrôle des règles
1. Allez dans "Règles de Gestion"
2. Ajustez les seuils si nécessaire
3. Enregistrez les changements
4. Les contrôles s'appliquent automatiquement

---

## ❓ FAQ

**Q: Puis-je modifier les données du prototype ?**
A: Le fichier HTML de base ne permet pas de persister les données (pas de base de données). Pour une modification permanente, utilisez la version React avec intégration backend.

**Q: Comment ajouter un nouveau marché ?**
A: Cliquez sur "Nouveau marché" dans la gestion des marchés (bouton développé côté back-end). Pour le prototype, modifiez l'array `marches` dans le code.

**Q: Les filtres fonctionnent-ils ensemble ?**
A: Oui ! Les filtres s'appliquent en combinaison (AND). Chaque filtre réduit les résultats.

**Q: Peut-on imprimer les détails d'un marché ?**
A: Utilisez la fonction "Imprimer" du navigateur (Ctrl+P) pour obtenir un PDF.

**Q: Où sont stockées les données ?**
A: Dans la mémoire du navigateur. Actualisez la page = réinitialise aux données d'origine.

---

## 📞 Support

Pour des améliorations ou signaler des bugs :
- Documentation : Voir fichiers accompagnant (référentiels, règles de gestion)
- Code source : Fichiers .jsx et .html complètement commentés

---

## ✅ Checklist Validation

Avant de passer à la production, vérifier :

- [ ] Tous les référentiels sont configurés
- [ ] Les règles de gestion reflètent la réglementation
- [ ] Les filtres remontent les bons résultats
- [ ] Les calculs KPI sont corrects
- [ ] Les états du cycle de vie sont complets
- [ ] Les pièces justificatives obligatoires sont defined
- [ ] L'intégration LDAP/SSO est planifiée
- [ ] La persistance de données est mise en place
- [ ] Les contrôles CF sont automatisés
- [ ] Les exports sont formatés correctement

---

**Version du Prototype** : 1.0  
**Date** : Novembre 2025  
**Technologie** : React 18 + Tailwind CSS  
**Navigateurs compatibles** : Chrome, Firefox, Safari, Edge (modernes)  
**Mode responsive** : Oui (desktop, tablette)

