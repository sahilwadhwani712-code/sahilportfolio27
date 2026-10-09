import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, PenLine } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Note = { id: string; name: string; message: string; created_at: string };

const Guestbook = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    supabase.from("guestbook").select("*").order("created_at", { ascending: false }).limit(30)
      .then(({ data }) => data && setNotes(data as Note[]));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim(), m = message.trim();
    if (!n || !m) return toast.error("Name aur note dono likho");
    if (n.length > 40 || m.length > 280) return toast.error("Thoda chhota likho");
    setSending(true);
    const { data, error } = await supabase.from("guestbook").insert({ name: n, message: m }).select().single();
    setSending(false);
    if (error) return toast.error("Note save nahi hua, dobara try karo");
    setNotes((prev) => [data as Note, ...prev]);
    setMessage("");
    toast.success("Thanks for the note!");
  };

  return (
    <section id="guestbook" aria-labelledby="gb-title" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-primary"><PenLine className="w-3.5 h-3.5" /> Guestbook</span>
        <h2 id="gb-title" className="font-display text-2xl sm:text-4xl font-bold mt-2 text-foreground">Leave a note</h2>
        <p className="font-body text-sm text-muted-foreground mt-2">Say hi, drop a song, or tell me what to build next.</p>

        <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-[180px_1fr_auto]">
          <label className="sr-only" htmlFor="gb-name">Your name</label>
          <input id="gb-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Your name"
            className="rounded-xl border border-border/60 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
          <label className="sr-only" htmlFor="gb-msg">Your note</label>
          <input id="gb-msg" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={280} placeholder="Your note (max 280)"
            className="rounded-xl border border-border/60 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
          <button type="submit" disabled={sending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-display font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity">
            <Send className="w-4 h-4" /> {sending ? "Sending" : "Send"}
          </button>
        </form>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          <AnimatePresence initial={false}>
            {notes.map((n) => (
              <motion.li key={n.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border/50 bg-card/40 p-4">
                <p className="font-body text-sm text-foreground leading-relaxed break-words">“{n.message}”</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {n.name} · {new Date(n.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
          {notes.length === 0 && <li className="font-body text-sm text-muted-foreground">Be the first to leave a note.</li>}
        </ul>
      </div>
    </section>
  );
};

export default Guestbook;
