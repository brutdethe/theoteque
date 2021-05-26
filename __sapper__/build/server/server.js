'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var grayMatter = _interopDefault(require('gray-matter'));
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

const getAllPosts = () =>
	fs.readdirSync("content").map(fileName => {
		const post = fs.readFileSync(path.resolve("content", fileName), "utf-8");
		return grayMatter(post).data;
	});

function get(req, res) {
	res.writeHead(200, {
		"Content-Type": "application/json"
	});
	const posts = getAllPosts();
	res.end(JSON.stringify(posts));
}

var route_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get
});

const md = require('markdown-it')({ html: true, linkify: true, breaks: true }).use(require('markdown-it-footnote')).use(require('markdown-it-attrs'));

const getPost = fileName =>
	fs.readFileSync(path.resolve("content", `${fileName}.md`), "utf-8");

function get$1(req, res, next) {
	const { slug } = req.params;

	// get the markdown text
	const post = getPost(slug);

	// parse the md to get front matter
	// and the content without escaping characters
	const { data, content } = grayMatter(post);

	const html = md.render(content);

	if (html) {
		res.writeHead(200, {
			"Content-Type": "application/json"
		});

		res.end(JSON.stringify({ html, ...data }));
	} else {
		res.writeHead(404, {
			"Content-Type": "application/json"
		});

		res.end(
			JSON.stringify({
				message: `Not found`
			})
		);
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$1
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, classes_to_add) {
    const attributes = Object.assign({}, ...args);
    if (classes_to_add) {
        if (attributes.class == null) {
            attributes.class = classes_to_add;
        }
        else {
            attributes.class += ' ' + classes_to_add;
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += " " + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += " " + name;
        }
        else if (value != null) {
            str += ` ${name}="${String(value).replace(/"/g, '&#34;').replace(/'/g, '&#39;')}"`;
        }
    });
    return str;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src/components/IconTeaType.svelte generated by Svelte v3.21.0 */

const css = {
	code: "a.svelte-k9qalw,a.svelte-k9qalw:hover{border:none}.type.svelte-k9qalw{display:grid;grid-template-columns:2.5rem 5rem}.text.svelte-k9qalw{margin:0 0.8rem;line-height:1.2rem}.color.svelte-k9qalw{border:1px solid black;width:2.5rem;height:2.5rem;-webkit-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);-moz-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1)}.ideogram.svelte-k9qalw{font-size:0.8rem;color:#999}.voice.svelte-k9qalw{cursor:pointer}",
	map: "{\"version\":3,\"file\":\"IconTeaType.svelte\",\"sources\":[\"IconTeaType.svelte\"],\"sourcesContent\":[\"<style>\\n    a,\\n    a:hover {\\n        border: none;\\n    }\\n\\n    .type {\\n        display: grid;\\n        grid-template-columns: 2.5rem 5rem;\\n    }\\n    .text {\\n        margin: 0 0.8rem;\\n        line-height: 1.2rem;\\n    }\\n    .color {\\n        border: 1px solid black;\\n        width: 2.5rem;\\n        height: 2.5rem;\\n        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n    }\\n    .ideogram {\\n        font-size: 0.8rem;\\n        color: #999;\\n    }\\n    .voice {\\n        cursor: pointer;\\n    }\\n</style>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n\\n    export let ideogram, pinyin\\n\\n    const colors = {\\n        綠茶: '#58D68D',\\n        白茶: 'white',\\n        黃茶: '#F4D03F',\\n        青茶: '#002fa7',\\n        紅茶: '#C0392B',\\n        黑茶: 'black'\\n    }\\n\\n    function playAudio(ideogram) {\\n        document.querySelector(`#${ideogram}`).play()\\n    }\\n</script>\\n\\n<aside class=\\\"type\\\">\\n    <span class=\\\"color\\\" style=\\\"background: {colors[ideogram]}\\\"></span>\\n    <a class=\\\"text\\\" href=\\\"/liste-des-thes-{ideogram}\\\">\\n        <audio id=\\\"{ideogram}\\\">\\n            <source src=\\\"assets/audio/{ideogram}.mp3\\\" type=\\\"audio/mpeg\\\" />\\n        </audio>\\n        <span\\n            class=\\\"pinyin voice\\\"\\n            title=\\\"voix\\\"\\n            on:click=\\\"{playAudio(ideogram)}\\\"\\n        >\\n            {pinyin}\\n            <span\\n                class=\\\"ideogram voice\\\"\\n                title=\\\"voix\\\"\\n                on:click=\\\"{playAudio(ideogram)}\\\"\\n            >\\n                {ideogram}\\n            </span>\\n        </span>\\n    </a>\\n</aside>\\n\"],\"names\":[],\"mappings\":\"AACI,eAAC,CACD,eAAC,MAAM,AAAC,CAAC,AACL,MAAM,CAAE,IAAI,AAChB,CAAC,AAED,KAAK,cAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,MAAM,CAAC,IAAI,AACtC,CAAC,AACD,KAAK,cAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,MAAM,CAChB,WAAW,CAAE,MAAM,AACvB,CAAC,AACD,MAAM,cAAC,CAAC,AACJ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,MAAM,CACd,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAC1D,eAAe,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACvD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AACtD,CAAC,AACD,SAAS,cAAC,CAAC,AACP,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,AACf,CAAC,AACD,MAAM,cAAC,CAAC,AACJ,MAAM,CAAE,OAAO,AACnB,CAAC\"}"
};

const IconTeaType = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { ideogram } = $$props, { pinyin } = $$props;

	const colors = {
		綠茶: "#58D68D",
		白茶: "white",
		黃茶: "#F4D03F",
		青茶: "#002fa7",
		紅茶: "#C0392B",
		黑茶: "black"
	};

	if ($$props.ideogram === void 0 && $$bindings.ideogram && ideogram !== void 0) $$bindings.ideogram(ideogram);
	if ($$props.pinyin === void 0 && $$bindings.pinyin && pinyin !== void 0) $$bindings.pinyin(pinyin);
	$$result.css.add(css);

	return `<aside class="${"type svelte-k9qalw"}"><span class="${"color svelte-k9qalw"}" style="${"background: " + escape(colors[ideogram])}"></span>
    <a class="${"text svelte-k9qalw"}" href="${"/liste-des-thes-" + escape(ideogram)}"><audio${add_attribute("id", ideogram, 0)}><source src="${"assets/audio/" + escape(ideogram) + ".mp3"}" type="${"audio/mpeg"}"></audio>
        <span class="${"pinyin voice svelte-k9qalw"}" title="${"voix"}">${escape(pinyin)}
            <span class="${"ideogram voice svelte-k9qalw"}" title="${"voix"}">${escape(ideogram)}</span></span></a></aside>`;
});

/* src/components/NormalizePinyin.svelte generated by Svelte v3.21.0 */

function normalize(str) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "");
}

/* src/routes/index.svelte generated by Svelte v3.21.0 */

const css$1 = {
	code: ".gallery-teas.svelte-bi5fqi{padding:1em;border-top:1px solid #ccc}.gallery.svelte-bi5fqi{display:grid;grid-template-columns:260px 260px 260px 260px}img.svelte-bi5fqi{padding:0;width:200px;opacity:70%;overflow:hidden}img.svelte-bi5fqi:hover{opacity:100%}.pinyin.svelte-bi5fqi{font-weight:normal;font-size:1em}.ideogram.svelte-bi5fqi{display:block;font-size:0.8em;color:#999}.item.svelte-bi5fqi{padding:1em;margin:1em 0;text-align:center;background:white;width:230px;-webkit-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);-moz-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1)}.voice.svelte-bi5fqi{cursor:pointer}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<style>\\n    .gallery-teas {\\n        padding: 1em;\\n        border-top: 1px solid #ccc;\\n    }\\n    .gallery {\\n        display: grid;\\n        grid-template-columns: 260px 260px 260px 260px;\\n    }\\n    img {\\n        padding: 0;\\n        width: 200px;\\n        opacity: 70%;\\n        overflow: hidden; /* [1.2] Hide the overflowing of child elements */\\n    }\\n    img:hover {\\n        opacity: 100%;\\n    }\\n    .pinyin {\\n        font-weight: normal;\\n        font-size: 1em;\\n    }\\n    .ideogram {\\n        display: block;\\n        font-size: 0.8em;\\n        color: #999;\\n    }\\n    .item {\\n        padding: 1em;\\n        margin: 1em 0;\\n        text-align: center;\\n        background: white;\\n        width: 230px;\\n        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n    }\\n    .voice {\\n        cursor: pointer;\\n    }\\n</style>\\n\\n<script context=\\\"module\\\">\\n    export function preload(page) {\\n        return { typeParam: page.params.type }\\n    }\\n</script>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n    import IconTeaType from '../components/IconTeaType.svelte'\\n    import { normalize } from '../components/NormalizePinyin.svelte'\\n\\n    export let typeParam\\n\\n    let teas = []\\n    let types = []\\n    let i18n = []\\n\\n    onMount(async () => {\\n        const res = await fetch('https://api-tea.brutdethé.fr/api/v1/teas')\\n\\n        if (res.ok) {\\n            teas = (await res.json()).api\\n        } else {\\n            throw new Error(text)\\n        }\\n\\n        const res1 = await fetch('https://api-tea.brutdethé.fr/api/v1/type')\\n\\n        if (res1.ok) {\\n            types = (await res1.json()).api.map(type => type.ideogram)\\n        } else {\\n            throw new Error(text)\\n        }\\n\\n        const res2 = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`)\\n\\n        if (res2.ok) {\\n            i18n = (await res2.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n    const typeToDisplay = () =>\\n        types.includes(typeParam) ? [typeParam] : types\\n    const getTeasByType = (type, teas) => teas.filter(tea => tea.type === type)\\n\\n    function getPinyin(text, i18n) {\\n        const term = i18n.filter(term => term.ideogram === text)[0] || {}\\n        return 'pinyin' in term ? term.pinyin : '-'\\n    }\\n\\n    function playAudio(ideogram) {\\n        document.querySelector(`#${ideogram}`).play()\\n    }\\n</script>\\n\\n<svelte:head>\\n    <title>Liste des thés</title>\\n</svelte:head>\\n<h1>Liste des thés par type</h1>\\n<p>\\n    Cette liste regroupe une sélection de thés que l'on imagine assez faciles à\\n    trouver. Pour voir le détail d'un thé suivez le lien en cliquant sur sa\\n    photo.\\n</p>\\n\\n{#each typeToDisplay(typeParam, types) as type}\\n    <section class=\\\"gallery-teas {type}\\\">\\n        <IconTeaType ideogram=\\\"{type}\\\" pinyin=\\\"{getPinyin(type, i18n)}\\\" />\\n        <div class=\\\"gallery\\\">\\n            {#each getTeasByType(type, teas) as tea}\\n                <figure class=\\\"item\\\">\\n                    <a href=\\\"fiche-{normalize(tea.pinyin)}\\\">\\n                        <img\\n                            src=\\\"../assets/thes/thumbs/{tea.ideogram}.jpg\\\"\\n                            alt=\\\"{tea.pinyin}\\\"\\n                        />\\n                    </a>\\n                    <figcaption class=\\\"pinyin\\\">\\n                        <audio id=\\\"{tea.ideogram}\\\">\\n                            <source\\n                                src=\\\"assets/audio/{tea.ideogram}.mp3\\\"\\n                                type=\\\"audio/mpeg\\\"\\n                            />\\n                        </audio>\\n                        <span\\n                            class=\\\"voice\\\"\\n                            title=\\\"voix\\\"\\n                            on:click=\\\"{playAudio(tea.ideogram)}\\\"\\n                        >\\n                            {tea.pinyin}\\n                        </span>\\n                        <span\\n                            class=\\\"ideogram voice\\\"\\n                            title=\\\"voix\\\"\\n                            on:click=\\\"{playAudio(tea.ideogram)}\\\"\\n                        >\\n                            {tea.ideogram}\\n                        </span>\\n                    </figcaption>\\n\\n                </figure>\\n            {:else}\\n                <!-- this block renders when teas.length === 0 -->\\n                <p>chargement des thés...</p>\\n            {/each}\\n        </div>\\n    </section>\\n{:else}\\n    <!-- this block renders when teas.length =黄山毛峰 HuángShān== 0 -->\\n    <p>chargement des types thés...</p>\\n{/each}\\n\"],\"names\":[],\"mappings\":\"AACI,aAAa,cAAC,CAAC,AACX,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC9B,CAAC,AACD,QAAQ,cAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,KAAK,CAAC,KAAK,CAAC,KAAK,CAAC,KAAK,AAClD,CAAC,AACD,GAAG,cAAC,CAAC,AACD,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,MAAM,AACpB,CAAC,AACD,iBAAG,MAAM,AAAC,CAAC,AACP,OAAO,CAAE,IAAI,AACjB,CAAC,AACD,OAAO,cAAC,CAAC,AACL,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,GAAG,AAClB,CAAC,AACD,SAAS,cAAC,CAAC,AACP,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,AACf,CAAC,AACD,KAAK,cAAC,CAAC,AACH,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,GAAG,CAAC,CAAC,CACb,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,KAAK,CACZ,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAC1D,eAAe,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACvD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AACtD,CAAC,AACD,MAAM,cAAC,CAAC,AACJ,MAAM,CAAE,OAAO,AACnB,CAAC\"}"
};

function preload(page) {
	return { typeParam: page.params.type };
}

