/* ========== CONFIG ========== */
const CONFIG = {
  OCR_POOL_MIN: 1,
  OCR_POOL_MAX: Math.max(2, Math.min(6, (navigator.hardwareConcurrency || 4) - 1)),
  OCR_TIMEOUT_MS: 9000,
  PDF_TEXT_TIMEOUT_MS: 3000,
  ANSWER_WAIT_BEFORE_PARTIAL: 6000,
  TEXT_WORDS_THRESHOLD: 18,
  INDEX_REBUILD_BATCH: 40,
  MAX_PAGES_OCR_AT_ONCE: 8
};
/**
 * Converts HTML lists to plain text with bullets.
 * - <li> becomes "• "
 * - </li>, <ul>, </ul> become newlines
 * - All other HTML tags are stripped
 * - Multiple blank lines are collapsed
 */
function htmlToPlainBullets(html) {
  if (!html) return '';

  // Replace <li> with bullet and space
  let text = html.replace(/<li>/gi, '• ');

  // Replace </li> with newline
  text = text.replace(/<\/li>/gi, '\n');

  // Replace <ul> or </ul> with newline
  text = text.replace(/<\/?ul>/gi, '\n');

  // Remove any remaining HTML tags
  text = text.replace(/<\/?[^>]+(>|$)/g, '');

  // Replace multiple blank lines with a single line
  text = text.replace(/\n\s*\n/g, '\n');

  return text.trim();
}

function formatHtmlToBullets(html) {
  if (!html) return '';
  let text = html.replace(/<li>/gi, '• ');
  text = text.replace(/<\/li>/gi, '\n');
  text = text.replace(/<\/?ul>/gi, '\n');
  text = text.replace(/<\/?[^>]+(>|$)/g, '');
  text = text.replace(/\n\s*\n/g, '\n');
  return text.trim();
}
function stripHtmlTags(html) {
  if (!html) return '';
  let text = html.replace(/<li>/gi, '• ');
  text = text.replace(/<\/li>/gi, '\n');
  text = text.replace(/<\/?[^>]+(>|$)/g, '');
  return text.replace(/\n\s*\n/g, '\n').trim();
}
function htmlToTextWithBullets(html) {
    if (!html) return '';

    // Replace <li> with bullet
    let text = html.replace(/<li>/gi, '• ');

    // Replace closing </li> with newline
    text = text.replace(/<\/li>/gi, '\n');

    // Remove all other HTML tags (<ul>, </ul>, etc.)
    text = text.replace(/<\/?[^>]+(>|$)/g, '');

    // Remove extra blank lines
    text = text.replace(/\n\s*\n/g, '\n');

    // Trim leading/trailing spaces
    return text.trim();
}
function formatHtmlToBullets(html) {
  if (!html) return '';

  // Replace <li> with bullets
  let text = html.replace(/<li>/gi, '• ');

  // Replace </li> and <ul> or </ul> with newline
  text = text.replace(/<\/li>/gi, '\n');
  text = text.replace(/<\/?ul>/gi, '\n');

  // Remove any other remaining HTML tags
  text = text.replace(/<\/?[^>]+(>|$)/g, '');

  // Remove multiple blank lines
  text = text.replace(/\n\s*\n/g, '\n');

  return text.trim();
}
// Example usage:
let html = `<ul><li>Why Embedded Linux should be used as an operating system?</li><li>Vendor IndependenceProprietary OS locks you to a single vendor; poor support can delay your product release.Embedded Linux allows switching vendors or going vendor-free with minimal effort.Linux source code is freely available, giving full control over your system.2.</li><li>User Space Initialization Phase • Begins with /sbin/init, controlled by /etc/inittab. • Determines runlevel and system state (e.g., single-user or GUI). • Initializes system via /etc/rc.d/rc.sysinit. • Starts services based on runlevel via /etc/rc.d/rc. • Finally starts login terminal or desktop environment.Answer 5a.Is Linux Too Large? • Linux is modular; you can include only needed components. • Features like networking or file systems can be disabled during configuration. • A basic Linux system needs only ~4 MB SDRAM and 2 MB flash. • With 16–32 MB SDRAM, rich applications can be supported. • uClinux supports no-MMU devices with low memory use. • Small-footprint efforts like ELKS and ThinLinux target embedded devices.</li></ul>`;

