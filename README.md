# URL Shortener

A modern URL shortener application built with **Next.js**, **Prisma**, and **Zod**, featuring QR code generation for every shortened link. It simplifies the process of creating short URLs with custom or auto-generated slugs, providing a success page with a QR code and download options.

---

## Key Features

* **URL Shortening** with user-defined (optional) or automatic random slugs.
* **Input Validation** using Zod to ensure correct URL and slug formats.
* **Domain Restriction** to prevent shortening URLs from the application's own domain.
* **Data Storage** for URLs and slugs using Prisma ORM with a connected database.
* **Success Page** displaying the QR code of the shortened URL, along with download and copy buttons.
* Utilizes **Next.js 14** with API Routes and Server Actions.
* **Tailwind CSS** for a responsive and modern user interface.

---

## How It Works

### 1. User Data Input

* Users fill out a form on the main page with the original URL and an optional desired slug.
* Data is sent via the `createLink()` function to the `/api/l` API endpoint using the `POST` method.
* The request includes `Authorization` and `Origin` headers for security.

### 2. Server-Side API Processing

* The `/api/l` endpoint receives and validates the data using the Zod `linkSchema`.
* It ensures the URL does not originate from the application's domain to prevent loops.
* If no slug is provided, the system generates a random slug using the `generateRandomSlug()` function.
* It checks for slug availability in the database using `checkSlugExists()`.
* If the slug is available, the URL and slug are saved to the `Link` table in the database using Prisma.
* A `201 Created` response is returned, containing:
    * `successUrl` (the success page)
    * `redirectUrl` (the usable shortened link)

### 3. Success Page `/s/[slug]`

* After a link is successfully created, users are redirected to the `/s/[slug]` page.
* This page validates the existence of the slug in the database.
* It constructs the short link in the format `https://domain.com/l/[slug]`.
* Generates a QR code from the short link using the `qrcode` library.
* Displays the QR code along with buttons to download the QR image and copy the link.

---

## Installation

### Prerequisites

* **Node.js** (latest version, v18+ recommended)
* **Database** supported by Prisma (e.g., PostgreSQL, MySQL, SQLite)
* **Git**

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/mamskie/Url-Shortener.git](https://github.com/mamskie/Url-Shortener.git)
    cd Url-Shortener
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env.local` file** in the project root and configure environment variables, such as `DATABASE_URL`.

4.  **Migrate the database schema** with Prisma:
    ```bash
    npm run migrate
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

6.  Open your browser and navigate to `http://localhost:3000`.

---

## Folder Structure

* `src/app/page.tsx`: Main page containing the URL and slug input form.
* `src/app/api/l/route.ts`: API endpoint for receiving and processing link creation requests.
* `src/app/s/[slug]/page.tsx`: Success page displaying the QR code and shortened link.
* `src/lib/prisma/schema.prisma`: Prisma database schema.
* `package.json`: Configuration for dependencies and npm scripts.

---

## Important Scripts

* `npm run dev`: Runs the Next.js development server.
* `npm run build`: Creates a production build of the application.
* `npm run start`: Runs the built application.
* `npm run migrate`: Executes database migrations using Prisma.
* `npm run lint`: Runs code linting checks with ESLint.
* `npm run format`: Checks code formatting using Prettier.

---

## Technologies Used

* **Next.js**: React framework for web applications.
* **React**: UI library.
* **Prisma**: ORM for database access.
* **Zod**: Schema validation and parsing.
* **QRCode**: QR code generator library.
* **Tailwind CSS**: Utility-first CSS framework.
* **TypeScript**: Programming language that adds static types to JavaScript.