function getPinyin(text, i18n) {
	const term = i18n.filter(term => term.ideogram === text)[0] || {};
	return "pinyin" in term ? term.pinyin : "-";
}

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { typeParam } = $$props;
	let teas = [];
	let types = [];
	let i18n = [];

	onMount(async () => {
		const res = await fetch("https://api-tea.brutdethé.fr/api/v1/teas");

		if (res.ok) {
			teas = (await res.json()).api;
		} else {
			throw new Error(text);
		}

		const res1 = await fetch("https://api-tea.brutdethé.fr/api/v1/type");

		if (res1.ok) {
			types = (await res1.json()).api.map(type => type.ideogram);
		} else {
			throw new Error(text);
		}

		const res2 = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`);

		if (res2.ok) {
			i18n = (await res2.json()).api;
		} else {
			// 404
			throw new Error(text);
		}
	});

	const typeToDisplay = () => types.includes(typeParam) ? [typeParam] : types;
	const getTeasByType = (type, teas) => teas.filter(tea => tea.type === type);
	if ($$props.typeParam === void 0 && $$bindings.typeParam && typeParam !== void 0) $$bindings.typeParam(typeParam);
	$$result.css.add(css$1);

	return `${($$result.head += `${($$result.title = `<title>Liste des thés</title>`, "")}`, "")}
<h1>Liste des thés par type</h1>
<p>Cette liste regroupe une sélection de thés que l&#39;on imagine assez faciles à
    trouver. Pour voir le détail d&#39;un thé suivez le lien en cliquant sur sa
    photo.
</p>

${typeToDisplay().length
	? each(typeToDisplay(), type => `<section class="${"gallery-teas " + escape(type) + " svelte-bi5fqi"}">${validate_component(IconTeaType, "IconTeaType").$$render(
			$$result,
			{
				ideogram: type,
				pinyin: getPinyin(type, i18n)
			},
			{},
			{}
		)}
        <div class="${"gallery svelte-bi5fqi"}">${getTeasByType(type, teas).length
		? each(getTeasByType(type, teas), tea => `<figure class="${"item svelte-bi5fqi"}"><a href="${"fiche-" + escape(normalize(tea.pinyin))}"><img src="${"../assets/thes/thumbs/" + escape(tea.ideogram) + ".jpg"}"${add_attribute("alt", tea.pinyin, 0)} class="${"svelte-bi5fqi"}"></a>
                    <figcaption class="${"pinyin svelte-bi5fqi"}"><audio${add_attribute("id", tea.ideogram, 0)}><source src="${"assets/audio/" + escape(tea.ideogram) + ".mp3"}" type="${"audio/mpeg"}"></audio>
                        <span class="${"voice svelte-bi5fqi"}" title="${"voix"}">${escape(tea.pinyin)}</span>
                        <span class="${"ideogram voice svelte-bi5fqi"}" title="${"voix"}">${escape(tea.ideogram)}
                        </span></figcaption>

                </figure>`)
		: `
                <p>chargement des thés...</p>`}</div>
    </section>`)
	: `
    <p>chargement des types thés...</p>`}`;
});

/* src/routes/liste-des-thes-[type].svelte generated by Svelte v3.21.0 */

const css$2 = {
	code: ".gallery-teas.svelte-bi5fqi{padding:1em;border-top:1px solid #ccc}.gallery.svelte-bi5fqi{display:grid;grid-template-columns:260px 260px 260px 260px}img.svelte-bi5fqi{padding:0;width:200px;opacity:70%;overflow:hidden}img.svelte-bi5fqi:hover{opacity:100%}.pinyin.svelte-bi5fqi{font-weight:normal;font-size:1em}.ideogram.svelte-bi5fqi{display:block;font-size:0.8em;color:#999}.item.svelte-bi5fqi{padding:1em;margin:1em 0;text-align:center;background:white;width:230px;-webkit-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);-moz-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1)}.voice.svelte-bi5fqi{cursor:pointer}",
	map: "{\"version\":3,\"file\":\"liste-des-thes-[type].svelte\",\"sources\":[\"liste-des-thes-[type].svelte\"],\"sourcesContent\":[\"<style>\\n    .gallery-teas {\\n        padding: 1em;\\n        border-top: 1px solid #ccc;\\n    }\\n    .gallery {\\n        display: grid;\\n        grid-template-columns: 260px 260px 260px 260px;\\n    }\\n    img {\\n        padding: 0;\\n        width: 200px;\\n        opacity: 70%;\\n        overflow: hidden; /* [1.2] Hide the overflowing of child elements */\\n    }\\n    img:hover {\\n        opacity: 100%;\\n    }\\n    .pinyin {\\n        font-weight: normal;\\n        font-size: 1em;\\n    }\\n    .ideogram {\\n        display: block;\\n        font-size: 0.8em;\\n        color: #999;\\n    }\\n    .item {\\n        padding: 1em;\\n        margin: 1em 0;\\n        text-align: center;\\n        background: white;\\n        width: 230px;\\n        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n    }\\n    .voice {\\n        cursor: pointer;\\n    }\\n</style>\\n\\n<script context=\\\"module\\\">\\n    export function preload(page) {\\n        return { typeParam: page.params.type }\\n    }\\n</script>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n    import IconTeaType from '../components/IconTeaType.svelte'\\n    import { normalize } from '../components/NormalizePinyin.svelte'\\n\\n    export let typeParam\\n\\n    let teas = []\\n    let types = []\\n    let i18n = []\\n\\n    onMount(async () => {\\n        const res = await fetch('https://api-tea.brutdethé.fr/api/v1/teas')\\n\\n        if (res.ok) {\\n            teas = (await res.json()).api\\n        } else {\\n            throw new Error(text)\\n        }\\n\\n        const res1 = await fetch('https://api-tea.brutdethé.fr/api/v1/type')\\n\\n        if (res1.ok) {\\n            types = (await res1.json()).api.map(type => type.ideogram)\\n        } else {\\n            throw new Error(text)\\n        }\\n\\n        const res2 = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`)\\n\\n        if (res2.ok) {\\n            i18n = (await res2.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n    const typeToDisplay = () =>\\n        types.includes(typeParam) ? [typeParam] : types\\n    const getTeasByType = (type, teas) => teas.filter(tea => tea.type === type)\\n\\n    function getPinyin(text, i18n) {\\n        const term = i18n.filter(term => term.ideogram === text)[0] || {}\\n        return 'pinyin' in term ? term.pinyin : '-'\\n    }\\n\\n    function playAudio(ideogram) {\\n        document.querySelector(`#${ideogram}`).play()\\n    }\\n</script>\\n\\n<svelte:head>\\n    <title>Liste des thés</title>\\n</svelte:head>\\n<h1>Liste des thés par type</h1>\\n<p>\\n    Cette liste regroupe une sélection de thés que l'on imagine assez faciles à\\n    trouver. Pour voir le détail d'un thé suivez le lien en cliquant sur sa\\n    photo.\\n</p>\\n\\n{#each typeToDisplay(typeParam, types) as type}\\n    <section class=\\\"gallery-teas {type}\\\">\\n        <IconTeaType ideogram=\\\"{type}\\\" pinyin=\\\"{getPinyin(type, i18n)}\\\" />\\n        <div class=\\\"gallery\\\">\\n            {#each getTeasByType(type, teas) as tea}\\n                <figure class=\\\"item\\\">\\n                    <a href=\\\"fiche-{normalize(tea.pinyin)}\\\">\\n                        <img\\n                            src=\\\"../assets/thes/thumbs/{tea.ideogram}.jpg\\\"\\n                            alt=\\\"{tea.pinyin}\\\"\\n                        />\\n                    </a>\\n                    <figcaption class=\\\"pinyin\\\">\\n                        <audio id=\\\"{tea.ideogram}\\\">\\n                            <source\\n                                src=\\\"assets/audio/{tea.ideogram}.mp3\\\"\\n                                type=\\\"audio/mpeg\\\"\\n                            />\\n                        </audio>\\n                        <span\\n                            class=\\\"voice\\\"\\n                            title=\\\"voix\\\"\\n                            on:click=\\\"{playAudio(tea.ideogram)}\\\"\\n                        >\\n                            {tea.pinyin}\\n                        </span>\\n                        <span\\n                            class=\\\"ideogram voice\\\"\\n                            title=\\\"voix\\\"\\n                            on:click=\\\"{playAudio(tea.ideogram)}\\\"\\n                        >\\n                            {tea.ideogram}\\n                        </span>\\n                    </figcaption>\\n\\n                </figure>\\n            {:else}\\n                <!-- this block renders when teas.length === 0 -->\\n                <p>chargement des thés...</p>\\n            {/each}\\n        </div>\\n    </section>\\n{:else}\\n    <!-- this block renders when teas.length =黄山毛峰 HuángShān== 0 -->\\n    <p>chargement des types thés...</p>\\n{/each}\\n\"],\"names\":[],\"mappings\":\"AACI,aAAa,cAAC,CAAC,AACX,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC9B,CAAC,AACD,QAAQ,cAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,KAAK,CAAC,KAAK,CAAC,KAAK,CAAC,KAAK,AAClD,CAAC,AACD,GAAG,cAAC,CAAC,AACD,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,MAAM,AACpB,CAAC,AACD,iBAAG,MAAM,AAAC,CAAC,AACP,OAAO,CAAE,IAAI,AACjB,CAAC,AACD,OAAO,cAAC,CAAC,AACL,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,GAAG,AAClB,CAAC,AACD,SAAS,cAAC,CAAC,AACP,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,AACf,CAAC,AACD,KAAK,cAAC,CAAC,AACH,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,GAAG,CAAC,CAAC,CACb,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,KAAK,CACZ,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAC1D,eAAe,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACvD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AACtD,CAAC,AACD,MAAM,cAAC,CAAC,AACJ,MAAM,CAAE,OAAO,AACnB,CAAC\"}"
};

function preload$1(page) {
	return { typeParam: page.params.type };
}

function getPinyin$1(text, i18n) {
	const term = i18n.filter(term => term.ideogram === text)[0] || {};
	return "pinyin" in term ? term.pinyin : "-";
}

const Liste_des_thes_u5Btypeu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { typeParam } = $$props;
	let teas = [];
	let types = [];
	let i18n = [];

	onMount(async () => {
		const res = await fetch("https://api-tea.brutdethé.fr/api/v1/teas");

		if (res.ok) {
			teas = (await res.json()).api;
		} else {
			throw new Error(text);
		}

		const res1 = await fetch("https://api-tea.brutdethé.fr/api/v1/type");

		if (res1.ok) {
			types = (await res1.json()).api.map(type => type.ideogram);
		} else {
			throw new Error(text);
		}

		const res2 = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`);

		if (res2.ok) {
			i18n = (await res2.json()).api;
		} else {
			// 404
			throw new Error(text);
		}
	});

	const typeToDisplay = () => types.includes(typeParam) ? [typeParam] : types;
	const getTeasByType = (type, teas) => teas.filter(tea => tea.type === type);
	if ($$props.typeParam === void 0 && $$bindings.typeParam && typeParam !== void 0) $$bindings.typeParam(typeParam);
	$$result.css.add(css$2);

	return `${($$result.head += `${($$result.title = `<title>Liste des thés</title>`, "")}`, "")}
<h1>Liste des thés par type</h1>
<p>Cette liste regroupe une sélection de thés que l&#39;on imagine assez faciles à
    trouver. Pour voir le détail d&#39;un thé suivez le lien en cliquant sur sa
    photo.
</p>

${typeToDisplay().length
	? each(typeToDisplay(), type => `<section class="${"gallery-teas " + escape(type) + " svelte-bi5fqi"}">${validate_component(IconTeaType, "IconTeaType").$$render(
			$$result,
			{
				ideogram: type,
				pinyin: getPinyin$1(type, i18n)
			},
			{},
			{}
		)}
        <div class="${"gallery svelte-bi5fqi"}">${getTeasByType(type, teas).length
		? each(getTeasByType(type, teas), tea => `<figure class="${"item svelte-bi5fqi"}"><a href="${"fiche-" + escape(normalize(tea.pinyin))}"><img src="${"../assets/thes/thumbs/" + escape(tea.ideogram) + ".jpg"}"${add_attribute("alt", tea.pinyin, 0)} class="${"svelte-bi5fqi"}"></a>
                    <figcaption class="${"pinyin svelte-bi5fqi"}"><audio${add_attribute("id", tea.ideogram, 0)}><source src="${"assets/audio/" + escape(tea.ideogram) + ".mp3"}" type="${"audio/mpeg"}"></audio>
                        <span class="${"voice svelte-bi5fqi"}" title="${"voix"}">${escape(tea.pinyin)}</span>
                        <span class="${"ideogram voice svelte-bi5fqi"}" title="${"voix"}">${escape(tea.ideogram)}
                        </span></figcaption>

                </figure>`)
		: `
                <p>chargement des thés...</p>`}</div>
    </section>`)
	: `
    <p>chargement des types thés...</p>`}`;
});

/* src/routes/ressources/index.svelte generated by Svelte v3.21.0 */

const css$3 = {
	code: ".ghTreeItem.svelte-avcn9k.svelte-avcn9k{position:relative;padding:20px 0;margin:0 20px}.ghTreeTitle.svelte-avcn9k.svelte-avcn9k{margin-top:1em;line-height:1;font-size:1.7rem}.ghTreeTitle.svelte-avcn9k a.svelte-avcn9k{color:#73d56b}.ghTreeTitle.svelte-avcn9k a.svelte-avcn9k:hover{color:#002920}.ghTreeCategory.svelte-avcn9k.svelte-avcn9k{color:#002920}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<style>\\n    .ghTreeItem {\\n        position: relative;\\n        padding: 20px 0;\\n        margin: 0 20px;\\n    }\\n    .ghTreeTitle {\\n        margin-top: 1em;\\n        line-height: 1;\\n        font-size: 1.7rem;\\n    }\\n    .ghTreeTitle a {\\n        color: #73d56b;\\n    }\\n    .ghTreeTitle a:hover {\\n        color: #002920;\\n    }\\n    .ghTreeCategory {\\n        color: #002920;\\n    }\\n</style>\\n\\n<script context=\\\"module\\\">\\n    export function preload({ params, query }) {\\n        return this.fetch(`ressources.json`)\\n            .then(r => r.json())\\n            .then(posts => {\\n                return { posts }\\n            })\\n    }\\n</script>\\n\\n<script>\\n    export let posts\\n\\n    const categories = [\\n        {\\n            name: 'base',\\n            title: 'Les bases',\\n            excerpt:\\n                \\\"Quelques articles pour se repérer et mettre le pied à l'étrier\\\"\\n        },\\n        {\\n            name: 'intermediaire',\\n            title: 'Pour approfondir',\\n            excerpt: 'Pour tranquillement, aller un peu plus loin'\\n        },\\n        {\\n            name: 'expert',\\n            title: 'Pour butiner',\\n            excerpt:\\n                'Vous trouverez là, des articles variés pour creuser des sujets spécifiques'\\n        },\\n        {\\n            name: 'traduction',\\n            title: \\\"Pour s'ouvrir sur le monde\\\",\\n            excerpt:\\n                \\\"Petite collection d'articles sélectionnés et traduits de l'anglais ou du chinois\\\"\\n        }\\n    ]\\n\\n    function getPostsByCategory(category, posts) {\\n        return posts.filter(post => post.catégorie === category)\\n    }\\n</script>\\n\\n<svelte:head>\\n    <title>Ressources sur les thés</title>\\n</svelte:head>\\n\\n<section id=\\\"ghTree\\\" class=\\\"ghTree\\\" data-title=\\\"tree\\\">\\n\\n    <h1>Liste des ressources</h1>\\n\\n    {#each categories as category}\\n        <h2 class=\\\"ghTreeCategory\\\">{category.title}</h2>\\n        <p>{category.excerpt}</p>\\n        {#each getPostsByCategory(category.name, posts) as post}\\n            <!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n            <article class=\\\"ghTreeItem ghTypeFile\\\" data-title=\\\"dir\\\">\\n                <h3 class=\\\"ghTreeTitle\\\">\\n                    <a\\n                        rel=\\\"prefetch\\\"\\n                        class=\\\"folderLink\\\"\\n                        data-title=\\\"folderLink\\\"\\n                        href=\\\"ressources/{post.lien}\\\"\\n                    >\\n                        {post.titre}\\n                    </a>\\n                </h3>\\n                <p class=\\\"ghTreeExcerpt\\\" data-title=\\\"fileExcerpt\\\">\\n                    {post.description}\\n                </p>\\n                <a\\n                    class=\\\"ghTreeReadmore\\\"\\n                    title=\\\"Lire la suite de la fiche : {post.titre}\\\"\\n                    data-title=\\\"fileReadmoreLink\\\"\\n                    href=\\\"ressources/{post.lien}\\\"\\n                >\\n                    Lire la suite de la fiche\\n                </a>\\n            </article>\\n        {/each}\\n    {/each}\\n</section>\\n\"],\"names\":[],\"mappings\":\"AACI,WAAW,4BAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,MAAM,CAAE,CAAC,CAAC,IAAI,AAClB,CAAC,AACD,YAAY,4BAAC,CAAC,AACV,UAAU,CAAE,GAAG,CACf,WAAW,CAAE,CAAC,CACd,SAAS,CAAE,MAAM,AACrB,CAAC,AACD,0BAAY,CAAC,CAAC,cAAC,CAAC,AACZ,KAAK,CAAE,OAAO,AAClB,CAAC,AACD,0BAAY,CAAC,eAAC,MAAM,AAAC,CAAC,AAClB,KAAK,CAAE,OAAO,AAClB,CAAC,AACD,eAAe,4BAAC,CAAC,AACb,KAAK,CAAE,OAAO,AAClB,CAAC\"}"
};

function preload$2({ params, query }) {
	return this.fetch(`ressources.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

function getPostsByCategory(category, posts) {
	return posts.filter(post => post.catégorie === category);
}

const Ressources = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;

	const categories = [
		{
			name: "base",
			title: "Les bases",
			excerpt: "Quelques articles pour se repérer et mettre le pied à l'étrier"
		},
		{
			name: "intermediaire",
			title: "Pour approfondir",
			excerpt: "Pour tranquillement, aller un peu plus loin"
		},
		{
			name: "expert",
			title: "Pour butiner",
			excerpt: "Vous trouverez là, des articles variés pour creuser des sujets spécifiques"
		},
		{
			name: "traduction",
			title: "Pour s'ouvrir sur le monde",
			excerpt: "Petite collection d'articles sélectionnés et traduits de l'anglais ou du chinois"
		}
	];

	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css$3);

	return `${($$result.head += `${($$result.title = `<title>Ressources sur les thés</title>`, "")}`, "")}

<section id="${"ghTree"}" class="${"ghTree"}" data-title="${"tree"}"><h1>Liste des ressources</h1>

    ${each(categories, category => `<h2 class="${"ghTreeCategory svelte-avcn9k"}">${escape(category.title)}</h2>
        <p>${escape(category.excerpt)}</p>
        ${each(getPostsByCategory(category.name, posts), post => `
            <article class="${"ghTreeItem ghTypeFile svelte-avcn9k"}" data-title="${"dir"}"><h3 class="${"ghTreeTitle svelte-avcn9k"}"><a rel="${"prefetch"}" class="${"folderLink svelte-avcn9k"}" data-title="${"folderLink"}" href="${"ressources/" + escape(post.lien)}">${escape(post.titre)}
                    </a></h3>
                <p class="${"ghTreeExcerpt"}" data-title="${"fileExcerpt"}">${escape(post.description)}</p>
                <a class="${"ghTreeReadmore"}" title="${"Lire la suite de la fiche : " + escape(post.titre)}" data-title="${"fileReadmoreLink"}" href="${"ressources/" + escape(post.lien)}">Lire la suite de la fiche
                </a>
            </article>`)}`)}</section>`;
});

/* src/routes/ressources/[slug].svelte generated by Svelte v3.21.0 */

const css$4 = {
	code: ".content.svelte-1cbm39 .blobTools{position:fixed;height:100vh;width:32px;margin-left:-50px}.content.svelte-1cbm39 .blobTools a{display:block;text-indent:-9999px;opacity:0.3;transition:opacity 0.3s}.content.svelte-1cbm39 .blobTools a:hover{opacity:0.8}.content.svelte-1cbm39 .blobGhLink,.content.svelte-1cbm39 .blobGhEdit{width:20px;height:20px;margin:0 auto;margin-bottom:5px}.content.svelte-1cbm39 .blobGhLink{background:url('data:image/svg+xml,<svg contentScriptType=\"text/ecmascript\" contentStyleType=\"text/css\" enable-background=\"new 0 0 2048 2048\" height=\"2048px\" id=\"Layer_1\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.1\" viewBox=\"0.0 0 1536.0 2048\" width=\"1536.0px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" zoomAndPan=\"magnify\"><path d=\"M1536,1024c0,167.333-48.833,317.833-146.5,451.5S1165.667,1701.667,1011,1753c-18,3.333-31.167,1-39.5-7s-12.5-18-12.5-30  v-211c0-64.667-17.333-112-52-142c38-4,72.167-10,102.5-18c30.333-8,61.667-21,94-39s59.333-40.167,81-66.5s39.333-61.333,53-105  c13.667-43.667,20.5-93.833,20.5-150.5c0-80.667-26.333-149.333-79-206c24.667-60.667,22-128.667-8-204  c-18.667-6-45.667-2.333-81,11s-66,28-92,44l-38,24c-62-17.333-126-26-192-26s-130,8.667-192,26  c-10.667-7.333-24.833-16.333-42.5-27S488,602.5,450,587.5S383.333,568,364,574c-29.333,75.333-31.667,143.333-7,204  c-52.667,56.667-79,125.333-79,206c0,56.667,6.833,106.667,20.5,150c13.667,43.333,31.167,78.333,52.5,105s48.167,49,80.5,67  s63.667,31,94,39c30.333,8,64.5,14,102.5,18c-26.667,24-43,58.333-49,103c-14,6.667-29,11.667-45,15s-35,5-57,5  s-43.833-7.167-65.5-21.5s-40.167-35.167-55.5-62.5c-12.667-21.333-28.833-38.667-48.5-52s-36.167-21.333-49.5-24l-20-3  c-14,0-23.667,1.5-29,4.5s-7,6.833-5,11.5s5,9.333,9,14s8.333,8.667,13,12l7,5c14.667,6.667,29.167,19.333,43.5,38  s24.833,35.667,31.5,51l10,23c8.667,25.333,23.333,45.833,44,61.5s43,25.667,67,30s47.167,6.667,69.5,7  c22.333,0.333,40.833-0.833,55.5-3.5l23-4c0,25.333,0.167,55,0.5,89s0.5,52,0.5,54c0,12-4.333,22-13,30s-22,10.333-40,7  c-154.667-51.333-280.833-143.833-378.5-277.5S0,1191.333,0,1024c0-139.333,34.333-267.833,103-385.5S264.833,427.667,382.5,359  S628.667,256,768,256s267.833,34.333,385.5,103s210.833,161.833,279.5,279.5S1536,884.667,1536,1024z\" fill=\"black\" /></svg>')\n            0 0 no-repeat;background-size:16px}.content.svelte-1cbm39 .blobGhEdit{background:url('data:image/svg+xml,<svg contentScriptType=\"text/ecmascript\" contentStyleType=\"text/css\" enable-background=\"new 0 0 2048 2048\" height=\"2048px\" id=\"Layer_1\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.1\" viewBox=\"0.0 0 1536.0 2048\" width=\"1536.0px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" zoomAndPan=\"magnify\"><path d=\"M 363,0 454,91 219,326 128,235 V 128 H 256 V 0 h 107 z m 523,928 q 0,22 -22,22 -10,0 -17,-7 L 305,401 q -7,-7 -7,-17 0,-22 22,-22 10,0 17,7 l 542,542 q 7,7 7,17 z M 832,1120 1248,704 416,-128 H 0 v 416 z m 683,-96 q 0,-53 -37,-90 l -166,-166 -416,416 166,165 q 36,38 90,38 53,0 91,-38 l 235,-234 q 37,-39 37,-91 z \" fill=\"black\" /></svg>')\n            0 0 no-repeat;background-size:16px}.content.svelte-1cbm39 .blobPageTop{position:absolute;bottom:150px;width:32px;height:32px;background:url('data:image/svg+xml,<svg contentScriptType=\"text/ecmascript\" contentStyleType=\"text/css\" enable-background=\"new 0 0 2048 2048\" height=\"2048px\" id=\"Layer_1\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.1\" viewBox=\"0.0 0 1536.0 2048\" width=\"1536.0px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" zoomAndPan=\"magnify\"><path d=\"  M1075,1312c0,8.667-3.333,16.333-10,23l-50,50c-6.667,6.667-14.333,10-23,10s-16.333-3.333-23-10L576,992l-393,393  c-6.667,6.667-14.333,10-23,10s-16.333-3.333-23-10l-50-50c-6.667-6.667-10-14.333-10-23s3.333-16.333,10-23l466-466  c6.667-6.667,14.333-10,23-10s16.333,3.333,23,10l466,466C1071.667,1295.667,1075,1303.333,1075,1312z\" fill=\"black\" /></svg>')\n            0 0 no-repeat;background-size:32px}.content.svelte-1cbm39 .tooltip{position:relative}.content.svelte-1cbm39 .tooltip:before{content:attr(title);position:absolute;bottom:100%;left:50%;padding:0.25em 0.5em;min-width:75px;font-size:0.8em;color:#fff;text-indent:0;text-align:center;background:black;opacity:0;pointer-events:none;transform:translateX(-50%);transition:all 0.2s ease-out}.content.svelte-1cbm39 .tooltip:hover:before{transform:translateX(-50%) translateY(-10%);opacity:1}.content.svelte-1cbm39 #parentRepo{padding-top:10px;text-align:center}.content.svelte-1cbm39 img{width:auto;margin:auto}.content.svelte-1cbm39 iframe{display:block;margin:2em auto;-webkit-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);-moz-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1)}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<style>\\n    /*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n\\n    .content :global(.blobTools) {\\n        position: fixed;\\n        height: 100vh;\\n        width: 32px;\\n        margin-left: -50px;\\n    }\\n\\n    .content :global(.blobTools a) {\\n        display: block;\\n        text-indent: -9999px;\\n        opacity: 0.3;\\n        transition: opacity 0.3s;\\n    }\\n\\n    .content :global(.blobTools a:hover) {\\n        opacity: 0.8;\\n    }\\n\\n    .content :global(.blobGhLink),\\n    .content :global(.blobGhEdit) {\\n        width: 20px;\\n        height: 20px;\\n        margin: 0 auto;\\n        margin-bottom: 5px;\\n    }\\n\\n    .content :global(.blobGhLink) {\\n        background: url('data:image/svg+xml,<svg contentScriptType=\\\"text/ecmascript\\\" contentStyleType=\\\"text/css\\\" enable-background=\\\"new 0 0 2048 2048\\\" height=\\\"2048px\\\" id=\\\"Layer_1\\\" preserveAspectRatio=\\\"xMidYMid meet\\\" version=\\\"1.1\\\" viewBox=\\\"0.0 0 1536.0 2048\\\" width=\\\"1536.0px\\\" xml:space=\\\"preserve\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\" zoomAndPan=\\\"magnify\\\"><path d=\\\"M1536,1024c0,167.333-48.833,317.833-146.5,451.5S1165.667,1701.667,1011,1753c-18,3.333-31.167,1-39.5-7s-12.5-18-12.5-30  v-211c0-64.667-17.333-112-52-142c38-4,72.167-10,102.5-18c30.333-8,61.667-21,94-39s59.333-40.167,81-66.5s39.333-61.333,53-105  c13.667-43.667,20.5-93.833,20.5-150.5c0-80.667-26.333-149.333-79-206c24.667-60.667,22-128.667-8-204  c-18.667-6-45.667-2.333-81,11s-66,28-92,44l-38,24c-62-17.333-126-26-192-26s-130,8.667-192,26  c-10.667-7.333-24.833-16.333-42.5-27S488,602.5,450,587.5S383.333,568,364,574c-29.333,75.333-31.667,143.333-7,204  c-52.667,56.667-79,125.333-79,206c0,56.667,6.833,106.667,20.5,150c13.667,43.333,31.167,78.333,52.5,105s48.167,49,80.5,67  s63.667,31,94,39c30.333,8,64.5,14,102.5,18c-26.667,24-43,58.333-49,103c-14,6.667-29,11.667-45,15s-35,5-57,5  s-43.833-7.167-65.5-21.5s-40.167-35.167-55.5-62.5c-12.667-21.333-28.833-38.667-48.5-52s-36.167-21.333-49.5-24l-20-3  c-14,0-23.667,1.5-29,4.5s-7,6.833-5,11.5s5,9.333,9,14s8.333,8.667,13,12l7,5c14.667,6.667,29.167,19.333,43.5,38  s24.833,35.667,31.5,51l10,23c8.667,25.333,23.333,45.833,44,61.5s43,25.667,67,30s47.167,6.667,69.5,7  c22.333,0.333,40.833-0.833,55.5-3.5l23-4c0,25.333,0.167,55,0.5,89s0.5,52,0.5,54c0,12-4.333,22-13,30s-22,10.333-40,7  c-154.667-51.333-280.833-143.833-378.5-277.5S0,1191.333,0,1024c0-139.333,34.333-267.833,103-385.5S264.833,427.667,382.5,359  S628.667,256,768,256s267.833,34.333,385.5,103s210.833,161.833,279.5,279.5S1536,884.667,1536,1024z\\\" fill=\\\"black\\\" /></svg>')\\n            0 0 no-repeat;\\n        background-size: 16px;\\n    }\\n\\n    .content :global(.blobGhEdit) {\\n        background: url('data:image/svg+xml,<svg contentScriptType=\\\"text/ecmascript\\\" contentStyleType=\\\"text/css\\\" enable-background=\\\"new 0 0 2048 2048\\\" height=\\\"2048px\\\" id=\\\"Layer_1\\\" preserveAspectRatio=\\\"xMidYMid meet\\\" version=\\\"1.1\\\" viewBox=\\\"0.0 0 1536.0 2048\\\" width=\\\"1536.0px\\\" xml:space=\\\"preserve\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\" zoomAndPan=\\\"magnify\\\"><path d=\\\"M 363,0 454,91 219,326 128,235 V 128 H 256 V 0 h 107 z m 523,928 q 0,22 -22,22 -10,0 -17,-7 L 305,401 q -7,-7 -7,-17 0,-22 22,-22 10,0 17,7 l 542,542 q 7,7 7,17 z M 832,1120 1248,704 416,-128 H 0 v 416 z m 683,-96 q 0,-53 -37,-90 l -166,-166 -416,416 166,165 q 36,38 90,38 53,0 91,-38 l 235,-234 q 37,-39 37,-91 z \\\" fill=\\\"black\\\" /></svg>')\\n            0 0 no-repeat;\\n        background-size: 16px;\\n    }\\n\\n    .content :global(.blobPageTop) {\\n        position: absolute;\\n        bottom: 150px;\\n        width: 32px;\\n        height: 32px;\\n        background: url('data:image/svg+xml,<svg contentScriptType=\\\"text/ecmascript\\\" contentStyleType=\\\"text/css\\\" enable-background=\\\"new 0 0 2048 2048\\\" height=\\\"2048px\\\" id=\\\"Layer_1\\\" preserveAspectRatio=\\\"xMidYMid meet\\\" version=\\\"1.1\\\" viewBox=\\\"0.0 0 1536.0 2048\\\" width=\\\"1536.0px\\\" xml:space=\\\"preserve\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\" zoomAndPan=\\\"magnify\\\"><path d=\\\"  M1075,1312c0,8.667-3.333,16.333-10,23l-50,50c-6.667,6.667-14.333,10-23,10s-16.333-3.333-23-10L576,992l-393,393  c-6.667,6.667-14.333,10-23,10s-16.333-3.333-23-10l-50-50c-6.667-6.667-10-14.333-10-23s3.333-16.333,10-23l466-466  c6.667-6.667,14.333-10,23-10s16.333,3.333,23,10l466,466C1071.667,1295.667,1075,1303.333,1075,1312z\\\" fill=\\\"black\\\" /></svg>')\\n            0 0 no-repeat;\\n        background-size: 32px;\\n    }\\n    /* Tooltip Styles\\n  */\\n    .content :global(.tooltip) {\\n        position: relative;\\n    }\\n    .content :global(.tooltip:before) {\\n        content: attr(title);\\n        position: absolute;\\n        bottom: 100%;\\n        left: 50%;\\n        padding: 0.25em 0.5em;\\n        min-width: 75px;\\n        font-size: 0.8em;\\n        color: #fff;\\n        text-indent: 0;\\n        text-align: center;\\n        background: black;\\n        opacity: 0;\\n        pointer-events: none;\\n        transform: translateX(-50%);\\n        transition: all 0.2s ease-out;\\n    }\\n    .content :global(.tooltip:hover:before) {\\n        transform: translateX(-50%) translateY(-10%);\\n        opacity: 1;\\n    }\\n    .content :global(#parentRepo) {\\n        padding-top: 10px;\\n        text-align: center;\\n    }\\n    .content :global(img) {\\n        width: auto;\\n        margin: auto;\\n    }\\n    .content :global(iframe) {\\n        display: block;\\n        margin: 2em auto;\\n        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n    }\\n</style>\\n\\n<script context=\\\"module\\\">\\n    export async function preload({ params, query }) {\\n        // the `slug` parameter is available because\\n        // this file is called [slug].svelte\\n        const res = await this.fetch(`ressources/${params.slug}.json`)\\n        const data = await res.json()\\n\\n        if (res.status === 200) {\\n            return { post: data }\\n        } else {\\n            this.error(res.status, data.message)\\n        }\\n    }\\n</script>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n    onMount(async () => {\\n        ;[...document.querySelectorAll('a[href^=\\\"#\\\"]')].map(\\n            x => (x.href = document.location + new URL(x.href).hash)\\n        )\\n    })\\n    export let post\\n</script>\\n\\n<svelte:head>\\n    <title>{post.titre}</title>\\n</svelte:head>\\n\\n<aside class=\\\"blobTools\\\">\\n    <a\\n        href=\\\"https://github.com/oisiflorus/ressources/blob/master/journees-cogitation/prix-libre-et-dialogue.md\\\"\\n        title=\\\"Voir sur Github\\\"\\n        class=\\\"blobGhLink tooltip\\\"\\n    >\\n        &nbsp;\\n    </a>\\n    <a\\n        href=\\\"https://github.com/oisiflorus/ressources/edit/master/journees-cogitation/prix-libre-et-dialogue.md\\\"\\n        title=\\\"Éditer sur Github\\\"\\n        class=\\\"blobGhEdit tooltip\\\"\\n    >\\n        &nbsp;\\n    </a>\\n\\n    <!-- <a href=\\\"#top\\\" class=\\\"blobPageTop\\\">Haut de page</a> -->\\n</aside>\\n<article class=\\\"blobContent\\\" data-title=\\\"content\\\">\\n    <h1>{post.titre}</h1>\\n\\n    <div class=\\\"content\\\">\\n        {@html post.html}\\n    </div>\\n</article>\\n\"],\"names\":[],\"mappings\":\"AAUI,sBAAQ,CAAC,AAAQ,UAAU,AAAE,CAAC,AAC1B,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,KAAK,AACtB,CAAC,AAED,sBAAQ,CAAC,AAAQ,YAAY,AAAE,CAAC,AAC5B,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,OAAO,CACpB,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,OAAO,CAAC,IAAI,AAC5B,CAAC,AAED,sBAAQ,CAAC,AAAQ,kBAAkB,AAAE,CAAC,AAClC,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,sBAAQ,CAAC,AAAQ,WAAW,AAAC,CAC7B,sBAAQ,CAAC,AAAQ,WAAW,AAAE,CAAC,AAC3B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,aAAa,CAAE,GAAG,AACtB,CAAC,AAED,sBAAQ,CAAC,AAAQ,WAAW,AAAE,CAAC,AAC3B,UAAU,CAAE,IAAI,m0DAAm0D,CAAC;YACh1D,CAAC,CAAC,CAAC,CAAC,SAAS,CACjB,eAAe,CAAE,IAAI,AACzB,CAAC,AAED,sBAAQ,CAAC,AAAQ,WAAW,AAAE,CAAC,AAC3B,UAAU,CAAE,IAAI,8sBAA8sB,CAAC;YAC3tB,CAAC,CAAC,CAAC,CAAC,SAAS,CACjB,eAAe,CAAE,IAAI,AACzB,CAAC,AAED,sBAAQ,CAAC,AAAQ,YAAY,AAAE,CAAC,AAC5B,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,0tBAA0tB,CAAC;YACvuB,CAAC,CAAC,CAAC,CAAC,SAAS,CACjB,eAAe,CAAE,IAAI,AACzB,CAAC,AAGD,sBAAQ,CAAC,AAAQ,QAAQ,AAAE,CAAC,AACxB,QAAQ,CAAE,QAAQ,AACtB,CAAC,AACD,sBAAQ,CAAC,AAAQ,eAAe,AAAE,CAAC,AAC/B,OAAO,CAAE,KAAK,KAAK,CAAC,CACpB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,GAAG,CACT,OAAO,CAAE,MAAM,CAAC,KAAK,CACrB,SAAS,CAAE,IAAI,CACf,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,CAAC,CACd,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IAAI,CACpB,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,AACjC,CAAC,AACD,sBAAQ,CAAC,AAAQ,qBAAqB,AAAE,CAAC,AACrC,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,WAAW,IAAI,CAAC,CAC5C,OAAO,CAAE,CAAC,AACd,CAAC,AACD,sBAAQ,CAAC,AAAQ,WAAW,AAAE,CAAC,AAC3B,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MAAM,AACtB,CAAC,AACD,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AAChB,CAAC,AACD,sBAAQ,CAAC,AAAQ,MAAM,AAAE,CAAC,AACtB,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,GAAG,CAAC,IAAI,CAChB,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAC1D,eAAe,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACvD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AACtD,CAAC\"}"
};

async function preload$3({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`ressources/${params.slug}.json`);

	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	onMount(async () => {
		
		[...document.querySelectorAll("a[href^=\"#\"]")].map(x => x.href = document.location + new URL(x.href).hash);
	});

	let { post } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$4);

	return `${($$result.head += `${($$result.title = `<title>${escape(post.titre)}</title>`, "")}`, "")}

<aside class="${"blobTools"}"><a href="${"https://github.com/oisiflorus/ressources/blob/master/journees-cogitation/prix-libre-et-dialogue.md"}" title="${"Voir sur Github"}" class="${"blobGhLink tooltip"}"> 
    </a>
    <a href="${"https://github.com/oisiflorus/ressources/edit/master/journees-cogitation/prix-libre-et-dialogue.md"}" title="${"Éditer sur Github"}" class="${"blobGhEdit tooltip"}"> 
    </a>

    </aside>
<article class="${"blobContent"}" data-title="${"content"}"><h1>${escape(post.titre)}</h1>

    <div class="${"content svelte-1cbm39"}">${post.html}</div></article>`;
});

/* src/components/Brews.svelte generated by Svelte v3.21.0 */

