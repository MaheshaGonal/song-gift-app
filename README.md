# A Song For Them — full stack

A Next.js site for taking orders for custom AI songs/videos, taking payment
via Razorpay, and managing delivery from a simple admin dashboard.

## What's actually built

- **Landing page** (`/`) — hero, demo player, pricing (₹399 song / ₹1,999
  song+video), order form
- **Order flow** — form submits → saves to Supabase → opens Razorpay
  checkout → webhook marks it paid
- **Admin dashboard** (`/admin`) — password-protected, lists every order,
  lets you paste a finished file link and mark it delivered
- **Database** — Supabase (Postgres), schema in `supabase/schema.sql`

## What you still need to do yourself

I can't create accounts or go live on your behalf — these need your own
sign-ups, phone/business verification, and real payment credentials. Here's
exactly what to do, in order.

### 1. Create a Supabase project (free)
1. Go to supabase.com → New project
2. Once it's created, go to **SQL Editor** → paste the contents of
   `supabase/schema.sql` → Run
3. Go to **Project Settings → API** — copy the Project URL, the `anon`
   public key, and the `service_role` key

### 2. Create a Razorpay account
1. Go to razorpay.com → sign up (you'll need PAN + bank details for
   payouts, but you can start in **Test Mode** immediately without them)
2. Dashboard → **Settings → API Keys** → generate keys → copy Key ID and
   Key Secret
3. Dashboard → **Settings → Webhooks** → add a webhook:
   - URL: `https://YOUR-DOMAIN/api/razorpay/webhook` (you'll have this
     after step 4)
   - Active events: `payment.captured`
   - Secret: make up a long random string, save it — you'll need it below
4. Switch to Live Mode and repeat once you're ready to take real money

### 3. Fill in your environment variables
Copy `.env.example` to `.env.local` and fill in every value from steps 1–2,
plus:
- `ADMIN_PASSWORD` — whatever password you want to use to log into `/admin`

### 4. Run it locally to check everything works
```bash
npm install
npm run dev
```
Open `http://localhost:3000`. Place a test order (Razorpay Test Mode uses
fake card `4111 1111 1111 1111`, any future expiry, any CVV). Check that a
row appears in your Supabase `orders` table with `payment_status: paid`.

### 5. Put your sample songs in
Drop real MP3 files into `public/samples/` named exactly:
- `wedding-sample.mp3`
- `birthday-sample.mp3`
- `anniversary-sample.mp3`

(To change the names/stories/captions next to each, edit
`src/components/DemoPlayers.tsx`.)

### 6. Push to GitHub
```bash
git init
git add .
git commit -m "Initial site"
gh repo create song-gift-app --private --source=. --push
```
(Or create the repo on github.com and follow its "push an existing repo"
instructions.)

### 7. Deploy to Vercel (free)
1. Go to vercel.com → New Project → import your GitHub repo
2. In **Environment Variables**, paste in everything from your
   `.env.local` (same names, same values — but use your Razorpay **live**
   keys once you're ready to charge real customers)
3. Deploy
4. Go back to Razorpay's webhook settings and update the URL to your real
   Vercel domain (e.g. `https://song-gift-app.vercel.app/api/razorpay/webhook`)

### 8. Add your own domain (optional)
Vercel → your project → **Settings → Domains** → add your domain → follow
the DNS instructions it gives you (usually one CNAME record at your
registrar).

## Using the admin dashboard day to day

1. Go to `yourdomain.com/admin`, enter your `ADMIN_PASSWORD`
2. You'll see every order, newest first, with payment status
3. Once you've made the song/video, upload it anywhere you like (Google
   Drive, Supabase Storage, WeTransfer) and get a shareable link
4. Paste that link into the order's "delivered file" field and click
   **Mark delivered**
5. That's currently a manual step — send the customer that link yourself
   over WhatsApp/email. Automating that last mile (auto-notify on
   delivery) is a good next job for your n8n setup.

## Project structure
```
src/
  app/
    page.tsx                    the landing page
    admin/page.tsx               admin dashboard
    order/success/page.tsx       post-payment thank-you page
    api/
      orders/route.ts            saves a new order
      razorpay/create-order/     starts a Razorpay payment
      razorpay/webhook/          confirms payment, marks order paid
      admin/orders/              lists orders (admin only)
      admin/deliver/             marks an order delivered (admin only)
  components/
    DemoPlayers.tsx               the tabbed sample player
    OrderForm.tsx                 the order form + checkout trigger
  lib/
    supabase.ts                   database clients
    razorpay.ts                   payment client + pricing
    adminAuth.ts                  admin password check
supabase/schema.sql                run this once in Supabase
```
