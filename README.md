Repository: mamskie/url-shortener
Files analyzed: 48

Estimated tokens: 17.7k

Directory structure:
└── mamskie-url-shortener/
    ├── README.md
    ├── commitlint.config.js
    ├── LICENSE
    ├── next.config.js
    ├── package.json
    ├── postcss.config.js
    ├── renovate.json
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── .env.production
    ├── .eslintignore
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── public/
    ├── src/
    │   ├── middleware.ts
    │   ├── app/
    │   │   ├── actions.ts
    │   │   ├── schema.ts
    │   │   └── (public)/
    │   │       ├── layout.tsx
    │   │       ├── page.tsx
    │   │       ├── submit.tsx
    │   │       ├── l/
    │   │       │   ├── route.ts
    │   │       │   └── [slug]/
    │   │       │       └── route.ts
    │   │       └── s/
    │   │           └── [slug]/
    │   │               └── page.tsx
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── footer.tsx
    │   │   │   ├── header.tsx
    │   │   │   └── layout.tsx
    │   │   └── ui/
    │   │       ├── alert.tsx
    │   │       ├── button.tsx
    │   │       ├── copy-button.tsx
    │   │       └── loading.tsx
    │   ├── lib/
    │   │   ├── db.ts
    │   │   ├── env-server.ts
    │   │   ├── env.ts
    │   │   ├── helper-server.ts
    │   │   ├── helper.ts
    │   │   ├── rate-limit.ts
    │   │   ├── prisma/
    │   │   │   ├── schema.prisma
    │   │   │   └── migrations/
    │   │   │       ├── migration_lock.toml
    │   │   │       ├── 20231108140054_init/
    │   │   │       │   └── migration.sql
    │   │   │       ├── 20240201140305_rename_table_to_singular/
    │   │   │       │   └── migration.sql
    │   │   │       └── 20240201141221_sync_indexes_to_new_table_name/
    │   │   │           └── migration.sql
    │   │   └── types/
    │   │       ├── api.ts
    │   │       ├── meta.ts
    │   │       └── qrcode.d.ts
    │   └── styles/
    │       └── globals.scss
    ├── .github/
    │   └── workflows/
    │       ├── deployment.yaml
    │       └── migrate-database.yaml
    └── .husky/
        ├── commit-msg
        └── pre-commit


================================================
FILE: README.md
================================================
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



================================================
FILE: commitlint.config.js
================================================
module.exports = {
  extends: ['@commitlint/config-conventional']
};



================================================
FILE: LICENSE
================================================
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

                            Preamble

  The GNU General Public License is a free, copyleft license for
software and other kinds of works.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.  We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors.  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights.  Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received.  You must make sure that they, too, receive
or can get the source code.  And you must show them these terms so they
know their rights.

  Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

  For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software.  For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

  Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so.  This is fundamentally incompatible with the aim of
protecting users' freedom to change the software.  The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable.  Therefore, we
have designed this version of the GPL to prohibit the practice for those
products.  If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

  Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary.  To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

  The precise terms and conditions for copying, distribution and
modification follow.

                       TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

  A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

  The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form.  A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

  The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities.  However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work.  For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

  The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

  The Corresponding Source for a work in source code form is that
same work.

  2. Basic Permissions.

  All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met.  This License explicitly affirms your unlimited
permission to run the unmodified Program.  The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work.  This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

  You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force.  You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright.  Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

  Conveying under any other circumstances is permitted solely under
the conditions stated below.  Sublicensing is not allowed; section 10
makes it unnecessary.

  3. Protecting Users' Legal Rights From Anti-Circumvention Law.

  No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

  When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

  4. Conveying Verbatim Copies.

  You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

  You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

  5. Conveying Modified Source Versions.

  You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

  A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit.  Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

  6. Conveying Non-Source Forms.

  You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

  A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

  A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling.  In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage.  For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product.  A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

  "Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source.  The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

  If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information.  But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

  The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed.  Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

  Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

  7. Additional Terms.

  "Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law.  If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

  When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it.  (Additional permissions may be written to require their own
removal in certain cases when you modify the work.)  You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

  Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

  All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10.  If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term.  If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

  If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

  Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

  8. Termination.

  You may not propagate or modify a covered work except as expressly