const css$5 = {
	code: ".pinyin.svelte-1x5s94g.svelte-1x5s94g{font-weight:normal;font-size:1.5em}.ideogram.svelte-1x5s94g.svelte-1x5s94g{font-size:1em;color:#999;font-weight:normal}.icons.svelte-1x5s94g.svelte-1x5s94g{margin:0;padding:0;border:none;background:transparent;display:inline-block;text-align:left;width:1.5em;line-height:3em}.brew-title.svelte-1x5s94g.svelte-1x5s94g{display:grid;grid-template-columns:3rem auto}.brew-title.svelte-1x5s94g .icons.svelte-1x5s94g{margin:0.5em 0;width:2.5em}.brew-title.svelte-1x5s94g .ideogram.svelte-1x5s94g{display:block}.brew-details.svelte-1x5s94g.svelte-1x5s94g{margin:1.5em 0}.brew-details.svelte-1x5s94g td.svelte-1x5s94g{font-size:1em;border:1px solid #ccc}input.svelte-1x5s94g.svelte-1x5s94g{width:6em;heigth:2em;border-color:#ddd;font-size:1em;color:grey}.mini.svelte-1x5s94g.svelte-1x5s94g{font-size:0.8em;color:grey}.voice.svelte-1x5s94g.svelte-1x5s94g{cursor:pointer}",
	map: "{\"version\":3,\"file\":\"Brews.svelte\",\"sources\":[\"Brews.svelte\"],\"sourcesContent\":[\"<style>\\n    .pinyin {\\n        font-weight: normal;\\n        font-size: 1.5em;\\n    }\\n    .ideogram {\\n        font-size: 1em;\\n        color: #999;\\n        font-weight: normal;\\n    }\\n    .icons {\\n        margin: 0;\\n        padding: 0;\\n        border: none;\\n        background: transparent;\\n        display: inline-block;\\n        text-align: left;\\n        width: 1.5em;\\n        line-height: 3em;\\n    }\\n    .brew-title {\\n        display: grid;\\n        grid-template-columns: 3rem auto;\\n    }\\n    .brew-title .icons {\\n        margin: 0.5em 0;\\n        width: 2.5em;\\n    }\\n    .brew-title .ideogram {\\n        display: block;\\n    }\\n    .brew-details {\\n        margin: 1.5em 0;\\n    }\\n    .brew-details td {\\n        font-size: 1em;\\n        border: 1px solid #ccc;\\n    }\\n    input {\\n        width: 6em;\\n        heigth: 2em;\\n        border-color: #ddd;\\n        font-size: 1em;\\n        color: grey;\\n    }\\n    .mini {\\n        font-size: 0.8em;\\n        color: grey;\\n    }\\n    .voice {\\n        cursor: pointer;\\n    }\\n</style>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n    export let brew\\n\\n    let i18n = []\\n\\n    onMount(async () => {\\n        const res = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`)\\n\\n        if (res.ok) {\\n            i18n = (await res.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n    function getPinyin(text, i18n) {\\n        const term = i18n.filter(term => term.ideogram === text)[0] || {}\\n        return 'pinyin' in term ? term.pinyin : '-'\\n    }\\n    function playAudio(ideogram) {\\n        document.querySelector(`#${ideogram}`).play()\\n    }\\n\\n    let ml = 100\\n\\n    $: weight = (ml / +brew.quantity.split(':')[1]).toFixed(1)\\n\\n    const durations = +brew.durations ? [brew.durations] : brew.durations\\n\\n    const display = {\\n        times: times => {\\n            if (+times) {\\n                return `${times} infusions`\\n            } else if (times.length == 2 && Array.isArray([times])) {\\n                return `${times[0]} à ${times[1]} infusions`\\n            }\\n        },\\n        temperatures: temperatures => {\\n            if (+temperatures) {\\n                return `à partir de ${temperatures}°`\\n            } else if (\\n                temperatures.length == 2 &&\\n                Array.isArray(temperatures)\\n            ) {\\n                return `entre ${temperatures[0]}° et ${temperatures[1]}°`\\n            }\\n        }\\n    }\\n</script>\\n\\n<aside class=\\\"brew-title\\\">\\n    <img\\n        class=\\\"icons brew-style\\\"\\n        src=\\\"/assets/icons/{brew.type}.svg\\\"\\n        alt=\\\"type d'infusion\\\"\\n    />\\n    <div class=\\\"brew-title-text\\\">\\n        <audio id=\\\"{brew.type}\\\">\\n            <source src=\\\"assets/audio/{brew.type}.mp3\\\" type=\\\"audio/mpeg\\\" />\\n        </audio>\\n        <span\\n            class=\\\"pinyin voice\\\"\\n            title=\\\"voix\\\"\\n            on:click=\\\"{playAudio(brew.type)}\\\"\\n        >\\n            {getPinyin(brew.type, i18n)}\\n        </span>\\n        <span\\n            class=\\\"ideogram voice\\\"\\n            title=\\\"voix\\\"\\n            on:click=\\\"{playAudio(brew.type)}\\\"\\n        >\\n            {brew.type}\\n        </span>\\n    </div>\\n</aside>\\n\\n<table class=\\\"brew-details\\\">\\n    <tr>\\n        <td>\\n            <img\\n                class=\\\"icons thermometer\\\"\\n                src=\\\"/assets/icons/temperature.svg\\\"\\n                alt=\\\"temperature\\\"\\n            />\\n            {display.temperatures(brew.temperatures)}\\n        </td>\\n\\n        {#if brew.times}\\n            <td>{display.times(brew.times)}</td>\\n        {/if}\\n    </tr>\\n    {#if durations}\\n        <tr>\\n            <td colspan=\\\"2\\\">\\n                <table>\\n                    <span class=\\\"mini\\\">Temps pour chaque infusion</span>\\n                    <tr>\\n                        {#each durations as duration, index}\\n                            <td>{index + 1}</td>\\n                        {/each}\\n                    </tr>\\n                    <tr>\\n                        {#each durations as duration}\\n                            <td>{duration} sec</td>\\n                        {/each}\\n                    </tr>\\n                </table>\\n            </td>\\n        </tr>\\n    {/if}\\n    <td colspan=\\\"2\\\">\\n        Vous pouvez tester pour\\n        <input type=\\\"number\\\" step=\\\"20\\\" bind:value=\\\"{ml}\\\" />\\n        ml avec\\n        <strong>{weight} g</strong>\\n        de thé.\\n        <!-- <input type=range bind:value={b} min=0 max=10> -->\\n    </td>\\n</table>\\n\"],\"names\":[],\"mappings\":\"AACI,OAAO,8BAAC,CAAC,AACL,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,KAAK,AACpB,CAAC,AACD,SAAS,8BAAC,CAAC,AACP,SAAS,CAAE,GAAG,CACd,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,MAAM,AACvB,CAAC,AACD,MAAM,8BAAC,CAAC,AACJ,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,YAAY,CACrB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,AACpB,CAAC,AACD,WAAW,8BAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,IAAI,AACpC,CAAC,AACD,0BAAW,CAAC,MAAM,eAAC,CAAC,AAChB,MAAM,CAAE,KAAK,CAAC,CAAC,CACf,KAAK,CAAE,KAAK,AAChB,CAAC,AACD,0BAAW,CAAC,SAAS,eAAC,CAAC,AACnB,OAAO,CAAE,KAAK,AAClB,CAAC,AACD,aAAa,8BAAC,CAAC,AACX,MAAM,CAAE,KAAK,CAAC,CAAC,AACnB,CAAC,AACD,4BAAa,CAAC,EAAE,eAAC,CAAC,AACd,SAAS,CAAE,GAAG,CACd,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC1B,CAAC,AACD,KAAK,8BAAC,CAAC,AACH,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,YAAY,CAAE,IAAI,CAClB,SAAS,CAAE,GAAG,CACd,KAAK,CAAE,IAAI,AACf,CAAC,AACD,KAAK,8BAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,AACf,CAAC,AACD,MAAM,8BAAC,CAAC,AACJ,MAAM,CAAE,OAAO,AACnB,CAAC\"}"
};

function getPinyin$2(text, i18n) {
	const term = i18n.filter(term => term.ideogram === text)[0] || {};
	return "pinyin" in term ? term.pinyin : "-";
}

