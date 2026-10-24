// Card art. Colours follow the section's --accent.
const PANEL = "border border-white/90 bg-white/70 shadow-[0_18px_45px_rgba(36,42,65,.085)] dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[0_18px_45px_rgba(0,0,0,.35)] transition-transform duration-700 ease-brand group-hover:[transform:rotate(0deg)_translateY(-3px)]";
const WIN_HEAD = `<div class="flex h-3.5 gap-1 border-b border-[rgba(30,40,55,.12)] dark:border-white/10 pb-3"><i class="h-2 w-2 rounded-full bg-[rgba(30,40,55,.25)] dark:bg-white/25"></i><i class="h-2 w-2 rounded-full bg-[rgba(30,40,55,.25)] dark:bg-white/25"></i><i class="h-2 w-2 rounded-full bg-[rgba(30,40,55,.25)] dark:bg-white/25"></i></div>`;
const UI_TITLE = "my-3 text-sm font-bold";
const win = (title, body) => `<div class="${PANEL} min-h-36 w-[88%] -rotate-2 rounded-2xl p-3.5">${WIN_HEAD}<div class="${UI_TITLE}">${title}</div>${body}</div>`;
// Keep class names as complete strings so the Tailwind scanner can find them.
const BARS = ["h-[34%]", "h-[53%]", "h-[45%]", "h-[76%]", "h-[62%]", "h-[96%]"];
const ART = {
    chart: t => win(t, `<div class="flex h-24 items-end gap-2.5 px-3.5">${BARS.map(h => `<i class="flex-1 rounded-t-lg rounded-b-sm bg-[var(--accent)] opacity-80 ${h}"></i>`).join("")}</div>`),
    flow: (...rows) => `<div class="grid w-[90%] gap-2">${rows.map(([a, b]) => `<div class="flex justify-between gap-3 rounded-xl border border-white/75 bg-white/60 dark:border-white/10 dark:bg-white/[0.07] px-3.5 py-3 text-sm"><b class="font-bold">${a}</b><span class="opacity-65">${b}</span></div>`).join("")}</div>`,
    timeline: () => `<div class="${PANEL} w-[88%] rotate-2 rounded-2xl p-5">${[["●", "Built", "w-[82%]"], ["●", "Learned", "w-[64%]"], ["●", "Kept", "w-[48%]"]].map(([y, a, w]) => `<div class="grid grid-cols-[20px_1fr] items-center gap-3 py-2.5 text-sm"><b class="text-[var(--accent)]">${y}</b><div><div class="font-bold">${a}</div><div class="mt-2 h-2 ${w} rounded-lg bg-[rgba(25,35,50,.12)] dark:bg-white/10"></div></div></div>`).join("")}</div>`,

    // Below: each card draws a shrunken view of the page it links to.
    // ML Playgrounds: logistic regression, the sigmoid fitted to 0/1 labels and its 0.5 threshold
    ml: () => {
        const ones = [38, 52, 58, 64, 72, 80, 88, 94], zeros = [6, 14, 22, 30, 36, 44, 48, 62];
        const dot = (x, y, on) => `<i class="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${on ? "bg-[var(--accent)]" : "border-2 border-[rgba(30,40,55,.35)] dark:border-white/40"}" style="left:${x}%;top:${y}%"></i>`;
        return win("Logistic regression", `<div class="relative h-28"><svg class="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" vector-effect="non-scaling-stroke" opacity=".3"/><line x1="50" y1="0" x2="50" y2="100" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 4" vector-effect="non-scaling-stroke" opacity=".5"/><polyline points="0,89.8 4,89.7 8,89.6 12,89.3 16,88.9 20,88.2 24,87.0 28,85.2 32,82.4 36,78.2 40,72.2 44,64.3 48,55.0 52,45.0 56,35.7 60,27.8 64,21.8 68,17.6 72,14.8 76,13.0 80,11.8 84,11.1 88,10.7 92,10.4 96,10.3 100,10.2" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>${ones.map(x => dot(x, 10, 1)).join("")}${zeros.map(x => dot(x, 90, 0)).join("")}<span class="absolute -left-1 top-1/2 -translate-y-1/2 text-[10px] opacity-50">0.5</span><span class="absolute bottom-[-2px] right-0 translate-y-full rounded-full border border-white/85 bg-white/70 px-2 py-0.5 font-mono text-[11px] dark:border-white/10 dark:bg-black/30">σ(wx + b)</span></div><div class="h-5"></div>`);
    },
    // Teacher Utility Kit: its landing in miniature, the gradient title over the five work areas
    kit: () => `<div class="${PANEL} w-[88%] -rotate-2 overflow-hidden rounded-2xl p-3.5">${WIN_HEAD}<div class="mt-3 rounded-xl bg-[linear-gradient(to_bottom,#c2b8f4,#f2c8dc_60%,#ffcfb3)] px-3 py-4 text-center dark:bg-[linear-gradient(to_bottom,#1c1645,#30184a)]"><b class="bg-[linear-gradient(100deg,#3346b0,#a03a74_68%,#bb5227)] bg-clip-text pb-[.1em] text-lg font-extrabold leading-none tracking-[-.05em] text-transparent dark:bg-[linear-gradient(100deg,#a9b8ff,#ff9fcb_68%,#ffb48f)]">Free. Open. Uncompromising.</b></div><div class="mt-2.5 flex flex-wrap justify-center gap-1.5 text-xs">${[["Teaching", "bg-[#dfe7ff] dark:bg-[#1d2550]"], ["Assessment", "bg-[#f6e3ef] dark:bg-[#3a1d33]"], ["Records", "bg-[#e7e1fb] dark:bg-[#271f4a]"], ["Admissions", "bg-[#fbe6dc] dark:bg-[#3d2418]"], ["Operations", "bg-[#dff1ea] dark:bg-[#17352c]"]].map(([s, c]) => `<span class="rounded-lg px-2.5 py-1.5 font-semibold ${c}">${s}</span>`).join("")}</div></div>`,
    // Timeline: years down a rail, newest first
    eras: () => `<div class="${PANEL} relative w-[88%] rotate-2 rounded-2xl py-3.5 pl-5 pr-4 text-sm"><i class="absolute bottom-6 left-[calc(2rem-1px)] top-6 w-0.5 bg-[rgba(30,40,55,.18)] dark:bg-white/20"></i>${[["2026", "luminousky"], ["2024", "CS Education Tools"], ["2021", "Computer Science"], ["2015", "Software for Others"], ["2012", "First ROM & Kernel"]].map(([y, t], i) => `<div class="relative grid grid-cols-[24px_3em_1fr] items-center gap-2 py-1.5"><i class="mx-auto h-2.5 w-2.5 rounded-full ${i ? "bg-[var(--accent)] opacity-50" : "bg-[var(--accent)] shadow-[0_0_0_4px_rgba(255,255,255,.6)] dark:shadow-[0_0_0_4px_rgba(255,255,255,.12)]"}"></i><b class="tabular-nums text-[var(--accent)]">${y}</b><span class="truncate ${i ? "opacity-70" : "font-semibold"}">${t}</span></div>`).join("")}</div>`
};