provided under this License.  Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

  However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

  Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

  Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License.  If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

  9. Acceptance Not Required for Having Copies.

  You are not required to accept this License in order to receive or
run a copy of the Program.  Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance.  However,
nothing other than this License grants you permission to propagate or
modify any covered work.  These actions infringe copyright if you do
not accept this License.  Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

  10. Automatic Licensing of Downstream Recipients.

  Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License.  You are not responsible
for enforcing compliance by third parties with this License.

  An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations.  If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

  You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License.  For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

  11. Patents.

  A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based.  The
work thus licensed is called the contributor's "contributor version".

  A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version.  For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

  Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

  In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement).  To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

  If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients.  "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

  If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

  A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License.  You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

  Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

  12. No Surrender of Others' Freedom.

  If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all.  For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

  13. Use with the GNU Affero General Public License.

  Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work.  The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

  14. Revised Versions of this License.

  The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

  Each version is given a distinguishing version number.  If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation.  If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

  If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

  Later license versions may give you additional or different
permissions.  However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

  15. Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. Limitation of Liability.

  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

  17. Interpretation of Sections 15 and 16.

  If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

                     END OF TERMS AND CONDITIONS

            How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

  If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

    <program>  Copyright (C) <year>  <name of author>
    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License.  Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

  You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<https://www.gnu.org/licenses/>.

  The GNU General Public License does not permit incorporating your program
into proprietary programs.  If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library.  If this is what you want to do, use the GNU Lesser General
Public License instead of this License.  But first, please read
<https://www.gnu.org/licenses/why-not-lgpl.html>.



================================================
FILE: next.config.js
================================================
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;



================================================
FILE: package.json
================================================
{
  "name": "challenge_01",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --max-warnings=0",
    "sort-imports": "next lint --fix .",
    "type-check": "tsc --noEmit",
    "format": "prettier --check .",
    "migrate": "dotenv -e .env.local -- npx prisma migrate dev --name deploy",
    "prepare": "husky install",
    "postinstall": "prisma generate --no-engine"
  },
  "prisma": {
    "schema": "src/lib/prisma/schema.prisma"
  },
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  },
  "dependencies": {
    "@prisma/client": "^6.9.0",
    "@prisma/extension-accelerate": "^2.0.1",
    "clsx": "^2.0.0",
    "lru-cache": "^10.0.2",
    "next": "14.2.3",
    "qrcode": "^1.5.4",
    "react": "^18",
    "react-dom": "^18",
    "react-icons": "^5.0.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.0.0",
    "@commitlint/config-conventional": "^19.0.0",
    "@types/node": "^20",
    "@types/qrcode": "^1.5.5",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "autoprefixer": "^10",
    "dotenv-cli": "^7.3.0",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "eslint-import-resolver-typescript": "^3.4.0",
    "eslint-plugin-import": "^2.26.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "postcss": "^8",
    "prettier": "3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.6",
    "prisma": "^5.22.0",
    "sass": "^1.69.5",
    "tailwindcss": "^3",
    "typescript": "^5"
  }
}



================================================
FILE: postcss.config.js
================================================
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};



================================================
FILE: renovate.json
================================================
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:base", "schedule:weekly", "group:allNonMajor"],
  "timezone": "Asia/Jakarta"
}



================================================
FILE: tailwind.config.ts
================================================
import colors from 'tailwindcss/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          main: colors.cyan[400],
          start: colors.blue[500],
          end: colors.cyan[400]
        }
      }
    }
  },
  plugins: []
};

export default config;



================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}



================================================
FILE: .env.production
================================================
# Preview URL
NEXT_PUBLIC_URL=https://$NEXT_PUBLIC_VERCEL_URL



================================================
FILE: .eslintignore
================================================
# next config
next.config.js

# tailwind config
postcss.config.js

# jest config
jest.config.js

# commitlint config
commitlint.config.js