const Brews = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { brew } = $$props;
	let i18n = [];

	onMount(async () => {
		const res = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`);

		if (res.ok) {
			i18n = (await res.json()).api;
		} else {
			// 404
			throw new Error(text);
		}
	});

	let ml = 100;
	const durations = +brew.durations ? [brew.durations] : brew.durations;

	const display = {
		times: times => {
			if (+times) {
				return `${times} infusions`;
			} else if (times.length == 2 && Array.isArray([times])) {
				return `${times[0]} à ${times[1]} infusions`;
			}
		},
		temperatures: temperatures => {
			if (+temperatures) {
				return `à partir de ${temperatures}°`;
			} else if (temperatures.length == 2 && Array.isArray(temperatures)) {
				return `entre ${temperatures[0]}° et ${temperatures[1]}°`;
			}
		}
	};

	if ($$props.brew === void 0 && $$bindings.brew && brew !== void 0) $$bindings.brew(brew);
	$$result.css.add(css$5);
	let weight = (ml / +brew.quantity.split(":")[1]).toFixed(1);

	return `<aside class="${"brew-title svelte-1x5s94g"}"><img class="${"icons brew-style svelte-1x5s94g"}" src="${"/assets/icons/" + escape(brew.type) + ".svg"}" alt="${"type d'infusion"}">
    <div class="${"brew-title-text"}"><audio${add_attribute("id", brew.type, 0)}><source src="${"assets/audio/" + escape(brew.type) + ".mp3"}" type="${"audio/mpeg"}"></audio>
        <span class="${"pinyin voice svelte-1x5s94g"}" title="${"voix"}">${escape(getPinyin$2(brew.type, i18n))}</span>
        <span class="${"ideogram voice svelte-1x5s94g"}" title="${"voix"}">${escape(brew.type)}</span></div></aside>

<table class="${"brew-details svelte-1x5s94g"}"><tr><td class="${"svelte-1x5s94g"}"><img class="${"icons thermometer svelte-1x5s94g"}" src="${"/assets/icons/temperature.svg"}" alt="${"temperature"}">
            ${escape(display.temperatures(brew.temperatures))}</td>

        ${brew.times
	? `<td class="${"svelte-1x5s94g"}">${escape(display.times(brew.times))}</td>`
	: ``}</tr>
    ${durations
	? `<tr><td colspan="${"2"}" class="${"svelte-1x5s94g"}"><table><span class="${"mini svelte-1x5s94g"}">Temps pour chaque infusion</span>
                    <tr>${each(durations, (duration, index) => `<td class="${"svelte-1x5s94g"}">${escape(index + 1)}</td>`)}</tr>
                    <tr>${each(durations, duration => `<td class="${"svelte-1x5s94g"}">${escape(duration)} sec</td>`)}</tr></table></td></tr>`
	: ``}
    <td colspan="${"2"}" class="${"svelte-1x5s94g"}">Vous pouvez tester pour
        <input type="${"number"}" step="${"20"}" class="${"svelte-1x5s94g"}"${add_attribute("value", ml, 1)}>
        ml avec
        <strong>${escape(weight)} g</strong>
        de thé.
        </td></table>`;
});

/* src/routes/fiche-[pinyin].svelte generated by Svelte v3.21.0 */

const css$6 = {
	code: ".wrapper.svelte-t92v86.svelte-t92v86.svelte-t92v86{display:grid;grid-template-columns:400px 2fr 2fr;grid-gap:1em;color:#444;font-size:1.2em}.brew.svelte-t92v86.svelte-t92v86.svelte-t92v86{padding:1em;border-top:1px solid #ccc}.box.svelte-t92v86.svelte-t92v86.svelte-t92v86{color:#444;padding-left:3em}.photo-zoom.svelte-t92v86.svelte-t92v86.svelte-t92v86{padding:0;height:400px;width:400px;position:relative;overflow:hidden;-webkit-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);-moz-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);cursor:-webkit-zoom-in;cursor:-moz-zoom-in;cursor:zoom-in}.photo-zoom.svelte-t92v86.svelte-t92v86 img.svelte-t92v86.svelte-t92v86{margin:0;padding:0;max-width:100%;transform-origin:65% 75%;transition:transform 1s, filter 0.5s ease-out}.photo-zoom.svelte-t92v86.svelte-t92v86:hover img.svelte-t92v86.svelte-t92v86{transform:scale(4)}.zoom.svelte-t92v86.svelte-t92v86.svelte-t92v86{background:url(/assets/icons/zoom-in.svg) center center no-repeat;position:absolute;left:0;top:0.5em;z-index:1000;width:2em}.property-title.svelte-t92v86.svelte-t92v86.svelte-t92v86{margin-top:1.5em;font-size:0.8em;font-weight:800}.property-icon.svelte-t92v86.svelte-t92v86.svelte-t92v86{margin:0;margin-top:1em;font-size:0.8em;line-height:2.9em}.property-value.svelte-t92v86.svelte-t92v86>ul.svelte-t92v86.svelte-t92v86{margin:0}.property-value.svelte-t92v86.svelte-t92v86.svelte-t92v86,.property-value.svelte-t92v86>ul.svelte-t92v86>li.svelte-t92v86{margin:0;font-size:0.8em}.icons.svelte-t92v86.svelte-t92v86.svelte-t92v86{margin:0 auto;border:none;background:transparent;display:inline-block;width:18%}.ideogram-pinyin.svelte-t92v86.svelte-t92v86.svelte-t92v86{display:inline-block}.ideogram.svelte-t92v86.svelte-t92v86.svelte-t92v86{font-size:0.7em;color:#999;font-weight:normal}h1.svelte-t92v86.svelte-t92v86 span.svelte-t92v86.svelte-t92v86{display:block}p.svelte-t92v86.svelte-t92v86.svelte-t92v86{margin:0;padding:0}.pinyin.svelte-t92v86.svelte-t92v86.svelte-t92v86{font-weight:normal;font-size:1.1em}.mountain.svelte-t92v86.svelte-t92v86.svelte-t92v86{vertical-align:top}.voice.svelte-t92v86.svelte-t92v86.svelte-t92v86{cursor:pointer}",
	map: "{\"version\":3,\"file\":\"fiche-[pinyin].svelte\",\"sources\":[\"fiche-[pinyin].svelte\"],\"sourcesContent\":[\"<style>\\n    .wrapper {\\n        display: grid;\\n        grid-template-columns: 400px 2fr 2fr;\\n        grid-gap: 1em;\\n        color: #444;\\n        font-size: 1.2em;\\n    }\\n\\n    .brew {\\n        padding: 1em;\\n        border-top: 1px solid #ccc;\\n    }\\n\\n    .box {\\n        color: #444;\\n        padding-left: 3em;\\n    }\\n\\n    .photo-zoom {\\n        padding: 0;\\n        height: 400px; /* [1.1] Set it as per your need */\\n        width: 400px;\\n        position: relative;\\n        overflow: hidden; /* [1.2] Hide the overflowing of child elements */\\n        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        cursor: -webkit-zoom-in;\\n        cursor: -moz-zoom-in;\\n        cursor: zoom-in;\\n    }\\n\\n    .photo-zoom img {\\n        margin: 0;\\n        padding: 0;\\n        max-width: 100%;\\n        transform-origin: 65% 75%;\\n        transition: transform 1s, filter 0.5s ease-out;\\n    }\\n\\n    .photo-zoom:hover img {\\n        transform: scale(4);\\n    }\\n\\n    .zoom {\\n        background: url(/assets/icons/zoom-in.svg) center center no-repeat;\\n        position: absolute;\\n        left: 0;\\n        top: 0.5em;\\n        z-index: 1000;\\n        width: 2em;\\n    }\\n\\n    .property-title {\\n        margin-top: 1.5em;\\n        font-size: 0.8em;\\n        font-weight: 800;\\n    }\\n\\n    .property-icon {\\n        margin: 0;\\n        margin-top: 1em;\\n        font-size: 0.8em;\\n        line-height: 2.9em;\\n    }\\n\\n    .property-value > ul {\\n        margin: 0;\\n    }\\n    .property-value,\\n    .property-value > ul > li {\\n        margin: 0;\\n        font-size: 0.8em;\\n    }\\n    .icons {\\n        margin: 0 auto;\\n        border: none;\\n        background: transparent;\\n        display: inline-block;\\n        width: 18%;\\n    }\\n    .ideogram-pinyin {\\n        display: inline-block;\\n    }\\n    .ideogram {\\n        font-size: 0.7em;\\n        color: #999;\\n        font-weight: normal;\\n    }\\n    h1 span {\\n        display: block;\\n    }\\n\\n    p {\\n        margin: 0;\\n        padding: 0;\\n    }\\n    .pinyin {\\n        font-weight: normal;\\n        font-size: 1.1em;\\n    }\\n    .mountain {\\n        vertical-align: top;\\n    }\\n    .voice {\\n        cursor: pointer;\\n    }\\n</style>\\n\\n<script context=\\\"module\\\">\\n    export function preload(page) {\\n        return { pinyin: page.params.pinyin }\\n    }\\n</script>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n    import Brews from '../components/Brews.svelte'\\n    import IconTeaType from '../components/IconTeaType.svelte'\\n    import { normalize } from '../components/NormalizePinyin.svelte'\\n\\n    export let pinyin\\n\\n    let tea = {}\\n    let i18n = []\\n\\n    onMount(async () => {\\n        const res0 = await fetch(`https://api-tea.brutdethé.fr/api/v1/teas`)\\n\\n        if (res0.ok) {\\n            const teas = (await res0.json()).api\\n            tea = teas.filter(tea => pinyin === normalize(tea.pinyin))[0]\\n            if (!tea) {\\n                // 404\\n                throw new Error('no tea found')\\n            }\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n\\n        const res1 = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`)\\n\\n        if (res1.ok) {\\n            i18n = (await res1.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n\\n    function getPinyin(text, i18n) {\\n        const term = i18n.filter(term => term.ideogram === text)[0] || {}\\n        return 'pinyin' in term ? term.pinyin : '-'\\n    }\\n\\n    const display = {\\n        elevations: elevations => {\\n            if (+elevations) {\\n                return `à partir de ${elevations} mètres`\\n            } else if (elevations.length == 2 && Array.isArray([elevations])) {\\n                return `${elevations[0]} à ${elevations[1]} mètres`\\n            }\\n        },\\n        oxidations: oxidations => {\\n            if (+oxidations) {\\n                return `à partir de ${oxidations}%`\\n            } else if (oxidations.length == 2 && Array.isArray(oxidations)) {\\n                return `entre ${oxidations[0]}% et ${oxidations[1]}%`\\n            }\\n        }\\n    }\\n    function playAudio(ideogram) {\\n        document.querySelector(`#${ideogram.replace(/\\\\s/g, '')}`).play()\\n    }\\n    function getFrenchSeason(season) {\\n        switch (season) {\\n            case '春季':\\n                return 'Printemps'\\n            case '夏季':\\n                return 'Été'\\n            case '秋季':\\n                return 'Automne'\\n            case '冬季':\\n                return 'Hivers'\\n        }\\n    }\\n</script>\\n\\n<svelte:head>\\n    <title>Fiche de thé</title>\\n</svelte:head>\\n\\n{#if tea.pinyin}\\n    <h1>\\n        <div class=\\\"ideogram-pinyin\\\">\\n            <audio id=\\\"{tea.ideogram}\\\">\\n                <source\\n                    src=\\\"assets/audio/{tea.ideogram}.mp3\\\"\\n                    type=\\\"audio/mpeg\\\"\\n                />\\n            </audio>\\n            <span\\n                class=\\\"pinyin voice\\\"\\n                title=\\\"voix\\\"\\n                on:click=\\\"{playAudio(tea.ideogram)}\\\"\\n            >\\n                {tea.pinyin}\\n            </span>\\n            <span\\n                class=\\\"ideogram voice\\\"\\n                title=\\\"voix\\\"\\n                on:click=\\\"{playAudio(tea.ideogram)}\\\"\\n            >\\n                {tea.ideogram}\\n            </span>\\n        </div>\\n    </h1>\\n    <div class=\\\"wrapper\\\">\\n        <div class=\\\"box photo-zoom\\\" tabindex=\\\"0\\\">\\n            <div class=\\\"zoom\\\">&nbsp;</div>\\n            <img\\n                src=\\\"/assets/thes/{tea.ideogram}.jpg\\\"\\n                alt=\\\"{tea.ideogram}\\\"\\n                title=\\\"{tea.ideogram}\\\"\\n                class=\\\"photo\\\"\\n            />\\n        </div>\\n        <div class=\\\"box\\\">\\n            <IconTeaType\\n                ideogram=\\\"{tea.type}\\\"\\n                pinyin=\\\"{getPinyin(tea.type, i18n)}\\\"\\n            />\\n            <dl>\\n                {#if tea.families.length}\\n                    <dt class=\\\"property-title\\\">Famille :</dt>\\n                    <dd class=\\\"property-value\\\">\\n                        <ul class=\\\"ideogram-pinyin\\\">\\n                            {#each tea.families as family}\\n                                <li class=\\\"pinyin\\\">\\n                                    <audio id=\\\"{family}\\\">\\n                                        <source\\n                                            src=\\\"assets/audio/{family}.mp3\\\"\\n                                            type=\\\"audio/mpeg\\\"\\n                                        />\\n                                    </audio>\\n                                    <span\\n                                        class=\\\"pinyin voice\\\"\\n                                        title=\\\"voix\\\"\\n                                        on:click=\\\"{playAudio(family)}\\\"\\n                                    >\\n                                        {getPinyin(family, i18n)}\\n                                    </span>\\n                                    <p\\n                                        class=\\\"voice\\\"\\n                                        title=\\\"voix\\\"\\n                                        on:click=\\\"{playAudio(family)}\\\"\\n                                    >\\n                                        {family}\\n                                    </p>\\n                                </li>\\n                            {/each}\\n                        </ul>\\n                    </dd>\\n                {/if}\\n                {#if tea.oxidations.length}\\n                    <dt class=\\\"property-title\\\">Oxydation :</dt>\\n                    <dd class=\\\"property-value\\\">\\n                        {display.oxidations(tea.oxidations)}\\n                    </dd>\\n                {/if}\\n                {#if tea.elevations.length}\\n                    <dd class=\\\"property-icon\\\">\\n                        <img\\n                            class=\\\"icons mountain\\\"\\n                            src=\\\"/assets/icons/mountain.svg\\\"\\n                            alt=\\\"altitude\\\"\\n                        />\\n                        {display.elevations(tea.elevations)}\\n                    </dd>\\n                {/if}\\n                {#if tea.harvests.length}\\n                    <dt class=\\\"property-title\\\">\\n                        {#if tea.harvests.length > 1}Saisons{:else}Saison{/if}\\n                        de récolte :\\n                    </dt>\\n                    <dd class=\\\"property-value\\\">\\n                        {#each tea.harvests as season}\\n                            <img\\n                                class=\\\"icons\\\"\\n                                src=\\\"/assets/icons/{season}.svg\\\"\\n                                alt=\\\"{season}\\\"\\n                                title=\\\"{getFrenchSeason(season)}\\\"\\n                            />\\n                        {/each}\\n                    </dd>\\n                {/if}\\n                {#if tea.pickings.length}\\n                    <dt class=\\\"property-title\\\">Cueillette :</dt>\\n                    <dd class=\\\"property-value\\\">\\n                        <ul class=\\\"ideogram-pinyin\\\">\\n                            {#each tea.pickings as pick}\\n                                <li class=\\\"pinyin\\\">\\n                                    <audio id=\\\"{pick.replace(/\\\\s/g, '')}\\\">\\n                                        <source\\n                                            src=\\\"assets/audio/{pick}.mp3\\\"\\n                                            type=\\\"audio/mpeg\\\"\\n                                        />\\n                                    </audio>\\n                                    <span\\n                                        class=\\\"voice\\\"\\n                                        title=\\\"voix\\\"\\n                                        on:click=\\\"{playAudio(pick)}\\\"\\n                                    >\\n                                        {getPinyin(pick, i18n)}\\n                                    </span>\\n                                    <p\\n                                        class=\\\"ideogram voice\\\"\\n                                        title=\\\"voix\\\"\\n                                        on:click=\\\"{playAudio(pick)}\\\"\\n                                    >\\n                                        {pick}\\n                                    </p>\\n                                </li>\\n                            {/each}\\n                        </ul>\\n                    </dd>\\n                {/if}\\n            </dl>\\n        </div>\\n        <div class=\\\"box\\\">\\n            {#if tea.provinces.length}\\n                <dt class=\\\"property-title\\\">Provinces :</dt>\\n                <dd class=\\\"property-value\\\">\\n                    <ul class=\\\"ideogram-pinyin\\\">\\n                        {#each tea.provinces as provinces}\\n                            <li class=\\\"pinyin\\\">\\n                                <a\\n                                    href=\\\"https://map.baidu.com/search/?querytype=s&wd={provinces}\\\"\\n                                    target=\\\"_blank\\\"\\n                                >\\n                                    <audio id=\\\"{provinces}\\\">\\n                                        <source\\n                                            src=\\\"assets/audio/{provinces}.mp3\\\"\\n                                            type=\\\"audio/mpeg\\\"\\n                                        />\\n                                    </audio>\\n                                    <span\\n                                        class=\\\"voice\\\"\\n                                        title=\\\"voix\\\"\\n                                        on:click=\\\"{playAudio(provinces)}\\\"\\n                                    >\\n                                        {getPinyin(provinces, i18n)}\\n                                    </span>\\n                                </a>\\n                                <p\\n                                    class=\\\"ideogram voice\\\"\\n                                    title=\\\"voix\\\"\\n                                    on:click=\\\"{playAudio(provinces)}\\\"\\n                                >\\n                                    {provinces}\\n                                </p>\\n\\n                            </li>\\n                        {/each}\\n                    </ul>\\n                </dd>\\n            {/if}\\n            {#if tea.towns.length}\\n                <dt class=\\\"property-title\\\">Villes :</dt>\\n                <dd class=\\\"property-value\\\">\\n                    <ul class=\\\"ideogram-pinyin\\\">\\n                        {#each tea.towns as towns}\\n                            <li class=\\\"pinyin\\\">\\n                                <a\\n                                    href=\\\"https://map.baidu.com/search/?querytype=s&wd={towns}\\\"\\n                                    target=\\\"_blank\\\"\\n                                >\\n                                    <audio id=\\\"{towns}\\\">\\n                                        <source\\n                                            src=\\\"assets/audio/{towns}.mp3\\\"\\n                                            type=\\\"audio/mpeg\\\"\\n                                        />\\n                                    </audio>\\n                                    <span\\n                                        class=\\\"voice\\\"\\n                                        title=\\\"voix\\\"\\n                                        on:click=\\\"{playAudio(towns)}\\\"\\n                                    >\\n                                        {getPinyin(towns, i18n)}\\n                                    </span>\\n                                </a>\\n                                <p\\n                                    class=\\\"ideogram voice\\\"\\n                                    title=\\\"voix\\\"\\n                                    on:click=\\\"{playAudio(towns)}\\\"\\n                                >\\n                                    {towns}\\n                                </p>\\n                            </li>\\n                        {/each}\\n                    </ul>\\n                </dd>\\n            {/if}\\n            {#if tea.cultivars.length}\\n                <dt class=\\\"property-title\\\">Cultivars :</dt>\\n                <dd class=\\\"property-value\\\">\\n                    <ul class=\\\"ideogram-pinyin\\\">\\n                        {#each tea.cultivars as cultivars}\\n                            <li class=\\\"pinyin\\\">\\n                                <audio id=\\\"{cultivars}\\\">\\n                                    <source\\n                                        src=\\\"assets/audio/{cultivars}.mp3\\\"\\n                                        type=\\\"audio/mpeg\\\"\\n                                    />\\n                                </audio>\\n                                <span\\n                                    class=\\\"voice\\\"\\n                                    title=\\\"voix\\\"\\n                                    on:click=\\\"{playAudio(cultivars)}\\\"\\n                                >\\n                                    {getPinyin(cultivars, i18n)}\\n                                </span>\\n                                <p\\n                                    class=\\\"ideogram voice\\\"\\n                                    title=\\\"voix\\\"\\n                                    on:click=\\\"{playAudio(cultivars)}\\\"\\n                                >\\n                                    {cultivars}\\n                                </p>\\n                            </li>\\n                        {/each}\\n                    </ul>\\n                </dd>\\n            {/if}\\n        </div>\\n        <div class=\\\"box\\\"></div>\\n    </div>\\n    <section class=\\\"brew\\\">\\n        <h3>Conseils d'infusion</h3>\\n        <div class=\\\"row\\\">\\n            {#if Array.isArray(tea.brews)}\\n                {#each tea.brews as brew}\\n                    <Brews {brew} />\\n                {/each}\\n            {/if}\\n        </div>\\n    </section>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AACI,QAAQ,0CAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CACpC,QAAQ,CAAE,GAAG,CACb,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,AACpB,CAAC,AAED,KAAK,0CAAC,CAAC,AACH,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC9B,CAAC,AAED,IAAI,0CAAC,CAAC,AACF,KAAK,CAAE,IAAI,CACX,YAAY,CAAE,GAAG,AACrB,CAAC,AAED,WAAW,0CAAC,CAAC,AACT,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,MAAM,CAChB,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAC1D,eAAe,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACvD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAClD,MAAM,CAAE,eAAe,CACvB,MAAM,CAAE,YAAY,CACpB,MAAM,CAAE,OAAO,AACnB,CAAC,AAED,uCAAW,CAAC,GAAG,4BAAC,CAAC,AACb,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,GAAG,CAAC,GAAG,CACzB,UAAU,CAAE,SAAS,CAAC,EAAE,CAAC,CAAC,MAAM,CAAC,IAAI,CAAC,QAAQ,AAClD,CAAC,AAED,uCAAW,MAAM,CAAC,GAAG,4BAAC,CAAC,AACnB,SAAS,CAAE,MAAM,CAAC,CAAC,AACvB,CAAC,AAED,KAAK,0CAAC,CAAC,AACH,UAAU,CAAE,IAAI,yBAAyB,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC,SAAS,CAClE,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,KAAK,CACV,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,GAAG,AACd,CAAC,AAED,eAAe,0CAAC,CAAC,AACb,UAAU,CAAE,KAAK,CACjB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,cAAc,0CAAC,CAAC,AACZ,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,GAAG,CACf,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,KAAK,AACtB,CAAC,AAED,2CAAe,CAAG,EAAE,4BAAC,CAAC,AAClB,MAAM,CAAE,CAAC,AACb,CAAC,AACD,yDAAe,CACf,6BAAe,CAAG,gBAAE,CAAG,EAAE,cAAC,CAAC,AACvB,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,KAAK,AACpB,CAAC,AACD,MAAM,0CAAC,CAAC,AACJ,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,GAAG,AACd,CAAC,AACD,gBAAgB,0CAAC,CAAC,AACd,OAAO,CAAE,YAAY,AACzB,CAAC,AACD,SAAS,0CAAC,CAAC,AACP,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,MAAM,AACvB,CAAC,AACD,8BAAE,CAAC,IAAI,4BAAC,CAAC,AACL,OAAO,CAAE,KAAK,AAClB,CAAC,AAED,CAAC,0CAAC,CAAC,AACC,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AACD,OAAO,0CAAC,CAAC,AACL,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,KAAK,AACpB,CAAC,AACD,SAAS,0CAAC,CAAC,AACP,cAAc,CAAE,GAAG,AACvB,CAAC,AACD,MAAM,0CAAC,CAAC,AACJ,MAAM,CAAE,OAAO,AACnB,CAAC\"}"
};

function preload$4(page) {
	return { pinyin: page.params.pinyin };
}

function getPinyin$3(text, i18n) {
	const term = i18n.filter(term => term.ideogram === text)[0] || {};
	return "pinyin" in term ? term.pinyin : "-";
}

function getFrenchSeason(season) {
	switch (season) {
		case "春季":
			return "Printemps";
		case "夏季":
			return "Été";
		case "秋季":
			return "Automne";
		case "冬季":
			return "Hivers";
	}
}

const Fiche_u5Bpinyinu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { pinyin } = $$props;
	let tea = {};
	let i18n = [];

	onMount(async () => {
		const res0 = await fetch(`https://api-tea.brutdethé.fr/api/v1/teas`);

		if (res0.ok) {
			const teas = (await res0.json()).api;
			tea = teas.filter(tea => pinyin === normalize(tea.pinyin))[0];

			if (!tea) {
				// 404
				throw new Error("no tea found");
			}
		} else {
			// 404
			throw new Error(text);
		}

		const res1 = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`);

		if (res1.ok) {
			i18n = (await res1.json()).api;
		} else {
			// 404
			throw new Error(text);
		}
	});

	const display = {
		elevations: elevations => {
			if (+elevations) {
				return `à partir de ${elevations} mètres`;
			} else if (elevations.length == 2 && Array.isArray([elevations])) {
				return `${elevations[0]} à ${elevations[1]} mètres`;
			}
		},
		oxidations: oxidations => {
			if (+oxidations) {
				return `à partir de ${oxidations}%`;
			} else if (oxidations.length == 2 && Array.isArray(oxidations)) {
				return `entre ${oxidations[0]}% et ${oxidations[1]}%`;
			}
		}
	};

	if ($$props.pinyin === void 0 && $$bindings.pinyin && pinyin !== void 0) $$bindings.pinyin(pinyin);
	$$result.css.add(css$6);

	return `${($$result.head += `${($$result.title = `<title>Fiche de thé</title>`, "")}`, "")}

${tea.pinyin
	? `<h1 class="${"svelte-t92v86"}"><div class="${"ideogram-pinyin svelte-t92v86"}"><audio${add_attribute("id", tea.ideogram, 0)}><source src="${"assets/audio/" + escape(tea.ideogram) + ".mp3"}" type="${"audio/mpeg"}"></audio>
            <span class="${"pinyin voice svelte-t92v86"}" title="${"voix"}">${escape(tea.pinyin)}</span>
            <span class="${"ideogram voice svelte-t92v86"}" title="${"voix"}">${escape(tea.ideogram)}</span></div></h1>
    <div class="${"wrapper svelte-t92v86"}"><div class="${"box photo-zoom svelte-t92v86"}" tabindex="${"0"}"><div class="${"zoom svelte-t92v86"}"> </div>
            <img src="${"/assets/thes/" + escape(tea.ideogram) + ".jpg"}"${add_attribute("alt", tea.ideogram, 0)}${add_attribute("title", tea.ideogram, 0)} class="${"photo svelte-t92v86"}"></div>
        <div class="${"box svelte-t92v86"}">${validate_component(IconTeaType, "IconTeaType").$$render(
			$$result,
			{
				ideogram: tea.type,
				pinyin: getPinyin$3(tea.type, i18n)
			},
			{},
			{}
		)}
            <dl>${tea.families.length
		? `<dt class="${"property-title svelte-t92v86"}">Famille :</dt>
                    <dd class="${"property-value svelte-t92v86"}"><ul class="${"ideogram-pinyin svelte-t92v86"}">${each(tea.families, family => `<li class="${"pinyin svelte-t92v86"}"><audio${add_attribute("id", family, 0)}><source src="${"assets/audio/" + escape(family) + ".mp3"}" type="${"audio/mpeg"}"></audio>
                                    <span class="${"pinyin voice svelte-t92v86"}" title="${"voix"}">${escape(getPinyin$3(family, i18n))}</span>
                                    <p class="${"voice svelte-t92v86"}" title="${"voix"}">${escape(family)}</p>
                                </li>`)}</ul></dd>`
		: ``}${tea.oxidations.length
		? `<dt class="${"property-title svelte-t92v86"}">Oxydation :</dt>
                    <dd class="${"property-value svelte-t92v86"}">${escape(display.oxidations(tea.oxidations))}</dd>`
		: ``}${tea.elevations.length
		? `<dd class="${"property-icon svelte-t92v86"}"><img class="${"icons mountain svelte-t92v86"}" src="${"/assets/icons/mountain.svg"}" alt="${"altitude"}">
                        ${escape(display.elevations(tea.elevations))}</dd>`
		: ``}${tea.harvests.length
		? `<dt class="${"property-title svelte-t92v86"}">${tea.harvests.length > 1 ? `Saisons` : `Saison`}
                        de récolte :
                    </dt>
                    <dd class="${"property-value svelte-t92v86"}">${each(tea.harvests, season => `<img class="${"icons svelte-t92v86"}" src="${"/assets/icons/" + escape(season) + ".svg"}"${add_attribute("alt", season, 0)}${add_attribute("title", getFrenchSeason(season), 0)}>`)}</dd>`
		: ``}${tea.pickings.length
		? `<dt class="${"property-title svelte-t92v86"}">Cueillette :</dt>
                    <dd class="${"property-value svelte-t92v86"}"><ul class="${"ideogram-pinyin svelte-t92v86"}">${each(tea.pickings, pick => `<li class="${"pinyin svelte-t92v86"}"><audio${add_attribute("id", pick.replace(/\s/g, ""), 0)}><source src="${"assets/audio/" + escape(pick) + ".mp3"}" type="${"audio/mpeg"}"></audio>
                                    <span class="${"voice svelte-t92v86"}" title="${"voix"}">${escape(getPinyin$3(pick, i18n))}</span>
                                    <p class="${"ideogram voice svelte-t92v86"}" title="${"voix"}">${escape(pick)}</p>
                                </li>`)}</ul></dd>`
		: ``}</dl></div>
        <div class="${"box svelte-t92v86"}">${tea.provinces.length
		? `<dt class="${"property-title svelte-t92v86"}">Provinces :</dt>
                <dd class="${"property-value svelte-t92v86"}"><ul class="${"ideogram-pinyin svelte-t92v86"}">${each(tea.provinces, provinces => `<li class="${"pinyin svelte-t92v86"}"><a href="${"https://map.baidu.com/search/?querytype=s&wd=" + escape(provinces)}" target="${"_blank"}"><audio${add_attribute("id", provinces, 0)}><source src="${"assets/audio/" + escape(provinces) + ".mp3"}" type="${"audio/mpeg"}"></audio>
                                    <span class="${"voice svelte-t92v86"}" title="${"voix"}">${escape(getPinyin$3(provinces, i18n))}
                                    </span></a>
                                <p class="${"ideogram voice svelte-t92v86"}" title="${"voix"}">${escape(provinces)}</p>

                            </li>`)}</ul></dd>`
		: ``}
            ${tea.towns.length
		? `<dt class="${"property-title svelte-t92v86"}">Villes :</dt>
                <dd class="${"property-value svelte-t92v86"}"><ul class="${"ideogram-pinyin svelte-t92v86"}">${each(tea.towns, towns => `<li class="${"pinyin svelte-t92v86"}"><a href="${"https://map.baidu.com/search/?querytype=s&wd=" + escape(towns)}" target="${"_blank"}"><audio${add_attribute("id", towns, 0)}><source src="${"assets/audio/" + escape(towns) + ".mp3"}" type="${"audio/mpeg"}"></audio>
                                    <span class="${"voice svelte-t92v86"}" title="${"voix"}">${escape(getPinyin$3(towns, i18n))}
                                    </span></a>
                                <p class="${"ideogram voice svelte-t92v86"}" title="${"voix"}">${escape(towns)}</p>
                            </li>`)}</ul></dd>`
		: ``}
            ${tea.cultivars.length
		? `<dt class="${"property-title svelte-t92v86"}">Cultivars :</dt>
                <dd class="${"property-value svelte-t92v86"}"><ul class="${"ideogram-pinyin svelte-t92v86"}">${each(tea.cultivars, cultivars => `<li class="${"pinyin svelte-t92v86"}"><audio${add_attribute("id", cultivars, 0)}><source src="${"assets/audio/" + escape(cultivars) + ".mp3"}" type="${"audio/mpeg"}"></audio>
                                <span class="${"voice svelte-t92v86"}" title="${"voix"}">${escape(getPinyin$3(cultivars, i18n))}</span>
                                <p class="${"ideogram voice svelte-t92v86"}" title="${"voix"}">${escape(cultivars)}</p>
                            </li>`)}</ul></dd>`
		: ``}</div>
        <div class="${"box svelte-t92v86"}"></div></div>
    <section class="${"brew svelte-t92v86"}"><h3>Conseils d&#39;infusion</h3>
        <div class="${"row"}">${Array.isArray(tea.brews)
		? `${each(tea.brews, brew => `${validate_component(Brews, "Brews").$$render($$result, { brew }, {}, {})}`)}`
		: ``}</div></section>`
	: ``}`;
});

/* src/routes/termes.svelte generated by Svelte v3.21.0 */

const css$7 = {
	code: "h3.svelte-7fp5cq{text-align:left;margin-top:2em}.pinyin.svelte-7fp5cq{display:block;font-size:0.7em;color:#999}.voice.svelte-7fp5cq{cursor:pointer}",
	map: "{\"version\":3,\"file\":\"termes.svelte\",\"sources\":[\"termes.svelte\"],\"sourcesContent\":[\"<style>\\n    h3 {\\n        text-align: left;\\n        margin-top: 2em;\\n    }\\n    .pinyin {\\n        display: block;\\n        font-size: 0.7em;\\n        color: #999;\\n    }\\n    .voice {\\n        cursor: pointer;\\n    }\\n</style>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n\\n    let terms = []\\n    let themes = []\\n\\n    onMount(async () => {\\n        const res = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`)\\n\\n        if (res.ok) {\\n            terms = (await res.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n\\n        const res1 = await fetch(`https://api-tea.brutdethé.fr/api/v1/themes`)\\n\\n        if (res1.ok) {\\n            themes = (await res1.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n\\n    function getPinyinByThemes(pinyins, theme) {\\n        return pinyins.filter(pinyin => pinyin.theme === theme.en)\\n    }\\n\\n    function playAudio(ideogram) {\\n        document.querySelector(`#${ideogram.replace(/\\\\s/g, '')}`).play()\\n    }\\n</script>\\n\\n<h1>Termes utilisés</h1>\\n\\n<p>\\n    Cette page présente une liste des termes en chinois traditionnel employés\\n    sur le site avec leurs traduction en\\n    <em>pinyin</em>\\n</p>\\n{#each themes as theme}\\n    <h3>\\n        <audio id=\\\"{theme.ideogram}\\\">\\n            <source src=\\\"assets/audio/{theme.ideogram}.mp3\\\" type=\\\"audio/mpeg\\\" />\\n        </audio>\\n        <span class=\\\"voice\\\" title=\\\"voix\\\" on:click=\\\"{playAudio(theme.ideogram)}\\\">\\n            {theme.ideogram}\\n        </span>\\n        <span\\n            class=\\\"pinyin voice\\\"\\n            title=\\\"voix\\\"\\n            on:click=\\\"{playAudio(theme.ideogram)}\\\"\\n        >\\n            {theme.pinyin}\\n        </span>\\n    </h3>\\n    <div class=\\\"row\\\">\\n        <table class=\\\"column column-66\\\">\\n            <thead>\\n                <tr>\\n                    <td>Chinois traditionnel</td>\\n                    <td>Pinyin</td>\\n                </tr>\\n            </thead>\\n            {#each getPinyinByThemes(terms, theme) as term}\\n                <tr>\\n                    <td>\\n                        <audio id=\\\"{term.ideogram.replace(/\\\\s/g, '')}\\\">\\n                            <source\\n                                src=\\\"assets/audio/{term.ideogram}.mp3\\\"\\n                                type=\\\"audio/mpeg\\\"\\n                            />\\n                        </audio>\\n                        <span\\n                            class=\\\"voice\\\"\\n                            title=\\\"voix\\\"\\n                            on:click=\\\"{playAudio(term.ideogram)}\\\"\\n                        >\\n                            {term.ideogram}\\n                        </span>\\n                    </td>\\n                    <td>\\n                        <span\\n                            class=\\\"voice\\\"\\n                            title=\\\"voix\\\"\\n                            on:click=\\\"{playAudio(term.ideogram)}\\\"\\n                        >\\n                            {term.pinyin}\\n                        </span>\\n                    </td>\\n                </tr>\\n            {:else}\\n                <p>chargement des termes...</p>\\n            {/each}\\n        </table>\\n    </div>\\n{:else}\\n    <p>chargement des thèmes...</p>\\n{/each}\\n\"],\"names\":[],\"mappings\":\"AACI,EAAE,cAAC,CAAC,AACA,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,GAAG,AACnB,CAAC,AACD,OAAO,cAAC,CAAC,AACL,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,AACf,CAAC,AACD,MAAM,cAAC,CAAC,AACJ,MAAM,CAAE,OAAO,AACnB,CAAC\"}"
};

function getPinyinByThemes(pinyins, theme) {
	return pinyins.filter(pinyin => pinyin.theme === theme.en);
}

const Termes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let terms = [];
	let themes = [];

	onMount(async () => {
		const res = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`);

		if (res.ok) {
			terms = (await res.json()).api;
		} else {
			// 404
			throw new Error(text);
		}

		const res1 = await fetch(`https://api-tea.brutdethé.fr/api/v1/themes`);

		if (res1.ok) {
			themes = (await res1.json()).api;
		} else {
			// 404
			throw new Error(text);
		}
	});

	$$result.css.add(css$7);

	return `<h1>Termes utilisés</h1>

<p>Cette page présente une liste des termes en chinois traditionnel employés
    sur le site avec leurs traduction en
    <em>pinyin</em></p>
${themes.length
	? each(themes, theme => `<h3 class="${"svelte-7fp5cq"}"><audio${add_attribute("id", theme.ideogram, 0)}><source src="${"assets/audio/" + escape(theme.ideogram) + ".mp3"}" type="${"audio/mpeg"}"></audio>
        <span class="${"voice svelte-7fp5cq"}" title="${"voix"}">${escape(theme.ideogram)}</span>
        <span class="${"pinyin voice svelte-7fp5cq"}" title="${"voix"}">${escape(theme.pinyin)}
        </span></h3>
    <div class="${"row"}"><table class="${"column column-66"}"><thead><tr><td>Chinois traditionnel</td>
                    <td>Pinyin</td>
                </tr></thead>
            ${getPinyinByThemes(terms, theme).length
		? each(getPinyinByThemes(terms, theme), term => `<tr><td><audio${add_attribute("id", term.ideogram.replace(/\s/g, ""), 0)}><source src="${"assets/audio/" + escape(term.ideogram) + ".mp3"}" type="${"audio/mpeg"}"></audio>
                        <span class="${"voice svelte-7fp5cq"}" title="${"voix"}">${escape(term.ideogram)}
                        </span></td>
                    <td><span class="${"voice svelte-7fp5cq"}" title="${"voix"}">${escape(term.pinyin)}
                        </span></td>
                </tr>`)
		: `<p>chargement des termes...</p>`}</table>
    </div>`)
	: `<p>chargement des thèmes...</p>`}`;
});

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/* src/routes/_error.svelte generated by Svelte v3.21.0 */

const css$8 = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = undefined === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\th1 {\\n\\t\\t\\tfont-size: 4em;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$8);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-8od9u6"}">${escape(status)}</h1>

<p class="${"svelte-8od9u6"}">${escape(error.message)}</p>

${ ``}`;
});

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.21.0 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;

const stores = {
	page: writable({}),
	preloading: writable(null),
	session: writable(initial_data && initial_data.session)
};

stores.session.subscribe(async value => {

	return;
});

/* node_modules/svelte-select/src/Item.svelte generated by Svelte v3.21.0 */

const css$9 = {
	code: ".item.svelte-bdnybl{cursor:default;height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--itemPadding, 0 20px);color:var(--itemColor, inherit);text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.groupHeader.svelte-bdnybl{text-transform:var(--groupTitleTextTransform, uppercase)}.groupItem.svelte-bdnybl{padding-left:var(--groupItemPaddingLeft, 40px)}.item.svelte-bdnybl:active{background:var(--itemActiveBackground, #b9daff)}.item.active.svelte-bdnybl{background:var(--itemIsActiveBG, #007aff);color:var(--itemIsActiveColor, #fff)}.item.first.svelte-bdnybl{border-radius:var(--itemFirstBorderRadius, 4px 4px 0 0)}.item.hover.svelte-bdnybl:not(.active){background:var(--itemHoverBG, #e7f2ff)}",
	map: "{\"version\":3,\"file\":\"Item.svelte\",\"sources\":[\"Item.svelte\"],\"sourcesContent\":[\"<script>\\n  export let isActive = false;\\n  export let isFirst = false;\\n  export let isHover = false;\\n  export let getOptionLabel = undefined;\\n  export let item = undefined;\\n  export let filterText = '';\\n\\n  let itemClasses = '';\\n\\n  $: {\\n    const classes = [];\\n    if (isActive) { classes.push('active'); }\\n    if (isFirst) { classes.push('first'); }\\n    if (isHover) { classes.push('hover'); }\\n    if (item.isGroupHeader) { classes.push('groupHeader'); }\\n    if (item.isGroupItem) { classes.push('groupItem'); }\\n    itemClasses = classes.join(' ');\\n  }\\n</script>\\n\\n<style>\\n  .item {\\n    cursor: default;\\n    height: var(--height, 42px);\\n    line-height: var(--height, 42px);\\n    padding: var(--itemPadding, 0 20px);\\n    color: var(--itemColor, inherit);\\n    text-overflow: ellipsis;\\n    overflow: hidden;\\n    white-space: nowrap;\\n  }\\n\\n  .groupHeader {\\n    text-transform: var(--groupTitleTextTransform, uppercase);\\n  }\\n\\n  .groupItem {\\n    padding-left: var(--groupItemPaddingLeft, 40px);\\n  }\\n\\n  .item:active {\\n    background: var(--itemActiveBackground, #b9daff);\\n  }\\n\\n  .item.active {\\n    background: var(--itemIsActiveBG, #007aff);\\n    color: var(--itemIsActiveColor, #fff);\\n  }\\n\\n  .item.first {\\n    border-radius: var(--itemFirstBorderRadius, 4px 4px 0 0);\\n  }\\n\\n  .item.hover:not(.active) {\\n    background: var(--itemHoverBG, #e7f2ff);\\n  }\\n</style>\\n\\n\\n\\n<div class=\\\"item {itemClasses}\\\">\\n  {@html getOptionLabel(item, filterText)}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AAsBE,KAAK,cAAC,CAAC,AACL,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAC3B,WAAW,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAChC,OAAO,CAAE,IAAI,aAAa,CAAC,OAAO,CAAC,CACnC,KAAK,CAAE,IAAI,WAAW,CAAC,QAAQ,CAAC,CAChC,aAAa,CAAE,QAAQ,CACvB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,AACrB,CAAC,AAED,YAAY,cAAC,CAAC,AACZ,cAAc,CAAE,IAAI,yBAAyB,CAAC,UAAU,CAAC,AAC3D,CAAC,AAED,UAAU,cAAC,CAAC,AACV,YAAY,CAAE,IAAI,sBAAsB,CAAC,KAAK,CAAC,AACjD,CAAC,AAED,mBAAK,OAAO,AAAC,CAAC,AACZ,UAAU,CAAE,IAAI,sBAAsB,CAAC,QAAQ,CAAC,AAClD,CAAC,AAED,KAAK,OAAO,cAAC,CAAC,AACZ,UAAU,CAAE,IAAI,gBAAgB,CAAC,QAAQ,CAAC,CAC1C,KAAK,CAAE,IAAI,mBAAmB,CAAC,KAAK,CAAC,AACvC,CAAC,AAED,KAAK,MAAM,cAAC,CAAC,AACX,aAAa,CAAE,IAAI,uBAAuB,CAAC,YAAY,CAAC,AAC1D,CAAC,AAED,KAAK,oBAAM,KAAK,OAAO,CAAC,AAAC,CAAC,AACxB,UAAU,CAAE,IAAI,aAAa,CAAC,QAAQ,CAAC,AACzC,CAAC\"}"
};

const Item = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { isActive = false } = $$props;
	let { isFirst = false } = $$props;
	let { isHover = false } = $$props;
	let { getOptionLabel = undefined } = $$props;
	let { item = undefined } = $$props;
	let { filterText = "" } = $$props;
	let itemClasses = "";
	if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0) $$bindings.isActive(isActive);
	if ($$props.isFirst === void 0 && $$bindings.isFirst && isFirst !== void 0) $$bindings.isFirst(isFirst);
	if ($$props.isHover === void 0 && $$bindings.isHover && isHover !== void 0) $$bindings.isHover(isHover);
	if ($$props.getOptionLabel === void 0 && $$bindings.getOptionLabel && getOptionLabel !== void 0) $$bindings.getOptionLabel(getOptionLabel);
	if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
	if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0) $$bindings.filterText(filterText);
	$$result.css.add(css$9);

	 {
		{
			const classes = [];

			if (isActive) {
				classes.push("active");
			}

			if (isFirst) {
				classes.push("first");
			}

			if (isHover) {
				classes.push("hover");
			}

			if (item.isGroupHeader) {
				classes.push("groupHeader");
			}

			if (item.isGroupItem) {
				classes.push("groupItem");
			}

			itemClasses = classes.join(" ");
		}
	}

	return `<div class="${"item " + escape(itemClasses) + " svelte-bdnybl"}">${getOptionLabel(item, filterText)}</div>`;
});

/* node_modules/svelte-select/src/VirtualList.svelte generated by Svelte v3.21.0 */

const css$a = {
	code: "svelte-virtual-list-viewport.svelte-p6ehlv{position:relative;overflow-y:auto;-webkit-overflow-scrolling:touch;display:block}svelte-virtual-list-contents.svelte-p6ehlv,svelte-virtual-list-row.svelte-p6ehlv{display:block}svelte-virtual-list-row.svelte-p6ehlv{overflow:hidden}",
	map: "{\"version\":3,\"file\":\"VirtualList.svelte\",\"sources\":[\"VirtualList.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { onMount, tick } from 'svelte';\\n\\n\\t// props\\n\\texport let items = undefined;\\n\\texport let height = '100%';\\n\\texport let itemHeight = 40;\\n\\texport let hoverItemIndex = 0;\\n\\n\\t// read-only, but visible to consumers via bind:start\\n\\texport let start = 0;\\n\\texport let end = 0;\\n\\n\\t// local state\\n\\tlet height_map = [];\\n\\tlet rows;\\n\\tlet viewport;\\n\\tlet contents;\\n\\tlet viewport_height = 0;\\n\\tlet visible;\\n\\tlet mounted;\\n\\n\\tlet top = 0;\\n\\tlet bottom = 0;\\n\\tlet average_height;\\n\\n\\t$: visible = items.slice(start, end).map((data, i) => {\\n\\t\\treturn { index: i + start, data };\\n\\t});\\n\\n\\t// whenever `items` changes, invalidate the current heightmap\\n\\t$: if (mounted) refresh(items, viewport_height, itemHeight);\\n\\n\\tasync function refresh(items, viewport_height, itemHeight) {\\n\\t\\tconst { scrollTop } = viewport;\\n\\n\\t\\tawait tick(); // wait until the DOM is up to date\\n\\n\\t\\tlet content_height = top - scrollTop;\\n\\t\\tlet i = start;\\n\\n\\t\\twhile (content_height < viewport_height && i < items.length) {\\n\\t\\t\\tlet row = rows[i - start];\\n\\n\\t\\t\\tif (!row) {\\n\\t\\t\\t\\tend = i + 1;\\n\\t\\t\\t\\tawait tick(); // render the newly visible row\\n\\t\\t\\t\\trow = rows[i - start];\\n\\t\\t\\t}\\n\\n\\t\\t\\tconst row_height = height_map[i] = itemHeight || row.offsetHeight;\\n\\t\\t\\tcontent_height += row_height;\\n\\t\\t\\ti += 1;\\n\\t\\t}\\n\\n\\t\\tend = i;\\n\\n\\t\\tconst remaining = items.length - end;\\n\\t\\taverage_height = (top + content_height) / end;\\n\\n\\t\\tbottom = remaining * average_height;\\n\\t\\theight_map.length = items.length;\\n\\n\\t\\tviewport.scrollTop = 0;\\n\\t}\\n\\n\\tasync function handle_scroll() {\\n\\t\\tconst { scrollTop } = viewport;\\n\\n\\t\\tconst old_start = start;\\n\\n\\t\\tfor (let v = 0; v < rows.length; v += 1) {\\n\\t\\t\\theight_map[start + v] = itemHeight || rows[v].offsetHeight;\\n\\t\\t}\\n\\n\\t\\tlet i = 0;\\n\\t\\tlet y = 0;\\n\\n\\t\\twhile (i < items.length) {\\n\\t\\t\\tconst row_height = height_map[i] || average_height;\\n\\t\\t\\tif (y + row_height > scrollTop) {\\n\\t\\t\\t\\tstart = i;\\n\\t\\t\\t\\ttop = y;\\n\\n\\t\\t\\t\\tbreak;\\n\\t\\t\\t}\\n\\n\\t\\t\\ty += row_height;\\n\\t\\t\\ti += 1;\\n\\t\\t}\\n\\n\\t\\twhile (i < items.length) {\\n\\t\\t\\ty += height_map[i] || average_height;\\n\\t\\t\\ti += 1;\\n\\n\\t\\t\\tif (y > scrollTop + viewport_height) break;\\n\\t\\t}\\n\\n\\t\\tend = i;\\n\\n\\t\\tconst remaining = items.length - end;\\n\\t\\taverage_height = y / end;\\n\\n\\t\\twhile (i < items.length) height_map[i++] = average_height;\\n\\t\\tbottom = remaining * average_height;\\n\\n\\t\\t// prevent jumping if we scrolled up into unknown territory\\n\\t\\tif (start < old_start) {\\n\\t\\t\\tawait tick();\\n\\n\\t\\t\\tlet expected_height = 0;\\n\\t\\t\\tlet actual_height = 0;\\n\\n\\t\\t\\tfor (let i = start; i < old_start; i += 1) {\\n\\t\\t\\t\\tif (rows[i - start]) {\\n\\t\\t\\t\\t\\texpected_height += height_map[i];\\n\\t\\t\\t\\t\\tactual_height += itemHeight || rows[i - start].offsetHeight;\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\n\\t\\t\\tconst d = actual_height - expected_height;\\n\\t\\t\\tviewport.scrollTo(0, scrollTop + d);\\n\\t\\t}\\n\\n\\t\\t// TODO if we overestimated the space these\\n\\t\\t// rows would occupy we may need to add some\\n\\t\\t// more. maybe we can just call handle_scroll again?\\n\\t}\\n\\n\\t// trigger initial refresh\\n\\tonMount(() => {\\n\\t\\trows = contents.getElementsByTagName('svelte-virtual-list-row');\\n\\t\\tmounted = true;\\n\\t});\\n</script>\\n\\n<style>\\n\\tsvelte-virtual-list-viewport {\\n\\t\\tposition: relative;\\n\\t\\toverflow-y: auto;\\n\\t\\t-webkit-overflow-scrolling: touch;\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\tsvelte-virtual-list-contents,\\n\\tsvelte-virtual-list-row {\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\tsvelte-virtual-list-row {\\n\\t\\toverflow: hidden;\\n\\t}\\n</style>\\n\\n<svelte-virtual-list-viewport bind:this={viewport} bind:offsetHeight={viewport_height} on:scroll={handle_scroll}\\n\\tstyle=\\\"height: {height};\\\">\\n\\t<svelte-virtual-list-contents bind:this={contents} style=\\\"padding-top: {top}px; padding-bottom: {bottom}px;\\\">\\n\\t\\t{#each visible as row (row.index)}\\n\\t\\t\\t<svelte-virtual-list-row>\\n\\t\\t\\t\\t<slot item={row.data} i={row.index} {hoverItemIndex}>Missing template</slot>\\n\\t\\t\\t</svelte-virtual-list-row>\\n\\t\\t{/each}\\n\\t</svelte-virtual-list-contents>\\n</svelte-virtual-list-viewport>\"],\"names\":[],\"mappings\":\"AAyIC,4BAA4B,cAAC,CAAC,AAC7B,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,CAChB,0BAA0B,CAAE,KAAK,CACjC,OAAO,CAAE,KAAK,AACf,CAAC,AAED,0CAA4B,CAC5B,uBAAuB,cAAC,CAAC,AACxB,OAAO,CAAE,KAAK,AACf,CAAC,AAED,uBAAuB,cAAC,CAAC,AACxB,QAAQ,CAAE,MAAM,AACjB,CAAC\"}"
};

const VirtualList = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { items = undefined } = $$props;
	let { height = "100%" } = $$props;
	let { itemHeight = 40 } = $$props;
	let { hoverItemIndex = 0 } = $$props;
	let { start = 0 } = $$props;
	let { end = 0 } = $$props;

	// local state
	let height_map = [];

	let rows;
	let viewport;
	let contents;
	let viewport_height = 0;
	let visible;
	let mounted;
	let top = 0;
	let bottom = 0;
	let average_height;

	async function refresh(items, viewport_height, itemHeight) {
		const { scrollTop } = viewport;
		await tick(); // wait until the DOM is up to date
		let content_height = top - scrollTop;
		let i = start;

		while (content_height < viewport_height && i < items.length) {
			let row = rows[i - start];

			if (!row) {
				end = i + 1;
				await tick(); // render the newly visible row
				row = rows[i - start];
			}

			const row_height = height_map[i] = itemHeight || row.offsetHeight;
			content_height += row_height;
			i += 1;
		}

		end = i;
		const remaining = items.length - end;
		average_height = (top + content_height) / end;
		bottom = remaining * average_height;
		height_map.length = items.length;
		viewport.scrollTop = 0;
	}
	// rows would occupy we may need to add some

	// more. maybe we can just call handle_scroll again?
	// trigger initial refresh
	onMount(() => {
		rows = contents.getElementsByTagName("svelte-virtual-list-row");
		mounted = true;
	});

	if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
	if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
	if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0) $$bindings.itemHeight(itemHeight);
	if ($$props.hoverItemIndex === void 0 && $$bindings.hoverItemIndex && hoverItemIndex !== void 0) $$bindings.hoverItemIndex(hoverItemIndex);
	if ($$props.start === void 0 && $$bindings.start && start !== void 0) $$bindings.start(start);
	if ($$props.end === void 0 && $$bindings.end && end !== void 0) $$bindings.end(end);
	$$result.css.add(css$a);

	visible = items.slice(start, end).map((data, i) => {
		return { index: i + start, data };
	});

	 {
		if (mounted) refresh(items, viewport_height, itemHeight);
	}

	return `<svelte-virtual-list-viewport style="${"height: " + escape(height) + ";"}" class="${"svelte-p6ehlv"}"${add_attribute("this", viewport, 1)}><svelte-virtual-list-contents style="${"padding-top: " + escape(top) + "px; padding-bottom: " + escape(bottom) + "px;"}" class="${"svelte-p6ehlv"}"${add_attribute("this", contents, 1)}>${each(visible, row => `<svelte-virtual-list-row class="${"svelte-p6ehlv"}">${$$slots.default
	? $$slots.default({
			item: row.data,
			i: row.index,
			hoverItemIndex
		})
	: `Missing template`}
			</svelte-virtual-list-row>`)}</svelte-virtual-list-contents></svelte-virtual-list-viewport>`;
});

/* node_modules/svelte-select/src/List.svelte generated by Svelte v3.21.0 */

const css$b = {
	code: ".listContainer.svelte-ux0sbr{box-shadow:var(--listShadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));border-radius:var(--listBorderRadius, 4px);max-height:var(--listMaxHeight, 250px);overflow-y:auto;background:var(--listBackground, #fff)}.virtualList.svelte-ux0sbr{height:var(--virtualListHeight, 200px)}.listGroupTitle.svelte-ux0sbr{color:var(--groupTitleColor, #8f8f8f);cursor:default;font-size:var(--groupTitleFontSize, 12px);font-weight:var(--groupTitleFontWeight, 600);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--groupTitlePadding, 0 20px);text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:var(--groupTitleTextTransform, uppercase)}.empty.svelte-ux0sbr{text-align:var(--listEmptyTextAlign, center);padding:var(--listEmptyPadding, 20px 0);color:var(--listEmptyColor, #78848F)}",
	map: "{\"version\":3,\"file\":\"List.svelte\",\"sources\":[\"List.svelte\"],\"sourcesContent\":[\"<script>\\n  import { beforeUpdate, createEventDispatcher, onDestroy, onMount, tick } from 'svelte';\\n\\n  const dispatch = createEventDispatcher();\\n\\n  export let container = undefined;\\n\\n  import ItemComponent from './Item.svelte';\\n  import VirtualList from './VirtualList.svelte';\\n\\n  export let Item = ItemComponent;\\n  export let isVirtualList = false;\\n  export let items = [];\\n  export let getOptionLabel = (option, filterText) => {\\n    if (option) return option.isCreator ? `Create \\\\\\\"${filterText}\\\\\\\"` : option.label;\\n  };\\n  export let getGroupHeaderLabel = (option) => { return option.label };\\n  export let itemHeight = 40;\\n  export let hoverItemIndex = 0;\\n  export let selectedValue = undefined;\\n  export let optionIdentifier = 'value';\\n  export let hideEmptyState = false;\\n  export let noOptionsMessage = 'No options';\\n  export let isMulti = false;\\n  export let activeItemIndex = 0;\\n  export let filterText = '';\\n\\n  let isScrollingTimer = 0;\\n  let isScrolling = false;\\n  let prev_items;\\n  let prev_activeItemIndex;\\n  let prev_selectedValue;\\n\\n  onMount(() => {\\n    if (items.length > 0 && !isMulti && selectedValue) {\\n      const _hoverItemIndex = items.findIndex((item) => item[optionIdentifier] === selectedValue[optionIdentifier]);\\n\\n      if (_hoverItemIndex) {\\n        hoverItemIndex = _hoverItemIndex;\\n      }\\n    }\\n\\n    scrollToActiveItem('active');\\n\\n\\n    container.addEventListener('scroll', () => {\\n      clearTimeout(isScrollingTimer);\\n\\n      isScrollingTimer = setTimeout(() => {\\n        isScrolling = false;\\n      }, 100);\\n    }, false);\\n  });\\n\\n  onDestroy(() => {\\n    // clearTimeout(isScrollingTimer);\\n  });\\n\\n  beforeUpdate(() => {\\n\\n    if (items !== prev_items && items.length > 0) {\\n      hoverItemIndex = 0;\\n    }\\n\\n\\n    // if (prev_activeItemIndex && activeItemIndex > -1) {\\n    //   hoverItemIndex = activeItemIndex;\\n\\n    //   scrollToActiveItem('active');\\n    // }\\n    // if (prev_selectedValue && selectedValue) {\\n    //   scrollToActiveItem('active');\\n\\n    //   if (items && !isMulti) {\\n    //     const hoverItemIndex = items.findIndex((item) => item[optionIdentifier] === selectedValue[optionIdentifier]);\\n\\n    //     if (hoverItemIndex) {\\n    //       hoverItemIndex = hoverItemIndex;\\n    //     }\\n    //   }\\n    // }\\n\\n    prev_items = items;\\n    prev_activeItemIndex = activeItemIndex;\\n    prev_selectedValue = selectedValue;\\n  });\\n\\n  function itemClasses(hoverItemIndex, item, itemIndex, items, selectedValue, optionIdentifier, isMulti) {\\n    return `${selectedValue && !isMulti && (selectedValue[optionIdentifier] === item[optionIdentifier]) ? 'active ' : ''}${hoverItemIndex === itemIndex || items.length === 1 ? 'hover' : ''}`;\\n  }\\n\\n  function handleSelect(item) {\\n    if (item.isCreator) return;\\n    dispatch('itemSelected', item);\\n  }\\n\\n  function handleHover(i) {\\n    if (isScrolling) return;\\n    hoverItemIndex = i;\\n  }\\n\\n  function handleClick(args) {\\n    const { item, i, event } = args;\\n    event.stopPropagation();\\n\\n    if (selectedValue && !isMulti && selectedValue[optionIdentifier] === item[optionIdentifier]) return closeList();\\n\\n    if (item.isCreator) {\\n      dispatch('itemCreated', filterText);\\n    } else {\\n      activeItemIndex = i;\\n      hoverItemIndex = i;\\n      handleSelect(item);\\n    }\\n  }\\n\\n  function closeList() {\\n    dispatch('closeList');\\n  }\\n\\n  async function updateHoverItem(increment) {\\n    if (isVirtualList) return;\\n\\n    let isNonSelectableItem = true;\\n\\n    while (isNonSelectableItem) {\\n      if (increment > 0 && hoverItemIndex === (items.length - 1)) {\\n        hoverItemIndex = 0;\\n      }\\n      else if (increment < 0 && hoverItemIndex === 0) {\\n        hoverItemIndex = items.length - 1;\\n      }\\n      else {\\n        hoverItemIndex = hoverItemIndex + increment;\\n      }\\n\\n      isNonSelectableItem = items[hoverItemIndex].isGroupHeader && !items[hoverItemIndex].isSelectable;\\n    }\\n\\n    await tick();\\n\\n    scrollToActiveItem('hover');\\n  }\\n\\n  function handleKeyDown(e) {\\n    switch (e.key) {\\n      case 'ArrowDown':\\n        e.preventDefault();\\n        items.length && updateHoverItem(1);\\n        break;\\n      case 'ArrowUp':\\n        e.preventDefault();\\n        items.length && updateHoverItem(-1);\\n        break;\\n      case 'Enter':\\n        e.preventDefault();\\n        if (items.length === 0) break;\\n        const hoverItem = items[hoverItemIndex];\\n        if (selectedValue && !isMulti && selectedValue[optionIdentifier] === hoverItem[optionIdentifier]) {\\n          closeList();\\n          break;\\n        }\\n\\n        if (hoverItem.isCreator) {\\n          dispatch('itemCreated', filterText);\\n        } else {\\n          activeItemIndex = hoverItemIndex;\\n          handleSelect(items[hoverItemIndex]);\\n        }\\n        break;\\n      case 'Tab':\\n        e.preventDefault();\\n        if (items.length === 0) break;\\n        if (selectedValue && selectedValue[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return closeList();\\n        activeItemIndex = hoverItemIndex;\\n        handleSelect(items[hoverItemIndex]);\\n        break;\\n    }\\n  }\\n\\n  function scrollToActiveItem(className) {\\n    if (isVirtualList || !container) return;\\n\\n    let offsetBounding;\\n    const focusedElemBounding = container.querySelector(`.listItem .${className}`);\\n\\n    if (focusedElemBounding) {\\n      offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;\\n    }\\n\\n    container.scrollTop -= offsetBounding;\\n  }\\n\\n  function isItemActive(item, selectedValue, optionIdentifier) {\\n    return selectedValue && (selectedValue[optionIdentifier] === item[optionIdentifier]);\\n  };\\n\\n  function isItemFirst(itemIndex) {\\n    return itemIndex === 0;\\n  };\\n\\n  function isItemHover(hoverItemIndex, item, itemIndex, items) {\\n    return hoverItemIndex === itemIndex || items.length === 1;\\n  }\\n\\n</script>\\n\\n<svelte:window on:keydown=\\\"{handleKeyDown}\\\" />\\n\\n{#if isVirtualList}\\n<div class=\\\"listContainer virtualList\\\" bind:this={container}>\\n\\n  <VirtualList {items} {itemHeight} let:item let:i>\\n  \\n    <div on:mouseover=\\\"{() => handleHover(i)}\\\" on:click=\\\"{event => handleClick({item, i, event})}\\\"\\n        class=\\\"listItem\\\">\\n          <svelte:component \\n            this=\\\"{Item}\\\"\\n            {item}\\n            {filterText}\\n            {getOptionLabel}\\n            isFirst=\\\"{isItemFirst(i)}\\\"\\n            isActive=\\\"{isItemActive(item, selectedValue, optionIdentifier)}\\\"\\n            isHover=\\\"{isItemHover(hoverItemIndex, item, i, items)}\\\"\\n          />\\n    </div>\\n  \\n</VirtualList>\\n</div>\\n{/if}\\n\\n{#if !isVirtualList}\\n<div class=\\\"listContainer\\\" bind:this={container}>\\n  {#each items as item, i}\\n    {#if item.isGroupHeader && !item.isSelectable}\\n      <div class=\\\"listGroupTitle\\\">{getGroupHeaderLabel(item)}</div>\\n    { :else }\\n    <div \\n      on:mouseover=\\\"{() => handleHover(i)}\\\" \\n      on:click=\\\"{event => handleClick({item, i, event})}\\\"\\n      class=\\\"listItem\\\"\\n    >\\n      <svelte:component \\n        this=\\\"{Item}\\\"\\n        {item}\\n        {filterText}\\n        {getOptionLabel}\\n        isFirst=\\\"{isItemFirst(i)}\\\"\\n        isActive=\\\"{isItemActive(item, selectedValue, optionIdentifier)}\\\"\\n        isHover=\\\"{isItemHover(hoverItemIndex, item, i, items)}\\\"\\n      />\\n    </div>\\n    {/if}\\n  {:else}\\n    {#if !hideEmptyState}\\n      <div class=\\\"empty\\\">{noOptionsMessage}</div>\\n    {/if}\\n  {/each}\\n</div>\\n{/if}\\n\\n<style>\\n  .listContainer {\\n    box-shadow: var(--listShadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));\\n    border-radius: var(--listBorderRadius, 4px);\\n    max-height: var(--listMaxHeight, 250px);\\n    overflow-y: auto;\\n    background: var(--listBackground, #fff);\\n  }\\n\\n  .virtualList {\\n    height: var(--virtualListHeight, 200px);\\n  }\\n\\n  .listGroupTitle {\\n    color: var(--groupTitleColor, #8f8f8f);\\n    cursor: default;\\n    font-size: var(--groupTitleFontSize, 12px);\\n    font-weight: var(--groupTitleFontWeight, 600);\\n    height: var(--height, 42px);\\n    line-height: var(--height, 42px);\\n    padding: var(--groupTitlePadding, 0 20px);\\n    text-overflow: ellipsis;\\n    overflow-x: hidden;\\n    white-space: nowrap;\\n    text-transform: var(--groupTitleTextTransform, uppercase);\\n  }\\n\\n  .empty {\\n    text-align: var(--listEmptyTextAlign, center);\\n    padding: var(--listEmptyPadding, 20px 0);\\n    color: var(--listEmptyColor, #78848F);\\n  }\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAsQE,cAAc,cAAC,CAAC,AACd,UAAU,CAAE,IAAI,YAAY,CAAC,mCAAmC,CAAC,CACjE,aAAa,CAAE,IAAI,kBAAkB,CAAC,IAAI,CAAC,CAC3C,UAAU,CAAE,IAAI,eAAe,CAAC,MAAM,CAAC,CACvC,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,AACzC,CAAC,AAED,YAAY,cAAC,CAAC,AACZ,MAAM,CAAE,IAAI,mBAAmB,CAAC,MAAM,CAAC,AACzC,CAAC,AAED,eAAe,cAAC,CAAC,AACf,KAAK,CAAE,IAAI,iBAAiB,CAAC,QAAQ,CAAC,CACtC,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,IAAI,oBAAoB,CAAC,KAAK,CAAC,CAC1C,WAAW,CAAE,IAAI,sBAAsB,CAAC,IAAI,CAAC,CAC7C,MAAM,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAC3B,WAAW,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAChC,OAAO,CAAE,IAAI,mBAAmB,CAAC,OAAO,CAAC,CACzC,aAAa,CAAE,QAAQ,CACvB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,IAAI,yBAAyB,CAAC,UAAU,CAAC,AAC3D,CAAC,AAED,MAAM,cAAC,CAAC,AACN,UAAU,CAAE,IAAI,oBAAoB,CAAC,OAAO,CAAC,CAC7C,OAAO,CAAE,IAAI,kBAAkB,CAAC,OAAO,CAAC,CACxC,KAAK,CAAE,IAAI,gBAAgB,CAAC,QAAQ,CAAC,AACvC,CAAC\"}"
};

function isItemActive(item, selectedValue, optionIdentifier) {
	return selectedValue && selectedValue[optionIdentifier] === item[optionIdentifier];
}

function isItemFirst(itemIndex) {
	return itemIndex === 0;
}

function isItemHover(hoverItemIndex, item, itemIndex, items) {
	return hoverItemIndex === itemIndex || items.length === 1;
}

const List = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const dispatch = createEventDispatcher();
	let { container = undefined } = $$props;
	let { Item: Item$1 = Item } = $$props;
	let { isVirtualList = false } = $$props;
	let { items = [] } = $$props;

	let { getOptionLabel = (option, filterText) => {
		if (option) return option.isCreator
		? `Create \"${filterText}\"`
		: option.label;
	} } = $$props;

	let { getGroupHeaderLabel = option => {
		return option.label;
	} } = $$props;

	let { itemHeight = 40 } = $$props;
	let { hoverItemIndex = 0 } = $$props;
	let { selectedValue = undefined } = $$props;
	let { optionIdentifier = "value" } = $$props;
	let { hideEmptyState = false } = $$props;
	let { noOptionsMessage = "No options" } = $$props;
	let { isMulti = false } = $$props;
	let { activeItemIndex = 0 } = $$props;
	let { filterText = "" } = $$props;
	let isScrollingTimer = 0;
	let prev_items;

	onMount(() => {
		if (items.length > 0 && !isMulti && selectedValue) {
			const _hoverItemIndex = items.findIndex(item => item[optionIdentifier] === selectedValue[optionIdentifier]);

			if (_hoverItemIndex) {
				hoverItemIndex = _hoverItemIndex;
			}
		}

		scrollToActiveItem("active");

		container.addEventListener(
			"scroll",
			() => {
				clearTimeout(isScrollingTimer);

				isScrollingTimer = setTimeout(
					() => {
					},
					100
				);
			},
			false
		);
	});

	onDestroy(() => {
		
	}); // clearTimeout(isScrollingTimer);

	beforeUpdate(() => {
		if (items !== prev_items && items.length > 0) {
			hoverItemIndex = 0;
		}

		// if (prev_activeItemIndex && activeItemIndex > -1) {
		//   hoverItemIndex = activeItemIndex;
		//   scrollToActiveItem('active');
		// }
		// if (prev_selectedValue && selectedValue) {
		//   scrollToActiveItem('active');
		//   if (items && !isMulti) {
		//     const hoverItemIndex = items.findIndex((item) => item[optionIdentifier] === selectedValue[optionIdentifier]);
		//     if (hoverItemIndex) {
		//       hoverItemIndex = hoverItemIndex;
		//     }
		//   }
		// }
		prev_items = items;
	});

	function scrollToActiveItem(className) {
		if (isVirtualList || !container) return;
		let offsetBounding;
		const focusedElemBounding = container.querySelector(`.listItem .${className}`);

		if (focusedElemBounding) {
			offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
		}

		container.scrollTop -= offsetBounding;
	}

	
	
	if ($$props.container === void 0 && $$bindings.container && container !== void 0) $$bindings.container(container);
	if ($$props.Item === void 0 && $$bindings.Item && Item$1 !== void 0) $$bindings.Item(Item$1);
	if ($$props.isVirtualList === void 0 && $$bindings.isVirtualList && isVirtualList !== void 0) $$bindings.isVirtualList(isVirtualList);
	if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
	if ($$props.getOptionLabel === void 0 && $$bindings.getOptionLabel && getOptionLabel !== void 0) $$bindings.getOptionLabel(getOptionLabel);
	if ($$props.getGroupHeaderLabel === void 0 && $$bindings.getGroupHeaderLabel && getGroupHeaderLabel !== void 0) $$bindings.getGroupHeaderLabel(getGroupHeaderLabel);
	if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0) $$bindings.itemHeight(itemHeight);
	if ($$props.hoverItemIndex === void 0 && $$bindings.hoverItemIndex && hoverItemIndex !== void 0) $$bindings.hoverItemIndex(hoverItemIndex);
	if ($$props.selectedValue === void 0 && $$bindings.selectedValue && selectedValue !== void 0) $$bindings.selectedValue(selectedValue);
	if ($$props.optionIdentifier === void 0 && $$bindings.optionIdentifier && optionIdentifier !== void 0) $$bindings.optionIdentifier(optionIdentifier);
	if ($$props.hideEmptyState === void 0 && $$bindings.hideEmptyState && hideEmptyState !== void 0) $$bindings.hideEmptyState(hideEmptyState);
	if ($$props.noOptionsMessage === void 0 && $$bindings.noOptionsMessage && noOptionsMessage !== void 0) $$bindings.noOptionsMessage(noOptionsMessage);
	if ($$props.isMulti === void 0 && $$bindings.isMulti && isMulti !== void 0) $$bindings.isMulti(isMulti);
	if ($$props.activeItemIndex === void 0 && $$bindings.activeItemIndex && activeItemIndex !== void 0) $$bindings.activeItemIndex(activeItemIndex);
	if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0) $$bindings.filterText(filterText);
	$$result.css.add(css$b);

	return `

${isVirtualList
	? `<div class="${"listContainer virtualList svelte-ux0sbr"}"${add_attribute("this", container, 1)}>${validate_component(VirtualList, "VirtualList").$$render($$result, { items, itemHeight }, {}, {
			default: ({ item, i }) => `<div class="${"listItem"}">${validate_component(Item$1 || missing_component, "svelte:component").$$render(
				$$result,
				{
					item,
					filterText,
					getOptionLabel,
					isFirst: isItemFirst(i),
					isActive: isItemActive(item, selectedValue, optionIdentifier),
					isHover: isItemHover(hoverItemIndex, item, i, items)
				},
				{},
				{}
			)}</div>`
		})}</div>`
	: ``}

${!isVirtualList
	? `<div class="${"listContainer svelte-ux0sbr"}"${add_attribute("this", container, 1)}>${items.length
		? each(items, (item, i) => `${item.isGroupHeader && !item.isSelectable
			? `<div class="${"listGroupTitle svelte-ux0sbr"}">${escape(getGroupHeaderLabel(item))}</div>`
			: `<div class="${"listItem"}">${validate_component(Item$1 || missing_component, "svelte:component").$$render(
					$$result,
					{
						item,
						filterText,
						getOptionLabel,
						isFirst: isItemFirst(i),
						isActive: isItemActive(item, selectedValue, optionIdentifier),
						isHover: isItemHover(hoverItemIndex, item, i, items)
					},
					{},
					{}
				)}
    </div>`}`)
		: `${!hideEmptyState
			? `<div class="${"empty svelte-ux0sbr"}">${escape(noOptionsMessage)}</div>`
			: ``}`}</div>`
	: ``}`;
});

