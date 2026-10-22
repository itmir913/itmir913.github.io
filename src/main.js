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
    timeline: () => `<div class="${PANEL} w-[88%] rotate-2 rounded-2xl p-5">${[["●", "Built", "w-[82%]"], ["●", "Learned", "w-[64%]"], ["●", "Kept", "w-[48%]"]].map(([y, a, w]) => `<div class="grid grid-cols-[20px_1fr] items-center gap-3 py-2.5 text-sm"><b class="text-[var(--accent)]">${y}</b><div><div class="font-bold">${a}</div><div class="mt-2 h-2 ${w} rounded-lg bg-[rgba(25,35,50,.12)] dark:bg-white/10"></div></div></div>`).join("")}</div>`
};

const SECTIONS = [
    { id: "work", title: "Work", line: "Tools that start with a real problem and stop when the answer is simple.", tools: [
        { name: "ML Playgrounds", copy: "Hands-on machine learning in the browser. Nothing leaves your device.", tag: "Machine Learning", url: "https://luminousky.com/ml-playgrounds/", art: ART.chart("Model training") },
        { name: "Teacher Utility Kit", copy: "Less routine work. More time for teaching.", tag: "For teachers", url: "https://luminousky.com/teacher-utility-kit/", art: ART.flow(["Teaching", "Class"], ["Records", "Write"], ["Operations", "Daily"]) }
    ]},
    { id: "archive", title: "Archive", line: "A running record of what I've built, learned, and kept.", tools: [
        { name: "The Timeline", copy: "Everything so far, in the order it happened.", tag: "Archive", url: "https://luminousky.com/archive/timeline", art: ART.timeline() }
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
            <span class="rounded-full border border-white/85 bg-white/60 dark:border-white/10 dark:bg-white/[0.08] px-2.5 py-1 text-xs">${t.tag}</span>
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
    orb: "before:right-[-35vw] before:top-[4%] before:aspect-square before:w-[110vw] before:rounded-full before:bg-[var(--orb)] sm:before:right-[-24vw] sm:before:w-[min(72vw,980px)]",
    arch: "before:bottom-0 before:right-[-8vw] before:h-[70%] before:w-[70vw] before:rounded-t-full before:bg-[var(--orb)] sm:before:right-[6vw] sm:before:w-[min(38vw,520px)]",
};
const SHAPE_CYCLE = Object.values(SHAPES);

// From sm up each section is exactly one screen and snaps only at its top, CSS alone.
// Spacing, heading and cards scale with svh so the content fits on short screens too;
// a section taller than the screen would let the snap stop at its bottom edge.
document.getElementById("chapters").innerHTML = SECTIONS.map((s, i) => {
    const n = s.tools.length, spans = layout(n);
    return `
    <section id="${s.id}" data-tone="${s.id}" aria-labelledby="${s.id}-h" class="snap-start snap-always relative isolate overflow-hidden px-4 pb-24 pt-24
        ${ORB} ${SHAPES[s.shape] ?? SHAPE_CYCLE[i % SHAPE_CYCLE.length]}
        sm:flex sm:h-svh sm:flex-col sm:justify-center sm:px-[clamp(20px,5.5vw,88px)] sm:pb-[clamp(32px,7svh,96px)] sm:pt-[clamp(72px,12svh,150px)]">
        <div data-reveal class="mx-auto mb-[clamp(28px,4vw,52px)] sm:mb-[clamp(16px,min(4vw,4svh),52px)] flex w-full max-w-6xl flex-col items-start gap-6 md:flex-row md:items-end md:justify-between ${REVEAL} transition-[opacity,filter,translate] duration-1000 ease-brand">
            <h2 id="${s.id}-h" class="text-[clamp(56px,17vw,88px)] font-extrabold leading-[.86] tracking-[-.08em] sm:text-[clamp(48px,min(10vw,14svh),142px)]">${s.title}</h2>
            <p class="mb-1.5 max-w-lg text-[clamp(16px,1.35vw,19px)] leading-normal tracking-tight opacity-80 md:max-w-sm">${s.line}</p>
        </div>
        <div class="mx-auto grid w-full max-w-6xl grid-cols-1 gap-3.5 sm:grid-cols-12 sm:gap-[clamp(12px,1.45vw,22px)]">
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
let ticking = false;
const onScroll = () => {
    NAV_SCROLLED.forEach(c => nav.classList.toggle(c, scrollY > 24));
    if (!reduceMotion) sections.forEach(s => {
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
