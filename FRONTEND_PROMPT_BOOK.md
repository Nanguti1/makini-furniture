# Makini Queens Furniture — Frontend Prompt Book

## How to use

Run these prompts sequentially.

Before each prompt, read the existing project and Frontend Implementation Plan, then continue from the current implementation.

### Rules for every prompt
- Use React + TypeScript + Inertia.
- Use Tailwind CSS.
- Use existing Laravel routes and Wayfinder.
- Do not modify backend business logic unless required for an existing frontend integration.
- Do not create unnecessary APIs, dependencies, abstractions, or duplicate functionality.
- Keep implementation simple, responsive, accessible, and production-ready.
- Do not implement features assigned to later prompts.
- Verify the application builds successfully before finishing.

---

## Prompt 01 — Frontend Foundation

Continue the Makini Queens Furniture frontend implementation.

Implement:
- React/TypeScript frontend structure
- StoreLayout
- Header/navigation shell
- Footer
- Responsive page container
- Global page structure

Use the existing Laravel/Inertia setup and Wayfinder routes.

Do not implement page-specific shopping features.

Done when the layout works on desktop/mobile and the application builds successfully.

---

## Prompt 02 — Design System & Shared UI

Continue from the previous prompt.

Implement the core reusable UI components:

- Button
- Input
- Select
- Badge
- Card
- Modal
- Drawer
- Skeleton
- EmptyState
- Pagination
- Form/error states

Use Tailwind CSS and TypeScript.

Keep the visual language premium, modern, minimal, and consistent.

Do not implement page-specific features.

Done when the components are reusable and the application builds successfully.

---

## Prompt 03 — Homepage

Continue from the previous prompts.

Implement the Makini Queens Furniture homepage.

Include:
- Hero section
- Featured categories
- Featured products
- Promotional/content sections
- Furniture collections
- Clear calls to action

Use existing product/category data and routes where available.

Focus on strong visual hierarchy, premium presentation, responsive design, and conversion.

Do not build catalog, cart, account, or checkout functionality here.

---

## Prompt 04 — Product Catalog

Continue from the previous prompts.

Implement the furniture catalog/shop page.

Include:
- Product grid
- Category navigation
- Product cards
- Price/display information
- Pagination
- Loading/empty states
- Responsive mobile layout

Use existing backend data and Wayfinder routes.

Keep the catalog fast, clean, and visually consistent.

Do not implement advanced search/filter behavior beyond what already exists.

---

## Prompt 05 — Search & Filtering

Continue from the catalog implementation.

Implement frontend search and filtering.

Include:
- Product search
- Category filtering
- Price filtering where supported
- Sorting
- Clear filters
- Pagination state
- Mobile-friendly filter drawer

Use existing Laravel routes/query parameters and Wayfinder.

Keep URL state and UI state synchronized where appropriate.

Do not redesign the backend search system.

---

## Prompt 06 — Product Detail

Continue from the previous prompts.

Implement the product detail page.

Include:
- Product image gallery
- Product name
- Price
- Description
- Available options/variants
- Quantity selector
- Add to cart
- Wishlist action
- Product availability
- Related/recommended products

Use existing backend data and routes.

Make the page premium, responsive, and focused on purchasing.

Do not implement the full cart or checkout flow here.

---

## Prompt 07 — Cart

Continue from the product detail implementation.

Implement the shopping cart experience.

Include:
- Cart item list
- Product image/details
- Quantity controls
- Remove item
- Subtotal
- Order summary
- Empty cart state
- Continue shopping
- Proceed to checkout

Use the existing cart/order functionality and routes.

Handle loading, validation, and error states cleanly.

Do not implement the complete checkout/account flow here.

---

## Prompt 08 — Wishlist

Continue from the previous prompts.

Implement the wishlist frontend.

Include:
- Wishlist page
- Saved product grid
- Remove item
- Add/move item to cart
- Empty wishlist state
- Authentication-aware behavior

Use existing wishlist routes and backend functionality.

Reuse the existing product cards and UI components.

Do not duplicate wishlist logic in the frontend.

---

## Prompt 09 — Customer Account

Continue from the previous prompts.

Implement the customer account area.

Include:
- Account dashboard
- Profile information
- Account navigation
- Authentication states
- Logout
- Responsive account layout

Use existing Laravel authentication and routes.

Keep the account area simple and consistent with the store design.

Do not implement order/address/review screens yet.

---

## Prompt 10 — Orders & Addresses

Continue from the customer account implementation.

Implement:

### Orders
- Order history
- Order details
- Order status
- Order items
- Order totals

### Addresses
- Address list
- Add address
- Edit address
- Delete address
- Default address

Use existing backend models, validation, and Wayfinder routes.

Handle form validation and error states properly.

Do not change backend business rules.

---

## Prompt 11 — Reviews

Continue from the previous prompts.

Implement the product review experience.

Include:
- Review list
- Rating display
- Review form
- Rating input
- Review submission
- User's own review state
- Empty/loading/error states

Use existing review functionality and authentication.

Keep reviews integrated naturally into the product detail page.

Do not create duplicate review logic.

---

## Prompt 12 — Checkout

Continue from the cart and account implementation.

Implement the checkout experience.

Include:
- Customer information
- Address selection
- Order summary
- Payment method selection based on existing backend support
- Validation/error states
- Order submission
- Success/confirmation state

Use existing Laravel checkout/order/payment functionality and Wayfinder.

Do not invent payment integrations or backend behavior.

Keep checkout simple, clear, and mobile-friendly.

---

## Prompt 13 — CMS / Content Pages

Continue from the previous prompts.

Implement frontend presentation for existing CMS/content functionality.

Include only content supported by the current backend, such as:
- About
- Contact
- Furniture collections
- Lookbooks
- Promotional content
- Static informational pages

Reuse the existing layout and shared components.

Do not build a separate CMS system in the frontend.

---

## Prompt 14 — Responsive UX & Polish

Continue from the complete frontend implementation.

Audit the entire storefront for:

- Mobile responsiveness
- Tablet layouts
- Desktop layouts
- Navigation behavior
- Spacing
- Typography
- Product image presentation
- Loading states
- Empty states
- Error states
- Forms
- Modals/drawers
- Buttons and interactions
- Accessibility basics
- Visual consistency

Fix issues you find without introducing unnecessary abstractions or dependencies.

Preserve the established design language.

---

## Prompt 15 — Final Frontend Audit

Perform a final production-readiness audit of the Makini Queens Furniture frontend.

Check:

- All frontend routes
- Navigation
- Product browsing
- Search/filtering
- Product detail
- Cart
- Wishlist
- Authentication
- Account
- Orders
- Addresses
- Reviews
- Checkout
- CMS/content pages
- Responsive behavior
- Error/loading/empty states
- TypeScript errors
- Build errors
- Broken links
- Console errors

Fix only real issues found.

Do not rewrite working code or introduce unnecessary architecture.

Finish with a clean production build.
