# 🦊 FOXWISE E-COMMERCE - PLAN COMPLET

## 🎯 VISION
Application tout-en-un pour les vendeurs e-commerce qui automatise et simplifie la gestion multi-plateformes, la recherche de produits, le sourcing, et l'analyse de profitabilité. **L'IA est omniprésente** pour maximiser l'efficacité.

---

## 🎨 DESIGN & BRANDING

### Style de Référence (FoxWise Client)
- **Couleurs principales**: Gradient Orange (#F97316) → Rouge (#EF4444)
- **Background**: Noir pur (#0a0a0a)
- **Cards**: Gris foncé (#111827) avec bordures subtiles
- **Gradients par section**: Chaque module a son gradient unique
- **Animations**: Framer Motion, transitions fluides
- **Charts**: Recharts avec style dark customisé

### Nouveau Gradient pour E-Commerce
**Section e-commerce principale**: `from-emerald-500 to-teal-600`
- Évoque la croissance, l'argent, le succès
- Se démarque des autres apps de la suite

---

## 📦 ARCHITECTURE TECHNIQUE

### Stack (identique à FoxWise Client)
```
Frontend: Next.js 15 + React 19 + TypeScript
Styling: TailwindCSS + Framer Motion
Auth: Clerk (OAuth)
Database: Supabase (PostgreSQL)
Charts: Recharts
AI: OpenAI API / Anthropic Claude
Automation: n8n (workflows)
APIs: eBay, Etsy, Amazon SP-API, Shopify, AliExpress
```

### Structure de Dossiers
```
/app
  /page.tsx                          # Landing page
  /layout.tsx                        # Root layout
  /globals.css                       # Styles globaux
  /(dashboard)
    /layout.tsx                      # Dashboard layout + Sidebar
    /dashboard/page.tsx              # 📊 Dashboard Principal
    /listings/page.tsx               # 📝 Créer/Gérer Listings
    /research/page.tsx               # 🔍 Recherche de Produits
    /sourcing/page.tsx               # 🌏 Sourcing Fournisseurs
    /profit-calculator/page.tsx      # 💰 Calculateur de Profits
    /inventory/page.tsx              # 📦 Inventaire Multi-Plateforme
    /niches/page.tsx                 # 🎯 Explorateur de Niches
    /competitor-spy/page.tsx         # 🕵️ Analyse Compétiteurs
    /ai-assistant/page.tsx           # 🤖 Assistant IA Central
    /automation/page.tsx             # ⚡ Workflows n8n
    /analytics/page.tsx              # 📈 Analytics Avancés
    /platforms/page.tsx              # 🔗 Gestion Connexions API
    /settings/page.tsx               # ⚙️ Paramètres
  /api
    /listings/route.ts               # CRUD listings
    /research/route.ts               # API marketplace research
    /sourcing/route.ts               # API sourcing platforms
    /profit/route.ts                 # Calculs de profit
    /inventory/route.ts              # Sync inventaire
    /ai/route.ts                     # AI generations
    /platforms/[platform]/route.ts   # Intégrations API
/components
  /Sidebar.tsx                       # Navigation
  /AIAssistant.tsx                   # Chat AI widget
  /ProfitCard.tsx                    # Composant profit
  /ListingCard.tsx                   # Composant listing
  /ProductCompare.tsx                # Comparaison produits
/lib
  /supabase.ts                       # Client Supabase
  /openai.ts                         # Client OpenAI
  /platforms/                        # Clients API plateformes
    /ebay.ts
    /amazon.ts
    /shopify.ts
    /etsy.ts
    /aliexpress.ts
```

---

## 🗄️ SCHÉMA DE BASE DE DONNÉES

### Tables Principales

#### `fw_users`
```sql
CREATE TABLE fw_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  subscription_tier TEXT DEFAULT 'free', -- free, pro, enterprise
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_platforms`
```sql
CREATE TABLE fw_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,
  platform_name TEXT NOT NULL, -- ebay, amazon, shopify, etsy, etc.
  api_key TEXT, -- Encrypted
  api_secret TEXT, -- Encrypted
  store_name TEXT,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_products`
```sql
CREATE TABLE fw_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  tags TEXT[],

  -- Pricing
  cost_price DECIMAL(10,2),
  selling_price DECIMAL(10,2),

  -- Images
  images TEXT[], -- URLs
  main_image TEXT,

  -- AI Generated
  ai_title TEXT,
  ai_description TEXT,
  ai_tags TEXT[],
  seo_keywords TEXT[],

  -- Status
  status TEXT DEFAULT 'draft', -- draft, active, inactive
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_listings` (Multi-Platform Listings)
```sql
CREATE TABLE fw_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES fw_products(id) ON DELETE CASCADE,
  platform_id UUID REFERENCES fw_platforms(id) ON DELETE CASCADE,

  platform_listing_id TEXT, -- ID from platform
  url TEXT,

  -- Status
  status TEXT DEFAULT 'draft', -- draft, pending, active, sold, ended
  quantity_available INT DEFAULT 0,
  quantity_sold INT DEFAULT 0,

  -- Performance
  views INT DEFAULT 0,
  watchers INT DEFAULT 0,

  -- Dates
  listed_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_sourcing_products` (Produits trouvés sur AliExpress/Alibaba)
```sql
CREATE TABLE fw_sourcing_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  -- Source info
  source_platform TEXT NOT NULL, -- aliexpress, alibaba, dhgate, etc.
  source_product_id TEXT NOT NULL,
  source_url TEXT NOT NULL,

  -- Product details
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[],

  -- Pricing
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  shipping_cost DECIMAL(10,2),
  moq INT, -- Minimum Order Quantity

  -- Supplier
  supplier_name TEXT,
  supplier_rating DECIMAL(3,2),
  orders_count INT,

  -- Tags
  is_favorite BOOLEAN DEFAULT false,
  notes TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_profit_calculations`
```sql
CREATE TABLE fw_profit_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES fw_products(id),
  sourcing_product_id UUID REFERENCES fw_sourcing_products(id),

  -- Costs
  product_cost DECIMAL(10,2),
  shipping_cost DECIMAL(10,2),
  platform_fees DECIMAL(10,2),
  payment_processing_fees DECIMAL(10,2),
  other_costs DECIMAL(10,2),
  total_cost DECIMAL(10,2),

  -- Revenue
  selling_price DECIMAL(10,2),

  -- Profit
  gross_profit DECIMAL(10,2),
  profit_margin DECIMAL(5,2), -- Percentage
  roi DECIMAL(5,2), -- Return on Investment

  -- Notes
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_research_queries` (Historique de recherche)
```sql
CREATE TABLE fw_research_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  query_text TEXT NOT NULL,
  platform TEXT NOT NULL,
  filters JSONB, -- category, price_range, etc.

  -- Results summary
  results_count INT,
  avg_price DECIMAL(10,2),
  top_sellers JSONB,

  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_niches` (Niches suivies)
```sql
CREATE TABLE fw_niches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  keywords TEXT[],

  -- AI Insights
  ai_trend_score INT, -- 0-100
  ai_competition_level TEXT, -- low, medium, high
  ai_profit_potential TEXT, -- low, medium, high
  ai_recommendations TEXT,

  -- Tracking
  is_active BOOLEAN DEFAULT true,
  last_analyzed TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_competitors` (Compétiteurs suivis)
```sql
CREATE TABLE fw_competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  platform TEXT NOT NULL,
  store_name TEXT NOT NULL,
  store_url TEXT,

  -- Metrics (à sync périodiquement)
  total_listings INT,
  avg_rating DECIMAL(3,2),
  total_reviews INT,
  est_monthly_sales INT,

  -- Tracking
  is_active BOOLEAN DEFAULT true,
  last_synced TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_automation_workflows` (n8n workflows)
```sql
CREATE TABLE fw_automation_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  workflow_type TEXT, -- auto_list, price_update, inventory_sync, etc.

  -- n8n integration
  n8n_workflow_id TEXT,

  -- Config
  trigger_config JSONB,
  is_active BOOLEAN DEFAULT false,

  -- Stats
  last_run TIMESTAMP,
  total_runs INT DEFAULT 0,
  success_count INT DEFAULT 0,
  error_count INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `fw_ai_interactions` (Historique AI)
```sql
CREATE TABLE fw_ai_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  interaction_type TEXT NOT NULL, -- title_generation, description, keyword, trend_analysis
  prompt TEXT,
  response TEXT,

  -- Context
  related_product_id UUID,
  related_niche_id UUID,

  -- Feedback
  user_rating INT, -- 1-5 stars

  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 FONCTIONNALITÉS DÉTAILLÉES

### 1. 📊 DASHBOARD PRINCIPAL

**Gradient**: `from-blue-500 to-cyan-500`

#### KPIs en temps réel
- **Total Listings Actifs** (toutes plateformes)
- **Ventes ce mois** avec comparaison mois précédent
- **Profit total** et marge moyenne
- **Stock total** et alertes low stock
- **Vues totales** sur tous les listings

#### Charts
1. **Ventes par plateforme** (Pie chart)
2. **Évolution des profits** (Line chart - 30 jours)
3. **Top 10 produits** par profit (Bar chart)
4. **Performance par niche** (Bar chart)
5. **Taux de conversion** par plateforme (Bar chart)

#### Widgets AI
- **Recommandations du jour** (produits à sourcer, niches tendances)
- **Alertes intelligentes** (prix compétiteur changé, stock bas, etc.)
- **Quick Actions** (Créer listing, Rechercher produit, Calculer profit)

---

### 2. 📝 CRÉER/GÉRER LISTINGS

**Gradient**: `from-emerald-500 to-teal-600`

#### Créer un Nouveau Listing

**Flow en 3 étapes**:

##### Étape 1: Informations Produit
```
- Titre (avec bouton "✨ Générer avec AI")
- Description (éditeur riche + bouton AI)
- Catégorie
- Tags/Keywords (suggestions AI)
- Images (drag & drop + URL import)
```

##### Étape 2: Prix & Inventaire
```
- Prix coûtant
- Prix de vente suggéré (calcul auto des frais)
- Quantité disponible
- SKU (optionnel)
- Variantes (taille, couleur, etc.)
```

##### Étape 3: Sélection Plateformes
```
☐ eBay
  - Format: Auction / Buy It Now / Best Offer
  - Durée: 3, 5, 7, 10 jours
  - Catégorie eBay

☐ Etsy
  - Catégorie Etsy
  - Personalization options
  - Production time

☐ Amazon
  - ASIN (si existe)
  - Fulfillment: FBA / FBM
  - Condition

☐ Shopify
  - Collections
  - Product type
  - Vendor

☐ Facebook Marketplace
  - Location
  - Delivery method
```

**Bouton**: `Publier sur Plateformes Sélectionnées` → Appels API en parallèle

#### AI Features
1. **Générateur de titre optimisé SEO**
   - Analyse keywords
   - Suit les best practices par plateforme
   - Multiple variations

2. **Générateur de description**
   - Ton: Professionnel / Casual / Urgent
   - Longueur: Court / Moyen / Long
   - Include bullet points, émojis (optionnel)

3. **Suggestions de tags**
   - Basé sur catégorie + titre
   - Tags tendances dans la niche

4. **Analyse de prix compétitif**
   - Compare avec produits similaires
   - Suggère prix optimal
   - Alert si prix trop haut/bas

#### Liste des Listings

**Filtres**:
- Plateforme (multi-select)
- Status (draft, active, sold, ended)
- Date range
- Search (titre, SKU)

**Vue**:
- **Grid view** (cards avec image)
- **Table view** (compact, plus de données)

**Actions en masse**:
- Dupliquer vers autre plateforme
- Modifier prix en bulk
- Mettre fin aux listings
- Exporter (CSV/Excel)

**Par Listing**:
- Badge de plateforme (avec couleur)
- Thumbnail
- Titre
- Prix / Quantité / Ventes
- Status badge
- Actions: Edit, Duplicate, End, View Analytics

---

### 3. 🔍 RECHERCHE DE PRODUITS

**Gradient**: `from-purple-500 to-pink-500`

#### Interface de Recherche

**Barre de recherche centrale avec AI**:
```
"Chercher: montres intelligentes femmes"

[🤖 AI Mode activé]
```

**Filtres avancés**:
- **Plateformes**: eBay, Amazon, Etsy (multi-select)
- **Prix**: Min - Max
- **Condition**: Neuf, Occasion, Reconditionné
- **Localisation**: Pays/Région
- **Tri**: Pertinence, Prix, Ventes, Date

**Recherche par image** (upload ou URL):
- AI identifie le produit
- Trouve similaires sur marketplaces

#### Résultats

**Card par produit**:
```
┌─────────────────────────────────┐
│  [Image]         eBay           │
│                                 │
│  Apple Watch Series 9           │
│  $399.99                        │
│                                 │
│  💰 $180 profit estimé          │
│  📊 1,234 vendus/mois           │
│  ⭐ 4.8/5 (892 avis)            │
│                                 │
│  [Sourcer] [Calculer] [💾]     │
└─────────────────────────────────┘
```

**Données affichées**:
- Prix actuel
- Nombre de ventes (estimé avec API ou scraping)
- Rating moyen
- Nombre de vendeurs
- **Profit estimé** si on a sourcing product lié
- Bouton "Sourcer ce produit" → ouvre modal sourcing

#### Analytics par Recherche

**Graphiques**:
1. Distribution des prix (Histogram)
2. Top vendeurs (Bar chart)
3. Évolution des prix dans le temps (Line chart - si données historiques)

**AI Insights**:
```
🤖 "Cette niche est très compétitive avec 2,450 listings actifs.
    Le prix moyen est $42 avec une marge de ~35%.
    Recommandation: Focus sur la différenciation (bundle,
    garantie étendue) plutôt que le prix."
```

---

### 4. 🌏 SOURCING FOURNISSEURS

**Gradient**: `from-orange-500 to-red-600`

#### Recherche Multi-Plateforme

**Plateformes supportées**:
- AliExpress (API Dropshipping)
- Alibaba (scraping + manual API)
- DHGate (tracking API)
- Made-in-China (scraping)
- 1688.com (pour utilisateurs CN)

**Recherche intelligente**:
```
Option 1: Recherche par keyword
  "wireless earbuds"

Option 2: Importer depuis Recherche Produits
  → Prend automatiquement le titre/image du produit trouvé
  → Cherche équivalents sur plateformes sourcing

Option 3: Recherche par image
  → Upload image du produit
  → AI trouve matches
```

#### Résultats de Sourcing

**Card fournisseur**:
```
┌─────────────────────────────────────┐
│  [Images]          AliExpress       │
│                                     │
│  Wireless Earbuds TWS Bluetooth     │
│                                     │
│  💵 $3.20 - $4.80 /pièce            │
│  📦 Shipping: $1.20 (ePacket)       │
│  🔢 MOQ: 1 pièce                    │
│                                     │
│  Supplier: TechGadgets Pro          │
│  ⭐ 4.7/5 | 📊 15,234 commandes     │
│                                     │
│  [💰 Calculer Profit] [💾 Sauver]  │
│  [🔗 Voir sur AliExpress]          │
└─────────────────────────────────────┘
```

**Filtres**:
- Prix min/max
- MOQ (Minimum Order Quantity)
- Rating fournisseur min
- Pays d'expédition
- Shipping method
- Tri: Prix, Rating, Nombre commandes

#### Comparaison de Fournisseurs

**Vue tableau côte-à-côte** (jusqu'à 4 fournisseurs):
```
│                   │ Fournisseur A │ Fournisseur B │ Fournisseur C │
├───────────────────┼───────────────┼───────────────┼───────────────┤
│ Prix              │ $3.20         │ $3.80         │ $2.95         │
│ Shipping          │ $1.20         │ Free          │ $2.00         │
│ MOQ               │ 1             │ 10            │ 5             │
│ Rating            │ 4.7/5         │ 4.9/5         │ 4.3/5         │
│ Orders            │ 15,234        │ 8,901         │ 22,456        │
│ Shipping Time     │ 7-15 days     │ 10-20 days    │ 5-12 days     │
│ Total Cost        │ $4.40         │ $3.80         │ $4.95         │
```

**Bouton**: "Ajouter aux Favoris" → Sauvegarde dans `fw_sourcing_products`

#### AI Features

1. **Suggestions de négociation**:
   ```
   🤖 "Ce fournisseur a un MOQ de 10. Si vous commandez 50+ unités,
       vous pourriez négocier un prix de $3.00/pièce au lieu de $3.20"
   ```

2. **Analyse de fiabilité**:
   ```
   🤖 "Fournisseur vérifié avec excellent historique.
       Taux de dispute: 0.2% (très bon). Recommandé."
   ```

3. **Alertes de qualité**:
   ```
   ⚠️ "Attention: 3% des reviews mentionnent des problèmes de batterie"
   ```

---

### 5. 💰 CALCULATEUR DE PROFITS

**Gradient**: `from-green-500 to-emerald-600`

#### Interface Calculateur

**Mode 1: Quick Calculator**
```
┌─────────────────────────────────────┐
│  💰 CALCULATEUR DE PROFIT           │
├─────────────────────────────────────┤
│                                     │
│  Prix Coûtant: $__________          │
│  Shipping: $__________              │
│                                     │
│  Prix de Vente: $__________         │
│                                     │
│  Plateforme: [eBay ▼]               │
│  (frais auto-calculés)              │
│                                     │
├─────────────────────────────────────┤
│  📊 RÉSULTATS                       │
├─────────────────────────────────────┤
│  Coûts Totaux: $XX.XX               │
│    - Produit: $XX.XX                │
│    - Shipping: $XX.XX               │
│    - Frais eBay: $XX.XX (13%)       │
│    - PayPal/Stripe: $XX.XX (3%)     │
│                                     │
│  Revenue: $XX.XX                    │
│                                     │
│  ✅ PROFIT NET: $XX.XX              │
│  📈 Marge: XX%                      │
│  💹 ROI: XX%                        │
└─────────────────────────────────────┘

[💾 Sauvegarder] [📊 Voir Scénarios]
```

**Mode 2: Advanced Calculator**

Onglets:
1. **Coûts**
   - Prix produit
   - Shipping fournisseur → vous
   - Frais import/douanes (optionnel)
   - Emballage
   - Étiquettes/branding
   - Autres frais

2. **Plateforme**
   - Multi-select: eBay, Amazon, Etsy, Shopify, Facebook
   - Frais de listing
   - Commission plateforme (auto %)
   - Frais payment processor
   - Shipping client (vous → client)

3. **Projections**
   - Prix de vente
   - Volume ventes/mois projeté
   - Profit mensuel estimé

**Tableau comparatif multi-plateformes**:
```
│ Plateforme │ Prix Vente │ Frais Total │ Profit │ Marge │ ROI  │
├────────────┼────────────┼─────────────┼────────┼───────┼──────┤
│ eBay       │ $49.99     │ $8.20       │ $36.79 │ 73.6% │ 736% │
│ Amazon     │ $49.99     │ $10.50      │ $34.49 │ 69.0% │ 690% │
│ Etsy       │ $54.99     │ $9.15       │ $40.84 │ 74.3% │ 817% │
│ Shopify    │ $49.99     │ $4.50       │ $40.49 │ 81.0% │ 810% │
```

**Recommandation AI**:
```
🤖 "Shopify offre la meilleure marge (81%) mais nécessite du
    trafic. eBay est idéal pour démarrer rapidement.
    Stratégie recommandée: Lancer sur eBay pour valider la demande,
    puis migrer vers Shopify pour maximiser profits."
```

#### Historique des Calculs

Liste des calculs sauvegardés avec:
- Nom du produit
- Date
- Profit/Marge
- Plateformes comparées
- Actions: View, Duplicate, Delete

#### Scénarios "What-If"

```
Scénario 1: Prix actuel ($49.99)
  Profit: $36.79 | 200 ventes/mois = $7,358/mois

Scénario 2: Réduction 10% ($44.99)
  Profit: $31.79 | 280 ventes/mois (+40%) = $8,901/mois ✅

Scénario 3: Augmentation 10% ($54.99)
  Profit: $41.79 | 150 ventes/mois (-25%) = $6,268/mois
```

**AI recommande le Scénario 2** → Plus de profit total

---

### 6. 📦 INVENTAIRE MULTI-PLATEFORME

**Gradient**: `from-indigo-500 to-purple-500`

#### Dashboard Inventaire

**Vue d'ensemble**:
- Total SKUs
- Valeur totale inventaire
- Stock bas (< seuil)
- Produits inactifs (0 vente 30j)

**Liste Produits**:

**Colonnes**:
- Image
- Titre / SKU
- Quantité totale (somme de toutes plateformes)
- Breakdown par plateforme (badges)
- Ventes 30j
- Status (In Stock, Low Stock, Out of Stock)
- Actions

**Exemple row**:
```
┌────────────────────────────────────────────────────────────┐
│ [IMG] Apple Watch Band Leather                            │
│ SKU: AWB-001                                               │
│                                                            │
│ Qty: 47  [eBay: 20] [Amazon: 15] [Etsy: 12]              │
│                                                            │
│ 30d Sales: 23  Status: ✅ In Stock                        │
│                                                            │
│ [Edit] [Sync Now] [View History]                          │
└────────────────────────────────────────────────────────────┘
```

#### Sync Multi-Plateforme

**Auto-sync** (chaque heure par défaut):
- Fetch inventory from each platform API
- Update local database
- Detect discrepancies

**Manual sync**:
- Bouton "Sync All Platforms"
- Progress indicator par plateforme

**Smart Inventory Allocation**:
```
🤖 AI Suggestion:
"Vous avez 47 unités total. Basé sur les ventes:
  - eBay: 20 unités (43% des ventes)
  - Amazon: 15 unités (32% des ventes)
  - Etsy: 12 unités (25% des ventes)

  Redistribuer: eBay +5, Amazon +2, Etsy -7
  pour optimiser disponibilité."
```

#### Alertes Automatiques

1. **Low Stock Alert**:
   ```
   ⚠️ "SKU AWB-001 est sous le seuil (5 unités).
       Restock recommandé dans 7 jours."
   ```

2. **Out of Sync Alert**:
   ```
   🔄 "eBay listing #12345 montre 10 unités mais notre DB dit 8.
       Sync nécessaire."
   ```

3. **Dead Stock Alert**:
   ```
   💀 "5 produits sans vente depuis 60 jours.
       Envisager discount ou suppression."
   ```

---

### 7. 🎯 EXPLORATEUR DE NICHES

**Gradient**: `from-pink-500 to-rose-600`

#### Découvrir des Niches

**Méthodes de découverte**:

1. **AI Niche Generator**:
   ```
   Prompt: "Génère 10 niches profitables pour Q1 2025"

   Résultats:
   - 🎮 Gaming Accessories (Score: 87/100)
   - 🏋️ Home Fitness Equipment (Score: 82/100)
   - 🌱 Sustainable Living Products (Score: 79/100)
   - ...
   ```

2. **Trending Topics**:
   - Scrape Google Trends
   - Social media trends (TikTok, Instagram, Reddit)
   - Amazon Best Sellers categories

3. **Analyse Compétiteurs**:
   - Importer stores de compétiteurs
   - AI extrait patterns/niches

4. **Manual Search**:
   - Keyword-based
   - Category browser

#### Fiche de Niche

**Vue détaillée**:
```
┌─────────────────────────────────────────────────────────┐
│  🎮 Gaming Accessories                                  │
├─────────────────────────────────────────────────────────┤
│  📊 AI ANALYSIS                                         │
│                                                         │
│  Trend Score: 87/100 🔥                                │
│    → +35% recherches vs l'an dernier                   │
│                                                         │
│  Competition: Medium                                    │
│    → 12,450 sellers actifs                             │
│    → Top 10 contrôlent 25% du marché                   │
│                                                         │
│  Profit Potential: High                                 │
│    → Avg margin: 45%                                    │
│    → Avg selling price: $35                             │
│                                                         │
│  🎯 TOP KEYWORDS:                                       │
│    - gaming mouse pad                                   │
│    - rgb keyboard                                       │
│    - headset stand                                      │
│    - controller charging station                        │
│                                                         │
│  💡 AI RECOMMENDATIONS:                                 │
│  "Cette niche est en croissance avec l'esport.         │
│   Focus sur produits RGB (très demandé).               │
│   Éviter souris/claviers (très compétitif).            │
│   Opportunité: Accessoires de rangement gaming."       │
│                                                         │
│  📈 MARKET DATA:                                        │
│    - Avg monthly searches: 245K                         │
│    - Seasonality: Peak Nov-Dec (Noël)                  │
│    - Top platforms: Amazon (45%), eBay (30%)           │
│                                                         │
│  [🔍 Rechercher Produits] [🌏 Trouver Fournisseurs]   │
│  [💾 Suivre cette Niche] [📊 Voir Plus de Stats]      │
└─────────────────────────────────────────────────────────┘
```

#### Suivi de Niches

**Liste des niches suivies**:
- Nom + description
- Score AI (trend/competition/profit)
- Date dernier update
- Nombre de produits sourcés dans cette niche
- Actions: View, Re-analyze, Archive

**Notifications**:
```
🔔 "La niche 'Gaming Accessories' a vu une augmentation de
    15% de recherches cette semaine. C'est le moment de lister!"
```

---

### 8. 🕵️ ANALYSE COMPÉTITEURS (BONUS!)

**Gradient**: `from-cyan-500 to-blue-600`

#### Ajouter un Compétiteur

```
Plateforme: [eBay ▼]
Store Name/URL: _______________________
[Ajouter]
```

#### Dashboard Compétiteur

**Card par compétiteur**:
```
┌─────────────────────────────────────┐
│  🏪 TechDeals Pro                   │
│  eBay Store                         │
├─────────────────────────────────────┤
│  📊 METRICS                         │
│    - 1,234 listings actifs          │
│    - ⭐ 4.9/5 (8,920 reviews)       │
│    - ~$125K ventes/mois (estimé)    │
│                                     │
│  🔥 TOP PRODUCTS:                   │
│    1. Wireless Charger ($24.99)     │
│    2. Phone Case Bundle ($18.99)    │
│    3. USB-C Cable 3-Pack ($12.99)   │
│                                     │
│  💡 INSIGHTS:                       │
│  "Ce vendeur focus sur bundles.     │
│   Prix moyen: $21. Niche: Mobile    │
│   accessories. Lancé en 2019."      │
│                                     │
│  [📊 Voir Tous Produits]            │
│  [🔔 Alertes Changements]           │
└─────────────────────────────────────┘
```

#### Alertes Compétiteurs

- **Nouveau produit** listé
- **Changement de prix** sur produit suivi
- **Promotion** détectée
- **Review négatif** (opportunité!)

#### Analyse Comparative

**Votre store vs Compétiteur**:
```
│ Metric              │ Vous    │ TechDeals Pro │ Diff    │
├─────────────────────┼─────────┼───────────────┼─────────┤
│ Avg Rating          │ 4.7     │ 4.9           │ -0.2    │
│ Response Time       │ 8h      │ 2h            │ -6h ⚠️  │
│ Active Listings     │ 87      │ 1,234         │ -1,147  │
│ Avg Price           │ $32     │ $21           │ +$11 ⚠️ │
│ Shipping Time       │ 3-5d    │ 1-2d          │ -2d ⚠️  │
```

**AI Recommendations**:
```
🤖 "Vos prix sont 50% plus élevés. Si qualité similaire,
    envisager réduction. Votre temps de réponse est lent:
    activer auto-réponses. Shipping: considérer fulfillment
    service pour égaler 1-2j."
```

---

### 9. 🤖 ASSISTANT IA CENTRAL

**Gradient**: `from-violet-500 to-purple-600`

#### Chat Interface

**Widget flottant** (disponible sur toutes les pages):
```
┌─────────────────────────────────┐
│  🤖 FoxWise AI Assistant        │
├─────────────────────────────────┤
│                                 │
│  Bot: Salut! Comment puis-je    │
│       t'aider aujourd'hui?      │
│                                 │
│  You: Trouve-moi des produits   │
│       tendance dans le fitness  │
│                                 │
│  Bot: 🔍 Recherche en cours...  │
│       J'ai trouvé 12 produits   │
│       prometteurs:              │
│       1. Resistance Bands Set   │
│       2. Yoga Mat with Lines    │
│       3. ...                    │
│       [Voir Résultats Complets] │
│                                 │
├─────────────────────────────────┤
│  [Type your message...]    [↑]  │
└─────────────────────────────────┘
```

#### Commandes AI

**Exemples de prompts**:
- "Génère un titre optimisé pour ce produit"
- "Analyse la profitabilité de cette niche"
- "Trouve des fournisseurs pour [product name]"
- "Compare ces 3 compétiteurs"
- "Quelle plateforme est meilleure pour ce produit?"
- "Crée un bundle avec ces produits"
- "Suggère des mots-clés pour [category]"
- "Alerte-moi si [competitor] baisse ses prix"

#### Actions Automatiques

AI peut déclencher:
1. Recherche de produits
2. Calcul de profit
3. Génération de contenu
4. Comparaison de fournisseurs
5. Création de workflow automation

#### Historique & Favoris

- Historique des conversations
- Sauvegarder prompts utiles
- Rating des réponses AI (feedback loop)

---

### 10. ⚡ AUTOMATION (n8n Integration)

**Gradient**: `from-amber-500 to-orange-600`

#### Workflows Pré-configurés

**Templates disponibles**:

1. **Auto-List New Products**:
   - Trigger: Nouveau produit dans sourcing favoris
   - Actions:
     - Générer titre/description AI
     - Calculer prix optimal
     - Créer listings sur plateformes sélectionnées
     - Notifier par email

2. **Price Monitor & Adjust**:
   - Trigger: Chaque jour à 9h
   - Actions:
     - Check prix compétiteurs
     - Si baisse détectée → ajuster prix (match ou -5%)
     - Update sur toutes plateformes
     - Log changes

3. **Inventory Sync**:
   - Trigger: Chaque heure
   - Actions:
     - Fetch inventory from all platforms
     - Sync quantities
     - Alert si discrepancy

4. **Low Stock Alert**:
   - Trigger: Inventory < threshold
   - Actions:
     - Email alert
     - Add to restock list
     - Suggest supplier contact

5. **Sales Report**:
   - Trigger: Chaque lundi 8h
   - Actions:
     - Compile ventes semaine passée
     - Générer PDF report
     - Email to user

#### Créer un Workflow Custom

**Workflow Builder** (simplifié):
```
1. Trigger:
   [When ▼] [New Sale ▼] [on Platform ▼] [eBay ▼]

2. Conditions:
   [If ▼] [Product Category ▼] [equals ▼] [Electronics ▼]

3. Actions:
   + Add Action
     [Update Inventory ▼]
     [Send Email ▼]
     [Run AI Analysis ▼]
     [Call Webhook ▼]

[💾 Save] [▶️ Test] [🚀 Activate]
```

**Lien avec n8n**:
- Bouton "Open in n8n" → ouvre n8n dans nouvel onglet
- n8n webhooks pour triggers
- Store n8n workflow IDs dans DB

#### Logs & Monitoring

**Dashboard automations**:
- Liste workflows actifs
- Dernière exécution
- Success rate
- Error logs
- Bouton pause/play

---

### 11. 📈 ANALYTICS AVANCÉS

**Gradient**: `from-teal-500 to-cyan-600`

#### Dashboard Analytics

**Date Range Selector**: 7d / 30d / 90d / 1y / Custom

**KPIs détaillés**:
1. **Revenue & Profit**
   - Total revenue
   - Total profit
   - Avg order value
   - Profit margin %
   - Évolution vs période précédente

2. **Ventes**
   - Total orders
   - Orders par plateforme
   - Conversion rate
   - Avg time to sale

3. **Performance Produits**
   - Best sellers (top 10)
   - Worst performers
   - ROI par produit
   - Sell-through rate

4. **Platformes**
   - Revenue par plateforme
   - Profit margin par plateforme
   - Fees comparison
   - Recommandations AI

**Charts**:
1. Revenue/Profit over time (Line chart combo)
2. Sales by Platform (Stacked bar chart)
3. Top Products by Revenue (Bar chart)
4. Category Performance (Pie chart)
5. Hourly Sales Pattern (Heatmap)
6. Geographic Sales Map (si données)
7. Customer Acquisition Cost (si marketing data)

#### Export Reports

**Formats**:
- PDF (formatted report with charts)
- Excel (raw data + charts)
- CSV (data only)

**Scheduled Reports**:
- Email auto à intervalle défini
- Weekly/Monthly business summaries

---

### 12. 🔗 GESTION CONNEXIONS API

**Gradient**: `from-gray-500 to-slate-600`

#### Connexion Plateformes

**Liste plateformes supportées**:

```
┌─────────────────────────────────────┐
│  eBay                               │
│  Status: ✅ Connecté                │
│  Store: TechDealsUSA                │
│  Last Sync: Il y a 5 min            │
│  [⚙️ Paramètres] [🔄 Re-sync]      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Amazon                             │
│  Status: ⚠️ Token expire dans 2j    │
│  [🔑 Renouveler]                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Shopify                            │
│  Status: ❌ Non connecté            │
│  [➕ Connecter]                     │
└─────────────────────────────────────┘
```

#### Setup Instructions

**Pour chaque plateforme**, modal avec:
1. **Pré-requis**: Ce dont tu as besoin
2. **Step-by-step guide**: Screenshots
3. **API Credentials Form**:
   - API Key
   - API Secret
   - Additional params (selon plateforme)
4. **Test Connection**: Bouton pour valider
5. **Permissions**: Checkboxes pour read/write/delete

#### Webhooks Configuration

**eBay example**:
```
Setup webhooks pour notifications temps réel:
☐ Order Paid
☐ Order Shipped
☐ Item Sold
☐ Item Ended
☐ Return Requested

Webhook URL: https://foxwise.app/api/webhooks/ebay
Secret: ••••••••••••
```

---

## 🎨 SUGGESTIONS SUPPLÉMENTAIRES (Features qui démarquent)

### 13. 📸 BULK IMAGE EDITOR (Bonus)

- Uploader images produit
- AI background removal
- Add watermark/logo
- Resize for platform requirements
- Batch processing

### 14. 🎁 BUNDLE CREATOR (Bonus)

- Sélectionner plusieurs produits
- AI suggère prix bundle optimal
- Créer listing bundle sur plateformes
- Track performance bundles vs single items

### 15. 📧 EMAIL MARKETING (Intégration future)

- Importer customer emails (si permis par plateforme)
- Campagnes promotionnelles
- Abandoned cart recovery (Shopify)
- Templates pré-faits

### 16. 📱 MOBILE APP (Phase 2)

- React Native
- Notifications push (new sale, low stock)
- Quick listing creation (photo + AI)
- Dashboard read-only

### 17. 🌐 MULTI-LANGUE & MULTI-DEVISE

- Interface en français/anglais
- Support CAD, USD, EUR, GBP
- Auto currency conversion
- Localized platform features

### 18. 🎓 LEARNING CENTER

- Video tutorials
- Best practices guides
- Success stories
- Community forum

---

## 🔐 SÉCURITÉ & CONFORMITÉ

### API Keys Storage
- Encrypted at rest (AES-256)
- Never sent to client
- Supabase Row Level Security

### GDPR / Privacy
- User data export
- Account deletion
- Privacy policy
- Terms of service

### Rate Limiting
- API calls throttled per platform limits
- Queue system pour bulk operations
- Error handling & retry logic

---

## 📊 BUSINESS MODEL (Suggestions)

### Tiers de Subscription

**Free Tier**:
- 1 plateforme connectée
- 10 listings max
- 50 recherches/mois
- Basic analytics
- AI: 100 générations/mois

**Pro Tier** ($29/mois):
- 5 plateformes
- 500 listings
- Recherches illimitées
- Advanced analytics
- AI: 1000 générations/mois
- Automation: 5 workflows
- Priority support

**Enterprise Tier** ($99/mois):
- Plateformes illimitées
- Listings illimités
- Tout illimité
- AI illimité
- Automation illimitée
- White-label option
- Dedicated account manager

---

## 🚀 PLAN D'IMPLÉMENTATION

### Phase 1 (MVP - 2 semaines)
- [ ] Setup projet (copy from FoxWise Client)
- [ ] Database schema complet
- [ ] Auth avec Clerk
- [ ] Dashboard avec KPIs basiques
- [ ] Créer Listing (1 plateforme - eBay)
- [ ] Intégration eBay API
- [ ] AI Title/Description generator (OpenAI)
- [ ] Profit Calculator basique

### Phase 2 (Core Features - 3 semaines)
- [ ] Product Research (eBay + Amazon)
- [ ] Sourcing (AliExpress API)
- [ ] Multi-platform listing (eBay, Etsy, Amazon, Shopify)
- [ ] Inventory Management
- [ ] Charts & Analytics
- [ ] AI Assistant chat

### Phase 3 (Advanced - 2 semaines)
- [ ] Niche Explorer
- [ ] Competitor Analysis
- [ ] n8n Automation integration
- [ ] Bulk operations
- [ ] Export features (PDF/Excel)

### Phase 4 (Polish - 1 semaine)
- [ ] Mobile responsive refinement
- [ ] Performance optimization
- [ ] Error handling
- [ ] User onboarding flow
- [ ] Documentation

### Phase 5 (Bonus Features)
- [ ] Bundle Creator
- [ ] Image Editor
- [ ] Email Marketing
- [ ] Advanced AI features
- [ ] Mobile app

---

## 🎯 PROCHAINES ÉTAPES

1. **Validation du plan**: Tu approuves ce plan? Des ajustements?
2. **Priorités**: Quelles features sont MUST-HAVE pour MVP?
3. **APIs**: Tu as déjà des comptes développeur sur eBay/Amazon/etc?
4. **Démarrage**: Je commence par le schema DB + structure projet?

**On peut démarrer immédiatement dès que tu valides!** 🚀