================================================
FILE: .eslintrc.json
================================================
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "next/core-web-vitals"
  ],
  "settings": {
    "import/resolver": {
      "typescript": true,
      "node": true
    }
  },
  "rules": {
    "semi": ["error", "always"],
    "curly": ["warn", "multi"],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "jsx-quotes": ["error", "prefer-single"],
    "linebreak-style": ["error", "unix"],
    "no-console": "warn",
    "comma-dangle": ["error", "never"],
    "no-unused-expressions": "error",
    "no-constant-binary-expression": "error",
    "import/order": [
      "warn",
      {
        "pathGroups": [
          {
            "pattern": "*.scss",
            "group": "builtin",
            "position": "before",
            "patternOptions": { "matchBase": true }
          },
          {
            "pattern": "@/lib/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "@/app/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "@/components/**",
            "group": "external",
            "position": "after"
          }
        ],
        "warnOnUnassignedImports": true,
        "pathGroupsExcludedImportTypes": ["type"],
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ]
      }
    ],
    "@next/next/no-img-element": "off",
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "args": "all", "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": { "attributes": false }
      }
    ]
  }
}



================================================
FILE: .prettierrc.json
================================================
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
  "plugins": ["prettier-plugin-tailwindcss"]
}




================================================
FILE: src/middleware.ts
================================================
import { NextResponse } from 'next/server';
import { rateLimit } from './lib/rate-limit';
import { getOrigin, getBearerToken } from './lib/helper';
import { SECRET_PASSWORD } from './lib/env-server';
import { NEXT_PUBLIC_URL } from './lib/env';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500 // Max 500 users per minute
});

export async function middleware(request: Request): Promise<NextResponse> {
  const headers = new Headers(request.headers);

  try {
    await limiter.check({
      limit: 10,
      token: 'CACHE_TOKEN',
      headers: headers
    });
  } catch {
    return NextResponse.json(
      { message: 'Too many requests' },
      { status: 429, headers: headers }
    );
  }

  const origin = getOrigin(headers);

  if (origin !== NEXT_PUBLIC_URL)
    return NextResponse.json(
      { message: 'Forbidden' },
      { status: 403, headers: headers }
    );

  const bearerToken = getBearerToken(headers);

  if (bearerToken !== SECRET_PASSWORD)
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401, headers: headers }
    );

  return NextResponse.next({ headers });
}

type Config = {
  matcher: string;
};

export const config: Config = {
  matcher: '/l'
};



================================================
FILE: src/app/actions.ts
================================================
'use server';

import { redirect } from 'next/navigation';
import { NEXT_PUBLIC_URL } from '@/lib/env';
import { SECRET_PASSWORD } from '@/lib/env-server';
import type { APIResponse } from '@/lib/types/api';
import type { LinkMeta } from '@/lib/types/meta';

export async function createLink(
  _prevState: string | null,
  formData: FormData
): Promise<string> {
  const body = Object.fromEntries(formData.entries());

  let successUrl: string;

  try {
    const response = await fetch(`${NEXT_PUBLIC_URL}/l`, {
      method: 'POST',
      headers: {
        Origin: NEXT_PUBLIC_URL,
        Authorization: `Bearer ${SECRET_PASSWORD}`
      },
      body: JSON.stringify(body)
    });

    const { message, data } = (await response.json()) as APIResponse<LinkMeta>;

    if (!response.ok || !data) throw new Error(message);

    successUrl = data.successUrl;
  } catch (err) {
    if (err instanceof Error) return err.message;
    return 'Internal server error';
  }

  redirect(successUrl);
}



================================================
FILE: src/app/schema.ts
================================================
import { z } from 'zod';
import { checkIfUrlIsValid } from '@/lib/helper';

export type Link = z.infer<typeof linkSchema>;

export const validUrl = z.string().max(255).url().refine(checkIfUrlIsValid, {
  message: "URL can't be from this website"
});

export const linkSchema = z.object({
  url: validUrl,
  slug: z.string().max(255).optional()
});



================================================
FILE: src/app/(public)/layout.tsx
================================================
import '@/styles/globals.scss';

