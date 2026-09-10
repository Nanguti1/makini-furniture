# Makini Queens Furniture — Admin Prompt Book

## Overview

This document contains the implementation prompts for building the Makini Queens Furniture Administration Panel.

The storefront has already been completed. The backend administration infrastructure (routes, controllers, requests, policies, models, etc.) already exists.

The goal of these prompts is to implement a modern React + Inertia administration interface without changing the existing backend architecture.

---

# General Rules

For every prompt:

- Read the existing Laravel project before making changes.
- Continue from the previous implementation.
- Reuse existing components whenever possible.
- Use React + TypeScript + Inertia.
- Use Tailwind CSS.
- Use existing Laravel routes and Wayfinder.
- Use existing controllers, validation, policies and models.
- Do not rewrite working backend logic.
- Do not create duplicate APIs.
- Do not introduce unnecessary abstractions.
- Keep the implementation simple, responsive and production-ready.
- Build reusable admin components.
- Verify the application builds successfully before completing each prompt.

The administration panel should have a premium SaaS-style experience similar to Shopify, Stripe Dashboard or Linear.

---

# Prompt 01 — Admin Foundation

Continue the Makini Queens Furniture implementation.

Implement the administration frontend foundation.

Create:

- AdminLayout
- Sidebar
- Top navigation
- Breadcrumbs
- Page container
- Responsive layout
- Authentication-aware admin shell
- Shared admin utilities

Use the existing admin routes.

Do not implement any CRUD pages yet.

Done when:

- Admin layout works on desktop and tablet.
- Navigation uses existing routes.
- Application builds successfully.

---

# Prompt 02 — Admin Design System

Continue from Prompt 01.

Implement reusable admin UI components.

Include:

- Button
- Icon Button
- Input
- Select
- Textarea
- Checkbox
- Switch
- Badge
- Alert
- Modal
- Drawer
- Dropdown
- Tooltip
- Tabs
- Card
- Stat Card
- Skeleton
- Empty State
- Pagination
- Loading Spinner
- Confirm Dialog

Build reusable:

- DataTable
- Filters
- Search Bar
- Bulk Action Bar

Keep styling modern, minimal and consistent.

Do not build management pages.

---

# Prompt 03 — Dashboard

Continue from the previous prompts.

Implement the admin dashboard.

Include:

- Sales overview
- Revenue summary
- Orders summary
- Customers summary
- Products summary
- Low stock summary
- Recent orders
- Recent customers
- Quick actions
- Dashboard cards

Use existing backend data where available.

Do not invent analytics.

---

# Prompt 04 — Categories, Brands & Collections

Implement management pages for:

- Categories
- Brands
- Collections

Each module should support:

- Listing
- Search
- Filtering
- Create
- Edit
- Delete
- Status
- Bulk actions

Reuse shared DataTable components.

---

# Prompt 05 — Product Families

Implement Product Family management.

Include:

- List
- Create
- Edit
- Delete
- Search
- Filtering
- Bulk actions

Use existing backend functionality.

---

# Prompt 06 — Products

Implement complete product management.

Include:

- Product list
- Search
- Filters
- Sorting
- Pagination
- Product details
- Create
- Edit
- Delete
- Draft/Published status
- Featured status

Reuse shared forms and components.

Do not duplicate backend logic.

---

# Prompt 07 — Product Variants, Inventory & Media

Continue product management.

Implement:

Product Variants

- CRUD
- Variant options
- SKU
- Pricing

Inventory

- Stock management
- Inventory status
- Low stock indicators

Media

- Image gallery
- Upload
- Remove
- Reorder
- Featured image

Use existing backend support.

---

# Prompt 08 — Merchandising

Implement:

- Homepage banners
- Featured products
- Featured collections
- Lookbooks

Support:

- CRUD
- Sorting
- Visibility
- Scheduling where supported

Reuse existing components.

---

# Prompt 09 — Orders

Implement order management.

Include:

- Orders table
- Search
- Filters
- Order detail
- Customer information
- Items
- Payments
- Shipping
- Status updates
- Timeline
- Notes if supported

Do not modify checkout logic.

---

# Prompt 10 — Customers

Implement customer management.

Include:

- Customer list
- Customer detail
- Addresses
- Orders
- Reviews
- Wishlist overview (if supported)

Provide read-only access where editing is not supported.

---

# Prompt 11 — CMS

Implement administration for:

- Pages
- FAQs

Support:

- CRUD
- Draft
- Published
- Search
- Filtering

Reuse the shared editor components.

---

# Prompt 12 — Store Settings

Implement settings pages.

Include existing backend configuration only.

Examples:

- Store information
- Contact information
- Branding
- Homepage settings
- Social links

Do not invent new settings.

---

# Prompt 13 — Administration UX Polish

Audit the entire administration interface.

Improve:

- Responsive layouts
- Forms
- Validation
- Loading states
- Empty states
- Error states
- Data tables
- Bulk actions
- Navigation
- Accessibility
- Visual consistency

Do not rewrite working code.

---

# Prompt 14 — Final Admin Audit

Perform a production readiness audit.

Verify:

- Admin routes
- Navigation
- Dashboard
- Products
- Categories
- Brands
- Collections
- Product Families
- Inventory
- Media
- Merchandising
- Orders
- Customers
- CMS
- Settings
- TypeScript
- Build
- Console
- Responsive layouts
- Error handling
- Loading states
- Empty states

Fix only genuine issues.

Do not introduce unnecessary architecture.

Finish with a clean production build.