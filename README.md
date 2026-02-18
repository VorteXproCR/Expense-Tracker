# Expense Tracker - MERN Stack Application

A personal finance tool for recording, reviewing, and filtering expenses with support for unreliable network conditions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
# Configure .env file (MongoDB URI)
npm run dev
```

The backend runs on `http://localhost:5001`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── src/
│   │   ├── config/db.js         # MongoDB connection
│   │   ├── controllers/         # Route handlers
│   │   ├── middleware/         # Idempotency handling
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API routes
│   │   └── app.js              # Express app
│   ├── .env                    # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # API service
│   │   ├── App.jsx
│   │   └── App.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Custom CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **API:** RESTful JSON API

## 🔑 Key Design Decisions

### 1. MongoDB for Persistence
**Reason:** As requested by the student, MongoDB was chosen. It's well-suited for document-based data like expenses and provides flexibility for schema evolution.

### 2. Idempotency Keys for Network Resilience
**Implementation:** Every POST request requires an `X-Idempotency-Key` header.

**Why:** In unreliable network conditions, users may experience:
- Slow responses leading to duplicate clicks
- Page refreshes after submission
- Failed requests that get retried

By generating a unique idempotency key for each form submission and checking on the server if it already exists, we prevent duplicate expense entries. This is critical for financial data.

### 3. Amount Storage in Paisa (Cents)
**Implementation:** Amounts are stored as integers (paisa = rupee × 100)

**Why:** Floating-point arithmetic with decimals can lead to precision errors:
```javascript
// Problem with floats
0.1 + 0.2 === 0.3  // false!

// Solution: store as integers
100 + 200 === 300   // true
```

### 4. Client-Side Retry with Exponential Backoff
**Implementation:** The API service retries failed requests up to 3 times with increasing delays (500ms, 1000ms, 2000ms).

**Why:** Network failures are common in "real-world conditions." Exponential backoff prevents overwhelming the server while giving transient failures time to recover.

### 5. Custom CSS (No Tailwind)
**Reason:** As per requirements, using plain CSS helps understand the fundamentals and keeps the codebase more portable. The dark theme with green accents provides a clean, modern aesthetic.

## ⚖️ Trade-offs Due to Timebox

### What Was Implemented
- ✅ Create expense with validation
- ✅ List expenses with filtering and sorting
- ✅ Category filter
- ✅ Date sorting (newest/oldest first)
- ✅ Total display (updates with filters)
- ✅ Idempotency for retry handling
- ✅ Error and loading states
- ✅ Form validation
- ✅ Delete functionality
- ✅ Responsive design

### What Was Not Implemented (Would Add in Production)

1. **Automated Tests**
   - No unit or integration tests included
   - Would add Jest + React Testing Library for unit tests
   - Would add Supertest for API integration tests

2. **Authentication**
   - No user auth (assumes single-user personal use)
   - Would add JWT auth for multi-user support

3. **Pagination**
   - All expenses loaded at once
   - Would add server-side pagination for large datasets

4. **Edit Functionality**
   - Only create and delete implemented
   - Would add PUT /api/expenses/:id for updates

5. **Category Summary View**
   - Nice-to-have feature not included
   - Would show total per category

6. **Input Sanitization**
   - Basic validation only
   - Would add more robust XSS protection in production

## 🔧 API Endpoints

### POST /api/expenses
Create a new expense (idempotent).

**Headers:**
```
Content-Type: application/json
X-Idempotency-Key: <unique-key>
```

**Body:**
```json
{
  "amount": 150.50,
  "category": "Food",
  "description": "Lunch with team",
  "date": "2024-01-15"
}
```

### GET /api/expenses
Get all expenses with optional filtering.

**Query Parameters:**
- `category` - Filter by category (optional)
- `sort` - Sort order: `date_desc` or `date_asc`

**Example:** `GET /api/expenses?category=Food&sort=date_desc`

### DELETE /api/expenses/:id
Delete an expense by ID.

## 🎯 Acceptance Criteria Status

- ✅ User can create a new expense entry with amount, category, description, and date
- ✅ User can view a list of expenses
- ✅ User can filter expenses by category
- ✅ User can sort expenses by date (newest first)
- ✅ User can see a simple total of expenses for the current list
- ✅ Handles network retries gracefully (idempotency + retry logic)
- ✅ Basic validation prevents negative amounts and requires date

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
NODE_ENV=development
```

---

Built with care for production-like quality while keeping the feature set focused.

