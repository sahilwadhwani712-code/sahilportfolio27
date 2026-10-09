CREATE TABLE public.guestbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.guestbook TO anon, authenticated;
GRANT ALL ON public.guestbook TO service_role;
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read notes" ON public.guestbook FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can leave a short note" ON public.guestbook FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(btrim(name)) BETWEEN 1 AND 40 AND char_length(btrim(message)) BETWEEN 1 AND 280);