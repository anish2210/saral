# PRODUCT_SCOPE.md

## Product Name
Tutor Fee Tracking Platform (Saral)

---

## 1. PRODUCT GOAL (NON-NEGOTIABLE)

The platform exists to solve **one problem only**:

> Enable local tuition tutors to clearly track which students have paid fees and which have not, without chasing payments.

If a feature does not directly support this goal, it is **out of scope**.

---

## 2. CORE PRINCIPLES (LOCKED)

1. Tutors are the **only paying users**
2. Tutors are the **only authenticated users**
3. Students and parents are **not users**
4. The platform **does not process money**
5. No receipts or invoices in MVP
6. Subscription-only revenue model
7. Manual > automated in MVP
8. Product first, landing page later
9. **Mobile-first UI design** (most tutors use mobile phones)

---

## 3. USER ROLES (STRICT)

### 3.1 Tutor (ONLY authenticated role)
- Signs up and signs in
- Manages students
- Tracks payment status
- Pays subscription to platform

### 3.2 Student / Parent (Viewer only)
- No account
- No authentication
- Access via secure read-only link
- Can only view payment status

❌ No admin dashboards exposed  
❌ No student/parent accounts  
❌ No additional roles in MVP  

---

## 4. AUTHENTICATION (FINAL)

### Authentication Provider
- **Clerk** is used for all authentication

### Enabled Auth Methods
- Google OAuth
- Email OTP

### Clerk Responsibilities
- Identity verification
- Session management
- OAuth / OTP handling

### Platform Responsibilities
- User authorization
- Subscription enforcement
- Feature access control

> Authentication ≠ Authorization

---

## 5. ONBOARDING FLOW

1. User authenticates via Clerk
2. Redirect to onboarding screen
3. Collect:
   - Tutor name
   - Phone number (if missing)
4. Create Tutor record in platform database
5. Start 14-day free trial

No role selection.  
Every authenticated user is a tutor.

---

## 6. PAYMENT PHILOSOPHY

### Important
- Platform does **not** collect, process, or verify student payments
- Payments are made **directly to tutors**
- Platform only tracks **payment status**

### Supported Payment Methods (Status Only)
- Cash
- UPI (QR / UPI ID)

❌ No payment gateways for students  
❌ No automatic confirmations  
❌ No refunds  
❌ No disputes  

---

## 7. STUDENT PAYMENT VIEW (READ-ONLY)

Each student has a unique public link:/p/{public_token}


### This page shows:
- Tutor name
- Student name
- Monthly fee
- Month-wise payment status
- Payment method (Cash / UPI)
- Status: Paid / Pending

### Restrictions:
- Read-only
- No edits
- No uploads
- No marking payments

### Mandatory Disclaimer:
> “Payment status is updated by the tutor.  
> This platform does not process or verify payments.”

---

## 8. PAYMENT STATUS RULES

### Status Values
- Pending
- Paid

### Source of Truth
- Tutor manually marks status
- Platform never validates payments

---

## 9. RECEIPTS & INVOICES (EXCLUDED)

❌ No receipt generation  
❌ No invoices  
❌ No GST  
❌ No downloadable proof  

Only internal **payment history records** are stored for tutors.

---

## 10. SUBSCRIPTION MODEL (TUTORS ONLY)

### Revenue Model
- Subscription-only
- No commission
- No per-transaction charges

### Plans (MVP)
| Plan | Price | Student Limit |
|----|----|----|
| Solo | ₹399 / month | 25 |
| Pro | ₹699 / month | 75 |
| Institute | ₹1,499 / month | 200 |

No unlimited plans.

---

## 11. SUBSCRIPTION FLOW

### Trial
- 14-day free trial
- Full access
- No payment required

### Subscription Payment (MVP)
- Manual UPI payment to platform
- Tutor clicks “I’ve Paid”
- Admin manually verifies
- Plan activated manually

### Subscription States
- Trial
- Active
- Grace (restricted actions)
- Locked (read-only)

### Expiry Rules
- Data is never deleted
- Viewing is always allowed
- Adding students / marking payments is restricted after expiry

---

## 12. ADMIN (INTERNAL ONLY)

Admin capabilities:
- View tutors
- Verify subscription payments
- Activate / extend plans
- Override student limits if required

❌ No analytics dashboards  
❌ No automated billing  

---

## 13. DATA MODEL (MVP LEVEL)

### Tutor
- id
- clerk_user_id
- name
- phone
- plan_type
- student_limit
- trial_expiry
- plan_expiry

### Student
- id
- tutor_id
- name
- phone
- monthly_fee
- public_token

### PaymentRecord
- id
- student_id
- month
- amount
- status (Paid / Pending)
- method (Cash / UPI)
- marked_at

---

## 14. EXPLICITLY OUT OF SCOPE (DO NOT BUILD)

- Payment gateways for student payments
- Receipts or invoices
- Attendance tracking
- Class schedules
- Chat or messaging
- Parent or student accounts
- Notifications (SMS / WhatsApp automation)
- Analytics or charts
- Mobile applications
- Landing pages or SEO pages
- Blogs or content marketing
- AI features
- Multi-tutor institutes under one account

If a feature is not listed as **IN SCOPE**, it is **OUT OF SCOPE**.

---

## 15. TECH STACK (LOCKED)

### Product
- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: Clerk
- Deployment: Separate frontend & backend
- UI Approach: Mobile-first responsive design

### Landing Page
❌ Not part of MVP  
❌ To be built later using Next.js

---

## 16. DEVELOPMENT RULES (FOR AI / LLM USAGE)

When using AI for development:
1. Do not introduce new user roles
2. Do not automate payments
3. Do not add receipts or invoices
4. Do not extend scope beyond this file
5. Default to the simplest implementation

If uncertain:
> Follow this document strictly.

---

## 17. MVP SUCCESS CRITERIA

The MVP is successful if:
- Tutors use it for at least 2 consecutive months
- Tutors rely on it for fee tracking
- Tutors request additional features

Failure indicators:
- Feature bloat
- Premature automation
- Low tutor retention

---

## 18. FINAL STATEMENT

This MVP is intentionally minimal.

Speed, clarity, and real-world usage matter more than completeness.

**Build this first. Everything else comes later.**