/* node_modules/svelte-select/src/Selection.svelte generated by Svelte v3.21.0 */

const css$c = {
	code: ".selection.svelte-ch6bh7{text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap}",
	map: "{\"version\":3,\"file\":\"Selection.svelte\",\"sources\":[\"Selection.svelte\"],\"sourcesContent\":[\"<script>\\n  export let getSelectionLabel = undefined;\\n  export let item = undefined;\\n</script>\\n\\n<style>\\n  .selection {\\n    text-overflow: ellipsis;\\n    overflow-x: hidden;\\n    white-space: nowrap;\\n  }\\n</style>\\n\\n<div class=\\\"selection\\\">\\n  {@html getSelectionLabel(item)} \\n</div>\\n\"],\"names\":[],\"mappings\":\"AAME,UAAU,cAAC,CAAC,AACV,aAAa,CAAE,QAAQ,CACvB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,MAAM,AACrB,CAAC\"}"
};

const Selection = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { getSelectionLabel = undefined } = $$props;
	let { item = undefined } = $$props;
	if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0) $$bindings.getSelectionLabel(getSelectionLabel);
	if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
	$$result.css.add(css$c);
	return `<div class="${"selection svelte-ch6bh7"}">${getSelectionLabel(item)}</div>`;
});

/* node_modules/svelte-select/src/MultiSelection.svelte generated by Svelte v3.21.0 */