import { Inter } from 'next/font/google';
import { Layout } from '@/components/layout/layout';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Link',
  description: 'A simple URL shortener.',
  authors: { name: 'Khotibul Umam', url: 'https://mamskie.me' },
  generator: 'Next.js',
  openGraph: {
    title: 'Link',
    description: 'A simple URL shortener.',
    determiner: 'auto',
    url: 'https://link.mamskie.me',
    locale: 'en_US',
    siteName: 'mamskie.me',
    images: {
      url: 'https://mamskie.me/api/og?title=Link&description=A%20simple%20URL%20shortener.',
      alt: 'Link',
      type: 'image/png',
      width: 1200,
      height: 600
    }
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mam06_',
    creator: '@mamskie',
    title: 'Link',
    description: 'A simple URL shortener.',
    images: {
      url: 'https://mamskie.me/api/og?title=Link&description=A%20simple%20URL%20shortener.',
      alt: 'Link'
    }
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}



================================================
FILE: src/app/(public)/page.tsx
================================================
'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { URL_WITHOUT_PROTOCOL } from '@/lib/env';
import { Alert } from '@/components/ui/alert';
import { createLink } from '../actions';
import { validUrl } from '../schema';
import { Submit } from './submit';
import type { ChangeEvent } from 'react';

export default function Home(): JSX.Element {
  const [message, formAction] = useFormState(createLink, null);

  const [slug, setSlug] = useState('');
  const [url, setUrl] = useState('');

  const handleSlugChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setSlug(value);

  const handleUrlChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setUrl(value);

  const isValidURL = validUrl.safeParse(url).success;

  return (
    <main>
      <section className='mx-auto w-full max-w-md'>
        <form className='grid gap-4' action={formAction}>
          <div className='flex w-full items-center py-0 pr-0'>
            <p className='custom-input rounded-r-none border-r-0 text-gray-600 dark:text-gray-300'>
              {URL_WITHOUT_PROTOCOL}/l/
            </p>
            <input
              className='custom-input w-full rounded-l-none'
              name='slug'
              type='text'
              value={slug}
              maxLength={255}
              placeholder='Alias (optional)'
              onChange={handleSlugChange}
            />
          </div>
          <input
            required
            className='custom-input w-full'
            name='url'
            type='text'
            value={url}
            maxLength={255}
            placeholder='Enter link here'
            onChange={handleUrlChange}
          />
          {message && <Alert variant='error' message={message} />}
          <Submit isValidURL={isValidURL} />
        </form>
      </section>
    </main>
  );
}



================================================
FILE: src/app/(public)/submit.tsx
================================================
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type SubmitProps = {
  isValidURL: boolean;
};

export function Submit({ isValidURL }: SubmitProps): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      className={`custom-button clickable transition-colors duration-200 ${
        isValidURL ? 'hover:bg-accent-main' : ''
      }`}
      disabled={!isValidURL}
      loading={pending}
    >
      Shorten Url
    </Button>
  );
}


================================================
FILE: src/app/(public)/l/route.ts
================================================
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/db';
import { checkIfUrlIsValid } from '@/lib/helper';
import { checkSlugExists, generateRandomSlug } from '@/lib/helper-server';
import { NEXT_PUBLIC_URL } from '@/lib/env';
import { linkSchema } from '@/app/schema';
import type { Link } from '@/app/schema';
import type { APIResponse } from '@/lib/types/api';
import type { LinkMeta } from '@/lib/types/meta';

