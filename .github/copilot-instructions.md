<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Krishi Maitri - Project Guidelines

## Project Overview
This is a farmer-focused digital platform called "Krishi Maitri" built with Vue.js 3, designed to make agricultural services accessible through a clean, mobile-first interface.

## Code Style & Standards

### Vue.js Conventions
- Use Vue 3 Composition API with `<script setup>` syntax
- Prefer reactive refs and computed properties over reactive objects
- Use proper component naming (PascalCase for files, kebab-case in templates)
- Implement proper prop validation and type checking
- Use emit events for parent-child communication

### CSS & Styling
- Use Tailwind CSS utility classes for styling
- Follow mobile-first responsive design principles
- Maintain the agriculture-themed color palette:
  - Primary: #4CAF50 (green)
  - Secondary: #FFFFFF (white)  
  - Accent: #F4F4F4 (beige)
  - Brown: #8D6E63
  - Earth tones: Use earth-{50-900} scale
- Use Poppins for headings and Roboto for body text
- Ensure proper contrast ratios for accessibility

### Component Structure
- Keep components focused and single-responsibility
- Use proper semantic HTML elements
- Implement proper loading states and error handling
- Add appropriate ARIA labels for accessibility
- Use consistent naming for props, events, and methods

## Design Principles

### User Experience
- Prioritize mobile users (farmers primarily use smartphones)
- Keep interfaces simple and intuitive
- Use agriculture-themed icons and imagery
- Provide clear feedback for user actions
- Implement proper form validation with helpful error messages

### Accessibility
- Ensure keyboard navigation works properly
- Use semantic HTML elements
- Provide alt text for images
- Maintain proper color contrast ratios
- Add ARIA labels where needed

### Performance
- Optimize images and assets for mobile networks
- Implement lazy loading where appropriate
- Minimize bundle size with proper tree shaking
- Use efficient data structures and algorithms

## Feature Implementation

### Authentication
- Use mobile number-based login with OTP verification
- Support multiple Indian languages
- Implement persistent login state
- Add proper route guards for protected pages

### Data Management
- Use localStorage for user preferences and session data
- Implement proper error handling for API calls
- Show loading states during data fetching
- Cache frequently accessed data

### Responsive Design
- Mobile-first approach with breakpoints for tablet and desktop
- Touch-friendly buttons and interactive elements
- Readable text sizes on small screens
- Proper spacing and layout on all devices

## File Organization
- Components in `/src/components/`
- Views/Pages in `/src/views/`
- Router configuration in `/src/router/`
- Global styles in `/src/style.css`
- Assets in `/src/assets/`

## Testing & Quality
- Test on mobile devices and different screen sizes
- Verify functionality across different browsers
- Ensure proper error handling and edge cases
- Validate forms with appropriate constraints
- Test accessibility with screen readers when possible

## Localization
- Support for 9 Indian languages
- Use proper language codes (en, hi, bn, te, ta, mr, gu, kn, pa)
- Store language preferences persistently
- Consider RTL text direction for applicable languages

## Security
- Validate all user inputs
- Use HTTPS for all API communications
- Store minimal sensitive data locally
- Implement proper session management
- Add CSRF protection where needed

Remember: This platform serves farmers who may have limited digital literacy, so prioritize simplicity, clarity, and reliability in all implementations.
