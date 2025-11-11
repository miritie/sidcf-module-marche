import React, { useState, useMemo, useCallback } from 'react';
import { 
  ChevronDown, FileText, CheckCircle, AlertCircle, TrendingUp, Filter, Download, Plus, 
  Eye, Edit, Trash2, Search, Settings, Home, BarChart3, DollarSign, Clock, Users, 
  FileCheck, X, Save, ArrowLeft, ChevronRight, Menu, LogOut, Info, AlertTriangle,
  Copy, Printer, MoreVertical, Calendar, MapPin, Building, Briefcase
} from 'lucide-react';

const SIDCFModule = () => {
  // ============ ÉTATS PRINCIPAUX ============
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMarche, setSelectedMarche] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  
  // Filtres & Recherche
  const [searchMarche, setSearchMarche] = useState('');
  const [filterEtat, setFilterEtat] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterUnite, setFilterUnite] = useState('');
  const [filterBailleur, setFilterBailleur] = useState('');

  // Paramétrages
  const [parametrage, setParametrage] = useState({
    unites: [
      { id: 1, code: 'MIN-SANTE', libelle: 'Ministère de la Santé', actif: true },
      { id: 2, code: 'DCF', libelle: 'Direction de la Comptabilité Financière', actif: true },
      { id: 3, code: 'DGBF', libelle: 'Direction Générale du Budget', actif: true },
      { id: 4, code: 'DG-PLAN', libelle: 'Direction Planification', actif: true }
    ],
    typesMarchés: [
      { id: 1, code: 'TRAVAUX', libelle: 'Travaux', actif: true },
      { id: 2, code: 'FOURN', libelle: 'Fournitures', actif: true },
      { id: 3, code: 'SERV', libelle: 'Services', actif: true },
      { id: 4, code: 'PI', libelle: 'Prestations Intellectuelles', actif: true }
    ],
    modePassation: [
      { id: 1, code: 'AOO', libelle: 'Appel d\'Offres Ouvert', categorie: 'PSC', actif: true },
      { id: 2, code: 'AOR', libelle: 'Appel d\'Offres Restreint', categorie: 'PSC', actif: true },
      { id: 3, code: 'PSC', libelle: 'Procédure Simplifiée Concurrentielle', categorie: 'PSD', actif: true },
      { id: 4, code: 'PSD', libelle: 'Procédure Simplifiée Directe', categorie: 'PSD', actif: true },
      { id: 5, code: 'GRE', libelle: 'Gré à gré', categorie: 'DEROGATOIRE', actif: true },
      { id: 6, code: 'MEAP', libelle: 'Marché Emergent A Partage', categorie: 'SPECIFIQUE', actif: true }
    ],
    bailleurs: [
      { id: 1, code: 'ETAT', libelle: 'État', actif: true },
      { id: 2, code: 'BID', libelle: 'Banque Interaméricaine', actif: true },
      { id: 3, code: 'BM', libelle: 'Banque Mondiale', actif: true },
      { id: 4, code: 'BAD', libelle: 'Banque Africaine', actif: true },
      { id: 5, code: 'UE', libelle: 'Union Européenne', actif: true },
      { id: 6, code: 'PNUD', libelle: 'PNUD', actif: true }
    ],
    etatsMarche: [
      { id: 1, code: 'PLANIFIE', libelle: 'Planifié', couleur: 'bg-blue-100 text-blue-800', ordre: 1, actif: true },
      { id: 2, code: 'EN_PROC', libelle: 'En Procédure', couleur: 'bg-yellow-100 text-yellow-800', ordre: 2, actif: true },
      { id: 3, code: 'ATTRIBUE', libelle: 'Attribué', couleur: 'bg-purple-100 text-purple-800', ordre: 3, actif: true },
      { id: 4, code: 'VISE', libelle: 'Visé', couleur: 'bg-indigo-100 text-indigo-800', ordre: 4, actif: true },
      { id: 5, code: 'EXECUTION', libelle: 'Exécution', couleur: 'bg-green-100 text-green-800', ordre: 5, actif: true },
      { id: 6, code: 'CLOS', libelle: 'Clôturé', couleur: 'bg-gray-100 text-gray-800', ordre: 6, actif: true },
      { id: 7, code: 'RESILIE', libelle: 'Résilié', couleur: 'bg-red-100 text-red-800', ordre: 7, actif: true }
    ],
    typesEcheance: [
      { id: 1, code: 'ACOMPTE', libelle: 'Acompte', actif: true },
      { id: 2, code: 'SITUATION', libelle: 'Situation', actif: true },
      { id: 3, code: 'SOLDE', libelle: 'Solde', actif: true }
    ],
    typesAvenant: [
      { id: 1, code: 'FINAN', libelle: 'Financier', actif: true },
      { id: 2, code: 'DELAI', libelle: 'Délai', actif: true },
      { id: 3, code: 'TECH', libelle: 'Technique', actif: true }
    ],
    typesPieces: [
      { id: 1, code: 'DAO', libelle: 'Dossier d\'Appel d\'Offres' },
      { id: 2, code: 'PV_OUVERTURE', libelle: 'PV d\'Ouverture' },
      { id: 3, code: 'PV_JUGEMENT', libelle: 'PV de Jugement' },
      { id: 4, code: 'RAPPORT_ANALYSE', libelle: 'Rapport d\'Analyse' },
      { id: 5, code: 'CONTRAT_SIGNE', libelle: 'Contrat Signé' },
      { id: 6, code: 'AVENANT_SIGNE', libelle: 'Avenant Signé' },
      { id: 7, code: 'PV_RECPROV', libelle: 'PV Réception Provisoire' },
      { id: 8, code: 'PV_RECDEF', libelle: 'PV Réception Définitive' }
    ],
    reglesGestion: {
      seuil_cumul_avenants: { valeur: 30, severite: 'BLOCANT', description: 'Seuil cumul avenants (%)' },
      taux_max_avance: { valeur: 15, severite: 'BLOCANT', description: 'Taux max avance (%)' },
      taux_max_retenue: { valeur: 10, severite: 'AVERT', description: 'Taux max retenue garantie (%)' },
      delai_max_os: { valeur: 30, severite: 'BLOCANT', description: 'Délai max OS après visa (jours)' }
    }
  });

  // Marchés - Jeux de données
  const [marches, setMarches] = useState([
    {
      id: 'M001',
      code: 'M-2024-001',
      titre: 'Construction Centre de Santé - Région Abidjan',
      description: 'Construction d\'un centre de santé polyvalent avec maternité',
      type: 'TRAVAUX',
      unite: 'MIN-SANTE',
      etat: 'EXECUTION',
      modePassation: 'AOO',
      bailleur: 'BM',
      montantAPM: 850000000,
      montantEngagement: 850000000,
      montantOrdonance: 620000000,
      montantPaiement: 580000000,
      dateCreation: '2024-01-15',
      dateAttribution: '2024-05-10',
      dateDebutExecution: '2024-06-01',
      dateFinPrevue: '2025-12-31',
      titulaire: 'ENTREPRISE BETA CONSTRUCTION',
      taux_avancement: 65,
      localite: 'Abidjan - Plateau',
      avenants: [
        { id: 'A001', type: 'FINAN', montant: 50000000, date: '2024-11-01', motif: 'Augmentation matériaux' },
        { id: 'A002', type: 'TECH', montant: 0, date: '2024-10-15', motif: 'Adaptation techniques' }
      ],
      pieces: {
        'DAO': { presente: true, date: '2024-01-10', fichier: 'DAO-M001.pdf' },
        'PV_OUVERTURE': { presente: true, date: '2024-04-20', fichier: 'PVO-M001.pdf' },
        'PV_JUGEMENT': { presente: true, date: '2024-05-01', fichier: 'PVJ-M001.pdf' },
        'RAPPORT_ANALYSE': { presente: true, date: '2024-05-05', fichier: 'RA-M001.pdf' },
        'CONTRAT_SIGNE': { presente: true, date: '2024-06-01', fichier: 'CS-M001.pdf' },
        'AVENANT_SIGNE': { presente: true, date: '2024-11-01', fichier: 'AS-M001.pdf' },
        'PV_RECPROV': { presente: false, date: null, fichier: null },
        'PV_RECDEF': { presente: false, date: null, fichier: null }
      },
      statut_cf: 'VISE',
      reserve_cf: null
    },
    {
      id: 'M002',
      code: 'M-2024-002',
      titre: 'Fourniture d\'équipements médicaux',
      description: 'Acquisition de lits médicalisés et appareillages',
      type: 'FOURN',
      unite: 'MIN-SANTE',
      etat: 'VISE',
      modePassation: 'PSC',
      bailleur: 'ETAT',
      montantAPM: 120000000,
      montantEngagement: 120000000,
      montantOrdonance: 0,
      montantPaiement: 0,
      dateCreation: '2024-03-20',
      dateAttribution: '2024-08-15',
      dateDebutExecution: null,
      dateFinPrevue: '2025-06-30',
      titulaire: 'MEDTECH SOLUTIONS',
      taux_avancement: 5,
      localite: 'Abidjan - Plateau',
      avenants: [],
      pieces: {
        'DAO': { presente: true, date: '2024-03-15', fichier: 'DAO-M002.pdf' },
        'PV_OUVERTURE': { presente: true, date: '2024-07-10', fichier: 'PVO-M002.pdf' },
        'PV_JUGEMENT': { presente: true, date: '2024-08-01', fichier: 'PVJ-M002.pdf' },
        'RAPPORT_ANALYSE': { presente: true, date: '2024-08-10', fichier: 'RA-M002.pdf' },
        'CONTRAT_SIGNE': { presente: false, date: null, fichier: null },
        'AVENANT_SIGNE': { presente: false, date: null, fichier: null },
        'PV_RECPROV': { presente: false, date: null, fichier: null },
        'PV_RECDEF': { presente: false, date: null, fichier: null }
      },
      statut_cf: 'VISE',
      reserve_cf: null
    },
    {
      id: 'M003',
      code: 'M-2024-003',
      titre: 'Prestation d\'audit financier - 2024',
      description: 'Audit externe des comptes - Cabinet spécialisé',
      type: 'SERV',
      unite: 'DCF',
      etat: 'EXECUTION',
      modePassation: 'PSD',
      bailleur: 'ETAT',
      montantAPM: 25000000,
      montantEngagement: 25000000,
      montantOrdonance: 25000000,
      montantPaiement: 25000000,
      dateCreation: '2024-02-10',
      dateAttribution: '2024-04-01',
      dateDebutExecution: '2024-04-05',
      dateFinPrevue: '2024-12-31',
      titulaire: 'CABINET AUDIT PLUS',
      taux_avancement: 90,
      localite: 'Abidjan - Plateau',
      avenants: [],
      pieces: {
        'DAO': { presente: true, date: '2024-02-05', fichier: 'DAO-M003.pdf' },
        'PV_OUVERTURE': { presente: false, date: null, fichier: null },
        'PV_JUGEMENT': { presente: false, date: null, fichier: null },
        'RAPPORT_ANALYSE': { presente: false, date: null, fichier: null },
        'CONTRAT_SIGNE': { presente: true, date: '2024-04-01', fichier: 'CS-M003.pdf' },
        'AVENANT_SIGNE': { presente: false, date: null, fichier: null },
        'PV_RECPROV': { presente: true, date: '2024-12-01', fichier: 'PVR-M003.pdf' },
        'PV_RECDEF': { presente: false, date: null, fichier: null }
      },
      statut_cf: 'VISE',
      reserve_cf: null
    },
    {
      id: 'M004',
      code: 'M-2024-004',
      titre: 'Étude de faisabilité - Route Nationale 3',
      description: 'Études techniques et environnementales',
      type: 'PI',
      unite: 'DG-PLAN',
      etat: 'ATTRIBUE',
      modePassation: 'AOO',
      bailleur: 'BAD',
      montantAPM: 75000000,
      montantEngagement: 75000000,
      montantOrdonance: 0,
      montantPaiement: 0,
      dateCreation: '2024-04-05',
      dateAttribution: '2024-09-20',
      dateDebutExecution: null,
      dateFinPrevue: '2025-09-30',
      titulaire: 'INGENIERIE TRANSPORT AFRIQUE',
      taux_avancement: 0,
      localite: 'Yamoussoukro',
      avenants: [],
      pieces: {
        'DAO': { presente: true, date: '2024-04-01', fichier: 'DAO-M004.pdf' },
        'PV_OUVERTURE': { presente: true, date: '2024-08-15', fichier: 'PVO-M004.pdf' },
        'PV_JUGEMENT': { presente: true, date: '2024-09-10', fichier: 'PVJ-M004.pdf' },
        'RAPPORT_ANALYSE': { presente: true, date: '2024-09-15', fichier: 'RA-M004.pdf' },
        'CONTRAT_SIGNE': { presente: false, date: null, fichier: null },
        'AVENANT_SIGNE': { presente: false, date: null, fichier: null },
        'PV_RECPROV': { presente: false, date: null, fichier: null },
        'PV_RECDEF': { presente: false, date: null, fichier: null }
      },
      statut_cf: 'EN_ATTENTE',
      reserve_cf: 'Dossier incomplet - manque contrat signé'
    },
    {
      id: 'M005',
      code: 'M-2024-005',
      titre: 'Maintenance informatique',
      description: 'Support et maintenance du parc informatique',
      type: 'SERV',
      unite: 'DGBF',
      etat: 'PLANIFIE',
      modePassation: 'PSD',
      bailleur: 'ETAT',
      montantAPM: 30000000,
      montantEngagement: 0,
      montantOrdonance: 0,
      montantPaiement: 0,
      dateCreation: '2024-10-01',
      dateAttribution: null,
      dateDebutExecution: null,
      dateFinPrevue: '2025-12-31',
      titulaire: 'En sélection',
      taux_avancement: 0,
      localite: 'Abidjan - Plateau',
      avenants: [],
      pieces: {},
      statut_cf: null,
      reserve_cf: null
    }
  ]);

  // ============ UTILITAIRES ============
  const formatCurrency = (value) => {
    if (!value) return '0 FCFA';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr));
  };

  const getMarcheFromId = useCallback((id) => marches.find(m => m.id === id), [marches]);
  const getRefByCode = useCallback((ref, code) => parametrage[ref]?.find(r => r.code === code), [parametrage]);
  const getRefById = useCallback((ref, id) => parametrage[ref]?.find(r => r.id === id), [parametrage]);

  // Filtrage des marchés
  const marchesFiltrees = useMemo(() => {
    return marches.filter(m => {
      const matchSearch = !searchMarche || 
        m.code.toLowerCase().includes(searchMarche.toLowerCase()) ||
        m.titre.toLowerCase().includes(searchMarche.toLowerCase());
      const matchEtat = !filterEtat || m.etat === filterEtat;
      const matchType = !filterType || m.type === filterType;
      const matchUnite = !filterUnite || m.unite === filterUnite;
      const matchBailleur = !filterBailleur || m.bailleur === filterBailleur;
      
      return matchSearch && matchEtat && matchType && matchUnite && matchBailleur;
    });
  }, [marches, searchMarche, filterEtat, filterType, filterUnite, filterBailleur]);

  // Indicateurs KPI
  const kpis = useMemo(() => ({
    total: marches.length,
    enExecution: marches.filter(m => m.etat === 'EXECUTION').length,
    enProcedure: marches.filter(m => m.etat === 'EN_PROC').length,
    attribues: marches.filter(m => m.etat === 'ATTRIBUE').length,
    clos: marches.filter(m => m.etat === 'CLOS').length,
    montantTotal: marches.reduce((sum, m) => sum + m.montantAPM, 0),
    montantEngage: marches.reduce((sum, m) => sum + m.montantEngagement, 0),
    montantOrdonance: marches.reduce((sum, m) => sum + m.montantOrdonance, 0),
    montantPaye: marches.reduce((sum, m) => sum + m.montantPaiement, 0),
    txExecution: marches.length > 0 ? Math.round((marches.reduce((sum, m) => sum + m.montantPaiement, 0) / marches.reduce((sum, m) => sum + m.montantAPM, 0)) * 100) : 0
  }), [marches]);

  // ============ FERMETURES MODALES ============
  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  // ============ COMPOSANTS RÉUTILISABLES ============
  
  const LogoSIDCF = () => (
    <div className="flex items-center gap-2">
      <div className="text-2xl font-black">
        <span className="text-orange-500">SI</span>
        <span className="text-teal-700 inline-block -mx-1">D</span>
        <span className="text-teal-700">-CF</span>
      </div>
    </div>
  );

  const Header = () => (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <LogoSIDCF />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Admin • SI-DCF</span>
          <button className="text-gray-600 hover:text-gray-900"><LogOut className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`fixed lg:relative w-64 h-screen bg-teal-700 text-white overflow-y-auto transition-transform lg:translate-x-0 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-teal-100 uppercase mb-3">Menu Principal</h3>
            <div className="space-y-2">
              <NavItem 
                icon={<Home className="w-4 h-4" />} 
                label="Accueil"
                onClick={() => { setCurrentPage('home'); setSidebarOpen(false); }}
                active={currentPage === 'home'}
              />
              <NavItem 
                icon={<Briefcase className="w-4 h-4" />} 
                label="Marchés"
                onClick={() => { setCurrentPage('marches'); setSidebarOpen(false); }}
                active={currentPage === 'marches'}
              />
              <NavItem 
                icon={<BarChart3 className="w-4 h-4" />} 
                label="Tableau de Bord"
                onClick={() => { setCurrentPage('dashboard'); setSidebarOpen(false); }}
                active={currentPage === 'dashboard'}
              />
              <NavItem 
                icon={<FileCheck className="w-4 h-4" />} 
                label="Exécution & Avenants"
                onClick={() => { setCurrentPage('execution'); setSidebarOpen(false); }}
                active={currentPage === 'execution'}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-teal-100 uppercase mb-3">Administration</h3>
            <div className="space-y-2">
              <NavItem 
                icon={<Settings className="w-4 h-4" />} 
                label="Paramétrages"
                onClick={() => { setCurrentPage('parametrage'); setSidebarOpen(false); }}
                active={currentPage === 'parametrage'}
              />
              <NavItem 
                icon={<AlertTriangle className="w-4 h-4" />} 
                label="Règles de Gestion"
                onClick={() => { setCurrentPage('regles'); setSidebarOpen(false); }}
                active={currentPage === 'regles'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NavItem = ({ icon, label, onClick, active }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-teal-600 text-white' 
          : 'text-teal-100 hover:bg-teal-600'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  const KPICard = ({ icon: Icon, titre, valeur, sous, couleur }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <span className="text-gray-600 text-xs font-medium">{titre}</span>
        <Icon className={`w-5 h-5 ${couleur}`} />
      </div>
      <div className={`text-2xl font-bold mb-1 ${couleur}`}>{valeur}</div>
      {sous && <div className="text-gray-500 text-xs">{sous}</div>}
    </div>
  );

  // ============ ÉCRANS ============

  // ACCUEIL
  const PageAccueil = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Bienvenue dans SI-DCF</h1>
        <p className="text-gray-600">Système d'Information Décisionnel du Contrôle Financier - Module Marché</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <KPICard icon={Briefcase} titre="Marchés actifs" valeur={kpis.total} couleur="text-blue-600" />
        <KPICard icon={TrendingUp} titre="En exécution" valeur={kpis.enExecution} couleur="text-green-600" />
        <KPICard icon={DollarSign} titre="Montant APM" valeur={formatCurrency(kpis.montantTotal)} sous="FCFA" couleur="text-teal-600" />
        <KPICard icon={Clock} titre="Taux exécution" valeur={`${kpis.txExecution}%`} couleur="text-orange-600" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Accès rapides</h3>
          <div className="space-y-2">
            <button 
              onClick={() => { setCurrentPage('marches'); setSidebarOpen(false); }}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
            >
              <span className="font-medium text-gray-700">Gestion des Marchés</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { setCurrentPage('dashboard'); setSidebarOpen(false); }}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
            >
              <span className="font-medium text-gray-700">Tableau de Bord Complet</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { setCurrentPage('parametrage'); setSidebarOpen(false); }}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
            >
              <span className="font-medium text-gray-700">Paramétrages</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200 p-6">
          <h3 className="text-lg font-bold text-teal-900 mb-3">ℹ Info Système</h3>
          <ul className="space-y-2 text-sm text-teal-800">
            <li>✓ {marchesFiltrees.length} marchés paramétrés</li>
            <li>✓ {parametrage.unites.filter(u => u.actif).length} unités actives</li>
            <li>✓ {parametrage.bailleurs.filter(b => b.actif).length} bailleurs configurés</li>
            <li>✓ Règles de gestion : {Object.keys(parametrage.reglesGestion).length} actives</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // TABLEAU DE BORD
  const PageDashboard = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tableau de Bord</h1>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard icon={Briefcase} titre="Total Marchés" valeur={kpis.total} couleur="text-blue-600" />
        <KPICard icon={TrendingUp} titre="En Exécution" valeur={kpis.enExecution} couleur="text-green-600" />
        <KPICard icon={AlertTriangle} titre="En Procédure" valeur={kpis.enProcedure} couleur="text-yellow-600" />
        <KPICard icon={CheckCircle} titre="Attribués" valeur={kpis.attribues} couleur="text-purple-600" />
      </div>

      {/* Flux de trésorerie */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-teal-600"></div>
            <span className="text-xs font-semibold text-gray-600">APM PRÉVUE</span>
          </div>
          <div className="text-xl font-bold text-teal-700">{formatCurrency(kpis.montantTotal)}</div>
          <div className="text-xs text-gray-500 mt-1">100%</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-xs font-semibold text-gray-600">ENGAGÉE</span>
          </div>
          <div className="text-xl font-bold text-blue-700">{formatCurrency(kpis.montantEngage)}</div>
          <div className="text-xs text-gray-500 mt-1">{Math.round((kpis.montantEngage/kpis.montantTotal)*100)}%</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
            <span className="text-xs font-semibold text-gray-600">ORDONANCÉE</span>
          </div>
          <div className="text-xl font-bold text-yellow-700">{formatCurrency(kpis.montantOrdonance)}</div>
          <div className="text-xs text-gray-500 mt-1">{Math.round((kpis.montantOrdonance/kpis.montantTotal)*100)}%</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
            <span className="text-xs font-semibold text-gray-600">PAYÉE</span>
          </div>
          <div className="text-xl font-bold text-green-700">{formatCurrency(kpis.montantPaye)}</div>
          <div className="text-xs text-gray-500 mt-1">{Math.round((kpis.montantPaye/kpis.montantTotal)*100)}%</div>
        </div>
      </div>

      {/* Distribution par état */}
      <div className="grid grid-cols-7 gap-3 mb-6">
        {parametrage.etatsMarche.filter(e => e.actif).map(etat => {
          const count = marches.filter(m => m.etat === etat.code).length;
          return (
            <div key={etat.code} className="bg-white rounded-lg border border-gray-200 p-3 text-center">
              <div className="text-xs font-semibold text-gray-600 mb-2">{etat.libelle}</div>
              <div className={`text-2xl font-bold ${etat.couleur}`}>{count}</div>
            </div>
          );
        })}
      </div>

      {/* Marchés par unité */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Marchés par Unité</h3>
          <div className="space-y-2">
            {parametrage.unites.map(unite => {
              const count = marches.filter(m => m.unite === unite.code).length;
              const montant = marches.filter(m => m.unite === unite.code).reduce((sum, m) => sum + m.montantAPM, 0);
              return (
                <div key={unite.code} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">{unite.libelle}</span>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{count} marché(s)</div>
                    <div className="text-xs text-gray-500">{formatCurrency(montant)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Bailleurs</h3>
          <div className="space-y-2">
            {parametrage.bailleurs.map(bailleur => {
              const count = marches.filter(m => m.bailleur === bailleur.code).length;
              const montant = marches.filter(m => m.bailleur === bailleur.code).reduce((sum, m) => sum + m.montantAPM, 0);
              if (count === 0) return null;
              return (
                <div key={bailleur.code} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">{bailleur.libelle}</span>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{count} marché(s)</div>
                    <div className="text-xs text-gray-500">{formatCurrency(montant)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // GESTION DES MARCHÉS - LISTE
  const PageMarches = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Marchés</h1>
        <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nouveau marché
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-6 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Recherche</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Code ou titre..."
                value={searchMarche}
                onChange={(e) => setSearchMarche(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">État</label>
            <select
              value={filterEtat}
              onChange={(e) => setFilterEtat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">Tous</option>
              {parametrage.etatsMarche.map(e => (
                <option key={e.code} value={e.code}>{e.libelle}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">Tous</option>
              {parametrage.typesMarchés.map(t => (
                <option key={t.code} value={t.code}>{t.libelle}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Unité</label>
            <select
              value={filterUnite}
              onChange={(e) => setFilterUnite(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">Tous</option>
              {parametrage.unites.map(u => (
                <option key={u.code} value={u.code}>{u.libelle}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Bailleur</label>
            <select
              value={filterBailleur}
              onChange={(e) => setFilterBailleur(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">Tous</option>
              {parametrage.bailleurs.map(b => (
                <option key={b.code} value={b.code}>{b.libelle}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button className="flex-1 bg-teal-50 hover:bg-teal-100 text-teal-700 px-3 py-2 rounded-lg font-medium text-sm">
              <Download className="w-4 h-4 inline mr-2" /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="text-sm text-gray-600 mb-3">
        {marchesFiltrees.length} marché(s) trouvé(s)
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Unité</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">État</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">Montant APM</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Avancement</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {marchesFiltrees.map(marche => {
              const etat = getRefById('etatsMarche', marche.etat);
              return (
                <tr key={marche.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-teal-700">{marche.code}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{marche.titre}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{getRefByCode('typesMarchés', marche.type)?.libelle}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{getRefByCode('unites', marche.unite)?.libelle}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${etat?.couleur}`}>
                      {etat?.libelle}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">{formatCurrency(marche.montantAPM)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: `${marche.taux_avancement}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 w-8 text-right">{marche.taux_avancement}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedMarche(getMarcheFromId(marche.id))}
                      className="text-teal-700 hover:text-teal-900 font-medium text-sm"
                    >
                      <Eye className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // DÉTAIL MARCHÉ
  const PageDetailMarche = () => {
    const marche = selectedMarche;
    if (!marche) return null;

    const etat = getRefById('etatsMarche', marche.etat);
    const type = getRefByCode('typesMarchés', marche.type);
    const unite = getRefByCode('unites', marche.unite);
    const mode = getRefByCode('modePassation', marche.modePassation);
    const bailleur = getRefByCode('bailleurs', marche.bailleur);

    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => setSelectedMarche(null)}
          className="mb-6 text-teal-700 hover:text-teal-900 font-medium text-sm flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à la liste
        </button>

        {/* En-tête */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{marche.titre}</h1>
              <p className="text-gray-600 text-sm mt-1">{marche.code}</p>
            </div>
            <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${etat?.couleur}`}>
              {etat?.libelle}
            </span>
          </div>
          <p className="text-gray-700">{marche.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Informations Générales */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Informations Générales</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type :</span>
                <span className="font-medium text-gray-900">{type?.libelle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unité :</span>
                <span className="font-medium text-gray-900">{unite?.libelle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mode de passation :</span>
                <span className="font-medium text-gray-900">{mode?.libelle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bailleur :</span>
                <span className="font-medium text-gray-900">{bailleur?.libelle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Titulaire :</span>
                <span className="font-medium text-gray-900">{marche.titulaire}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Localité :</span>
                <span className="font-medium text-gray-900">{marche.localite}</span>
              </div>
            </div>
          </div>

          {/* Montants */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Montants (FCFA)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">APM Prévue :</span>
                <span className="font-bold text-lg text-teal-700">{formatCurrency(marche.montantAPM)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Engagement :</span>
                <span className="font-semibold text-gray-900">{formatCurrency(marche.montantEngagement)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Ordonnancement :</span>
                <span className="font-semibold text-gray-900">{formatCurrency(marche.montantOrdonance)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Paiement :</span>
                <span className="font-semibold text-gray-900">{formatCurrency(marche.montantPaiement)}</span>
              </div>
            </div>
          </div>

          {/* Calendrier */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Calendrier</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Création :</span>
                <span className="font-medium text-gray-900">{formatDate(marche.dateCreation)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Attribution :</span>
                <span className="font-medium text-gray-900">{formatDate(marche.dateAttribution)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Début exécution :</span>
                <span className="font-medium text-gray-900">{formatDate(marche.dateDebutExecution)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fin prévue :</span>
                <span className="font-medium text-gray-900">{formatDate(marche.dateFinPrevue)}</span>
              </div>
            </div>
          </div>

          {/* Avancement */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Avancement</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Taux d'avancement</span>
                  <span className="text-2xl font-bold text-teal-700">{marche.taux_avancement}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-teal-600 h-3 rounded-full" style={{ width: `${marche.taux_avancement}%` }} />
                </div>
              </div>
              {marche.avenants.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-amber-900 text-sm">{marche.avenants.length} avenant(s)</div>
                      <div className="text-xs text-amber-800 mt-1">{marche.avenants.map(a => a.motif).join(', ')}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Avenants */}
        {marche.avenants.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Avenants ({marche.avenants.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Motif</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Montant</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {marche.avenants.map(av => {
                    const typeAv = getRefByCode('typesAvenant', av.type);
                    return (
                      <tr key={av.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-teal-700">{av.id}</td>
                        <td className="px-4 py-3">{typeAv?.libelle}</td>
                        <td className="px-4 py-3 text-gray-700">{av.motif}</td>
                        <td className="px-4 py-3 font-semibold">{av.montant > 0 ? '+' + formatCurrency(av.montant) : '-'}</td>
                        <td className="px-4 py-3">{formatDate(av.date)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pièces Justificatives */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pièces Justificatives</h3>
          <div className="grid grid-cols-3 gap-4">
            {parametrage.typesPieces.map(type => {
              const piece = marche.pieces[type.code];
              const presente = piece?.presente || false;
              return (
                <div key={type.code} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors">
                  <div>
                    {presente ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-semibold mb-1 ${presente ? 'text-gray-900' : 'text-gray-400'}`}>
                      {type.libelle}
                    </div>
                    {presente && piece?.date && (
                      <div className="text-xs text-gray-500">{formatDate(piece.date)}</div>
                    )}
                    {presente && piece?.fichier && (
                      <div className="text-xs text-teal-600 font-medium mt-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {piece.fichier}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statut CF */}
        {marche.statut_cf && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Statut Contrôle Financier</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm font-semibold text-blue-900 mb-2">
                {marche.statut_cf === 'VISE' ? '✓ Visé' : '⚠ En attente'}
              </div>
              {marche.reserve_cf && (
                <div className="text-sm text-blue-800 mt-2">
                  <span className="font-semibold">Réserve : </span>{marche.reserve_cf}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // EXÉCUTION & AVENANTS
  const PageExecution = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Suivi Exécution & Avenants</h1>

      {/* Marchés en exécution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Marchés en Exécution</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Titre</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Avancement</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Montant Payé</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Avenants</th>
              </tr>
            </thead>
            <tbody>
              {marches.filter(m => m.etat === 'EXECUTION').map(marche => (
                <tr key={marche.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-teal-700 cursor-pointer hover:underline" onClick={() => setSelectedMarche(marche)}>
                    {marche.code}
                  </td>
                  <td className="px-4 py-3 text-gray-900 max-w-xs truncate">{marche.titre}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${marche.taux_avancement}%` }} />
                      </div>
                      <span className="text-xs font-bold w-8 text-right">{marche.taux_avancement}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 text-right">{formatCurrency(marche.montantPaiement)}</td>
                  <td className="px-4 py-3 text-right">
                    {marche.avenants.length > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-semibold">
                        <AlertTriangle className="w-3 h-3" /> {marche.avenants.length}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // PARAMÉTRAGES
  const PageParametrage = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Paramétrages</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Unités */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Unités Opérationnelles</h3>
          <div className="space-y-2">
            {parametrage.unites.map(unite => (
              <div key={unite.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <div className="font-semibold text-gray-900">{unite.code}</div>
                  <div className="text-xs text-gray-600">{unite.libelle}</div>
                </div>
                <input type="checkbox" defaultChecked={unite.actif} className="rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Types de Marchés */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Types de Marchés</h3>
          <div className="space-y-2">
            {parametrage.typesMarchés.map(type => (
              <div key={type.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <div className="font-semibold text-gray-900">{type.code}</div>
                  <div className="text-xs text-gray-600">{type.libelle}</div>
                </div>
                <input type="checkbox" defaultChecked={type.actif} className="rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Modes de Passation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Modes de Passation</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {parametrage.modePassation.map(mode => (
              <div key={mode.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <div className="font-semibold text-gray-900">{mode.code}</div>
                  <div className="text-xs text-gray-600">{mode.libelle}</div>
                </div>
                <input type="checkbox" defaultChecked={mode.actif} className="rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Bailleurs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Bailleurs</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {parametrage.bailleurs.map(bailleur => (
              <div key={bailleur.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <div className="font-semibold text-gray-900">{bailleur.code}</div>
                  <div className="text-xs text-gray-600">{bailleur.libelle}</div>
                </div>
                <input type="checkbox" defaultChecked={bailleur.actif} className="rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* États du Marché */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">États du Marché</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {parametrage.etatsMarche.map(etat => (
              <div key={etat.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${etat.couleur}`}>{etat.libelle}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Ordre: {etat.ordre}</div>
                </div>
                <input type="checkbox" defaultChecked={etat.actif} className="rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Types de Pièces */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Types de Pièces</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {parametrage.typesPieces.map(piece => (
              <div key={piece.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <div className="font-semibold text-gray-900">{piece.code}</div>
                  <div className="text-xs text-gray-600">{piece.libelle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // RÈGLES DE GESTION
  const PageRegles = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Règles de Gestion</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-blue-900 text-sm">À propos des règles de gestion</div>
              <div className="text-blue-800 text-sm mt-1">
                Les règles de gestion définissent les conditions et seuils qui s'appliquent automatiquement lors de la création ou modification des marchés. Elles assurent la conformité avec les réglementations.
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {Object.entries(parametrage.reglesGestion).map(([key, regle]) => (
            <div key={key} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-gray-900">{regle.description}</div>
                  <div className="text-xs text-gray-600 mt-1">Code: {key}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  regle.severite === 'BLOCANT' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {regle.severite}
                </span>
              </div>
              <div className="bg-white rounded p-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Valeur :</span>
                  <input
                    type="number"
                    defaultValue={regle.valeur}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                  <span className="text-gray-600 text-sm">{key.includes('taux') ? '%' : key.includes('delai') ? 'jours' : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Annuler
          </button>
          <button className="px-4 py-2 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800">
            <Save className="w-4 h-4 inline mr-2" /> Enregistrer
          </button>
        </div>
      </div>
    </div>
  );

  // ============ RENDU PRINCIPAL ============
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-auto">
          {selectedMarche ? (
            <PageDetailMarche />
          ) : currentPage === 'home' ? (
            <PageAccueil />
          ) : currentPage === 'dashboard' ? (
            <PageDashboard />
          ) : currentPage === 'marches' ? (
            <PageMarches />
          ) : currentPage === 'execution' ? (
            <PageExecution />
          ) : currentPage === 'parametrage' ? (
            <PageParametrage />
          ) : currentPage === 'regles' ? (
            <PageRegles />
          ) : (
            <PageAccueil />
          )}
        </div>
      </div>
    </div>
  );
};

export default SIDCFModule;