export async function POST(
  request: Request
): Promise<NextResponse<APIResponse<LinkMeta>>> {
  const body = (await request.json().catch(() => null)) as Link | null;

  if (!body)
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );

  try {
    const { url, slug } = linkSchema.parse(body);

    const isValidUrl = checkIfUrlIsValid(url);

    if (!isValidUrl)
      return NextResponse.json(
        { message: "URL can't be from this website" },
        { status: 400 }
      );

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const parsedSlug = slug || generateRandomSlug();

    const slugExists = await checkSlugExists(parsedSlug);

    if (slugExists)
      return NextResponse.json(
        { message: 'Alias already exists' },
        { status: 400 }
      );

    await prisma.link.create({
      data: {
        url: url,
        slug: parsedSlug
      }
    });

    return NextResponse.json(
      {
        message: 'Link created successfully',
        data: {
          url: url,
          slug: parsedSlug,
          successUrl: `/s/${parsedSlug}`,
          redirectUrl: `${NEXT_PUBLIC_URL}/l/${parsedSlug}`
        }
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      const parsedError = err.errors.map(({ message }) => message).join(', ');
      return NextResponse.json({ message: parsedError }, { status: 400 });
    }

    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}



================================================
FILE: src/app/(public)/l/[slug]/route.ts
================================================
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import type { APIResponse } from '@/lib/types/api';

export async function GET(
  _request: Request,
  {
    params: { slug }
  }: {
    params: { slug: string };
  }
): Promise<NextResponse<APIResponse>> {
  const link = await prisma.link
    .findUnique({
      where: {
        slug
      }
    })
    .catch(() => null);

  if (!link) return NextResponse.json({ message: 'Alias not found' });

  redirect(link.url);
}



================================================
FILE: src/app/(public)/s/[slug]/page.tsx
================================================
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toDataURL } from 'qrcode';
import { checkSlugExists } from '@/lib/helper-server';
import { NEXT_PUBLIC_URL } from '@/lib/env';
import { CopyButton } from '@/components/ui/copy-button';
import { Button } from '@/components/ui/button';

export default async function Success({
  params: { slug }
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const decodedSlug = decodeURIComponent(slug);
  const slugExists = await checkSlugExists(decodedSlug);

  if (!slugExists) redirect('/');

  const url = `${NEXT_PUBLIC_URL}/l/${decodedSlug}`;
  const qrCodeDataURL: string = await toDataURL(url);

  return (
    <main className='flex flex-col items-center px-4 pt-6'>
  <section className='w-full max-w-4xl grid gap-6'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
      
      {/* QR Code & Download */}
      <div className='flex flex-col items-center gap-4'>
        <img src={qrCodeDataURL} alt='QR Code' className='w-40 h-40' />
        <a href={qrCodeDataURL} download={`qrcode-${decodedSlug}.png`}>
          <button className='px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600 transition'>
            Download QR Code
          </button>
        </a>
      </div>

      {/* Short Link & Copy */}
      <div className='flex flex-col gap-3'>
        <h1 className='text-lg font-semibold'>Your short link has been created successfully:</h1>
        <div className='main-border relative rounded px-3 py-2 bg-gray-100'>
          <a
            className='animated-underline break-all text-black hover:underline'
            href={url}
            target='_blank'
            rel='noopener noreferrer'
          >
            {url}
          </a>
          <CopyButton url={url} />
        </div>
      </div>

    </div>

    {/* Create Another */}
    <div className='flex justify-center pt-4'>
      <Link href='/'>
        <Button className='custom-button clickable'>Create another</Button>
      </Link>
    </div>
  </section>
</main>

  );
}



================================================
FILE: src/components/layout/footer.tsx
================================================
export function Footer(): JSX.Element {
  return (
    <footer className='my-4 text-center'>
      <p className='text-gray-300'>&copy; Mamskie {new Date().getFullYear()}</p>
    </footer>
  );
}



================================================
FILE: src/components/layout/header.tsx
================================================
import Image from 'next/image';
import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';

export function Header(): JSX.Element {
  return (
    <header className='my-4 flex items-center justify-between shadow-lg'>
      <div className='flex items-center gap-2'>
        <Link href='/'>
          <Image src='/logo.svg' width={24} height={24} alt='Logo' />
        </Link>
        <div>
          <h1 className='font-bold text-accent-main'>Link</h1>
          <p className='-mt-1 text-sm text-gray-200'>
            at{' '}
            <a
              className='animated-underline'
              href='https://mamskie.me'
              target='_blank'
            >
              mamskie.me
            </a>
          </p>
        </div>
      </div>
      <div>
        <a
          className='smooth-tab grid text-2xl'
          href='https://github.com/mamskie'
          target='_blank'
        >
          <FiGithub />
        </a>
      </div>
    </header>
  );
}



================================================
FILE: src/components/layout/layout.tsx
================================================
import { Header } from './header';
import { Footer } from './footer';
import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}