const SECTIONS = [
    { id: "work", title: "Work", line: "Tools that start with a real problem and stop when the answer is simple — free to use, and made to keep working long after the hype moves on.", tools: [
        { name: "ML Playgrounds", copy: "Hands-on machine learning in the browser. Nothing leaves your device.", tag: "Machine Learning", url: "https://luminousky.com/ml-playgrounds/", art: ART.ml() },
        { name: "Teacher Utility Kit", copy: "Less routine work. More time for teaching.", tag: "For teachers", url: "https://luminousky.com/teacher-utility-kit/", art: ART.kit() }
    ]},
    { id: "archive", title: "Archive", line: "A running record of what I've built, learned, and kept — from a first custom ROM to the tools teachers use today, each one a step toward simpler, longer-lasting work.", tools: [
        { name: "The Timeline", copy: "Everything so far, in the order it happened.", tag: "Archive", url: "https://luminousky.com/archive/timeline", art: ART.eras() }
    ]}
];

// Layout: each row sums to 12 columns. Mobile one column, tablet 6+6, desktop per the table.
// A card left alone on its row spans the full width and splits text/art side by side.
const DESKTOP = { 1: [12], 2: [7, 5], 3: [7, 5, 12], 4: [7, 5, 5, 7] };
const SPAN_LG = { 4: "lg:col-span-4", 5: "lg:col-span-5", 6: "lg:col-span-6", 7: "lg:col-span-7", 12: "lg:col-span-12" };
const layout = n => DESKTOP[n] || Array.from({ length: n }, (_, i) => (n % 2 && i === n - 1 ? 12 : 6));

