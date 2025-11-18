# 🦊 FoxWise E-Commerce

**The Ultimate Multi-Platform E-Commerce Management App**

FoxWise E-Commerce is a powerful Next.js application designed to streamline and automate e-commerce operations across multiple platforms. Manage your eBay, Amazon, Shopify, Etsy, Facebook Marketplace, Discogs, and in-person sales from one central hub - all powered by AI.

---

## ✨ Features

### 🎯 Currently Implemented

- ✅ **Beautiful Dashboard** - Complete overview with KPIs, charts, and platform breakdowns
- ✅ **Multi-Platform Support** - eBay, Amazon, Shopify, Etsy, Facebook Marketplace, Discogs, In-Person
- ✅ **Platform Management** - Connect and configure all your selling platforms
- ✅ **Dark Theme UI** - Stunning gradient-based design matching FoxWise suite
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Type-Safe** - Full TypeScript implementation
- ✅ **Database Schema** - Complete PostgreSQL schema for all features

### 🚧 Coming Soon

- 🔜 **Listing Creator** - Create listings with AI-generated titles and descriptions
- 🔜 **Product Research** - Search and analyze products across marketplaces
- 🔜 **Sourcing Tools** - Find suppliers on AliExpress, Alibaba, DHgate
- 🔜 **Profit Calculator** - Compare profitability across platforms
- 🔜 **Inventory Management** - Auto-sync stock levels between platforms
- 🔜 **Niche Explorer** - AI-powered niche discovery and trend analysis
- 🔜 **Analytics** - Detailed performance reports and insights
- 🔜 **Smart Automation** - Auto-pricing, auto-relisting, low stock alerts

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database)
- Clerk account (for authentication)
- Platform API credentials (eBay, Amazon, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hash23code/FoxWise_e-commerce.git
   cd FoxWise_e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_secret

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

   # OpenAI (for AI features)
   OPENAI_API_KEY=your_openai_key
   ```

4. **Setup database**

   Run the SQL schema in your Supabase project:
   ```bash
   # Copy contents of database_schema_ecommerce.sql
   # and run in Supabase SQL Editor
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3020](http://localhost:3020)

---

## 🏗️ Architecture

### Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Authentication:** Clerk
- **Database:** Supabase (PostgreSQL)
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Project Structure

```
FoxWise_e-commerce/
├── app/
│   ├── (dashboard)/           # Protected routes
│   │   ├── dashboard/         # Main dashboard
│   │   ├── listings/          # Listing management
│   │   ├── research/          # Product research
│   │   ├── sourcing/          # Supplier sourcing
│   │   ├── profit-calculator/ # Profit calculations
│   │   ├── inventory/         # Inventory management
│   │   ├── niches/            # Niche explorer
│   │   ├── analytics/         # Analytics & reports
│   │   ├── platforms/         # Platform connections
│   │   └── settings/          # App settings
│   ├── api/                   # API routes (coming soon)
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   └── Sidebar.tsx            # Navigation sidebar
├── lib/
│   └── supabase.ts            # Supabase client
├── types/
│   └── index.ts               # TypeScript definitions
├── database_schema_ecommerce.sql  # Database schema
└── ECOMMERCE_PLAN.md         # Detailed implementation plan
```

---

## 🗄️ Database Schema

The app uses PostgreSQL with the following main tables:

- **fw_users** - User accounts
- **fw_platforms** - Connected platforms (eBay, Amazon, etc.)
- **fw_products** - Master product catalog
- **fw_listings** - Platform-specific listings
- **fw_sales** - Order/sales records
- **fw_sourcing_products** - Supplier products from AliExpress, etc.
- **fw_profit_calculations** - Profit calculations
- **fw_niches** - Tracked niches
- **fw_competitors** - Competitor tracking
- **fw_ai_interactions** - AI usage history
- **fw_automation_rules** - Smart automation rules
- **fw_notifications** - User notifications

See `database_schema_ecommerce.sql` for complete schema.

---

## 🎨 Design System

FoxWise E-Commerce follows the same design language as the FoxWise suite:

- **Dark theme** - Pure black background (#0a0a0a)
- **Gradient cards** - Each section has unique gradients
- **Smooth animations** - Framer Motion transitions
- **Responsive** - Mobile-first design
- **Platform colors** - Each platform has its brand color

### Platform Gradients

- **Listings:** `from-emerald-500 to-teal-600`
- **Research:** `from-purple-500 to-pink-500`
- **Sourcing:** `from-orange-500 to-red-600`
- **Profit Calc:** `from-green-500 to-emerald-600`
- **Inventory:** `from-indigo-500 to-purple-500`
- **Niches:** `from-pink-500 to-rose-600`
- **Analytics:** `from-teal-500 to-cyan-600`
- **Platforms:** `from-amber-500 to-orange-600`

---

## 🔌 Platform Integration

### Supported Platforms

| Platform | Status | API Available | Notes |
|----------|--------|---------------|-------|
| eBay | 🟡 Planned | ✅ Yes | Full Trading API |
| Amazon | 🟡 Planned | ✅ Yes | SP-API required |
| Shopify | 🟡 Planned | ✅ Yes | Admin API |
| Etsy | 🟡 Planned | ✅ Yes | Open API v3 |
| Facebook Marketplace | 🟡 Planned | ⚠️ Limited | Graph API |
| Discogs | 🟡 Planned | ✅ Yes | Discogs API |
| In-Person | ✅ Ready | N/A | Manual entry |

### Getting API Credentials

See the **Platforms** page in the app for detailed guides on obtaining API credentials for each platform.

---

## 🤖 AI Features

FoxWise E-Commerce is **AI-first**:

- **Title Generation** - SEO-optimized, platform-specific titles
- **Description Writer** - Compelling product descriptions
- **Keyword Suggestions** - Trending keywords for your category
- **Pricing Recommendations** - Optimal pricing based on market data
- **Niche Discovery** - Find profitable niches automatically
- **Trend Analysis** - AI analyzes market trends
- **Competitor Insights** - Understand what competitors are doing
- **Smart Alerts** - Get notified when action is needed

Powered by OpenAI GPT-4 (or Claude - configurable).

---

## 📊 Dashboard Features

The main dashboard provides:

- **Total Listings** - Active and draft counts
- **Revenue & Profit** - Real-time totals with trends
- **Inventory Value** - Total stock value + low stock alerts
- **Platform Breakdown** - Performance by platform
- **Sales Trends** - 7-day sales and profit charts
- **Quick Actions** - Jump to common tasks
- **Platform Status** - See all connected platforms at a glance

---

## 🛠️ Development

### Commands

```bash
npm run dev      # Start development server (port 3020)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding a New Page

1. Create page in `app/(dashboard)/your-page/page.tsx`
2. Add route to `components/Sidebar.tsx`
3. Update types in `types/index.ts` if needed
4. Create API route in `app/api/your-route/route.ts`

---

## 🗺️ Roadmap

### Phase 1: MVP (Weeks 1-2) ✅
- [x] Project setup and infrastructure
- [x] Database schema
- [x] Authentication with Clerk
- [x] Dashboard with mock data
- [x] Platform management UI
- [x] Responsive sidebar navigation

### Phase 2: Core Features (Weeks 3-5)
- [ ] Listing creator with AI
- [ ] eBay API integration
- [ ] Product research tool
- [ ] Sourcing (AliExpress)
- [ ] Profit calculator
- [ ] Basic inventory management

### Phase 3: Advanced (Weeks 6-7)
- [ ] Multi-platform listing
- [ ] Inventory sync across platforms
- [ ] Niche explorer with AI
- [ ] Analytics dashboard
- [ ] Competitor tracking

### Phase 4: Automation (Week 8)
- [ ] Smart automation rules
- [ ] Auto-pricing
- [ ] Low stock alerts
- [ ] Automated relisting
- [ ] Background jobs (webhooks)

### Phase 5: Polish & Launch (Week 9)
- [ ] Performance optimization
- [ ] Error handling & logging
- [ ] User onboarding flow
- [ ] Documentation
- [ ] Beta testing

---

## 📝 License

Private project - All rights reserved

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by Shadcn/ui
- Icons from [Lucide](https://lucide.dev/)
- Charts with [Recharts](https://recharts.org/)

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ by the FoxWise team**