console.log(htmlToTextWithBullets(html));

function htmlToPlainBullets(html) {
    if (!html) return '';
    
    // Remove outer <ul> tags
    let text = html.replace(/<\/?ul>/gi, '');
    
    // Split <li> elements into separate lines
    text = text.replace(/<li>/gi, '• ');
    text = text.replace(/<\/li>/gi, '\n');
    
    // Convert nested bullet "• " inside a <li> into separate lines
    text = text.replace(/•\s*/g, '\n• ').replace(/\n\n+/g, '\n'); // remove extra newlines
    
    // Trim leading/trailing spaces
    return text.trim();
}


function formatBullets(text) {
    if (!text) return '';
    // Remove any existing <ul>/<li> tags
    text = text.replace(/<ul>|<\/ul>|<li>|<\/li>/g, '').trim();
    // Split by •, numbered bullets, or sentence boundaries followed by capital letters
    const parts = text.split(/(?:\n|•|\d+\.)\s*/).map(p => p.trim()).filter(Boolean);
    // Join as plain lines with a line break
    return parts.join('\n');
}

/*
 * Patch updateLastAssistant to strip <ul>/<li> tags from html
 */
function updateLastAssistant(html) {
  const msgs = Array.from(document.querySelectorAll('.msg.assist'));
  if (!msgs.length) return appendAssistant(html);
  const last = msgs[msgs.length - 1];
  last.innerHTML = `<div class="meta">Assistant</div><pre>${formatBullets(html)}</pre>`;
  last.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
/*
 * Patch updateLastAssistant to strip <ul>/<li> tags from html
 */
function updateLastAssistant(html) {
  const msgs = Array.from(document.querySelectorAll('.msg.assist'));
  if (!msgs.length) return appendAssistant(html);
  const last = msgs[msgs.length - 1];
  last.innerHTML = `<div class="meta">Assistant</div>${html.replace(/<ul>|<\/ul>|<li>|<\/li>/g, '')}`;
  last.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
function formatBullets(text) {
  // Replace any <ul>/<li> with line breaks
  return text.replace(/<ul>|<\/ul>|<li>|<\/li>/g,'').trim();
}

function updateLastAssistant(html) {
  const msgs = Array.from(document.querySelectorAll('.msg.assist'));
  if (!msgs.length) return appendAssistant(html);
  const last = msgs[msgs.length - 1];
  last.innerHTML = `<div class="meta">Assistant</div>${formatBullets(html)}`;
  last.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
/*
 * Patch renderAnswer to strip <ul>/<li> tags if present
 */
function renderAnswer(text) {
  const container = document.getElementById('answer');
  container.innerHTML = '';
  if (/<ul>/i.test(text)) {
    container.textContent = text.replace(/<ul>|<\/ul>|<li>|<\/li>/g, '').trim();
    return;
  }
  const lines = text.split(/\n+/).filter(l => l.trim() !== '');
  if (lines.length > 1) {
    const ul = document.createElement('ul');
    lines.forEach(line => {
      const li = document.createElement('li');
      li.textContent = line.trim();
      ul.appendChild(li);
    });
    container.appendChild(ul);
  } else {
    container.textContent = text.trim();
  }
}
/* ========== STATE ========== */
const state = {
  docs: [],
  chunks: [],
  images: new Map(),
  index: null,
  parsingTasks: [],
  ocrPool: null,
  chunkCounter: 0
};

/* ========== DOM HELPERS ========== */
const $ = s => document.querySelector(s);
const el = (t, a = {}, children = []) => {
  const n = document.createElement(t);
  for (const k in a) {
    if (k === 'class') n.className = a[k];
    else if (k === 'html') n.innerHTML = a[k];
    else n.setAttribute(k, a[k]);
  }
  for (const c of children) n.appendChild(c);
  return n;
};
const setStatus = (txt) => {
  const s = $('#status');
  if (s) s.textContent = txt;
  console.log('[status]', txt);
};
const setMeter = (pct) => {
  const m = $('#meter');
  if (m) m.style.width = Math.max(0, Math.min(100, pct)) + '%';
};

/* ========== UTILS ========== */
function timeoutPromise(ms, p, fallback = null) {
  return new Promise((resolve) => {
    const id = setTimeout(() => resolve(fallback), ms);
    p.then(r => {
      clearTimeout(id);
      resolve(r);
    }).catch(e => {
      clearTimeout(id);
      resolve(fallback);
    });
  });
}
function sanitizeText(s) {
  return (s || '').replace(/\s+/g, ' ').trim();
}
function tokenizeSentences(txt) {
  return (txt || '').split(/(?<=[.!?])\s+(?=[A-Z0-9\[(])/).filter(Boolean);
}
function chunkText(txt, max = 900) {
  const out = [];
  let cur = '';
  for (const s of tokenizeSentences(txt)) {
    if ((cur + ' ' + s).length > max) {
      if (cur) out.push(cur.trim());
      cur = s;
    } else cur += (cur ? ' ' : '') + s;
  }
  if (cur) out.push(cur.trim());
  return out;
}

/* ========== OCR POOL ========== */
function createOcrPool(size = CONFIG.OCR_POOL_MAX) {
  let workers = [];
  let ready = false;
  let queue = [];
  let inFlight = 0;
  async function bootWorkers() {
    const n = Math.max(CONFIG.OCR_POOL_MIN, Math.min(size, CONFIG.OCR_POOL_MAX));
    workers = await Promise.all(Array.from({ length: n }, async () => {
      const w = await Tesseract.createWorker();
      await w.loadLanguage('eng');
      await w.initialize('eng');
      await w.setParameters({
        tessedit_pageseg_mode: 1,
        preserve_interword_spaces: '1',
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;!?()[]{}-_/+%#@\'" '
      });
      return w;
    }));
    ready = true;
    tick();
  }
  function tick() {
    if (!ready || queue.length === 0) return;
    while (inFlight < workers.length && queue.length) {
      const job = queue.shift();
      const w = workers[inFlight % workers.length];
      inFlight++;
      w.recognize(job.image).then(res => job.resolve(res)).catch(err => job.reject(err)).finally(() => {
        inFlight--;
        tick();
      });
    }
  }
  function recognizeWithTimeout(image, ms = CONFIG.OCR_TIMEOUT_MS) {
    if (!ready) bootWorkers();
    return new Promise((resolve, reject) => {
      const p = new Promise((res, rej) => queue.push({ image, resolve: res, reject: rej }));
      const to = setTimeout(() => {
        reject(new Error('OCR timeout'));
      }, ms);
      p.then(r => {
        clearTimeout(to);
        resolve(r);
      }).catch(e => {
        clearTimeout(to);
        reject(e);
      });
      tick();
    });
  }
  async function terminate() {
    if (workers.length) await Promise.all(workers.map(w => w.terminate()));
    workers = [];
    ready = false;
    queue = [];
    inFlight = 0;
  }
  return { recognizeWithTimeout, terminate };
}

/* ========== INDEXING ========== */
function ensureIndex() {
  if (state.index) return;
  state.index = elasticlunr(function () {
    this.addField('text');
    this.setRef('id');
  });
}
function addChunk(docName, sourceLabel, pageOrSlide, text, kind = 'text', figId) {
  const clean = sanitizeText(text);
  if (!clean) return;
  const id = state.chunkCounter++;
  const rec = { id, docName, sourceLabel, page: pageOrSlide, text: clean, kind };
  if (figId) rec.figId = figId;
  state.chunks.push(rec);
  ensureIndex();
  try {
    state.index.addDoc({ id: id.toString(), text: clean });
  } catch (e) {
    console.warn('index add failed', e);
  }
}

/* ========== FILE PARSING ========== */
function addParsingTask(promise) {
  state.parsingTasks.push(promise);
  promise.finally(() => {
    const i = state.parsingTasks.indexOf(promise);
    if (i >= 0) state.parsingTasks.splice(i, 1);
  });
  return promise;
}
async function waitAllParsingTasks() {
  await Promise.all(state.parsingTasks);
}

/* ------- PDF parsing ------- */
async function parsePDFFile(file) {
  setStatus(`Parsing PDF: ${file.name}`);
  try {
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    const pgCount = pdf.numPages || 0;
    let completed = 0;
    setMeter(0);
    const pageLimiter = (function createLimiter(n) {
      let active = 0, q = [];
      const next = () => {
        if (active >= n || q.length === 0) return;
        active++;
        const { fn, res, rej } = q.shift();
        Promise.resolve().then(fn).then(r => {
          active--;
          res(r);
          next();
        }).catch(e => {
          active--;
          rej(e);
          next();
        });
      };
      return fn => new Promise((res, rej) => {
        q.push({ fn, res, rej });
        next();
      });
    })(Math.max(2, Math.min(CONFIG.MAX_PAGES_OCR_AT_ONCE, Math.ceil((navigator.hardwareConcurrency || 4) / 2))));
    const pagePromises = [];
    for (let p = 1; p <= pgCount; p++) {
      const promise = pageLimiter(async () => {
        try {
          const page = await pdf.getPage(p);
          const textContent = await timeoutPromise(CONFIG.PDF_TEXT_TIMEOUT_MS, page.getTextContent(), null);
          let text = '';
          if (textContent && textContent.items) {
            text = textContent.items.map(i => i.str).join(' ');
            text = sanitizeText(text);
          }
          const needOCR = (!text || text.split(/\s+/).length < CONFIG.TEXT_WORDS_THRESHOLD);
          if (!needOCR || !($('#chk-ocr')?.checked)) {
            if (text) addChunk(file.name, `${file.name} · page ${p}`, p, text, 'text');
          } else {
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
            const useOffscreen = (typeof OffscreenCanvas !== 'undefined');
            const canvas = useOffscreen ? new OffscreenCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height)) : document.createElement('canvas');
            canvas.width = Math.ceil(viewport.width);
            canvas.height = Math.ceil(viewport.height);
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            await page.render({ canvasContext: ctx, viewport }).promise;
            try { preprocessCanvasForOCR(canvas, ctx); } catch (e) { console.warn('preprocess failed', e); }
            let imageForOCR = canvas;
            if (typeof createImageBitmap !== 'undefined' && !(canvas instanceof OffscreenCanvas)) {
              try { imageForOCR = await createImageBitmap(canvas); } catch (e) { }
            }
            try {
              const ocrResult = await state.ocrPool.recognizeWithTimeout(imageForOCR, CONFIG.OCR_TIMEOUT_MS);
              const ocrText = ocrResult?.data?.text ? sanitizeText(ocrResult.data.text) : '';
              if (ocrText) addChunk(file.name, `${file.name} · page ${p} (OCR)`, p, ocrText, 'ocr');
            } catch (e) {
              console.warn(`OCR failed for ${file.name} page ${p}:`, e);
              if (text) addChunk(file.name, `${file.name} · page ${p}`, p, text, 'text');
            }
          }
          page.cleanup && page.cleanup();
        } catch (err) {
          console.warn(`PDF page ${p} parse error:`, err);
        } finally {
          completed++;
          setMeter(100 * completed / pgCount);
        }
      });
      pagePromises.push(promise);
    }
    await Promise.all(pagePromises);
    setStatus(`Finished parsing PDF: ${file.name}`);
    setMeter(100);
  } catch (err) {
    console.error('parsePDFFile error', err);
    setStatus(`Error parsing PDF: ${file.name}`);
  }
}

/* ------- DOCX parsing ------- */
async function parseDOCXFile(file) {
  setStatus(`Parsing DOCX: ${file.name}`);
  try {
    const ab = await file.arrayBuffer();
    const { value } = await mammoth.convertToHtml({ arrayBuffer: ab }, { includeDefaultStyleMap: true });
    const tmp = document.createElement('div');
    tmp.innerHTML = value;
    const text = sanitizeText(tmp.textContent || tmp.innerText || '');
    if (text) {
      for (const c of chunkText(text)) addChunk(file.name, `${file.name}`, null, c, 'text');
    }
    setStatus(`Finished DOCX: ${file.name}`);
  } catch (e) {
    console.error('parseDOCXFile error', e);
    setStatus(`Error parsing DOCX: ${file.name}`);
  }
}

/* ------- PPTX parsing ------- */
async function parsePPTXFile(file) {
  setStatus(`Parsing PPTX: ${file.name}`);
  try {
    const ab = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(ab);
    const slideFiles = Object.keys(zip.files).filter(k => k.startsWith('ppt/slides/slide') && k.endsWith('.xml')).sort();
    let slideIndex = 0;
    for (const path of slideFiles) {
      slideIndex++;
      try {
        const xml = await zip.file(path).async('string');
        const text = (xml.match(/<a:t>(.*?)<\/a:t>/g) || []).map(s => s.replace(/<\/?a:t>/g, '')).join(' ');
        if (text) {
          for (const c of chunkText(text)) addChunk(file.name, `${file.name} · slide ${slideIndex}`, slideIndex, c, 'text');
        }
        const relPath = path.replace('slides/slide', 'slides/_rels/slide') + '.rels';
        if (zip.file(relPath)) {
          const relXml = await zip.file(relPath).async('string');
          const targets = Array.from(relXml.matchAll(/Target="..\/media\/(.*?)"/g)).map(m => m[1]);
          for (const fname of targets) {
            if (zip.file('ppt/media/' + fname)) {
              const blob = await zip.file('ppt/media/' + fname).async('blob');
              const url = URL.createObjectURL(blob);
              const figId = crypto.randomUUID();
              state.images.set(figId, { blobUrl: url, meta: { docName: file.name, slide: slideIndex } });
              addChunk(file.name, `${file.name} · slide ${slideIndex}`, slideIndex, '[Figure available]', 'figure', figId);
            }
          }
        }
      } catch (e) {
        console.warn('pptx slide parse error', e);
      }
    }
    setStatus(`Finished PPTX: ${file.name}`);
  } catch (e) {
    console.error('parsePPTXFile error', e);
    setStatus(`Error parsing PPTX: ${file.name}`);
  }
}

/* ------- Image OCR ------- */
async function parseImageFile(file) {
  setStatus(`OCR image: ${file.name}`);
  try {
    const imgBitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = imgBitmap.width;
    canvas.height = imgBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgBitmap, 0, 0);
    preprocessCanvasForOCR(canvas, ctx);
    const ocr = await state.ocrPool.recognizeWithTimeout(canvas, CONFIG.OCR_TIMEOUT_MS);
    const text = sanitizeText(ocr?.data?.text || '');
    if (text) addChunk(file.name, `${file.name}`, null, text, 'ocr');
    setStatus(`Finished OCR image: ${file.name}`);
  } catch (e) {
    console.warn('parseImageFile error', e);
    setStatus(`Image OCR failed: ${file.name}`);
  }
}

/* Simple preprocess: grayscale + binarize */
function preprocessCanvasForOCR(canvas, ctx) {
  try {
    const w = canvas.width, h = canvas.height;
    const data = ctx.getImageData(0, 0, w, h);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      const y = (r * 0.299 + g * 0.587 + b * 0.114);
      const bin = y > 180 ? 255 : 0;
      d[i] = d[i + 1] = d[i + 2] = bin;
    }
    ctx.putImageData(data, 0, 0);
  } catch (e) {
    console.warn('preprocess error', e);
  }
}

/* ========== ENTRY POINT: handle file input ========== */
function handleFileInput(files) {
  if (!files || !files.length) return;
  setStatus(`Queued ${files.length} file(s) for parsing...`);
  setMeter(0);
  let i = 0;
  for (const f of files) {
    i++;
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    let task;
    if (ext === 'pdf') task = parsePDFFile(f);
    else if (ext === 'docx') task = parseDOCXFile(f);
    else if (ext === 'pptx') task = parsePPTXFile(f);
    else if (['png', 'jpg', 'jpeg'].includes(ext)) task = parseImageFile(f);
    else {
      console.warn('Unsupported file', f.name);
      continue;
    }
    addParsingTask(Promise.resolve(task));
  }
}

/* ========== SEARCH & ANSWER ========== */
function gatherTopChunks(query, k = 40) {
  if (!state.index) return [];
  const res = state.index.search(query, { expand: true });
  const byId = new Map(state.chunks.map(c => [c.id.toString(), c]));
  return res.map(r => ({ chunk: byId.get(r.ref), score: r.score })).filter(x => x.chunk).slice(0, k);
}
function rankSentencesFromChunks(query, chunks, marks) {
  const terms = query.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const pool = [];
  const seen = new Set();
  for (const h of chunks) {
    for (const s of tokenizeSentences(h.chunk.text)) {
      const key = h.chunk.sourceLabel + '::' + s;
      if (seen.has(key)) continue;
      seen.add(key);
      let score = h.score;
      for (const t of terms) if (s.toLowerCase().includes(t)) score += 1;
      pool.push({ s: s.trim(), score, src: h.chunk.sourceLabel, page: h.chunk.pageOrSlide });
    }
  }
  pool.sort((a, b) => b.score - a.score);
  const bullets = marksToBullets(marks);
  return pool.slice(0, bullets);
}
function marksToBullets(m) {
  m = +m;
  if (m <= 2) return 2;
  if (m <= 5) return 5;
  if (m <= 8) return 8;
  if (m <= 10) return 10;
  return 12;
}
function composeLocalAnswer(query, marks) {
  if (!state.chunks.length) return null;
  if (!state.index) ensureIndex();
  const hits = gatherTopChunks(query, 60);
  if (!hits.length) return null;
  if (!hits[0] || hits[0].score < 0.01) return null;
  const bullets = rankSentencesFromChunks(query, hits, marks);
  if (!bullets.length) return null;
  const listItems = bullets.map(b => `<li>${b.s.trim()}</li>`).join('');
  const text = `<ul>${listItems}</ul>`;
  return { text, bullets, source: 'local' };
}

/* ========== WEB FALLBACK ========== */
async function webFallback(query, marks) {
  return null;
}

/* ========== USER INTERACTION (chat) ========== */
function appendUser(text) {
  const messages = $('#messages');
  const elMsg = el('div', { class: 'msg user', html: `<div class="meta">You</div><div>${escapeHtml(text)}</div>` });
  messages.appendChild(elMsg);
  messages.scrollTop = messages.scrollHeight;
}
function appendAssistant(html) {
  const messages = $('#messages');
  const elMsg = el('div', { class: 'msg assist', html: `<div class="meta">Assistant</div>${html}` });
  messages.appendChild(elMsg);
  messages.scrollTop = messages.scrollHeight;
}
function updateLastAssistant(html) {
  const msgs = Array.from(document.querySelectorAll('.msg.assist'));
  if (!msgs.length) return appendAssistant(html);
  const last = msgs[msgs.length - 1];
  last.innerHTML = `<div class="meta">Assistant</div>${html}`;
  last.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
function escapeHtml(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
}
async function onSend(query, marks) {
  appendUser(query);
  appendAssistant('<em>Thinking…</em>');
  setStatus('Preparing answer — waiting for parsing to stabilize (short wait)...');
  let waited = false;
  try {
    const p = waitAllParsingTasks();
    await Promise.race([p, new Promise(res => setTimeout(res, CONFIG.ANSWER_WAIT_BEFORE_PARTIAL))]);
    waited = true;
  } catch (e) {
    console.warn('waitAllParsingTasks error', e);
  }
  if (!state.index && state.chunks.length) ensureIndex();
  const local = composeLocalAnswer(query, marks);
  if (local) {
    updateLastAssistant(`<pre>${escapeHtml(local.text)}</pre>`);
    setStatus(`Answered from uploaded material.${waited ? '' : ' (used partial index)'}`);
    return;
  }
  setStatus('No strong local match — attempting web fallback...');
  const web = await timeoutPromise(8000, (async () => await webFallback(query, marks))(), null);
  if (web) {
    let html = `<pre>${escapeHtml(web.text || web.answer || '')}</pre>`;
    if (web.urls || web.refs) {
      const urls = web.urls || web.refs || [];
      html += '<div style="margin-top:8px"><strong>References:</strong></div>';
      for (const u of urls) html += `<div><a href="${escapeHtml(u)}" target="_blank" rel="noopener">${escapeHtml(u)}</a></div>`;
    }
    updateLastAssistant(html);
    setStatus('Answered via web fallback.');
    return;
  }
  updateLastAssistant('No relevant content found locally or on the web.');
  setStatus('No evidence found.');
}

/* ========== WIRING ========== */
(function init() {
  state.ocrPool = createOcrPool(CONFIG.OCR_POOL_MAX);
  const fileInput = document.getElementById('file');
  if (fileInput) {
    fileInput.addEventListener('change', (ev) => {
      const files = Array.from(ev.target.files || []);
      if (!files.length) return;
      handleFileInput(files);
    });
  }
  const askBtn = document.getElementById('ask');
  const qBox = document.getElementById('q');
  const marksSel = document.getElementById('marks');
  if (askBtn && qBox) {
    askBtn.addEventListener('click', async () => {
      const q = (qBox.value || '').trim();
      if (!q) return;
      const m = marksSel ? marksSel.value : 10;
      await onSend(q, m);
      qBox.value = '';
    });
    qBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        askBtn.click();
      }
    });
  }
  setStatus('Ready — upload PDFs/DOCX/PPTX or ask a question.');
})();