const css$d = {
	code: ".multiSelectItem.svelte-rtzfov.svelte-rtzfov{background:var(--multiItemBG, #EBEDEF);margin:var(--multiItemMargin, 5px 5px 0 0);border-radius:var(--multiItemBorderRadius, 16px);height:var(--multiItemHeight, 32px);line-height:var(--multiItemHeight, 32px);display:flex;cursor:default;padding:var(--multiItemPadding, 0 10px 0 15px)}.multiSelectItem_label.svelte-rtzfov.svelte-rtzfov{margin:var(--multiLabelMargin, 0 5px 0 0)}.multiSelectItem.svelte-rtzfov.svelte-rtzfov:hover,.multiSelectItem.active.svelte-rtzfov.svelte-rtzfov{background-color:var(--multiItemActiveBG, #006FFF);color:var(--multiItemActiveColor, #fff)}.multiSelectItem.disabled.svelte-rtzfov.svelte-rtzfov:hover{background:var(--multiItemDisabledHoverBg, #EBEDEF);color:var(--multiItemDisabledHoverColor, #C1C6CC)}.multiSelectItem_clear.svelte-rtzfov.svelte-rtzfov{border-radius:var(--multiClearRadius, 50%);background:var(--multiClearBG, #52616F);width:var(--multiClearWidth, 16px);height:var(--multiClearHeight, 16px);position:relative;top:var(--multiClearTop, 8px);text-align:var(--multiClearTextAlign, center);padding:var(--multiClearPadding, 1px)}.multiSelectItem_clear.svelte-rtzfov.svelte-rtzfov:hover,.active.svelte-rtzfov .multiSelectItem_clear.svelte-rtzfov{background:var(--multiClearHoverBG, #fff)}.multiSelectItem_clear.svelte-rtzfov:hover svg.svelte-rtzfov,.active.svelte-rtzfov .multiSelectItem_clear svg.svelte-rtzfov{fill:var(--multiClearHoverFill, #006FFF)}.multiSelectItem_clear.svelte-rtzfov svg.svelte-rtzfov{fill:var(--multiClearFill, #EBEDEF);vertical-align:top}",
	map: "{\"version\":3,\"file\":\"MultiSelection.svelte\",\"sources\":[\"MultiSelection.svelte\"],\"sourcesContent\":[\"<script>\\n  import { createEventDispatcher } from 'svelte';\\n\\n  const dispatch = createEventDispatcher();\\n\\n  export let selectedValue = [];\\n  export let activeSelectedValue = undefined;\\n  export let isDisabled = false;\\n  export let getSelectionLabel = undefined;\\n\\n  function handleClear(i, event) {\\n    event.stopPropagation();\\n    dispatch('multiItemClear', {i});\\n  }\\n</script>\\n\\n{#each selectedValue as value, i}\\n<div class=\\\"multiSelectItem {activeSelectedValue === i ? 'active' : ''} {isDisabled ? 'disabled' : ''}\\\">\\n  <div class=\\\"multiSelectItem_label\\\">\\n    {@html getSelectionLabel(value)}\\n  </div>\\n  {#if !isDisabled}\\n  <div class=\\\"multiSelectItem_clear\\\" on:click=\\\"{event => handleClear(i, event)}\\\">\\n    <svg width=\\\"100%\\\" height=\\\"100%\\\" viewBox=\\\"-2 -2 50 50\\\" focusable=\\\"false\\\" role=\\\"presentation\\\">\\n      <path\\n        d=\\\"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z\\\"></path>\\n    </svg>\\n  </div>\\n  {/if}\\n</div>\\n{/each}\\n\\n\\n\\n<style>\\n  .multiSelectItem {\\n    background: var(--multiItemBG, #EBEDEF);\\n    margin: var(--multiItemMargin, 5px 5px 0 0);\\n    border-radius: var(--multiItemBorderRadius, 16px);\\n    height: var(--multiItemHeight, 32px);\\n    line-height: var(--multiItemHeight, 32px);\\n    display: flex;\\n    cursor: default;\\n    padding: var(--multiItemPadding, 0 10px 0 15px);\\n  }\\n\\n  .multiSelectItem_label {\\n    margin: var(--multiLabelMargin, 0 5px 0 0);\\n  }\\n\\n  .multiSelectItem:hover,\\n  .multiSelectItem.active {\\n    background-color: var(--multiItemActiveBG, #006FFF);\\n    color: var(--multiItemActiveColor, #fff);\\n  }\\n\\n  .multiSelectItem.disabled:hover {\\n    background: var(--multiItemDisabledHoverBg, #EBEDEF);\\n    color: var(--multiItemDisabledHoverColor, #C1C6CC);\\n  }\\n\\n  .multiSelectItem_clear {\\n    border-radius: var(--multiClearRadius, 50%);\\n    background: var(--multiClearBG, #52616F);\\n    width: var(--multiClearWidth, 16px);\\n    height: var(--multiClearHeight, 16px);\\n    position: relative;\\n    top: var(--multiClearTop, 8px);\\n    text-align: var(--multiClearTextAlign, center);\\n    padding: var(--multiClearPadding, 1px);\\n  }\\n\\n  .multiSelectItem_clear:hover,\\n  .active .multiSelectItem_clear {\\n    background: var(--multiClearHoverBG, #fff);\\n  }\\n\\n  .multiSelectItem_clear:hover svg,\\n  .active .multiSelectItem_clear svg {\\n    fill: var(--multiClearHoverFill, #006FFF);\\n  }\\n\\n  .multiSelectItem_clear svg {\\n    fill: var(--multiClearFill, #EBEDEF);\\n    vertical-align: top;\\n  }\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAmCE,gBAAgB,4BAAC,CAAC,AAChB,UAAU,CAAE,IAAI,aAAa,CAAC,QAAQ,CAAC,CACvC,MAAM,CAAE,IAAI,iBAAiB,CAAC,YAAY,CAAC,CAC3C,aAAa,CAAE,IAAI,uBAAuB,CAAC,KAAK,CAAC,CACjD,MAAM,CAAE,IAAI,iBAAiB,CAAC,KAAK,CAAC,CACpC,WAAW,CAAE,IAAI,iBAAiB,CAAC,KAAK,CAAC,CACzC,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IAAI,kBAAkB,CAAC,cAAc,CAAC,AACjD,CAAC,AAED,sBAAsB,4BAAC,CAAC,AACtB,MAAM,CAAE,IAAI,kBAAkB,CAAC,UAAU,CAAC,AAC5C,CAAC,AAED,4CAAgB,MAAM,CACtB,gBAAgB,OAAO,4BAAC,CAAC,AACvB,gBAAgB,CAAE,IAAI,mBAAmB,CAAC,QAAQ,CAAC,CACnD,KAAK,CAAE,IAAI,sBAAsB,CAAC,KAAK,CAAC,AAC1C,CAAC,AAED,gBAAgB,qCAAS,MAAM,AAAC,CAAC,AAC/B,UAAU,CAAE,IAAI,0BAA0B,CAAC,QAAQ,CAAC,CACpD,KAAK,CAAE,IAAI,6BAA6B,CAAC,QAAQ,CAAC,AACpD,CAAC,AAED,sBAAsB,4BAAC,CAAC,AACtB,aAAa,CAAE,IAAI,kBAAkB,CAAC,IAAI,CAAC,CAC3C,UAAU,CAAE,IAAI,cAAc,CAAC,QAAQ,CAAC,CACxC,KAAK,CAAE,IAAI,iBAAiB,CAAC,KAAK,CAAC,CACnC,MAAM,CAAE,IAAI,kBAAkB,CAAC,KAAK,CAAC,CACrC,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,eAAe,CAAC,IAAI,CAAC,CAC9B,UAAU,CAAE,IAAI,qBAAqB,CAAC,OAAO,CAAC,CAC9C,OAAO,CAAE,IAAI,mBAAmB,CAAC,IAAI,CAAC,AACxC,CAAC,AAED,kDAAsB,MAAM,CAC5B,qBAAO,CAAC,sBAAsB,cAAC,CAAC,AAC9B,UAAU,CAAE,IAAI,mBAAmB,CAAC,KAAK,CAAC,AAC5C,CAAC,AAED,oCAAsB,MAAM,CAAC,iBAAG,CAChC,qBAAO,CAAC,sBAAsB,CAAC,GAAG,cAAC,CAAC,AAClC,IAAI,CAAE,IAAI,qBAAqB,CAAC,QAAQ,CAAC,AAC3C,CAAC,AAED,oCAAsB,CAAC,GAAG,cAAC,CAAC,AAC1B,IAAI,CAAE,IAAI,gBAAgB,CAAC,QAAQ,CAAC,CACpC,cAAc,CAAE,GAAG,AACrB,CAAC\"}"
};

const MultiSelection = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const dispatch = createEventDispatcher();
	let { selectedValue = [] } = $$props;
	let { activeSelectedValue = undefined } = $$props;
	let { isDisabled = false } = $$props;
	let { getSelectionLabel = undefined } = $$props;

	if ($$props.selectedValue === void 0 && $$bindings.selectedValue && selectedValue !== void 0) $$bindings.selectedValue(selectedValue);
	if ($$props.activeSelectedValue === void 0 && $$bindings.activeSelectedValue && activeSelectedValue !== void 0) $$bindings.activeSelectedValue(activeSelectedValue);
	if ($$props.isDisabled === void 0 && $$bindings.isDisabled && isDisabled !== void 0) $$bindings.isDisabled(isDisabled);
	if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0) $$bindings.getSelectionLabel(getSelectionLabel);
	$$result.css.add(css$d);

	return `${each(selectedValue, (value, i) => `<div class="${"multiSelectItem " + escape(activeSelectedValue === i ? "active" : "") + " " + escape(isDisabled ? "disabled" : "") + " svelte-rtzfov"}"><div class="${"multiSelectItem_label svelte-rtzfov"}">${getSelectionLabel(value)}</div>
  ${!isDisabled
	? `<div class="${"multiSelectItem_clear svelte-rtzfov"}"><svg width="${"100%"}" height="${"100%"}" viewBox="${"-2 -2 50 50"}" focusable="${"false"}" role="${"presentation"}" class="${"svelte-rtzfov"}"><path d="${"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"}"></path></svg>
  </div>`
	: ``}
</div>`)}`;
});

function isOutOfViewport(elem) {
  const bounding = elem.getBoundingClientRect();
  const out = {};

  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;

  return out;
}

function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    let context = this;
    let args = arguments;
	    
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
}

/* node_modules/svelte-select/src/Select.svelte generated by Svelte v3.21.0 */

