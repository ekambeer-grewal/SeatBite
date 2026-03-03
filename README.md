# seatBite

> **Stadium food delivery — right to your seat.**

SeatBite is a full-stack food ordering and delivery app built for stadiums. Fans browse a menu, add items to their cart, and place an order from their phone without leaving their seat. Delivery staff get a real-time desktop dashboard showing incoming orders with seat locations and shortest-path navigation to the customer. Built in 30 hours at a hackathon.

---

## ✨ Features

### Customer Side (Mobile)
- Role selection on launch — Order or Deliver
- Email/password authentication with error snackbars
- Browse a full stadium menu with images, calories, and protein info
- Tap any item to open a detail popup with full description and nutrition
- Add to cart with automatic quantity increment for duplicate items
- Remove items from cart individually
- Subtotal, 7% tax, and total calculation in real time
- Enter name and seat number at checkout
- Order confirmation page with full itemized receipt

### Delivery Side (Desktop)
- Live order dashboard showing all pending orders with customer name, seat, and item count
- Full order detail view — items, quantities, and prices
- Interactive stadium map for seat navigation
- One-click Order Complete button that deletes the order from Firestore and removes it from the dashboard instantly

### Stadium Map (Interactive SVG)
- Visual SVG stadium layout with 4 sections — A, B, C, D
- 4 concession stands positioned in each corner — Con1, Con2, Con3, Con4
- Input a seat number to highlight it on the map
- Seats highlighted in yellow when selected
- Path seats highlighted in red showing the route to the nearest concession
- Connected to the Python pathfinding backend via REST API

### Pathfinding Backend (Python)
- Flask REST API that accepts a seat number and returns the shortest path to the nearest concession connector
- Supports sections A, B, C, D with 3 rows and 5 columns each
- Compares left and right traversal paths and returns the shorter one
- Exposed via `/get_path` POST endpoint

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend (Customer & Delivery) | React + Vite |
| Stadium Map | React + SVG |
| Styling | Inline styles + CSS modules |
| Routing | React Router v6 |
| State Management | React useState + useContext |
| Auth | Firebase Authentication (Email/Password) |
| Database | Firebase Firestore |
| Hosting | Firebase Hosting |
| Pathfinding Backend | Python + Flask |
| Path Algorithm | Custom shortest-path traversal |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm
- Python 3.8+
- A Firebase project

### Frontend Installation

```bash
# Clone the repo
git clone https://github.com/ekambeer-grewal/SeatBite.git
cd SeatBite

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Stadium Map (Standalone)

The stadium map lives in its own Vite app under `/stadium_program/frontend`:

```bash
cd stadium_program/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Backend Installation

```bash
# Install Python dependencies
pip install flask numpy

# Run the Flask server
python server.py
```

The backend runs on `http://localhost:5000`.

### Firebase Setup

1. Go to [firebase.google.com](https://firebase.google.com) and create a new project
2. Enable **Firestore Database** in test mode
3. Enable **Authentication** with Email/Password
4. Copy your Firebase config

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Deploy Frontend

```bash
npm run build
firebase login
firebase init
firebase deploy
```

---

## 🗂️ Project Structure

```
/src
  /assets                        → Food images, background, logo, stadium map
  /shared
    /firebase
      firebaseConfig.js          → Firebase initialization and exports
  App.jsx                        → Route definitions
  main.jsx                       → React entry point
  index.css                      → Global styles
  UserTypeContext.jsx            → Role-based context (order vs deliver)
  Onboarding.jsx                 → Role selection screen
  Splash.jsx                     → Splash screen with navigation buttons
  Login.jsx                      → Login with snackbar error handling
  signUp.jsx                     → Sign up with password confirmation
  home.jsx                       → Customer menu grid (2-column)
  MenuCard.jsx                   → Menu item card + bottom sheet popup
  ShoppingCart.jsx               → Cart with checkout popup
  confirmation.jsx               → Order confirmation page
  homeDelivery.jsx               → Delivery dashboard
  deliveryOrder.jsx              → Order detail + complete action

  /stadium_program
    /frontend
      /src
        App.jsx                    → Stadium map entry point
        stadium.jsx                → Interactive SVG stadium map
        stadium.css                → Stadium map styles
        main.jsx                   → Stadium app entry point
        index.css                  → Stadium global styles
        App.css                    → Stadium app styles
    /backend
      AppBase.py                       → Pathfinding algorithm (shortest path to seat)
      server.py                        → Flask API server
```

---

## 🗃️ Firestore Schema

```
/Menu
  {documentId}
    Name: string
    Description: string
    Calories: number
    Protein: number
    Price: number

/carts
  {userId}              ← Firebase Auth UID as document ID
    userName: string    ← Set at checkout
    seatNumber: string  ← Set at checkout
    items: [
      {
        id: string
        name: string
        calories: number
        protein: number
        price: number
        quantity: number
      }
    ]
```

---

## 🔁 App Flow

```
Onboarding (role selection)
  ├── Order
  │     └── Splash → Login / Sign Up → Home (menu) → Cart → Checkout → Confirmation
  └── Deliver
        └── Splash → Login / Sign Up → Delivery Dashboard → Order Detail → Stadium Map → Complete Order
```

---

## 🧭 Pathfinding API

The Python backend exposes a POST endpoint that takes a seat number and returns the shortest path from that seat to the nearest concession connector.

**Endpoint:** `POST /get_path`

**Request:**
```json
{ "seat": "A03" }
```

**Response:**
```json
{
  "status": "success",
  "seat": "A03",
  "path": ["A01", "A02", "A03", "Con1"]
}
```

**Seat format:** One letter (A–D) + two digits (01–15), e.g. `B07`, `C12`

**Stadium Layout:**

```
  [Con1]   [Section A]   [Con2]
  [Section D]  [Field]  [Section B]
  [Con4]   [Section C]   [Con3]
```

**Concession Connectors:**
- `Con1` — top-left, connects sections A and D
- `Con2` — top-right, connects sections A and B
- `Con3` — bottom-right, connects sections B and C
- `Con4` — bottom-left, connects sections C and D

---

## 🔒 Security

Firebase Authentication protects all Firestore operations. Firestore rules require users to be signed in:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

All Firebase credentials are stored in `.env` and excluded from version control via `.gitignore`.

---

## 🔮 What's Next

- [ ] Stripe payment integration before order confirmation
- [ ] Real-time order status pushed to customer (Preparing → On the way → Delivered)
- [ ] Connect pathfinding backend to live seat map with animated route overlay
- [ ] Push notifications when order is picked up
- [ ] QR code scanning to auto-fill seat number
- [ ] Multi-stadium support with configurable layouts

---

## 👥 Team

Built at a hackathon in 36 hours.

- [ekambeer-grewal](https://github.com/ekambeer-grewal)
- [marshall-kirk](https://github.com/marshall-kirk)
- [Angeloote901](https://github.com/Angeloote901)
- [dr-chicken-minus](https://github.com/dr-chicken-minus)

---
