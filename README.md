# Restful Booker Playwright Project

A complete end‑to‑end automation framework combining **UI + API testing** with **Playwright + TypeScript + POM**, including mocking, parallel execution, reusable API client, reports, and CI integration.

---

## 🚀 Tech Stack
- **Playwright** (Chromium, Firefox, WebKit)
- **TypeScript**
- **Page Object Model (POM)**
- **Allure Reports + Playwright HTML Report**
- **GitHub Actions CI**
- **dotenv for environment configs**

---

## 📁 Project Structure
```
project/
│ playwright.config.ts
│ .env
│ README.md
│
├── tests/
│   ├── ui/
│   ├── api/
│   └── integration/
│
├── pages/
│   ├── loginPage.ts
│   ├── bookingPage.ts
│   └── contactPage.ts
│
├── utils/
│   └── apiClient.ts
│
└── fixtures/
```

---

## 🧱 Core Features

### ✅ Playwright + TypeScript + POM
- Clean separation of page actions
- Reusable locators and workflow methods

### ✅ Mock Network Calls
Use `page.route()` to mock booking list, errors, or server outages.

### ✅ Screenshot on Failure
Configured in `playwright.config.ts` under `use: { screenshot: 'only-on-failure' }`.

### ✅ Trace File Generation
Traces automatically recorded:
```
npx playwright show-trace trace.zip
```

### ✅ beforeEach / afterEach Hooks
- Open/close pages
- Prepare session
- Cleanup bookings
- Attach screenshots & traces

### ✅ Environment Variables
- `BASE_URL`
- `ADMIN_USER`
- `ADMIN_PASS`

Loaded via **dotenv**.

### ✅ Parallel Execution
Enabled via workers in Playwright config.

### ✅ API + UI Combined Testing
- Reuse API client for setup & teardown
- Create a booking via API → verify in UI
- Delete booking via API after test

### ✅ Reusable API Client (`utils/apiClient.ts`)
Supports:
- **GET**
- **POST**
- **PUT**
- **PATCH**
- **DELETE**

### ✅ API Tests Included in Test Suite
Registered in Playwright config under multiple projects.

### ✅ Mock API Responses
Simulate:
- 500 Internal Server Error
- Empty response
- Slow responses for timeout testing

### ✅ Reporting
- **HTML report** built‑in
- **Allure** via `allure-playwright`

### Generate reports:
```
npx allure generate ./allure-results --clean
npx allure open
```

### ✅ GitHub Actions CI
Includes:
- Checkout
- Install Node & dependencies
- Playwright install browsers
- Run UI + API tests
- Upload test results & artifacts

---

## 🎯 What You Test

### **UI Application**
`https://automationintesting.online/`

#### Login
- Valid credentials
- Invalid credentials
- Empty fields
- Locked user

#### Booking Flow
- Create a booking
- Validate required fields
- Wrong date format
- Parallel booking attempts

#### Popups
- Handle popup alerts and log message text

#### iframe Handling
- Contact form is inside an iframe

#### Screenshots
- Capture after success
- Capture automatically on failures

#### Trace Recordings
- View interaction history to debug failed tests

---

### **API Application**
`https://restful-booker.herokuapp.com/apidoc/`

| Method | Action |
|--------|--------|
| POST /auth | Create token |
| GET /booking/:id | Fetch booking |
| POST /booking | Create booking |
| PUT /booking/:id | Full update |
| PATCH /booking/:id | Partial update |
| DELETE /booking/:id | Delete booking |

#### Combined Scenarios
- Create booking via API → verify in UI
- Modify booking → assert UI reflects change
- Mock API to simulate server crash → validate UI retry behavior

---

## 📦 Installation
```
npm install
npx playwright install
```

---

## ▶️ Running Tests
### Run all tests
```
npx playwright test
```

### Run UI tests only
```
npx playwright test tests/ui
```

### Run API tests
```
npx playwright test tests/api
```

### Show HTML Report
```
npx playwright show-report
```

---

## 🛠️ Commands for Debugging
Run in headed mode:
```
npx playwright test --headed
```

Record trace for one test:
```
npx playwright test --trace on
```

View trace:
```
npx playwright show-trace trace.zip
```

---

## 🧪 CI – GitHub Actions
Includes:
- Node setup
- Install dependencies
- Install browsers
- Run tests in parallel
- Upload reports & traces as artifacts

---

## ✅ Summary
This Playwright framework covers:
- UI + API + Integration testing
- Mocking
- Race condition testing
- Parallel execution
- Environment configs
- Screenshots & tracing
- Clean reusable architecture
- Full CI/CD pipeline

❓ Need Assistance?
For any inquiries or collaboration opportunities, feel free to reach out:

Email: Alaa.abdellal@gmail.com

LinkedIn: Alaa Abdelaal

GitHub: Alaa94Said