================================================
FILE: src/components/ui/alert.tsx
================================================
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

type AlertProps = {
  variant: 'error' | 'success';
  message: string;
};

export function Alert({ variant, message }: AlertProps): JSX.Element {
  return (
    <div className='flex items-center gap-2 text-lg'>
      {variant === 'error' ? (
        <HiExclamationCircle className='text-red-400' />
      ) : (
        <HiCheckCircle className='text-green-400' />
      )}
      <p className='text-sm'>{message}</p>
    </div>
  );
}



================================================
FILE: src/components/ui/button.tsx
================================================
import { clsx } from 'clsx';
import { Loading } from './loading';
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  loading?: boolean;
  variant?: 'default' | 'secondary'; 
};

export function Button({
  className,
  loading,
  disabled,
  variant = 'default', 
  children,
  ...rest
}: ButtonProps): JSX.Element {
  const isDisabled = loading ?? disabled;

  return (
    <button
      className={clsx(
        'smooth-tab',
        variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-black hover:bg-gray-300',
        loading && 'relative !text-transparent brightness-75 disabled:cursor-wait',
        className
      )}
      type='button'
      disabled={isDisabled}
      {...rest}
    >
      {loading && (
        <Loading
          iconClassName='h-5 w-5'
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      )}
      {children}
    </button>
  );
}



================================================
FILE: src/components/ui/copy-button.tsx
================================================
'use client';

import { useState } from 'react';
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi';
import { Button } from './button';

type CopyButtonProps = {
  url: string;
};

export function CopyButton({ url }: CopyButtonProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    if (copied) return;

    setCopied(true);

    await navigator.clipboard.writeText(url);

    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <Button className='absolute right-2 text-2xl' onClick={handleCopy}>
      {copied ? <HiClipboardCheck /> : <HiClipboard />}
    </Button>
  );
}



================================================
FILE: src/components/ui/loading.tsx
================================================
import { clsx } from 'clsx';
import { ImSpinner8 } from 'react-icons/im';

type LoadingProps = {
  className?: string;
  iconClassName?: string;
};

export function Loading({
  className = 'p-4',
  iconClassName = 'h-7 w-7'
}: LoadingProps): JSX.Element {
  return (
    <i className={clsx('flex justify-center', className)}>
      <ImSpinner8
        className={clsx('animate-spin text-accent-main', iconClassName)}
      />
    </i>
  );
}



================================================
FILE: src/lib/db.ts
================================================
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

export const prisma = new PrismaClient().$extends(withAccelerate());


================================================
FILE: src/lib/env-server.ts
================================================
import { z } from 'zod';

const envSchema = z.object({
  SECRET_PASSWORD: z.string().min(1),
  POSTGRES_PRISMA_URL: z.string().min(1),
  POSTGRES_URL_NON_POOLING: z.string().min(1)
});

export const { SECRET_PASSWORD } = envSchema.parse(process.env);



================================================
FILE: src/lib/env.ts
================================================
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_URL: z.string().min(1)
});

const parsedSchema = envSchema.parse({
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
});

export const { NEXT_PUBLIC_URL } = parsedSchema;

export const URL_WITHOUT_PROTOCOL = NEXT_PUBLIC_URL.replace(
  /(^\w+:|^)\/\//,
  ''
);



================================================
FILE: src/lib/helper-server.ts
================================================
import { randomBytes } from 'crypto';
import { prisma } from './db';

/**
 * Returns true if slug exists in database.
 */
export async function checkSlugExists(slug: string): Promise<boolean> {
  const link = await prisma.link
    .findUnique({
      where: {
        slug
      }
    })
    .catch(() => null);

  return !!link;
}

/**
 * Returns a random string for slug.
 */
export function generateRandomSlug(): string {
  return randomBytes(3).toString('hex');
}

/**
 * Returns the bearer token from the request headers.
 */
