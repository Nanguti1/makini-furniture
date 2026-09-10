# Makini Queens Furniture Frontend Implementation Plan

## Purpose

This document is the single source of truth for the frontend implementation.

## Goals

- Build an Inertia.js + React frontend on the existing Laravel backend.
- Keep business logic on the server.
- Reuse existing routes/controllers.
- Premium furniture experience.

## Tech Stack

- Inertia.js
- React + TypeScript
- Tailwind CSS
- Wayfinder
- Laravel web routes (no REST API)

## Architecture

### Layouts
- Store
- Account
- Admin

### Pages
- Home
- Catalog
- Product
- Cart
- Wishlist
- Account
- Orders
- Reviews
- Lookbooks
- CMS

### Shared Components
- Buttons
- Cards
- Forms
- Product cards
- Filters
- Pagination
- Navigation
- Footer
- Modals
- Toasts

### Rules
- Never calculate prices client-side.
- Never duplicate inventory logic.
- Prefer reusable components.
- Strong TypeScript typing.
- Responsive and accessible.

## Phases

### Phase 1: Foundation
- Set up Inertia.js with React and TypeScript
- Configure Tailwind CSS
- Set up Wayfinder for route generation
- Create base layouts (Store, Account, Admin)
- Set up React context for user state and cart
- Configure error handling and loading states
- Set up TypeScript types from backend models

### Phase 2: Design System
- Create color palette (earth tones, premium accents)
- Typography system (headings, body, UI text)
- Button components (primary, secondary, outline, ghost)
- Form components (inputs, selects, textareas, checkboxes)
- Card components (base, product, content)
- Badge and tag components
- Loading states and skeletons
- Icon system integration

### Phase 3: Homepage
- Hero section with featured products
- Featured collections grid
- Banner carousel from backend
- Featured products section
- Lookbook preview
- Newsletter signup
- Footer integration
- Responsive layout optimization

### Phase 4: Catalog
- Product grid with filters
- Category navigation sidebar
- Filter components (price, material, finish, color, room)
- Sort functionality
- Pagination with Inertia
- Product card components
- Breadcrumb navigation
- Search integration
- Empty states

### Phase 5: Product Detail
- Product image gallery with zoom
- Product information display
- Variant selection (options, colors, materials)
- Add to cart functionality
- Product specifications display
- Related products section
- Reviews summary and list
- Availability and stock display
- Wishlist integration

### Phase 6: Cart
- Cart items list with quantity controls
- Product variant display
- Price calculations (server-side)
- Remove item functionality
- Cart summary with totals
- Continue shopping button
- Proceed to checkout button
- Empty cart state
- Guest cart handling

### Phase 7: Wishlist
- Wishlist items grid
- Add to cart from wishlist
- Remove from wishlist
- Merge wishlists functionality
- Share wishlist
- Empty wishlist state
- Wishlist item details

### Phase 8: Account
- Account overview/dashboard
- Profile management (settings routes)
- Address management (CRUD operations)
- Default address selection
- Address form validation
- Navigation between account sections

### Phase 9: Orders
- Order history list with pagination
- Order detail view
- Order status display
- Order items with quantities
- Order totals breakdown
- Shipping and billing addresses
- Reorder functionality
- Order tracking

### Phase 10: Reviews
- Customer reviews list
- Review submission form
- Rating display (stars)
- Eligible products for review
- Review editing and deletion
- Verified purchase badges
- Review pagination
- Review statistics

### Phase 11: Lookbooks
- Lookbook gallery grid
- Lookbook detail view
- Lookbook items with products
- Product links from lookbook
- Pagination
- Lookbook filters

### Phase 12: CMS
- Page rendering (about, terms, etc.)
- FAQ display with categories
- FAQ search and filtering
- Page sections rendering
- Navigation from CMS content
- SEO metadata handling

### Phase 13: Polish
- Performance optimization
- Image lazy loading
- Loading states refinement
- Error boundary implementation
- Toast notifications system
- Modal dialog system
- Accessibility audit and fixes
- Responsive design refinement
- Cross-browser testing
- Mobile touch optimizations
- SEO improvements
- Analytics integration

## Definition of Done

Each phase compiles, is responsive, uses existing backend, and introduces no duplicated business logic.
