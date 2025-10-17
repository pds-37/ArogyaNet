# AarogyaNet - Health Surge Prediction Platform

> *"Predicting tomorrow's health challenges, empowering today's decisions"*

AarogyaNet is a multi-role, multi-agent health surge prediction and coordination platform that predicts hospital patient surges using AI and real-time data (AQI, weather, festivals, historical patterns) to enable proactive healthcare resource management.

![AarogyaNet](https://img.shields.io/badge/Status-Active-success)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

---

## 🌟 Features

### 🏥 Hospital Dashboard
- **Real-time Surge Prediction**: Input AQI, weather, festival data to predict patient surges
- **Confidence Scoring**: ML-powered predictions with confidence levels (LOW/MEDIUM/HIGH)
- **Resource Planning**: Automated recommendations for extra doctors, nurses, beds, and supplies
- **Downloadable Reports**: Export predictions and resource plans as PDFs
- **Government Coordination**: Share critical data with government authorities

### 🛡️ Government Dashboard
- **Regional Monitoring**: Track surge status across multiple hospitals
- **Advisory Creation**: Generate and publish multi-lingual health advisories
- **Hospital Status Map**: Visual representation of regional health capacity
- **Resource Allocation**: Coordinate emergency resource distribution
- **Alert Management**: View and manage published advisories

### ❤️ NGO Dashboard
- **Volunteer Coordination**: Track and assign volunteers to high-priority areas
- **Supply Inventory**: Monitor stocks of masks, PPE, oxygen, medical supplies
- **Advisory Feed**: Real-time updates on active health alerts
- **Task Management**: Assign and track volunteer activities
- **Priority Alerts**: Respond to critical shortage situations

### 👥 Public Portal
- **Live AQI Monitoring**: Real-time air quality index for your area
- **Health Advisories**: Receive area-specific health warnings and guidance
- **SMS/Email Alerts**: Subscribe to notifications for your region
- **Safety Guidelines**: Access public health recommendations
- **Emergency Contacts**: Quick access to helpline numbers

---

## 🚀 Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### State & Routing
- **React Router v6** - Client-side routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend (Planned)
- **FastAPI (Python)** - REST API
- **PostgreSQL** - Structured data storage
- **Redis** - Caching layer
- **Supabase/Lovable Cloud** - Auth & backend services

### ML Pipeline (Planned)
- **scikit-learn** - RandomForest model for surge prediction
- **Prophet** - Time series forecasting
- **Feature Engineering** - AQI, weather, festival flags, lag features

---

## 📦 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **bun**

### Setup

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd aarogyanet
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

---

## 🎯 Usage

### 1. Landing Page
- Visit the homepage to see project overview
- Click **"Access Your Dashboard"** to proceed to authentication

### 2. Authentication Flow
**Step 1: Identity Selection**
- Choose your role: Hospital, Government, NGO, or Public
- Each role has a unique dashboard with specific features

**Step 2: Sign In/Register**
- Enter email and password
- Toggle between login and registration
- Selected role is displayed with confirmation

### 3. Role-Based Dashboards

#### Hospital Workflow
1. Enter prediction inputs (AQI, temperature, humidity, baseline patients, festival)
2. Click **"Run Prediction"**
3. View surge prediction results with confidence score
4. Review resource recommendations (doctors, nurses, beds)
5. Download PDF report or send to government

#### Government Workflow
1. Monitor hospital status across regions
2. Create health advisories using templates
3. Generate multi-lingual messages (English, Hindi, Marathi)
4. Publish to subscribed citizens via SMS/email/web
5. Allocate resources to high-surge hospitals

#### NGO Workflow
1. View active volunteer assignments
2. Track supply inventory levels
3. Respond to active health advisories
4. Mobilize teams for high-priority areas
5. Request additional supplies when needed

#### Public Workflow
1. Check current AQI for your area
2. Read active health advisories
3. Subscribe to SMS/email alerts
4. Follow safety guidelines
5. Access emergency helplines

---

## 📂 Project Structure

```
aarogyanet/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn UI components
│   ├── hooks/
│   │   ├── use-mobile.tsx   # Mobile detection hook
│   │   └── use-toast.ts     # Toast notifications
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── Landing.tsx      # Landing page with quote & CTA
│   │   ├── Auth.tsx         # 2-step auth flow
│   │   ├── Hospital.tsx     # Hospital dashboard
│   │   ├── Government.tsx   # Government dashboard
│   │   ├── NGO.tsx          # NGO dashboard
│   │   ├── Public.tsx       # Public portal
│   │   └── NotFound.tsx     # 404 page
│   ├── App.tsx              # Main app with routing
│   ├── index.css            # Global styles & design tokens
│   └── main.tsx             # App entry point
├── public/
│   └── robots.txt
├── index.html
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── package.json
└── README.md
```

---

## 🎨 Design System

### Color Palette
```css
/* Primary - Medical Teal (Trust & Healthcare) */
--primary: 188 95% 35%

/* Accent - Amber (Alerts & Warnings) */
--accent: 43 96% 56%

/* Success - Green (Safe Status) */
--success: 142 76% 36%

/* Warning - Orange (Caution Status) */
--warning: 38 92% 50%

/* Destructive - Red (Critical Status) */
--destructive: 0 84% 60%
```

### Surge Level Indicators
- 🟢 **LOW** (< 20% surge) - Green badge
- 🟡 **MEDIUM** (20-40% surge) - Yellow badge
- 🔴 **HIGH** (> 40% surge) - Red badge

### Design Principles
- Clean, medical-professional aesthetic
- Data-focused with prominent metrics
- Role-specific color coding
- Responsive and accessible
- Smooth animations and transitions

---

## 🔮 Future Enhancements

### Phase 1: Backend Integration
- [ ] FastAPI REST API implementation
- [ ] PostgreSQL database with historical data
- [ ] User authentication with JWT
- [ ] Role-based access control (RBAC)

### Phase 2: ML Model
- [ ] Train RandomForest model on historical data
- [ ] Feature engineering (lag features, event flags)
- [ ] Model serving via API endpoint
- [ ] SHAP explainability for predictions

### Phase 3: Real-time Integrations
- [ ] Live AQI API (OpenAQ, IQAir)
- [ ] Weather API (OpenWeatherMap)
- [ ] SMS notifications (Twilio)
- [ ] Email service (SendGrid/EmailJS)
- [ ] WebSocket for real-time updates

### Phase 4: Advanced Features
- [ ] Interactive map with heatmaps (Mapbox)
- [ ] 7-day prediction trends with charts
- [ ] Hospital capacity dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered full-stack development
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Inspired by real-world health surge challenges during festivals and pollution events

---

## 📞 Contact & Support

- **Project Link**: [GitHub Repository](YOUR_REPO_URL)
- **Live Demo**: [AarogyaNet Demo](YOUR_DEPLOYMENT_URL)
- **Issues**: [GitHub Issues](YOUR_REPO_URL/issues)

---

## 🎯 Impact & Vision

AarogyaNet aims to transform reactive healthcare into **proactive healthcare** by:
- Predicting patient surges **before they happen**
- Enabling hospitals to **prepare resources in advance**
- Empowering governments to **issue timely public health advisories**
- Supporting NGOs in **coordinating volunteer relief efforts**
- Keeping citizens **informed and safe**

**Together, we can build a healthier, more prepared society.** 🌟

---

Made with ❤️ for better healthcare coordination