const SPLIT = {
    sm: { card: "sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(260px,.8fr)] sm:grid-rows-[auto_auto_1fr] sm:gap-x-[5%] sm:min-h-72", text: "sm:col-start-1", art: "sm:col-start-2 sm:row-span-3 sm:row-start-1 sm:m-0 sm:min-h-56" },
    lg: { card: "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,.8fr)] lg:grid-rows-[auto_auto_1fr] lg:gap-x-[5%] lg:min-h-72", text: "lg:col-start-1", art: "lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:m-0 lg:min-h-56" },
    // The only card in its section: as tall as the others, with larger art.
    solo: { card: "sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:grid-rows-[auto_auto_1fr] sm:gap-x-[6%] sm:min-h-[clamp(260px,min(36vw,52svh),480px)]", text: "sm:col-start-1 sm:self-start", art: "sm:col-start-2 sm:row-span-3 sm:row-start-1 sm:m-0 sm:min-h-full sm:scale-110" },
    lgOff: { card: "lg:flex lg:min-h-[clamp(260px,min(36vw,52svh),480px)]", text: "", art: "lg:-mx-1 lg:-mb-1.5 lg:mt-5 lg:min-h-48" }
};
const REVEAL = "opacity-0 blur-sm [translate:0_34px]";
const CARD = "group relative isolate col-span-1 flex min-h-80 min-w-0 flex-col overflow-hidden rounded-3xl border border-white/75 bg-white/50 p-5 shadow-[0_14px_50px_rgba(43,49,72,.055),inset_0_1px_0_rgba(255,255,255,.88)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_14px_50px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)] dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:before:bg-[radial-gradient(360px_circle_at_var(--pointer-x,50%)_var(--pointer-y,50%),rgba(255,255,255,.08),transparent_68%)] backdrop-blur-sm sm:backdrop-blur-lg backdrop-saturate-150 [transform:perspective(1100px)_rotateX(var(--card-rx,0deg))_rotateY(var(--card-ry,0deg))] transition-[opacity,filter,translate,transform,background-color,box-shadow,border-color] duration-1000 ease-brand hover:border-white hover:bg-white/65 hover:shadow-[0_28px_76px_rgba(43,49,72,.105),inset_0_1px_0_#fff] hover:[transform:perspective(1100px)_rotateX(var(--card-rx,0deg))_rotateY(var(--card-ry,0deg))_translateY(-8px)] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-[radial-gradient(360px_circle_at_var(--pointer-x,50%)_var(--pointer-y,50%),rgba(255,255,255,.7),transparent_68%)] before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] hover:before:opacity-100 sm:min-h-[clamp(260px,min(36vw,52svh),480px)] sm:rounded-[clamp(24px,2.3vw,34px)] sm:p-[clamp(20px,2.2vw,32px)] md:backdrop-blur-xl md:backdrop-saturate-150 motion-reduce:hover:[transform:none]";

