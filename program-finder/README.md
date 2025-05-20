# Program Finder

A web application for finding and managing youth programs in your area.

## Authentication Implementation Guide

### Overview
The authentication system uses Google OAuth 2.0 for user authentication. This guide explains how to implement the authentication feature that restricts access to program details.

### Prerequisites
1. Google Cloud Console account
2. Node.js and npm installed
3. Basic understanding of OAuth 2.0

### Setup Steps

1. **Google OAuth Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to Credentials
   - Create OAuth 2.0 Client ID
   - Set up the OAuth consent screen
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/google/callback` (development)
     - Your production URL when deployed

2. **Backend Configuration**
   Create a `.env` file in the `backend` directory:
   ```
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
   JWT_SECRET=your_secure_jwt_secret_here
   FRONTEND_URL=http://localhost:3000
   ```

3. **Frontend Implementation**

   a. Create an AuthContext:
   ```typescript
   // src/contexts/AuthContext.tsx
   import React, { createContext, useContext, useState, useEffect } from 'react';

   interface AuthContextType {
     isAuthenticated: boolean;
     user: any | null;
     login: (token: string) => void;
     logout: () => void;
   }

   const AuthContext = createContext<AuthContextType | undefined>(undefined);

   export function AuthProvider({ children }: { children: React.ReactNode }) {
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [user, setUser] = useState(null);

     useEffect(() => {
       // Check for existing token
       const token = localStorage.getItem('token');
       if (token) {
         verifyToken(token);
       }
     }, []);

     const login = (token: string) => {
       localStorage.setItem('token', token);
       setIsAuthenticated(true);
       // Fetch user data
     };

     const logout = () => {
       localStorage.removeItem('token');
       setIsAuthenticated(false);
       setUser(null);
     };

     return (
       <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
         {children}
       </AuthContext.Provider>
     );
   }

   export const useAuth = () => {
     const context = useContext(AuthContext);
     if (!context) {
       throw new Error('useAuth must be used within an AuthProvider');
     }
     return context;
   };
   ```

   b. Update ProgramCard component:
   ```typescript
   // src/components/ProgramCard.tsx
   import { useAuth } from '../contexts/AuthContext';

   export function ProgramCard({ data: program }: ProgramCardProps) {
     const { isAuthenticated } = useAuth();
     const router = useRouter();

     const handleCardClick = () => {
       if (isAuthenticated) {
         router.push(`/programs/${program.id}`);
       } else {
         router.push('/login');
       }
     };

     return (
       <div className="program-card" onClick={handleCardClick}>
         {/* Basic program info always visible */}
         <div className="program-content">
           <h3>{program.organization}</h3>
           <p className="program-type">{program.type}</p>
           <p className="program-ages">Ages: {program.ages}</p>
         </div>

         {/* Contact info only visible when authenticated */}
         {isAuthenticated && (
           <div className="program-contact">
             {program.contact_email && (
               <p>Email: {program.contact_email}</p>
             )}
             {program.contact_phone && (
               <p>Phone: {program.contact_phone}</p>
             )}
           </div>
         )}
       </div>
     );
   }
   ```

4. **Protected Routes**
   Create a middleware to protect routes that require authentication:
   ```typescript
   // src/middleware.ts
   import { NextResponse } from 'next/server';
   import type { NextRequest } from 'next/server';

   export function middleware(request: NextRequest) {
     const token = request.cookies.get('token');
     
     if (!token && request.nextUrl.pathname.startsWith('/programs/')) {
       return NextResponse.redirect(new URL('/login', request.url));
     }
     
     return NextResponse.next();
   }
   ```

### Usage
1. Wrap your app with the AuthProvider:
   ```typescript
   // src/app/layout.tsx
   import { AuthProvider } from '../contexts/AuthContext';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <AuthProvider>
             {children}
           </AuthProvider>
         </body>
       </html>
     );
   }
   ```

2. Use the useAuth hook to check authentication status:
   ```typescript
   const { isAuthenticated, user, login, logout } = useAuth();
   ```

### Security Considerations
1. Always use HTTPS in production
2. Implement proper token validation
3. Set appropriate token expiration times
4. Store sensitive data securely
5. Implement proper error handling
6. Add rate limiting for authentication attempts

### Testing
1. Test the authentication flow
2. Verify protected routes
3. Test token expiration
4. Test error scenarios
5. Verify proper redirection

### Additional Features to Consider
1. Remember me functionality
2. Password reset
3. Email verification
4. Social login options
5. Two-factor authentication

## Contributing
Feel free to submit issues and enhancement requests!