const css$e = {
	code: ".selectContainer.svelte-cr4b6i.svelte-cr4b6i{--padding:0 16px;border:var(--border, 1px solid #d8dbdf);border-radius:var(--borderRadius, 3px);height:var(--height, 42px);position:relative;display:flex;align-items:center;padding:var(--padding);background:var(--background, #fff)}.selectContainer.svelte-cr4b6i input.svelte-cr4b6i{cursor:default;border:none;color:var(--inputColor, #3f4f5f);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--inputPadding, var(--padding));width:100%;background:transparent;font-size:var(--inputFontSize, 14px);letter-spacing:var(--inputLetterSpacing, -0.08px);position:absolute;left:var(--inputLeft, 0)}.selectContainer.svelte-cr4b6i input.svelte-cr4b6i::placeholder{color:var(--placeholderColor, #78848f)}.selectContainer.svelte-cr4b6i input.svelte-cr4b6i:focus{outline:none}.selectContainer.svelte-cr4b6i.svelte-cr4b6i:hover{border-color:var(--borderHoverColor, #b2b8bf)}.selectContainer.focused.svelte-cr4b6i.svelte-cr4b6i{border-color:var(--borderFocusColor, #006fe8)}.selectContainer.disabled.svelte-cr4b6i.svelte-cr4b6i{background:var(--disabledBackground, #ebedef);border-color:var(--disabledBorderColor, #ebedef);color:var(--disabledColor, #c1c6cc)}.selectContainer.disabled.svelte-cr4b6i input.svelte-cr4b6i::placeholder{color:var(--disabledPlaceholderColor, #c1c6cc)}.selectedItem.svelte-cr4b6i.svelte-cr4b6i{line-height:var(--height, 42px);height:var(--height, 42px);overflow-x:hidden;padding:var(--selectedItemPadding, 0 20px 0 0)}.selectedItem.svelte-cr4b6i.svelte-cr4b6i:focus{outline:none}.clearSelect.svelte-cr4b6i.svelte-cr4b6i{position:absolute;right:var(--clearSelectRight, 10px);top:var(--clearSelectTop, 11px);bottom:var(--clearSelectBottom, 11px);width:var(--clearSelectWidth, 20px);color:var(--clearSelectColor, #c5cacf);flex:none !important}.clearSelect.svelte-cr4b6i.svelte-cr4b6i:hover{color:var(--clearSelectHoverColor, #2c3e50)}.selectContainer.focused.svelte-cr4b6i .clearSelect.svelte-cr4b6i{color:var(--clearSelectFocusColor, #3f4f5f)}.indicator.svelte-cr4b6i.svelte-cr4b6i{position:absolute;right:var(--indicatorRight, 10px);top:var(--indicatorTop, 11px);width:var(--indicatorWidth, 20px);height:var(--indicatorHeight, 20px);color:var(--indicatorColor, #c5cacf)}.indicator.svelte-cr4b6i svg.svelte-cr4b6i{display:inline-block;fill:var(--indicatorFill, currentcolor);line-height:1;stroke:var(--indicatorStroke, currentcolor);stroke-width:0}.spinner.svelte-cr4b6i.svelte-cr4b6i{position:absolute;right:var(--spinnerRight, 10px);top:var(--spinnerLeft, 11px);width:var(--spinnerWidth, 20px);height:var(--spinnerHeight, 20px);color:var(--spinnerColor, #51ce6c);animation:svelte-cr4b6i-rotate 0.75s linear infinite}.spinner_icon.svelte-cr4b6i.svelte-cr4b6i{display:block;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;-webkit-transform:none}.spinner_path.svelte-cr4b6i.svelte-cr4b6i{stroke-dasharray:90;stroke-linecap:round}.multiSelect.svelte-cr4b6i.svelte-cr4b6i{display:flex;padding:var(--multiSelectPadding, 0 35px 0 16px);height:auto;flex-wrap:wrap}.multiSelect.svelte-cr4b6i>.svelte-cr4b6i{flex:1 1 50px}.selectContainer.multiSelect.svelte-cr4b6i input.svelte-cr4b6i{padding:var(--multiSelectInputPadding, 0);position:relative;margin:var(--multiSelectInputMargin, 0)}.hasError.svelte-cr4b6i.svelte-cr4b6i{border:var(--errorBorder, 1px solid #ff2d55)}@keyframes svelte-cr4b6i-rotate{100%{transform:rotate(360deg)}}",
	map: "{\"version\":3,\"file\":\"Select.svelte\",\"sources\":[\"Select.svelte\"],\"sourcesContent\":[\"<script>\\n  import {\\n    beforeUpdate,\\n    createEventDispatcher,\\n    onDestroy,\\n    onMount,\\n    tick\\n  } from \\\"svelte\\\";\\n  import List from \\\"./List.svelte\\\";\\n  import ItemComponent from \\\"./Item.svelte\\\";\\n  import SelectionComponent from \\\"./Selection.svelte\\\";\\n  import MultiSelectionComponent from \\\"./MultiSelection.svelte\\\";\\n  import isOutOfViewport from \\\"./utils/isOutOfViewport\\\";\\n  import debounce from \\\"./utils/debounce\\\";\\n\\n  const dispatch = createEventDispatcher();\\n  export let container = undefined;\\n  export let input = undefined;\\n  export let Item = ItemComponent;\\n  export let Selection = SelectionComponent;\\n  export let MultiSelection = MultiSelectionComponent;\\n  export let isMulti = false;\\n  export let isDisabled = false;\\n  export let isCreatable = false;\\n  export let isFocused = false;\\n  export let selectedValue = undefined;\\n  export let filterText = \\\"\\\";\\n  export let placeholder = \\\"Select...\\\";\\n  export let items = [];\\n  export let itemFilter = (label, filterText, option) =>\\n    label.toLowerCase().includes(filterText.toLowerCase());\\n  export let groupBy = undefined;\\n  export let groupFilter = groups => groups;\\n  export let isGroupHeaderSelectable = false;\\n  export let getGroupHeaderLabel = option => {\\n    return option.label;\\n  };\\n  export let getOptionLabel = (option, filterText) => {\\n    return option.isCreator ? `Create \\\\\\\"${filterText}\\\\\\\"` : option.label;\\n  };\\n  export let optionIdentifier = \\\"value\\\";\\n  export let loadOptions = undefined;\\n  export let hasError = false;\\n  export let containerStyles = \\\"\\\";\\n  export let getSelectionLabel = option => {\\n    if (option) return option.label;\\n  };\\n\\n  export let createGroupHeaderItem = groupValue => {\\n    return {\\n      value: groupValue,\\n      label: groupValue\\n    };\\n  };\\n\\n  export let createItem = filterText => {\\n    return {\\n      value: filterText,\\n      label: filterText\\n    };\\n  };\\n\\n  export let isSearchable = true;\\n  export let inputStyles = \\\"\\\";\\n  export let isClearable = true;\\n  export let isWaiting = false;\\n  export let listPlacement = \\\"auto\\\";\\n  export let listOpen = false;\\n  export let list = undefined;\\n  export let isVirtualList = false;\\n  export let loadOptionsInterval = 300;\\n  export let noOptionsMessage = \\\"No options\\\";\\n  export let hideEmptyState = false;\\n  export let filteredItems = [];\\n  export let inputAttributes = {};\\n  export let listAutoWidth = true;\\n  export let itemHeight = 40;\\n  export let Icon = undefined;\\n  export let showChevron = false;\\n\\n  let target;\\n  let activeSelectedValue;\\n  let _items = [];\\n  let originalItemsClone;\\n  let containerClasses = \\\"\\\";\\n  let prev_selectedValue;\\n  let prev_listOpen;\\n  let prev_filterText;\\n  let prev_isFocused;\\n  let prev_filteredItems;\\n\\n  async function resetFilter() {\\n    await tick();\\n    filterText = \\\"\\\";\\n  }\\n\\n  const getItems = debounce(async () => {\\n    isWaiting = true;\\n\\n    items = await loadOptions(filterText);\\n\\n    isWaiting = false;\\n    isFocused = true;\\n    listOpen = true;\\n  }, loadOptionsInterval);\\n\\n  $: disabled = isDisabled;\\n\\n  $: {\\n    containerClasses = `selectContainer`;\\n    containerClasses += isMulti ? \\\" multiSelect\\\" : \\\"\\\";\\n    containerClasses += isDisabled ? \\\" disabled\\\" : \\\"\\\";\\n    containerClasses += isFocused ? \\\" focused\\\" : \\\"\\\";\\n  }\\n\\n  $: {\\n    if (typeof selectedValue === \\\"string\\\") {\\n      selectedValue = {\\n        [optionIdentifier]: selectedValue,\\n        label: selectedValue\\n      };\\n    }\\n  }\\n\\n  $: showSelectedItem = selectedValue && filterText.length === 0;\\n\\n  $: placeholderText = selectedValue ? \\\"\\\" : placeholder;\\n\\n  let _inputAttributes = {};\\n  $: {\\n    _inputAttributes = Object.assign(inputAttributes, {\\n      autocomplete: \\\"off\\\",\\n      autocorrect: \\\"off\\\",\\n      spellcheck: false\\n    });\\n\\n    if (!isSearchable) {\\n      _inputAttributes.readonly = true;\\n    }\\n  }\\n\\n  $: {\\n    let _filteredItems;\\n    let _items = items;\\n\\n    if (items && items.length > 0 && typeof items[0] !== \\\"object\\\") {\\n      _items = items.map((item, index) => {\\n        return {\\n          index,\\n          value: item,\\n          label: item\\n        };\\n      });\\n    }\\n\\n    if (loadOptions && filterText.length === 0 && originalItemsClone) {\\n      _filteredItems = JSON.parse(originalItemsClone);\\n      _items = JSON.parse(originalItemsClone);\\n    } else {\\n      _filteredItems = loadOptions\\n        ? filterText.length === 0\\n          ? []\\n          : _items\\n        : _items.filter(item => {\\n            let keepItem = true;\\n\\n            if (isMulti && selectedValue) {\\n              keepItem = !selectedValue.find(value => {\\n                return value[optionIdentifier] === item[optionIdentifier];\\n              });\\n            }\\n\\n            if (!keepItem) return false;\\n            if (filterText.length < 1) return true;\\n            return itemFilter(\\n              getOptionLabel(item, filterText),\\n              filterText,\\n              item\\n            );\\n          });\\n    }\\n\\n    if (groupBy) {\\n      const groupValues = [];\\n      const groups = {};\\n\\n      _filteredItems.forEach(item => {\\n        const groupValue = groupBy(item);\\n\\n        if (!groupValues.includes(groupValue)) {\\n          groupValues.push(groupValue);\\n          groups[groupValue] = [];\\n\\n          if (groupValue) {\\n            groups[groupValue].push(\\n              Object.assign(createGroupHeaderItem(groupValue, item), {\\n                id: groupValue,\\n                isGroupHeader: true,\\n                isSelectable: isGroupHeaderSelectable\\n              })\\n            );\\n          }\\n        }\\n\\n        groups[groupValue].push(\\n          Object.assign({ isGroupItem: !!groupValue }, item)\\n        );\\n      });\\n\\n      const sortedGroupedItems = [];\\n\\n      groupFilter(groupValues).forEach(groupValue => {\\n        sortedGroupedItems.push(...groups[groupValue]);\\n      });\\n\\n      filteredItems = sortedGroupedItems;\\n    } else {\\n      filteredItems = _filteredItems;\\n    }\\n  }\\n\\n  beforeUpdate(() => {\\n    if (isMulti && selectedValue && selectedValue.length > 1) {\\n      checkSelectedValueForDuplicates();\\n    }\\n\\n    if (!isMulti && selectedValue && prev_selectedValue !== selectedValue) {\\n      if (\\n        !prev_selectedValue ||\\n        JSON.stringify(selectedValue[optionIdentifier]) !==\\n          JSON.stringify(prev_selectedValue[optionIdentifier])\\n      ) {\\n        dispatch(\\\"select\\\", selectedValue);\\n      }\\n    }\\n\\n    if (\\n      isMulti &&\\n      JSON.stringify(selectedValue) !== JSON.stringify(prev_selectedValue)\\n    ) {\\n      if (checkSelectedValueForDuplicates()) {\\n        dispatch(\\\"select\\\", selectedValue);\\n      }\\n    }\\n\\n    if (container && listOpen !== prev_listOpen) {\\n      if (listOpen) {\\n        loadList();\\n      } else {\\n        removeList();\\n      }\\n    }\\n\\n    if (filterText !== prev_filterText) {\\n      if (filterText.length > 0) {\\n        isFocused = true;\\n        listOpen = true;\\n\\n        if (loadOptions) {\\n          getItems();\\n        } else {\\n          loadList();\\n          listOpen = true;\\n\\n          if (isMulti) {\\n            activeSelectedValue = undefined;\\n          }\\n        }\\n      } else {\\n        setList([]);\\n      }\\n\\n      if (list) {\\n        list.$set({\\n          filterText\\n        });\\n      }\\n    }\\n\\n    if (isFocused !== prev_isFocused) {\\n      if (isFocused || listOpen) {\\n        handleFocus();\\n      } else {\\n        resetFilter();\\n        if (input) input.blur();\\n      }\\n    }\\n\\n    if (prev_filteredItems !== filteredItems) {\\n      let _filteredItems = [...filteredItems];\\n\\n      if (isCreatable && filterText) {\\n        const itemToCreate = createItem(filterText);\\n        itemToCreate.isCreator = true;\\n\\n        const existingItemWithFilterValue = _filteredItems.find(item => {\\n          return item[optionIdentifier] === itemToCreate[optionIdentifier];\\n        });\\n\\n        let existingSelectionWithFilterValue;\\n\\n        if (selectedValue) {\\n          if (isMulti) {\\n            existingSelectionWithFilterValue = selectedValue.find(selection => {\\n              return (\\n                selection[optionIdentifier] === itemToCreate[optionIdentifier]\\n              );\\n            });\\n          } else if (\\n            selectedValue[optionIdentifier] === itemToCreate[optionIdentifier]\\n          ) {\\n            existingSelectionWithFilterValue = selectedValue;\\n          }\\n        }\\n\\n        if (!existingItemWithFilterValue && !existingSelectionWithFilterValue) {\\n          _filteredItems = [..._filteredItems, itemToCreate];\\n        }\\n      }\\n\\n      setList(_filteredItems);\\n    }\\n\\n    prev_selectedValue = selectedValue;\\n    prev_listOpen = listOpen;\\n    prev_filterText = filterText;\\n    prev_isFocused = isFocused;\\n    prev_filteredItems = filteredItems;\\n  });\\n\\n  function checkSelectedValueForDuplicates() {\\n    let noDuplicates = true;\\n    if (selectedValue) {\\n      const ids = [];\\n      const uniqueValues = [];\\n\\n      selectedValue.forEach(val => {\\n        if (!ids.includes(val[optionIdentifier])) {\\n          ids.push(val[optionIdentifier]);\\n          uniqueValues.push(val);\\n        } else {\\n          noDuplicates = false;\\n        }\\n      });\\n\\n      selectedValue = uniqueValues;\\n    }\\n    return noDuplicates;\\n  }\\n\\n  async function setList(items) {\\n    await tick();\\n    if (list) return list.$set({ items });\\n    if (loadOptions && items.length > 0) loadList();\\n  }\\n\\n  function handleMultiItemClear(event) {\\n    const { detail } = event;\\n    const itemToRemove =\\n      selectedValue[detail ? detail.i : selectedValue.length - 1];\\n\\n    if (selectedValue.length === 1) {\\n      selectedValue = undefined;\\n    } else {\\n      selectedValue = selectedValue.filter(item => {\\n        return item !== itemToRemove;\\n      });\\n    }\\n\\n    dispatch(\\\"clear\\\", itemToRemove);\\n\\n    getPosition();\\n  }\\n\\n  async function getPosition() {\\n    await tick();\\n    if (!target || !container) return;\\n    const { top, height, width } = container.getBoundingClientRect();\\n\\n    target.style[\\\"min-width\\\"] = `${width}px`;\\n    target.style.width = `${listAutoWidth ? \\\"auto\\\" : \\\"100%\\\"}`;\\n    target.style.left = \\\"0\\\";\\n\\n    if (listPlacement === \\\"top\\\") {\\n      target.style.bottom = `${height + 5}px`;\\n    } else {\\n      target.style.top = `${height + 5}px`;\\n    }\\n\\n    target = target;\\n\\n    if (listPlacement === \\\"auto\\\" && isOutOfViewport(target).bottom) {\\n      target.style.top = ``;\\n      target.style.bottom = `${height + 5}px`;\\n    }\\n\\n    target.style.visibility = \\\"\\\";\\n  }\\n\\n  function handleKeyDown(e) {\\n    if (!isFocused) return;\\n\\n    switch (e.key) {\\n      case \\\"ArrowDown\\\":\\n        e.preventDefault();\\n        listOpen = true;\\n        activeSelectedValue = undefined;\\n        break;\\n      case \\\"ArrowUp\\\":\\n        e.preventDefault();\\n        listOpen = true;\\n        activeSelectedValue = undefined;\\n        break;\\n      case \\\"Tab\\\":\\n        if (!listOpen) isFocused = false;\\n        break;\\n      case \\\"Backspace\\\":\\n        if (!isMulti || filterText.length > 0) return;\\n        if (isMulti && selectedValue && selectedValue.length > 0) {\\n          handleMultiItemClear(\\n            activeSelectedValue !== undefined\\n              ? activeSelectedValue\\n              : selectedValue.length - 1\\n          );\\n          if (activeSelectedValue === 0 || activeSelectedValue === undefined)\\n            break;\\n          activeSelectedValue =\\n            selectedValue.length > activeSelectedValue\\n              ? activeSelectedValue - 1\\n              : undefined;\\n        }\\n        break;\\n      case \\\"ArrowLeft\\\":\\n        if (list) list.$set({ hoverItemIndex: -1 });\\n        if (!isMulti || filterText.length > 0) return;\\n\\n        if (activeSelectedValue === undefined) {\\n          activeSelectedValue = selectedValue.length - 1;\\n        } else if (\\n          selectedValue.length > activeSelectedValue &&\\n          activeSelectedValue !== 0\\n        ) {\\n          activeSelectedValue -= 1;\\n        }\\n        break;\\n      case \\\"ArrowRight\\\":\\n        if (list) list.$set({ hoverItemIndex: -1 });\\n        if (\\n          !isMulti ||\\n          filterText.length > 0 ||\\n          activeSelectedValue === undefined\\n        )\\n          return;\\n        if (activeSelectedValue === selectedValue.length - 1) {\\n          activeSelectedValue = undefined;\\n        } else if (activeSelectedValue < selectedValue.length - 1) {\\n          activeSelectedValue += 1;\\n        }\\n        break;\\n    }\\n  }\\n\\n  function handleFocus() {\\n    isFocused = true;\\n    if (input) input.focus();\\n  }\\n\\n  function removeList() {\\n    resetFilter();\\n    activeSelectedValue = undefined;\\n\\n    if (!list) return;\\n    list.$destroy();\\n    list = undefined;\\n\\n    if (!target) return;\\n    if (target.parentNode) target.parentNode.removeChild(target);\\n    target = undefined;\\n\\n    list = list;\\n    target = target;\\n  }\\n\\n  function handleWindowClick(event) {\\n    if (!container) return;\\n    const eventTarget =\\n      event.path && event.path.length > 0 ? event.path[0] : event.target;\\n    if (container.contains(eventTarget)) return;\\n    isFocused = false;\\n    listOpen = false;\\n    activeSelectedValue = undefined;\\n    if (input) input.blur();\\n  }\\n\\n  function handleClick() {\\n    if (isDisabled) return;\\n    isFocused = true;\\n    listOpen = !listOpen;\\n  }\\n\\n  export function handleClear() {\\n    selectedValue = undefined;\\n    listOpen = false;\\n    dispatch(\\\"clear\\\", selectedValue);\\n    handleFocus();\\n  }\\n\\n  async function loadList() {\\n    await tick();\\n    if (target && list) return;\\n\\n    const data = {\\n      Item,\\n      filterText,\\n      optionIdentifier,\\n      noOptionsMessage,\\n      hideEmptyState,\\n      isVirtualList,\\n      selectedValue,\\n      isMulti,\\n      getGroupHeaderLabel,\\n      items: filteredItems,\\n      itemHeight\\n    };\\n\\n    if (getOptionLabel) {\\n      data.getOptionLabel = getOptionLabel;\\n    }\\n\\n    target = document.createElement(\\\"div\\\");\\n\\n    Object.assign(target.style, {\\n      position: \\\"absolute\\\",\\n      \\\"z-index\\\": 2,\\n      visibility: \\\"hidden\\\"\\n    });\\n\\n    list = list;\\n    target = target;\\n    if (container) container.appendChild(target);\\n\\n    list = new List({\\n      target,\\n      props: data\\n    });\\n\\n    list.$on(\\\"itemSelected\\\", event => {\\n      const { detail } = event;\\n\\n      if (detail) {\\n        const item = Object.assign({}, detail);\\n\\n        if (!item.isGroupHeader || item.isSelectable) {\\n\\n          if (isMulti) {\\n            selectedValue = selectedValue ? selectedValue.concat([item]) : [item];\\n          } else {\\n            selectedValue = item;\\n          }\\n\\n          resetFilter();\\n          selectedValue = selectedValue;\\n\\n          setTimeout(() => {\\n            listOpen = false;\\n            activeSelectedValue = undefined;\\n          });\\n        }\\n      }\\n    });\\n\\n    list.$on(\\\"itemCreated\\\", event => {\\n      const { detail } = event;\\n      if (isMulti) {\\n        selectedValue = selectedValue || [];\\n        selectedValue = [...selectedValue, createItem(detail)];\\n      } else {\\n        selectedValue = createItem(detail);\\n      }\\n\\n      filterText = \\\"\\\";\\n      listOpen = false;\\n      activeSelectedValue = undefined;\\n      resetFilter();\\n    });\\n\\n    list.$on(\\\"closeList\\\", () => {\\n      listOpen = false;\\n    });\\n\\n    (list = list), (target = target);\\n    getPosition();\\n  }\\n\\n  onMount(() => {\\n    if (isFocused) input.focus();\\n    if (listOpen) loadList();\\n\\n    if (items && items.length > 0) {\\n      originalItemsClone = JSON.stringify(items);\\n    }\\n\\n    if (selectedValue) {\\n      if (isMulti) {\\n        selectedValue = selectedValue.map(item => {\\n          if (typeof item === \\\"string\\\") {\\n            return { value: item, label: item };\\n          } else {\\n            return item;\\n          }\\n        });\\n      }\\n    }\\n  });\\n\\n  onDestroy(() => {\\n    removeList();\\n  });\\n</script>\\n\\n<style>\\n  .selectContainer {\\n    --padding: 0 16px;\\n    \\n    border: var(--border, 1px solid #d8dbdf);\\n    border-radius: var(--borderRadius, 3px);\\n    height: var(--height, 42px);\\n    position: relative;\\n    display: flex;\\n    align-items: center;\\n    padding: var(--padding);\\n    background: var(--background, #fff);\\n  }\\n\\n  .selectContainer input {\\n    cursor: default;\\n    border: none;\\n    color: var(--inputColor, #3f4f5f);\\n    height: var(--height, 42px);\\n    line-height: var(--height, 42px);\\n    padding: var(--inputPadding, var(--padding));\\n    width: 100%;\\n    background: transparent;\\n    font-size: var(--inputFontSize, 14px);\\n    letter-spacing: var(--inputLetterSpacing, -0.08px);\\n    position: absolute;\\n    left: var(--inputLeft, 0);\\n  }\\n\\n  .selectContainer input::placeholder {\\n    color: var(--placeholderColor, #78848f);\\n  }\\n\\n  .selectContainer input:focus {\\n    outline: none;\\n  }\\n\\n  .selectContainer:hover {\\n    border-color: var(--borderHoverColor, #b2b8bf);\\n  }\\n\\n  .selectContainer.focused {\\n    border-color: var(--borderFocusColor, #006fe8);\\n  }\\n\\n  .selectContainer.disabled {\\n    background: var(--disabledBackground, #ebedef);\\n    border-color: var(--disabledBorderColor, #ebedef);\\n    color: var(--disabledColor, #c1c6cc);\\n  }\\n\\n  .selectContainer.disabled input::placeholder {\\n    color: var(--disabledPlaceholderColor, #c1c6cc);\\n  }\\n\\n  .selectedItem {\\n    line-height: var(--height, 42px);\\n    height: var(--height, 42px);\\n    overflow-x: hidden;\\n    padding: var(--selectedItemPadding, 0 20px 0 0);\\n  }\\n\\n  .selectedItem:focus {\\n    outline: none;\\n  }\\n\\n  .clearSelect {\\n    position: absolute;\\n    right: var(--clearSelectRight, 10px);\\n    top: var(--clearSelectTop, 11px);\\n    bottom: var(--clearSelectBottom, 11px);\\n    width: var(--clearSelectWidth, 20px);\\n    color: var(--clearSelectColor, #c5cacf);\\n    flex: none !important;\\n  }\\n\\n  .clearSelect:hover {\\n    color: var(--clearSelectHoverColor, #2c3e50);\\n  }\\n\\n  .selectContainer.focused .clearSelect {\\n    color: var(--clearSelectFocusColor, #3f4f5f);\\n  }\\n\\n  .indicator {\\n    position: absolute;\\n    right: var(--indicatorRight, 10px);\\n    top: var(--indicatorTop, 11px);\\n    width: var(--indicatorWidth, 20px);\\n    height: var(--indicatorHeight, 20px);\\n    color: var(--indicatorColor, #c5cacf);\\n  }\\n\\n  .indicator svg {\\n    display: inline-block;\\n    fill: var(--indicatorFill, currentcolor);\\n    line-height: 1;\\n    stroke: var(--indicatorStroke, currentcolor);\\n    stroke-width: 0;\\n  }\\n\\n  .spinner {\\n    position: absolute;\\n    right: var(--spinnerRight, 10px);\\n    top: var(--spinnerLeft, 11px);\\n    width: var(--spinnerWidth, 20px);\\n    height: var(--spinnerHeight, 20px);\\n    color: var(--spinnerColor, #51ce6c);\\n    animation: rotate 0.75s linear infinite;\\n  }\\n\\n  .spinner_icon {\\n    display: block;\\n    height: 100%;\\n    transform-origin: center center;\\n    width: 100%;\\n    position: absolute;\\n    top: 0;\\n    bottom: 0;\\n    left: 0;\\n    right: 0;\\n    margin: auto;\\n    -webkit-transform: none;\\n  }\\n\\n  .spinner_path {\\n    stroke-dasharray: 90;\\n    stroke-linecap: round;\\n  }\\n\\n  .multiSelect {\\n    display: flex;\\n    padding: var(--multiSelectPadding, 0 35px 0 16px);\\n    height: auto;\\n    flex-wrap: wrap;\\n  }\\n\\n  .multiSelect > * {\\n    flex: 1 1 50px;\\n  }\\n\\n  .selectContainer.multiSelect input {\\n    padding: var(--multiSelectInputPadding, 0);\\n    position: relative;\\n    margin: var(--multiSelectInputMargin, 0);\\n  }\\n\\n  .hasError {\\n    border: var(--errorBorder, 1px solid #ff2d55);\\n  }\\n\\n  @keyframes rotate {\\n    100% {\\n      transform: rotate(360deg);\\n    }\\n  }\\n</style>\\n\\n<svelte:window\\n  on:click={handleWindowClick}\\n  on:keydown={handleKeyDown}\\n  on:resize={getPosition} />\\n\\n<div\\n  class=\\\"{containerClasses}\\n  {hasError ? 'hasError' : ''}\\\"\\n  style={containerStyles}\\n  on:click={handleClick}\\n  bind:this={container}>\\n\\n  {#if Icon}\\n    <svelte:component this={Icon} />\\n  {/if}\\n\\n  {#if isMulti && selectedValue && selectedValue.length > 0}\\n    <svelte:component\\n      this={MultiSelection}\\n      {selectedValue}\\n      {getSelectionLabel}\\n      {activeSelectedValue}\\n      {isDisabled}\\n      on:multiItemClear={handleMultiItemClear}\\n      on:focus={handleFocus} />\\n  {/if}\\n\\n  {#if isDisabled}\\n    <input\\n      {..._inputAttributes}\\n      bind:this={input}\\n      on:focus={handleFocus}\\n      bind:value={filterText}\\n      placeholder={placeholderText}\\n      style={inputStyles}\\n      disabled />\\n  {:else}\\n    <input\\n      {..._inputAttributes}\\n      bind:this={input}\\n      on:focus={handleFocus}\\n      bind:value={filterText}\\n      placeholder={placeholderText}\\n      style={inputStyles} />\\n  {/if}\\n\\n  {#if !isMulti && showSelectedItem}\\n    <div class=\\\"selectedItem\\\" on:focus={handleFocus}>\\n      <svelte:component\\n        this={Selection}\\n        item={selectedValue}\\n        {getSelectionLabel} />\\n    </div>\\n  {/if}\\n\\n  {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}\\n    <div class=\\\"clearSelect\\\" on:click|preventDefault={handleClear}>\\n      <svg\\n        width=\\\"100%\\\"\\n        height=\\\"100%\\\"\\n        viewBox=\\\"-2 -2 50 50\\\"\\n        focusable=\\\"false\\\"\\n        role=\\\"presentation\\\">\\n        <path\\n          fill=\\\"currentColor\\\"\\n          d=\\\"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\\n          l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z\\\" />\\n      </svg>\\n    </div>\\n  {/if}\\n\\n  {#if showChevron && !selectedValue || (!isSearchable && !isDisabled && !isWaiting && ((showSelectedItem && !isClearable) || !showSelectedItem))}\\n    <div class=\\\"indicator\\\">\\n      <svg\\n        width=\\\"100%\\\"\\n        height=\\\"100%\\\"\\n        viewBox=\\\"0 0 20 20\\\"\\n        focusable=\\\"false\\\"\\n        class=\\\"css-19bqh2r\\\">\\n        <path\\n          d=\\\"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\\n          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\\n          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\\n          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\\n          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z\\\" />\\n      </svg>\\n    </div>\\n  {/if}\\n\\n  {#if isWaiting}\\n    <div class=\\\"spinner\\\">\\n      <svg class=\\\"spinner_icon\\\" viewBox=\\\"25 25 50 50\\\">\\n        <circle\\n          class=\\\"spinner_path\\\"\\n          cx=\\\"50\\\"\\n          cy=\\\"50\\\"\\n          r=\\\"20\\\"\\n          fill=\\\"none\\\"\\n          stroke=\\\"currentColor\\\"\\n          stroke-width=\\\"5\\\"\\n          stroke-miterlimit=\\\"10\\\" />\\n      </svg>\\n    </div>\\n  {/if}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA6mBE,gBAAgB,4BAAC,CAAC,AAChB,SAAS,CAAE,MAAM,CAEjB,MAAM,CAAE,IAAI,QAAQ,CAAC,kBAAkB,CAAC,CACxC,aAAa,CAAE,IAAI,cAAc,CAAC,IAAI,CAAC,CACvC,MAAM,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAC3B,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,UAAU,CAAE,IAAI,YAAY,CAAC,KAAK,CAAC,AACrC,CAAC,AAED,8BAAgB,CAAC,KAAK,cAAC,CAAC,AACtB,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,YAAY,CAAC,QAAQ,CAAC,CACjC,MAAM,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAC3B,WAAW,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAChC,OAAO,CAAE,IAAI,cAAc,CAAC,eAAe,CAAC,CAC5C,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,WAAW,CACvB,SAAS,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACrC,cAAc,CAAE,IAAI,oBAAoB,CAAC,QAAQ,CAAC,CAClD,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,WAAW,CAAC,EAAE,CAAC,AAC3B,CAAC,AAED,8BAAgB,CAAC,mBAAK,aAAa,AAAC,CAAC,AACnC,KAAK,CAAE,IAAI,kBAAkB,CAAC,QAAQ,CAAC,AACzC,CAAC,AAED,8BAAgB,CAAC,mBAAK,MAAM,AAAC,CAAC,AAC5B,OAAO,CAAE,IAAI,AACf,CAAC,AAED,4CAAgB,MAAM,AAAC,CAAC,AACtB,YAAY,CAAE,IAAI,kBAAkB,CAAC,QAAQ,CAAC,AAChD,CAAC,AAED,gBAAgB,QAAQ,4BAAC,CAAC,AACxB,YAAY,CAAE,IAAI,kBAAkB,CAAC,QAAQ,CAAC,AAChD,CAAC,AAED,gBAAgB,SAAS,4BAAC,CAAC,AACzB,UAAU,CAAE,IAAI,oBAAoB,CAAC,QAAQ,CAAC,CAC9C,YAAY,CAAE,IAAI,qBAAqB,CAAC,QAAQ,CAAC,CACjD,KAAK,CAAE,IAAI,eAAe,CAAC,QAAQ,CAAC,AACtC,CAAC,AAED,gBAAgB,uBAAS,CAAC,mBAAK,aAAa,AAAC,CAAC,AAC5C,KAAK,CAAE,IAAI,0BAA0B,CAAC,QAAQ,CAAC,AACjD,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,WAAW,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAChC,MAAM,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAC3B,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IAAI,qBAAqB,CAAC,WAAW,CAAC,AACjD,CAAC,AAED,yCAAa,MAAM,AAAC,CAAC,AACnB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,YAAY,4BAAC,CAAC,AACZ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,kBAAkB,CAAC,KAAK,CAAC,CACpC,GAAG,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CAChC,MAAM,CAAE,IAAI,mBAAmB,CAAC,KAAK,CAAC,CACtC,KAAK,CAAE,IAAI,kBAAkB,CAAC,KAAK,CAAC,CACpC,KAAK,CAAE,IAAI,kBAAkB,CAAC,QAAQ,CAAC,CACvC,IAAI,CAAE,IAAI,CAAC,UAAU,AACvB,CAAC,AAED,wCAAY,MAAM,AAAC,CAAC,AAClB,KAAK,CAAE,IAAI,uBAAuB,CAAC,QAAQ,CAAC,AAC9C,CAAC,AAED,gBAAgB,sBAAQ,CAAC,YAAY,cAAC,CAAC,AACrC,KAAK,CAAE,IAAI,uBAAuB,CAAC,QAAQ,CAAC,AAC9C,CAAC,AAED,UAAU,4BAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CAClC,GAAG,CAAE,IAAI,cAAc,CAAC,KAAK,CAAC,CAC9B,KAAK,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CAClC,MAAM,CAAE,IAAI,iBAAiB,CAAC,KAAK,CAAC,CACpC,KAAK,CAAE,IAAI,gBAAgB,CAAC,QAAQ,CAAC,AACvC,CAAC,AAED,wBAAU,CAAC,GAAG,cAAC,CAAC,AACd,OAAO,CAAE,YAAY,CACrB,IAAI,CAAE,IAAI,eAAe,CAAC,aAAa,CAAC,CACxC,WAAW,CAAE,CAAC,CACd,MAAM,CAAE,IAAI,iBAAiB,CAAC,aAAa,CAAC,CAC5C,YAAY,CAAE,CAAC,AACjB,CAAC,AAED,QAAQ,4BAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,cAAc,CAAC,KAAK,CAAC,CAChC,GAAG,CAAE,IAAI,aAAa,CAAC,KAAK,CAAC,CAC7B,KAAK,CAAE,IAAI,cAAc,CAAC,KAAK,CAAC,CAChC,MAAM,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CAClC,KAAK,CAAE,IAAI,cAAc,CAAC,QAAQ,CAAC,CACnC,SAAS,CAAE,oBAAM,CAAC,KAAK,CAAC,MAAM,CAAC,QAAQ,AACzC,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,MAAM,CAAC,MAAM,CAC/B,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,IAAI,CACZ,iBAAiB,CAAE,IAAI,AACzB,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,gBAAgB,CAAE,EAAE,CACpB,cAAc,CAAE,KAAK,AACvB,CAAC,AAED,YAAY,4BAAC,CAAC,AACZ,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,oBAAoB,CAAC,cAAc,CAAC,CACjD,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,0BAAY,CAAG,cAAE,CAAC,AAChB,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,AAChB,CAAC,AAED,gBAAgB,0BAAY,CAAC,KAAK,cAAC,CAAC,AAClC,OAAO,CAAE,IAAI,yBAAyB,CAAC,EAAE,CAAC,CAC1C,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,wBAAwB,CAAC,EAAE,CAAC,AAC1C,CAAC,AAED,SAAS,4BAAC,CAAC,AACT,MAAM,CAAE,IAAI,aAAa,CAAC,kBAAkB,CAAC,AAC/C,CAAC,AAED,WAAW,oBAAO,CAAC,AACjB,IAAI,AAAC,CAAC,AACJ,SAAS,CAAE,OAAO,MAAM,CAAC,AAC3B,CAAC,AACH,CAAC\"}"
};

