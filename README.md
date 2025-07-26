# Krishi Maitri - Farmer Digital Platform

A comprehensive digital platform built with Vue.js to empower farmers with modern tools and services for better agricultural practices and improved livelihoods.

## 🌾 Features

### Core Features
- **Landing Page**: Hero section with farmer-focused messaging and service highlights
- **User Authentication**: Mobile-based OTP login/signup with multi-language support
- **Dashboard**: Personalized farmer dashboard with weather updates, quick actions, and agricultural news
- **Services**: Comprehensive agricultural services including soil testing, expert consultations, and equipment rental
- **Market Prices**: Real-time crop prices with filtering and search capabilities
- **Community Forum**: Farmer discussion platform with categories and expert replies
- **Profile Management**: User profile with service history and language preferences

### Design Features
- **Responsive Design**: Mobile-first approach optimized for smartphones and tablets
- **Agriculture Theme**: Earthy color palette with green (#4CAF50) as primary color
- **Clean Typography**: Poppins and Roboto fonts for excellent readability
- **Minimal Icons**: Agriculture-themed icons throughout the interface
- **Accessibility**: Proper contrast ratios and semantic HTML structure

## 🚀 Technology Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **Routing**: Vue Router 4
- **Styling**: Tailwind CSS with custom color palette
- **Icons**: Heroicons and custom SVG icons
- **Build Tool**: Vite
- **Languages**: JavaScript/HTML/CSS

## 🎨 Design System

### Color Palette
- **Primary**: Green (#4CAF50) - Trust, growth, nature
- **Secondary**: White (#FFFFFF) - Clean, minimal
- **Accent**: Beige (#F4F4F4) - Warm, earthy
- **Brown**: #8D6E63 - Soil, earth connection
- **Earth Tones**: 50-900 scale for various UI elements

### Typography
- **Headings**: Poppins, Bold, 18-24px
- **Body Text**: Roboto/Poppins, Regular, 14-16px
- **Small Text**: 12-14px for captions and metadata

## 📱 Pages & Features

### 1. Landing Page (`/`)
- Hero section with call-to-action
- Service highlights (Advisory, Market Prices, Government Schemes)
- Statistics section
- Footer with contact information

### 2. Login/Signup (`/login`)
- Mobile number-based authentication
- OTP verification system
- Multi-language support (9 Indian languages)
- Profile information collection for new users

### 3. Dashboard (`/dashboard`)
- Weather widget with location-based data
- Quick action cards for services
- Agricultural news ticker
- Recent services and farming tips

### 4. Services (`/services`)
- Service grid with pricing
- Booking modal with date/time selection
- Service categories: Soil Testing, Expert Advice, Equipment Rental, etc.
- How it works section

### 5. Market Prices (`/market-prices`)
- Real-time crop prices table
- Advanced filtering (crop type, state, market)
- Price trends and alerts
- Mobile-optimized price cards

### 6. Community Forum (`/community`)
- Discussion categories
- Ask question functionality
- Expert-verified answers
- Featured discussions

### 7. Profile (`/profile`)
- User information management
- Service history
- Language preferences
- Recent activity tracking

## 🛠️ Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AppHeader.vue   # Navigation header
│   └── AppFooter.vue   # Site footer
├── views/              # Page components
│   ├── LandingPage.vue # Home page
│   ├── Login.vue       # Authentication
│   ├── Dashboard.vue   # User dashboard
│   ├── Services.vue    # Services listing
│   ├── MarketPrices.vue# Price information
│   ├── Community.vue   # Forum
│   └── Profile.vue     # User profile
├── router/             # Vue Router configuration
│   └── index.js        # Route definitions
├── style.css           # Global styles
└── main.js            # Application entry point
```

## 🌍 Multi-language Support

The platform supports 9 Indian languages:
- English
- Hindi (हिंदी)
- Bengali (বাংলা)
- Telugu (తెలుగు)
- Tamil (தமிழ்)
- Marathi (मराठी)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Punjabi (ਪੰਜਾਬੀ)

## 📱 Mobile-First Approach

The application is designed with mobile users as the primary audience:
- Touch-friendly interface elements
- Responsive grid layouts
- Mobile-optimized navigation
- Swipe-friendly components
- Optimized loading times

## 🔐 Authentication System

- Phone number-based registration
- OTP verification for security
- Persistent login state
- Profile completion flow
- Route guards for protected pages

## 🎯 Target Audience

- **Primary**: Small and medium-scale farmers
- **Secondary**: Agricultural students and researchers
- **Tertiary**: Agricultural service providers

---

**Krishi Maitri** - Empowering farmers through digital innovation 🌾