const card = (t, span, alone, solo) => {
    // alone: the last card of an odd count, left by itself on a tablet row
    const s = [];
    if (solo) s.push(SPLIT.solo);
    else if (alone) s.push(SPLIT.sm);
    if (span === 12 && !solo) s.push(SPLIT.lg); else if (alone && !solo) s.push(SPLIT.lgOff);
    const pick = k => s.map(x => x[k]).join(" ");
    return `
    <a class="${CARD} ${alone ? "sm:col-span-12" : "sm:col-span-6"} ${SPAN_LG[span]} ${pick("card")} ${REVEAL}" data-reveal href="${t.url}">
        <div class="relative z-20 flex items-center justify-between gap-4 text-sm opacity-80 ${pick("text")}">
            <span class="rounded-full border border-black/15 bg-white/60 dark:border-white/20 dark:bg-white/[0.08] px-2.5 py-1 text-xs">${t.tag}</span>
            <span aria-hidden="true" class="text-2xl text-[var(--accent)] transition-transform duration-500 ease-brand group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </div>
        <h3 class="relative z-20 mb-2 mt-5 text-2xl font-bold leading-none tracking-[-.06em] sm:text-[clamp(24px,2.3vw,34px)] ${pick("text")}">${t.name}</h3>
        <p class="relative z-20 max-w-lg text-base leading-normal opacity-80 ${pick("text")}">${t.copy}</p>
        <div aria-hidden="true" class="relative z-20 -mx-1 -mb-1.5 mt-5 flex min-h-48 sm:min-h-[clamp(96px,24svh,192px)] flex-1 items-center justify-center ${pick("art")}">${t.art}</div>
    </a>`;
};

// Abstract shape behind each section. ORB owns colour, opacity and parallax; SHAPES only shape and position.
// Sections without a shape take the next one in the cycle, so adding a section needs no other change.
const ORB = "before:absolute before:-z-10 before:opacity-50 before:mix-blend-multiply dark:before:mix-blend-screen dark:before:opacity-40 sm:before:opacity-70 dark:sm:before:opacity-50 before:blur-sm before:content-[''] before:[translate:var(--orb-x,0)_var(--orb-y,0)] before:transition-[translate] before:duration-1000 before:ease-brand";
const SHAPES = {
    halo: "before:right-[-40vw] before:top-[2%] before:aspect-square before:w-[115vw] before:rounded-full before:bg-[radial-gradient(circle,transparent_44%,var(--orb)_46%,var(--orb)_60%,transparent_62%)] sm:before:right-[-22vw] sm:before:w-[min(70vw,960px)]",
    horizon: "before:bottom-[-30%] before:left-1/2 before:h-[60%] before:w-[150vw] before:-translate-x-1/2 before:rounded-[50%] before:bg-[var(--orb)] sm:before:w-[min(120vw,1600px)]",
};
const SHAPE_CYCLE = Object.values(SHAPES);