const Select = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const dispatch = createEventDispatcher();
	let { container = undefined } = $$props;
	let { input = undefined } = $$props;
	let { Item: Item$1 = Item } = $$props;
	let { Selection: Selection$1 = Selection } = $$props;
	let { MultiSelection: MultiSelection$1 = MultiSelection } = $$props;
	let { isMulti = false } = $$props;
	let { isDisabled = false } = $$props;
	let { isCreatable = false } = $$props;
	let { isFocused = false } = $$props;
	let { selectedValue = undefined } = $$props;
	let { filterText = "" } = $$props;
	let { placeholder = "Select..." } = $$props;
	let { items = [] } = $$props;
	let { itemFilter = (label, filterText, option) => label.toLowerCase().includes(filterText.toLowerCase()) } = $$props;
	let { groupBy = undefined } = $$props;
	let { groupFilter = groups => groups } = $$props;
	let { isGroupHeaderSelectable = false } = $$props;

	let { getGroupHeaderLabel = option => {
		return option.label;
	} } = $$props;

	let { getOptionLabel = (option, filterText) => {
		return option.isCreator
		? `Create \"${filterText}\"`
		: option.label;
	} } = $$props;

	let { optionIdentifier = "value" } = $$props;
	let { loadOptions = undefined } = $$props;
	let { hasError = false } = $$props;
	let { containerStyles = "" } = $$props;

	let { getSelectionLabel = option => {
		if (option) return option.label;
	} } = $$props;

	let { createGroupHeaderItem = groupValue => {
		return { value: groupValue, label: groupValue };
	} } = $$props;

	let { createItem = filterText => {
		return { value: filterText, label: filterText };
	} } = $$props;

	let { isSearchable = true } = $$props;
	let { inputStyles = "" } = $$props;
	let { isClearable = true } = $$props;
	let { isWaiting = false } = $$props;
	let { listPlacement = "auto" } = $$props;
	let { listOpen = false } = $$props;
	let { list = undefined } = $$props;
	let { isVirtualList = false } = $$props;
	let { loadOptionsInterval = 300 } = $$props;
	let { noOptionsMessage = "No options" } = $$props;
	let { hideEmptyState = false } = $$props;
	let { filteredItems = [] } = $$props;
	let { inputAttributes = {} } = $$props;
	let { listAutoWidth = true } = $$props;
	let { itemHeight = 40 } = $$props;
	let { Icon = undefined } = $$props;
	let { showChevron = false } = $$props;
	let target;
	let activeSelectedValue;
	let originalItemsClone;
	let containerClasses = "";
	let prev_selectedValue;
	let prev_listOpen;
	let prev_filterText;
	let prev_isFocused;
	let prev_filteredItems;

	async function resetFilter() {
		await tick();
		filterText = "";
	}

	const getItems = debounce(
		async () => {
			isWaiting = true;
			items = await loadOptions(filterText);
			isWaiting = false;
			isFocused = true;
			listOpen = true;
		},
		loadOptionsInterval
	);

	let _inputAttributes = {};

	beforeUpdate(() => {
		if (isMulti && selectedValue && selectedValue.length > 1) {
			checkSelectedValueForDuplicates();
		}

		if (!isMulti && selectedValue && prev_selectedValue !== selectedValue) {
			if (!prev_selectedValue || JSON.stringify(selectedValue[optionIdentifier]) !== JSON.stringify(prev_selectedValue[optionIdentifier])) {
				dispatch("select", selectedValue);
			}
		}

		if (isMulti && JSON.stringify(selectedValue) !== JSON.stringify(prev_selectedValue)) {
			if (checkSelectedValueForDuplicates()) {
				dispatch("select", selectedValue);
			}
		}

		if (container && listOpen !== prev_listOpen) {
			if (listOpen) {
				loadList();
			} else {
				removeList();
			}
		}

		if (filterText !== prev_filterText) {
			if (filterText.length > 0) {
				isFocused = true;
				listOpen = true;

				if (loadOptions) {
					getItems();
				} else {
					loadList();
					listOpen = true;

					if (isMulti) {
						activeSelectedValue = undefined;
					}
				}
			} else {
				setList([]);
			}

			if (list) {
				list.$set({ filterText });
			}
		}

		if (isFocused !== prev_isFocused) {
			if (isFocused || listOpen) {
				handleFocus();
			} else {
				resetFilter();
				if (input) input.blur();
			}
		}

		if (prev_filteredItems !== filteredItems) {
			let _filteredItems = [...filteredItems];

			if (isCreatable && filterText) {
				const itemToCreate = createItem(filterText);
				itemToCreate.isCreator = true;

				const existingItemWithFilterValue = _filteredItems.find(item => {
					return item[optionIdentifier] === itemToCreate[optionIdentifier];
				});

				let existingSelectionWithFilterValue;

				if (selectedValue) {
					if (isMulti) {
						existingSelectionWithFilterValue = selectedValue.find(selection => {
							return selection[optionIdentifier] === itemToCreate[optionIdentifier];
						});
					} else if (selectedValue[optionIdentifier] === itemToCreate[optionIdentifier]) {
						existingSelectionWithFilterValue = selectedValue;
					}
				}

				if (!existingItemWithFilterValue && !existingSelectionWithFilterValue) {
					_filteredItems = [..._filteredItems, itemToCreate];
				}
			}

			setList(_filteredItems);
		}

		prev_selectedValue = selectedValue;
		prev_listOpen = listOpen;
		prev_filterText = filterText;
		prev_isFocused = isFocused;
		prev_filteredItems = filteredItems;
	});

	function checkSelectedValueForDuplicates() {
		let noDuplicates = true;

		if (selectedValue) {
			const ids = [];
			const uniqueValues = [];

			selectedValue.forEach(val => {
				if (!ids.includes(val[optionIdentifier])) {
					ids.push(val[optionIdentifier]);
					uniqueValues.push(val);
				} else {
					noDuplicates = false;
				}
			});

			selectedValue = uniqueValues;
		}

		return noDuplicates;
	}

	async function setList(items) {
		await tick();
		if (list) return list.$set({ items });
		if (loadOptions && items.length > 0) loadList();
	}

	async function getPosition() {
		await tick();
		if (!target || !container) return;
		const { top, height, width } = container.getBoundingClientRect();
		target.style["min-width"] = `${width}px`;
		target.style.width = `${listAutoWidth ? "auto" : "100%"}`;
		target.style.left = "0";

		if (listPlacement === "top") {
			target.style.bottom = `${height + 5}px`;
		} else {
			target.style.top = `${height + 5}px`;
		}

		target = target;

		if (listPlacement === "auto" && isOutOfViewport(target).bottom) {
			target.style.top = ``;
			target.style.bottom = `${height + 5}px`;
		}

		target.style.visibility = "";
	}

	function handleFocus() {
		isFocused = true;
		if (input) input.focus();
	}

	function removeList() {
		resetFilter();
		activeSelectedValue = undefined;
		if (!list) return;
		list.$destroy();
		list = undefined;
		if (!target) return;
		if (target.parentNode) target.parentNode.removeChild(target);
		target = undefined;
		list = list;
		target = target;
	}

	function handleClear() {
		selectedValue = undefined;
		listOpen = false;
		dispatch("clear", selectedValue);
		handleFocus();
	}

	async function loadList() {
		await tick();
		if (target && list) return;

		const data = {
			Item: Item$1,
			filterText,
			optionIdentifier,
			noOptionsMessage,
			hideEmptyState,
			isVirtualList,
			selectedValue,
			isMulti,
			getGroupHeaderLabel,
			items: filteredItems,
			itemHeight
		};

		if (getOptionLabel) {
			data.getOptionLabel = getOptionLabel;
		}

		target = document.createElement("div");

		Object.assign(target.style, {
			position: "absolute",
			"z-index": 2,
			visibility: "hidden"
		});

		list = list;
		target = target;
		if (container) container.appendChild(target);
		list = new List({ target, props: data });

		list.$on("itemSelected", event => {
			const { detail } = event;

			if (detail) {
				const item = Object.assign({}, detail);

				if (!item.isGroupHeader || item.isSelectable) {
					if (isMulti) {
						selectedValue = selectedValue ? selectedValue.concat([item]) : [item];
					} else {
						selectedValue = item;
					}

					resetFilter();
					selectedValue = selectedValue;

					setTimeout(() => {
						listOpen = false;
						activeSelectedValue = undefined;
					});
				}
			}
		});

		list.$on("itemCreated", event => {
			const { detail } = event;

			if (isMulti) {
				selectedValue = selectedValue || [];
				selectedValue = [...selectedValue, createItem(detail)];
			} else {
				selectedValue = createItem(detail);
			}

			filterText = "";
			listOpen = false;
			activeSelectedValue = undefined;
			resetFilter();
		});

		list.$on("closeList", () => {
			listOpen = false;
		});

		(list = list, target = target);
		getPosition();
	}

	onMount(() => {
		if (isFocused) input.focus();
		if (listOpen) loadList();

		if (items && items.length > 0) {
			originalItemsClone = JSON.stringify(items);
		}

		if (selectedValue) {
			if (isMulti) {
				selectedValue = selectedValue.map(item => {
					if (typeof item === "string") {
						return { value: item, label: item };
					} else {
						return item;
					}
				});
			}
		}
	});

	onDestroy(() => {
		removeList();
	});

	if ($$props.container === void 0 && $$bindings.container && container !== void 0) $$bindings.container(container);
	if ($$props.input === void 0 && $$bindings.input && input !== void 0) $$bindings.input(input);
	if ($$props.Item === void 0 && $$bindings.Item && Item$1 !== void 0) $$bindings.Item(Item$1);
	if ($$props.Selection === void 0 && $$bindings.Selection && Selection$1 !== void 0) $$bindings.Selection(Selection$1);
	if ($$props.MultiSelection === void 0 && $$bindings.MultiSelection && MultiSelection$1 !== void 0) $$bindings.MultiSelection(MultiSelection$1);
	if ($$props.isMulti === void 0 && $$bindings.isMulti && isMulti !== void 0) $$bindings.isMulti(isMulti);
	if ($$props.isDisabled === void 0 && $$bindings.isDisabled && isDisabled !== void 0) $$bindings.isDisabled(isDisabled);
	if ($$props.isCreatable === void 0 && $$bindings.isCreatable && isCreatable !== void 0) $$bindings.isCreatable(isCreatable);
	if ($$props.isFocused === void 0 && $$bindings.isFocused && isFocused !== void 0) $$bindings.isFocused(isFocused);
	if ($$props.selectedValue === void 0 && $$bindings.selectedValue && selectedValue !== void 0) $$bindings.selectedValue(selectedValue);
	if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0) $$bindings.filterText(filterText);
	if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
	if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
	if ($$props.itemFilter === void 0 && $$bindings.itemFilter && itemFilter !== void 0) $$bindings.itemFilter(itemFilter);
	if ($$props.groupBy === void 0 && $$bindings.groupBy && groupBy !== void 0) $$bindings.groupBy(groupBy);
	if ($$props.groupFilter === void 0 && $$bindings.groupFilter && groupFilter !== void 0) $$bindings.groupFilter(groupFilter);
	if ($$props.isGroupHeaderSelectable === void 0 && $$bindings.isGroupHeaderSelectable && isGroupHeaderSelectable !== void 0) $$bindings.isGroupHeaderSelectable(isGroupHeaderSelectable);
	if ($$props.getGroupHeaderLabel === void 0 && $$bindings.getGroupHeaderLabel && getGroupHeaderLabel !== void 0) $$bindings.getGroupHeaderLabel(getGroupHeaderLabel);
	if ($$props.getOptionLabel === void 0 && $$bindings.getOptionLabel && getOptionLabel !== void 0) $$bindings.getOptionLabel(getOptionLabel);
	if ($$props.optionIdentifier === void 0 && $$bindings.optionIdentifier && optionIdentifier !== void 0) $$bindings.optionIdentifier(optionIdentifier);
	if ($$props.loadOptions === void 0 && $$bindings.loadOptions && loadOptions !== void 0) $$bindings.loadOptions(loadOptions);
	if ($$props.hasError === void 0 && $$bindings.hasError && hasError !== void 0) $$bindings.hasError(hasError);
	if ($$props.containerStyles === void 0 && $$bindings.containerStyles && containerStyles !== void 0) $$bindings.containerStyles(containerStyles);
	if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0) $$bindings.getSelectionLabel(getSelectionLabel);
	if ($$props.createGroupHeaderItem === void 0 && $$bindings.createGroupHeaderItem && createGroupHeaderItem !== void 0) $$bindings.createGroupHeaderItem(createGroupHeaderItem);
	if ($$props.createItem === void 0 && $$bindings.createItem && createItem !== void 0) $$bindings.createItem(createItem);
	if ($$props.isSearchable === void 0 && $$bindings.isSearchable && isSearchable !== void 0) $$bindings.isSearchable(isSearchable);
	if ($$props.inputStyles === void 0 && $$bindings.inputStyles && inputStyles !== void 0) $$bindings.inputStyles(inputStyles);
	if ($$props.isClearable === void 0 && $$bindings.isClearable && isClearable !== void 0) $$bindings.isClearable(isClearable);
	if ($$props.isWaiting === void 0 && $$bindings.isWaiting && isWaiting !== void 0) $$bindings.isWaiting(isWaiting);
	if ($$props.listPlacement === void 0 && $$bindings.listPlacement && listPlacement !== void 0) $$bindings.listPlacement(listPlacement);
	if ($$props.listOpen === void 0 && $$bindings.listOpen && listOpen !== void 0) $$bindings.listOpen(listOpen);
	if ($$props.list === void 0 && $$bindings.list && list !== void 0) $$bindings.list(list);
	if ($$props.isVirtualList === void 0 && $$bindings.isVirtualList && isVirtualList !== void 0) $$bindings.isVirtualList(isVirtualList);
	if ($$props.loadOptionsInterval === void 0 && $$bindings.loadOptionsInterval && loadOptionsInterval !== void 0) $$bindings.loadOptionsInterval(loadOptionsInterval);
	if ($$props.noOptionsMessage === void 0 && $$bindings.noOptionsMessage && noOptionsMessage !== void 0) $$bindings.noOptionsMessage(noOptionsMessage);
	if ($$props.hideEmptyState === void 0 && $$bindings.hideEmptyState && hideEmptyState !== void 0) $$bindings.hideEmptyState(hideEmptyState);
	if ($$props.filteredItems === void 0 && $$bindings.filteredItems && filteredItems !== void 0) $$bindings.filteredItems(filteredItems);
	if ($$props.inputAttributes === void 0 && $$bindings.inputAttributes && inputAttributes !== void 0) $$bindings.inputAttributes(inputAttributes);
	if ($$props.listAutoWidth === void 0 && $$bindings.listAutoWidth && listAutoWidth !== void 0) $$bindings.listAutoWidth(listAutoWidth);
	if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0) $$bindings.itemHeight(itemHeight);
	if ($$props.Icon === void 0 && $$bindings.Icon && Icon !== void 0) $$bindings.Icon(Icon);
	if ($$props.showChevron === void 0 && $$bindings.showChevron && showChevron !== void 0) $$bindings.showChevron(showChevron);
	if ($$props.handleClear === void 0 && $$bindings.handleClear && handleClear !== void 0) $$bindings.handleClear(handleClear);
	$$result.css.add(css$e);

	 {
		{
			containerClasses = `selectContainer`;
			containerClasses += isMulti ? " multiSelect" : "";
			containerClasses += isDisabled ? " disabled" : "";
			containerClasses += isFocused ? " focused" : "";
		}
	}

	 {
		{
			if (typeof selectedValue === "string") {
				selectedValue = {
					[optionIdentifier]: selectedValue,
					label: selectedValue
				};
			}
		}
	}

	let showSelectedItem = selectedValue && filterText.length === 0;
	let placeholderText = selectedValue ? "" : placeholder;

	 {
		{
			_inputAttributes = Object.assign(inputAttributes, {
				autocomplete: "off",
				autocorrect: "off",
				spellcheck: false
			});

			if (!isSearchable) {
				_inputAttributes.readonly = true;
			}
		}
	}

	 {
		{
			let _filteredItems;
			let _items = items;

			if (items && items.length > 0 && typeof items[0] !== "object") {
				_items = items.map((item, index) => {
					return { index, value: item, label: item };
				});
			}

			if (loadOptions && filterText.length === 0 && originalItemsClone) {
				_filteredItems = JSON.parse(originalItemsClone);
				_items = JSON.parse(originalItemsClone);
			} else {
				_filteredItems = loadOptions
				? filterText.length === 0 ? [] : _items
				: _items.filter(item => {
						let keepItem = true;

						if (isMulti && selectedValue) {
							keepItem = !selectedValue.find(value => {
								return value[optionIdentifier] === item[optionIdentifier];
							});
						}

						if (!keepItem) return false;
						if (filterText.length < 1) return true;
						return itemFilter(getOptionLabel(item, filterText), filterText, item);
					});
			}

			if (groupBy) {
				const groupValues = [];
				const groups = {};

				_filteredItems.forEach(item => {
					const groupValue = groupBy(item);

					if (!groupValues.includes(groupValue)) {
						groupValues.push(groupValue);
						groups[groupValue] = [];

						if (groupValue) {
							groups[groupValue].push(Object.assign(createGroupHeaderItem(groupValue, item), {
								id: groupValue,
								isGroupHeader: true,
								isSelectable: isGroupHeaderSelectable
							}));
						}
					}

					groups[groupValue].push(Object.assign({ isGroupItem: !!groupValue }, item));
				});

				const sortedGroupedItems = [];

				groupFilter(groupValues).forEach(groupValue => {
					sortedGroupedItems.push(...groups[groupValue]);
				});

				filteredItems = sortedGroupedItems;
			} else {
				filteredItems = _filteredItems;
			}
		}
	}

	return `

<div class="${escape(containerClasses) + "\n  " + escape(hasError ? "hasError" : "") + " svelte-cr4b6i"}"${add_attribute("style", containerStyles, 0)}${add_attribute("this", container, 1)}>${Icon
	? `${validate_component(Icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`
	: ``}

  ${isMulti && selectedValue && selectedValue.length > 0
	? `${validate_component(MultiSelection$1 || missing_component, "svelte:component").$$render(
			$$result,
			{
				selectedValue,
				getSelectionLabel,
				activeSelectedValue,
				isDisabled
			},
			{},
			{}
		)}`
	: ``}

  ${isDisabled
	? `<input${spread(
			[
				_inputAttributes,
				{ placeholder: escape(placeholderText) },
				{ style: escape(inputStyles) },
				{ disabled: true }
			],
			"svelte-cr4b6i"
		)}${add_attribute("this", input, 1)}${add_attribute("value", filterText, 1)}>`
	: `<input${spread(
			[
				_inputAttributes,
				{ placeholder: escape(placeholderText) },
				{ style: escape(inputStyles) }
			],
			"svelte-cr4b6i"
		)}${add_attribute("this", input, 1)}${add_attribute("value", filterText, 1)}>`}

  ${!isMulti && showSelectedItem
	? `<div class="${"selectedItem svelte-cr4b6i"}">${validate_component(Selection$1 || missing_component, "svelte:component").$$render($$result, { item: selectedValue, getSelectionLabel }, {}, {})}</div>`
	: ``}

  ${showSelectedItem && isClearable && !isDisabled && !isWaiting
	? `<div class="${"clearSelect svelte-cr4b6i"}"><svg width="${"100%"}" height="${"100%"}" viewBox="${"-2 -2 50 50"}" focusable="${"false"}" role="${"presentation"}" class="${"svelte-cr4b6i"}"><path fill="${"currentColor"}" d="${"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\n          l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"}"></path></svg></div>`
	: ``}

  ${showChevron && !selectedValue || !isSearchable && !isDisabled && !isWaiting && (showSelectedItem && !isClearable || !showSelectedItem)
	? `<div class="${"indicator svelte-cr4b6i"}"><svg width="${"100%"}" height="${"100%"}" viewBox="${"0 0 20 20"}" focusable="${"false"}" class="${"css-19bqh2r svelte-cr4b6i"}"><path d="${"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\n          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\n          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\n          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\n          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"}"></path></svg></div>`
	: ``}

  ${isWaiting
	? `<div class="${"spinner svelte-cr4b6i"}"><svg class="${"spinner_icon svelte-cr4b6i"}" viewBox="${"25 25 50 50"}"><circle class="${"spinner_path svelte-cr4b6i"}" cx="${"50"}" cy="${"50"}" r="${"20"}" fill="${"none"}" stroke="${"currentColor"}" stroke-width="${"5"}" stroke-miterlimit="${"10"}"></circle></svg></div>`
	: ``}</div>`;
});

/* src/components/Search.svelte generated by Svelte v3.21.0 */

const css$f = {
	code: "input.autocomplete-input{margin:0;padding:0}.search.svelte-172wrr3{width:22em;margin:1em;--height:2em;--placeholderColor:#73d56b;--cursor:text}",
	map: "{\"version\":3,\"file\":\"Search.svelte\",\"sources\":[\"Search.svelte\"],\"sourcesContent\":[\"<style>\\n    :global(input.autocomplete-input) {\\n        margin: 0;\\n        padding: 0;\\n    }\\n    .search {\\n        width: 22em;\\n        margin: 1em;\\n        --height: 2em;\\n        --placeholderColor: #73d56b;\\n        --cursor: text;\\n    }\\n</style>\\n\\n<script>\\n    import { goto } from '@sapper/app'\\n    import { onMount } from 'svelte'\\n    import Select from 'svelte-select'\\n    import { normalize } from '../components/NormalizePinyin.svelte'\\n\\n    let selectedTea\\n    let teas = []\\n\\n    onMount(async () => {\\n        const res = await fetch('https://api-tea.brutdethé.fr/api/v1/teas')\\n        if (res.ok) {\\n            teas = (await res.json()).api\\n            teas = teas.map(tea => ({\\n                value: normalize(tea.pinyin),\\n                label: tea.ideogram + ' - ' + normalize(tea.pinyin),\\n                group: tea.type\\n            }))\\n        } else {\\n            throw new Error(text)\\n        }\\n    })\\n</script>\\n\\n<div class=\\\"search\\\">\\n    <Select\\n        items=\\\"{teas}\\\"\\n        bind:selectedTea\\n        placeholder=\\\"rechercher un thé\\\"\\n        groupBy=\\\"{tea => tea.group}\\\"\\n        noOptionsMessage=\\\"aucun thé trouvé\\\"\\n        on:select=\\\"{tea => {\\n            window.location.replace(`/fiche-${tea.detail.value}`)\\n        }}\\\"\\n        inputStyles=\\\"cursor: text;\\\"\\n    />\\n</div>\\n\"],\"names\":[],\"mappings\":\"AACY,wBAAwB,AAAE,CAAC,AAC/B,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AACD,OAAO,eAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,QAAQ,CAAE,GAAG,CACb,kBAAkB,CAAE,OAAO,CAC3B,QAAQ,CAAE,IAAI,AAClB,CAAC\"}"
};

const Search = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let selectedTea;
	let teas = [];

	onMount(async () => {
		const res = await fetch("https://api-tea.brutdethé.fr/api/v1/teas");

		if (res.ok) {
			teas = (await res.json()).api;

			teas = teas.map(tea => ({
				value: normalize(tea.pinyin),
				label: tea.ideogram + " - " + normalize(tea.pinyin),
				group: tea.type
			}));
		} else {
			throw new Error(text);
		}
	});

	$$result.css.add(css$f);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `<div class="${"search svelte-172wrr3"}">${validate_component(Select, "Select").$$render(
			$$result,
			{
				items: teas,
				placeholder: "rechercher un thé",
				groupBy: tea => tea.group,
				noOptionsMessage: "aucun thé trouvé",
				inputStyles: "cursor: text;",
				selectedTea
			},
			{
				selectedTea: $$value => {
					selectedTea = $$value;
					$$settled = false;
				}
			},
			{}
		)}</div>`;
	} while (!$$settled);

	return $$rendered;
});

/* src/components/Nav.svelte generated by Svelte v3.21.0 */

const css$g = {
	code: "nav.svelte-op4cin{border-bottom:1px solid rgba(255, 62, 0, 0.1);font-weight:300}ul.svelte-op4cin{margin:0;padding:0}ul.svelte-op4cin::after{content:'';display:block;clear:both}li.svelte-op4cin{display:block;float:left}[aria-current].svelte-op4cin{position:relative;display:inline-block}[aria-current].svelte-op4cin::after{position:absolute;content:'';width:calc(100% - 1em);height:2px;background-color:rgb(255, 62, 0);display:block;bottom:-1px}a.svelte-op4cin{font-size:1.2em;text-decoration:none;padding:1em 1em 0.5em 0;display:block;color:#73d56b}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<style>\\n    nav {\\n        border-bottom: 1px solid rgba(255, 62, 0, 0.1);\\n        font-weight: 300;\\n    }\\n\\n    ul {\\n        margin: 0;\\n        padding: 0;\\n    }\\n\\n    /* clearfix */\\n    ul::after {\\n        content: '';\\n        display: block;\\n        clear: both;\\n    }\\n\\n    li {\\n        display: block;\\n        float: left;\\n    }\\n\\n    [aria-current] {\\n        position: relative;\\n        display: inline-block;\\n    }\\n\\n    [aria-current]::after {\\n        position: absolute;\\n        content: '';\\n        width: calc(100% - 1em);\\n        height: 2px;\\n        background-color: rgb(255, 62, 0);\\n        display: block;\\n        bottom: -1px;\\n    }\\n\\n    a {\\n        font-size: 1.2em;\\n        text-decoration: none;\\n        padding: 1em 1em 0.5em 0;\\n        display: block;\\n        color: #73d56b;\\n    }\\n</style>\\n\\n<script>\\n    import Search from '../components/Search.svelte'\\n    export let segment\\n</script>\\n\\n<nav>\\n    <ul>\\n        <li>\\n            <a\\n                aria-current=\\\"{segment === undefined ? 'page' : undefined}\\\"\\n                href=\\\".\\\"\\n            >\\n                Accueil\\n            </a>\\n        </li>\\n        <li>\\n            <a\\n                rel=\\\"prefetch\\\"\\n                href=\\\"https://wiki.brutdethé.fr\\\"\\n                aria-current=\\\"{segment === 'wiki' ? 'page' : undefined}\\\"\\n            >\\n                wiki\\n            </a>\\n        </li>\\n        <li>\\n            <a\\n                rel=\\\"prefetch\\\"\\n                href=\\\"termes\\\"\\n                aria-current=\\\"{segment === 'termes' ? 'page' : undefined}\\\"\\n            >\\n                termes\\n            </a>\\n        </li>\\n        <li>\\n            <Search />\\n        </li>\\n\\n    </ul>\\n</nav>\\n\"],\"names\":[],\"mappings\":\"AACI,GAAG,cAAC,CAAC,AACD,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9C,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,EAAE,cAAC,CAAC,AACA,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AAGD,gBAAE,OAAO,AAAC,CAAC,AACP,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACA,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACf,CAAC,AAED,CAAC,YAAY,CAAC,cAAC,CAAC,AACZ,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,AACzB,CAAC,AAED,CAAC,YAAY,eAAC,OAAO,AAAC,CAAC,AACnB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CACvB,MAAM,CAAE,GAAG,CACX,gBAAgB,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACjC,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,AAChB,CAAC,AAED,CAAC,cAAC,CAAC,AACC,SAAS,CAAE,KAAK,CAChB,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CACxB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,OAAO,AAClB,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$g);

	return `<nav class="${"svelte-op4cin"}"><ul class="${"svelte-op4cin"}"><li class="${"svelte-op4cin"}"><a${add_attribute("aria-current", segment === undefined ? "page" : undefined, 0)} href="${"."}" class="${"svelte-op4cin"}">Accueil
            </a></li>
        <li class="${"svelte-op4cin"}"><a rel="${"prefetch"}" href="${"https://wiki.brutdethé.fr"}"${add_attribute("aria-current", segment === "wiki" ? "page" : undefined, 0)} class="${"svelte-op4cin"}">wiki
            </a></li>
        <li class="${"svelte-op4cin"}"><a rel="${"prefetch"}" href="${"termes"}"${add_attribute("aria-current", segment === "termes" ? "page" : undefined, 0)} class="${"svelte-op4cin"}">termes
            </a></li>
        <li class="${"svelte-op4cin"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}</li></ul></nav>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.21.0 */

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);

	return `${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}
<main class="${"container"}">${$$slots.default ? $$slots.default({}) : ``}</main>`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// ressources/index.json.js
			pattern: /^\/ressources.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// ressources/[slug].json.js
			pattern: /^\/ressources\/([^\/]+?).json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes, preload: preload }
			]
		},

		{
			// liste-des-thes-[type].svelte
			pattern: /^\/liste-des-thes-([^\/]+?)\/?$/,
			parts: [
				{ name: "liste$45des$45thes$45$type", file: "liste-des-thes-[type].svelte", component: Liste_des_thes_u5Btypeu5D, preload: preload$1, params: match => ({ type: d(match[1]) }) }
			]
		},

		{
			// ressources/index.svelte
			pattern: /^\/ressources\/?$/,
			parts: [
				{ name: "ressources", file: "ressources/index.svelte", component: Ressources, preload: preload$2 }
			]
		},

		{
			// ressources/[slug].svelte
			pattern: /^\/ressources\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "ressources_$slug", file: "ressources/[slug].svelte", component: U5Bslugu5D, preload: preload$3, params: match => ({ slug: d(match[1]) }) }
			]
		},

		{
			// fiche-[pinyin].svelte
			pattern: /^\/fiche-([^\/]+?)\/?$/,
			parts: [
				{ name: "fiche$45$pinyin", file: "fiche-[pinyin].svelte", component: Fiche_u5Bpinyinu5D, preload: preload$4, params: match => ({ pinyin: d(match[1]) }) }
			]
		},

		{
			// termes.svelte
			pattern: /^\/termes\/?$/,
			parts: [
				{ name: "termes", file: "termes.svelte", component: Termes }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch$1(url, opts) {

	// allow custom promise
	if (!fetch$1.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch$1.Promise;

	// wrap http.request into fetch
	return new fetch$1.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch$1.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch$1(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch$1.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch$1.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  (assets => () => assets)(JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'max-age=600');

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		const session = session_getter(req, res);

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				if (opts) {
					opts = Object.assign({}, opts);

					const include_cookies = (
						opts.credentials === 'include' ||
						opts.credentials === 'same-origin' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
					);

					if (include_cookies) {
						opts.headers = Object.assign({}, opts.headers);

						const cookies = Object.assign(
							{},
							cookie.parse(req.headers.cookie || ''),
							cookie.parse(opts.headers.cookie || '')
						);

						const set_cookie = res.getHeader('Set-Cookie');
						(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
							const match = /([^=]+)=([^;]+)/.exec(str);
							if (match) cookies[match[1]] = match[2];
						});

						const str = Object.keys(cookies)
							.map(key => `${key}=${cookies[key]}`)
							.join('; ');

						opts.headers.cookie = str;
					}
				}

				return fetch$1(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && try_serialize(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'max-age=31536000, immutable'
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs.readFileSync(path.join(build_dir, file)))).get(file);

	return (req, res, next) => {
		if (filter(req)) {
			const type = lite.getType(req.path);

			try {
				const file = path.posix.normalize(decodeURIComponent(req.path));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