export function getBearerToken(headers: Headers): string | null {
  const authorization = headers.get('authorization');

  if (!authorization) return null;

  const [authType, bearerToken] = authorization.split(' ');

  if (authType.toLowerCase() !== 'bearer' || !bearerToken) return null;

  return bearerToken;
}

/**
 * Returns the origin from the request headers.
 */
export function getOrigin(headers: Headers): string | null {
  const origin = headers.get('origin');

  if (origin) return origin;

  const referer = headers.get('referer');

  if (!referer) return null;

  const originFromReferer = new URL(referer).origin;

  return originFromReferer;
}



================================================
FILE: src/lib/helper.ts
================================================
import { URL_WITHOUT_PROTOCOL } from './env';

/**
 * Returns true if the url is not from the same domain.
 */
export function checkIfUrlIsValid(url: string): boolean {
  return !url.includes(URL_WITHOUT_PROTOCOL);
}

/**
 * Returns the bearer token from the request headers.
 */
export function getBearerToken(headers: Headers): string | null {
  const authorization = headers.get('authorization');

  if (!authorization) return null;

  const [authType, bearerToken] = authorization.split(' ');

  if (authType.toLowerCase() !== 'bearer' || !bearerToken) return null;

  return bearerToken;
}

/**
 * Returns the origin from the request headers.
 */
export function getOrigin(headers: Headers): string | null {
  const origin = headers.get('origin');

  if (origin) return origin;

  const referer = headers.get('referer');

  if (!referer) return null;

  return new URL(referer).origin;
}



================================================
FILE: src/lib/rate-limit.ts
================================================
import { LRUCache } from 'lru-cache';

type Options = {
  interval?: number;
  uniqueTokenPerInterval?: number;
};

/**
 * Rate limit helper.
 *
 * @param {Options} [options] Options
 * @param {number} [options.interval=60000] Interval in milliseconds
 * @param {number} [options.uniqueTokenPerInterval=500] Max unique tokens per interval
 */
export function rateLimit({
  interval = 60 * 1000,
  uniqueTokenPerInterval = 500
}: Options = {}): {
  check: (options: {
    limit: number;
    token: string;
    headers: Headers;
  }) => Promise<void>;
} {
  const tokenCache = new LRUCache({
    ttl: interval,
    max: uniqueTokenPerInterval
  });

  return {
    check: ({ headers, limit, token }) =>
      new Promise((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];

        if (tokenCount[0] === 0) tokenCache.set(token, tokenCount);

        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        const limitRemaining = isRateLimited ? 0 : limit - currentUsage;

        headers.set('X-RateLimit-Limit', limit.toString());
        headers.set('X-RateLimit-Remaining', limitRemaining.toString());

        return isRateLimited ? reject() : resolve();
      })
  };
}



================================================
FILE: src/lib/prisma/schema.prisma
================================================
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}

model Link {
  id        String   @id @default(uuid()) @db.Uuid
  url       String   @db.VarChar(255)
  slug      String   @unique @db.VarChar(255)
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz()

  @@map("link")
}



================================================
FILE: src/lib/prisma/migrations/migration_lock.toml
================================================
# Please do not edit this file manually
# It should be added in your version-control system (i.e. Git)
provider = "postgresql"


================================================
FILE: src/lib/prisma/migrations/20231108140054_init/migration.sql
================================================
-- CreateTable
CREATE TABLE "links" (
    "id" UUID NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_slug_key" ON "links"("slug");



================================================
FILE: src/lib/prisma/migrations/20240201140305_rename_table_to_singular/migration.sql
================================================
-- RenameTable
ALTER TABLE "links" RENAME TO "link";



================================================
FILE: src/lib/prisma/migrations/20240201141221_sync_indexes_to_new_table_name/migration.sql
================================================
-- AlterTable
ALTER TABLE "link" RENAME CONSTRAINT "links_pkey" TO "link_pkey";

-- RenameIndex
ALTER INDEX "links_slug_key" RENAME TO "link_slug_key";



================================================
FILE: src/lib/types/api.ts
================================================
export type APIResponse<T = void> = {
  message: string;
  data?: T;
};



================================================
FILE: src/lib/types/meta.ts
================================================
import type { Link } from '@/app/schema';

export type LinkMeta = Required<Link> & {
  successUrl: string;
  redirectUrl: string;
};



================================================
FILE: src/lib/types/qrcode.d.ts
================================================
declare module 'qrcode' {
  export function toDataURL(
    text: string,
    options?: object
  ): Promise<string>;
}


================================================
FILE: src/styles/globals.scss
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply mx-auto grid min-h-screen max-w-6xl grid-rows-[auto,1fr,auto] bg-black px-4 text-white;
  }

  main {
    @apply layout md:pt-12;
  }

  ::selection {
    @apply bg-accent-main text-white;
  }
}