/* ========== Chat Message Helpers ========== */
function addMessage(text, sender) {
  const chat = document.getElementById('messages');
  const msg = document.createElement('div');
  msg.className = `msg ${sender}`;
  if (sender === 'assist') {
    msg.innerHTML = text;
  } else {
    msg.innerText = text;
  }
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}
function updateLastAI(text) {
  const chat = document.getElementById('messages');
  const last = chat.querySelector('.msg.assist:last-child');
  if (last) {
    last.innerHTML = text;
  }
}

function formatBullets(text) {
  // If already contains HTML list, return as-is
  if (/<ul>/i.test(text)) return text;

  // Replace common bullet/number patterns with proper <li>
  const bulletRegex = /(?:^|\n)\s*(?:[-*•]|\d+\.)\s+/g;
  if (bulletRegex.test(text)) {
    const items = text
      .split(bulletRegex)
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => `<li>${t}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  }

  // Otherwise just replace newlines with <br>
  return text.replace(/\n/g, "<br>");
}

// When rendering assistant message:
msgDiv.classList.add("msg", "assist");
msgDiv.innerHTML = formatBullets(answerText);
messages.appendChild(msgDiv);

function renderAnswer(text) {
  const container = document.getElementById('answer');
  container.innerHTML = '';

  // If the response already contains HTML list tags
  if (/<ul>/i.test(text)) {
    // Create a DOM parser so we can split messy <li> content
    const temp = document.createElement('div');
    temp.innerHTML = text;

    const fixedUl = document.createElement('ul');

    temp.querySelectorAll('li').forEach(li => {
      // Split by "•", numbered bullets, or sentence boundaries before capitals
      const parts = li.innerHTML
        .split(/(?:(?:\d+\.)|•|\u2022|(?<=\.))\s+/)
        .map(p => p.trim())
        .filter(Boolean);

      parts.forEach(p => {
        const newLi = document.createElement('li');
        newLi.innerHTML = p;
        fixedUl.appendChild(newLi);
      });
    });

    container.appendChild(fixedUl);
    return;
  }

  // If it's plain text with line breaks
  const lines = text.split(/\n+/).filter(l => l.trim() !== '');
  if (lines.length > 1) {
    const ul = document.createElement('ul');
    lines.forEach(line => {
      const li = document.createElement('li');
      li.textContent = line.trim();
      ul.appendChild(li);
    });
    container.appendChild(ul);
  } else {
    container.textContent = text.trim();
  }
}
/* ========== EXPORTS (for testing/debug) ========== */
window.AnswerGenerator = {
  state,
  CONFIG,
  handleFileInput,
  onSend,
  renderAnswer,
  addMessage,
  updateLastAI,
  formatBullets
};