# Next.js Boilerplate with Supabase & NextAuth

A Next.js boilerplate featuring seamless integration with Supabase and NextAuth, designed to help you quickly build modern, full-stack web applications. This template includes a pre-built signup and login page, robust authentication, and database integration. It supports email via NextAuth with AUTH APIs, and is styled with TailwindCSS for responsive UI components. Ideal for scalable, secure, and customizable full-stack apps.

## Features

- **Authentication:** Pre-integrated signup and login pages using NextAuth, with support for email.
- **Database Integration:** Seamlessly connects to Supabase for database management.
- **Scalable & Secure:** Provides a strong foundation for secure, full-stack web applications.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or above)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbrarAhmed111/nextjs-supabase-nextauth-boilerplate.git
   cd nextjs-supabase-nextauth-boilerplate
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Or, if using yarn:

   ```bash
   yarn install
   ```

3. Create a `.env.local` file in the root directory of the project and add the following environment variables:

   ```env
   # Base URL
   NEXT_PUBLIC_BASE_URL=

   NEXTAUTH_URL=
   NEXTAUTH_SECRET=
   JWT_SECRET=

   # Redirecting Link
   SUCCESS_REDIRECT_LOCAL_LINK=
   CANCEL_REDIRECT_LOCAL_LINK=

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Or, if using yarn:

   ```bash
   yarn dev
   ```

5. The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

You can deploy your Next.js app on platforms like Vercel or Netlify. Make sure to configure the environment variables in the deployment settings accordingly.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Developed by [Abrar Ahmed](https://github.com/AbrarAhmed111).