// From lg up each section is exactly one screen and snaps only at its top, CSS alone.
// Spacing, heading and cards scale with svh so the content fits on short screens too;
// a section taller than the screen would let the snap stop at its bottom edge.
document.getElementById("chapters").innerHTML = SECTIONS.map((s, i) => {
    const n = s.tools.length, spans = layout(n);
    return `
    <section id="${s.id}" data-tone="${s.id}" aria-labelledby="${s.id}-h" class="snap-start lg:snap-always relative isolate overflow-hidden px-4 pb-24 pt-24
        ${ORB} ${SHAPES[s.shape] ?? SHAPE_CYCLE[i % SHAPE_CYCLE.length]}
        lg:flex lg:h-svh lg:flex-col lg:justify-center sm:px-[clamp(20px,5.5vw,88px)] sm:pb-[clamp(32px,7svh,96px)] sm:pt-[clamp(72px,12svh,150px)]">
        <div data-reveal class="mx-auto mb-[clamp(28px,4vw,52px)] sm:mb-[clamp(16px,min(4vw,4svh),52px)] flex w-full max-w-5xl flex-col items-start gap-6 md:flex-row md:items-end md:justify-between ${REVEAL} transition-[opacity,filter,translate] duration-1000 ease-brand">
            <div>
            <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">${String(i + 1).padStart(2, "0")} — ${s.title}</p>
            <h2 id="${s.id}-h" class="text-[clamp(56px,17vw,88px)] font-extrabold leading-[.86] tracking-[-.08em] sm:text-[clamp(48px,min(10vw,14svh),142px)]">${s.title}</h2>
            </div>
            <p class="mb-1.5 max-w-lg text-[clamp(16px,1.35vw,19px)] leading-normal tracking-tight opacity-80 md:max-w-sm md:text-right">${s.line}</p>
        </div>
        <div class="mx-auto grid w-full max-w-5xl grid-cols-1 gap-3.5 sm:grid-cols-12 sm:gap-[clamp(12px,1.45vw,22px)]">
            ${s.tools.map((t, i) => card(t, spans[i], n % 2 === 1 && i === n - 1, n === 1)).join("")}
        </div>
    </section>`;
}).join("");

const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const syncLabel = () => toggle.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
syncLabel();
toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    syncLabel();
});

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const nav = document.getElementById("nav");
const NAV_SCROLLED = ["!bg-[rgba(251,251,253,.8)]", "dark:!bg-[rgba(0,0,0,.72)]", "!border-black/[0.06]", "dark:!border-white/[0.08]", "shadow-[0_8px_30px_rgba(30,35,55,.045)]", "backdrop-blur-xl", "backdrop-saturate-150"];
const sections = [...document.querySelectorAll("#chapters > section")];
const reveals = [...document.querySelectorAll("[data-reveal]")];
const show = el => el.classList.remove(...REVEAL.split(" "));

if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(show);
} else {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        show(e.target);
        io.unobserve(e.target);
    }), { threshold: .12, rootMargin: "0px 0px -5% 0px" });
    reveals.forEach(el => io.observe(el));
}

if ("IntersectionObserver" in window) {
    const links = [...document.querySelectorAll("#nav nav a")];
    const so = new IntersectionObserver(entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => a.hash === "#" + e.target.id ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current"));
    }), { rootMargin: "-42% 0px -42% 0px" });
    [...sections, document.getElementById("about")].forEach(s => so.observe(s));
}

// Nudge the background shapes as the page scrolls.
// Only sections on screen get updated; rewriting every section's blurred layer each frame is wasted paint.
const visible = new Set("IntersectionObserver" in window ? [] : sections);
if ("IntersectionObserver" in window) {
    const vo = new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
        onScroll();
    });
    sections.forEach(s => vo.observe(s));
}
let ticking = false;
const onScroll = () => {
    NAV_SCROLLED.forEach(c => nav.classList.toggle(c, scrollY > 24));
    if (!reduceMotion) visible.forEach(s => {
        const r = s.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, (innerHeight * .5 - (r.top + r.height * .5)) / (innerHeight + r.height * .5)));
        s.style.setProperty("--orb-x", `${p * 28}px`);
        s.style.setProperty("--orb-y", `${p * -18}px`);
    });
    ticking = false;
};
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

// Cards tilt slightly toward the pointer and a soft light follows it.
if (!reduceMotion && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll("[data-reveal][href]").forEach(c => {
        c.addEventListener("pointermove", e => {
            const r = c.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
            c.style.setProperty("--pointer-x", `${x * 100}%`);
            c.style.setProperty("--pointer-y", `${y * 100}%`);
            c.style.setProperty("--card-rx", `${(.5 - y) * 2.1}deg`);
            c.style.setProperty("--card-ry", `${(x - .5) * 2.6}deg`);
        });
        c.addEventListener("pointerleave", () => { c.style.setProperty("--card-rx", "0deg"); c.style.setProperty("--card-ry", "0deg"); });
    });
}
