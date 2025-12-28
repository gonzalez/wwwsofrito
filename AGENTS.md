# AGENTS.md

This file contains guidelines for agentic coding agents working in this repository.

## Build/Lint/Test Commands

### Development Workflow
- Open `index.html` directly in browser for development
- No build process required - static files
- Use live browser refresh for testing changes
- Test responsive design at different viewport sizes

### Testing
- Manual testing in browser (no automated tests currently)
- Test filter functionality (All Items, Books, Posters)
- Test "Add to Cart" buttons and toast notifications
- Verify mobile responsiveness at 768px and 480px breakpoints

### Code Quality
- Manual code review (no linting tools configured)
- Validate HTML with W3C validator
- Check CSS for syntax errors
- Test JavaScript in browser console

## Code Style Guidelines

### Project Structure
- `index.html` - Main HTML page with semantic structure
- `styles.css` - All CSS styles with mobile-first responsive design
- `app.js` - JavaScript for product filtering and cart functionality
- `README.md` - Project documentation

### HTML Guidelines
- Use semantic HTML5 elements (header, main, section, footer)
- Include proper meta tags (charset, viewport)
- Use descriptive ARIA-friendly structure
- Maintain clean, readable indentation
- Place scripts at end of body for performance

### CSS Guidelines
- Mobile-first responsive design approach
- Use CSS Grid for product layout
- Flexbox for component layouts
- CSS custom properties could be used for colors/themes
- Organize styles logically (general → components → responsive)
- Use hover states and transitions for better UX
- Include print considerations if needed

### JavaScript Guidelines
- Use modern ES6+ features when appropriate
- Organize code with clear function separation
- Use descriptive variable and function names
- Handle events with proper event listeners
- Include proper error handling for DOM operations
- Use const/let appropriately (avoid var)
- Comment complex business logic

### Naming Conventions
- **CSS Classes**: kebab-case (e.g., `product-card`, `filter-btn`)
- **JavaScript Functions**: camelCase with descriptive verbs (e.g., `renderProducts`, `handleBuy`)
- **JavaScript Variables**: camelCase (e.g., `currentFilter`, `productsToRender`)
- **IDs**: kebab-case (e.g., `products-grid`)

### Code Organization
- Keep data structures at top of app.js
- Separate rendering logic from event handling
- Use functions for reusable UI components
- Group related functionality together
- Maintain single responsibility for functions

### Performance Considerations
- Use CSS transforms for animations (better performance)
- Lazy load images if product count grows
- Debounce resize events if adding responsive JS
- Use efficient DOM queries (cache selectors)
- Consider virtual scrolling for large product lists

### Accessibility Guidelines
- Use semantic HTML elements properly
- Ensure keyboard navigation works
- Add ARIA labels where needed
- Maintain good color contrast ratios
- Include alt text for actual product images
- Test with screen readers

### Security Best Practices
- Validate all user inputs
- Sanitize dynamic content before injection
- Use HTTPS for production deployment
- Avoid inline styles and scripts
- Implement CSP headers in production

### Responsive Design
- Mobile-first approach (max-width media queries)
- Test at breakpoints: 480px, 768px, 1200px
- Ensure touch targets are adequately sized (44px+)
- Optimize images for different screen densities
- Test on actual devices when possible

### Browser Compatibility
- Target modern browsers (ES6+ support)
- Provide fallbacks for CSS Grid if needed
- Test in major browsers: Chrome, Firefox, Safari, Edge
- Consider progressive enhancement approach

### Deployment Notes
- **Platform**: Render.com static web service
- **Build Process**: No build required - serves static files directly
- **Root Directory**: Serve from repository root (index.html)
- **Auto-deployment**: Configure to auto-deploy on push to main branch
- **Branches**: Use `main` for production, feature branches for development
- **Environment**: No environment variables needed for static site
- **URL**: Provided by Render (e.g., https://wwwsofrito.onrender.com)
- **Custom Domain**: Configure custom domain in Render dashboard if needed

### Render.com Specific Configuration
- **Service Type**: Static Site
- **Build Command**: None required
- **Publish Directory**: Root directory (.)
- **Node Version**: Not needed for static files
- **Auto-deploy**: Enable on branch push
- **Health Check**: Render will automatically check for index.html

### Render.com Development Workflow
- **Local Development**: Test changes locally, then commit and push
- **Preview Deployments**: Consider enabling for feature branches
- **Rollback**: Use Render dashboard to rollback if needed
- **Logs**: Check Render dashboard for deployment logs
- **Performance**: Render auto-configures CDN for static assets

## Project-Specific Notes

### Product Data Structure
- Products array contains items with: id, type, title, author, description, price, icon
- Type can be 'books' or 'posters'
- Icons currently use emojis - could be replaced with actual images
- Consider moving data to external JSON for easier maintenance

### Filter System
- Three filter states: 'all', 'books', 'posters'
- Filter buttons update currentFilter state
- Products are re-rendered when filter changes
- Animation delays create staggered effect on render

### Cart Functionality
- Currently shows toast notifications only
- No persistent cart state implemented
- Prices formatted to 2 decimal places
- Consider adding actual cart management system

### Future Enhancements
- Add search functionality
- Implement sorting options
- Add product detail pages
- Implement actual e-commerce backend
- Add user authentication
- Include product reviews and ratings