// @layer base {
//   body {
//     @apply mx-auto grid min-h-screen max-w-6xl grid-rows-[auto,1fr,auto] bg-black px-4 text-white;
//     background-image: url('https://i.giphy.com/l1J3ThqHNWUVtZV1m.webp');
//     background-position: center;
//     background-repeat: no-repeat;
//     background-size: cover;
//     background-attachment: fixed; 
//   }

//   main {
//     @apply layout md:pt-12;
//   }

//   ::selection {
//     @apply bg-accent-main text-white;
//   }
// }

@layer components {
  .layout {
    @apply mx-auto w-11/12 max-w-6xl;
  }

  .card-layout {
    @apply grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4;
  }

  .custom-button {
    @apply px-4 py-2 font-bold;
  }

  .main-border {
    @apply border border-gray-300 dark:border-gray-600;
  }

  .custom-input {
    @apply main-border rounded-md bg-white px-3 py-2 outline-none transition focus:border-accent-main dark:bg-black;
  }

  .smooth-tab {
    @apply rounded-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-main;
  }

  .clickable {
    @apply smooth-tab main-border rounded-md shadow-sm transition enabled:hover:scale-[1.03] 
           enabled:hover:shadow-md enabled:active:scale-[0.97] disabled:brightness-50;

    &:focus-visible {
      @apply scale-[1.03] shadow-md;
    }
  }

  .gradient-title {
    @apply bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent;
  }

  .custom-underline {
    @apply underline decoration-transparent outline-none transition [text-decoration-thickness:1px] 
           hover:decoration-inherit focus-visible:decoration-inherit;
  }

  .animated-underline {
    background-size: 0 2px;
    background-position: 0 100%;

    @apply bg-gradient-to-r from-accent-start to-accent-end bg-no-repeat pb-0.5 no-underline 
           outline-none transition-all duration-300;

    &.with-dots {
      @apply border-b border-dotted border-black dark:border-white;
    }

    &:hover,
    &:focus-visible {
      background-size: 100% 2px;

      &.with-dots {
        @apply border-transparent;
      }
    }
  }
}



================================================
FILE: .github/workflows/deployment.yaml
================================================
name: 🚀 Deployment

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

jobs:
  type-check:
    name: ✅ Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Download deps
        run: npm ci

      - name: Check types
        run: npm run type-check

  eslint:
    name: 🧪 ESLint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Download deps
        run: npm ci

      - name: Lint
        run: npm run lint

  prettier:
    name: 🔍 Prettier
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Download deps
        run: npm ci

      - name: Format
        run: npm run format



================================================
FILE: .github/workflows/migrate-database.yaml
================================================
name: ⬆️ Deploy migrations to database
on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: 🔥 Migrate
    runs-on: ubuntu-latest
    environment: Production
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Download deps
        run: npm ci

      - name: Apply all pending migrations to the database
        run: npx prisma migrate deploy
        env:
          POSTGRES_PRISMA_URL: ${{ secrets.POSTGRES_PRISMA_URL }}
          POSTGRES_URL_NON_POOLING: ${{ secrets.POSTGRES_URL_NON_POOLING }}



================================================
FILE: .husky/commit-msg
================================================
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1



================================================
FILE: .husky/pre-commit
================================================
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run type-check
npm run sort-imports 
npm run lint

npx lint-staged

