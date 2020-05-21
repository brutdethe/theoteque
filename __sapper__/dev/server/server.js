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

const md = require('markdown-it')().use(require('markdown-it-footnote'));

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

/* src/routes/index.svelte generated by Svelte v3.21.0 */

const css = {
	code: ".banner.svelte-ee58ur.svelte-ee58ur{width:100vw;margin-left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;min-height:610px;padding:0;color:#002920;text-align:center;background:url(/assets/danslajungle.png) center center no-repeat}.banner.svelte-ee58ur h1.svelte-ee58ur{margin:0}.banner.svelte-ee58ur h1.svelte-ee58ur{margin-right:0.5em;margin-left:0.5em;padding:0;font-size:3.2em;color:#002920;text-transform:uppercase}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<style>\\n    .banner {\\n        width: 100vw;\\n        margin-left: 50%;\\n        transform: translateX(-50%);\\n        display: flex;\\n        align-items: center;\\n        justify-content: center;\\n        min-height: 610px;\\n        padding: 0;\\n        color: #002920;\\n        text-align: center;\\n        background: url(/assets/danslajungle.png) center center no-repeat;\\n    }\\n\\n    .banner h1 {\\n        margin: 0;\\n    }\\n\\n    .banner h1 {\\n        margin-right: 0.5em;\\n        margin-left: 0.5em;\\n        padding: 0;\\n        font-size: 3.2em;\\n        color: #002920;\\n        text-transform: uppercase;\\n    }\\n</style>\\n\\n<svelte:head>\\n    <title>Broutille</title>\\n</svelte:head>\\n\\n<article class=\\\"blobContent\\\" data-title=\\\"content\\\">\\n    <div class=\\\"banner\\\">\\n        <h1>broutille</h1>\\n    </div>\\n\\n    <h2 id=\\\"pourquoi-\\\">Pourquoi ?</h2>\\n\\n    <p>\\n        Ce site présente des ressources pour vous inviter à découvrir ou\\n        approfondir vos connaissances sur les thés de Chine et de Taiwan et à\\n        explorer une approche traditionnelle et artisanale des thés.\\n    </p>\\n\\n    <h2 id=\\\"qui-sommes-nous-\\\">Qui sommes-nous ?</h2>\\n\\n    <p>\\n        Ya-Lin, Thaïs et Stéphane partagent la même passion, ielles documentent\\n        et tentent des expériences autour de l'art chinois du thé.\\n    </p>\\n\\n    <p>\\n        <a href=\\\"/nous-contacter\\\">Nous contacter</a>\\n    </p>\\n\\n    <h2 id=\\\"philosophie\\\">Philosophie</h2>\\n\\n    <p>\\n        Si vous découvrez le monde des thés authentiques, les indications\\n        prodiguées dans ce site vous permettront de découvrir une porte\\n        d’entrée. Par la suite, vous comprendrez peu à peu que chaque thé,\\n        chaque instant de dégustation et chaque personne étant différents toutes\\n        ces indications utiles au départ se révéleront pauvres au regard de vos\\n        intuitions.\\n    </p>\\n\\n    <hr />\\n\\n    <h2 id=\\\"quelques-actions--\\\">Quelques actions :</h2>\\n\\n    <h2 id=\\\"les-journées-de-cogitation-sur-le-thé\\\">\\n        Les journées de cogitation sur le thé\\n    </h2>\\n\\n    <p>\\n        Ces journées sont organisées sous la forme de randos-urbaines. Un\\n        parcours de lieux insolites est proposé aux participant·e·s.\\n        <br />\\n        À chaque étape on déguste et on échange sur le monde du thé authentique.\\n    </p>\\n\\n    <ul>\\n        <li>\\n            <a href=\\\"https://thedechine.oisiflorus.com/nantes\\\">Nantes</a>\\n            - 18 mars 2020 (annulée - COVID-19)\\n        </li>\\n        <li>\\n            <a href=\\\"https://thedechine.oisiflorus.com/montpellier\\\">\\n                Montpellier\\n            </a>\\n            - 12 février 2020\\n        </li>\\n    </ul>\\n\\n    <h2 id=\\\"documentation-sur-le-thé\\\">Documentation sur le thé</h2>\\n\\n    <p>🚧 : Les articles sont encore en phase de construction</p>\\n\\n    <h3 id=\\\"quelques-bases\\\">Quelques bases</h3>\\n\\n    <ul>\\n        <li>\\n            <a href=\\\"/documentation/les-types-de-thes\\\">Les 7 types de thés</a>\\n            : Pour en savoir plus sur le classement des thés. - 🚧\\n        </li>\\n        <li>\\n            <a href=\\\"/documentation/processus-de-fabrication-du-the\\\">\\n                Les processus de fabrication\\n            </a>\\n            : Les différentes étapes pour fabriquer chaque type de thé. - 🚧\\n        </li>\\n    </ul>\\n\\n    <h3 id=\\\"la-boite-à-outils\\\">La boite à outils</h3>\\n\\n    <ul>\\n        <li>\\n            <a href=\\\"/documentation/table-d-infusion\\\">Table d’infusion</a>\\n            - 🚧\\n        </li>\\n    </ul>\\n\\n    <h2 id=\\\"quelques-lieux-de-thés-prévenants\\\">\\n        Quelques lieux de thés prévenants\\n    </h2>\\n\\n    <h3 id=\\\"nantes\\\">Nantes</h3>\\n\\n    <ul>\\n        <li>\\n            <a\\n                href=\\\"https://danslajungle.oisiflorus.com/nantes/ojacaranda.html\\\"\\n            >\\n                Ôjacaranda\\n            </a>\\n            : Un salon de thé authentique\\n        </li>\\n        <li>\\n            <a\\n                href=\\\"https://danslajungle.oisiflorus.com/nantes/theine-maison-de-the.html\\\"\\n            >\\n                Théine\\n            </a>\\n            : Petite boutique dans le coeur de ville qui propose des thés et des\\n            céramiques du Japon et de Chine\\n        </li>\\n    </ul>\\n\\n    <h3 id=\\\"montpellier\\\">Montpellier</h3>\\n\\n    <ul>\\n        <li>\\n            <a\\n                href=\\\"https://danslajungle.oisiflorus.com/montpellier/theod-art.html\\\"\\n            >\\n                Théod’art\\n            </a>\\n            : Théo d’Art est un endroit idéal pour profiter d’un thé de Chine\\n            entre amis\\n        </li>\\n    </ul>\\n</article>\\n\"],\"names\":[],\"mappings\":\"AACI,OAAO,4BAAC,CAAC,AACL,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,IAAI,wBAAwB,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC,SAAS,AACrE,CAAC,AAED,qBAAO,CAAC,EAAE,cAAC,CAAC,AACR,MAAM,CAAE,CAAC,AACb,CAAC,AAED,qBAAO,CAAC,EAAE,cAAC,CAAC,AACR,YAAY,CAAE,KAAK,CACnB,WAAW,CAAE,KAAK,CAClB,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,OAAO,CACd,cAAc,CAAE,SAAS,AAC7B,CAAC\"}"
};

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title>Broutille</title>`, "")}`, "")}

<article class="${"blobContent"}" data-title="${"content"}"><div class="${"banner svelte-ee58ur"}"><h1 class="${"svelte-ee58ur"}">broutille</h1></div>

    <h2 id="${"pourquoi-"}">Pourquoi ?</h2>

    <p>Ce site présente des ressources pour vous inviter à découvrir ou
        approfondir vos connaissances sur les thés de Chine et de Taiwan et à
        explorer une approche traditionnelle et artisanale des thés.
    </p>

    <h2 id="${"qui-sommes-nous-"}">Qui sommes-nous ?</h2>

    <p>Ya-Lin, Thaïs et Stéphane partagent la même passion, ielles documentent
        et tentent des expériences autour de l&#39;art chinois du thé.
    </p>

    <p><a href="${"/nous-contacter"}">Nous contacter</a></p>

    <h2 id="${"philosophie"}">Philosophie</h2>

    <p>Si vous découvrez le monde des thés authentiques, les indications
        prodiguées dans ce site vous permettront de découvrir une porte
        d’entrée. Par la suite, vous comprendrez peu à peu que chaque thé,
        chaque instant de dégustation et chaque personne étant différents toutes
        ces indications utiles au départ se révéleront pauvres au regard de vos
        intuitions.
    </p>

    <hr>

    <h2 id="${"quelques-actions--"}">Quelques actions :</h2>

    <h2 id="${"les-journées-de-cogitation-sur-le-thé"}">Les journées de cogitation sur le thé
    </h2>

    <p>Ces journées sont organisées sous la forme de randos-urbaines. Un
        parcours de lieux insolites est proposé aux participant·e·s.
        <br>
        À chaque étape on déguste et on échange sur le monde du thé authentique.
    </p>

    <ul><li><a href="${"https://thedechine.oisiflorus.com/nantes"}">Nantes</a>
            - 18 mars 2020 (annulée - COVID-19)
        </li>
        <li><a href="${"https://thedechine.oisiflorus.com/montpellier"}">Montpellier
            </a>
            - 12 février 2020
        </li></ul>

    <h2 id="${"documentation-sur-le-thé"}">Documentation sur le thé</h2>

    <p>🚧 : Les articles sont encore en phase de construction</p>

    <h3 id="${"quelques-bases"}">Quelques bases</h3>

    <ul><li><a href="${"/documentation/les-types-de-thes"}">Les 7 types de thés</a>
            : Pour en savoir plus sur le classement des thés. - 🚧
        </li>
        <li><a href="${"/documentation/processus-de-fabrication-du-the"}">Les processus de fabrication
            </a>
            : Les différentes étapes pour fabriquer chaque type de thé. - 🚧
        </li></ul>

    <h3 id="${"la-boite-à-outils"}">La boite à outils</h3>

    <ul><li><a href="${"/documentation/table-d-infusion"}">Table d’infusion</a>
            - 🚧
        </li></ul>

    <h2 id="${"quelques-lieux-de-thés-prévenants"}">Quelques lieux de thés prévenants
    </h2>

    <h3 id="${"nantes"}">Nantes</h3>

    <ul><li><a href="${"https://danslajungle.oisiflorus.com/nantes/ojacaranda.html"}">Ôjacaranda
            </a>
            : Un salon de thé authentique
        </li>
        <li><a href="${"https://danslajungle.oisiflorus.com/nantes/theine-maison-de-the.html"}">Théine
            </a>
            : Petite boutique dans le coeur de ville qui propose des thés et des
            céramiques du Japon et de Chine
        </li></ul>

    <h3 id="${"montpellier"}">Montpellier</h3>

    <ul><li><a href="${"https://danslajungle.oisiflorus.com/montpellier/theod-art.html"}">Théod’art
            </a>
            : Théo d’Art est un endroit idéal pour profiter d’un thé de Chine
            entre amis
        </li></ul></article>`;
});

/* src/components/IconTeaType.svelte generated by Svelte v3.21.0 */

const css$1 = {
	code: "div.svelte-lmn4a6{display:inline-block;border:1px solid black;width:2em;height:2em;margin:0 0.5em;-webkit-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);-moz-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1)}",
	map: "{\"version\":3,\"file\":\"IconTeaType.svelte\",\"sources\":[\"IconTeaType.svelte\"],\"sourcesContent\":[\"<style>\\n    div {\\n        display: inline-block;\\n        border: 1px solid black;\\n        width: 2em;\\n        height: 2em;\\n        margin: 0 0.5em;\\n        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n    }\\n</style>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n\\n    export let type\\n\\n    let types = []\\n\\n    onMount(async () => {\\n        const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/type`)\\n\\n        if (res.ok) {\\n            types = (await res.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n\\n    function getColor(typeParam, types) {\\n        const typeFind =\\n            types.filter(type => type.ideogram === typeParam)[0] || {}\\n        return 'color' in typeFind ? typeFind.color : 'white'\\n    }\\n</script>\\n\\n<div style=\\\"background: {getColor(type, types)}\\\"></div>\\n\"],\"names\":[],\"mappings\":\"AACI,GAAG,cAAC,CAAC,AACD,OAAO,CAAE,YAAY,CACrB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,CAAC,CAAC,KAAK,CACf,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAC1D,eAAe,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACvD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AACtD,CAAC\"}"
};

function getColor(typeParam, types) {
	const typeFind = types.filter(type => type.ideogram === typeParam)[0] || {};
	return "color" in typeFind ? typeFind.color : "white";
}

const IconTeaType = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { type } = $$props;
	let types = [];

	onMount(async () => {
		const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/type`);

		if (res.ok) {
			types = (await res.json()).api;
		} else {
			// 404
			throw new Error(text);
		}
	});

	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	$$result.css.add(css$1);
	return `<div style="${"background: " + escape(getColor(type, types))}" class="${"svelte-lmn4a6"}"></div>`;
});

/* src/routes/liste-des-thes-[type].svelte generated by Svelte v3.21.0 */

const css$2 = {
	code: "h3.svelte-ycjrao.svelte-ycjrao{text-align:left;margin-top:2em;font-weight:normal;font-size:2em}.ideogram-pinyin.svelte-ycjrao.svelte-ycjrao{display:inline-block}.pinyin.svelte-ycjrao.svelte-ycjrao{font-size:0.7em;color:#999;font-weight:normal}p.svelte-ycjrao.svelte-ycjrao{margin:0;padding:0}.ideogram.svelte-ycjrao.svelte-ycjrao{font-weight:normal;font-size:1em}.teas.svelte-ycjrao td.svelte-ycjrao,.teas.svelte-ycjrao th.svelte-ycjrao{font-size:0.8em;border:1px solid #ccc}.teas.svelte-ycjrao td:first-child .ideogram.svelte-ycjrao{font-size:1.2em;text-decoration:underline;width:90px}ul.svelte-ycjrao.svelte-ycjrao{font-size:0.8em;list-style:none;padding:0;margin:0}",
	map: "{\"version\":3,\"file\":\"liste-des-thes-[type].svelte\",\"sources\":[\"liste-des-thes-[type].svelte\"],\"sourcesContent\":[\"<style>\\n    h3 {\\n        text-align: left;\\n        margin-top: 2em;\\n        font-weight: normal;\\n        font-size: 2em;\\n    }\\n    .ideogram-pinyin {\\n        display: inline-block;\\n    }\\n    .pinyin {\\n        font-size: 0.7em;\\n        color: #999;\\n        font-weight: normal;\\n    }\\n    p {\\n        margin: 0;\\n        padding: 0;\\n    }\\n    .ideogram {\\n        font-weight: normal;\\n        font-size: 1em;\\n    }\\n    .teas td,\\n    .teas th {\\n        font-size: 0.8em;\\n        border: 1px solid #ccc;\\n    }\\n\\n    .teas td:first-child .ideogram {\\n        font-size: 1.2em;\\n        text-decoration: underline;\\n        width: 90px;\\n    }\\n    ul {\\n        font-size: 0.8em;\\n        list-style: none;\\n        padding: 0;\\n        margin: 0;\\n    }\\n</style>\\n\\n<script context=\\\"module\\\">\\n    export function preload(page) {\\n        return { typeParam: page.params.type }\\n    }\\n</script>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n    import IconTeaType from '../components/IconTeaType.svelte'\\n\\n    export let typeParam\\n\\n    let teas = []\\n    let types = []\\n    let i18n = []\\n\\n    onMount(async () => {\\n        const res = await fetch('https://api-tea.oisiflorus.com/api/v1/teas')\\n\\n        if (res.ok) {\\n            teas = (await res.json()).api\\n        } else {\\n            throw new Error(text)\\n        }\\n\\n        const res1 = await fetch('https://api-tea.oisiflorus.com/api/v1/type')\\n\\n        if (res1.ok) {\\n            types = (await res1.json()).api.map(type => type.ideogram)\\n        } else {\\n            throw new Error(text)\\n        }\\n\\n        const res2 = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`)\\n\\n        if (res2.ok) {\\n            i18n = (await res2.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n\\n    const typeToDisplay = () =>\\n        types.includes(typeParam) ? [typeParam] : types\\n    const getTeasByType = (type, teas) => teas.filter(tea => tea.type === type)\\n\\n    function getPinyin(text, i18n) {\\n        const term = i18n.filter(term => term.ideogram === text)[0] || {}\\n        return 'pinyin' in term ? term.pinyin : '-'\\n    }\\n</script>\\n\\n<h2>Liste des thés par type</h2>\\n<p>\\n    Cette liste regroupe l'ensemble des thés proposés sur le site. Pour voir le\\n    détail d'un thé suivez le lien sur son nom.\\n</p>\\n\\n<svelte:head>\\n    <title>Liste des thés</title>\\n</svelte:head>\\n<div class=\\\"teas\\\">\\n    {#each typeToDisplay(typeParam, types) as type}\\n        <h3 id=\\\"{type}\\\">\\n            <div class=\\\"ideogram-pinyin\\\">\\n                <p class=\\\"ideogram\\\">{type}</p>\\n                <p class=\\\"pinyin\\\">{getPinyin(type, i18n)}</p>\\n            </div>\\n            <IconTeaType {type} />\\n        </h3>\\n        <table>\\n            <thead>\\n                <tr>\\n                    <th>nom</th>\\n                    <th>familles</th>\\n                    <th>récoltes</th>\\n                    <th>cultivarss</th>\\n                    <th>provinces</th>\\n                    <th>villes</th>\\n                    <th>ceuillettes</th>\\n                    <th>altitudes</th>\\n                    <th>oxydations</th>\\n                </tr>\\n            </thead>\\n            <tbody>\\n                {#each getTeasByType(type, teas) as tea}\\n                    <tr>\\n                        <td>\\n                            <a href=\\\"fiche-{tea.ideogram}\\\">\\n                                <div>\\n                                    <p class=\\\"ideogram\\\">{tea.ideogram}</p>\\n                                    <p class=\\\"pinyin\\\">\\n                                        {getPinyin(tea.ideogram, i18n)}\\n                                    </p>\\n                                </div>\\n                            </a>\\n                        </td>\\n                        <td>\\n                            {#if tea.families}\\n                                {#each tea.families as family}\\n                                    <div>\\n                                        <p class=\\\"ideogram\\\">{family}</p>\\n                                        <p class=\\\"pinyin\\\">\\n                                            {getPinyin(family, i18n)}\\n                                        </p>\\n                                    </div>\\n                                {/each}\\n                            {:else}-{/if}\\n                        </td>\\n                        <td>{tea.harvests || '-'}</td>\\n                        <td>\\n                            {#if tea.cultivars}\\n                                {#if typeof tea.cultivars === 'string'}\\n                                    <div>\\n                                        <p class=\\\"ideogram\\\">{tea.cultivars}</p>\\n                                        <p class=\\\"pinyin\\\">\\n                                            {getPinyin(tea.cultivars, i18n)}\\n                                        </p>\\n                                    </div>\\n                                {:else}\\n                                    <ul>\\n                                        {#each tea.cultivars as cultivars}\\n                                            <li>\\n                                                {cultivars} - {getPinyin(cultivars, i18n)}\\n                                            </li>\\n                                        {/each}\\n                                    </ul>\\n                                {/if}\\n                            {:else}-{/if}\\n                        </td>\\n                        <td>\\n                            {#if tea.provinces}\\n                                {#if typeof tea.provinces === 'string'}\\n                                    <div>\\n                                        <p class=\\\"ideogram\\\">{tea.provinces}</p>\\n                                        <p class=\\\"pinyin\\\">\\n                                            {getPinyin(tea.provinces, i18n)}\\n                                        </p>\\n                                    </div>\\n                                {:else}\\n                                    <ul>\\n                                        {#each tea.provinces as provinces}\\n                                            <li>\\n                                                {provinces} - {getPinyin(provinces, i18n)}\\n                                            </li>\\n                                        {/each}\\n                                    </ul>\\n                                {/if}\\n                            {:else}-{/if}\\n                        </td>\\n                        <td>\\n                            {#if tea.towns}\\n                                {#if typeof tea.towns === 'string'}\\n                                    <div>\\n                                        <p class=\\\"ideogram\\\">{tea.towns}</p>\\n                                        <p class=\\\"pinyin\\\">\\n                                            {getPinyin(tea.towns, i18n)}\\n                                        </p>\\n                                    </div>\\n                                {:else}\\n                                    <ul>\\n                                        {#each tea.towns as towns}\\n                                            <li>\\n                                                {towns} - {getPinyin(towns, i18n)}\\n                                            </li>\\n                                        {/each}\\n                                    </ul>\\n                                {/if}\\n                            {:else}-{/if}\\n                        </td>\\n                        <td>\\n                            {#if tea.pickings}\\n                                {#if typeof tea.pickings === 'string'}\\n                                    <div>\\n                                        <p class=\\\"ideogram\\\">{tea.pickings}</p>\\n                                        <p class=\\\"pinyin\\\">\\n                                            {getPinyin(tea.pickings, i18n)}\\n                                        </p>\\n                                    </div>\\n                                {:else}\\n                                    <ul>\\n                                        {#each tea.pickings as pick}\\n                                            <li>\\n                                                {pick} - {getPinyin(pick, i18n)}\\n                                            </li>\\n                                        {/each}\\n                                    </ul>\\n                                {/if}\\n                            {:else}-{/if}\\n                        </td>\\n                        <td>{tea.elevations || '-'}</td>\\n                        <td>{tea.oxidations || '-'}</td>\\n                    </tr>\\n                {:else}\\n                    <!-- this block renders when teas.length === 0 -->\\n                    <p>chargement des thés...</p>\\n                {/each}\\n            </tbody>\\n        </table>\\n    {:else}\\n        <!-- this block renders when teas.length === 0 -->\\n        <p>chargement des types thés...</p>\\n    {/each}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AACI,EAAE,4BAAC,CAAC,AACA,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,GAAG,CACf,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,GAAG,AAClB,CAAC,AACD,gBAAgB,4BAAC,CAAC,AACd,OAAO,CAAE,YAAY,AACzB,CAAC,AACD,OAAO,4BAAC,CAAC,AACL,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,MAAM,AACvB,CAAC,AACD,CAAC,4BAAC,CAAC,AACC,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AACD,SAAS,4BAAC,CAAC,AACP,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,GAAG,AAClB,CAAC,AACD,mBAAK,CAAC,gBAAE,CACR,mBAAK,CAAC,EAAE,cAAC,CAAC,AACN,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC1B,CAAC,AAED,mBAAK,CAAC,EAAE,YAAY,CAAC,SAAS,cAAC,CAAC,AAC5B,SAAS,CAAE,KAAK,CAChB,eAAe,CAAE,SAAS,CAC1B,KAAK,CAAE,IAAI,AACf,CAAC,AACD,EAAE,4BAAC,CAAC,AACA,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,AACb,CAAC\"}"
};

function preload(page) {
	return { typeParam: page.params.type };
}

function getPinyin(text, i18n) {
	const term = i18n.filter(term => term.ideogram === text)[0] || {};
	return "pinyin" in term ? term.pinyin : "-";
}

const Liste_des_thes_u5Btypeu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { typeParam } = $$props;
	let teas = [];
	let types = [];
	let i18n = [];

	onMount(async () => {
		const res = await fetch("https://api-tea.oisiflorus.com/api/v1/teas");

		if (res.ok) {
			teas = (await res.json()).api;
		} else {
			throw new Error(text);
		}

		const res1 = await fetch("https://api-tea.oisiflorus.com/api/v1/type");

		if (res1.ok) {
			types = (await res1.json()).api.map(type => type.ideogram);
		} else {
			throw new Error(text);
		}

		const res2 = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`);

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

	return `<h2>Liste des thés par type</h2>
<p class="${"svelte-ycjrao"}">Cette liste regroupe l&#39;ensemble des thés proposés sur le site. Pour voir le
    détail d&#39;un thé suivez le lien sur son nom.
</p>

${($$result.head += `${($$result.title = `<title>Liste des thés</title>`, "")}`, "")}
<div class="${"teas svelte-ycjrao"}">${typeToDisplay().length
	? each(typeToDisplay(), type => `<h3${add_attribute("id", type, 0)} class="${"svelte-ycjrao"}"><div class="${"ideogram-pinyin svelte-ycjrao"}"><p class="${"ideogram svelte-ycjrao"}">${escape(type)}</p>
                <p class="${"pinyin svelte-ycjrao"}">${escape(getPinyin(type, i18n))}</p></div>
            ${validate_component(IconTeaType, "IconTeaType").$$render($$result, { type }, {}, {})}</h3>
        <table><thead><tr><th class="${"svelte-ycjrao"}">nom</th>
                    <th class="${"svelte-ycjrao"}">familles</th>
                    <th class="${"svelte-ycjrao"}">récoltes</th>
                    <th class="${"svelte-ycjrao"}">cultivarss</th>
                    <th class="${"svelte-ycjrao"}">provinces</th>
                    <th class="${"svelte-ycjrao"}">villes</th>
                    <th class="${"svelte-ycjrao"}">ceuillettes</th>
                    <th class="${"svelte-ycjrao"}">altitudes</th>
                    <th class="${"svelte-ycjrao"}">oxydations</th>
                </tr></thead>
            <tbody>${getTeasByType(type, teas).length
		? each(getTeasByType(type, teas), tea => `<tr><td class="${"svelte-ycjrao"}"><a href="${"fiche-" + escape(tea.ideogram)}"><div><p class="${"ideogram svelte-ycjrao"}">${escape(tea.ideogram)}</p>
                                    <p class="${"pinyin svelte-ycjrao"}">${escape(getPinyin(tea.ideogram, i18n))}
                                    </p></div>
                            </a></td>
                        <td class="${"svelte-ycjrao"}">${tea.families
			? `${each(tea.families, family => `<div><p class="${"ideogram svelte-ycjrao"}">${escape(family)}</p>
                                        <p class="${"pinyin svelte-ycjrao"}">${escape(getPinyin(family, i18n))}</p>
                                    </div>`)}`
			: `-`}</td>
                        <td class="${"svelte-ycjrao"}">${escape(tea.harvests || "-")}</td>
                        <td class="${"svelte-ycjrao"}">${tea.cultivars
			? `${typeof tea.cultivars === "string"
				? `<div><p class="${"ideogram svelte-ycjrao"}">${escape(tea.cultivars)}</p>
                                        <p class="${"pinyin svelte-ycjrao"}">${escape(getPinyin(tea.cultivars, i18n))}</p>
                                    </div>`
				: `<ul class="${"svelte-ycjrao"}">${each(tea.cultivars, cultivars => `<li>${escape(cultivars)} - ${escape(getPinyin(cultivars, i18n))}
                                            </li>`)}
                                    </ul>`}`
			: `-`}</td>
                        <td class="${"svelte-ycjrao"}">${tea.provinces
			? `${typeof tea.provinces === "string"
				? `<div><p class="${"ideogram svelte-ycjrao"}">${escape(tea.provinces)}</p>
                                        <p class="${"pinyin svelte-ycjrao"}">${escape(getPinyin(tea.provinces, i18n))}</p>
                                    </div>`
				: `<ul class="${"svelte-ycjrao"}">${each(tea.provinces, provinces => `<li>${escape(provinces)} - ${escape(getPinyin(provinces, i18n))}
                                            </li>`)}
                                    </ul>`}`
			: `-`}</td>
                        <td class="${"svelte-ycjrao"}">${tea.towns
			? `${typeof tea.towns === "string"
				? `<div><p class="${"ideogram svelte-ycjrao"}">${escape(tea.towns)}</p>
                                        <p class="${"pinyin svelte-ycjrao"}">${escape(getPinyin(tea.towns, i18n))}</p>
                                    </div>`
				: `<ul class="${"svelte-ycjrao"}">${each(tea.towns, towns => `<li>${escape(towns)} - ${escape(getPinyin(towns, i18n))}
                                            </li>`)}
                                    </ul>`}`
			: `-`}</td>
                        <td class="${"svelte-ycjrao"}">${tea.pickings
			? `${typeof tea.pickings === "string"
				? `<div><p class="${"ideogram svelte-ycjrao"}">${escape(tea.pickings)}</p>
                                        <p class="${"pinyin svelte-ycjrao"}">${escape(getPinyin(tea.pickings, i18n))}</p>
                                    </div>`
				: `<ul class="${"svelte-ycjrao"}">${each(tea.pickings, pick => `<li>${escape(pick)} - ${escape(getPinyin(pick, i18n))}
                                            </li>`)}
                                    </ul>`}`
			: `-`}</td>
                        <td class="${"svelte-ycjrao"}">${escape(tea.elevations || "-")}</td>
                        <td class="${"svelte-ycjrao"}">${escape(tea.oxidations || "-")}</td>
                    </tr>`)
		: `
                    <p class="${"svelte-ycjrao"}">chargement des thés...</p>`}</tbody>
        </table>`)
	: `
        <p class="${"svelte-ycjrao"}">chargement des types thés...</p>`}</div>`;
});

/* src/routes/nous-contacter.svelte generated by Svelte v3.21.0 */

const Nous_contacter = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<h2>Nous contacter</h2>

<p>Tu peux nous poser des questions par mail On pourra par la suite soit se
    rencontrer en présentiel ou bien en visio-conférence
</p>

<h2>Par email</h2>
Au choix : - [Stéphane](mailto:stephane@scopyleft.fr) -
[Thaïs](mailto:thais.e@hotmail.fr) - [Ya-Lin](mailto:bizienyalin@gmail.com)
<h3>Sur Mastodon</h3>
- [Stéphane](https://eldritch.cafe/@pntbr) C&#39;est quoi
[mastodon](https://fr.wikipedia.org/wiki/Mastodon_(r%C3%A9seau_social)) ?
<h3>Avec Slack</h3>
<p>Tu peux aussi demander à nous rejoindre pour échanger avec nous :
    <a href="${"https://oisiflorus.slack.com"}">oisiflorus.slack.com</a></p>
<p>C&#39;est quoi
    <a href="${"https://fr.wikipedia.org/wiki/Slack"}">slack</a>
    ?
</p>`;
});

/* src/routes/documentation/index.svelte generated by Svelte v3.21.0 */

const css$3 = {
	code: ".ghTreeTitle.svelte-1jrqtgm a.svelte-1jrqtgm{color:#73d56b}.ghTreeTitle.svelte-1jrqtgm a.svelte-1jrqtgm:hover{color:rgb(56, 153, 47)}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<style>\\n    .ghTreeTitle a {\\n        color: #73d56b;\\n    }\\n\\n    .ghTreeTitle a:hover {\\n        color: rgb(56, 153, 47);\\n    }\\n</style>\\n\\n<script context=\\\"module\\\">\\n    export function preload({ params, query }) {\\n        return this.fetch(`documentation.json`)\\n            .then(r => r.json())\\n            .then(posts => {\\n                return { posts }\\n            })\\n    }\\n</script>\\n\\n<script>\\n    export let posts\\n</script>\\n\\n<svelte:head>\\n    <title>Documentation sur les thés</title>\\n</svelte:head>\\n\\n<section id=\\\"ghTree\\\" class=\\\"ghTree\\\" data-title=\\\"tree\\\">\\n    <header>\\n        <h1>Liste des articles</h1>\\n    </header>\\n\\n    {#each posts as post}\\n        <!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n\\n        <article class=\\\"ghTreeItem ghTypeFile\\\" data-title=\\\"dir\\\">\\n            <h2 class=\\\"ghTreeTitle\\\">\\n                <a\\n                    rel=\\\"prefetch\\\"\\n                    class=\\\"folderLink\\\"\\n                    data-title=\\\"folderLink\\\"\\n                    href=\\\"documentation/{post.lien}\\\"\\n                >\\n                    {post.titre}\\n                </a>\\n            </h2>\\n            <p class=\\\"ghTreeExcerpt\\\" data-title=\\\"fileExcerpt\\\">\\n                {post.description}\\n            </p>\\n            <a\\n                class=\\\"ghTreeReadmore\\\"\\n                title=\\\"Lire la suite de la fiche : {post.titre}\\\"\\n                data-title=\\\"fileReadmoreLink\\\"\\n                href=\\\"documentation/{post.lien}\\\"\\n            >\\n                Lire la suite de la fiche\\n            </a>\\n        </article>\\n    {/each}\\n</section>\\n\"],\"names\":[],\"mappings\":\"AACI,2BAAY,CAAC,CAAC,eAAC,CAAC,AACZ,KAAK,CAAE,OAAO,AAClB,CAAC,AAED,2BAAY,CAAC,gBAAC,MAAM,AAAC,CAAC,AAClB,KAAK,CAAE,IAAI,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,AAC3B,CAAC\"}"
};

function preload$1({ params, query }) {
	return this.fetch(`documentation.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Documentation = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css$3);

	return `${($$result.head += `${($$result.title = `<title>Documentation sur les thés</title>`, "")}`, "")}

<section id="${"ghTree"}" class="${"ghTree"}" data-title="${"tree"}"><header><h1>Liste des articles</h1></header>

    ${each(posts, post => `

        <article class="${"ghTreeItem ghTypeFile"}" data-title="${"dir"}"><h2 class="${"ghTreeTitle svelte-1jrqtgm"}"><a rel="${"prefetch"}" class="${"folderLink svelte-1jrqtgm"}" data-title="${"folderLink"}" href="${"documentation/" + escape(post.lien)}">${escape(post.titre)}
                </a></h2>
            <p class="${"ghTreeExcerpt"}" data-title="${"fileExcerpt"}">${escape(post.description)}</p>
            <a class="${"ghTreeReadmore"}" title="${"Lire la suite de la fiche : " + escape(post.titre)}" data-title="${"fileReadmoreLink"}" href="${"documentation/" + escape(post.lien)}">Lire la suite de la fiche
            </a>
        </article>`)}</section>`;
});

/* src/routes/documentation/[slug].svelte generated by Svelte v3.21.0 */

const css$4 = {
	code: ".content.svelte-9deje h2{font-size:1.4em;font-weight:500}.content.svelte-9deje pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0, 0, 0, 0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-9deje pre code{background-color:transparent;padding:0}.content.svelte-9deje ul{line-height:1.5}.content.svelte-9deje li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<style>\\n    /*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n    .content :global(h2) {\\n        font-size: 1.4em;\\n        font-weight: 500;\\n    }\\n\\n    .content :global(pre) {\\n        background-color: #f9f9f9;\\n        box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);\\n        padding: 0.5em;\\n        border-radius: 2px;\\n        overflow-x: auto;\\n    }\\n\\n    .content :global(pre) :global(code) {\\n        background-color: transparent;\\n        padding: 0;\\n    }\\n\\n    .content :global(ul) {\\n        line-height: 1.5;\\n    }\\n\\n    .content :global(li) {\\n        margin: 0 0 0.5em 0;\\n    }\\n</style>\\n\\n<script context=\\\"module\\\">\\n    export async function preload({ params, query }) {\\n        // the `slug` parameter is available because\\n        // this file is called [slug].svelte\\n        const res = await this.fetch(`documentation/${params.slug}.json`)\\n        const data = await res.json()\\n\\n        if (res.status === 200) {\\n            return { post: data }\\n        } else {\\n            this.error(res.status, data.message)\\n        }\\n    }\\n</script>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n    onMount(async () => {\\n        ;[...document.querySelectorAll('a[href^=\\\"#\\\"]')].map(\\n            x => (x.href = document.location + new URL(x.href).hash)\\n        )\\n    })\\n    export let post\\n</script>\\n\\n<svelte:head>\\n    <title>{post.titre}</title>\\n</svelte:head>\\n\\n<h1>{post.titre}</h1>\\n\\n<div class=\\\"content\\\">\\n    {@html post.html}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AASI,qBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AAClB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,qBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACnB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACjD,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACpB,CAAC,AAED,qBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACjC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACd,CAAC,AAED,qBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AAClB,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,qBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AAClB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACvB,CAAC\"}"
};

async function preload$2({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`documentation/${params.slug}.json`);

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

<h1>${escape(post.titre)}</h1>

<div class="${"content svelte-9deje"}">${post.html}</div>`;
});

/* src/components/Brews.svelte generated by Svelte v3.21.0 */

const css$5 = {
	code: "input.svelte-1gnqe96.svelte-1gnqe96{width:6em;heigth:2em;border-color:#ddd;font-size:0.9em;color:grey}.mini.svelte-1gnqe96.svelte-1gnqe96{font-size:0.8em;color:grey}.pinyin.svelte-1gnqe96.svelte-1gnqe96{font-size:0.7em;color:#999;font-weight:normal}p.svelte-1gnqe96.svelte-1gnqe96{margin:0;padding:0}.ideogram.svelte-1gnqe96.svelte-1gnqe96{font-weight:normal;font-size:1.5em}.brew.svelte-1gnqe96 td.svelte-1gnqe96{font-size:0.8em;border:1px solid #ccc}",
	map: "{\"version\":3,\"file\":\"Brews.svelte\",\"sources\":[\"Brews.svelte\"],\"sourcesContent\":[\"<style>\\n    input {\\n        width: 6em;\\n        heigth: 2em;\\n        border-color: #ddd;\\n        font-size: 0.9em;\\n        color: grey;\\n    }\\n    .mini {\\n        font-size: 0.8em;\\n        color: grey;\\n    }\\n    .pinyin {\\n        font-size: 0.7em;\\n        color: #999;\\n        font-weight: normal;\\n    }\\n    p {\\n        margin: 0;\\n        padding: 0;\\n    }\\n    .ideogram {\\n        font-weight: normal;\\n        font-size: 1.5em;\\n    }\\n\\n    .brew td {\\n        font-size: 0.8em;\\n        border: 1px solid #ccc;\\n    }\\n</style>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n    export let brew\\n\\n    let i18n = []\\n\\n    onMount(async () => {\\n        const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`)\\n\\n        if (res.ok) {\\n            i18n = (await res.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n    function getPinyin(text, i18n) {\\n        const term = i18n.filter(term => term.ideogram === text)[0] || {}\\n        return 'pinyin' in term ? term.pinyin : '-'\\n    }\\n\\n    let ml = 100\\n\\n    $: weight = (ml / +brew.quantity.split(':')[1]).toFixed(1)\\n\\n    const durations = +brew.durations ? [brew.durations] : brew.durations\\n\\n    const display = {\\n        times: times => {\\n            if (+times) {\\n                return `${times} infusions`\\n            } else if (times.length == 2 && Array.isArray([times])) {\\n                return `${times[0]} à ${times[1]} infusions`\\n            }\\n        },\\n        temperatures: temperatures => {\\n            if (+temperatures) {\\n                return `à partir de ${temperatures}°`\\n            } else if (\\n                temperatures.length == 2 &&\\n                Array.isArray(temperatures)\\n            ) {\\n                return `entre ${temperatures[0]}° et ${temperatures[1]}°`\\n            }\\n        }\\n    }\\n</script>\\n\\n<table class=\\\"brew\\\">\\n    <tr>\\n        <div>\\n            <p class=\\\"ideogram\\\">{brew.type}</p>\\n            <p class=\\\"pinyin\\\">{getPinyin(brew.type, i18n)}</p>\\n        </div>\\n    </tr>\\n    <tr>\\n        <td>{display.temperatures(brew.temperatures)}</td>\\n    </tr>\\n    {#if brew.times}\\n        <tr>\\n            <td>{display.times(brew.times)}</td>\\n        </tr>\\n    {/if}\\n    {#if durations}\\n        <tr>\\n            <td>\\n                <table>\\n                    <tr>\\n                        {#each durations as duration, index}\\n                            <td>{index + 1}</td>\\n                        {/each}\\n                    </tr>\\n                    <tr>\\n                        {#each durations as duration}\\n                            <td>{duration} sec</td>\\n                        {/each}\\n                    </tr>\\n                </table>\\n            </td>\\n        </tr>\\n    {/if}\\n    <td>\\n        Vous pouvez tester avec\\n        <strong>{weight} g</strong>\\n        pour\\n        <input type=\\\"number\\\" step=\\\"20\\\" bind:value=\\\"{ml}\\\" />\\n        ml -\\n        <!-- <input type=range bind:value={b} min=0 max=10> -->\\n        <span class=\\\"mini\\\">(ratio: {brew.quantity})</span>\\n    </td>\\n</table>\\n\"],\"names\":[],\"mappings\":\"AACI,KAAK,8BAAC,CAAC,AACH,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,YAAY,CAAE,IAAI,CAClB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,AACf,CAAC,AACD,KAAK,8BAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,AACf,CAAC,AACD,OAAO,8BAAC,CAAC,AACL,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,MAAM,AACvB,CAAC,AACD,CAAC,8BAAC,CAAC,AACC,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AACD,SAAS,8BAAC,CAAC,AACP,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,KAAK,AACpB,CAAC,AAED,oBAAK,CAAC,EAAE,eAAC,CAAC,AACN,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC1B,CAAC\"}"
};

function getPinyin$1(text, i18n) {
	const term = i18n.filter(term => term.ideogram === text)[0] || {};
	return "pinyin" in term ? term.pinyin : "-";
}

const Brews = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { brew } = $$props;
	let i18n = [];

	onMount(async () => {
		const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`);

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

	return `<table class="${"brew svelte-1gnqe96"}"><tr><div><p class="${"ideogram svelte-1gnqe96"}">${escape(brew.type)}</p>
            <p class="${"pinyin svelte-1gnqe96"}">${escape(getPinyin$1(brew.type, i18n))}</p></div></tr>
    <tr><td class="${"svelte-1gnqe96"}">${escape(display.temperatures(brew.temperatures))}</td></tr>
    ${brew.times
	? `<tr><td class="${"svelte-1gnqe96"}">${escape(display.times(brew.times))}</td></tr>`
	: ``}
    ${durations
	? `<tr><td class="${"svelte-1gnqe96"}"><table><tr>${each(durations, (duration, index) => `<td class="${"svelte-1gnqe96"}">${escape(index + 1)}</td>`)}</tr>
                    <tr>${each(durations, duration => `<td class="${"svelte-1gnqe96"}">${escape(duration)} sec</td>`)}</tr></table></td></tr>`
	: ``}
    <td class="${"svelte-1gnqe96"}">Vous pouvez tester avec
        <strong>${escape(weight)} g</strong>
        pour
        <input type="${"number"}" step="${"20"}" class="${"svelte-1gnqe96"}"${add_attribute("value", ml, 1)}>
        ml -
        
        <span class="${"mini svelte-1gnqe96"}">(ratio: ${escape(brew.quantity)})</span></td></table>`;
});

/* src/routes/fiche-[ideogram].svelte generated by Svelte v3.21.0 */

const css$6 = {
	code: ".wrapper.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{display:grid;grid-template-columns:350px 2fr 2fr;grid-gap:1em;color:#444;font-size:1.2em}.box.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{color:#444;padding-left:1em}.photo-zoom.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{padding:0;height:350px;width:350px;overflow:hidden;-webkit-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);-moz-box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1);box-shadow:6px 7px 5px 0px rgba(156, 154, 156, 1)}.photo-zoom.svelte-16ulcqm.svelte-16ulcqm img.svelte-16ulcqm.svelte-16ulcqm{margin:0;padding:0;max-width:100%;transform-origin:65% 75%;transition:transform 1s, filter 0.5s ease-out}.photo-zoom.svelte-16ulcqm.svelte-16ulcqm:hover img.svelte-16ulcqm.svelte-16ulcqm{cursor:zoom-in;transform:scale(4)}.property-title.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{margin-top:1.5em;font-size:0.8em;font-weight:800}.property-icon.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{margin:0;margin-top:1em;font-size:0.8em;line-height:2.9em}.property-value.svelte-16ulcqm.svelte-16ulcqm>ul.svelte-16ulcqm.svelte-16ulcqm{margin:0}.property-value.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm,.property-value.svelte-16ulcqm>ul.svelte-16ulcqm>li.svelte-16ulcqm{margin:0;font-size:0.8em}.icons.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{margin:0;padding:0;border:none;background:transparent;display:inline-block;text-align:left;width:18%;line-height:3em}.ideogram-pinyin.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{display:inline-block}.pinyin.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{font-size:0.7em;color:#999;font-weight:normal}p.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{margin:0;padding:0}.ideogram.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{font-weight:normal;font-size:1em}.mountain.svelte-16ulcqm.svelte-16ulcqm.svelte-16ulcqm{vertical-align:top}",
	map: "{\"version\":3,\"file\":\"fiche-[ideogram].svelte\",\"sources\":[\"fiche-[ideogram].svelte\"],\"sourcesContent\":[\"<style>\\n    .wrapper {\\n        display: grid;\\n        grid-template-columns: 350px 2fr 2fr;\\n        grid-gap: 1em;\\n        color: #444;\\n        font-size: 1.2em;\\n    }\\n\\n    .box {\\n        color: #444;\\n        padding-left: 1em;\\n    }\\n\\n    .photo-zoom {\\n        padding: 0;\\n        height: 350px; /* [1.1] Set it as per your need */\\n        width: 350px;\\n        overflow: hidden; /* [1.2] Hide the overflowing of child elements */\\n        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);\\n    }\\n\\n    .photo-zoom img {\\n        margin: 0;\\n        padding: 0;\\n        max-width: 100%;\\n        transform-origin: 65% 75%;\\n        transition: transform 1s, filter 0.5s ease-out;\\n    }\\n\\n    .photo-zoom:hover img {\\n        cursor: zoom-in;\\n        transform: scale(4);\\n    }\\n\\n    .property-title {\\n        margin-top: 1.5em;\\n        font-size: 0.8em;\\n        font-weight: 800;\\n    }\\n\\n    .property-icon {\\n        margin: 0;\\n        margin-top: 1em;\\n        font-size: 0.8em;\\n        line-height: 2.9em;\\n    }\\n\\n    .property-value > ul {\\n        margin: 0;\\n    }\\n    .property-value,\\n    .property-value > ul > li {\\n        margin: 0;\\n        font-size: 0.8em;\\n    }\\n    .icons {\\n        margin: 0;\\n        padding: 0;\\n        border: none;\\n        background: transparent;\\n        display: inline-block;\\n        text-align: left;\\n        width: 18%;\\n        line-height: 3em;\\n    }\\n    .ideogram-pinyin {\\n        display: inline-block;\\n    }\\n    .pinyin {\\n        font-size: 0.7em;\\n        color: #999;\\n        font-weight: normal;\\n    }\\n    p {\\n        margin: 0;\\n        padding: 0;\\n    }\\n    .ideogram {\\n        font-weight: normal;\\n        font-size: 1em;\\n    }\\n\\n    .mountain {\\n        vertical-align: top;\\n    }\\n</style>\\n\\n<script context=\\\"module\\\">\\n    export function preload(page) {\\n        return { ideogram: page.params.ideogram }\\n    }\\n</script>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n    import Brews from '../components/Brews.svelte'\\n    import IconTeaType from '../components/IconTeaType.svelte'\\n\\n    export let ideogram\\n\\n    let tea = {}\\n    let i18n = []\\n\\n    onMount(async () => {\\n        const res = await fetch(\\n            `https://api-tea.oisiflorus.com/api/v1/tea/${ideogram}`\\n        )\\n\\n        if (res.ok) {\\n            tea = (await res.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n\\n        const res1 = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`)\\n\\n        if (res1.ok) {\\n            i18n = (await res1.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n\\n    function getPinyin(text, i18n) {\\n        const term = i18n.filter(term => term.ideogram === text)[0] || {}\\n        return 'pinyin' in term ? term.pinyin : '-'\\n    }\\n\\n    const display = {\\n        elevations: elevations => {\\n            if (+elevations) {\\n                return `à partir de ${elevations} mètres`\\n            } else if (elevations.length == 2 && Array.isArray([elevations])) {\\n                return `${elevations[0]} à ${elevations[1]} mètres`\\n            }\\n        },\\n        oxidations: oxidations => {\\n            if (+oxidations) {\\n                return `à partir de ${oxidations}%`\\n            } else if (oxidations.length == 2 && Array.isArray(oxidations)) {\\n                return `entre ${oxidations[0]}% et ${oxidations[1]}%`\\n            }\\n        }\\n    }\\n</script>\\n\\n<svelte:head>\\n    <title>Fiche de thé</title>\\n</svelte:head>\\n{#if tea.ideogram}\\n    <h2>\\n        <div class=\\\"ideogram-pinyin\\\">\\n            <p class=\\\"ideogram\\\">{tea.ideogram}</p>\\n            <p class=\\\"pinyin\\\">{getPinyin(tea.ideogram, i18n)}</p>\\n        </div>\\n    </h2>\\n    <div class=\\\"wrapper\\\">\\n        <div class=\\\"box photo-zoom\\\">\\n            <img\\n                src=\\\"/assets/thes/{tea.ideogram}.jpg\\\"\\n                alt=\\\"{tea.ideogram}\\\"\\n                title=\\\"{tea.ideogram}\\\"\\n                class=\\\"photo\\\"\\n            />\\n        </div>\\n        <div class=\\\"box\\\">\\n            <a href=\\\"/liste-des-thes-{tea.type}\\\">\\n                <div class=\\\"ideogram-pinyin\\\">\\n                    <p class=\\\"ideogram\\\">{tea.type}</p>\\n                    <p class=\\\"pinyin\\\">{getPinyin(tea.type, i18n)}</p>\\n                </div>\\n            </a>\\n            <IconTeaType type=\\\"{tea.type}\\\" />\\n            <dl>\\n                {#if tea.families.length}\\n                    <dt class=\\\"property-title\\\">Famille :</dt>\\n                    <dd class=\\\"property-value\\\">\\n                        <ul class=\\\"ideogram-pinyin\\\">\\n                            {#each tea.families as family}\\n                                <li class=\\\"ideogram\\\">\\n                                    {family}\\n                                    <p class=\\\"pinyin\\\">\\n                                        {getPinyin(family, i18n)}\\n                                    </p>\\n                                </li>\\n                            {/each}\\n                        </ul>\\n                    </dd>\\n                {/if}\\n                {#if tea.oxidations.length}\\n                    <dt class=\\\"property-title\\\">Oxydation :</dt>\\n                    <dd class=\\\"property-value\\\">\\n                        {display.oxidations(tea.oxidations)}\\n                    </dd>\\n                {/if}\\n                {#if tea.elevations.length}\\n                    <dd class=\\\"property-icon\\\">\\n                        <img\\n                            class=\\\"icons mountain\\\"\\n                            src=\\\"/assets/icons/mountain.svg\\\"\\n                            alt=\\\"altitude\\\"\\n                        />\\n                        {display.elevations(tea.elevations)}\\n                    </dd>\\n                {/if}\\n                {#if tea.harvests.length}\\n                    <dd class=\\\"property-value\\\">\\n                        {#each tea.harvests as season}\\n                            <img\\n                                class=\\\"icons\\\"\\n                                src=\\\"/assets/icons/{season}.svg\\\"\\n                                alt=\\\"{season}\\\"\\n                            />\\n                        {/each}\\n                    </dd>\\n                {/if}\\n                {#if tea.pickings.length}\\n                    <dt class=\\\"property-title\\\">Ceuillette :</dt>\\n                    <dd class=\\\"property-value\\\">\\n                        <ul class=\\\"ideogram-pinyin\\\">\\n                            {#each tea.pickings as pick}\\n                                <li class=\\\"ideogram\\\">\\n                                    {pick}\\n                                    <p class=\\\"pinyin\\\">\\n                                        {getPinyin(pick, i18n)}\\n                                    </p>\\n                                </li>\\n                            {/each}\\n                        </ul>\\n                    </dd>\\n                {/if}\\n            </dl>\\n        </div>\\n        <div class=\\\"box\\\">\\n            {#if tea.provinces.length}\\n                <dt class=\\\"property-title\\\">Provinces :</dt>\\n                <dd class=\\\"property-value\\\">\\n                    <ul class=\\\"ideogram-pinyin\\\">\\n                        {#each tea.provinces as provinces}\\n                            <li class=\\\"ideogram\\\">\\n                                <a\\n                                    href=\\\"https://map.baidu.com/search/?querytype=s&wd={tea.provinces}\\\"\\n                                    target=\\\"_blank\\\"\\n                                >\\n                                    {provinces}\\n                                    <p class=\\\"pinyin\\\">\\n                                        {getPinyin(provinces, i18n)}\\n                                    </p>\\n                                </a>\\n                            </li>\\n                        {/each}\\n                    </ul>\\n                </dd>\\n            {/if}\\n            {#if tea.towns.length}\\n                <dt class=\\\"property-title\\\">Villes :</dt>\\n                <dd class=\\\"property-value\\\">\\n                    <ul class=\\\"ideogram-pinyin\\\">\\n                        {#each tea.towns as towns}\\n                            <li class=\\\"ideogram\\\">\\n                                <a\\n                                    href=\\\"https://map.baidu.com/search/?querytype=s&wd={tea.towns}\\\"\\n                                    target=\\\"_blank\\\"\\n                                >\\n                                    {towns}\\n                                    <p class=\\\"pinyin\\\">\\n                                        {getPinyin(towns, i18n)}\\n                                    </p>\\n                                </a>\\n                            </li>\\n                        {/each}\\n                    </ul>\\n                </dd>\\n            {/if}\\n            {#if tea.cultivars.length}\\n                <dt class=\\\"property-title\\\">Cultivars :</dt>\\n                <dd class=\\\"property-value\\\">\\n                    <ul class=\\\"ideogram-pinyin\\\">\\n                        {#each tea.cultivars as cultivars}\\n                            <li class=\\\"ideogram\\\">\\n                                {cultivars}\\n                                <p class=\\\"pinyin\\\">\\n                                    {getPinyin(cultivars, i18n)}\\n                                </p>\\n                            </li>\\n                        {/each}\\n                    </ul>\\n                </dd>\\n            {/if}\\n        </div>\\n        <div class=\\\"box\\\"></div>\\n    </div>\\n    <hr />\\n    <h3>Conseil d'infusion</h3>\\n    <div class=\\\"row\\\">\\n        {#if Array.isArray(tea.brews)}\\n            {#each tea.brews as brew}\\n                <Brews {brew} />\\n            {/each}\\n        {/if}\\n    </div>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AACI,QAAQ,6CAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CACpC,QAAQ,CAAE,GAAG,CACb,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,AACpB,CAAC,AAED,IAAI,6CAAC,CAAC,AACF,KAAK,CAAE,IAAI,CACX,YAAY,CAAE,GAAG,AACrB,CAAC,AAED,WAAW,6CAAC,CAAC,AACT,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,MAAM,CAChB,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAC1D,eAAe,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACvD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AACtD,CAAC,AAED,yCAAW,CAAC,GAAG,8BAAC,CAAC,AACb,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,GAAG,CAAC,GAAG,CACzB,UAAU,CAAE,SAAS,CAAC,EAAE,CAAC,CAAC,MAAM,CAAC,IAAI,CAAC,QAAQ,AAClD,CAAC,AAED,yCAAW,MAAM,CAAC,GAAG,8BAAC,CAAC,AACnB,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,MAAM,CAAC,CAAC,AACvB,CAAC,AAED,eAAe,6CAAC,CAAC,AACb,UAAU,CAAE,KAAK,CACjB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,cAAc,6CAAC,CAAC,AACZ,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,GAAG,CACf,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,KAAK,AACtB,CAAC,AAED,6CAAe,CAAG,EAAE,8BAAC,CAAC,AAClB,MAAM,CAAE,CAAC,AACb,CAAC,AACD,4DAAe,CACf,8BAAe,CAAG,iBAAE,CAAG,EAAE,eAAC,CAAC,AACvB,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,KAAK,AACpB,CAAC,AACD,MAAM,6CAAC,CAAC,AACJ,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,YAAY,CACrB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,GAAG,AACpB,CAAC,AACD,gBAAgB,6CAAC,CAAC,AACd,OAAO,CAAE,YAAY,AACzB,CAAC,AACD,OAAO,6CAAC,CAAC,AACL,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,MAAM,AACvB,CAAC,AACD,CAAC,6CAAC,CAAC,AACC,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AACD,SAAS,6CAAC,CAAC,AACP,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,GAAG,AAClB,CAAC,AAED,SAAS,6CAAC,CAAC,AACP,cAAc,CAAE,GAAG,AACvB,CAAC\"}"
};

function preload$3(page) {
	return { ideogram: page.params.ideogram };
}

function getPinyin$2(text, i18n) {
	const term = i18n.filter(term => term.ideogram === text)[0] || {};
	return "pinyin" in term ? term.pinyin : "-";
}

const Fiche_u5Bideogramu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { ideogram } = $$props;
	let tea = {};
	let i18n = [];

	onMount(async () => {
		const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/tea/${ideogram}`);

		if (res.ok) {
			tea = (await res.json()).api;
		} else {
			// 404
			throw new Error(text);
		}

		const res1 = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`);

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

	if ($$props.ideogram === void 0 && $$bindings.ideogram && ideogram !== void 0) $$bindings.ideogram(ideogram);
	$$result.css.add(css$6);

	return `${($$result.head += `${($$result.title = `<title>Fiche de thé</title>`, "")}`, "")}
${tea.ideogram
	? `<h2><div class="${"ideogram-pinyin svelte-16ulcqm"}"><p class="${"ideogram svelte-16ulcqm"}">${escape(tea.ideogram)}</p>
            <p class="${"pinyin svelte-16ulcqm"}">${escape(getPinyin$2(tea.ideogram, i18n))}</p></div></h2>
    <div class="${"wrapper svelte-16ulcqm"}"><div class="${"box photo-zoom svelte-16ulcqm"}"><img src="${"/assets/thes/" + escape(tea.ideogram) + ".jpg"}"${add_attribute("alt", tea.ideogram, 0)}${add_attribute("title", tea.ideogram, 0)} class="${"photo svelte-16ulcqm"}"></div>
        <div class="${"box svelte-16ulcqm"}"><a href="${"/liste-des-thes-" + escape(tea.type)}"><div class="${"ideogram-pinyin svelte-16ulcqm"}"><p class="${"ideogram svelte-16ulcqm"}">${escape(tea.type)}</p>
                    <p class="${"pinyin svelte-16ulcqm"}">${escape(getPinyin$2(tea.type, i18n))}</p></div></a>
            ${validate_component(IconTeaType, "IconTeaType").$$render($$result, { type: tea.type }, {}, {})}
            <dl>${tea.families.length
		? `<dt class="${"property-title svelte-16ulcqm"}">Famille :</dt>
                    <dd class="${"property-value svelte-16ulcqm"}"><ul class="${"ideogram-pinyin svelte-16ulcqm"}">${each(tea.families, family => `<li class="${"ideogram svelte-16ulcqm"}">${escape(family)}
                                    <p class="${"pinyin svelte-16ulcqm"}">${escape(getPinyin$2(family, i18n))}</p>
                                </li>`)}</ul></dd>`
		: ``}${tea.oxidations.length
		? `<dt class="${"property-title svelte-16ulcqm"}">Oxydation :</dt>
                    <dd class="${"property-value svelte-16ulcqm"}">${escape(display.oxidations(tea.oxidations))}</dd>`
		: ``}${tea.elevations.length
		? `<dd class="${"property-icon svelte-16ulcqm"}"><img class="${"icons mountain svelte-16ulcqm"}" src="${"/assets/icons/mountain.svg"}" alt="${"altitude"}">
                        ${escape(display.elevations(tea.elevations))}</dd>`
		: ``}${tea.harvests.length
		? `<dd class="${"property-value svelte-16ulcqm"}">${each(tea.harvests, season => `<img class="${"icons svelte-16ulcqm"}" src="${"/assets/icons/" + escape(season) + ".svg"}"${add_attribute("alt", season, 0)}>`)}</dd>`
		: ``}${tea.pickings.length
		? `<dt class="${"property-title svelte-16ulcqm"}">Ceuillette :</dt>
                    <dd class="${"property-value svelte-16ulcqm"}"><ul class="${"ideogram-pinyin svelte-16ulcqm"}">${each(tea.pickings, pick => `<li class="${"ideogram svelte-16ulcqm"}">${escape(pick)}
                                    <p class="${"pinyin svelte-16ulcqm"}">${escape(getPinyin$2(pick, i18n))}</p>
                                </li>`)}</ul></dd>`
		: ``}</dl></div>
        <div class="${"box svelte-16ulcqm"}">${tea.provinces.length
		? `<dt class="${"property-title svelte-16ulcqm"}">Provinces :</dt>
                <dd class="${"property-value svelte-16ulcqm"}"><ul class="${"ideogram-pinyin svelte-16ulcqm"}">${each(tea.provinces, provinces => `<li class="${"ideogram svelte-16ulcqm"}"><a href="${"https://map.baidu.com/search/?querytype=s&wd=" + escape(tea.provinces)}" target="${"_blank"}">${escape(provinces)}
                                    <p class="${"pinyin svelte-16ulcqm"}">${escape(getPinyin$2(provinces, i18n))}
                                    </p></a>
                            </li>`)}</ul></dd>`
		: ``}
            ${tea.towns.length
		? `<dt class="${"property-title svelte-16ulcqm"}">Villes :</dt>
                <dd class="${"property-value svelte-16ulcqm"}"><ul class="${"ideogram-pinyin svelte-16ulcqm"}">${each(tea.towns, towns => `<li class="${"ideogram svelte-16ulcqm"}"><a href="${"https://map.baidu.com/search/?querytype=s&wd=" + escape(tea.towns)}" target="${"_blank"}">${escape(towns)}
                                    <p class="${"pinyin svelte-16ulcqm"}">${escape(getPinyin$2(towns, i18n))}
                                    </p></a>
                            </li>`)}</ul></dd>`
		: ``}
            ${tea.cultivars.length
		? `<dt class="${"property-title svelte-16ulcqm"}">Cultivars :</dt>
                <dd class="${"property-value svelte-16ulcqm"}"><ul class="${"ideogram-pinyin svelte-16ulcqm"}">${each(tea.cultivars, cultivars => `<li class="${"ideogram svelte-16ulcqm"}">${escape(cultivars)}
                                <p class="${"pinyin svelte-16ulcqm"}">${escape(getPinyin$2(cultivars, i18n))}</p>
                            </li>`)}</ul></dd>`
		: ``}</div>
        <div class="${"box svelte-16ulcqm"}"></div></div>
    <hr>
    <h3>Conseil d&#39;infusion</h3>
    <div class="${"row"}">${Array.isArray(tea.brews)
		? `${each(tea.brews, brew => `${validate_component(Brews, "Brews").$$render($$result, { brew }, {}, {})}`)}`
		: ``}</div>`
	: ``}`;
});

/* src/routes/termes.svelte generated by Svelte v3.21.0 */

const css$7 = {
	code: "h3.svelte-1bpn0qh{text-align:left;margin-top:2em}.pinyin.svelte-1bpn0qh{display:block;font-size:0.7em;color:#999}img.svelte-1bpn0qh{padding:0;margin:0;vertical-align:-0.4em;display:inline;width:5%;border:none;background:transparent;fill:#ccc;cursor:pointer}",
	map: "{\"version\":3,\"file\":\"termes.svelte\",\"sources\":[\"termes.svelte\"],\"sourcesContent\":[\"<style>\\n    h3 {\\n        text-align: left;\\n        margin-top: 2em;\\n    }\\n\\n    .pinyin {\\n        display: block;\\n        font-size: 0.7em;\\n        color: #999;\\n    }\\n    img {\\n        padding: 0;\\n        margin: 0;\\n        vertical-align: -0.4em;\\n        display: inline;\\n        width: 5%;\\n        border: none;\\n        background: transparent;\\n        fill: #ccc;\\n        cursor: pointer;\\n    }\\n</style>\\n\\n<script>\\n    import { onMount } from 'svelte'\\n\\n    let terms = []\\n    let themes = []\\n\\n    onMount(async () => {\\n        const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`)\\n\\n        if (res.ok) {\\n            terms = (await res.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n\\n        const res1 = await fetch(`https://api-tea.oisiflorus.com/api/v1/themes`)\\n\\n        if (res1.ok) {\\n            themes = (await res1.json()).api\\n        } else {\\n            // 404\\n            throw new Error(text)\\n        }\\n    })\\n\\n    function getPinyinByThemes(pinyins, theme) {\\n        return pinyins.filter(pinyin => pinyin.theme === theme.en)\\n    }\\n\\n    function playAudio(ideogram) {\\n        document.querySelector(`#${ideogram}`).play()\\n    }\\n</script>\\n\\n<h2>Termes utilisés</h2>\\n\\n<p>\\n    Cette page présente une liste des termes en chinois traditionnel employés\\n    sur le site avec leurs traduction en\\n    <em>pinyin</em>\\n</p>\\n{#each themes as theme}\\n    <h3>\\n        {theme.ideogram}\\n        <span class=\\\"pinyin\\\">{theme.pinyin}</span>\\n    </h3>\\n    <div class=\\\"row\\\">\\n        <table class=\\\"column column-66\\\">\\n            <thead>\\n                <tr>\\n                    <td>Chinois traditionnel</td>\\n                    <td>Pinyin</td>\\n                </tr>\\n            </thead>\\n            {#each getPinyinByThemes(terms, theme) as term}\\n                <tr>\\n                    <td>\\n                        <span class=\\\"tooltip\\\" title=\\\"français\\\">\\n                            {term.ideogram}\\n                        </span>\\n                        <audio id=\\\"{term.ideogram}\\\">\\n                            <source\\n                                src=\\\"assets/audio/{term.ideogram}.mp3\\\"\\n                                type=\\\"audio/mpeg\\\"\\n                            />\\n                        </audio>\\n                        <img\\n                            class=\\\"icons\\\"\\n                            src=\\\"/assets/icons/sound.svg\\\"\\n                            alt=\\\"sound\\\"\\n                            on:click=\\\"{playAudio(term.ideogram)}\\\"\\n                        />\\n                    </td>\\n                    <td>{term.pinyin}</td>\\n                </tr>\\n            {:else}\\n                <p>chargement des termes...</p>\\n            {/each}\\n        </table>\\n    </div>\\n{:else}\\n    <p>chargement des thèmes...</p>\\n{/each}\\n\"],\"names\":[],\"mappings\":\"AACI,EAAE,eAAC,CAAC,AACA,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,GAAG,AACnB,CAAC,AAED,OAAO,eAAC,CAAC,AACL,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,AACf,CAAC,AACD,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,MAAM,CACf,KAAK,CAAE,EAAE,CACT,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,IAAI,CAAE,IAAI,CACV,MAAM,CAAE,OAAO,AACnB,CAAC\"}"
};

function getPinyinByThemes(pinyins, theme) {
	return pinyins.filter(pinyin => pinyin.theme === theme.en);
}

const Termes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let terms = [];
	let themes = [];

	onMount(async () => {
		const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`);

		if (res.ok) {
			terms = (await res.json()).api;
		} else {
			// 404
			throw new Error(text);
		}

		const res1 = await fetch(`https://api-tea.oisiflorus.com/api/v1/themes`);

		if (res1.ok) {
			themes = (await res1.json()).api;
		} else {
			// 404
			throw new Error(text);
		}
	});

	$$result.css.add(css$7);

	return `<h2>Termes utilisés</h2>

<p>Cette page présente une liste des termes en chinois traditionnel employés
    sur le site avec leurs traduction en
    <em>pinyin</em></p>
${themes.length
	? each(themes, theme => `<h3 class="${"svelte-1bpn0qh"}">${escape(theme.ideogram)}
        <span class="${"pinyin svelte-1bpn0qh"}">${escape(theme.pinyin)}</span></h3>
    <div class="${"row"}"><table class="${"column column-66"}"><thead><tr><td>Chinois traditionnel</td>
                    <td>Pinyin</td>
                </tr></thead>
            ${getPinyinByThemes(terms, theme).length
		? each(getPinyinByThemes(terms, theme), term => `<tr><td><span class="${"tooltip"}" title="${"français"}">${escape(term.ideogram)}</span>
                        <audio${add_attribute("id", term.ideogram, 0)}><source src="${"assets/audio/" + escape(term.ideogram) + ".mp3"}" type="${"audio/mpeg"}"></audio>
                        <img class="${"icons svelte-1bpn0qh"}" src="${"/assets/icons/sound.svg"}" alt="${"sound"}"></td>
                    <td>${escape(term.pinyin)}</td>
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
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = \\\"development\\\" === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\th1 {\\n\\t\\t\\tfont-size: 4em;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
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

${ error.stack
	? `<pre>${escape(error.stack)}</pre>`
	: ``}`;
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

// This file is generated by Sapper — do not edit it!

if (typeof window !== 'undefined') {
	new Promise(function (resolve) { resolve(require('./sapper-dev-client-64a06d75.js')); }).then(client => {
		client.connect(10000);
	});
}

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
	map: "{\"version\":3,\"file\":\"Select.svelte\",\"sources\":[\"Select.svelte\"],\"sourcesContent\":[\"<script>\\n  import {\\n    beforeUpdate,\\n    createEventDispatcher,\\n    onDestroy,\\n    onMount,\\n    tick\\n  } from \\\"svelte\\\";\\n  import List from \\\"./List.svelte\\\";\\n  import ItemComponent from \\\"./Item.svelte\\\";\\n  import SelectionComponent from \\\"./Selection.svelte\\\";\\n  import MultiSelectionComponent from \\\"./MultiSelection.svelte\\\";\\n  import isOutOfViewport from \\\"./utils/isOutOfViewport\\\";\\n  import debounce from \\\"./utils/debounce\\\";\\n\\n  const dispatch = createEventDispatcher();\\n  export let container = undefined;\\n  export let input = undefined;\\n  export let Item = ItemComponent;\\n  export let Selection = SelectionComponent;\\n  export let MultiSelection = MultiSelectionComponent;\\n  export let isMulti = false;\\n  export let isDisabled = false;\\n  export let isCreatable = false;\\n  export let isFocused = false;\\n  export let selectedValue = undefined;\\n  export let filterText = \\\"\\\";\\n  export let placeholder = \\\"Select...\\\";\\n  export let items = [];\\n  export let itemFilter = (label, filterText, option) =>\\n    label.toLowerCase().includes(filterText.toLowerCase());\\n  export let groupBy = undefined;\\n  export let groupFilter = groups => groups;\\n  export let isGroupHeaderSelectable = false;\\n  export let getGroupHeaderLabel = option => {\\n    return option.label;\\n  };\\n  export let getOptionLabel = (option, filterText) => {\\n    return option.isCreator ? `Create \\\\\\\"${filterText}\\\\\\\"` : option.label;\\n  };\\n  export let optionIdentifier = \\\"value\\\";\\n  export let loadOptions = undefined;\\n  export let hasError = false;\\n  export let containerStyles = \\\"\\\";\\n  export let getSelectionLabel = option => {\\n    if (option) return option.label;\\n  };\\n\\n  export let createGroupHeaderItem = groupValue => {\\n    return {\\n      value: groupValue,\\n      label: groupValue\\n    };\\n  };\\n\\n  export let createItem = filterText => {\\n    return {\\n      value: filterText,\\n      label: filterText\\n    };\\n  };\\n\\n  export let isSearchable = true;\\n  export let inputStyles = \\\"\\\";\\n  export let isClearable = true;\\n  export let isWaiting = false;\\n  export let listPlacement = \\\"auto\\\";\\n  export let listOpen = false;\\n  export let list = undefined;\\n  export let isVirtualList = false;\\n  export let loadOptionsInterval = 300;\\n  export let noOptionsMessage = \\\"No options\\\";\\n  export let hideEmptyState = false;\\n  export let filteredItems = [];\\n  export let inputAttributes = {};\\n  export let listAutoWidth = true;\\n  export let itemHeight = 40;\\n  export let Icon = undefined;\\n  export let showChevron = false;\\n\\n  let target;\\n  let activeSelectedValue;\\n  let _items = [];\\n  let originalItemsClone;\\n  let containerClasses = \\\"\\\";\\n  let prev_selectedValue;\\n  let prev_listOpen;\\n  let prev_filterText;\\n  let prev_isFocused;\\n  let prev_filteredItems;\\n\\n  async function resetFilter() {\\n    await tick();\\n    filterText = \\\"\\\";\\n  }\\n\\n  const getItems = debounce(async () => {\\n    isWaiting = true;\\n\\n    items = await loadOptions(filterText);\\n\\n    isWaiting = false;\\n    isFocused = true;\\n    listOpen = true;\\n  }, loadOptionsInterval);\\n\\n  $: disabled = isDisabled;\\n\\n  $: {\\n    containerClasses = `selectContainer`;\\n    containerClasses += isMulti ? \\\" multiSelect\\\" : \\\"\\\";\\n    containerClasses += isDisabled ? \\\" disabled\\\" : \\\"\\\";\\n    containerClasses += isFocused ? \\\" focused\\\" : \\\"\\\";\\n  }\\n\\n  $: {\\n    if (typeof selectedValue === \\\"string\\\") {\\n      selectedValue = {\\n        [optionIdentifier]: selectedValue,\\n        label: selectedValue\\n      };\\n    }\\n  }\\n\\n  $: showSelectedItem = selectedValue && filterText.length === 0;\\n\\n  $: placeholderText = selectedValue ? \\\"\\\" : placeholder;\\n\\n  let _inputAttributes = {};\\n  $: {\\n    _inputAttributes = Object.assign(inputAttributes, {\\n      autocomplete: \\\"off\\\",\\n      autocorrect: \\\"off\\\",\\n      spellcheck: false\\n    });\\n\\n    if (!isSearchable) {\\n      _inputAttributes.readonly = true;\\n    }\\n  }\\n\\n  $: {\\n    let _filteredItems;\\n    let _items = items;\\n\\n    if (items && items.length > 0 && typeof items[0] !== \\\"object\\\") {\\n      _items = items.map((item, index) => {\\n        return {\\n          index,\\n          value: item,\\n          label: item\\n        };\\n      });\\n    }\\n\\n    if (loadOptions && filterText.length === 0 && originalItemsClone) {\\n      _filteredItems = JSON.parse(originalItemsClone);\\n      _items = JSON.parse(originalItemsClone);\\n    } else {\\n      _filteredItems = loadOptions\\n        ? filterText.length === 0\\n          ? []\\n          : _items\\n        : _items.filter(item => {\\n            let keepItem = true;\\n\\n            if (isMulti && selectedValue) {\\n              keepItem = !selectedValue.find(value => {\\n                return value[optionIdentifier] === item[optionIdentifier];\\n              });\\n            }\\n\\n            if (!keepItem) return false;\\n            if (filterText.length < 1) return true;\\n            return itemFilter(\\n              getOptionLabel(item, filterText),\\n              filterText,\\n              item\\n            );\\n          });\\n    }\\n\\n    if (groupBy) {\\n      const groupValues = [];\\n      const groups = {};\\n\\n      _filteredItems.forEach(item => {\\n        const groupValue = groupBy(item);\\n\\n        if (!groupValues.includes(groupValue)) {\\n          groupValues.push(groupValue);\\n          groups[groupValue] = [];\\n\\n          if (groupValue) {\\n            groups[groupValue].push(\\n              Object.assign(createGroupHeaderItem(groupValue, item), {\\n                id: groupValue,\\n                isGroupHeader: true,\\n                isSelectable: isGroupHeaderSelectable\\n              })\\n            );\\n          }\\n        }\\n\\n        groups[groupValue].push(\\n          Object.assign({ isGroupItem: !!groupValue }, item)\\n        );\\n      });\\n\\n      const sortedGroupedItems = [];\\n\\n      groupFilter(groupValues).forEach(groupValue => {\\n        sortedGroupedItems.push(...groups[groupValue]);\\n      });\\n\\n      filteredItems = sortedGroupedItems;\\n    } else {\\n      filteredItems = _filteredItems;\\n    }\\n  }\\n\\n  beforeUpdate(() => {\\n    if (isMulti && selectedValue && selectedValue.length > 1) {\\n      checkSelectedValueForDuplicates();\\n    }\\n\\n    if (!isMulti && selectedValue && prev_selectedValue !== selectedValue) {\\n      if (\\n        !prev_selectedValue ||\\n        JSON.stringify(selectedValue[optionIdentifier]) !==\\n          JSON.stringify(prev_selectedValue[optionIdentifier])\\n      ) {\\n        dispatch(\\\"select\\\", selectedValue);\\n      }\\n    }\\n\\n    if (\\n      isMulti &&\\n      JSON.stringify(selectedValue) !== JSON.stringify(prev_selectedValue)\\n    ) {\\n      if (checkSelectedValueForDuplicates()) {\\n        dispatch(\\\"select\\\", selectedValue);\\n      }\\n    }\\n\\n    if (container && listOpen !== prev_listOpen) {\\n      if (listOpen) {\\n        loadList();\\n      } else {\\n        removeList();\\n      }\\n    }\\n\\n    if (filterText !== prev_filterText) {\\n      if (filterText.length > 0) {\\n        isFocused = true;\\n        listOpen = true;\\n\\n        if (loadOptions) {\\n          getItems();\\n        } else {\\n          loadList();\\n          listOpen = true;\\n\\n          if (isMulti) {\\n            activeSelectedValue = undefined;\\n          }\\n        }\\n      } else {\\n        setList([]);\\n      }\\n\\n      if (list) {\\n        list.$set({\\n          filterText\\n        });\\n      }\\n    }\\n\\n    if (isFocused !== prev_isFocused) {\\n      if (isFocused || listOpen) {\\n        handleFocus();\\n      } else {\\n        resetFilter();\\n        if (input) input.blur();\\n      }\\n    }\\n\\n    if (prev_filteredItems !== filteredItems) {\\n      let _filteredItems = [...filteredItems];\\n\\n      if (isCreatable && filterText) {\\n        const itemToCreate = createItem(filterText);\\n        itemToCreate.isCreator = true;\\n\\n        const existingItemWithFilterValue = _filteredItems.find(item => {\\n          return item[optionIdentifier] === itemToCreate[optionIdentifier];\\n        });\\n\\n        let existingSelectionWithFilterValue;\\n\\n        if (selectedValue) {\\n          if (isMulti) {\\n            existingSelectionWithFilterValue = selectedValue.find(selection => {\\n              return (\\n                selection[optionIdentifier] === itemToCreate[optionIdentifier]\\n              );\\n            });\\n          } else if (\\n            selectedValue[optionIdentifier] === itemToCreate[optionIdentifier]\\n          ) {\\n            existingSelectionWithFilterValue = selectedValue;\\n          }\\n        }\\n\\n        if (!existingItemWithFilterValue && !existingSelectionWithFilterValue) {\\n          _filteredItems = [..._filteredItems, itemToCreate];\\n        }\\n      }\\n\\n      setList(_filteredItems);\\n    }\\n\\n    prev_selectedValue = selectedValue;\\n    prev_listOpen = listOpen;\\n    prev_filterText = filterText;\\n    prev_isFocused = isFocused;\\n    prev_filteredItems = filteredItems;\\n  });\\n\\n  function checkSelectedValueForDuplicates() {\\n    let noDuplicates = true;\\n    if (selectedValue) {\\n      const ids = [];\\n      const uniqueValues = [];\\n\\n      selectedValue.forEach(val => {\\n        if (!ids.includes(val[optionIdentifier])) {\\n          ids.push(val[optionIdentifier]);\\n          uniqueValues.push(val);\\n        } else {\\n          noDuplicates = false;\\n        }\\n      });\\n\\n      selectedValue = uniqueValues;\\n    }\\n    return noDuplicates;\\n  }\\n\\n  async function setList(items) {\\n    await tick();\\n    if (list) return list.$set({ items });\\n    if (loadOptions && items.length > 0) loadList();\\n  }\\n\\n  function handleMultiItemClear(event) {\\n    const { detail } = event;\\n    const itemToRemove =\\n      selectedValue[detail ? detail.i : selectedValue.length - 1];\\n\\n    if (selectedValue.length === 1) {\\n      selectedValue = undefined;\\n    } else {\\n      selectedValue = selectedValue.filter(item => {\\n        return item !== itemToRemove;\\n      });\\n    }\\n\\n    dispatch(\\\"clear\\\", itemToRemove);\\n\\n    getPosition();\\n  }\\n\\n  async function getPosition() {\\n    await tick();\\n    if (!target || !container) return;\\n    const { top, height, width } = container.getBoundingClientRect();\\n\\n    target.style[\\\"min-width\\\"] = `${width}px`;\\n    target.style.width = `${listAutoWidth ? \\\"auto\\\" : \\\"100%\\\"}`;\\n    target.style.left = \\\"0\\\";\\n\\n    if (listPlacement === \\\"top\\\") {\\n      target.style.bottom = `${height + 5}px`;\\n    } else {\\n      target.style.top = `${height + 5}px`;\\n    }\\n\\n    target = target;\\n\\n    if (listPlacement === \\\"auto\\\" && isOutOfViewport(target).bottom) {\\n      target.style.top = ``;\\n      target.style.bottom = `${height + 5}px`;\\n    }\\n\\n    target.style.visibility = \\\"\\\";\\n  }\\n\\n  function handleKeyDown(e) {\\n    if (!isFocused) return;\\n\\n    switch (e.key) {\\n      case \\\"ArrowDown\\\":\\n        e.preventDefault();\\n        listOpen = true;\\n        activeSelectedValue = undefined;\\n        break;\\n      case \\\"ArrowUp\\\":\\n        e.preventDefault();\\n        listOpen = true;\\n        activeSelectedValue = undefined;\\n        break;\\n      case \\\"Tab\\\":\\n        if (!listOpen) isFocused = false;\\n        break;\\n      case \\\"Backspace\\\":\\n        if (!isMulti || filterText.length > 0) return;\\n        if (isMulti && selectedValue && selectedValue.length > 0) {\\n          handleMultiItemClear(\\n            activeSelectedValue !== undefined\\n              ? activeSelectedValue\\n              : selectedValue.length - 1\\n          );\\n          if (activeSelectedValue === 0 || activeSelectedValue === undefined)\\n            break;\\n          activeSelectedValue =\\n            selectedValue.length > activeSelectedValue\\n              ? activeSelectedValue - 1\\n              : undefined;\\n        }\\n        break;\\n      case \\\"ArrowLeft\\\":\\n        if (list) list.$set({ hoverItemIndex: -1 });\\n        if (!isMulti || filterText.length > 0) return;\\n\\n        if (activeSelectedValue === undefined) {\\n          activeSelectedValue = selectedValue.length - 1;\\n        } else if (\\n          selectedValue.length > activeSelectedValue &&\\n          activeSelectedValue !== 0\\n        ) {\\n          activeSelectedValue -= 1;\\n        }\\n        break;\\n      case \\\"ArrowRight\\\":\\n        if (list) list.$set({ hoverItemIndex: -1 });\\n        if (\\n          !isMulti ||\\n          filterText.length > 0 ||\\n          activeSelectedValue === undefined\\n        )\\n          return;\\n        if (activeSelectedValue === selectedValue.length - 1) {\\n          activeSelectedValue = undefined;\\n        } else if (activeSelectedValue < selectedValue.length - 1) {\\n          activeSelectedValue += 1;\\n        }\\n        break;\\n    }\\n  }\\n\\n  function handleFocus() {\\n    isFocused = true;\\n    if (input) input.focus();\\n  }\\n\\n  function removeList() {\\n    resetFilter();\\n    activeSelectedValue = undefined;\\n\\n    if (!list) return;\\n    list.$destroy();\\n    list = undefined;\\n\\n    if (!target) return;\\n    if (target.parentNode) target.parentNode.removeChild(target);\\n    target = undefined;\\n\\n    list = list;\\n    target = target;\\n  }\\n\\n  function handleWindowClick(event) {\\n    if (!container) return;\\n    const eventTarget =\\n      event.path && event.path.length > 0 ? event.path[0] : event.target;\\n    if (container.contains(eventTarget)) return;\\n    isFocused = false;\\n    listOpen = false;\\n    activeSelectedValue = undefined;\\n    if (input) input.blur();\\n  }\\n\\n  function handleClick() {\\n    if (isDisabled) return;\\n    isFocused = true;\\n    listOpen = !listOpen;\\n  }\\n\\n  export function handleClear() {\\n    selectedValue = undefined;\\n    listOpen = false;\\n    dispatch(\\\"clear\\\", selectedValue);\\n    handleFocus();\\n  }\\n\\n  async function loadList() {\\n    await tick();\\n    if (target && list) return;\\n\\n    const data = {\\n      Item,\\n      filterText,\\n      optionIdentifier,\\n      noOptionsMessage,\\n      hideEmptyState,\\n      isVirtualList,\\n      selectedValue,\\n      isMulti,\\n      getGroupHeaderLabel,\\n      items: filteredItems,\\n      itemHeight\\n    };\\n\\n    if (getOptionLabel) {\\n      data.getOptionLabel = getOptionLabel;\\n    }\\n\\n    target = document.createElement(\\\"div\\\");\\n\\n    Object.assign(target.style, {\\n      position: \\\"absolute\\\",\\n      \\\"z-index\\\": 2,\\n      visibility: \\\"hidden\\\"\\n    });\\n\\n    list = list;\\n    target = target;\\n    if (container) container.appendChild(target);\\n\\n    list = new List({\\n      target,\\n      props: data\\n    });\\n\\n    list.$on(\\\"itemSelected\\\", event => {\\n      const { detail } = event;\\n\\n      if (detail) {\\n        const item = Object.assign({}, detail);\\n\\n        if (!item.isGroupHeader || item.isSelectable) {\\n\\n          if (isMulti) {\\n            selectedValue = selectedValue ? selectedValue.concat([item]) : [item];\\n          } else {\\n            selectedValue = item;\\n          }\\n\\n          resetFilter();\\n          selectedValue = selectedValue;\\n\\n          setTimeout(() => {\\n            listOpen = false;\\n            activeSelectedValue = undefined;\\n          });\\n        }\\n      }\\n    });\\n\\n    list.$on(\\\"itemCreated\\\", event => {\\n      const { detail } = event;\\n      if (isMulti) {\\n        selectedValue = selectedValue || [];\\n        selectedValue = [...selectedValue, createItem(detail)];\\n      } else {\\n        selectedValue = createItem(detail);\\n      }\\n\\n      filterText = \\\"\\\";\\n      listOpen = false;\\n      activeSelectedValue = undefined;\\n      resetFilter();\\n    });\\n\\n    list.$on(\\\"closeList\\\", () => {\\n      listOpen = false;\\n    });\\n\\n    (list = list), (target = target);\\n    getPosition();\\n  }\\n\\n  onMount(() => {\\n    if (isFocused) input.focus();\\n    if (listOpen) loadList();\\n\\n    if (items && items.length > 0) {\\n      originalItemsClone = JSON.stringify(items);\\n    }\\n\\n    if (selectedValue) {\\n      if (isMulti) {\\n        selectedValue = selectedValue.map(item => {\\n          if (typeof item === \\\"string\\\") {\\n            return { value: item, label: item };\\n          } else {\\n            return item;\\n          }\\n        });\\n      }\\n    }\\n  });\\n\\n  onDestroy(() => {\\n    removeList();\\n  });\\n</script>\\n\\n<style>\\n  .selectContainer {\\n    --padding: 0 16px;\\n    \\n    border: var(--border, 1px solid #d8dbdf);\\n    border-radius: var(--borderRadius, 3px);\\n    height: var(--height, 42px);\\n    position: relative;\\n    display: flex;\\n    align-items: center;\\n    padding: var(--padding);\\n    background: var(--background, #fff);\\n  }\\n\\n  .selectContainer input {\\n    cursor: default;\\n    border: none;\\n    color: var(--inputColor, #3f4f5f);\\n    height: var(--height, 42px);\\n    line-height: var(--height, 42px);\\n    padding: var(--inputPadding, var(--padding));\\n    width: 100%;\\n    background: transparent;\\n    font-size: var(--inputFontSize, 14px);\\n    letter-spacing: var(--inputLetterSpacing, -0.08px);\\n    position: absolute;\\n    left: var(--inputLeft, 0);\\n  }\\n\\n  .selectContainer input::placeholder {\\n    color: var(--placeholderColor, #78848f);\\n  }\\n\\n  .selectContainer input:focus {\\n    outline: none;\\n  }\\n\\n  .selectContainer:hover {\\n    border-color: var(--borderHoverColor, #b2b8bf);\\n  }\\n\\n  .selectContainer.focused {\\n    border-color: var(--borderFocusColor, #006fe8);\\n  }\\n\\n  .selectContainer.disabled {\\n    background: var(--disabledBackground, #ebedef);\\n    border-color: var(--disabledBorderColor, #ebedef);\\n    color: var(--disabledColor, #c1c6cc);\\n  }\\n\\n  .selectContainer.disabled input::placeholder {\\n    color: var(--disabledPlaceholderColor, #c1c6cc);\\n  }\\n\\n  .selectedItem {\\n    line-height: var(--height, 42px);\\n    height: var(--height, 42px);\\n    overflow-x: hidden;\\n    padding: var(--selectedItemPadding, 0 20px 0 0);\\n  }\\n\\n  .selectedItem:focus {\\n    outline: none;\\n  }\\n\\n  .clearSelect {\\n    position: absolute;\\n    right: var(--clearSelectRight, 10px);\\n    top: var(--clearSelectTop, 11px);\\n    bottom: var(--clearSelectBottom, 11px);\\n    width: var(--clearSelectWidth, 20px);\\n    color: var(--clearSelectColor, #c5cacf);\\n    flex: none !important;\\n  }\\n\\n  .clearSelect:hover {\\n    color: var(--clearSelectHoverColor, #2c3e50);\\n  }\\n\\n  .selectContainer.focused .clearSelect {\\n    color: var(--clearSelectFocusColor, #3f4f5f);\\n  }\\n\\n  .indicator {\\n    position: absolute;\\n    right: var(--indicatorRight, 10px);\\n    top: var(--indicatorTop, 11px);\\n    width: var(--indicatorWidth, 20px);\\n    height: var(--indicatorHeight, 20px);\\n    color: var(--indicatorColor, #c5cacf);\\n  }\\n\\n  .indicator svg {\\n    display: inline-block;\\n    fill: var(--indicatorFill, currentcolor);\\n    line-height: 1;\\n    stroke: var(--indicatorStroke, currentcolor);\\n    stroke-width: 0;\\n  }\\n\\n  .spinner {\\n    position: absolute;\\n    right: var(--spinnerRight, 10px);\\n    top: var(--spinnerLeft, 11px);\\n    width: var(--spinnerWidth, 20px);\\n    height: var(--spinnerHeight, 20px);\\n    color: var(--spinnerColor, #51ce6c);\\n    animation: rotate 0.75s linear infinite;\\n  }\\n\\n  .spinner_icon {\\n    display: block;\\n    height: 100%;\\n    transform-origin: center center;\\n    width: 100%;\\n    position: absolute;\\n    top: 0;\\n    bottom: 0;\\n    left: 0;\\n    right: 0;\\n    margin: auto;\\n    -webkit-transform: none;\\n  }\\n\\n  .spinner_path {\\n    stroke-dasharray: 90;\\n    stroke-linecap: round;\\n  }\\n\\n  .multiSelect {\\n    display: flex;\\n    padding: var(--multiSelectPadding, 0 35px 0 16px);\\n    height: auto;\\n    flex-wrap: wrap;\\n  }\\n\\n  .multiSelect > * {\\n    flex: 1 1 50px;\\n  }\\n\\n  .selectContainer.multiSelect input {\\n    padding: var(--multiSelectInputPadding, 0);\\n    position: relative;\\n    margin: var(--multiSelectInputMargin, 0);\\n  }\\n\\n  .hasError {\\n    border: var(--errorBorder, 1px solid #ff2d55);\\n  }\\n\\n  @keyframes rotate {\\n    100% {\\n      transform: rotate(360deg);\\n    }\\n  }\\n</style>\\n\\n<svelte:window\\n  on:click={handleWindowClick}\\n  on:keydown={handleKeyDown}\\n  on:resize={getPosition} />\\n\\n<div\\n  class=\\\"{containerClasses}\\n  {hasError ? 'hasError' : ''}\\\"\\n  style={containerStyles}\\n  on:click={handleClick}\\n  bind:this={container}>\\n\\n  {#if Icon}\\n    <svelte:component this={Icon} />\\n  {/if}\\n\\n  {#if isMulti && selectedValue && selectedValue.length > 0}\\n    <svelte:component\\n      this={MultiSelection}\\n      {selectedValue}\\n      {getSelectionLabel}\\n      {activeSelectedValue}\\n      {isDisabled}\\n      on:multiItemClear={handleMultiItemClear}\\n      on:focus={handleFocus} />\\n  {/if}\\n\\n  {#if isDisabled}\\n    <input\\n      {..._inputAttributes}\\n      bind:this={input}\\n      on:focus={handleFocus}\\n      bind:value={filterText}\\n      placeholder={placeholderText}\\n      style={inputStyles}\\n      disabled />\\n  {:else}\\n    <input\\n      {..._inputAttributes}\\n      bind:this={input}\\n      on:focus={handleFocus}\\n      bind:value={filterText}\\n      placeholder={placeholderText}\\n      style={inputStyles} />\\n  {/if}\\n\\n  {#if !isMulti && showSelectedItem}\\n    <div class=\\\"selectedItem\\\" on:focus={handleFocus}>\\n      <svelte:component\\n        this={Selection}\\n        item={selectedValue}\\n        {getSelectionLabel} />\\n    </div>\\n  {/if}\\n\\n  {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}\\n    <div class=\\\"clearSelect\\\" on:click|preventDefault={handleClear}>\\n      <svg\\n        width=\\\"100%\\\"\\n        height=\\\"100%\\\"\\n        viewBox=\\\"-2 -2 50 50\\\"\\n        focusable=\\\"false\\\"\\n        role=\\\"presentation\\\">\\n        <path\\n          fill=\\\"currentColor\\\"\\n          d=\\\"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\\n          l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z\\\" />\\n      </svg>\\n    </div>\\n  {/if}\\n\\n  {#if showChevron && !selectedValue || (!isSearchable && !isDisabled && !isWaiting && ((showSelectedItem && !isClearable) || !showSelectedItem))}\\n    <div class=\\\"indicator\\\">\\n      <svg\\n        width=\\\"100%\\\"\\n        height=\\\"100%\\\"\\n        viewBox=\\\"0 0 20 20\\\"\\n        focusable=\\\"false\\\"\\n        class=\\\"css-19bqh2r\\\">\\n        <path\\n          d=\\\"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\\n          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\\n          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\\n          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\\n          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z\\\" />\\n      </svg>\\n    </div>\\n  {/if}\\n\\n  {#if isWaiting}\\n    <div class=\\\"spinner\\\">\\n      <svg class=\\\"spinner_icon\\\" viewBox=\\\"25 25 50 50\\\">\\n        <circle\\n          class=\\\"spinner_path\\\"\\n          cx=\\\"50\\\"\\n          cy=\\\"50\\\"\\n          r=\\\"20\\\"\\n          fill=\\\"none\\\"\\n          stroke=\\\"currentColor\\\"\\n          stroke-width=\\\"5\\\"\\n          stroke-miterlimit=\\\"10\\\" />\\n      </svg>\\n    </div>\\n  {/if}\\n</div>\\n\"],\"names\":[],\"mappings\":\"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\"}"
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
	code: "input.autocomplete-input{margin:0.9em;padding:0}.search.svelte-18vhdd5{width:18em;margin:0.6em;--placeholderColor:#73d56b;--borderRadius:4px;--cursor:pointer}",
	map: "{\"version\":3,\"file\":\"Search.svelte\",\"sources\":[\"Search.svelte\"],\"sourcesContent\":[\"<style>\\n    :global(input.autocomplete-input) {\\n        margin: 0.9em;\\n        padding: 0;\\n    }\\n    .search {\\n        width: 18em;\\n        margin: 0.6em;\\n        --placeholderColor: #73d56b;\\n        --borderRadius: 4px;\\n        --cursor: pointer;\\n    }\\n</style>\\n\\n<script>\\n    import { goto } from '@sapper/app'\\n    import { onMount } from 'svelte'\\n    import Select from 'svelte-select'\\n\\n    let selectedTea\\n    let teas = []\\n\\n    onMount(async () => {\\n        const res = await fetch('https://api-tea.oisiflorus.com/api/v1/teas')\\n        const normalize = str =>\\n            str.normalize('NFD').replace(/[\\\\u0300-\\\\u036f]/g, '')\\n        if (res.ok) {\\n            teas = (await res.json()).api\\n            teas = teas.map(tea => ({\\n                value: tea.ideogram,\\n                label: tea.ideogram + ' - ' + normalize(tea.pinyin),\\n                group: tea.type\\n            }))\\n        } else {\\n            throw new Error(text)\\n        }\\n    })\\n</script>\\n\\n<div class=\\\"search\\\">\\n    <Select\\n        items=\\\"{teas}\\\"\\n        bind:selectedTea\\n        placeholder=\\\"recherche\\\"\\n        groupBy=\\\"{tea => tea.group}\\\"\\n        noOptionsMessage=\\\"aucun thé trouvé\\\"\\n        on:select=\\\"{tea => {\\n            window.location.replace(`/fiche-${tea.detail.value}`)\\n        }}\\\"\\n        inputStyles=\\\"cursor: text;\\\"\\n    />\\n</div>\\n\"],\"names\":[],\"mappings\":\"AACY,wBAAwB,AAAE,CAAC,AAC/B,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,CAAC,AACd,CAAC,AACD,OAAO,eAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,kBAAkB,CAAE,OAAO,CAC3B,cAAc,CAAE,GAAG,CACnB,QAAQ,CAAE,OAAO,AACrB,CAAC\"}"
};

const Search = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let selectedTea;
	let teas = [];

	onMount(async () => {
		const res = await fetch("https://api-tea.oisiflorus.com/api/v1/teas");
		const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

		if (res.ok) {
			teas = (await res.json()).api;

			teas = teas.map(tea => ({
				value: tea.ideogram,
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

		$$rendered = `<div class="${"search svelte-18vhdd5"}">${validate_component(Select, "Select").$$render(
			$$result,
			{
				items: teas,
				placeholder: "recherche",
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
	code: "nav.svelte-118k2ex{border-bottom:1px solid rgba(255, 62, 0, 0.1);font-weight:300;padding:0 1em}ul.svelte-118k2ex{margin:0;padding:0}ul.svelte-118k2ex::after{content:'';display:block;clear:both}li.svelte-118k2ex{display:block;float:left}[aria-current].svelte-118k2ex{position:relative;display:inline-block}[aria-current].svelte-118k2ex::after{position:absolute;content:'';width:calc(100% - 1em);height:2px;background-color:rgb(255, 62, 0);display:block;bottom:-1px}a.svelte-118k2ex{font-size:1.2em;text-decoration:none;padding:1em 0.5em;display:block}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<style>\\n    nav {\\n        border-bottom: 1px solid rgba(255, 62, 0, 0.1);\\n        font-weight: 300;\\n        padding: 0 1em;\\n    }\\n\\n    ul {\\n        margin: 0;\\n        padding: 0;\\n    }\\n\\n    /* clearfix */\\n    ul::after {\\n        content: '';\\n        display: block;\\n        clear: both;\\n    }\\n\\n    li {\\n        display: block;\\n        float: left;\\n    }\\n\\n    [aria-current] {\\n        position: relative;\\n        display: inline-block;\\n    }\\n\\n    [aria-current]::after {\\n        position: absolute;\\n        content: '';\\n        width: calc(100% - 1em);\\n        height: 2px;\\n        background-color: rgb(255, 62, 0);\\n        display: block;\\n        bottom: -1px;\\n    }\\n\\n    a {\\n        font-size: 1.2em;\\n        text-decoration: none;\\n        padding: 1em 0.5em;\\n        display: block;\\n    }\\n</style>\\n\\n<script>\\n    import Search from '../components/Search.svelte'\\n    export let segment\\n</script>\\n\\n<nav>\\n    <ul>\\n        <li>\\n            <a\\n                aria-current=\\\"{segment === undefined ? 'page' : undefined}\\\"\\n                href=\\\".\\\"\\n            >\\n                accueil\\n            </a>\\n        </li>\\n        <li>\\n            <a\\n                rel=\\\"prefetch\\\"\\n                aria-current=\\\"{segment === 'liste-des-thes-tous' ? 'page' : undefined}\\\"\\n                href=\\\"liste-des-thes-tous\\\"\\n            >\\n                liste des thés\\n            </a>\\n        </li>\\n        <li>\\n            <a\\n                rel=\\\"prefetch\\\"\\n                href=\\\"documentation\\\"\\n                aria-current=\\\"{segment === 'documentation' ? 'page' : undefined}\\\"\\n            >\\n                documentation\\n            </a>\\n        </li>\\n        <li>\\n            <a\\n                rel=\\\"prefetch\\\"\\n                href=\\\"termes\\\"\\n                aria-current=\\\"{segment === 'termes' ? 'page' : undefined}\\\"\\n            >\\n                termes\\n            </a>\\n        </li>\\n        <li>\\n            <Search />\\n        </li>\\n\\n    </ul>\\n</nav>\\n\"],\"names\":[],\"mappings\":\"AACI,GAAG,eAAC,CAAC,AACD,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9C,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,CAAC,CAAC,GAAG,AAClB,CAAC,AAED,EAAE,eAAC,CAAC,AACA,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AAGD,iBAAE,OAAO,AAAC,CAAC,AACP,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACf,CAAC,AAED,EAAE,eAAC,CAAC,AACA,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACf,CAAC,AAED,CAAC,YAAY,CAAC,eAAC,CAAC,AACZ,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,AACzB,CAAC,AAED,CAAC,YAAY,gBAAC,OAAO,AAAC,CAAC,AACnB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CACvB,MAAM,CAAE,GAAG,CACX,gBAAgB,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACjC,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,AAChB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,SAAS,CAAE,KAAK,CAChB,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,GAAG,CAAC,KAAK,CAClB,OAAO,CAAE,KAAK,AAClB,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$g);

	return `<nav class="${"svelte-118k2ex"}"><ul class="${"svelte-118k2ex"}"><li class="${"svelte-118k2ex"}"><a${add_attribute("aria-current", segment === undefined ? "page" : undefined, 0)} href="${"."}" class="${"svelte-118k2ex"}">accueil
            </a></li>
        <li class="${"svelte-118k2ex"}"><a rel="${"prefetch"}"${add_attribute("aria-current", segment === "liste-des-thes-tous" ? "page" : undefined, 0)} href="${"liste-des-thes-tous"}" class="${"svelte-118k2ex"}">liste des thés
            </a></li>
        <li class="${"svelte-118k2ex"}"><a rel="${"prefetch"}" href="${"documentation"}"${add_attribute("aria-current", segment === "documentation" ? "page" : undefined, 0)} class="${"svelte-118k2ex"}">documentation
            </a></li>
        <li class="${"svelte-118k2ex"}"><a rel="${"prefetch"}" href="${"termes"}"${add_attribute("aria-current", segment === "termes" ? "page" : undefined, 0)} class="${"svelte-118k2ex"}">termes
            </a></li>
        <li class="${"svelte-118k2ex"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}</li></ul></nav>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.21.0 */

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);

	return `<main class="${"container"}">${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}
    <article class="${"blobContent"}" data-title="${"content"}">${$$slots.default ? $$slots.default({}) : ``}</article></main>`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// documentation/index.json.js
			pattern: /^\/documentation.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// documentation/[slug].json.js
			pattern: /^\/documentation\/([^\/]+?).json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes }
			]
		},

		{
			// liste-des-thes-[type].svelte
			pattern: /^\/liste-des-thes-([^\/]+?)\/?$/,
			parts: [
				{ name: "liste$45des$45thes$45$type", file: "liste-des-thes-[type].svelte", component: Liste_des_thes_u5Btypeu5D, preload: preload, params: match => ({ type: d(match[1]) }) }
			]
		},

		{
			// nous-contacter.svelte
			pattern: /^\/nous-contacter\/?$/,
			parts: [
				{ name: "nous$45contacter", file: "nous-contacter.svelte", component: Nous_contacter }
			]
		},

		{
			// documentation/index.svelte
			pattern: /^\/documentation\/?$/,
			parts: [
				{ name: "documentation", file: "documentation/index.svelte", component: Documentation, preload: preload$1 }
			]
		},

		{
			// documentation/[slug].svelte
			pattern: /^\/documentation\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "documentation_$slug", file: "documentation/[slug].svelte", component: U5Bslugu5D, preload: preload$2, params: match => ({ slug: d(match[1]) }) }
			]
		},

		{
			// fiche-[ideogram].svelte
			pattern: /^\/fiche-([^\/]+?)\/?$/,
			parts: [
				{ name: "fiche$45$ideogram", file: "fiche-[ideogram].svelte", component: Fiche_u5Bideogramu5D, preload: preload$3, params: match => ({ ideogram: d(match[1]) }) }
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

const build_dir = "__sapper__/dev";

const src_dir = "src";

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
	const get_build_info =  () => JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8'))
		;

	const template =  () => read_template(src_dir)
		;

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  escape_html(err.message) ;

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
		res.setHeader('Cache-Control',  'no-cache' );

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

function escape_html(html) {
	const chars = {
		'"' : 'quot',
		"'": '#39',
		'&': 'amp',
		'<' : 'lt',
		'>' : 'gt'
	};

	return html.replace(/["'&<>]/g, c => `&${chars[c]};`);
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
			cache_control:  'no-cache' 
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

	const read =  (file) => fs.readFileSync(path.join(build_dir, file))
		;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2RvY3VtZW50YXRpb24vaW5kZXguanNvbi5qcyIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvZG9jdW1lbnRhdGlvbi9bc2x1Z10uanNvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUvaW50ZXJuYWwvaW5kZXgubWpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvSWNvblRlYVR5cGUuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9saXN0ZS1kZXMtdGhlcy1bdHlwZV0uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9kb2N1bWVudGF0aW9uL2luZGV4LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvZG9jdW1lbnRhdGlvbi9bc2x1Z10uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQnJld3Muc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9maWNoZS1baWRlb2dyYW1dLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdGVybWVzLnN2ZWx0ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3RvcmUvaW5kZXgubWpzIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL3NoYXJlZC5tanMiLCIuLi8uLi8uLi9zcmMvcm91dGVzL19lcnJvci5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvQXBwLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9tYW5pZmVzdC1jbGllbnQubWpzIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2FwcC5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlLXNlbGVjdC9zcmMvSXRlbS5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlLXNlbGVjdC9zcmMvVmlydHVhbExpc3Quc3ZlbHRlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS1zZWxlY3Qvc3JjL0xpc3Quc3ZlbHRlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS1zZWxlY3Qvc3JjL1NlbGVjdGlvbi5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlLXNlbGVjdC9zcmMvTXVsdGlTZWxlY3Rpb24uc3ZlbHRlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS1zZWxlY3Qvc3JjL3V0aWxzL2lzT3V0T2ZWaWV3cG9ydC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtc2VsZWN0L3NyYy91dGlscy9kZWJvdW5jZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtc2VsZWN0L3NyYy9TZWxlY3Quc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvU2VhcmNoLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL05hdi5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL19sYXlvdXQuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL21hbmlmZXN0LXNlcnZlci5tanMiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvc2VydmVyLm1qcyIsIi4uLy4uLy4uL3NyYy9zZXJ2ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGdyYXlNYXR0ZXIgZnJvbSBcImdyYXktbWF0dGVyXCI7XG5cbmNvbnN0IGdldEFsbFBvc3RzID0gKCkgPT5cblx0ZnMucmVhZGRpclN5bmMoXCJjb250ZW50XCIpLm1hcChmaWxlTmFtZSA9PiB7XG5cdFx0Y29uc3QgcG9zdCA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoXCJjb250ZW50XCIsIGZpbGVOYW1lKSwgXCJ1dGYtOFwiKTtcblx0XHRyZXR1cm4gZ3JheU1hdHRlcihwb3N0KS5kYXRhO1xuXHR9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldChyZXEsIHJlcykge1xuXHRyZXMud3JpdGVIZWFkKDIwMCwge1xuXHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG5cdH0pO1xuXHRjb25zdCBwb3N0cyA9IGdldEFsbFBvc3RzKCk7XG5cdHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkocG9zdHMpKTtcbn0iLCJpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IGdyYXlNYXR0ZXIgZnJvbSBcImdyYXktbWF0dGVyXCI7XG5cbmNvbnN0IG1kID0gcmVxdWlyZSgnbWFya2Rvd24taXQnKSgpLnVzZShyZXF1aXJlKCdtYXJrZG93bi1pdC1mb290bm90ZScpKTtcblxuY29uc3QgZ2V0UG9zdCA9IGZpbGVOYW1lID0+XG5cdGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoXCJjb250ZW50XCIsIGAke2ZpbGVOYW1lfS5tZGApLCBcInV0Zi04XCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHJlcSwgcmVzLCBuZXh0KSB7XG5cdGNvbnN0IHsgc2x1ZyB9ID0gcmVxLnBhcmFtcztcblxuXHQvLyBnZXQgdGhlIG1hcmtkb3duIHRleHRcblx0Y29uc3QgcG9zdCA9IGdldFBvc3Qoc2x1Zyk7XG5cblx0Ly8gcGFyc2UgdGhlIG1kIHRvIGdldCBmcm9udCBtYXR0ZXJcblx0Ly8gYW5kIHRoZSBjb250ZW50IHdpdGhvdXQgZXNjYXBpbmcgY2hhcmFjdGVyc1xuXHRjb25zdCB7IGRhdGEsIGNvbnRlbnQgfSA9IGdyYXlNYXR0ZXIocG9zdCk7XG5cblx0Y29uc3QgaHRtbCA9IG1kLnJlbmRlcihjb250ZW50KTtcblxuXHRpZiAoaHRtbCkge1xuXHRcdHJlcy53cml0ZUhlYWQoMjAwLCB7XG5cdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdH0pO1xuXG5cdFx0cmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGh0bWwsIC4uLmRhdGEgfSkpO1xuXHR9IGVsc2Uge1xuXHRcdHJlcy53cml0ZUhlYWQoNDA0LCB7XG5cdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdH0pO1xuXG5cdFx0cmVzLmVuZChcblx0XHRcdEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0bWVzc2FnZTogYE5vdCBmb3VuZGBcblx0XHRcdH0pXG5cdFx0KTtcblx0fVxufSIsImZ1bmN0aW9uIG5vb3AoKSB7IH1cbmNvbnN0IGlkZW50aXR5ID0geCA9PiB4O1xuZnVuY3Rpb24gYXNzaWduKHRhciwgc3JjKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGZvciAoY29uc3QgayBpbiBzcmMpXG4gICAgICAgIHRhcltrXSA9IHNyY1trXTtcbiAgICByZXR1cm4gdGFyO1xufVxuZnVuY3Rpb24gaXNfcHJvbWlzZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gYWRkX2xvY2F0aW9uKGVsZW1lbnQsIGZpbGUsIGxpbmUsIGNvbHVtbiwgY2hhcikge1xuICAgIGVsZW1lbnQuX19zdmVsdGVfbWV0YSA9IHtcbiAgICAgICAgbG9jOiB7IGZpbGUsIGxpbmUsIGNvbHVtbiwgY2hhciB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHJ1bihmbikge1xuICAgIHJldHVybiBmbigpO1xufVxuZnVuY3Rpb24gYmxhbmtfb2JqZWN0KCkge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG51bGwpO1xufVxuZnVuY3Rpb24gcnVuX2FsbChmbnMpIHtcbiAgICBmbnMuZm9yRWFjaChydW4pO1xufVxuZnVuY3Rpb24gaXNfZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gc2FmZV9ub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiIHx8ICgoYSAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHx8IHR5cGVvZiBhID09PSAnZnVuY3Rpb24nKTtcbn1cbmZ1bmN0aW9uIG5vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGI7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9zdG9yZShzdG9yZSwgbmFtZSkge1xuICAgIGlmIChzdG9yZSAhPSBudWxsICYmIHR5cGVvZiBzdG9yZS5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnJHtuYW1lfScgaXMgbm90IGEgc3RvcmUgd2l0aCBhICdzdWJzY3JpYmUnIG1ldGhvZGApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN1YnNjcmliZShzdG9yZSwgLi4uY2FsbGJhY2tzKSB7XG4gICAgaWYgKHN0b3JlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuICAgIGNvbnN0IHVuc3ViID0gc3RvcmUuc3Vic2NyaWJlKC4uLmNhbGxiYWNrcyk7XG4gICAgcmV0dXJuIHVuc3ViLnVuc3Vic2NyaWJlID8gKCkgPT4gdW5zdWIudW5zdWJzY3JpYmUoKSA6IHVuc3ViO1xufVxuZnVuY3Rpb24gZ2V0X3N0b3JlX3ZhbHVlKHN0b3JlKSB7XG4gICAgbGV0IHZhbHVlO1xuICAgIHN1YnNjcmliZShzdG9yZSwgXyA9PiB2YWx1ZSA9IF8pKCk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gY29tcG9uZW50X3N1YnNjcmliZShjb21wb25lbnQsIHN0b3JlLCBjYWxsYmFjaykge1xuICAgIGNvbXBvbmVudC4kJC5vbl9kZXN0cm95LnB1c2goc3Vic2NyaWJlKHN0b3JlLCBjYWxsYmFjaykpO1xufVxuZnVuY3Rpb24gY3JlYXRlX3Nsb3QoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbikge1xuICAgIGlmIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY3R4ID0gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKTtcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25bMF0oc2xvdF9jdHgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbikge1xuICAgIHJldHVybiBkZWZpbml0aW9uWzFdICYmIGZuXG4gICAgICAgID8gYXNzaWduKCQkc2NvcGUuY3R4LnNsaWNlKCksIGRlZmluaXRpb25bMV0oZm4oY3R4KSkpXG4gICAgICAgIDogJCRzY29wZS5jdHg7XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jaGFuZ2VzKGRlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBmbikge1xuICAgIGlmIChkZWZpbml0aW9uWzJdICYmIGZuKSB7XG4gICAgICAgIGNvbnN0IGxldHMgPSBkZWZpbml0aW9uWzJdKGZuKGRpcnR5KSk7XG4gICAgICAgIGlmICgkJHNjb3BlLmRpcnR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBsZXRzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbGV0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbGVuID0gTWF0aC5tYXgoJCRzY29wZS5kaXJ0eS5sZW5ndGgsIGxldHMubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRbaV0gPSAkJHNjb3BlLmRpcnR5W2ldIHwgbGV0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtZXJnZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICQkc2NvcGUuZGlydHkgfCBsZXRzO1xuICAgIH1cbiAgICByZXR1cm4gJCRzY29wZS5kaXJ0eTtcbn1cbmZ1bmN0aW9uIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMocHJvcHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gcHJvcHMpXG4gICAgICAgIGlmIChrWzBdICE9PSAnJCcpXG4gICAgICAgICAgICByZXN1bHRba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY29tcHV0ZV9yZXN0X3Byb3BzKHByb3BzLCBrZXlzKSB7XG4gICAgY29uc3QgcmVzdCA9IHt9O1xuICAgIGtleXMgPSBuZXcgU2V0KGtleXMpO1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKCFrZXlzLmhhcyhrKSAmJiBrWzBdICE9PSAnJCcpXG4gICAgICAgICAgICByZXN0W2tdID0gcHJvcHNba107XG4gICAgcmV0dXJuIHJlc3Q7XG59XG5mdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgbGV0IHJhbiA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBpZiAocmFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgICBmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudWxsX3RvX2VtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X3N0b3JlX3ZhbHVlKHN0b3JlLCByZXQsIHZhbHVlID0gcmV0KSB7XG4gICAgc3RvcmUuc2V0KHZhbHVlKTtcbiAgICByZXR1cm4gcmV0O1xufVxuY29uc3QgaGFzX3Byb3AgPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbmZ1bmN0aW9uIGFjdGlvbl9kZXN0cm95ZXIoYWN0aW9uX3Jlc3VsdCkge1xuICAgIHJldHVybiBhY3Rpb25fcmVzdWx0ICYmIGlzX2Z1bmN0aW9uKGFjdGlvbl9yZXN1bHQuZGVzdHJveSkgPyBhY3Rpb25fcmVzdWx0LmRlc3Ryb3kgOiBub29wO1xufVxuXG5jb25zdCBpc19jbGllbnQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmxldCByYWYgPSBpc19jbGllbnQgPyBjYiA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpIDogbm9vcDtcbi8vIHVzZWQgaW50ZXJuYWxseSBmb3IgdGVzdGluZ1xuZnVuY3Rpb24gc2V0X25vdyhmbikge1xuICAgIG5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIHJhZiA9IGZuO1xufVxuXG5jb25zdCB0YXNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIHJ1bl90YXNrcyhub3cpIHtcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAoIXRhc2suYyhub3cpKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgICAgICB0YXNrLmYoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0YXNrcy5zaXplICE9PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbn1cbi8qKlxuICogRm9yIHRlc3RpbmcgcHVycG9zZXMgb25seSFcbiAqL1xuZnVuY3Rpb24gY2xlYXJfbG9vcHMoKSB7XG4gICAgdGFza3MuY2xlYXIoKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0YXNrIHRoYXQgcnVucyBvbiBlYWNoIHJhZiBmcmFtZVxuICogdW50aWwgaXQgcmV0dXJucyBhIGZhbHN5IHZhbHVlIG9yIGlzIGFib3J0ZWRcbiAqL1xuZnVuY3Rpb24gbG9vcChjYWxsYmFjaykge1xuICAgIGxldCB0YXNrO1xuICAgIGlmICh0YXNrcy5zaXplID09PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0geyBjOiBjYWxsYmFjaywgZjogZnVsZmlsbCB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHRhcmdldCwgbm9kZSkge1xuICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xufVxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2VhY2goaXRlcmF0aW9ucywgZGV0YWNoaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb25zW2ldKVxuICAgICAgICAgICAgaXRlcmF0aW9uc1tpXS5kKGRldGFjaGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG59XG5mdW5jdGlvbiBlbGVtZW50X2lzKG5hbWUsIGlzKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSwgeyBpcyB9KTtcbn1cbmZ1bmN0aW9uIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgICAgICBpZiAoaGFzX3Byb3Aob2JqLCBrKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgJiYgZXhjbHVkZS5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGFyZ2V0W2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cbmZ1bmN0aW9uIHRleHQoZGF0YSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cbmZ1bmN0aW9uIHNwYWNlKCkge1xuICAgIHJldHVybiB0ZXh0KCcgJyk7XG59XG5mdW5jdGlvbiBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGV4dCgnJyk7XG59XG5mdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcHJldmVudF9kZWZhdWx0KGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc3RvcF9wcm9wYWdhdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzZWxmKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgZWxzZSBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSAhPT0gdmFsdWUpXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG5vZGUuX19wcm90b19fKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfX3ZhbHVlJyB8fCBkZXNjcmlwdG9yc1trZXldICYmIGRlc2NyaXB0b3JzW2tleV0uc2V0KSB7XG4gICAgICAgICAgICBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdmdfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgIGlmIChwcm9wIGluIG5vZGUpIHtcbiAgICAgICAgbm9kZVtwcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0cihub2RlLCBwcm9wLCB2YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24geGxpbmtfYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGdyb3VwW2ldLmNoZWNrZWQpXG4gICAgICAgICAgICB2YWx1ZS5wdXNoKGdyb3VwW2ldLl9fdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiB0b19udW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICcnID8gdW5kZWZpbmVkIDogK3ZhbHVlO1xufVxuZnVuY3Rpb24gdGltZV9yYW5nZXNfdG9fYXJyYXkocmFuZ2VzKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcnJheS5wdXNoKHsgc3RhcnQ6IHJhbmdlcy5zdGFydChpKSwgZW5kOiByYW5nZXMuZW5kKGkpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG5mdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKTtcbn1cbmZ1bmN0aW9uIGNsYWltX2VsZW1lbnQobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIHN2Zykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgbGV0IGogPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGogPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gbm9kZS5hdHRyaWJ1dGVzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZS5uYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3ZnID8gc3ZnX2VsZW1lbnQobmFtZSkgOiBlbGVtZW50KG5hbWUpO1xufVxuZnVuY3Rpb24gY2xhaW1fdGV4dChub2RlcywgZGF0YSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgbm9kZS5kYXRhID0gJycgKyBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dChkYXRhKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3NwYWNlKG5vZGVzKSB7XG4gICAgcmV0dXJuIGNsYWltX3RleHQobm9kZXMsICcgJyk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YSh0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC5kYXRhICE9PSBkYXRhKVxuICAgICAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3ZhbHVlKGlucHV0LCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsIHx8IGlucHV0LnZhbHVlKSB7XG4gICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X2lucHV0X3R5cGUoaW5wdXQsIHR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgICBpbnB1dC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdHlsZShub2RlLCBrZXksIHZhbHVlLCBpbXBvcnRhbnQpIHtcbiAgICBub2RlLnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUsIGltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbihzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgaWYgKG9wdGlvbi5fX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb25zKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb24uX192YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X3ZhbHVlKHNlbGVjdCkge1xuICAgIGNvbnN0IHNlbGVjdGVkX29wdGlvbiA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpIHx8IHNlbGVjdC5vcHRpb25zWzBdO1xuICAgIHJldHVybiBzZWxlY3RlZF9vcHRpb24gJiYgc2VsZWN0ZWRfb3B0aW9uLl9fdmFsdWU7XG59XG5mdW5jdGlvbiBzZWxlY3RfbXVsdGlwbGVfdmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCBvcHRpb24gPT4gb3B0aW9uLl9fdmFsdWUpO1xufVxuLy8gdW5mb3J0dW5hdGVseSB0aGlzIGNhbid0IGJlIGEgY29uc3RhbnQgYXMgdGhhdCB3b3VsZG4ndCBiZSB0cmVlLXNoYWtlYWJsZVxuLy8gc28gd2UgY2FjaGUgdGhlIHJlc3VsdCBpbnN0ZWFkXG5sZXQgY3Jvc3NvcmlnaW47XG5mdW5jdGlvbiBpc19jcm9zc29yaWdpbigpIHtcbiAgICBpZiAoY3Jvc3NvcmlnaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcm9zc29yaWdpbiA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB2b2lkIHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjcm9zc29yaWdpbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNyb3Nzb3JpZ2luO1xufVxuZnVuY3Rpb24gYWRkX3Jlc2l6ZV9saXN0ZW5lcihub2RlLCBmbikge1xuICAgIGNvbnN0IGNvbXB1dGVkX3N0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBjb25zdCB6X2luZGV4ID0gKHBhcnNlSW50KGNvbXB1dGVkX3N0eWxlLnpJbmRleCkgfHwgMCkgLSAxO1xuICAgIGlmIChjb21wdXRlZF9zdHlsZS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgfVxuICAgIGNvbnN0IGlmcmFtZSA9IGVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGRpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgYCArXG4gICAgICAgIGBvdmVyZmxvdzogaGlkZGVuOyBib3JkZXI6IDA7IG9wYWNpdHk6IDA7IHBvaW50ZXItZXZlbnRzOiBub25lOyB6LWluZGV4OiAke3pfaW5kZXh9O2ApO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBpZnJhbWUudGFiSW5kZXggPSAtMTtcbiAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgaWYgKGlzX2Nyb3Nzb3JpZ2luKCkpIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9IGBkYXRhOnRleHQvaHRtbCw8c2NyaXB0Pm9ucmVzaXplPWZ1bmN0aW9uKCl7cGFyZW50LnBvc3RNZXNzYWdlKDAsJyonKX08L3NjcmlwdD5gO1xuICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3Rlbih3aW5kb3csICdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBpZnJhbWUuY29udGVudFdpbmRvdylcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICBpZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4oaWZyYW1lLmNvbnRlbnRXaW5kb3csICdyZXNpemUnLCBmbik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFwcGVuZChub2RlLCBpZnJhbWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRldGFjaChpZnJhbWUpO1xuICAgICAgICBpZiAodW5zdWJzY3JpYmUpXG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0b2dnbGVfY2xhc3MoZWxlbWVudCwgbmFtZSwgdG9nZ2xlKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3RbdG9nZ2xlID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG59XG5mdW5jdGlvbiBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgZGV0YWlsKTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIHF1ZXJ5X3NlbGVjdG9yX2FsbChzZWxlY3RvciwgcGFyZW50ID0gZG9jdW1lbnQuYm9keSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG5jbGFzcyBIdG1sVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihodG1sLCBhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZSA9IGVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmEgPSBhbmNob3I7XG4gICAgICAgIHRoaXMudShodG1sKTtcbiAgICB9XG4gICAgbSh0YXJnZXQsIGFuY2hvciA9IG51bGwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm4ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGluc2VydCh0YXJnZXQsIHRoaXMubltpXSwgYW5jaG9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgfVxuICAgIHUoaHRtbCkge1xuICAgICAgICB0aGlzLmUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGhpcy5uID0gQXJyYXkuZnJvbSh0aGlzLmUuY2hpbGROb2Rlcyk7XG4gICAgfVxuICAgIHAoaHRtbCkge1xuICAgICAgICB0aGlzLmQoKTtcbiAgICAgICAgdGhpcy51KGh0bWwpO1xuICAgICAgICB0aGlzLm0odGhpcy50LCB0aGlzLmEpO1xuICAgIH1cbiAgICBkKCkge1xuICAgICAgICB0aGlzLm4uZm9yRWFjaChkZXRhY2gpO1xuICAgIH1cbn1cblxuY29uc3QgYWN0aXZlX2RvY3MgPSBuZXcgU2V0KCk7XG5sZXQgYWN0aXZlID0gMDtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXJrc2t5YXBwL3N0cmluZy1oYXNoL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5mdW5jdGlvbiBoYXNoKHN0cikge1xuICAgIGxldCBoYXNoID0gNTM4MTtcbiAgICBsZXQgaSA9IHN0ci5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpIF4gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGhhc2ggPj4+IDA7XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGNvbnN0IGRvYyA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICBhY3RpdmVfZG9jcy5hZGQoZG9jKTtcbiAgICBjb25zdCBzdHlsZXNoZWV0ID0gZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQgfHwgKGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0ID0gZG9jLmhlYWQuYXBwZW5kQ2hpbGQoZWxlbWVudCgnc3R5bGUnKSkuc2hlZXQpO1xuICAgIGNvbnN0IGN1cnJlbnRfcnVsZXMgPSBkb2MuX19zdmVsdGVfcnVsZXMgfHwgKGRvYy5fX3N2ZWx0ZV9ydWxlcyA9IHt9KTtcbiAgICBpZiAoIWN1cnJlbnRfcnVsZXNbbmFtZV0pIHtcbiAgICAgICAgY3VycmVudF9ydWxlc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShgQGtleWZyYW1lcyAke25hbWV9ICR7cnVsZX1gLCBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnO1xuICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gYCR7YW5pbWF0aW9uID8gYCR7YW5pbWF0aW9ufSwgYCA6IGBgfSR7bmFtZX0gJHtkdXJhdGlvbn1tcyBsaW5lYXIgJHtkZWxheX1tcyAxIGJvdGhgO1xuICAgIGFjdGl2ZSArPSAxO1xuICAgIHJldHVybiBuYW1lO1xufVxuZnVuY3Rpb24gZGVsZXRlX3J1bGUobm9kZSwgbmFtZSkge1xuICAgIGNvbnN0IHByZXZpb3VzID0gKG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnKS5zcGxpdCgnLCAnKTtcbiAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMuZmlsdGVyKG5hbWVcbiAgICAgICAgPyBhbmltID0+IGFuaW0uaW5kZXhPZihuYW1lKSA8IDAgLy8gcmVtb3ZlIHNwZWNpZmljIGFuaW1hdGlvblxuICAgICAgICA6IGFuaW0gPT4gYW5pbS5pbmRleE9mKCdfX3N2ZWx0ZScpID09PSAtMSAvLyByZW1vdmUgYWxsIFN2ZWx0ZSBhbmltYXRpb25zXG4gICAgKTtcbiAgICBjb25zdCBkZWxldGVkID0gcHJldmlvdXMubGVuZ3RoIC0gbmV4dC5sZW5ndGg7XG4gICAgaWYgKGRlbGV0ZWQpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBuZXh0LmpvaW4oJywgJyk7XG4gICAgICAgIGFjdGl2ZSAtPSBkZWxldGVkO1xuICAgICAgICBpZiAoIWFjdGl2ZSlcbiAgICAgICAgICAgIGNsZWFyX3J1bGVzKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJfcnVsZXMoKSB7XG4gICAgcmFmKCgpID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYWN0aXZlX2RvY3MuZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0O1xuICAgICAgICAgICAgbGV0IGkgPSBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5kZWxldGVSdWxlKGkpO1xuICAgICAgICAgICAgZG9jLl9fc3ZlbHRlX3J1bGVzID0ge307XG4gICAgICAgIH0pO1xuICAgICAgICBhY3RpdmVfZG9jcy5jbGVhcigpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVfYW5pbWF0aW9uKG5vZGUsIGZyb20sIGZuLCBwYXJhbXMpIHtcbiAgICBpZiAoIWZyb20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHRvID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoZnJvbS5sZWZ0ID09PSB0by5sZWZ0ICYmIGZyb20ucmlnaHQgPT09IHRvLnJpZ2h0ICYmIGZyb20udG9wID09PSB0by50b3AgJiYgZnJvbS5ib3R0b20gPT09IHRvLmJvdHRvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBzaG91bGQgdGhpcyBiZSBzZXBhcmF0ZWQgZnJvbSBkZXN0cnVjdHVyaW5nPyBPciBzdGFydC9lbmQgYWRkZWQgdG8gcHVibGljIGFwaSBhbmQgZG9jdW1lbnRhdGlvbj9cbiAgICBzdGFydDogc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzpcbiAgICBlbmQgPSBzdGFydF90aW1lICsgZHVyYXRpb24sIHRpY2sgPSBub29wLCBjc3MgfSA9IGZuKG5vZGUsIHsgZnJvbSwgdG8gfSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICBsZXQgbmFtZTtcbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBuYW1lKTtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgIGlmICghc3RhcnRlZCAmJiBub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQgJiYgbm93ID49IGVuZCkge1xuICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHN0YXJ0X3RpbWU7XG4gICAgICAgICAgICBjb25zdCB0ID0gMCArIDEgKiBlYXNpbmcocCAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHN0YXJ0KCk7XG4gICAgdGljaygwLCAxKTtcbiAgICByZXR1cm4gc3RvcDtcbn1cbmZ1bmN0aW9uIGZpeF9wb3NpdGlvbihub2RlKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGlmIChzdHlsZS5wb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyAmJiBzdHlsZS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHN0eWxlO1xuICAgICAgICBjb25zdCBhID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgbm9kZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGFkZF90cmFuc2Zvcm0obm9kZSwgYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkX3RyYW5zZm9ybShub2RlLCBhKSB7XG4gICAgY29uc3QgYiA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGEubGVmdCAhPT0gYi5sZWZ0IHx8IGEudG9wICE9PSBiLnRvcCkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBzdHlsZS50cmFuc2Zvcm07XG4gICAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gYCR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHthLmxlZnQgLSBiLmxlZnR9cHgsICR7YS50b3AgLSBiLnRvcH1weClgO1xuICAgIH1cbn1cblxubGV0IGN1cnJlbnRfY29tcG9uZW50O1xuZnVuY3Rpb24gc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgIGN1cnJlbnRfY29tcG9uZW50ID0gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkge1xuICAgIGlmICghY3VycmVudF9jb21wb25lbnQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRnVuY3Rpb24gY2FsbGVkIG91dHNpZGUgY29tcG9uZW50IGluaXRpYWxpemF0aW9uYCk7XG4gICAgcmV0dXJuIGN1cnJlbnRfY29tcG9uZW50O1xufVxuZnVuY3Rpb24gYmVmb3JlVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYmVmb3JlX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uTW91bnQoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9tb3VudC5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFmdGVyVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYWZ0ZXJfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25EZXN0cm95KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fZGVzdHJveS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICByZXR1cm4gKHR5cGUsIGRldGFpbCkgPT4ge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW3R5cGVdO1xuICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAvLyBUT0RPIGFyZSB0aGVyZSBzaXR1YXRpb25zIHdoZXJlIGV2ZW50cyBjb3VsZCBiZSBkaXNwYXRjaGVkXG4gICAgICAgICAgICAvLyBpbiBhIHNlcnZlciAobm9uLURPTSkgZW52aXJvbm1lbnQ/XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjb21wb25lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNldENvbnRleHQoa2V5LCBjb250ZXh0KSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5zZXQoa2V5LCBjb250ZXh0KTtcbn1cbmZ1bmN0aW9uIGdldENvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuZ2V0KGtleSk7XG59XG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW2V2ZW50LnR5cGVdO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiBmbihldmVudCkpO1xuICAgIH1cbn1cblxuY29uc3QgZGlydHlfY29tcG9uZW50cyA9IFtdO1xuY29uc3QgaW50cm9zID0geyBlbmFibGVkOiBmYWxzZSB9O1xuY29uc3QgYmluZGluZ19jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlbmRlcl9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IGZsdXNoX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVzb2x2ZWRfcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xubGV0IHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIHNjaGVkdWxlX3VwZGF0ZSgpIHtcbiAgICBpZiAoIXVwZGF0ZV9zY2hlZHVsZWQpIHtcbiAgICAgICAgdXBkYXRlX3NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIHJlc29sdmVkX3Byb21pc2UudGhlbihmbHVzaCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdGljaygpIHtcbiAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICByZXR1cm4gcmVzb2x2ZWRfcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGFkZF9yZW5kZXJfY2FsbGJhY2soZm4pIHtcbiAgICByZW5kZXJfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWRkX2ZsdXNoX2NhbGxiYWNrKGZuKSB7XG4gICAgZmx1c2hfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxubGV0IGZsdXNoaW5nID0gZmFsc2U7XG5jb25zdCBzZWVuX2NhbGxiYWNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGlmIChmbHVzaGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICBkbyB7XG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlydHlfY29tcG9uZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZGlydHlfY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGNvbXBvbmVudC4kJCk7XG4gICAgICAgIH1cbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5sZW5ndGggPSAwO1xuICAgICAgICB3aGlsZSAoYmluZGluZ19jYWxsYmFja3MubGVuZ3RoKVxuICAgICAgICAgICAgYmluZGluZ19jYWxsYmFja3MucG9wKCkoKTtcbiAgICAgICAgLy8gdGhlbiwgb25jZSBjb21wb25lbnRzIGFyZSB1cGRhdGVkLCBjYWxsXG4gICAgICAgIC8vIGFmdGVyVXBkYXRlIGZ1bmN0aW9ucy4gVGhpcyBtYXkgY2F1c2VcbiAgICAgICAgLy8gc3Vic2VxdWVudCB1cGRhdGVzLi4uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSByZW5kZXJfY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgaWYgKCFzZWVuX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgLy8gLi4uc28gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBsb29wc1xuICAgICAgICAgICAgICAgIHNlZW5fY2FsbGJhY2tzLmFkZChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgfSB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpO1xuICAgIHdoaWxlIChmbHVzaF9jYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgIGZsdXNoX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgIH1cbiAgICB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgZmx1c2hpbmcgPSBmYWxzZTtcbiAgICBzZWVuX2NhbGxiYWNrcy5jbGVhcigpO1xufVxuZnVuY3Rpb24gdXBkYXRlKCQkKSB7XG4gICAgaWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICQkLnVwZGF0ZSgpO1xuICAgICAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgICAgICBjb25zdCBkaXJ0eSA9ICQkLmRpcnR5O1xuICAgICAgICAkJC5kaXJ0eSA9IFstMV07XG4gICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LnAoJCQuY3R4LCBkaXJ0eSk7XG4gICAgICAgICQkLmFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbn1cblxubGV0IHByb21pc2U7XG5mdW5jdGlvbiB3YWl0KCkge1xuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZGlyZWN0aW9uLCBraW5kKSB7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudChgJHtkaXJlY3Rpb24gPyAnaW50cm8nIDogJ291dHJvJ30ke2tpbmR9YCkpO1xufVxuY29uc3Qgb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5sZXQgb3V0cm9zO1xuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xuICAgIG91dHJvcyA9IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgYzogW10sXG4gICAgICAgIHA6IG91dHJvcyAvLyBwYXJlbnQgZ3JvdXBcbiAgICB9O1xufVxuZnVuY3Rpb24gY2hlY2tfb3V0cm9zKCkge1xuICAgIGlmICghb3V0cm9zLnIpIHtcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XG4gICAgfVxuICAgIG91dHJvcyA9IG91dHJvcy5wO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9pbihibG9jaywgbG9jYWwpIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2suaSkge1xuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICBibG9jay5pKGxvY2FsKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX291dChibG9jaywgbG9jYWwsIGRldGFjaCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2subykge1xuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb3V0cm9pbmcuYWRkKGJsb2NrKTtcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZCgxKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYmxvY2subyhsb2NhbCk7XG4gICAgfVxufVxuY29uc3QgbnVsbF90cmFuc2l0aW9uID0geyBkdXJhdGlvbjogMCB9O1xuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGxldCB0YXNrO1xuICAgIGxldCB1aWQgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MsIHVpZCsrKTtcbiAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGFzaylcbiAgICAgICAgICAgIHRhc2suYWJvcnQoKTtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ3N0YXJ0JykpO1xuICAgICAgICB0YXNrID0gbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHRydWUsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChzdGFydGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbihnbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkYXRlKCkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX291dF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGNvbnN0IGdyb3VwID0gb3V0cm9zO1xuICAgIGdyb3VwLnIgKz0gMTtcbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMSwgMCwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ3N0YXJ0JykpO1xuICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWdyb3VwLnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCByZXN1bHQgaW4gYGVuZCgpYCBiZWluZyBjYWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHRvIGNsZWFuIHVwIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwoZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSAtIHQsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICBnbygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdvKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVuZChyZXNldCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0ICYmIGNvbmZpZy50aWNrKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpY2soMSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMsIGludHJvKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHQgPSBpbnRybyA/IDAgOiAxO1xuICAgIGxldCBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBhbmltYXRpb25fbmFtZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gY2xlYXJfYW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQocHJvZ3JhbSwgZHVyYXRpb24pIHtcbiAgICAgICAgY29uc3QgZCA9IHByb2dyYW0uYiAtIHQ7XG4gICAgICAgIGR1cmF0aW9uICo9IE1hdGguYWJzKGQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYTogdCxcbiAgICAgICAgICAgIGI6IHByb2dyYW0uYixcbiAgICAgICAgICAgIGQsXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgIHN0YXJ0OiBwcm9ncmFtLnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBwcm9ncmFtLnN0YXJ0ICsgZHVyYXRpb24sXG4gICAgICAgICAgICBncm91cDogcHJvZ3JhbS5ncm91cFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBnbyhiKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSB7XG4gICAgICAgICAgICBzdGFydDogbm93KCkgKyBkZWxheSxcbiAgICAgICAgICAgIGJcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFiKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgcHJvZ3JhbS5ncm91cCA9IG91dHJvcztcbiAgICAgICAgICAgIG91dHJvcy5yICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW4gaW50cm8sIGFuZCB0aGVyZSdzIGEgZGVsYXksIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgIC8vIGFuIGluaXRpYWwgdGljayBhbmQvb3IgYXBwbHkgQ1NTIGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYilcbiAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGIsICdzdGFydCcpKTtcbiAgICAgICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ19wcm9ncmFtICYmIG5vdyA+IHBlbmRpbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHBlbmRpbmdfcHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBydW5uaW5nX3Byb2dyYW0uYiwgcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uLCAwLCBlYXNpbmcsIGNvbmZpZy5jc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQgPSBydW5uaW5nX3Byb2dyYW0uYiwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0uYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRybyDigJQgd2UgY2FuIHRpZHkgdXAgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdXRybyDigJQgbmVlZHMgdG8gYmUgY29vcmRpbmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChydW5uaW5nX3Byb2dyYW0uZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gbm93IC0gcnVubmluZ19wcm9ncmFtLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHJ1bm5pbmdfcHJvZ3JhbS5hICsgcnVubmluZ19wcm9ncmFtLmQgKiBlYXNpbmcocCAvIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISEocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBydW4oYikge1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wcm9taXNlKHByb21pc2UsIGluZm8pIHtcbiAgICBjb25zdCB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcbiAgICBmdW5jdGlvbiB1cGRhdGUodHlwZSwgaW5kZXgsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGluZm8udG9rZW4gIT09IHRva2VuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbmZvLnJlc29sdmVkID0gdmFsdWU7XG4gICAgICAgIGxldCBjaGlsZF9jdHggPSBpbmZvLmN0eDtcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGlsZF9jdHggPSBjaGlsZF9jdHguc2xpY2UoKTtcbiAgICAgICAgICAgIGNoaWxkX2N0eFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmxvY2sgPSB0eXBlICYmIChpbmZvLmN1cnJlbnQgPSB0eXBlKShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgbmVlZHNfZmx1c2ggPSBmYWxzZTtcbiAgICAgICAgaWYgKGluZm8uYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzLmZvckVhY2goKGJsb2NrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBpbmRleCAmJiBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2suZCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICAgICAgYmxvY2subShpbmZvLm1vdW50KCksIGluZm8uYW5jaG9yKTtcbiAgICAgICAgICAgIG5lZWRzX2ZsdXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLmJsb2NrID0gYmxvY2s7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrcylcbiAgICAgICAgICAgIGluZm8uYmxvY2tzW2luZGV4XSA9IGJsb2NrO1xuICAgICAgICBpZiAobmVlZHNfZmx1c2gpIHtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzX3Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudF9jb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgd2UgcHJldmlvdXNseSBoYWQgYSB0aGVuL2NhdGNoIGJsb2NrLCBkZXN0cm95IGl0XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8ucGVuZGluZykge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8ucGVuZGluZywgMCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby50aGVuKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSBwcm9taXNlO1xuICAgIH1cbn1cblxuY29uc3QgZ2xvYmFscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgID8gd2luZG93XG4gICAgOiB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyBnbG9iYWxUaGlzXG4gICAgICAgIDogZ2xvYmFsKTtcblxuZnVuY3Rpb24gZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZCgxKTtcbiAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG59XG5mdW5jdGlvbiBvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgdHJhbnNpdGlvbl9vdXQoYmxvY2ssIDEsIDEsICgpID0+IHtcbiAgICAgICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZml4X2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZV9rZXllZF9lYWNoKG9sZF9ibG9ja3MsIGRpcnR5LCBnZXRfa2V5LCBkeW5hbWljLCBjdHgsIGxpc3QsIGxvb2t1cCwgbm9kZSwgZGVzdHJveSwgY3JlYXRlX2VhY2hfYmxvY2ssIG5leHQsIGdldF9jb250ZXh0KSB7XG4gICAgbGV0IG8gPSBvbGRfYmxvY2tzLmxlbmd0aDtcbiAgICBsZXQgbiA9IGxpc3QubGVuZ3RoO1xuICAgIGxldCBpID0gbztcbiAgICBjb25zdCBvbGRfaW5kZXhlcyA9IHt9O1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIG9sZF9pbmRleGVzW29sZF9ibG9ja3NbaV0ua2V5XSA9IGk7XG4gICAgY29uc3QgbmV3X2Jsb2NrcyA9IFtdO1xuICAgIGNvbnN0IG5ld19sb29rdXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgZGVsdGFzID0gbmV3IE1hcCgpO1xuICAgIGkgPSBuO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgY2hpbGRfY3R4ID0gZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKTtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0X2tleShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgYmxvY2sgPSBsb29rdXAuZ2V0KGtleSk7XG4gICAgICAgIGlmICghYmxvY2spIHtcbiAgICAgICAgICAgIGJsb2NrID0gY3JlYXRlX2VhY2hfYmxvY2soa2V5LCBjaGlsZF9jdHgpO1xuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGR5bmFtaWMpIHtcbiAgICAgICAgICAgIGJsb2NrLnAoY2hpbGRfY3R4LCBkaXJ0eSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3X2xvb2t1cC5zZXQoa2V5LCBuZXdfYmxvY2tzW2ldID0gYmxvY2spO1xuICAgICAgICBpZiAoa2V5IGluIG9sZF9pbmRleGVzKVxuICAgICAgICAgICAgZGVsdGFzLnNldChrZXksIE1hdGguYWJzKGkgLSBvbGRfaW5kZXhlc1trZXldKSk7XG4gICAgfVxuICAgIGNvbnN0IHdpbGxfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBkaWRfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBmdW5jdGlvbiBpbnNlcnQoYmxvY2spIHtcbiAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgIGJsb2NrLm0obm9kZSwgbmV4dCwgbG9va3VwLmhhcyhibG9jay5rZXkpKTtcbiAgICAgICAgbG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIHdoaWxlIChvICYmIG4pIHtcbiAgICAgICAgY29uc3QgbmV3X2Jsb2NrID0gbmV3X2Jsb2Nrc1tuIC0gMV07XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcbiAgICAgICAgY29uc3Qgb2xkX2tleSA9IG9sZF9ibG9jay5rZXk7XG4gICAgICAgIGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgbmV4dCA9IG5ld19ibG9jay5maXJzdDtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsb29rdXAuaGFzKG5ld19rZXkpIHx8IHdpbGxfbW92ZS5oYXMobmV3X2tleSkpIHtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBkaWRfbW92ZS5hZGQobmV3X2tleSk7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG8tLSkge1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW29dO1xuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgfVxuICAgIHdoaWxlIChuKVxuICAgICAgICBpbnNlcnQobmV3X2Jsb2Nrc1tuIC0gMV0pO1xuICAgIHJldHVybiBuZXdfYmxvY2tzO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9rZXlzKGN0eCwgbGlzdCwgZ2V0X2NvbnRleHQsIGdldF9rZXkpIHtcbiAgICBjb25zdCBrZXlzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSkpO1xuICAgICAgICBpZiAoa2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgaGF2ZSBkdXBsaWNhdGUga2V5cyBpbiBhIGtleWVkIGVhY2hgKTtcbiAgICAgICAgfVxuICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XG4gICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgY29uc3QgdG9fbnVsbF9vdXQgPSB7fTtcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XG4gICAgbGV0IGkgPSBsZXZlbHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcbiAgICAgICAgY29uc3QgbiA9IHVwZGF0ZXNbaV07XG4gICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIG4pKVxuICAgICAgICAgICAgICAgICAgICB0b19udWxsX291dFtrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRlZF9mb3Jba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbHNbaV0gPSBuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHVwZGF0ZSkpXG4gICAgICAgICAgICB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbn1cbmZ1bmN0aW9uIGdldF9zcHJlYWRfb2JqZWN0KHNwcmVhZF9wcm9wcykge1xuICAgIHJldHVybiB0eXBlb2Ygc3ByZWFkX3Byb3BzID09PSAnb2JqZWN0JyAmJiBzcHJlYWRfcHJvcHMgIT09IG51bGwgPyBzcHJlYWRfcHJvcHMgOiB7fTtcbn1cblxuLy8gc291cmNlOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWxcbmNvbnN0IGJvb2xlYW5fYXR0cmlidXRlcyA9IG5ldyBTZXQoW1xuICAgICdhbGxvd2Z1bGxzY3JlZW4nLFxuICAgICdhbGxvd3BheW1lbnRyZXF1ZXN0JyxcbiAgICAnYXN5bmMnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdhdXRvcGxheScsXG4gICAgJ2NoZWNrZWQnLFxuICAgICdjb250cm9scycsXG4gICAgJ2RlZmF1bHQnLFxuICAgICdkZWZlcicsXG4gICAgJ2Rpc2FibGVkJyxcbiAgICAnZm9ybW5vdmFsaWRhdGUnLFxuICAgICdoaWRkZW4nLFxuICAgICdpc21hcCcsXG4gICAgJ2xvb3AnLFxuICAgICdtdWx0aXBsZScsXG4gICAgJ211dGVkJyxcbiAgICAnbm9tb2R1bGUnLFxuICAgICdub3ZhbGlkYXRlJyxcbiAgICAnb3BlbicsXG4gICAgJ3BsYXlzaW5saW5lJyxcbiAgICAncmVhZG9ubHknLFxuICAgICdyZXF1aXJlZCcsXG4gICAgJ3JldmVyc2VkJyxcbiAgICAnc2VsZWN0ZWQnXG5dKTtcblxuY29uc3QgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPSAvW1xccydcIj4vPVxcdXtGREQwfS1cXHV7RkRFRn1cXHV7RkZGRX1cXHV7RkZGRn1cXHV7MUZGRkV9XFx1ezFGRkZGfVxcdXsyRkZGRX1cXHV7MkZGRkZ9XFx1ezNGRkZFfVxcdXszRkZGRn1cXHV7NEZGRkV9XFx1ezRGRkZGfVxcdXs1RkZGRX1cXHV7NUZGRkZ9XFx1ezZGRkZFfVxcdXs2RkZGRn1cXHV7N0ZGRkV9XFx1ezdGRkZGfVxcdXs4RkZGRX1cXHV7OEZGRkZ9XFx1ezlGRkZFfVxcdXs5RkZGRn1cXHV7QUZGRkV9XFx1e0FGRkZGfVxcdXtCRkZGRX1cXHV7QkZGRkZ9XFx1e0NGRkZFfVxcdXtDRkZGRn1cXHV7REZGRkV9XFx1e0RGRkZGfVxcdXtFRkZGRX1cXHV7RUZGRkZ9XFx1e0ZGRkZFfVxcdXtGRkZGRn1cXHV7MTBGRkZFfVxcdXsxMEZGRkZ9XS91O1xuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jbm9uY2hhcmFjdGVyXG5mdW5jdGlvbiBzcHJlYWQoYXJncywgY2xhc3Nlc190b19hZGQpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgLi4uYXJncyk7XG4gICAgaWYgKGNsYXNzZXNfdG9fYWRkKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLmNsYXNzID09IG51bGwpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgPSBjbGFzc2VzX3RvX2FkZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgKz0gJyAnICsgY2xhc3Nlc190b19hZGQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGlmIChpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3Rlci50ZXN0KG5hbWUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHN0ciArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGJvb2xlYW5fYXR0cmlidXRlcy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHN0ciArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3RyICs9IGAgJHtuYW1lfT1cIiR7U3RyaW5nKHZhbHVlKS5yZXBsYWNlKC9cIi9nLCAnJiMzNDsnKS5yZXBsYWNlKC8nL2csICcmIzM5OycpfVwiYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHI7XG59XG5jb25zdCBlc2NhcGVkID0ge1xuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7J1xufTtcbmZ1bmN0aW9uIGVzY2FwZShodG1sKSB7XG4gICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC9bXCInJjw+XS9nLCBtYXRjaCA9PiBlc2NhcGVkW21hdGNoXSk7XG59XG5mdW5jdGlvbiBlYWNoKGl0ZW1zLCBmbikge1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHN0ciArPSBmbihpdGVtc1tpXSwgaSk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5jb25zdCBtaXNzaW5nX2NvbXBvbmVudCA9IHtcbiAgICAkJHJlbmRlcjogKCkgPT4gJydcbn07XG5mdW5jdGlvbiB2YWxpZGF0ZV9jb21wb25lbnQoY29tcG9uZW50LCBuYW1lKSB7XG4gICAgaWYgKCFjb21wb25lbnQgfHwgIWNvbXBvbmVudC4kJHJlbmRlcikge1xuICAgICAgICBpZiAobmFtZSA9PT0gJ3N2ZWx0ZTpjb21wb25lbnQnKVxuICAgICAgICAgICAgbmFtZSArPSAnIHRoaXM9ey4uLn0nO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYDwke25hbWV9PiBpcyBub3QgYSB2YWxpZCBTU1IgY29tcG9uZW50LiBZb3UgbWF5IG5lZWQgdG8gcmV2aWV3IHlvdXIgYnVpbGQgY29uZmlnIHRvIGVuc3VyZSB0aGF0IGRlcGVuZGVuY2llcyBhcmUgY29tcGlsZWQsIHJhdGhlciB0aGFuIGltcG9ydGVkIGFzIHByZS1jb21waWxlZCBtb2R1bGVzYCk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBkZWJ1ZyhmaWxlLCBsaW5lLCBjb2x1bW4sIHZhbHVlcykge1xuICAgIGNvbnNvbGUubG9nKGB7QGRlYnVnfSAke2ZpbGUgPyBmaWxlICsgJyAnIDogJyd9KCR7bGluZX06JHtjb2x1bW59KWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyh2YWx1ZXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICByZXR1cm4gJyc7XG59XG5sZXQgb25fZGVzdHJveTtcbmZ1bmN0aW9uIGNyZWF0ZV9zc3JfY29tcG9uZW50KGZuKSB7XG4gICAgZnVuY3Rpb24gJCRyZW5kZXIocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgICAgICAgY29uc3QgJCQgPSB7XG4gICAgICAgICAgICBvbl9kZXN0cm95LFxuICAgICAgICAgICAgY29udGV4dDogbmV3IE1hcChwYXJlbnRfY29tcG9uZW50ID8gcGFyZW50X2NvbXBvbmVudC4kJC5jb250ZXh0IDogW10pLFxuICAgICAgICAgICAgLy8gdGhlc2Ugd2lsbCBiZSBpbW1lZGlhdGVseSBkaXNjYXJkZWRcbiAgICAgICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KClcbiAgICAgICAgfTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHsgJCQgfSk7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBmbihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpO1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQocGFyZW50X2NvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZW5kZXI6IChwcm9wcyA9IHt9LCBvcHRpb25zID0ge30pID0+IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdGl0bGU6ICcnLCBoZWFkOiAnJywgY3NzOiBuZXcgU2V0KCkgfTtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCB7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBydW5fYWxsKG9uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBBcnJheS5mcm9tKHJlc3VsdC5jc3MpLm1hcChjc3MgPT4gY3NzLmNvZGUpLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBtYXA6IG51bGwgLy8gVE9ET1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZDogcmVzdWx0LnRpdGxlICsgcmVzdWx0LmhlYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICQkcmVuZGVyXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFkZF9hdHRyaWJ1dGUobmFtZSwgdmFsdWUsIGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAoYm9vbGVhbiAmJiAhdmFsdWUpKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGAgJHtuYW1lfSR7dmFsdWUgPT09IHRydWUgPyAnJyA6IGA9JHt0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gSlNPTi5zdHJpbmdpZnkoZXNjYXBlKHZhbHVlKSkgOiBgXCIke3ZhbHVlfVwiYH1gfWA7XG59XG5mdW5jdGlvbiBhZGRfY2xhc3NlcyhjbGFzc2VzKSB7XG4gICAgcmV0dXJuIGNsYXNzZXMgPyBgIGNsYXNzPVwiJHtjbGFzc2VzfVwiYCA6IGBgO1xufVxuXG5mdW5jdGlvbiBiaW5kKGNvbXBvbmVudCwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpbmRleCA9IGNvbXBvbmVudC4kJC5wcm9wc1tuYW1lXTtcbiAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb21wb25lbnQuJCQuYm91bmRbaW5kZXhdID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrKGNvbXBvbmVudC4kJC5jdHhbaW5kZXhdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVfY29tcG9uZW50KGJsb2NrKSB7XG4gICAgYmxvY2sgJiYgYmxvY2suYygpO1xufVxuZnVuY3Rpb24gY2xhaW1fY29tcG9uZW50KGJsb2NrLCBwYXJlbnRfbm9kZXMpIHtcbiAgICBibG9jayAmJiBibG9jay5sKHBhcmVudF9ub2Rlcyk7XG59XG5mdW5jdGlvbiBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCB0YXJnZXQsIGFuY2hvcikge1xuICAgIGNvbnN0IHsgZnJhZ21lbnQsIG9uX21vdW50LCBvbl9kZXN0cm95LCBhZnRlcl91cGRhdGUgfSA9IGNvbXBvbmVudC4kJDtcbiAgICBmcmFnbWVudCAmJiBmcmFnbWVudC5tKHRhcmdldCwgYW5jaG9yKTtcbiAgICAvLyBvbk1vdW50IGhhcHBlbnMgYmVmb3JlIHRoZSBpbml0aWFsIGFmdGVyVXBkYXRlXG4gICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld19vbl9kZXN0cm95ID0gb25fbW91bnQubWFwKHJ1bikuZmlsdGVyKGlzX2Z1bmN0aW9uKTtcbiAgICAgICAgaWYgKG9uX2Rlc3Ryb3kpIHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kucHVzaCguLi5uZXdfb25fZGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBFZGdlIGNhc2UgLSBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgIC8vIG1vc3QgbGlrZWx5IGFzIGEgcmVzdWx0IG9mIGEgYmluZGluZyBpbml0aWFsaXNpbmdcbiAgICAgICAgICAgIHJ1bl9hbGwobmV3X29uX2Rlc3Ryb3kpO1xuICAgICAgICB9XG4gICAgICAgIGNvbXBvbmVudC4kJC5vbl9tb3VudCA9IFtdO1xuICAgIH0pO1xuICAgIGFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gZGVzdHJveV9jb21wb25lbnQoY29tcG9uZW50LCBkZXRhY2hpbmcpIHtcbiAgICBjb25zdCAkJCA9IGNvbXBvbmVudC4kJDtcbiAgICBpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgcnVuX2FsbCgkJC5vbl9kZXN0cm95KTtcbiAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuZChkZXRhY2hpbmcpO1xuICAgICAgICAvLyBUT0RPIG51bGwgb3V0IG90aGVyIHJlZnMsIGluY2x1ZGluZyBjb21wb25lbnQuJCQgKGJ1dCBuZWVkIHRvXG4gICAgICAgIC8vIHByZXNlcnZlIGZpbmFsIHN0YXRlPylcbiAgICAgICAgJCQub25fZGVzdHJveSA9ICQkLmZyYWdtZW50ID0gbnVsbDtcbiAgICAgICAgJCQuY3R4ID0gW107XG4gICAgfVxufVxuZnVuY3Rpb24gbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpIHtcbiAgICBpZiAoY29tcG9uZW50LiQkLmRpcnR5WzBdID09PSAtMSkge1xuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgICAgIGNvbXBvbmVudC4kJC5kaXJ0eS5maWxsKDApO1xuICAgIH1cbiAgICBjb21wb25lbnQuJCQuZGlydHlbKGkgLyAzMSkgfCAwXSB8PSAoMSA8PCAoaSAlIDMxKSk7XG59XG5mdW5jdGlvbiBpbml0KGNvbXBvbmVudCwgb3B0aW9ucywgaW5zdGFuY2UsIGNyZWF0ZV9mcmFnbWVudCwgbm90X2VxdWFsLCBwcm9wcywgZGlydHkgPSBbLTFdKSB7XG4gICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgIGNvbnN0IHByb3BfdmFsdWVzID0gb3B0aW9ucy5wcm9wcyB8fCB7fTtcbiAgICBjb25zdCAkJCA9IGNvbXBvbmVudC4kJCA9IHtcbiAgICAgICAgZnJhZ21lbnQ6IG51bGwsXG4gICAgICAgIGN0eDogbnVsbCxcbiAgICAgICAgLy8gc3RhdGVcbiAgICAgICAgcHJvcHMsXG4gICAgICAgIHVwZGF0ZTogbm9vcCxcbiAgICAgICAgbm90X2VxdWFsLFxuICAgICAgICBib3VuZDogYmxhbmtfb2JqZWN0KCksXG4gICAgICAgIC8vIGxpZmVjeWNsZVxuICAgICAgICBvbl9tb3VudDogW10sXG4gICAgICAgIG9uX2Rlc3Ryb3k6IFtdLFxuICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgY29udGV4dDogbmV3IE1hcChwYXJlbnRfY29tcG9uZW50ID8gcGFyZW50X2NvbXBvbmVudC4kJC5jb250ZXh0IDogW10pLFxuICAgICAgICAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgZGlydHlcbiAgICB9O1xuICAgIGxldCByZWFkeSA9IGZhbHNlO1xuICAgICQkLmN0eCA9IGluc3RhbmNlXG4gICAgICAgID8gaW5zdGFuY2UoY29tcG9uZW50LCBwcm9wX3ZhbHVlcywgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICgkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50Lmwobm9kZXMpO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChkZXRhY2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLiQkLnNsb3R0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy4kJC5zbG90dGVkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBfb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW2F0dHJdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgJGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgICAgICB9XG4gICAgICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gVE9ETyBzaG91bGQgdGhpcyBkZWxlZ2F0ZSB0byBhZGRFdmVudExpc3RlbmVyP1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAkc2V0KCkge1xuICAgICAgICAgICAgLy8gb3ZlcnJpZGRlbiBieSBpbnN0YW5jZSwgaWYgaXQgaGFzIHByb3BzXG4gICAgICAgIH1cbiAgICB9O1xufVxuY2xhc3MgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgZGVzdHJveV9jb21wb25lbnQodGhpcywgMSk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgIH1cbiAgICAkb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgJHNldCgpIHtcbiAgICAgICAgLy8gb3ZlcnJpZGRlbiBieSBpbnN0YW5jZSwgaWYgaXQgaGFzIHByb3BzXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaF9kZXYodHlwZSwgZGV0YWlsKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQodHlwZSwgT2JqZWN0LmFzc2lnbih7IHZlcnNpb246ICczLjIxLjAnIH0sIGRldGFpbCkpKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NSW5zZXJ0XCIsIHsgdGFyZ2V0LCBub2RlIH0pO1xuICAgIGFwcGVuZCh0YXJnZXQsIG5vZGUpO1xufVxuZnVuY3Rpb24gaW5zZXJ0X2Rldih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTUluc2VydFwiLCB7IHRhcmdldCwgbm9kZSwgYW5jaG9yIH0pO1xuICAgIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcik7XG59XG5mdW5jdGlvbiBkZXRhY2hfZGV2KG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVcIiwgeyBub2RlIH0pO1xuICAgIGRldGFjaChub2RlKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZyAmJiBiZWZvcmUubmV4dFNpYmxpbmcgIT09IGFmdGVyKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYmVmb3JlX2RldihhZnRlcikge1xuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9hZnRlcl9kZXYoYmVmb3JlKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBvcHRpb25zID09PSB0cnVlID8gW1wiY2FwdHVyZVwiXSA6IG9wdGlvbnMgPyBBcnJheS5mcm9tKE9iamVjdC5rZXlzKG9wdGlvbnMpKSA6IFtdO1xuICAgIGlmIChoYXNfcHJldmVudF9kZWZhdWx0KVxuICAgICAgICBtb2RpZmllcnMucHVzaCgncHJldmVudERlZmF1bHQnKTtcbiAgICBpZiAoaGFzX3N0b3BfcHJvcGFnYXRpb24pXG4gICAgICAgIG1vZGlmaWVycy5wdXNoKCdzdG9wUHJvcGFnYXRpb24nKTtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01BZGRFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICBjb25zdCBkaXNwb3NlID0gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICAgICAgZGlzcG9zZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyX2Rldihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NUmVtb3ZlQXR0cmlidXRlXCIsIHsgbm9kZSwgYXR0cmlidXRlIH0pO1xuICAgIGVsc2VcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0QXR0cmlidXRlXCIsIHsgbm9kZSwgYXR0cmlidXRlLCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHByb3BfZGV2KG5vZGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIG5vZGVbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0UHJvcGVydHlcIiwgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlLmRhdGFzZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0RGF0YXNldFwiLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhX2Rldih0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC5kYXRhID09PSBkYXRhKVxuICAgICAgICByZXR1cm47XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0RGF0YVwiLCB7IG5vZGU6IHRleHQsIGRhdGEgfSk7XG4gICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfYXJndW1lbnQoYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdzdHJpbmcnICYmICEoYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIGFyZykpIHtcbiAgICAgICAgbGV0IG1zZyA9ICd7I2VhY2h9IG9ubHkgaXRlcmF0ZXMgb3ZlciBhcnJheS1saWtlIG9iamVjdHMuJztcbiAgICAgICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgYXJnICYmIFN5bWJvbC5pdGVyYXRvciBpbiBhcmcpIHtcbiAgICAgICAgICAgIG1zZyArPSAnIFlvdSBjYW4gdXNlIGEgc3ByZWFkIHRvIGNvbnZlcnQgdGhpcyBpdGVyYWJsZSBpbnRvIGFuIGFycmF5Lic7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdmFsaWRhdGVfc2xvdHMobmFtZSwgc2xvdCwga2V5cykge1xuICAgIGZvciAoY29uc3Qgc2xvdF9rZXkgb2YgT2JqZWN0LmtleXMoc2xvdCkpIHtcbiAgICAgICAgaWYgKCF+a2V5cy5pbmRleE9mKHNsb3Rfa2V5KSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGA8JHtuYW1lfT4gcmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBzbG90IFwiJHtzbG90X2tleX1cIi5gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudERldiBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgKCFvcHRpb25zLnRhcmdldCAmJiAhb3B0aW9ucy4kJGlubGluZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJ3RhcmdldCcgaXMgYSByZXF1aXJlZCBvcHRpb25gKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuJGRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ29tcG9uZW50IHdhcyBhbHJlYWR5IGRlc3Ryb3llZGApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgJGNhcHR1cmVfc3RhdGUoKSB7IH1cbiAgICAkaW5qZWN0X3N0YXRlKCkgeyB9XG59XG5mdW5jdGlvbiBsb29wX2d1YXJkKHRpbWVvdXQpIHtcbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSBzdGFydCA+IHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW5maW5pdGUgbG9vcCBkZXRlY3RlZGApO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHsgSHRtbFRhZywgU3ZlbHRlQ29tcG9uZW50LCBTdmVsdGVDb21wb25lbnREZXYsIFN2ZWx0ZUVsZW1lbnQsIGFjdGlvbl9kZXN0cm95ZXIsIGFkZF9hdHRyaWJ1dGUsIGFkZF9jbGFzc2VzLCBhZGRfZmx1c2hfY2FsbGJhY2ssIGFkZF9sb2NhdGlvbiwgYWRkX3JlbmRlcl9jYWxsYmFjaywgYWRkX3Jlc2l6ZV9saXN0ZW5lciwgYWRkX3RyYW5zZm9ybSwgYWZ0ZXJVcGRhdGUsIGFwcGVuZCwgYXBwZW5kX2RldiwgYXNzaWduLCBhdHRyLCBhdHRyX2RldiwgYmVmb3JlVXBkYXRlLCBiaW5kLCBiaW5kaW5nX2NhbGxiYWNrcywgYmxhbmtfb2JqZWN0LCBidWJibGUsIGNoZWNrX291dHJvcywgY2hpbGRyZW4sIGNsYWltX2NvbXBvbmVudCwgY2xhaW1fZWxlbWVudCwgY2xhaW1fc3BhY2UsIGNsYWltX3RleHQsIGNsZWFyX2xvb3BzLCBjb21wb25lbnRfc3Vic2NyaWJlLCBjb21wdXRlX3Jlc3RfcHJvcHMsIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciwgY3JlYXRlX2FuaW1hdGlvbiwgY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbiwgY3JlYXRlX2NvbXBvbmVudCwgY3JlYXRlX2luX3RyYW5zaXRpb24sIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbiwgY3JlYXRlX3Nsb3QsIGNyZWF0ZV9zc3JfY29tcG9uZW50LCBjdXJyZW50X2NvbXBvbmVudCwgY3VzdG9tX2V2ZW50LCBkYXRhc2V0X2RldiwgZGVidWcsIGRlc3Ryb3lfYmxvY2ssIGRlc3Ryb3lfY29tcG9uZW50LCBkZXN0cm95X2VhY2gsIGRldGFjaCwgZGV0YWNoX2FmdGVyX2RldiwgZGV0YWNoX2JlZm9yZV9kZXYsIGRldGFjaF9iZXR3ZWVuX2RldiwgZGV0YWNoX2RldiwgZGlydHlfY29tcG9uZW50cywgZGlzcGF0Y2hfZGV2LCBlYWNoLCBlbGVtZW50LCBlbGVtZW50X2lzLCBlbXB0eSwgZXNjYXBlLCBlc2NhcGVkLCBleGNsdWRlX2ludGVybmFsX3Byb3BzLCBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9wb3NpdGlvbiwgZmx1c2gsIGdldENvbnRleHQsIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlLCBnZXRfY3VycmVudF9jb21wb25lbnQsIGdldF9zbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHQsIGdldF9zcHJlYWRfb2JqZWN0LCBnZXRfc3ByZWFkX3VwZGF0ZSwgZ2V0X3N0b3JlX3ZhbHVlLCBnbG9iYWxzLCBncm91cF9vdXRyb3MsIGhhbmRsZV9wcm9taXNlLCBoYXNfcHJvcCwgaWRlbnRpdHksIGluaXQsIGluc2VydCwgaW5zZXJ0X2RldiwgaW50cm9zLCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciwgaXNfY2xpZW50LCBpc19jcm9zc29yaWdpbiwgaXNfZnVuY3Rpb24sIGlzX3Byb21pc2UsIGxpc3RlbiwgbGlzdGVuX2RldiwgbG9vcCwgbG9vcF9ndWFyZCwgbWlzc2luZ19jb21wb25lbnQsIG1vdW50X2NvbXBvbmVudCwgbm9vcCwgbm90X2VxdWFsLCBub3csIG51bGxfdG9fZW1wdHksIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMsIG9uRGVzdHJveSwgb25Nb3VudCwgb25jZSwgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIHByZXZlbnRfZGVmYXVsdCwgcHJvcF9kZXYsIHF1ZXJ5X3NlbGVjdG9yX2FsbCwgcmFmLCBydW4sIHJ1bl9hbGwsIHNhZmVfbm90X2VxdWFsLCBzY2hlZHVsZV91cGRhdGUsIHNlbGVjdF9tdWx0aXBsZV92YWx1ZSwgc2VsZWN0X29wdGlvbiwgc2VsZWN0X29wdGlvbnMsIHNlbGVjdF92YWx1ZSwgc2VsZiwgc2V0Q29udGV4dCwgc2V0X2F0dHJpYnV0ZXMsIHNldF9jdXJyZW50X2NvbXBvbmVudCwgc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEsIHNldF9kYXRhLCBzZXRfZGF0YV9kZXYsIHNldF9pbnB1dF90eXBlLCBzZXRfaW5wdXRfdmFsdWUsIHNldF9ub3csIHNldF9yYWYsIHNldF9zdG9yZV92YWx1ZSwgc2V0X3N0eWxlLCBzZXRfc3ZnX2F0dHJpYnV0ZXMsIHNwYWNlLCBzcHJlYWQsIHN0b3BfcHJvcGFnYXRpb24sIHN1YnNjcmliZSwgc3ZnX2VsZW1lbnQsIHRleHQsIHRpY2ssIHRpbWVfcmFuZ2VzX3RvX2FycmF5LCB0b19udW1iZXIsIHRvZ2dsZV9jbGFzcywgdHJhbnNpdGlvbl9pbiwgdHJhbnNpdGlvbl9vdXQsIHVwZGF0ZV9rZXllZF9lYWNoLCB2YWxpZGF0ZV9jb21wb25lbnQsIHZhbGlkYXRlX2VhY2hfYXJndW1lbnQsIHZhbGlkYXRlX2VhY2hfa2V5cywgdmFsaWRhdGVfc2xvdHMsIHZhbGlkYXRlX3N0b3JlLCB4bGlua19hdHRyIH07XG4iLCI8c3R5bGU+XG4gICAgZGl2IHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgd2lkdGg6IDJlbTtcbiAgICAgICAgaGVpZ2h0OiAyZW07XG4gICAgICAgIG1hcmdpbjogMCAwLjVlbTtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiA2cHggN3B4IDVweCAwcHggcmdiYSgxNTYsIDE1NCwgMTU2LCAxKTtcbiAgICAgICAgLW1vei1ib3gtc2hhZG93OiA2cHggN3B4IDVweCAwcHggcmdiYSgxNTYsIDE1NCwgMTU2LCAxKTtcbiAgICAgICAgYm94LXNoYWRvdzogNnB4IDdweCA1cHggMHB4IHJnYmEoMTU2LCAxNTQsIDE1NiwgMSk7XG4gICAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJ1xuXG4gICAgZXhwb3J0IGxldCB0eXBlXG5cbiAgICBsZXQgdHlwZXMgPSBbXVxuXG4gICAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS10ZWEub2lzaWZsb3J1cy5jb20vYXBpL3YxL3R5cGVgKVxuXG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgIHR5cGVzID0gKGF3YWl0IHJlcy5qc29uKCkpLmFwaVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gNDA0XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGV4dClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBnZXRDb2xvcih0eXBlUGFyYW0sIHR5cGVzKSB7XG4gICAgICAgIGNvbnN0IHR5cGVGaW5kID1cbiAgICAgICAgICAgIHR5cGVzLmZpbHRlcih0eXBlID0+IHR5cGUuaWRlb2dyYW0gPT09IHR5cGVQYXJhbSlbMF0gfHwge31cbiAgICAgICAgcmV0dXJuICdjb2xvcicgaW4gdHlwZUZpbmQgPyB0eXBlRmluZC5jb2xvciA6ICd3aGl0ZSdcbiAgICB9XG48L3NjcmlwdD5cblxuPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6IHtnZXRDb2xvcih0eXBlLCB0eXBlcyl9XCI+PC9kaXY+XG4iLCI8c3R5bGU+XG4gICAgaDMge1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICBtYXJnaW4tdG9wOiAyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGZvbnQtc2l6ZTogMmVtO1xuICAgIH1cbiAgICAuaWRlb2dyYW0tcGlueWluIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cbiAgICAucGlueWluIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjdlbTtcbiAgICAgICAgY29sb3I6ICM5OTk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgfVxuICAgIHAge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxuICAgIC5pZGVvZ3JhbSB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGZvbnQtc2l6ZTogMWVtO1xuICAgIH1cbiAgICAudGVhcyB0ZCxcbiAgICAudGVhcyB0aCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgfVxuXG4gICAgLnRlYXMgdGQ6Zmlyc3QtY2hpbGQgLmlkZW9ncmFtIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjJlbTtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICAgIHdpZHRoOiA5MHB4O1xuICAgIH1cbiAgICB1bCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG48L3N0eWxlPlxuXG48c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBleHBvcnQgZnVuY3Rpb24gcHJlbG9hZChwYWdlKSB7XG4gICAgICAgIHJldHVybiB7IHR5cGVQYXJhbTogcGFnZS5wYXJhbXMudHlwZSB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcbiAgICBpbXBvcnQgSWNvblRlYVR5cGUgZnJvbSAnLi4vY29tcG9uZW50cy9JY29uVGVhVHlwZS5zdmVsdGUnXG5cbiAgICBleHBvcnQgbGV0IHR5cGVQYXJhbVxuXG4gICAgbGV0IHRlYXMgPSBbXVxuICAgIGxldCB0eXBlcyA9IFtdXG4gICAgbGV0IGkxOG4gPSBbXVxuXG4gICAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS10ZWEub2lzaWZsb3J1cy5jb20vYXBpL3YxL3RlYXMnKVxuXG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgIHRlYXMgPSAoYXdhaXQgcmVzLmpzb24oKSkuYXBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGV4dClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlczEgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGktdGVhLm9pc2lmbG9ydXMuY29tL2FwaS92MS90eXBlJylcblxuICAgICAgICBpZiAocmVzMS5vaykge1xuICAgICAgICAgICAgdHlwZXMgPSAoYXdhaXQgcmVzMS5qc29uKCkpLmFwaS5tYXAodHlwZSA9PiB0eXBlLmlkZW9ncmFtKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRleHQpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMyID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLXRlYS5vaXNpZmxvcnVzLmNvbS9hcGkvdjEvcGlueWluYClcblxuICAgICAgICBpZiAocmVzMi5vaykge1xuICAgICAgICAgICAgaTE4biA9IChhd2FpdCByZXMyLmpzb24oKSkuYXBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyA0MDRcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHR5cGVUb0Rpc3BsYXkgPSAoKSA9PlxuICAgICAgICB0eXBlcy5pbmNsdWRlcyh0eXBlUGFyYW0pID8gW3R5cGVQYXJhbV0gOiB0eXBlc1xuICAgIGNvbnN0IGdldFRlYXNCeVR5cGUgPSAodHlwZSwgdGVhcykgPT4gdGVhcy5maWx0ZXIodGVhID0+IHRlYS50eXBlID09PSB0eXBlKVxuXG4gICAgZnVuY3Rpb24gZ2V0UGlueWluKHRleHQsIGkxOG4pIHtcbiAgICAgICAgY29uc3QgdGVybSA9IGkxOG4uZmlsdGVyKHRlcm0gPT4gdGVybS5pZGVvZ3JhbSA9PT0gdGV4dClbMF0gfHwge31cbiAgICAgICAgcmV0dXJuICdwaW55aW4nIGluIHRlcm0gPyB0ZXJtLnBpbnlpbiA6ICctJ1xuICAgIH1cbjwvc2NyaXB0PlxuXG48aDI+TGlzdGUgZGVzIHRow6lzIHBhciB0eXBlPC9oMj5cbjxwPlxuICAgIENldHRlIGxpc3RlIHJlZ3JvdXBlIGwnZW5zZW1ibGUgZGVzIHRow6lzIHByb3Bvc8OpcyBzdXIgbGUgc2l0ZS4gUG91ciB2b2lyIGxlXG4gICAgZMOpdGFpbCBkJ3VuIHRow6kgc3VpdmV6IGxlIGxpZW4gc3VyIHNvbiBub20uXG48L3A+XG5cbjxzdmVsdGU6aGVhZD5cbiAgICA8dGl0bGU+TGlzdGUgZGVzIHRow6lzPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG48ZGl2IGNsYXNzPVwidGVhc1wiPlxuICAgIHsjZWFjaCB0eXBlVG9EaXNwbGF5KHR5cGVQYXJhbSwgdHlwZXMpIGFzIHR5cGV9XG4gICAgICAgIDxoMyBpZD1cInt0eXBlfVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlkZW9ncmFtLXBpbnlpblwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaWRlb2dyYW1cIj57dHlwZX08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwaW55aW5cIj57Z2V0UGlueWluKHR5cGUsIGkxOG4pfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPEljb25UZWFUeXBlIHt0eXBlfSAvPlxuICAgICAgICA8L2gzPlxuICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+bm9tPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPmZhbWlsbGVzPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPnLDqWNvbHRlczwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5jdWx0aXZhcnNzPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPnByb3ZpbmNlczwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD52aWxsZXM8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+Y2V1aWxsZXR0ZXM8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+YWx0aXR1ZGVzPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPm94eWRhdGlvbnM8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHsjZWFjaCBnZXRUZWFzQnlUeXBlKHR5cGUsIHRlYXMpIGFzIHRlYX1cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJmaWNoZS17dGVhLmlkZW9ncmFtfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJpZGVvZ3JhbVwiPnt0ZWEuaWRlb2dyYW19PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwaW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0UGlueWluKHRlYS5pZGVvZ3JhbSwgaTE4bil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyNpZiB0ZWEuZmFtaWxpZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCB0ZWEuZmFtaWxpZXMgYXMgZmFtaWx5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImlkZW9ncmFtXCI+e2ZhbWlseX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwaW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldFBpbnlpbihmYW1pbHksIGkxOG4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgezplbHNlfS17L2lmfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57dGVhLmhhcnZlc3RzIHx8ICctJ308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsjaWYgdGVhLmN1bHRpdmFyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyNpZiB0eXBlb2YgdGVhLmN1bHRpdmFycyA9PT0gJ3N0cmluZyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaWRlb2dyYW1cIj57dGVhLmN1bHRpdmFyc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwaW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldFBpbnlpbih0ZWEuY3VsdGl2YXJzLCBpMThuKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgezplbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCB0ZWEuY3VsdGl2YXJzIGFzIGN1bHRpdmFyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2N1bHRpdmFyc30gLSB7Z2V0UGlueWluKGN1bHRpdmFycywgaTE4bil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7OmVsc2V9LXsvaWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsjaWYgdGVhLnByb3ZpbmNlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyNpZiB0eXBlb2YgdGVhLnByb3ZpbmNlcyA9PT0gJ3N0cmluZyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaWRlb2dyYW1cIj57dGVhLnByb3ZpbmNlc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwaW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldFBpbnlpbih0ZWEucHJvdmluY2VzLCBpMThuKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgezplbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCB0ZWEucHJvdmluY2VzIGFzIHByb3ZpbmNlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3ZpbmNlc30gLSB7Z2V0UGlueWluKHByb3ZpbmNlcywgaTE4bil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7OmVsc2V9LXsvaWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsjaWYgdGVhLnRvd25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7I2lmIHR5cGVvZiB0ZWEudG93bnMgPT09ICdzdHJpbmcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImlkZW9ncmFtXCI+e3RlYS50b3duc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwaW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldFBpbnlpbih0ZWEudG93bnMsIGkxOG4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyNlYWNoIHRlYS50b3ducyBhcyB0b3duc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rvd25zfSAtIHtnZXRQaW55aW4odG93bnMsIGkxOG4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgezplbHNlfS17L2lmfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7I2lmIHRlYS5waWNraW5nc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyNpZiB0eXBlb2YgdGVhLnBpY2tpbmdzID09PSAnc3RyaW5nJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJpZGVvZ3JhbVwiPnt0ZWEucGlja2luZ3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGlueWluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRQaW55aW4odGVhLnBpY2tpbmdzLCBpMThuKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgezplbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCB0ZWEucGlja2luZ3MgYXMgcGlja31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BpY2t9IC0ge2dldFBpbnlpbihwaWNrLCBpMThuKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHs6ZWxzZX0tey9pZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3RlYS5lbGV2YXRpb25zIHx8ICctJ308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt0ZWEub3hpZGF0aW9ucyB8fCAnLSd9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gdGhpcyBibG9jayByZW5kZXJzIHdoZW4gdGVhcy5sZW5ndGggPT09IDAgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxwPmNoYXJnZW1lbnQgZGVzIHRow6lzLi4uPC9wPlxuICAgICAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgezplbHNlfVxuICAgICAgICA8IS0tIHRoaXMgYmxvY2sgcmVuZGVycyB3aGVuIHRlYXMubGVuZ3RoID09PSAwIC0tPlxuICAgICAgICA8cD5jaGFyZ2VtZW50IGRlcyB0eXBlcyB0aMOpcy4uLjwvcD5cbiAgICB7L2VhY2h9XG48L2Rpdj5cbiIsIjxzdHlsZT5cbiAgICAuZ2hUcmVlVGl0bGUgYSB7XG4gICAgICAgIGNvbG9yOiAjNzNkNTZiO1xuICAgIH1cblxuICAgIC5naFRyZWVUaXRsZSBhOmhvdmVyIHtcbiAgICAgICAgY29sb3I6IHJnYig1NiwgMTUzLCA0Nyk7XG4gICAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG4gICAgZXhwb3J0IGZ1bmN0aW9uIHByZWxvYWQoeyBwYXJhbXMsIHF1ZXJ5IH0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2goYGRvY3VtZW50YXRpb24uanNvbmApXG4gICAgICAgICAgICAudGhlbihyID0+IHIuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4ocG9zdHMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHBvc3RzIH1cbiAgICAgICAgICAgIH0pXG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGxldCBwb3N0c1xuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6aGVhZD5cbiAgICA8dGl0bGU+RG9jdW1lbnRhdGlvbiBzdXIgbGVzIHRow6lzPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxzZWN0aW9uIGlkPVwiZ2hUcmVlXCIgY2xhc3M9XCJnaFRyZWVcIiBkYXRhLXRpdGxlPVwidHJlZVwiPlxuICAgIDxoZWFkZXI+XG4gICAgICAgIDxoMT5MaXN0ZSBkZXMgYXJ0aWNsZXM8L2gxPlxuICAgIDwvaGVhZGVyPlxuXG4gICAgeyNlYWNoIHBvc3RzIGFzIHBvc3R9XG4gICAgICAgIDwhLS0gd2UncmUgdXNpbmcgdGhlIG5vbi1zdGFuZGFyZCBgcmVsPXByZWZldGNoYCBhdHRyaWJ1dGUgdG9cblx0XHRcdFx0dGVsbCBTYXBwZXIgdG8gbG9hZCB0aGUgZGF0YSBmb3IgdGhlIHBhZ2UgYXMgc29vbiBhc1xuXHRcdFx0XHR0aGUgdXNlciBob3ZlcnMgb3ZlciB0aGUgbGluayBvciB0YXBzIGl0LCBpbnN0ZWFkIG9mXG5cdFx0XHRcdHdhaXRpbmcgZm9yIHRoZSAnY2xpY2snIGV2ZW50IC0tPlxuXG4gICAgICAgIDxhcnRpY2xlIGNsYXNzPVwiZ2hUcmVlSXRlbSBnaFR5cGVGaWxlXCIgZGF0YS10aXRsZT1cImRpclwiPlxuICAgICAgICAgICAgPGgyIGNsYXNzPVwiZ2hUcmVlVGl0bGVcIj5cbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICByZWw9XCJwcmVmZXRjaFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9sZGVyTGlua1wiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtdGl0bGU9XCJmb2xkZXJMaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgaHJlZj1cImRvY3VtZW50YXRpb24ve3Bvc3QubGllbn1cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3Bvc3QudGl0cmV9XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZ2hUcmVlRXhjZXJwdFwiIGRhdGEtdGl0bGU9XCJmaWxlRXhjZXJwdFwiPlxuICAgICAgICAgICAgICAgIHtwb3N0LmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICBjbGFzcz1cImdoVHJlZVJlYWRtb3JlXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIkxpcmUgbGEgc3VpdGUgZGUgbGEgZmljaGUgOiB7cG9zdC50aXRyZX1cIlxuICAgICAgICAgICAgICAgIGRhdGEtdGl0bGU9XCJmaWxlUmVhZG1vcmVMaW5rXCJcbiAgICAgICAgICAgICAgICBocmVmPVwiZG9jdW1lbnRhdGlvbi97cG9zdC5saWVufVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgTGlyZSBsYSBzdWl0ZSBkZSBsYSBmaWNoZVxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2FydGljbGU+XG4gICAgey9lYWNofVxuPC9zZWN0aW9uPlxuIiwiPHN0eWxlPlxuICAgIC8qXG5cdFx0QnkgZGVmYXVsdCwgQ1NTIGlzIGxvY2FsbHkgc2NvcGVkIHRvIHRoZSBjb21wb25lbnQsXG5cdFx0YW5kIGFueSB1bnVzZWQgc3R5bGVzIGFyZSBkZWFkLWNvZGUtZWxpbWluYXRlZC5cblx0XHRJbiB0aGlzIHBhZ2UsIFN2ZWx0ZSBjYW4ndCBrbm93IHdoaWNoIGVsZW1lbnRzIGFyZVxuXHRcdGdvaW5nIHRvIGFwcGVhciBpbnNpZGUgdGhlIHt7e3Bvc3QuaHRtbH19fSBibG9jayxcblx0XHRzbyB3ZSBoYXZlIHRvIHVzZSB0aGUgOmdsb2JhbCguLi4pIG1vZGlmaWVyIHRvIHRhcmdldFxuXHRcdGFsbCBlbGVtZW50cyBpbnNpZGUgLmNvbnRlbnRcblx0Ki9cbiAgICAuY29udGVudCA6Z2xvYmFsKGgyKSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS40ZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuXG4gICAgLmNvbnRlbnQgOmdsb2JhbChwcmUpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMXB4IDFweCA1cHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcbiAgICAgICAgcGFkZGluZzogMC41ZW07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICB9XG5cbiAgICAuY29udGVudCA6Z2xvYmFsKHByZSkgOmdsb2JhbChjb2RlKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cblxuICAgIC5jb250ZW50IDpnbG9iYWwodWwpIHtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICB9XG5cbiAgICAuY29udGVudCA6Z2xvYmFsKGxpKSB7XG4gICAgICAgIG1hcmdpbjogMCAwIDAuNWVtIDA7XG4gICAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG4gICAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQoeyBwYXJhbXMsIHF1ZXJ5IH0pIHtcbiAgICAgICAgLy8gdGhlIGBzbHVnYCBwYXJhbWV0ZXIgaXMgYXZhaWxhYmxlIGJlY2F1c2VcbiAgICAgICAgLy8gdGhpcyBmaWxlIGlzIGNhbGxlZCBbc2x1Z10uc3ZlbHRlXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZmV0Y2goYGRvY3VtZW50YXRpb24vJHtwYXJhbXMuc2x1Z30uanNvbmApXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXG5cbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcG9zdDogZGF0YSB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKHJlcy5zdGF0dXMsIGRhdGEubWVzc2FnZSlcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnXG4gICAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgICAgIDtbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKV0ubWFwKFxuICAgICAgICAgICAgeCA9PiAoeC5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24gKyBuZXcgVVJMKHguaHJlZikuaGFzaClcbiAgICAgICAgKVxuICAgIH0pXG4gICAgZXhwb3J0IGxldCBwb3N0XG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuICAgIDx0aXRsZT57cG9zdC50aXRyZX08L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPGgxPntwb3N0LnRpdHJlfTwvaDE+XG5cbjxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAge0BodG1sIHBvc3QuaHRtbH1cbjwvZGl2PlxuIiwiPHN0eWxlPlxuICAgIGlucHV0IHtcbiAgICAgICAgd2lkdGg6IDZlbTtcbiAgICAgICAgaGVpZ3RoOiAyZW07XG4gICAgICAgIGJvcmRlci1jb2xvcjogI2RkZDtcbiAgICAgICAgZm9udC1zaXplOiAwLjllbTtcbiAgICAgICAgY29sb3I6IGdyZXk7XG4gICAgfVxuICAgIC5taW5pIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICAgICAgY29sb3I6IGdyZXk7XG4gICAgfVxuICAgIC5waW55aW4ge1xuICAgICAgICBmb250LXNpemU6IDAuN2VtO1xuICAgICAgICBjb2xvcjogIzk5OTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICB9XG4gICAgcCB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICB9XG4gICAgLmlkZW9ncmFtIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgZm9udC1zaXplOiAxLjVlbTtcbiAgICB9XG5cbiAgICAuYnJldyB0ZCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJ1xuICAgIGV4cG9ydCBsZXQgYnJld1xuXG4gICAgbGV0IGkxOG4gPSBbXVxuXG4gICAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS10ZWEub2lzaWZsb3J1cy5jb20vYXBpL3YxL3BpbnlpbmApXG5cbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgaTE4biA9IChhd2FpdCByZXMuanNvbigpKS5hcGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIDQwNFxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRleHQpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIGZ1bmN0aW9uIGdldFBpbnlpbih0ZXh0LCBpMThuKSB7XG4gICAgICAgIGNvbnN0IHRlcm0gPSBpMThuLmZpbHRlcih0ZXJtID0+IHRlcm0uaWRlb2dyYW0gPT09IHRleHQpWzBdIHx8IHt9XG4gICAgICAgIHJldHVybiAncGlueWluJyBpbiB0ZXJtID8gdGVybS5waW55aW4gOiAnLSdcbiAgICB9XG5cbiAgICBsZXQgbWwgPSAxMDBcblxuICAgICQ6IHdlaWdodCA9IChtbCAvICticmV3LnF1YW50aXR5LnNwbGl0KCc6JylbMV0pLnRvRml4ZWQoMSlcblxuICAgIGNvbnN0IGR1cmF0aW9ucyA9ICticmV3LmR1cmF0aW9ucyA/IFticmV3LmR1cmF0aW9uc10gOiBicmV3LmR1cmF0aW9uc1xuXG4gICAgY29uc3QgZGlzcGxheSA9IHtcbiAgICAgICAgdGltZXM6IHRpbWVzID0+IHtcbiAgICAgICAgICAgIGlmICgrdGltZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGltZXN9IGluZnVzaW9uc2BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZXMubGVuZ3RoID09IDIgJiYgQXJyYXkuaXNBcnJheShbdGltZXNdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aW1lc1swXX0gw6AgJHt0aW1lc1sxXX0gaW5mdXNpb25zYFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZW1wZXJhdHVyZXM6IHRlbXBlcmF0dXJlcyA9PiB7XG4gICAgICAgICAgICBpZiAoK3RlbXBlcmF0dXJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBgw6AgcGFydGlyIGRlICR7dGVtcGVyYXR1cmVzfcKwYFxuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZXMubGVuZ3RoID09IDIgJiZcbiAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHRlbXBlcmF0dXJlcylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgZW50cmUgJHt0ZW1wZXJhdHVyZXNbMF19wrAgZXQgJHt0ZW1wZXJhdHVyZXNbMV19wrBgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuPHRhYmxlIGNsYXNzPVwiYnJld1wiPlxuICAgIDx0cj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiaWRlb2dyYW1cIj57YnJldy50eXBlfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicGlueWluXCI+e2dldFBpbnlpbihicmV3LnR5cGUsIGkxOG4pfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC90cj5cbiAgICA8dHI+XG4gICAgICAgIDx0ZD57ZGlzcGxheS50ZW1wZXJhdHVyZXMoYnJldy50ZW1wZXJhdHVyZXMpfTwvdGQ+XG4gICAgPC90cj5cbiAgICB7I2lmIGJyZXcudGltZXN9XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD57ZGlzcGxheS50aW1lcyhicmV3LnRpbWVzKX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgIHsvaWZ9XG4gICAgeyNpZiBkdXJhdGlvbnN9XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCBkdXJhdGlvbnMgYXMgZHVyYXRpb24sIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57aW5kZXggKyAxfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCBkdXJhdGlvbnMgYXMgZHVyYXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntkdXJhdGlvbn0gc2VjPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICB7L2lmfVxuICAgIDx0ZD5cbiAgICAgICAgVm91cyBwb3V2ZXogdGVzdGVyIGF2ZWNcbiAgICAgICAgPHN0cm9uZz57d2VpZ2h0fSBnPC9zdHJvbmc+XG4gICAgICAgIHBvdXJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBzdGVwPVwiMjBcIiBiaW5kOnZhbHVlPVwie21sfVwiIC8+XG4gICAgICAgIG1sIC1cbiAgICAgICAgPCEtLSA8aW5wdXQgdHlwZT1yYW5nZSBiaW5kOnZhbHVlPXtifSBtaW49MCBtYXg9MTA+IC0tPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1pbmlcIj4ocmF0aW86IHticmV3LnF1YW50aXR5fSk8L3NwYW4+XG4gICAgPC90ZD5cbjwvdGFibGU+XG4iLCI8c3R5bGU+XG4gICAgLndyYXBwZXIge1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDM1MHB4IDJmciAyZnI7XG4gICAgICAgIGdyaWQtZ2FwOiAxZW07XG4gICAgICAgIGNvbG9yOiAjNDQ0O1xuICAgICAgICBmb250LXNpemU6IDEuMmVtO1xuICAgIH1cblxuICAgIC5ib3gge1xuICAgICAgICBjb2xvcjogIzQ0NDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxZW07XG4gICAgfVxuXG4gICAgLnBob3RvLXpvb20ge1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBoZWlnaHQ6IDM1MHB4OyAvKiBbMS4xXSBTZXQgaXQgYXMgcGVyIHlvdXIgbmVlZCAqL1xuICAgICAgICB3aWR0aDogMzUwcHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47IC8qIFsxLjJdIEhpZGUgdGhlIG92ZXJmbG93aW5nIG9mIGNoaWxkIGVsZW1lbnRzICovXG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogNnB4IDdweCA1cHggMHB4IHJnYmEoMTU2LCAxNTQsIDE1NiwgMSk7XG4gICAgICAgIC1tb3otYm94LXNoYWRvdzogNnB4IDdweCA1cHggMHB4IHJnYmEoMTU2LCAxNTQsIDE1NiwgMSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDZweCA3cHggNXB4IDBweCByZ2JhKDE1NiwgMTU0LCAxNTYsIDEpO1xuICAgIH1cblxuICAgIC5waG90by16b29tIGltZyB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiA2NSUgNzUlO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIGZpbHRlciAwLjVzIGVhc2Utb3V0O1xuICAgIH1cblxuICAgIC5waG90by16b29tOmhvdmVyIGltZyB7XG4gICAgICAgIGN1cnNvcjogem9vbS1pbjtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSg0KTtcbiAgICB9XG5cbiAgICAucHJvcGVydHktdGl0bGUge1xuICAgICAgICBtYXJnaW4tdG9wOiAxLjVlbTtcbiAgICAgICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICB9XG5cbiAgICAucHJvcGVydHktaWNvbiB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgbWFyZ2luLXRvcDogMWVtO1xuICAgICAgICBmb250LXNpemU6IDAuOGVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMi45ZW07XG4gICAgfVxuXG4gICAgLnByb3BlcnR5LXZhbHVlID4gdWwge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgfVxuICAgIC5wcm9wZXJ0eS12YWx1ZSxcbiAgICAucHJvcGVydHktdmFsdWUgPiB1bCA+IGxpIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIH1cbiAgICAuaWNvbnMge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgd2lkdGg6IDE4JTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDNlbTtcbiAgICB9XG4gICAgLmlkZW9ncmFtLXBpbnlpbiB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG4gICAgLnBpbnlpbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC43ZW07XG4gICAgICAgIGNvbG9yOiAjOTk5O1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIH1cbiAgICBwIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbiAgICAuaWRlb2dyYW0ge1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBmb250LXNpemU6IDFlbTtcbiAgICB9XG5cbiAgICAubW91bnRhaW4ge1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIH1cbjwvc3R5bGU+XG5cbjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxuICAgIGV4cG9ydCBmdW5jdGlvbiBwcmVsb2FkKHBhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHsgaWRlb2dyYW06IHBhZ2UucGFyYW1zLmlkZW9ncmFtIH1cbiAgICB9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJ1xuICAgIGltcG9ydCBCcmV3cyBmcm9tICcuLi9jb21wb25lbnRzL0JyZXdzLnN2ZWx0ZSdcbiAgICBpbXBvcnQgSWNvblRlYVR5cGUgZnJvbSAnLi4vY29tcG9uZW50cy9JY29uVGVhVHlwZS5zdmVsdGUnXG5cbiAgICBleHBvcnQgbGV0IGlkZW9ncmFtXG5cbiAgICBsZXQgdGVhID0ge31cbiAgICBsZXQgaTE4biA9IFtdXG5cbiAgICBvbk1vdW50KGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICAgICBgaHR0cHM6Ly9hcGktdGVhLm9pc2lmbG9ydXMuY29tL2FwaS92MS90ZWEvJHtpZGVvZ3JhbX1gXG4gICAgICAgIClcblxuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICB0ZWEgPSAoYXdhaXQgcmVzLmpzb24oKSkuYXBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyA0MDRcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzMSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS10ZWEub2lzaWZsb3J1cy5jb20vYXBpL3YxL3BpbnlpbmApXG5cbiAgICAgICAgaWYgKHJlczEub2spIHtcbiAgICAgICAgICAgIGkxOG4gPSAoYXdhaXQgcmVzMS5qc29uKCkpLmFwaVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gNDA0XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGV4dClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBnZXRQaW55aW4odGV4dCwgaTE4bikge1xuICAgICAgICBjb25zdCB0ZXJtID0gaTE4bi5maWx0ZXIodGVybSA9PiB0ZXJtLmlkZW9ncmFtID09PSB0ZXh0KVswXSB8fCB7fVxuICAgICAgICByZXR1cm4gJ3BpbnlpbicgaW4gdGVybSA/IHRlcm0ucGlueWluIDogJy0nXG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGxheSA9IHtcbiAgICAgICAgZWxldmF0aW9uczogZWxldmF0aW9ucyA9PiB7XG4gICAgICAgICAgICBpZiAoK2VsZXZhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYMOgIHBhcnRpciBkZSAke2VsZXZhdGlvbnN9IG3DqHRyZXNgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsZXZhdGlvbnMubGVuZ3RoID09IDIgJiYgQXJyYXkuaXNBcnJheShbZWxldmF0aW9uc10pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2VsZXZhdGlvbnNbMF19IMOgICR7ZWxldmF0aW9uc1sxXX0gbcOodHJlc2BcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3hpZGF0aW9uczogb3hpZGF0aW9ucyA9PiB7XG4gICAgICAgICAgICBpZiAoK294aWRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYMOgIHBhcnRpciBkZSAke294aWRhdGlvbnN9JWBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3hpZGF0aW9ucy5sZW5ndGggPT0gMiAmJiBBcnJheS5pc0FycmF5KG94aWRhdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBlbnRyZSAke294aWRhdGlvbnNbMF19JSBldCAke294aWRhdGlvbnNbMV19JWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG48c3ZlbHRlOmhlYWQ+XG4gICAgPHRpdGxlPkZpY2hlIGRlIHRow6k8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cbnsjaWYgdGVhLmlkZW9ncmFtfVxuICAgIDxoMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlkZW9ncmFtLXBpbnlpblwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJpZGVvZ3JhbVwiPnt0ZWEuaWRlb2dyYW19PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwaW55aW5cIj57Z2V0UGlueWluKHRlYS5pZGVvZ3JhbSwgaTE4bil9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2gyPlxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3ggcGhvdG8tem9vbVwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHNyYz1cIi9hc3NldHMvdGhlcy97dGVhLmlkZW9ncmFtfS5qcGdcIlxuICAgICAgICAgICAgICAgIGFsdD1cInt0ZWEuaWRlb2dyYW19XCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cInt0ZWEuaWRlb2dyYW19XCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInBob3RvXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94XCI+XG4gICAgICAgICAgICA8YSBocmVmPVwiL2xpc3RlLWRlcy10aGVzLXt0ZWEudHlwZX1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWRlb2dyYW0tcGlueWluXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaWRlb2dyYW1cIj57dGVhLnR5cGV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBpbnlpblwiPntnZXRQaW55aW4odGVhLnR5cGUsIGkxOG4pfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxJY29uVGVhVHlwZSB0eXBlPVwie3RlYS50eXBlfVwiIC8+XG4gICAgICAgICAgICA8ZGw+XG4gICAgICAgICAgICAgICAgeyNpZiB0ZWEuZmFtaWxpZXMubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICA8ZHQgY2xhc3M9XCJwcm9wZXJ0eS10aXRsZVwiPkZhbWlsbGUgOjwvZHQ+XG4gICAgICAgICAgICAgICAgICAgIDxkZCBjbGFzcz1cInByb3BlcnR5LXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJpZGVvZ3JhbS1waW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7I2VhY2ggdGVhLmZhbWlsaWVzIGFzIGZhbWlseX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiaWRlb2dyYW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmYW1pbHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBpbnlpblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRQaW55aW4oZmFtaWx5LCBpMThuKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L2RkPlxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgeyNpZiB0ZWEub3hpZGF0aW9ucy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICAgIDxkdCBjbGFzcz1cInByb3BlcnR5LXRpdGxlXCI+T3h5ZGF0aW9uIDo8L2R0PlxuICAgICAgICAgICAgICAgICAgICA8ZGQgY2xhc3M9XCJwcm9wZXJ0eS12YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Rpc3BsYXkub3hpZGF0aW9ucyh0ZWEub3hpZGF0aW9ucyl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGQ+XG4gICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICB7I2lmIHRlYS5lbGV2YXRpb25zLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgPGRkIGNsYXNzPVwicHJvcGVydHktaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbnMgbW91bnRhaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIi9hc3NldHMvaWNvbnMvbW91bnRhaW4uc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJhbHRpdHVkZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Rpc3BsYXkuZWxldmF0aW9ucyh0ZWEuZWxldmF0aW9ucyl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGQ+XG4gICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICB7I2lmIHRlYS5oYXJ2ZXN0cy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICAgIDxkZCBjbGFzcz1cInByb3BlcnR5LXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7I2VhY2ggdGVhLmhhcnZlc3RzIGFzIHNlYXNvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2ljb25zL3tzZWFzb259LnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIntzZWFzb259XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgICAgICAgICA8L2RkPlxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgeyNpZiB0ZWEucGlja2luZ3MubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICA8ZHQgY2xhc3M9XCJwcm9wZXJ0eS10aXRsZVwiPkNldWlsbGV0dGUgOjwvZHQ+XG4gICAgICAgICAgICAgICAgICAgIDxkZCBjbGFzcz1cInByb3BlcnR5LXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJpZGVvZ3JhbS1waW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7I2VhY2ggdGVhLnBpY2tpbmdzIGFzIHBpY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImlkZW9ncmFtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGlja31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGlueWluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldFBpbnlpbihwaWNrLCBpMThuKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L2RkPlxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICA8L2RsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveFwiPlxuICAgICAgICAgICAgeyNpZiB0ZWEucHJvdmluY2VzLmxlbmd0aH1cbiAgICAgICAgICAgICAgICA8ZHQgY2xhc3M9XCJwcm9wZXJ0eS10aXRsZVwiPlByb3ZpbmNlcyA6PC9kdD5cbiAgICAgICAgICAgICAgICA8ZGQgY2xhc3M9XCJwcm9wZXJ0eS12YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJpZGVvZ3JhbS1waW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCB0ZWEucHJvdmluY2VzIGFzIHByb3ZpbmNlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJpZGVvZ3JhbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vbWFwLmJhaWR1LmNvbS9zZWFyY2gvP3F1ZXJ5dHlwZT1zJndkPXt0ZWEucHJvdmluY2VzfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvdmluY2VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwaW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0UGlueWluKHByb3ZpbmNlcywgaTE4bil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGQ+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgeyNpZiB0ZWEudG93bnMubGVuZ3RofVxuICAgICAgICAgICAgICAgIDxkdCBjbGFzcz1cInByb3BlcnR5LXRpdGxlXCI+VmlsbGVzIDo8L2R0PlxuICAgICAgICAgICAgICAgIDxkZCBjbGFzcz1cInByb3BlcnR5LXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImlkZW9ncmFtLXBpbnlpblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyNlYWNoIHRlYS50b3ducyBhcyB0b3duc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJpZGVvZ3JhbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vbWFwLmJhaWR1LmNvbS9zZWFyY2gvP3F1ZXJ5dHlwZT1zJndkPXt0ZWEudG93bnN9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0b3duc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGlueWluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldFBpbnlpbih0b3ducywgaTE4bil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGQ+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgeyNpZiB0ZWEuY3VsdGl2YXJzLmxlbmd0aH1cbiAgICAgICAgICAgICAgICA8ZHQgY2xhc3M9XCJwcm9wZXJ0eS10aXRsZVwiPkN1bHRpdmFycyA6PC9kdD5cbiAgICAgICAgICAgICAgICA8ZGQgY2xhc3M9XCJwcm9wZXJ0eS12YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJpZGVvZ3JhbS1waW55aW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCB0ZWEuY3VsdGl2YXJzIGFzIGN1bHRpdmFyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJpZGVvZ3JhbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y3VsdGl2YXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBpbnlpblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldFBpbnlpbihjdWx0aXZhcnMsIGkxOG4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2RkPlxuICAgICAgICAgICAgey9pZn1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3hcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8aHIgLz5cbiAgICA8aDM+Q29uc2VpbCBkJ2luZnVzaW9uPC9oMz5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIHsjaWYgQXJyYXkuaXNBcnJheSh0ZWEuYnJld3MpfVxuICAgICAgICAgICAgeyNlYWNoIHRlYS5icmV3cyBhcyBicmV3fVxuICAgICAgICAgICAgICAgIDxCcmV3cyB7YnJld30gLz5cbiAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgey9pZn1cbiAgICA8L2Rpdj5cbnsvaWZ9XG4iLCI8c3R5bGU+XG4gICAgaDMge1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICBtYXJnaW4tdG9wOiAyZW07XG4gICAgfVxuXG4gICAgLnBpbnlpbiB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBmb250LXNpemU6IDAuN2VtO1xuICAgICAgICBjb2xvcjogIzk5OTtcbiAgICB9XG4gICAgaW1nIHtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogLTAuNGVtO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgICAgIHdpZHRoOiA1JTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgZmlsbDogI2NjYztcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cbjwvc3R5bGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcblxuICAgIGxldCB0ZXJtcyA9IFtdXG4gICAgbGV0IHRoZW1lcyA9IFtdXG5cbiAgICBvbk1vdW50KGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLXRlYS5vaXNpZmxvcnVzLmNvbS9hcGkvdjEvcGlueWluYClcblxuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICB0ZXJtcyA9IChhd2FpdCByZXMuanNvbigpKS5hcGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIDQwNFxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRleHQpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMxID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLXRlYS5vaXNpZmxvcnVzLmNvbS9hcGkvdjEvdGhlbWVzYClcblxuICAgICAgICBpZiAocmVzMS5vaykge1xuICAgICAgICAgICAgdGhlbWVzID0gKGF3YWl0IHJlczEuanNvbigpKS5hcGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIDQwNFxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRleHQpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZ2V0UGlueWluQnlUaGVtZXMocGlueWlucywgdGhlbWUpIHtcbiAgICAgICAgcmV0dXJuIHBpbnlpbnMuZmlsdGVyKHBpbnlpbiA9PiBwaW55aW4udGhlbWUgPT09IHRoZW1lLmVuKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXlBdWRpbyhpZGVvZ3JhbSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZGVvZ3JhbX1gKS5wbGF5KClcbiAgICB9XG48L3NjcmlwdD5cblxuPGgyPlRlcm1lcyB1dGlsaXPDqXM8L2gyPlxuXG48cD5cbiAgICBDZXR0ZSBwYWdlIHByw6lzZW50ZSB1bmUgbGlzdGUgZGVzIHRlcm1lcyBlbiBjaGlub2lzIHRyYWRpdGlvbm5lbCBlbXBsb3nDqXNcbiAgICBzdXIgbGUgc2l0ZSBhdmVjIGxldXJzIHRyYWR1Y3Rpb24gZW5cbiAgICA8ZW0+cGlueWluPC9lbT5cbjwvcD5cbnsjZWFjaCB0aGVtZXMgYXMgdGhlbWV9XG4gICAgPGgzPlxuICAgICAgICB7dGhlbWUuaWRlb2dyYW19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGlueWluXCI+e3RoZW1lLnBpbnlpbn08L3NwYW4+XG4gICAgPC9oMz5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cImNvbHVtbiBjb2x1bW4tNjZcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5DaGlub2lzIHRyYWRpdGlvbm5lbDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5QaW55aW48L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgeyNlYWNoIGdldFBpbnlpbkJ5VGhlbWVzKHRlcm1zLCB0aGVtZSkgYXMgdGVybX1cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcFwiIHRpdGxlPVwiZnJhbsOnYWlzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rlcm0uaWRlb2dyYW19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YXVkaW8gaWQ9XCJ7dGVybS5pZGVvZ3JhbX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cImFzc2V0cy9hdWRpby97dGVybS5pZGVvZ3JhbX0ubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImF1ZGlvL21wZWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2F1ZGlvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIi9hc3NldHMvaWNvbnMvc291bmQuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJzb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246Y2xpY2s9XCJ7cGxheUF1ZGlvKHRlcm0uaWRlb2dyYW0pfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3Rlcm0ucGlueWlufTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICAgICAgICA8cD5jaGFyZ2VtZW50IGRlcyB0ZXJtZXMuLi48L3A+XG4gICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+XG57OmVsc2V9XG4gICAgPHA+Y2hhcmdlbWVudCBkZXMgdGjDqG1lcy4uLjwvcD5cbnsvZWFjaH1cbiIsImltcG9ydCB7IG5vb3AsIHNhZmVfbm90X2VxdWFsLCBzdWJzY3JpYmUsIHJ1bl9hbGwsIGlzX2Z1bmN0aW9uIH0gZnJvbSAnLi4vaW50ZXJuYWwnO1xuZXhwb3J0IHsgZ2V0X3N0b3JlX3ZhbHVlIGFzIGdldCB9IGZyb20gJy4uL2ludGVybmFsJztcblxuY29uc3Qgc3Vic2NyaWJlcl9xdWV1ZSA9IFtdO1xuLyoqXG4gKiBDcmVhdGVzIGEgYFJlYWRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB2YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyfXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gcmVhZGFibGUodmFsdWUsIHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQpLnN1YnNjcmliZSxcbiAgICB9O1xufVxuLyoqXG4gKiBDcmVhdGUgYSBgV3JpdGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIGJvdGggdXBkYXRpbmcgYW5kIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxuICogQHBhcmFtIHsqPX12YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyPX1zdGFydCBzdGFydCBhbmQgc3RvcCBub3RpZmljYXRpb25zIGZvciBzdWJzY3JpcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHdyaXRhYmxlKHZhbHVlLCBzdGFydCA9IG5vb3ApIHtcbiAgICBsZXQgc3RvcDtcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IFtdO1xuICAgIGZ1bmN0aW9uIHNldChuZXdfdmFsdWUpIHtcbiAgICAgICAgaWYgKHNhZmVfbm90X2VxdWFsKHZhbHVlLCBuZXdfdmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ld192YWx1ZTtcbiAgICAgICAgICAgIGlmIChzdG9wKSB7IC8vIHN0b3JlIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgY29uc3QgcnVuX3F1ZXVlID0gIXN1YnNjcmliZXJfcXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICBzWzFdKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUucHVzaChzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5fcXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlW2ldWzBdKHN1YnNjcmliZXJfcXVldWVbaSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZShmbikge1xuICAgICAgICBzZXQoZm4odmFsdWUpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKHJ1biwgaW52YWxpZGF0ZSA9IG5vb3ApIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IFtydW4sIGludmFsaWRhdGVdO1xuICAgICAgICBzdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBzdG9wID0gc3RhcnQoc2V0KSB8fCBub29wO1xuICAgICAgICB9XG4gICAgICAgIHJ1bih2YWx1ZSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHN1YnNjcmliZXJzLmluZGV4T2Yoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICAgICAgc3RvcCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHNldCwgdXBkYXRlLCBzdWJzY3JpYmUgfTtcbn1cbmZ1bmN0aW9uIGRlcml2ZWQoc3RvcmVzLCBmbiwgaW5pdGlhbF92YWx1ZSkge1xuICAgIGNvbnN0IHNpbmdsZSA9ICFBcnJheS5pc0FycmF5KHN0b3Jlcyk7XG4gICAgY29uc3Qgc3RvcmVzX2FycmF5ID0gc2luZ2xlXG4gICAgICAgID8gW3N0b3Jlc11cbiAgICAgICAgOiBzdG9yZXM7XG4gICAgY29uc3QgYXV0byA9IGZuLmxlbmd0aCA8IDI7XG4gICAgcmV0dXJuIHJlYWRhYmxlKGluaXRpYWxfdmFsdWUsIChzZXQpID0+IHtcbiAgICAgICAgbGV0IGluaXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgbGV0IHBlbmRpbmcgPSAwO1xuICAgICAgICBsZXQgY2xlYW51cCA9IG5vb3A7XG4gICAgICAgIGNvbnN0IHN5bmMgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKHNpbmdsZSA/IHZhbHVlc1swXSA6IHZhbHVlcywgc2V0KTtcbiAgICAgICAgICAgIGlmIChhdXRvKSB7XG4gICAgICAgICAgICAgICAgc2V0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwID0gaXNfZnVuY3Rpb24ocmVzdWx0KSA/IHJlc3VsdCA6IG5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlcnMgPSBzdG9yZXNfYXJyYXkubWFwKChzdG9yZSwgaSkgPT4gc3Vic2NyaWJlKHN0b3JlLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlO1xuICAgICAgICAgICAgcGVuZGluZyAmPSB+KDEgPDwgaSk7XG4gICAgICAgICAgICBpZiAoaW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBwZW5kaW5nIHw9ICgxIDw8IGkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGluaXRlZCA9IHRydWU7XG4gICAgICAgIHN5bmMoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICBydW5fYWxsKHVuc3Vic2NyaWJlcnMpO1xuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBkZXJpdmVkLCByZWFkYWJsZSwgd3JpdGFibGUgfTtcbiIsImltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcblxuZXhwb3J0IGNvbnN0IENPTlRFWFRfS0VZID0ge307XG5cbmV4cG9ydCBjb25zdCBwcmVsb2FkID0gKCkgPT4gKHt9KTsiLCI8c2NyaXB0PlxuXHRleHBvcnQgbGV0IHN0YXR1cztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblxuXHRjb25zdCBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jztcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdGgxLCBwIHtcblx0XHRtYXJnaW46IDAgYXV0bztcblx0fVxuXG5cdGgxIHtcblx0XHRmb250LXNpemU6IDIuOGVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdFx0bWFyZ2luOiAwIDAgMC41ZW0gMDtcblx0fVxuXG5cdHAge1xuXHRcdG1hcmdpbjogMWVtIGF1dG87XG5cdH1cblxuXHRAbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcblx0XHRoMSB7XG5cdFx0XHRmb250LXNpemU6IDRlbTtcblx0XHR9XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPntzdGF0dXN9PC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT57c3RhdHVzfTwvaDE+XG5cbjxwPntlcnJvci5tZXNzYWdlfTwvcD5cblxueyNpZiBkZXYgJiYgZXJyb3Iuc3RhY2t9XG5cdDxwcmU+e2Vycm9yLnN0YWNrfTwvcHJlPlxuey9pZn1cbiIsIjwhLS0gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBTYXBwZXIg4oCUIGRvIG5vdCBlZGl0IGl0ISAtLT5cbjxzY3JpcHQ+XG5cdGltcG9ydCB7IHNldENvbnRleHQgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyBDT05URVhUX0tFWSB9IGZyb20gJy4vc2hhcmVkJztcblx0aW1wb3J0IExheW91dCBmcm9tICcuLi8uLi8uLi9yb3V0ZXMvX2xheW91dC5zdmVsdGUnO1xuXHRpbXBvcnQgRXJyb3IgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19lcnJvci5zdmVsdGUnO1xuXG5cdGV4cG9ydCBsZXQgc3RvcmVzO1xuXHRleHBvcnQgbGV0IGVycm9yO1xuXHRleHBvcnQgbGV0IHN0YXR1cztcblx0ZXhwb3J0IGxldCBzZWdtZW50cztcblx0ZXhwb3J0IGxldCBsZXZlbDA7XG5cdGV4cG9ydCBsZXQgbGV2ZWwxID0gbnVsbDtcblxuXHRzZXRDb250ZXh0KENPTlRFWFRfS0VZLCBzdG9yZXMpO1xuPC9zY3JpcHQ+XG5cbjxMYXlvdXQgc2VnbWVudD1cIntzZWdtZW50c1swXX1cIiB7Li4ubGV2ZWwwLnByb3BzfT5cblx0eyNpZiBlcnJvcn1cblx0XHQ8RXJyb3Ige2Vycm9yfSB7c3RhdHVzfS8+XG5cdHs6ZWxzZX1cblx0XHQ8c3ZlbHRlOmNvbXBvbmVudCB0aGlzPVwie2xldmVsMS5jb21wb25lbnR9XCIgey4uLmxldmVsMS5wcm9wc30vPlxuXHR7L2lmfVxuPC9MYXlvdXQ+IiwiLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBTYXBwZXIg4oCUIGRvIG5vdCBlZGl0IGl0IVxuZXhwb3J0IHsgZGVmYXVsdCBhcyBSb290IH0gZnJvbSAnLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlJztcbmV4cG9ydCB7IHByZWxvYWQgYXMgcm9vdF9wcmVsb2FkIH0gZnJvbSAnLi9zaGFyZWQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFcnJvckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlJztcblxuZXhwb3J0IGNvbnN0IGlnbm9yZSA9IFsvXlxcL2RvY3VtZW50YXRpb24uanNvbiQvLCAvXlxcL2RvY3VtZW50YXRpb25cXC8oW15cXC9dKz8pLmpzb24kL107XG5cbmV4cG9ydCBjb25zdCBjb21wb25lbnRzID0gW1xuXHR7XG5cdFx0anM6ICgpID0+IGltcG9ydChcIi4uLy4uLy4uL3JvdXRlcy9pbmRleC5zdmVsdGVcIiksXG5cdFx0Y3NzOiBcIl9fU0FQUEVSX0NTU19QTEFDRUhPTERFUjppbmRleC5zdmVsdGVfX1wiXG5cdH0sXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL2xpc3RlLWRlcy10aGVzLVt0eXBlXS5zdmVsdGVcIiksXG5cdFx0Y3NzOiBcIl9fU0FQUEVSX0NTU19QTEFDRUhPTERFUjpsaXN0ZS1kZXMtdGhlcy1bdHlwZV0uc3ZlbHRlX19cIlxuXHR9LFxuXHR7XG5cdFx0anM6ICgpID0+IGltcG9ydChcIi4uLy4uLy4uL3JvdXRlcy9ub3VzLWNvbnRhY3Rlci5zdmVsdGVcIiksXG5cdFx0Y3NzOiBcIl9fU0FQUEVSX0NTU19QTEFDRUhPTERFUjpub3VzLWNvbnRhY3Rlci5zdmVsdGVfX1wiXG5cdH0sXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL2RvY3VtZW50YXRpb24vaW5kZXguc3ZlbHRlXCIpLFxuXHRcdGNzczogXCJfX1NBUFBFUl9DU1NfUExBQ0VIT0xERVI6ZG9jdW1lbnRhdGlvbi9pbmRleC5zdmVsdGVfX1wiXG5cdH0sXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL2RvY3VtZW50YXRpb24vW3NsdWddLnN2ZWx0ZVwiKSxcblx0XHRjc3M6IFwiX19TQVBQRVJfQ1NTX1BMQUNFSE9MREVSOmRvY3VtZW50YXRpb24vW3NsdWddLnN2ZWx0ZV9fXCJcblx0fSxcblx0e1xuXHRcdGpzOiAoKSA9PiBpbXBvcnQoXCIuLi8uLi8uLi9yb3V0ZXMvZmljaGUtW2lkZW9ncmFtXS5zdmVsdGVcIiksXG5cdFx0Y3NzOiBcIl9fU0FQUEVSX0NTU19QTEFDRUhPTERFUjpmaWNoZS1baWRlb2dyYW1dLnN2ZWx0ZV9fXCJcblx0fSxcblx0e1xuXHRcdGpzOiAoKSA9PiBpbXBvcnQoXCIuLi8uLi8uLi9yb3V0ZXMvdGVybWVzLnN2ZWx0ZVwiKSxcblx0XHRjc3M6IFwiX19TQVBQRVJfQ1NTX1BMQUNFSE9MREVSOnRlcm1lcy5zdmVsdGVfX1wiXG5cdH1cbl07XG5cbmV4cG9ydCBjb25zdCByb3V0ZXMgPSAoZCA9PiBbXG5cdHtcblx0XHQvLyBpbmRleC5zdmVsdGVcblx0XHRwYXR0ZXJuOiAvXlxcLyQvLFxuXHRcdHBhcnRzOiBbXG5cdFx0XHR7IGk6IDAgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gbGlzdGUtZGVzLXRoZXMtW3R5cGVdLnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvbGlzdGUtZGVzLXRoZXMtKFteXFwvXSs/KVxcLz8kLyxcblx0XHRwYXJ0czogW1xuXHRcdFx0eyBpOiAxLCBwYXJhbXM6IG1hdGNoID0+ICh7IHR5cGU6IGQobWF0Y2hbMV0pIH0pIH1cblx0XHRdXG5cdH0sXG5cblx0e1xuXHRcdC8vIG5vdXMtY29udGFjdGVyLnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvbm91cy1jb250YWN0ZXJcXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdHsgaTogMiB9XG5cdFx0XVxuXHR9LFxuXG5cdHtcblx0XHQvLyBkb2N1bWVudGF0aW9uL2luZGV4LnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvZG9jdW1lbnRhdGlvblxcLz8kLyxcblx0XHRwYXJ0czogW1xuXHRcdFx0eyBpOiAzIH1cblx0XHRdXG5cdH0sXG5cblx0e1xuXHRcdC8vIGRvY3VtZW50YXRpb24vW3NsdWddLnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvZG9jdW1lbnRhdGlvblxcLyhbXlxcL10rPylcXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdG51bGwsXG5cdFx0XHR7IGk6IDQsIHBhcmFtczogbWF0Y2ggPT4gKHsgc2x1ZzogZChtYXRjaFsxXSkgfSkgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gZmljaGUtW2lkZW9ncmFtXS5zdmVsdGVcblx0XHRwYXR0ZXJuOiAvXlxcL2ZpY2hlLShbXlxcL10rPylcXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdHsgaTogNSwgcGFyYW1zOiBtYXRjaCA9PiAoeyBpZGVvZ3JhbTogZChtYXRjaFsxXSkgfSkgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gdGVybWVzLnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvdGVybWVzXFwvPyQvLFxuXHRcdHBhcnRzOiBbXG5cdFx0XHR7IGk6IDYgfVxuXHRcdF1cblx0fVxuXSkoZGVjb2RlVVJJQ29tcG9uZW50KTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdGltcG9ydChcIi9ob21lL3BudGJyL0RvY3VtZW50cy9naXRodWIvb2lzaWZsb3J1cy9icm91dGlsbGUvbm9kZV9tb2R1bGVzL3NhcHBlci9zYXBwZXItZGV2LWNsaWVudC5qc1wiKS50aGVuKGNsaWVudCA9PiB7XG5cdFx0Y2xpZW50LmNvbm5lY3QoMTAwMDApO1xuXHR9KTtcbn0iLCJpbXBvcnQgeyBnZXRDb250ZXh0IH0gZnJvbSAnc3ZlbHRlJztcbmltcG9ydCB7IENPTlRFWFRfS0VZIH0gZnJvbSAnLi9pbnRlcm5hbC9zaGFyZWQnO1xuaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuaW1wb3J0IEFwcCBmcm9tICcuL2ludGVybmFsL0FwcC5zdmVsdGUnO1xuaW1wb3J0IHsgaWdub3JlLCByb3V0ZXMsIHJvb3RfcHJlbG9hZCwgY29tcG9uZW50cywgRXJyb3JDb21wb25lbnQgfSBmcm9tICcuL2ludGVybmFsL21hbmlmZXN0LWNsaWVudCc7XG5cbmZ1bmN0aW9uIGdvdG8oaHJlZiwgb3B0cyA9IHsgcmVwbGFjZVN0YXRlOiBmYWxzZSB9KSB7XG5cdGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQobmV3IFVSTChocmVmLCBkb2N1bWVudC5iYXNlVVJJKSk7XG5cblx0aWYgKHRhcmdldCkge1xuXHRcdF9oaXN0b3J5W29wdHMucmVwbGFjZVN0YXRlID8gJ3JlcGxhY2VTdGF0ZScgOiAncHVzaFN0YXRlJ10oeyBpZDogY2lkIH0sICcnLCBocmVmKTtcblx0XHRyZXR1cm4gbmF2aWdhdGUodGFyZ2V0LCBudWxsKS50aGVuKCgpID0+IHt9KTtcblx0fVxuXG5cdGxvY2F0aW9uLmhyZWYgPSBocmVmO1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZiA9PiB7fSk7IC8vIG5ldmVyIHJlc29sdmVzXG59XG5cbmNvbnN0IGluaXRpYWxfZGF0YSA9IHR5cGVvZiBfX1NBUFBFUl9fICE9PSAndW5kZWZpbmVkJyAmJiBfX1NBUFBFUl9fO1xuXG5sZXQgcmVhZHkgPSBmYWxzZTtcbmxldCByb290X2NvbXBvbmVudDtcbmxldCBjdXJyZW50X3Rva2VuO1xubGV0IHJvb3RfcHJlbG9hZGVkO1xubGV0IGN1cnJlbnRfYnJhbmNoID0gW107XG5sZXQgY3VycmVudF9xdWVyeSA9ICd7fSc7XG5cbmNvbnN0IHN0b3JlcyA9IHtcblx0cGFnZTogd3JpdGFibGUoe30pLFxuXHRwcmVsb2FkaW5nOiB3cml0YWJsZShudWxsKSxcblx0c2Vzc2lvbjogd3JpdGFibGUoaW5pdGlhbF9kYXRhICYmIGluaXRpYWxfZGF0YS5zZXNzaW9uKVxufTtcblxubGV0ICRzZXNzaW9uO1xubGV0IHNlc3Npb25fZGlydHk7XG5cbnN0b3Jlcy5zZXNzaW9uLnN1YnNjcmliZShhc3luYyB2YWx1ZSA9PiB7XG5cdCRzZXNzaW9uID0gdmFsdWU7XG5cblx0aWYgKCFyZWFkeSkgcmV0dXJuO1xuXHRzZXNzaW9uX2RpcnR5ID0gdHJ1ZTtcblxuXHRjb25zdCB0YXJnZXQgPSBzZWxlY3RfdGFyZ2V0KG5ldyBVUkwobG9jYXRpb24uaHJlZikpO1xuXG5cdGNvbnN0IHRva2VuID0gY3VycmVudF90b2tlbiA9IHt9O1xuXHRjb25zdCB7IHJlZGlyZWN0LCBwcm9wcywgYnJhbmNoIH0gPSBhd2FpdCBoeWRyYXRlX3RhcmdldCh0YXJnZXQpO1xuXHRpZiAodG9rZW4gIT09IGN1cnJlbnRfdG9rZW4pIHJldHVybjsgLy8gYSBzZWNvbmRhcnkgbmF2aWdhdGlvbiBoYXBwZW5lZCB3aGlsZSB3ZSB3ZXJlIGxvYWRpbmdcblxuXHRhd2FpdCByZW5kZXIocmVkaXJlY3QsIGJyYW5jaCwgcHJvcHMsIHRhcmdldC5wYWdlKTtcbn0pO1xuXG5sZXQgcHJlZmV0Y2hpbmdcblxuXG4gPSBudWxsO1xuZnVuY3Rpb24gc2V0X3ByZWZldGNoaW5nKGhyZWYsIHByb21pc2UpIHtcblx0cHJlZmV0Y2hpbmcgPSB7IGhyZWYsIHByb21pc2UgfTtcbn1cblxubGV0IHRhcmdldDtcbmZ1bmN0aW9uIHNldF90YXJnZXQoZWxlbWVudCkge1xuXHR0YXJnZXQgPSBlbGVtZW50O1xufVxuXG5sZXQgdWlkID0gMTtcbmZ1bmN0aW9uIHNldF91aWQobikge1xuXHR1aWQgPSBuO1xufVxuXG5sZXQgY2lkO1xuZnVuY3Rpb24gc2V0X2NpZChuKSB7XG5cdGNpZCA9IG47XG59XG5cbmNvbnN0IF9oaXN0b3J5ID0gdHlwZW9mIGhpc3RvcnkgIT09ICd1bmRlZmluZWQnID8gaGlzdG9yeSA6IHtcblx0cHVzaFN0YXRlOiAoc3RhdGUsIHRpdGxlLCBocmVmKSA9PiB7fSxcblx0cmVwbGFjZVN0YXRlOiAoc3RhdGUsIHRpdGxlLCBocmVmKSA9PiB7fSxcblx0c2Nyb2xsUmVzdG9yYXRpb246ICcnXG59O1xuXG5jb25zdCBzY3JvbGxfaGlzdG9yeSA9IHt9O1xuXG5mdW5jdGlvbiBleHRyYWN0X3F1ZXJ5KHNlYXJjaCkge1xuXHRjb25zdCBxdWVyeSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdGlmIChzZWFyY2gubGVuZ3RoID4gMCkge1xuXHRcdHNlYXJjaC5zbGljZSgxKS5zcGxpdCgnJicpLmZvckVhY2goc2VhcmNoUGFyYW0gPT4ge1xuXHRcdFx0bGV0IFssIGtleSwgdmFsdWUgPSAnJ10gPSAvKFtePV0qKSg/Oj0oLiopKT8vLmV4ZWMoZGVjb2RlVVJJQ29tcG9uZW50KHNlYXJjaFBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpKSk7XG5cdFx0XHRpZiAodHlwZW9mIHF1ZXJ5W2tleV0gPT09ICdzdHJpbmcnKSBxdWVyeVtrZXldID0gW3F1ZXJ5W2tleV1dO1xuXHRcdFx0aWYgKHR5cGVvZiBxdWVyeVtrZXldID09PSAnb2JqZWN0JykgKHF1ZXJ5W2tleV0gKS5wdXNoKHZhbHVlKTtcblx0XHRcdGVsc2UgcXVlcnlba2V5XSA9IHZhbHVlO1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBxdWVyeTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0X3RhcmdldCh1cmwpIHtcblx0aWYgKHVybC5vcmlnaW4gIT09IGxvY2F0aW9uLm9yaWdpbikgcmV0dXJuIG51bGw7XG5cdGlmICghdXJsLnBhdGhuYW1lLnN0YXJ0c1dpdGgoaW5pdGlhbF9kYXRhLmJhc2VVcmwpKSByZXR1cm4gbnVsbDtcblxuXHRsZXQgcGF0aCA9IHVybC5wYXRobmFtZS5zbGljZShpbml0aWFsX2RhdGEuYmFzZVVybC5sZW5ndGgpO1xuXG5cdGlmIChwYXRoID09PSAnJykge1xuXHRcdHBhdGggPSAnLyc7XG5cdH1cblxuXHQvLyBhdm9pZCBhY2NpZGVudGFsIGNsYXNoZXMgYmV0d2VlbiBzZXJ2ZXIgcm91dGVzIGFuZCBwYWdlIHJvdXRlc1xuXHRpZiAoaWdub3JlLnNvbWUocGF0dGVybiA9PiBwYXR0ZXJuLnRlc3QocGF0aCkpKSByZXR1cm47XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRjb25zdCByb3V0ZSA9IHJvdXRlc1tpXTtcblxuXHRcdGNvbnN0IG1hdGNoID0gcm91dGUucGF0dGVybi5leGVjKHBhdGgpO1xuXG5cdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRjb25zdCBxdWVyeSA9IGV4dHJhY3RfcXVlcnkodXJsLnNlYXJjaCk7XG5cdFx0XHRjb25zdCBwYXJ0ID0gcm91dGUucGFydHNbcm91dGUucGFydHMubGVuZ3RoIC0gMV07XG5cdFx0XHRjb25zdCBwYXJhbXMgPSBwYXJ0LnBhcmFtcyA/IHBhcnQucGFyYW1zKG1hdGNoKSA6IHt9O1xuXG5cdFx0XHRjb25zdCBwYWdlID0geyBob3N0OiBsb2NhdGlvbi5ob3N0LCBwYXRoLCBxdWVyeSwgcGFyYW1zIH07XG5cblx0XHRcdHJldHVybiB7IGhyZWY6IHVybC5ocmVmLCByb3V0ZSwgbWF0Y2gsIHBhZ2UgfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yKHVybCkge1xuXHRjb25zdCB7IGhvc3QsIHBhdGhuYW1lLCBzZWFyY2ggfSA9IGxvY2F0aW9uO1xuXHRjb25zdCB7IHNlc3Npb24sIHByZWxvYWRlZCwgc3RhdHVzLCBlcnJvciB9ID0gaW5pdGlhbF9kYXRhO1xuXG5cdGlmICghcm9vdF9wcmVsb2FkZWQpIHtcblx0XHRyb290X3ByZWxvYWRlZCA9IHByZWxvYWRlZCAmJiBwcmVsb2FkZWRbMF07XG5cdH1cblxuXHRjb25zdCBwcm9wcyA9IHtcblx0XHRlcnJvcixcblx0XHRzdGF0dXMsXG5cdFx0c2Vzc2lvbixcblx0XHRsZXZlbDA6IHtcblx0XHRcdHByb3BzOiByb290X3ByZWxvYWRlZFxuXHRcdH0sXG5cdFx0bGV2ZWwxOiB7XG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHRzdGF0dXMsXG5cdFx0XHRcdGVycm9yXG5cdFx0XHR9LFxuXHRcdFx0Y29tcG9uZW50OiBFcnJvckNvbXBvbmVudFxuXHRcdH0sXG5cdFx0c2VnbWVudHM6IHByZWxvYWRlZFxuXG5cdH07XG5cdGNvbnN0IHF1ZXJ5ID0gZXh0cmFjdF9xdWVyeShzZWFyY2gpO1xuXHRyZW5kZXIobnVsbCwgW10sIHByb3BzLCB7IGhvc3QsIHBhdGg6IHBhdGhuYW1lLCBxdWVyeSwgcGFyYW1zOiB7fSB9KTtcbn1cblxuZnVuY3Rpb24gc2Nyb2xsX3N0YXRlKCkge1xuXHRyZXR1cm4ge1xuXHRcdHg6IHBhZ2VYT2Zmc2V0LFxuXHRcdHk6IHBhZ2VZT2Zmc2V0XG5cdH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG5hdmlnYXRlKHRhcmdldCwgaWQsIG5vc2Nyb2xsLCBoYXNoKSB7XG5cdGlmIChpZCkge1xuXHRcdC8vIHBvcHN0YXRlIG9yIGluaXRpYWwgbmF2aWdhdGlvblxuXHRcdGNpZCA9IGlkO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGN1cnJlbnRfc2Nyb2xsID0gc2Nyb2xsX3N0YXRlKCk7XG5cblx0XHQvLyBjbGlja2VkIG9uIGEgbGluay4gcHJlc2VydmUgc2Nyb2xsIHN0YXRlXG5cdFx0c2Nyb2xsX2hpc3RvcnlbY2lkXSA9IGN1cnJlbnRfc2Nyb2xsO1xuXG5cdFx0aWQgPSBjaWQgPSArK3VpZDtcblx0XHRzY3JvbGxfaGlzdG9yeVtjaWRdID0gbm9zY3JvbGwgPyBjdXJyZW50X3Njcm9sbCA6IHsgeDogMCwgeTogMCB9O1xuXHR9XG5cblx0Y2lkID0gaWQ7XG5cblx0aWYgKHJvb3RfY29tcG9uZW50KSBzdG9yZXMucHJlbG9hZGluZy5zZXQodHJ1ZSk7XG5cblx0Y29uc3QgbG9hZGVkID0gcHJlZmV0Y2hpbmcgJiYgcHJlZmV0Y2hpbmcuaHJlZiA9PT0gdGFyZ2V0LmhyZWYgP1xuXHRcdHByZWZldGNoaW5nLnByb21pc2UgOlxuXHRcdGh5ZHJhdGVfdGFyZ2V0KHRhcmdldCk7XG5cblx0cHJlZmV0Y2hpbmcgPSBudWxsO1xuXG5cdGNvbnN0IHRva2VuID0gY3VycmVudF90b2tlbiA9IHt9O1xuXHRjb25zdCB7IHJlZGlyZWN0LCBwcm9wcywgYnJhbmNoIH0gPSBhd2FpdCBsb2FkZWQ7XG5cdGlmICh0b2tlbiAhPT0gY3VycmVudF90b2tlbikgcmV0dXJuOyAvLyBhIHNlY29uZGFyeSBuYXZpZ2F0aW9uIGhhcHBlbmVkIHdoaWxlIHdlIHdlcmUgbG9hZGluZ1xuXG5cdGF3YWl0IHJlbmRlcihyZWRpcmVjdCwgYnJhbmNoLCBwcm9wcywgdGFyZ2V0LnBhZ2UpO1xuXHRpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG5cblx0aWYgKCFub3Njcm9sbCkge1xuXHRcdGxldCBzY3JvbGwgPSBzY3JvbGxfaGlzdG9yeVtpZF07XG5cblx0XHRpZiAoaGFzaCkge1xuXHRcdFx0Ly8gc2Nyb2xsIGlzIGFuIGVsZW1lbnQgaWQgKGZyb20gYSBoYXNoKSwgd2UgbmVlZCB0byBjb21wdXRlIHkuXG5cdFx0XHRjb25zdCBkZWVwX2xpbmtlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2guc2xpY2UoMSkpO1xuXG5cdFx0XHRpZiAoZGVlcF9saW5rZWQpIHtcblx0XHRcdFx0c2Nyb2xsID0ge1xuXHRcdFx0XHRcdHg6IDAsXG5cdFx0XHRcdFx0eTogZGVlcF9saW5rZWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2Nyb2xsX2hpc3RvcnlbY2lkXSA9IHNjcm9sbDtcblx0XHRpZiAoc2Nyb2xsKSBzY3JvbGxUbyhzY3JvbGwueCwgc2Nyb2xsLnkpO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbmRlcihyZWRpcmVjdCwgYnJhbmNoLCBwcm9wcywgcGFnZSkge1xuXHRpZiAocmVkaXJlY3QpIHJldHVybiBnb3RvKHJlZGlyZWN0LmxvY2F0aW9uLCB7IHJlcGxhY2VTdGF0ZTogdHJ1ZSB9KTtcblxuXHRzdG9yZXMucGFnZS5zZXQocGFnZSk7XG5cdHN0b3Jlcy5wcmVsb2FkaW5nLnNldChmYWxzZSk7XG5cblx0aWYgKHJvb3RfY29tcG9uZW50KSB7XG5cdFx0cm9vdF9jb21wb25lbnQuJHNldChwcm9wcyk7XG5cdH0gZWxzZSB7XG5cdFx0cHJvcHMuc3RvcmVzID0ge1xuXHRcdFx0cGFnZTogeyBzdWJzY3JpYmU6IHN0b3Jlcy5wYWdlLnN1YnNjcmliZSB9LFxuXHRcdFx0cHJlbG9hZGluZzogeyBzdWJzY3JpYmU6IHN0b3Jlcy5wcmVsb2FkaW5nLnN1YnNjcmliZSB9LFxuXHRcdFx0c2Vzc2lvbjogc3RvcmVzLnNlc3Npb25cblx0XHR9O1xuXHRcdHByb3BzLmxldmVsMCA9IHtcblx0XHRcdHByb3BzOiBhd2FpdCByb290X3ByZWxvYWRlZFxuXHRcdH07XG5cblx0XHQvLyBmaXJzdCBsb2FkIOKAlCByZW1vdmUgU1NSJ2QgPGhlYWQ+IGNvbnRlbnRzXG5cdFx0Y29uc3Qgc3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FwcGVyLWhlYWQtc3RhcnQnKTtcblx0XHRjb25zdCBlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FwcGVyLWhlYWQtZW5kJyk7XG5cblx0XHRpZiAoc3RhcnQgJiYgZW5kKSB7XG5cdFx0XHR3aGlsZSAoc3RhcnQubmV4dFNpYmxpbmcgIT09IGVuZCkgZGV0YWNoKHN0YXJ0Lm5leHRTaWJsaW5nKTtcblx0XHRcdGRldGFjaChzdGFydCk7XG5cdFx0XHRkZXRhY2goZW5kKTtcblx0XHR9XG5cblx0XHRyb290X2NvbXBvbmVudCA9IG5ldyBBcHAoe1xuXHRcdFx0dGFyZ2V0LFxuXHRcdFx0cHJvcHMsXG5cdFx0XHRoeWRyYXRlOiB0cnVlXG5cdFx0fSk7XG5cdH1cblxuXHRjdXJyZW50X2JyYW5jaCA9IGJyYW5jaDtcblx0Y3VycmVudF9xdWVyeSA9IEpTT04uc3RyaW5naWZ5KHBhZ2UucXVlcnkpO1xuXHRyZWFkeSA9IHRydWU7XG5cdHNlc3Npb25fZGlydHkgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcGFydF9jaGFuZ2VkKGksIHNlZ21lbnQsIG1hdGNoLCBzdHJpbmdpZmllZF9xdWVyeSkge1xuXHQvLyBUT0RPIG9ubHkgY2hlY2sgcXVlcnkgc3RyaW5nIGNoYW5nZXMgZm9yIHByZWxvYWQgZnVuY3Rpb25zXG5cdC8vIHRoYXQgZG8gaW4gZmFjdCBkZXBlbmQgb24gaXQgKHVzaW5nIHN0YXRpYyBhbmFseXNpcyBvclxuXHQvLyBydW50aW1lIGluc3RydW1lbnRhdGlvbilcblx0aWYgKHN0cmluZ2lmaWVkX3F1ZXJ5ICE9PSBjdXJyZW50X3F1ZXJ5KSByZXR1cm4gdHJ1ZTtcblxuXHRjb25zdCBwcmV2aW91cyA9IGN1cnJlbnRfYnJhbmNoW2ldO1xuXG5cdGlmICghcHJldmlvdXMpIHJldHVybiBmYWxzZTtcblx0aWYgKHNlZ21lbnQgIT09IHByZXZpb3VzLnNlZ21lbnQpIHJldHVybiB0cnVlO1xuXHRpZiAocHJldmlvdXMubWF0Y2gpIHtcblx0XHRpZiAoSlNPTi5zdHJpbmdpZnkocHJldmlvdXMubWF0Y2guc2xpY2UoMSwgaSArIDIpKSAhPT0gSlNPTi5zdHJpbmdpZnkobWF0Y2guc2xpY2UoMSwgaSArIDIpKSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGh5ZHJhdGVfdGFyZ2V0KHRhcmdldClcblxuXG5cbiB7XG5cdGNvbnN0IHsgcm91dGUsIHBhZ2UgfSA9IHRhcmdldDtcblx0Y29uc3Qgc2VnbWVudHMgPSBwYWdlLnBhdGguc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XG5cblx0bGV0IHJlZGlyZWN0ID0gbnVsbDtcblxuXHRjb25zdCBwcm9wcyA9IHsgZXJyb3I6IG51bGwsIHN0YXR1czogMjAwLCBzZWdtZW50czogW3NlZ21lbnRzWzBdXSB9O1xuXG5cdGNvbnN0IHByZWxvYWRfY29udGV4dCA9IHtcblx0XHRmZXRjaDogKHVybCwgb3B0cykgPT4gZmV0Y2godXJsLCBvcHRzKSxcblx0XHRyZWRpcmVjdDogKHN0YXR1c0NvZGUsIGxvY2F0aW9uKSA9PiB7XG5cdFx0XHRpZiAocmVkaXJlY3QgJiYgKHJlZGlyZWN0LnN0YXR1c0NvZGUgIT09IHN0YXR1c0NvZGUgfHwgcmVkaXJlY3QubG9jYXRpb24gIT09IGxvY2F0aW9uKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYENvbmZsaWN0aW5nIHJlZGlyZWN0c2ApO1xuXHRcdFx0fVxuXHRcdFx0cmVkaXJlY3QgPSB7IHN0YXR1c0NvZGUsIGxvY2F0aW9uIH07XG5cdFx0fSxcblx0XHRlcnJvcjogKHN0YXR1cywgZXJyb3IpID0+IHtcblx0XHRcdHByb3BzLmVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IG5ldyBFcnJvcihlcnJvcikgOiBlcnJvcjtcblx0XHRcdHByb3BzLnN0YXR1cyA9IHN0YXR1cztcblx0XHR9XG5cdH07XG5cblx0aWYgKCFyb290X3ByZWxvYWRlZCkge1xuXHRcdHJvb3RfcHJlbG9hZGVkID0gaW5pdGlhbF9kYXRhLnByZWxvYWRlZFswXSB8fCByb290X3ByZWxvYWQuY2FsbChwcmVsb2FkX2NvbnRleHQsIHtcblx0XHRcdGhvc3Q6IHBhZ2UuaG9zdCxcblx0XHRcdHBhdGg6IHBhZ2UucGF0aCxcblx0XHRcdHF1ZXJ5OiBwYWdlLnF1ZXJ5LFxuXHRcdFx0cGFyYW1zOiB7fVxuXHRcdH0sICRzZXNzaW9uKTtcblx0fVxuXG5cdGxldCBicmFuY2g7XG5cdGxldCBsID0gMTtcblxuXHR0cnkge1xuXHRcdGNvbnN0IHN0cmluZ2lmaWVkX3F1ZXJ5ID0gSlNPTi5zdHJpbmdpZnkocGFnZS5xdWVyeSk7XG5cdFx0Y29uc3QgbWF0Y2ggPSByb3V0ZS5wYXR0ZXJuLmV4ZWMocGFnZS5wYXRoKTtcblxuXHRcdGxldCBzZWdtZW50X2RpcnR5ID0gZmFsc2U7XG5cblx0XHRicmFuY2ggPSBhd2FpdCBQcm9taXNlLmFsbChyb3V0ZS5wYXJ0cy5tYXAoYXN5bmMgKHBhcnQsIGkpID0+IHtcblx0XHRcdGNvbnN0IHNlZ21lbnQgPSBzZWdtZW50c1tpXTtcblxuXHRcdFx0aWYgKHBhcnRfY2hhbmdlZChpLCBzZWdtZW50LCBtYXRjaCwgc3RyaW5naWZpZWRfcXVlcnkpKSBzZWdtZW50X2RpcnR5ID0gdHJ1ZTtcblxuXHRcdFx0cHJvcHMuc2VnbWVudHNbbF0gPSBzZWdtZW50c1tpICsgMV07IC8vIFRPRE8gbWFrZSB0aGlzIGxlc3MgY29uZnVzaW5nXG5cdFx0XHRpZiAoIXBhcnQpIHJldHVybiB7IHNlZ21lbnQgfTtcblxuXHRcdFx0Y29uc3QgaiA9IGwrKztcblxuXHRcdFx0aWYgKCFzZXNzaW9uX2RpcnR5ICYmICFzZWdtZW50X2RpcnR5ICYmIGN1cnJlbnRfYnJhbmNoW2ldICYmIGN1cnJlbnRfYnJhbmNoW2ldLnBhcnQgPT09IHBhcnQuaSkge1xuXHRcdFx0XHRyZXR1cm4gY3VycmVudF9icmFuY2hbaV07XG5cdFx0XHR9XG5cblx0XHRcdHNlZ21lbnRfZGlydHkgPSBmYWxzZTtcblxuXHRcdFx0Y29uc3QgeyBkZWZhdWx0OiBjb21wb25lbnQsIHByZWxvYWQgfSA9IGF3YWl0IGxvYWRfY29tcG9uZW50KGNvbXBvbmVudHNbcGFydC5pXSk7XG5cblx0XHRcdGxldCBwcmVsb2FkZWQ7XG5cdFx0XHRpZiAocmVhZHkgfHwgIWluaXRpYWxfZGF0YS5wcmVsb2FkZWRbaSArIDFdKSB7XG5cdFx0XHRcdHByZWxvYWRlZCA9IHByZWxvYWRcblx0XHRcdFx0XHQ/IGF3YWl0IHByZWxvYWQuY2FsbChwcmVsb2FkX2NvbnRleHQsIHtcblx0XHRcdFx0XHRcdGhvc3Q6IHBhZ2UuaG9zdCxcblx0XHRcdFx0XHRcdHBhdGg6IHBhZ2UucGF0aCxcblx0XHRcdFx0XHRcdHF1ZXJ5OiBwYWdlLnF1ZXJ5LFxuXHRcdFx0XHRcdFx0cGFyYW1zOiBwYXJ0LnBhcmFtcyA/IHBhcnQucGFyYW1zKHRhcmdldC5tYXRjaCkgOiB7fVxuXHRcdFx0XHRcdH0sICRzZXNzaW9uKVxuXHRcdFx0XHRcdDoge307XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwcmVsb2FkZWQgPSBpbml0aWFsX2RhdGEucHJlbG9hZGVkW2kgKyAxXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChwcm9wc1tgbGV2ZWwke2p9YF0gPSB7IGNvbXBvbmVudCwgcHJvcHM6IHByZWxvYWRlZCwgc2VnbWVudCwgbWF0Y2gsIHBhcnQ6IHBhcnQuaSB9KTtcblx0XHR9KSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cHJvcHMuZXJyb3IgPSBlcnJvcjtcblx0XHRwcm9wcy5zdGF0dXMgPSA1MDA7XG5cdFx0YnJhbmNoID0gW107XG5cdH1cblxuXHRyZXR1cm4geyByZWRpcmVjdCwgcHJvcHMsIGJyYW5jaCB9O1xufVxuXG5mdW5jdGlvbiBsb2FkX2NzcyhjaHVuaykge1xuXHRjb25zdCBocmVmID0gYGNsaWVudC8ke2NodW5rfWA7XG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaW5rW2hyZWY9XCIke2hyZWZ9XCJdYCkpIHJldHVybjtcblxuXHRyZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbCwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblx0XHRsaW5rLnJlbCA9ICdzdHlsZXNoZWV0Jztcblx0XHRsaW5rLmhyZWYgPSBocmVmO1xuXG5cdFx0bGluay5vbmxvYWQgPSAoKSA9PiBmdWxmaWwoKTtcblx0XHRsaW5rLm9uZXJyb3IgPSByZWplY3Q7XG5cblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gbG9hZF9jb21wb25lbnQoY29tcG9uZW50KVxuXG5cbiB7XG5cdC8vIFRPRE8gdGhpcyBpcyB0ZW1wb3Jhcnkg4oCUIG9uY2UgcGxhY2Vob2xkZXJzIGFyZVxuXHQvLyBhbHdheXMgcmV3cml0dGVuLCBzY3JhdGNoIHRoZSB0ZXJuYXJ5XG5cdGNvbnN0IHByb21pc2VzID0gKHR5cGVvZiBjb21wb25lbnQuY3NzID09PSAnc3RyaW5nJyA/IFtdIDogY29tcG9uZW50LmNzcy5tYXAobG9hZF9jc3MpKTtcblx0cHJvbWlzZXMudW5zaGlmdChjb21wb25lbnQuanMoKSk7XG5cdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbih2YWx1ZXMgPT4gdmFsdWVzWzBdKTtcbn1cblxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcblx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuXG5mdW5jdGlvbiBwcmVmZXRjaChocmVmKSB7XG5cdGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQobmV3IFVSTChocmVmLCBkb2N1bWVudC5iYXNlVVJJKSk7XG5cblx0aWYgKHRhcmdldCkge1xuXHRcdGlmICghcHJlZmV0Y2hpbmcgfHwgaHJlZiAhPT0gcHJlZmV0Y2hpbmcuaHJlZikge1xuXHRcdFx0c2V0X3ByZWZldGNoaW5nKGhyZWYsIGh5ZHJhdGVfdGFyZ2V0KHRhcmdldCkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBwcmVmZXRjaGluZy5wcm9taXNlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KG9wdHNcblxuKSB7XG5cdGlmICgnc2Nyb2xsUmVzdG9yYXRpb24nIGluIF9oaXN0b3J5KSB7XG5cdFx0X2hpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnbWFudWFsJztcblx0fVxuXG5cdHNldF90YXJnZXQob3B0cy50YXJnZXQpO1xuXG5cdGFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlX2NsaWNrKTtcblx0YWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBoYW5kbGVfcG9wc3RhdGUpO1xuXG5cdC8vIHByZWZldGNoXG5cdGFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0cmlnZ2VyX3ByZWZldGNoKTtcblx0YWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlX21vdXNlbW92ZSk7XG5cblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdGNvbnN0IHsgaGFzaCwgaHJlZiB9ID0gbG9jYXRpb247XG5cblx0XHRfaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBpZDogdWlkIH0sICcnLCBocmVmKTtcblxuXHRcdGNvbnN0IHVybCA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG5cblx0XHRpZiAoaW5pdGlhbF9kYXRhLmVycm9yKSByZXR1cm4gaGFuZGxlX2Vycm9yKCk7XG5cblx0XHRjb25zdCB0YXJnZXQgPSBzZWxlY3RfdGFyZ2V0KHVybCk7XG5cdFx0aWYgKHRhcmdldCkgcmV0dXJuIG5hdmlnYXRlKHRhcmdldCwgdWlkLCB0cnVlLCBoYXNoKTtcblx0fSk7XG59XG5cbmxldCBtb3VzZW1vdmVfdGltZW91dDtcblxuZnVuY3Rpb24gaGFuZGxlX21vdXNlbW92ZShldmVudCkge1xuXHRjbGVhclRpbWVvdXQobW91c2Vtb3ZlX3RpbWVvdXQpO1xuXHRtb3VzZW1vdmVfdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdHRyaWdnZXJfcHJlZmV0Y2goZXZlbnQpO1xuXHR9LCAyMCk7XG59XG5cbmZ1bmN0aW9uIHRyaWdnZXJfcHJlZmV0Y2goZXZlbnQpIHtcblx0Y29uc3QgYSA9IGZpbmRfYW5jaG9yKGV2ZW50LnRhcmdldCk7XG5cdGlmICghYSB8fCBhLnJlbCAhPT0gJ3ByZWZldGNoJykgcmV0dXJuO1xuXG5cdHByZWZldGNoKGEuaHJlZik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9jbGljayhldmVudCkge1xuXHQvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Zpc2lvbm1lZGlhL3BhZ2UuanNcblx0Ly8gTUlUIGxpY2Vuc2UgaHR0cHM6Ly9naXRodWIuY29tL3Zpc2lvbm1lZGlhL3BhZ2UuanMjbGljZW5zZVxuXHRpZiAod2hpY2goZXZlbnQpICE9PSAxKSByZXR1cm47XG5cdGlmIChldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkpIHJldHVybjtcblx0aWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcblxuXHRjb25zdCBhID0gZmluZF9hbmNob3IoZXZlbnQudGFyZ2V0KTtcblx0aWYgKCFhKSByZXR1cm47XG5cblx0aWYgKCFhLmhyZWYpIHJldHVybjtcblxuXHQvLyBjaGVjayBpZiBsaW5rIGlzIGluc2lkZSBhbiBzdmdcblx0Ly8gaW4gdGhpcyBjYXNlLCBib3RoIGhyZWYgYW5kIHRhcmdldCBhcmUgYWx3YXlzIGluc2lkZSBhbiBvYmplY3Rcblx0Y29uc3Qgc3ZnID0gdHlwZW9mIGEuaHJlZiA9PT0gJ29iamVjdCcgJiYgYS5ocmVmLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdTVkdBbmltYXRlZFN0cmluZyc7XG5cdGNvbnN0IGhyZWYgPSBTdHJpbmcoc3ZnID8gKGEpLmhyZWYuYmFzZVZhbCA6IGEuaHJlZik7XG5cblx0aWYgKGhyZWYgPT09IGxvY2F0aW9uLmhyZWYpIHtcblx0XHRpZiAoIWxvY2F0aW9uLmhhc2gpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gSWdub3JlIGlmIHRhZyBoYXNcblx0Ly8gMS4gJ2Rvd25sb2FkJyBhdHRyaWJ1dGVcblx0Ly8gMi4gcmVsPSdleHRlcm5hbCcgYXR0cmlidXRlXG5cdGlmIChhLmhhc0F0dHJpYnV0ZSgnZG93bmxvYWQnKSB8fCBhLmdldEF0dHJpYnV0ZSgncmVsJykgPT09ICdleHRlcm5hbCcpIHJldHVybjtcblxuXHQvLyBJZ25vcmUgaWYgPGE+IGhhcyBhIHRhcmdldFxuXHRpZiAoc3ZnID8gKGEpLnRhcmdldC5iYXNlVmFsIDogYS50YXJnZXQpIHJldHVybjtcblxuXHRjb25zdCB1cmwgPSBuZXcgVVJMKGhyZWYpO1xuXG5cdC8vIERvbid0IGhhbmRsZSBoYXNoIGNoYW5nZXNcblx0aWYgKHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUgJiYgdXJsLnNlYXJjaCA9PT0gbG9jYXRpb24uc2VhcmNoKSByZXR1cm47XG5cblx0Y29uc3QgdGFyZ2V0ID0gc2VsZWN0X3RhcmdldCh1cmwpO1xuXHRpZiAodGFyZ2V0KSB7XG5cdFx0Y29uc3Qgbm9zY3JvbGwgPSBhLmhhc0F0dHJpYnV0ZSgnc2FwcGVyLW5vc2Nyb2xsJyk7XG5cdFx0bmF2aWdhdGUodGFyZ2V0LCBudWxsLCBub3Njcm9sbCwgdXJsLmhhc2gpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0X2hpc3RvcnkucHVzaFN0YXRlKHsgaWQ6IGNpZCB9LCAnJywgdXJsLmhyZWYpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHdoaWNoKGV2ZW50KSB7XG5cdHJldHVybiBldmVudC53aGljaCA9PT0gbnVsbCA/IGV2ZW50LmJ1dHRvbiA6IGV2ZW50LndoaWNoO1xufVxuXG5mdW5jdGlvbiBmaW5kX2FuY2hvcihub2RlKSB7XG5cdHdoaWxlIChub2RlICYmIG5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKSAhPT0gJ0EnKSBub2RlID0gbm9kZS5wYXJlbnROb2RlOyAvLyBTVkcgPGE+IGVsZW1lbnRzIGhhdmUgYSBsb3dlcmNhc2UgbmFtZVxuXHRyZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX3BvcHN0YXRlKGV2ZW50KSB7XG5cdHNjcm9sbF9oaXN0b3J5W2NpZF0gPSBzY3JvbGxfc3RhdGUoKTtcblxuXHRpZiAoZXZlbnQuc3RhdGUpIHtcblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuXHRcdGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQodXJsKTtcblx0XHRpZiAodGFyZ2V0KSB7XG5cdFx0XHRuYXZpZ2F0ZSh0YXJnZXQsIGV2ZW50LnN0YXRlLmlkKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bG9jYXRpb24uaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIGhhc2hjaGFuZ2Vcblx0XHRzZXRfdWlkKHVpZCArIDEpO1xuXHRcdHNldF9jaWQodWlkKTtcblx0XHRfaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBpZDogY2lkIH0sICcnLCBsb2NhdGlvbi5ocmVmKTtcblx0fVxufVxuXG5mdW5jdGlvbiBwcmVmZXRjaFJvdXRlcyhwYXRobmFtZXMpIHtcblx0cmV0dXJuIHJvdXRlc1xuXHRcdC5maWx0ZXIocGF0aG5hbWVzXG5cdFx0XHQ/IHJvdXRlID0+IHBhdGhuYW1lcy5zb21lKHBhdGhuYW1lID0+IHJvdXRlLnBhdHRlcm4udGVzdChwYXRobmFtZSkpXG5cdFx0XHQ6ICgpID0+IHRydWVcblx0XHQpXG5cdFx0LnJlZHVjZSgocHJvbWlzZSwgcm91dGUpID0+IHByb21pc2UudGhlbigoKSA9PiB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocm91dGUucGFydHMubWFwKHBhcnQgPT4gcGFydCAmJiBsb2FkX2NvbXBvbmVudChjb21wb25lbnRzW3BhcnQuaV0pKSk7XG5cdFx0fSksIFByb21pc2UucmVzb2x2ZSgpKTtcbn1cblxuY29uc3Qgc3RvcmVzJDEgPSAoKSA9PiBnZXRDb250ZXh0KENPTlRFWFRfS0VZKTtcblxuZXhwb3J0IHsgZ290bywgcHJlZmV0Y2gsIHByZWZldGNoUm91dGVzLCBzdGFydCwgc3RvcmVzJDEgYXMgc3RvcmVzIH07XG4iLCI8c2NyaXB0PlxuICBleHBvcnQgbGV0IGlzQWN0aXZlID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgaXNGaXJzdCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGlzSG92ZXIgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBnZXRPcHRpb25MYWJlbCA9IHVuZGVmaW5lZDtcbiAgZXhwb3J0IGxldCBpdGVtID0gdW5kZWZpbmVkO1xuICBleHBvcnQgbGV0IGZpbHRlclRleHQgPSAnJztcblxuICBsZXQgaXRlbUNsYXNzZXMgPSAnJztcblxuICAkOiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgIGlmIChpc0FjdGl2ZSkgeyBjbGFzc2VzLnB1c2goJ2FjdGl2ZScpOyB9XG4gICAgaWYgKGlzRmlyc3QpIHsgY2xhc3Nlcy5wdXNoKCdmaXJzdCcpOyB9XG4gICAgaWYgKGlzSG92ZXIpIHsgY2xhc3Nlcy5wdXNoKCdob3ZlcicpOyB9XG4gICAgaWYgKGl0ZW0uaXNHcm91cEhlYWRlcikgeyBjbGFzc2VzLnB1c2goJ2dyb3VwSGVhZGVyJyk7IH1cbiAgICBpZiAoaXRlbS5pc0dyb3VwSXRlbSkgeyBjbGFzc2VzLnB1c2goJ2dyb3VwSXRlbScpOyB9XG4gICAgaXRlbUNsYXNzZXMgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgLml0ZW0ge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBoZWlnaHQ6IHZhcigtLWhlaWdodCwgNDJweCk7XG4gICAgbGluZS1oZWlnaHQ6IHZhcigtLWhlaWdodCwgNDJweCk7XG4gICAgcGFkZGluZzogdmFyKC0taXRlbVBhZGRpbmcsIDAgMjBweCk7XG4gICAgY29sb3I6IHZhcigtLWl0ZW1Db2xvciwgaW5oZXJpdCk7XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB9XG5cbiAgLmdyb3VwSGVhZGVyIHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdmFyKC0tZ3JvdXBUaXRsZVRleHRUcmFuc2Zvcm0sIHVwcGVyY2FzZSk7XG4gIH1cblxuICAuZ3JvdXBJdGVtIHtcbiAgICBwYWRkaW5nLWxlZnQ6IHZhcigtLWdyb3VwSXRlbVBhZGRpbmdMZWZ0LCA0MHB4KTtcbiAgfVxuXG4gIC5pdGVtOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taXRlbUFjdGl2ZUJhY2tncm91bmQsICNiOWRhZmYpO1xuICB9XG5cbiAgLml0ZW0uYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pdGVtSXNBY3RpdmVCRywgIzAwN2FmZik7XG4gICAgY29sb3I6IHZhcigtLWl0ZW1Jc0FjdGl2ZUNvbG9yLCAjZmZmKTtcbiAgfVxuXG4gIC5pdGVtLmZpcnN0IHtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1pdGVtRmlyc3RCb3JkZXJSYWRpdXMsIDRweCA0cHggMCAwKTtcbiAgfVxuXG4gIC5pdGVtLmhvdmVyOm5vdCguYWN0aXZlKSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taXRlbUhvdmVyQkcsICNlN2YyZmYpO1xuICB9XG48L3N0eWxlPlxuXG5cblxuPGRpdiBjbGFzcz1cIml0ZW0ge2l0ZW1DbGFzc2VzfVwiPlxuICB7QGh0bWwgZ2V0T3B0aW9uTGFiZWwoaXRlbSwgZmlsdGVyVGV4dCl9XG48L2Rpdj5cbiIsIjxzY3JpcHQ+XG5cdGltcG9ydCB7IG9uTW91bnQsIHRpY2sgfSBmcm9tICdzdmVsdGUnO1xuXG5cdC8vIHByb3BzXG5cdGV4cG9ydCBsZXQgaXRlbXMgPSB1bmRlZmluZWQ7XG5cdGV4cG9ydCBsZXQgaGVpZ2h0ID0gJzEwMCUnO1xuXHRleHBvcnQgbGV0IGl0ZW1IZWlnaHQgPSA0MDtcblx0ZXhwb3J0IGxldCBob3Zlckl0ZW1JbmRleCA9IDA7XG5cblx0Ly8gcmVhZC1vbmx5LCBidXQgdmlzaWJsZSB0byBjb25zdW1lcnMgdmlhIGJpbmQ6c3RhcnRcblx0ZXhwb3J0IGxldCBzdGFydCA9IDA7XG5cdGV4cG9ydCBsZXQgZW5kID0gMDtcblxuXHQvLyBsb2NhbCBzdGF0ZVxuXHRsZXQgaGVpZ2h0X21hcCA9IFtdO1xuXHRsZXQgcm93cztcblx0bGV0IHZpZXdwb3J0O1xuXHRsZXQgY29udGVudHM7XG5cdGxldCB2aWV3cG9ydF9oZWlnaHQgPSAwO1xuXHRsZXQgdmlzaWJsZTtcblx0bGV0IG1vdW50ZWQ7XG5cblx0bGV0IHRvcCA9IDA7XG5cdGxldCBib3R0b20gPSAwO1xuXHRsZXQgYXZlcmFnZV9oZWlnaHQ7XG5cblx0JDogdmlzaWJsZSA9IGl0ZW1zLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcCgoZGF0YSwgaSkgPT4ge1xuXHRcdHJldHVybiB7IGluZGV4OiBpICsgc3RhcnQsIGRhdGEgfTtcblx0fSk7XG5cblx0Ly8gd2hlbmV2ZXIgYGl0ZW1zYCBjaGFuZ2VzLCBpbnZhbGlkYXRlIHRoZSBjdXJyZW50IGhlaWdodG1hcFxuXHQkOiBpZiAobW91bnRlZCkgcmVmcmVzaChpdGVtcywgdmlld3BvcnRfaGVpZ2h0LCBpdGVtSGVpZ2h0KTtcblxuXHRhc3luYyBmdW5jdGlvbiByZWZyZXNoKGl0ZW1zLCB2aWV3cG9ydF9oZWlnaHQsIGl0ZW1IZWlnaHQpIHtcblx0XHRjb25zdCB7IHNjcm9sbFRvcCB9ID0gdmlld3BvcnQ7XG5cblx0XHRhd2FpdCB0aWNrKCk7IC8vIHdhaXQgdW50aWwgdGhlIERPTSBpcyB1cCB0byBkYXRlXG5cblx0XHRsZXQgY29udGVudF9oZWlnaHQgPSB0b3AgLSBzY3JvbGxUb3A7XG5cdFx0bGV0IGkgPSBzdGFydDtcblxuXHRcdHdoaWxlIChjb250ZW50X2hlaWdodCA8IHZpZXdwb3J0X2hlaWdodCAmJiBpIDwgaXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRsZXQgcm93ID0gcm93c1tpIC0gc3RhcnRdO1xuXG5cdFx0XHRpZiAoIXJvdykge1xuXHRcdFx0XHRlbmQgPSBpICsgMTtcblx0XHRcdFx0YXdhaXQgdGljaygpOyAvLyByZW5kZXIgdGhlIG5ld2x5IHZpc2libGUgcm93XG5cdFx0XHRcdHJvdyA9IHJvd3NbaSAtIHN0YXJ0XTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgcm93X2hlaWdodCA9IGhlaWdodF9tYXBbaV0gPSBpdGVtSGVpZ2h0IHx8IHJvdy5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRjb250ZW50X2hlaWdodCArPSByb3dfaGVpZ2h0O1xuXHRcdFx0aSArPSAxO1xuXHRcdH1cblxuXHRcdGVuZCA9IGk7XG5cblx0XHRjb25zdCByZW1haW5pbmcgPSBpdGVtcy5sZW5ndGggLSBlbmQ7XG5cdFx0YXZlcmFnZV9oZWlnaHQgPSAodG9wICsgY29udGVudF9oZWlnaHQpIC8gZW5kO1xuXG5cdFx0Ym90dG9tID0gcmVtYWluaW5nICogYXZlcmFnZV9oZWlnaHQ7XG5cdFx0aGVpZ2h0X21hcC5sZW5ndGggPSBpdGVtcy5sZW5ndGg7XG5cblx0XHR2aWV3cG9ydC5zY3JvbGxUb3AgPSAwO1xuXHR9XG5cblx0YXN5bmMgZnVuY3Rpb24gaGFuZGxlX3Njcm9sbCgpIHtcblx0XHRjb25zdCB7IHNjcm9sbFRvcCB9ID0gdmlld3BvcnQ7XG5cblx0XHRjb25zdCBvbGRfc3RhcnQgPSBzdGFydDtcblxuXHRcdGZvciAobGV0IHYgPSAwOyB2IDwgcm93cy5sZW5ndGg7IHYgKz0gMSkge1xuXHRcdFx0aGVpZ2h0X21hcFtzdGFydCArIHZdID0gaXRlbUhlaWdodCB8fCByb3dzW3ZdLm9mZnNldEhlaWdodDtcblx0XHR9XG5cblx0XHRsZXQgaSA9IDA7XG5cdFx0bGV0IHkgPSAwO1xuXG5cdFx0d2hpbGUgKGkgPCBpdGVtcy5sZW5ndGgpIHtcblx0XHRcdGNvbnN0IHJvd19oZWlnaHQgPSBoZWlnaHRfbWFwW2ldIHx8IGF2ZXJhZ2VfaGVpZ2h0O1xuXHRcdFx0aWYgKHkgKyByb3dfaGVpZ2h0ID4gc2Nyb2xsVG9wKSB7XG5cdFx0XHRcdHN0YXJ0ID0gaTtcblx0XHRcdFx0dG9wID0geTtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0eSArPSByb3dfaGVpZ2h0O1xuXHRcdFx0aSArPSAxO1xuXHRcdH1cblxuXHRcdHdoaWxlIChpIDwgaXRlbXMubGVuZ3RoKSB7XG5cdFx0XHR5ICs9IGhlaWdodF9tYXBbaV0gfHwgYXZlcmFnZV9oZWlnaHQ7XG5cdFx0XHRpICs9IDE7XG5cblx0XHRcdGlmICh5ID4gc2Nyb2xsVG9wICsgdmlld3BvcnRfaGVpZ2h0KSBicmVhaztcblx0XHR9XG5cblx0XHRlbmQgPSBpO1xuXG5cdFx0Y29uc3QgcmVtYWluaW5nID0gaXRlbXMubGVuZ3RoIC0gZW5kO1xuXHRcdGF2ZXJhZ2VfaGVpZ2h0ID0geSAvIGVuZDtcblxuXHRcdHdoaWxlIChpIDwgaXRlbXMubGVuZ3RoKSBoZWlnaHRfbWFwW2krK10gPSBhdmVyYWdlX2hlaWdodDtcblx0XHRib3R0b20gPSByZW1haW5pbmcgKiBhdmVyYWdlX2hlaWdodDtcblxuXHRcdC8vIHByZXZlbnQganVtcGluZyBpZiB3ZSBzY3JvbGxlZCB1cCBpbnRvIHVua25vd24gdGVycml0b3J5XG5cdFx0aWYgKHN0YXJ0IDwgb2xkX3N0YXJ0KSB7XG5cdFx0XHRhd2FpdCB0aWNrKCk7XG5cblx0XHRcdGxldCBleHBlY3RlZF9oZWlnaHQgPSAwO1xuXHRcdFx0bGV0IGFjdHVhbF9oZWlnaHQgPSAwO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBvbGRfc3RhcnQ7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAocm93c1tpIC0gc3RhcnRdKSB7XG5cdFx0XHRcdFx0ZXhwZWN0ZWRfaGVpZ2h0ICs9IGhlaWdodF9tYXBbaV07XG5cdFx0XHRcdFx0YWN0dWFsX2hlaWdodCArPSBpdGVtSGVpZ2h0IHx8IHJvd3NbaSAtIHN0YXJ0XS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZCA9IGFjdHVhbF9oZWlnaHQgLSBleHBlY3RlZF9oZWlnaHQ7XG5cdFx0XHR2aWV3cG9ydC5zY3JvbGxUbygwLCBzY3JvbGxUb3AgKyBkKTtcblx0XHR9XG5cblx0XHQvLyBUT0RPIGlmIHdlIG92ZXJlc3RpbWF0ZWQgdGhlIHNwYWNlIHRoZXNlXG5cdFx0Ly8gcm93cyB3b3VsZCBvY2N1cHkgd2UgbWF5IG5lZWQgdG8gYWRkIHNvbWVcblx0XHQvLyBtb3JlLiBtYXliZSB3ZSBjYW4ganVzdCBjYWxsIGhhbmRsZV9zY3JvbGwgYWdhaW4/XG5cdH1cblxuXHQvLyB0cmlnZ2VyIGluaXRpYWwgcmVmcmVzaFxuXHRvbk1vdW50KCgpID0+IHtcblx0XHRyb3dzID0gY29udGVudHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N2ZWx0ZS12aXJ0dWFsLWxpc3Qtcm93Jyk7XG5cdFx0bW91bnRlZCA9IHRydWU7XG5cdH0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblx0c3ZlbHRlLXZpcnR1YWwtbGlzdC12aWV3cG9ydCB7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdG92ZXJmbG93LXk6IGF1dG87XG5cdFx0LXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHR9XG5cblx0c3ZlbHRlLXZpcnR1YWwtbGlzdC1jb250ZW50cyxcblx0c3ZlbHRlLXZpcnR1YWwtbGlzdC1yb3cge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHR9XG5cblx0c3ZlbHRlLXZpcnR1YWwtbGlzdC1yb3cge1xuXHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGUtdmlydHVhbC1saXN0LXZpZXdwb3J0IGJpbmQ6dGhpcz17dmlld3BvcnR9IGJpbmQ6b2Zmc2V0SGVpZ2h0PXt2aWV3cG9ydF9oZWlnaHR9IG9uOnNjcm9sbD17aGFuZGxlX3Njcm9sbH1cblx0c3R5bGU9XCJoZWlnaHQ6IHtoZWlnaHR9O1wiPlxuXHQ8c3ZlbHRlLXZpcnR1YWwtbGlzdC1jb250ZW50cyBiaW5kOnRoaXM9e2NvbnRlbnRzfSBzdHlsZT1cInBhZGRpbmctdG9wOiB7dG9wfXB4OyBwYWRkaW5nLWJvdHRvbToge2JvdHRvbX1weDtcIj5cblx0XHR7I2VhY2ggdmlzaWJsZSBhcyByb3cgKHJvdy5pbmRleCl9XG5cdFx0XHQ8c3ZlbHRlLXZpcnR1YWwtbGlzdC1yb3c+XG5cdFx0XHRcdDxzbG90IGl0ZW09e3Jvdy5kYXRhfSBpPXtyb3cuaW5kZXh9IHtob3Zlckl0ZW1JbmRleH0+TWlzc2luZyB0ZW1wbGF0ZTwvc2xvdD5cblx0XHRcdDwvc3ZlbHRlLXZpcnR1YWwtbGlzdC1yb3c+XG5cdFx0ey9lYWNofVxuXHQ8L3N2ZWx0ZS12aXJ0dWFsLWxpc3QtY29udGVudHM+XG48L3N2ZWx0ZS12aXJ0dWFsLWxpc3Qtdmlld3BvcnQ+IiwiPHNjcmlwdD5cbiAgaW1wb3J0IHsgYmVmb3JlVXBkYXRlLCBjcmVhdGVFdmVudERpc3BhdGNoZXIsIG9uRGVzdHJveSwgb25Nb3VudCwgdGljayB9IGZyb20gJ3N2ZWx0ZSc7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcblxuICBleHBvcnQgbGV0IGNvbnRhaW5lciA9IHVuZGVmaW5lZDtcblxuICBpbXBvcnQgSXRlbUNvbXBvbmVudCBmcm9tICcuL0l0ZW0uc3ZlbHRlJztcbiAgaW1wb3J0IFZpcnR1YWxMaXN0IGZyb20gJy4vVmlydHVhbExpc3Quc3ZlbHRlJztcblxuICBleHBvcnQgbGV0IEl0ZW0gPSBJdGVtQ29tcG9uZW50O1xuICBleHBvcnQgbGV0IGlzVmlydHVhbExpc3QgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBpdGVtcyA9IFtdO1xuICBleHBvcnQgbGV0IGdldE9wdGlvbkxhYmVsID0gKG9wdGlvbiwgZmlsdGVyVGV4dCkgPT4ge1xuICAgIGlmIChvcHRpb24pIHJldHVybiBvcHRpb24uaXNDcmVhdG9yID8gYENyZWF0ZSBcXFwiJHtmaWx0ZXJUZXh0fVxcXCJgIDogb3B0aW9uLmxhYmVsO1xuICB9O1xuICBleHBvcnQgbGV0IGdldEdyb3VwSGVhZGVyTGFiZWwgPSAob3B0aW9uKSA9PiB7IHJldHVybiBvcHRpb24ubGFiZWwgfTtcbiAgZXhwb3J0IGxldCBpdGVtSGVpZ2h0ID0gNDA7XG4gIGV4cG9ydCBsZXQgaG92ZXJJdGVtSW5kZXggPSAwO1xuICBleHBvcnQgbGV0IHNlbGVjdGVkVmFsdWUgPSB1bmRlZmluZWQ7XG4gIGV4cG9ydCBsZXQgb3B0aW9uSWRlbnRpZmllciA9ICd2YWx1ZSc7XG4gIGV4cG9ydCBsZXQgaGlkZUVtcHR5U3RhdGUgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBub09wdGlvbnNNZXNzYWdlID0gJ05vIG9wdGlvbnMnO1xuICBleHBvcnQgbGV0IGlzTXVsdGkgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBhY3RpdmVJdGVtSW5kZXggPSAwO1xuICBleHBvcnQgbGV0IGZpbHRlclRleHQgPSAnJztcblxuICBsZXQgaXNTY3JvbGxpbmdUaW1lciA9IDA7XG4gIGxldCBpc1Njcm9sbGluZyA9IGZhbHNlO1xuICBsZXQgcHJldl9pdGVtcztcbiAgbGV0IHByZXZfYWN0aXZlSXRlbUluZGV4O1xuICBsZXQgcHJldl9zZWxlY3RlZFZhbHVlO1xuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGlmIChpdGVtcy5sZW5ndGggPiAwICYmICFpc011bHRpICYmIHNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIGNvbnN0IF9ob3Zlckl0ZW1JbmRleCA9IGl0ZW1zLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbVtvcHRpb25JZGVudGlmaWVyXSA9PT0gc2VsZWN0ZWRWYWx1ZVtvcHRpb25JZGVudGlmaWVyXSk7XG5cbiAgICAgIGlmIChfaG92ZXJJdGVtSW5kZXgpIHtcbiAgICAgICAgaG92ZXJJdGVtSW5kZXggPSBfaG92ZXJJdGVtSW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsVG9BY3RpdmVJdGVtKCdhY3RpdmUnKTtcblxuXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChpc1Njcm9sbGluZ1RpbWVyKTtcblxuICAgICAgaXNTY3JvbGxpbmdUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgfSwgMTAwKTtcbiAgICB9LCBmYWxzZSk7XG4gIH0pO1xuXG4gIG9uRGVzdHJveSgoKSA9PiB7XG4gICAgLy8gY2xlYXJUaW1lb3V0KGlzU2Nyb2xsaW5nVGltZXIpO1xuICB9KTtcblxuICBiZWZvcmVVcGRhdGUoKCkgPT4ge1xuXG4gICAgaWYgKGl0ZW1zICE9PSBwcmV2X2l0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGhvdmVySXRlbUluZGV4ID0gMDtcbiAgICB9XG5cblxuICAgIC8vIGlmIChwcmV2X2FjdGl2ZUl0ZW1JbmRleCAmJiBhY3RpdmVJdGVtSW5kZXggPiAtMSkge1xuICAgIC8vICAgaG92ZXJJdGVtSW5kZXggPSBhY3RpdmVJdGVtSW5kZXg7XG5cbiAgICAvLyAgIHNjcm9sbFRvQWN0aXZlSXRlbSgnYWN0aXZlJyk7XG4gICAgLy8gfVxuICAgIC8vIGlmIChwcmV2X3NlbGVjdGVkVmFsdWUgJiYgc2VsZWN0ZWRWYWx1ZSkge1xuICAgIC8vICAgc2Nyb2xsVG9BY3RpdmVJdGVtKCdhY3RpdmUnKTtcblxuICAgIC8vICAgaWYgKGl0ZW1zICYmICFpc011bHRpKSB7XG4gICAgLy8gICAgIGNvbnN0IGhvdmVySXRlbUluZGV4ID0gaXRlbXMuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtW29wdGlvbklkZW50aWZpZXJdID09PSBzZWxlY3RlZFZhbHVlW29wdGlvbklkZW50aWZpZXJdKTtcblxuICAgIC8vICAgICBpZiAoaG92ZXJJdGVtSW5kZXgpIHtcbiAgICAvLyAgICAgICBob3Zlckl0ZW1JbmRleCA9IGhvdmVySXRlbUluZGV4O1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfVxuXG4gICAgcHJldl9pdGVtcyA9IGl0ZW1zO1xuICAgIHByZXZfYWN0aXZlSXRlbUluZGV4ID0gYWN0aXZlSXRlbUluZGV4O1xuICAgIHByZXZfc2VsZWN0ZWRWYWx1ZSA9IHNlbGVjdGVkVmFsdWU7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGl0ZW1DbGFzc2VzKGhvdmVySXRlbUluZGV4LCBpdGVtLCBpdGVtSW5kZXgsIGl0ZW1zLCBzZWxlY3RlZFZhbHVlLCBvcHRpb25JZGVudGlmaWVyLCBpc011bHRpKSB7XG4gICAgcmV0dXJuIGAke3NlbGVjdGVkVmFsdWUgJiYgIWlzTXVsdGkgJiYgKHNlbGVjdGVkVmFsdWVbb3B0aW9uSWRlbnRpZmllcl0gPT09IGl0ZW1bb3B0aW9uSWRlbnRpZmllcl0pID8gJ2FjdGl2ZSAnIDogJyd9JHtob3Zlckl0ZW1JbmRleCA9PT0gaXRlbUluZGV4IHx8IGl0ZW1zLmxlbmd0aCA9PT0gMSA/ICdob3ZlcicgOiAnJ31gO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0KGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5pc0NyZWF0b3IpIHJldHVybjtcbiAgICBkaXNwYXRjaCgnaXRlbVNlbGVjdGVkJywgaXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVIb3ZlcihpKSB7XG4gICAgaWYgKGlzU2Nyb2xsaW5nKSByZXR1cm47XG4gICAgaG92ZXJJdGVtSW5kZXggPSBpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soYXJncykge1xuICAgIGNvbnN0IHsgaXRlbSwgaSwgZXZlbnQgfSA9IGFyZ3M7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoc2VsZWN0ZWRWYWx1ZSAmJiAhaXNNdWx0aSAmJiBzZWxlY3RlZFZhbHVlW29wdGlvbklkZW50aWZpZXJdID09PSBpdGVtW29wdGlvbklkZW50aWZpZXJdKSByZXR1cm4gY2xvc2VMaXN0KCk7XG5cbiAgICBpZiAoaXRlbS5pc0NyZWF0b3IpIHtcbiAgICAgIGRpc3BhdGNoKCdpdGVtQ3JlYXRlZCcsIGZpbHRlclRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVJdGVtSW5kZXggPSBpO1xuICAgICAgaG92ZXJJdGVtSW5kZXggPSBpO1xuICAgICAgaGFuZGxlU2VsZWN0KGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlTGlzdCgpIHtcbiAgICBkaXNwYXRjaCgnY2xvc2VMaXN0Jyk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiB1cGRhdGVIb3Zlckl0ZW0oaW5jcmVtZW50KSB7XG4gICAgaWYgKGlzVmlydHVhbExpc3QpIHJldHVybjtcblxuICAgIGxldCBpc05vblNlbGVjdGFibGVJdGVtID0gdHJ1ZTtcblxuICAgIHdoaWxlIChpc05vblNlbGVjdGFibGVJdGVtKSB7XG4gICAgICBpZiAoaW5jcmVtZW50ID4gMCAmJiBob3Zlckl0ZW1JbmRleCA9PT0gKGl0ZW1zLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgIGhvdmVySXRlbUluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGluY3JlbWVudCA8IDAgJiYgaG92ZXJJdGVtSW5kZXggPT09IDApIHtcbiAgICAgICAgaG92ZXJJdGVtSW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGhvdmVySXRlbUluZGV4ID0gaG92ZXJJdGVtSW5kZXggKyBpbmNyZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIGlzTm9uU2VsZWN0YWJsZUl0ZW0gPSBpdGVtc1tob3Zlckl0ZW1JbmRleF0uaXNHcm91cEhlYWRlciAmJiAhaXRlbXNbaG92ZXJJdGVtSW5kZXhdLmlzU2VsZWN0YWJsZTtcbiAgICB9XG5cbiAgICBhd2FpdCB0aWNrKCk7XG5cbiAgICBzY3JvbGxUb0FjdGl2ZUl0ZW0oJ2hvdmVyJyk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGl0ZW1zLmxlbmd0aCAmJiB1cGRhdGVIb3Zlckl0ZW0oMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaXRlbXMubGVuZ3RoICYmIHVwZGF0ZUhvdmVySXRlbSgtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICBjb25zdCBob3Zlckl0ZW0gPSBpdGVtc1tob3Zlckl0ZW1JbmRleF07XG4gICAgICAgIGlmIChzZWxlY3RlZFZhbHVlICYmICFpc011bHRpICYmIHNlbGVjdGVkVmFsdWVbb3B0aW9uSWRlbnRpZmllcl0gPT09IGhvdmVySXRlbVtvcHRpb25JZGVudGlmaWVyXSkge1xuICAgICAgICAgIGNsb3NlTGlzdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvdmVySXRlbS5pc0NyZWF0b3IpIHtcbiAgICAgICAgICBkaXNwYXRjaCgnaXRlbUNyZWF0ZWQnLCBmaWx0ZXJUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVJdGVtSW5kZXggPSBob3Zlckl0ZW1JbmRleDtcbiAgICAgICAgICBoYW5kbGVTZWxlY3QoaXRlbXNbaG92ZXJJdGVtSW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgIGlmIChzZWxlY3RlZFZhbHVlICYmIHNlbGVjdGVkVmFsdWVbb3B0aW9uSWRlbnRpZmllcl0gPT09IGl0ZW1zW2hvdmVySXRlbUluZGV4XVtvcHRpb25JZGVudGlmaWVyXSkgcmV0dXJuIGNsb3NlTGlzdCgpO1xuICAgICAgICBhY3RpdmVJdGVtSW5kZXggPSBob3Zlckl0ZW1JbmRleDtcbiAgICAgICAgaGFuZGxlU2VsZWN0KGl0ZW1zW2hvdmVySXRlbUluZGV4XSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvQWN0aXZlSXRlbShjbGFzc05hbWUpIHtcbiAgICBpZiAoaXNWaXJ0dWFsTGlzdCB8fCAhY29udGFpbmVyKSByZXR1cm47XG5cbiAgICBsZXQgb2Zmc2V0Qm91bmRpbmc7XG4gICAgY29uc3QgZm9jdXNlZEVsZW1Cb3VuZGluZyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAubGlzdEl0ZW0gLiR7Y2xhc3NOYW1lfWApO1xuXG4gICAgaWYgKGZvY3VzZWRFbGVtQm91bmRpbmcpIHtcbiAgICAgIG9mZnNldEJvdW5kaW5nID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSAtIGZvY3VzZWRFbGVtQm91bmRpbmcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tO1xuICAgIH1cblxuICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgLT0gb2Zmc2V0Qm91bmRpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpc0l0ZW1BY3RpdmUoaXRlbSwgc2VsZWN0ZWRWYWx1ZSwgb3B0aW9uSWRlbnRpZmllcikge1xuICAgIHJldHVybiBzZWxlY3RlZFZhbHVlICYmIChzZWxlY3RlZFZhbHVlW29wdGlvbklkZW50aWZpZXJdID09PSBpdGVtW29wdGlvbklkZW50aWZpZXJdKTtcbiAgfTtcblxuICBmdW5jdGlvbiBpc0l0ZW1GaXJzdChpdGVtSW5kZXgpIHtcbiAgICByZXR1cm4gaXRlbUluZGV4ID09PSAwO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzSXRlbUhvdmVyKGhvdmVySXRlbUluZGV4LCBpdGVtLCBpdGVtSW5kZXgsIGl0ZW1zKSB7XG4gICAgcmV0dXJuIGhvdmVySXRlbUluZGV4ID09PSBpdGVtSW5kZXggfHwgaXRlbXMubGVuZ3RoID09PSAxO1xuICB9XG5cbjwvc2NyaXB0PlxuXG48c3ZlbHRlOndpbmRvdyBvbjprZXlkb3duPVwie2hhbmRsZUtleURvd259XCIgLz5cblxueyNpZiBpc1ZpcnR1YWxMaXN0fVxuPGRpdiBjbGFzcz1cImxpc3RDb250YWluZXIgdmlydHVhbExpc3RcIiBiaW5kOnRoaXM9e2NvbnRhaW5lcn0+XG5cbiAgPFZpcnR1YWxMaXN0IHtpdGVtc30ge2l0ZW1IZWlnaHR9IGxldDppdGVtIGxldDppPlxuICBcbiAgICA8ZGl2IG9uOm1vdXNlb3Zlcj1cInsoKSA9PiBoYW5kbGVIb3ZlcihpKX1cIiBvbjpjbGljaz1cIntldmVudCA9PiBoYW5kbGVDbGljayh7aXRlbSwgaSwgZXZlbnR9KX1cIlxuICAgICAgICBjbGFzcz1cImxpc3RJdGVtXCI+XG4gICAgICAgICAgPHN2ZWx0ZTpjb21wb25lbnQgXG4gICAgICAgICAgICB0aGlzPVwie0l0ZW19XCJcbiAgICAgICAgICAgIHtpdGVtfVxuICAgICAgICAgICAge2ZpbHRlclRleHR9XG4gICAgICAgICAgICB7Z2V0T3B0aW9uTGFiZWx9XG4gICAgICAgICAgICBpc0ZpcnN0PVwie2lzSXRlbUZpcnN0KGkpfVwiXG4gICAgICAgICAgICBpc0FjdGl2ZT1cIntpc0l0ZW1BY3RpdmUoaXRlbSwgc2VsZWN0ZWRWYWx1ZSwgb3B0aW9uSWRlbnRpZmllcil9XCJcbiAgICAgICAgICAgIGlzSG92ZXI9XCJ7aXNJdGVtSG92ZXIoaG92ZXJJdGVtSW5kZXgsIGl0ZW0sIGksIGl0ZW1zKX1cIlxuICAgICAgICAgIC8+XG4gICAgPC9kaXY+XG4gIFxuPC9WaXJ0dWFsTGlzdD5cbjwvZGl2Plxuey9pZn1cblxueyNpZiAhaXNWaXJ0dWFsTGlzdH1cbjxkaXYgY2xhc3M9XCJsaXN0Q29udGFpbmVyXCIgYmluZDp0aGlzPXtjb250YWluZXJ9PlxuICB7I2VhY2ggaXRlbXMgYXMgaXRlbSwgaX1cbiAgICB7I2lmIGl0ZW0uaXNHcm91cEhlYWRlciAmJiAhaXRlbS5pc1NlbGVjdGFibGV9XG4gICAgICA8ZGl2IGNsYXNzPVwibGlzdEdyb3VwVGl0bGVcIj57Z2V0R3JvdXBIZWFkZXJMYWJlbChpdGVtKX08L2Rpdj5cbiAgICB7IDplbHNlIH1cbiAgICA8ZGl2IFxuICAgICAgb246bW91c2VvdmVyPVwieygpID0+IGhhbmRsZUhvdmVyKGkpfVwiIFxuICAgICAgb246Y2xpY2s9XCJ7ZXZlbnQgPT4gaGFuZGxlQ2xpY2soe2l0ZW0sIGksIGV2ZW50fSl9XCJcbiAgICAgIGNsYXNzPVwibGlzdEl0ZW1cIlxuICAgID5cbiAgICAgIDxzdmVsdGU6Y29tcG9uZW50IFxuICAgICAgICB0aGlzPVwie0l0ZW19XCJcbiAgICAgICAge2l0ZW19XG4gICAgICAgIHtmaWx0ZXJUZXh0fVxuICAgICAgICB7Z2V0T3B0aW9uTGFiZWx9XG4gICAgICAgIGlzRmlyc3Q9XCJ7aXNJdGVtRmlyc3QoaSl9XCJcbiAgICAgICAgaXNBY3RpdmU9XCJ7aXNJdGVtQWN0aXZlKGl0ZW0sIHNlbGVjdGVkVmFsdWUsIG9wdGlvbklkZW50aWZpZXIpfVwiXG4gICAgICAgIGlzSG92ZXI9XCJ7aXNJdGVtSG92ZXIoaG92ZXJJdGVtSW5kZXgsIGl0ZW0sIGksIGl0ZW1zKX1cIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgICB7L2lmfVxuICB7OmVsc2V9XG4gICAgeyNpZiAhaGlkZUVtcHR5U3RhdGV9XG4gICAgICA8ZGl2IGNsYXNzPVwiZW1wdHlcIj57bm9PcHRpb25zTWVzc2FnZX08L2Rpdj5cbiAgICB7L2lmfVxuICB7L2VhY2h9XG48L2Rpdj5cbnsvaWZ9XG5cbjxzdHlsZT5cbiAgLmxpc3RDb250YWluZXIge1xuICAgIGJveC1zaGFkb3c6IHZhcigtLWxpc3RTaGFkb3csIDAgMnB4IDNweCAwIHJnYmEoNDQsIDYyLCA4MCwgMC4yNCkpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWxpc3RCb3JkZXJSYWRpdXMsIDRweCk7XG4gICAgbWF4LWhlaWdodDogdmFyKC0tbGlzdE1heEhlaWdodCwgMjUwcHgpO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgYmFja2dyb3VuZDogdmFyKC0tbGlzdEJhY2tncm91bmQsICNmZmYpO1xuICB9XG5cbiAgLnZpcnR1YWxMaXN0IHtcbiAgICBoZWlnaHQ6IHZhcigtLXZpcnR1YWxMaXN0SGVpZ2h0LCAyMDBweCk7XG4gIH1cblxuICAubGlzdEdyb3VwVGl0bGUge1xuICAgIGNvbG9yOiB2YXIoLS1ncm91cFRpdGxlQ29sb3IsICM4ZjhmOGYpO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBmb250LXNpemU6IHZhcigtLWdyb3VwVGl0bGVGb250U2l6ZSwgMTJweCk7XG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLWdyb3VwVGl0bGVGb250V2VpZ2h0LCA2MDApO1xuICAgIGhlaWdodDogdmFyKC0taGVpZ2h0LCA0MnB4KTtcbiAgICBsaW5lLWhlaWdodDogdmFyKC0taGVpZ2h0LCA0MnB4KTtcbiAgICBwYWRkaW5nOiB2YXIoLS1ncm91cFRpdGxlUGFkZGluZywgMCAyMHB4KTtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdmFyKC0tZ3JvdXBUaXRsZVRleHRUcmFuc2Zvcm0sIHVwcGVyY2FzZSk7XG4gIH1cblxuICAuZW1wdHkge1xuICAgIHRleHQtYWxpZ246IHZhcigtLWxpc3RFbXB0eVRleHRBbGlnbiwgY2VudGVyKTtcbiAgICBwYWRkaW5nOiB2YXIoLS1saXN0RW1wdHlQYWRkaW5nLCAyMHB4IDApO1xuICAgIGNvbG9yOiB2YXIoLS1saXN0RW1wdHlDb2xvciwgIzc4ODQ4Rik7XG4gIH1cbjwvc3R5bGU+XG4iLCI8c2NyaXB0PlxuICBleHBvcnQgbGV0IGdldFNlbGVjdGlvbkxhYmVsID0gdW5kZWZpbmVkO1xuICBleHBvcnQgbGV0IGl0ZW0gPSB1bmRlZmluZWQ7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAuc2VsZWN0aW9uIHtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cInNlbGVjdGlvblwiPlxuICB7QGh0bWwgZ2V0U2VsZWN0aW9uTGFiZWwoaXRlbSl9IFxuPC9kaXY+XG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgeyBjcmVhdGVFdmVudERpc3BhdGNoZXIgfSBmcm9tICdzdmVsdGUnO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XG5cbiAgZXhwb3J0IGxldCBzZWxlY3RlZFZhbHVlID0gW107XG4gIGV4cG9ydCBsZXQgYWN0aXZlU2VsZWN0ZWRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgZXhwb3J0IGxldCBpc0Rpc2FibGVkID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgZ2V0U2VsZWN0aW9uTGFiZWwgPSB1bmRlZmluZWQ7XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2xlYXIoaSwgZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBkaXNwYXRjaCgnbXVsdGlJdGVtQ2xlYXInLCB7aX0pO1xuICB9XG48L3NjcmlwdD5cblxueyNlYWNoIHNlbGVjdGVkVmFsdWUgYXMgdmFsdWUsIGl9XG48ZGl2IGNsYXNzPVwibXVsdGlTZWxlY3RJdGVtIHthY3RpdmVTZWxlY3RlZFZhbHVlID09PSBpID8gJ2FjdGl2ZScgOiAnJ30ge2lzRGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJyd9XCI+XG4gIDxkaXYgY2xhc3M9XCJtdWx0aVNlbGVjdEl0ZW1fbGFiZWxcIj5cbiAgICB7QGh0bWwgZ2V0U2VsZWN0aW9uTGFiZWwodmFsdWUpfVxuICA8L2Rpdj5cbiAgeyNpZiAhaXNEaXNhYmxlZH1cbiAgPGRpdiBjbGFzcz1cIm11bHRpU2VsZWN0SXRlbV9jbGVhclwiIG9uOmNsaWNrPVwie2V2ZW50ID0+IGhhbmRsZUNsZWFyKGksIGV2ZW50KX1cIj5cbiAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiLTIgLTIgNTAgNTBcIiBmb2N1c2FibGU9XCJmYWxzZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNMzQuOTIzLDM3LjI1MUwyNCwyNi4zMjhMMTMuMDc3LDM3LjI1MUw5LjQzNiwzMy42MWwxMC45MjMtMTAuOTIzTDkuNDM2LDExLjc2NWwzLjY0MS0zLjY0MUwyNCwxOS4wNDdMMzQuOTIzLDguMTI0IGwzLjY0MSwzLjY0MUwyNy42NDEsMjIuNjg4TDM4LjU2NCwzMy42MUwzNC45MjMsMzcuMjUxelwiPjwvcGF0aD5cbiAgICA8L3N2Zz5cbiAgPC9kaXY+XG4gIHsvaWZ9XG48L2Rpdj5cbnsvZWFjaH1cblxuXG5cbjxzdHlsZT5cbiAgLm11bHRpU2VsZWN0SXRlbSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tbXVsdGlJdGVtQkcsICNFQkVERUYpO1xuICAgIG1hcmdpbjogdmFyKC0tbXVsdGlJdGVtTWFyZ2luLCA1cHggNXB4IDAgMCk7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tbXVsdGlJdGVtQm9yZGVyUmFkaXVzLCAxNnB4KTtcbiAgICBoZWlnaHQ6IHZhcigtLW11bHRpSXRlbUhlaWdodCwgMzJweCk7XG4gICAgbGluZS1oZWlnaHQ6IHZhcigtLW11bHRpSXRlbUhlaWdodCwgMzJweCk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgcGFkZGluZzogdmFyKC0tbXVsdGlJdGVtUGFkZGluZywgMCAxMHB4IDAgMTVweCk7XG4gIH1cblxuICAubXVsdGlTZWxlY3RJdGVtX2xhYmVsIHtcbiAgICBtYXJnaW46IHZhcigtLW11bHRpTGFiZWxNYXJnaW4sIDAgNXB4IDAgMCk7XG4gIH1cblxuICAubXVsdGlTZWxlY3RJdGVtOmhvdmVyLFxuICAubXVsdGlTZWxlY3RJdGVtLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbXVsdGlJdGVtQWN0aXZlQkcsICMwMDZGRkYpO1xuICAgIGNvbG9yOiB2YXIoLS1tdWx0aUl0ZW1BY3RpdmVDb2xvciwgI2ZmZik7XG4gIH1cblxuICAubXVsdGlTZWxlY3RJdGVtLmRpc2FibGVkOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1tdWx0aUl0ZW1EaXNhYmxlZEhvdmVyQmcsICNFQkVERUYpO1xuICAgIGNvbG9yOiB2YXIoLS1tdWx0aUl0ZW1EaXNhYmxlZEhvdmVyQ29sb3IsICNDMUM2Q0MpO1xuICB9XG5cbiAgLm11bHRpU2VsZWN0SXRlbV9jbGVhciB7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tbXVsdGlDbGVhclJhZGl1cywgNTAlKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1tdWx0aUNsZWFyQkcsICM1MjYxNkYpO1xuICAgIHdpZHRoOiB2YXIoLS1tdWx0aUNsZWFyV2lkdGgsIDE2cHgpO1xuICAgIGhlaWdodDogdmFyKC0tbXVsdGlDbGVhckhlaWdodCwgMTZweCk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogdmFyKC0tbXVsdGlDbGVhclRvcCwgOHB4KTtcbiAgICB0ZXh0LWFsaWduOiB2YXIoLS1tdWx0aUNsZWFyVGV4dEFsaWduLCBjZW50ZXIpO1xuICAgIHBhZGRpbmc6IHZhcigtLW11bHRpQ2xlYXJQYWRkaW5nLCAxcHgpO1xuICB9XG5cbiAgLm11bHRpU2VsZWN0SXRlbV9jbGVhcjpob3ZlcixcbiAgLmFjdGl2ZSAubXVsdGlTZWxlY3RJdGVtX2NsZWFyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1tdWx0aUNsZWFySG92ZXJCRywgI2ZmZik7XG4gIH1cblxuICAubXVsdGlTZWxlY3RJdGVtX2NsZWFyOmhvdmVyIHN2ZyxcbiAgLmFjdGl2ZSAubXVsdGlTZWxlY3RJdGVtX2NsZWFyIHN2ZyB7XG4gICAgZmlsbDogdmFyKC0tbXVsdGlDbGVhckhvdmVyRmlsbCwgIzAwNkZGRik7XG4gIH1cblxuICAubXVsdGlTZWxlY3RJdGVtX2NsZWFyIHN2ZyB7XG4gICAgZmlsbDogdmFyKC0tbXVsdGlDbGVhckZpbGwsICNFQkVERUYpO1xuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIH1cbjwvc3R5bGU+XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbGVtKSB7XG4gIGNvbnN0IGJvdW5kaW5nID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3Qgb3V0ID0ge307XG5cbiAgb3V0LnRvcCA9IGJvdW5kaW5nLnRvcCA8IDA7XG4gIG91dC5sZWZ0ID0gYm91bmRpbmcubGVmdCA8IDA7XG4gIG91dC5ib3R0b20gPSBib3VuZGluZy5ib3R0b20gPiAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICBvdXQucmlnaHQgPSBib3VuZGluZy5yaWdodCA+ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpO1xuICBvdXQuYW55ID0gb3V0LnRvcCB8fCBvdXQubGVmdCB8fCBvdXQuYm90dG9tIHx8IG91dC5yaWdodDtcblxuICByZXR1cm4gb3V0O1xufTtcblxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gIGxldCB0aW1lb3V0O1xuXG4gIHJldHVybiBmdW5jdGlvbiBleGVjdXRlZEZ1bmN0aW9uKCkge1xuICAgIGxldCBjb250ZXh0ID0gdGhpcztcbiAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcblx0ICAgIFxuICAgIGxldCBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xuXG4gICAgbGV0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG5cdFxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XG4gICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gIH07XG59O1xuIiwiPHNjcmlwdD5cbiAgaW1wb3J0IHtcbiAgICBiZWZvcmVVcGRhdGUsXG4gICAgY3JlYXRlRXZlbnREaXNwYXRjaGVyLFxuICAgIG9uRGVzdHJveSxcbiAgICBvbk1vdW50LFxuICAgIHRpY2tcbiAgfSBmcm9tIFwic3ZlbHRlXCI7XG4gIGltcG9ydCBMaXN0IGZyb20gXCIuL0xpc3Quc3ZlbHRlXCI7XG4gIGltcG9ydCBJdGVtQ29tcG9uZW50IGZyb20gXCIuL0l0ZW0uc3ZlbHRlXCI7XG4gIGltcG9ydCBTZWxlY3Rpb25Db21wb25lbnQgZnJvbSBcIi4vU2VsZWN0aW9uLnN2ZWx0ZVwiO1xuICBpbXBvcnQgTXVsdGlTZWxlY3Rpb25Db21wb25lbnQgZnJvbSBcIi4vTXVsdGlTZWxlY3Rpb24uc3ZlbHRlXCI7XG4gIGltcG9ydCBpc091dE9mVmlld3BvcnQgZnJvbSBcIi4vdXRpbHMvaXNPdXRPZlZpZXdwb3J0XCI7XG4gIGltcG9ydCBkZWJvdW5jZSBmcm9tIFwiLi91dGlscy9kZWJvdW5jZVwiO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XG4gIGV4cG9ydCBsZXQgY29udGFpbmVyID0gdW5kZWZpbmVkO1xuICBleHBvcnQgbGV0IGlucHV0ID0gdW5kZWZpbmVkO1xuICBleHBvcnQgbGV0IEl0ZW0gPSBJdGVtQ29tcG9uZW50O1xuICBleHBvcnQgbGV0IFNlbGVjdGlvbiA9IFNlbGVjdGlvbkNvbXBvbmVudDtcbiAgZXhwb3J0IGxldCBNdWx0aVNlbGVjdGlvbiA9IE11bHRpU2VsZWN0aW9uQ29tcG9uZW50O1xuICBleHBvcnQgbGV0IGlzTXVsdGkgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBpc0Rpc2FibGVkID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgaXNDcmVhdGFibGUgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBpc0ZvY3VzZWQgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBzZWxlY3RlZFZhbHVlID0gdW5kZWZpbmVkO1xuICBleHBvcnQgbGV0IGZpbHRlclRleHQgPSBcIlwiO1xuICBleHBvcnQgbGV0IHBsYWNlaG9sZGVyID0gXCJTZWxlY3QuLi5cIjtcbiAgZXhwb3J0IGxldCBpdGVtcyA9IFtdO1xuICBleHBvcnQgbGV0IGl0ZW1GaWx0ZXIgPSAobGFiZWwsIGZpbHRlclRleHQsIG9wdGlvbikgPT5cbiAgICBsYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclRleHQudG9Mb3dlckNhc2UoKSk7XG4gIGV4cG9ydCBsZXQgZ3JvdXBCeSA9IHVuZGVmaW5lZDtcbiAgZXhwb3J0IGxldCBncm91cEZpbHRlciA9IGdyb3VwcyA9PiBncm91cHM7XG4gIGV4cG9ydCBsZXQgaXNHcm91cEhlYWRlclNlbGVjdGFibGUgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBnZXRHcm91cEhlYWRlckxhYmVsID0gb3B0aW9uID0+IHtcbiAgICByZXR1cm4gb3B0aW9uLmxhYmVsO1xuICB9O1xuICBleHBvcnQgbGV0IGdldE9wdGlvbkxhYmVsID0gKG9wdGlvbiwgZmlsdGVyVGV4dCkgPT4ge1xuICAgIHJldHVybiBvcHRpb24uaXNDcmVhdG9yID8gYENyZWF0ZSBcXFwiJHtmaWx0ZXJUZXh0fVxcXCJgIDogb3B0aW9uLmxhYmVsO1xuICB9O1xuICBleHBvcnQgbGV0IG9wdGlvbklkZW50aWZpZXIgPSBcInZhbHVlXCI7XG4gIGV4cG9ydCBsZXQgbG9hZE9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIGV4cG9ydCBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBjb250YWluZXJTdHlsZXMgPSBcIlwiO1xuICBleHBvcnQgbGV0IGdldFNlbGVjdGlvbkxhYmVsID0gb3B0aW9uID0+IHtcbiAgICBpZiAob3B0aW9uKSByZXR1cm4gb3B0aW9uLmxhYmVsO1xuICB9O1xuXG4gIGV4cG9ydCBsZXQgY3JlYXRlR3JvdXBIZWFkZXJJdGVtID0gZ3JvdXBWYWx1ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBncm91cFZhbHVlLFxuICAgICAgbGFiZWw6IGdyb3VwVmFsdWVcbiAgICB9O1xuICB9O1xuXG4gIGV4cG9ydCBsZXQgY3JlYXRlSXRlbSA9IGZpbHRlclRleHQgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogZmlsdGVyVGV4dCxcbiAgICAgIGxhYmVsOiBmaWx0ZXJUZXh0XG4gICAgfTtcbiAgfTtcblxuICBleHBvcnQgbGV0IGlzU2VhcmNoYWJsZSA9IHRydWU7XG4gIGV4cG9ydCBsZXQgaW5wdXRTdHlsZXMgPSBcIlwiO1xuICBleHBvcnQgbGV0IGlzQ2xlYXJhYmxlID0gdHJ1ZTtcbiAgZXhwb3J0IGxldCBpc1dhaXRpbmcgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBsaXN0UGxhY2VtZW50ID0gXCJhdXRvXCI7XG4gIGV4cG9ydCBsZXQgbGlzdE9wZW4gPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBsaXN0ID0gdW5kZWZpbmVkO1xuICBleHBvcnQgbGV0IGlzVmlydHVhbExpc3QgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBsb2FkT3B0aW9uc0ludGVydmFsID0gMzAwO1xuICBleHBvcnQgbGV0IG5vT3B0aW9uc01lc3NhZ2UgPSBcIk5vIG9wdGlvbnNcIjtcbiAgZXhwb3J0IGxldCBoaWRlRW1wdHlTdGF0ZSA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGZpbHRlcmVkSXRlbXMgPSBbXTtcbiAgZXhwb3J0IGxldCBpbnB1dEF0dHJpYnV0ZXMgPSB7fTtcbiAgZXhwb3J0IGxldCBsaXN0QXV0b1dpZHRoID0gdHJ1ZTtcbiAgZXhwb3J0IGxldCBpdGVtSGVpZ2h0ID0gNDA7XG4gIGV4cG9ydCBsZXQgSWNvbiA9IHVuZGVmaW5lZDtcbiAgZXhwb3J0IGxldCBzaG93Q2hldnJvbiA9IGZhbHNlO1xuXG4gIGxldCB0YXJnZXQ7XG4gIGxldCBhY3RpdmVTZWxlY3RlZFZhbHVlO1xuICBsZXQgX2l0ZW1zID0gW107XG4gIGxldCBvcmlnaW5hbEl0ZW1zQ2xvbmU7XG4gIGxldCBjb250YWluZXJDbGFzc2VzID0gXCJcIjtcbiAgbGV0IHByZXZfc2VsZWN0ZWRWYWx1ZTtcbiAgbGV0IHByZXZfbGlzdE9wZW47XG4gIGxldCBwcmV2X2ZpbHRlclRleHQ7XG4gIGxldCBwcmV2X2lzRm9jdXNlZDtcbiAgbGV0IHByZXZfZmlsdGVyZWRJdGVtcztcblxuICBhc3luYyBmdW5jdGlvbiByZXNldEZpbHRlcigpIHtcbiAgICBhd2FpdCB0aWNrKCk7XG4gICAgZmlsdGVyVGV4dCA9IFwiXCI7XG4gIH1cblxuICBjb25zdCBnZXRJdGVtcyA9IGRlYm91bmNlKGFzeW5jICgpID0+IHtcbiAgICBpc1dhaXRpbmcgPSB0cnVlO1xuXG4gICAgaXRlbXMgPSBhd2FpdCBsb2FkT3B0aW9ucyhmaWx0ZXJUZXh0KTtcblxuICAgIGlzV2FpdGluZyA9IGZhbHNlO1xuICAgIGlzRm9jdXNlZCA9IHRydWU7XG4gICAgbGlzdE9wZW4gPSB0cnVlO1xuICB9LCBsb2FkT3B0aW9uc0ludGVydmFsKTtcblxuICAkOiBkaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG5cbiAgJDoge1xuICAgIGNvbnRhaW5lckNsYXNzZXMgPSBgc2VsZWN0Q29udGFpbmVyYDtcbiAgICBjb250YWluZXJDbGFzc2VzICs9IGlzTXVsdGkgPyBcIiBtdWx0aVNlbGVjdFwiIDogXCJcIjtcbiAgICBjb250YWluZXJDbGFzc2VzICs9IGlzRGlzYWJsZWQgPyBcIiBkaXNhYmxlZFwiIDogXCJcIjtcbiAgICBjb250YWluZXJDbGFzc2VzICs9IGlzRm9jdXNlZCA/IFwiIGZvY3VzZWRcIiA6IFwiXCI7XG4gIH1cblxuICAkOiB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RlZFZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBzZWxlY3RlZFZhbHVlID0ge1xuICAgICAgICBbb3B0aW9uSWRlbnRpZmllcl06IHNlbGVjdGVkVmFsdWUsXG4gICAgICAgIGxhYmVsOiBzZWxlY3RlZFZhbHVlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gICQ6IHNob3dTZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZFZhbHVlICYmIGZpbHRlclRleHQubGVuZ3RoID09PSAwO1xuXG4gICQ6IHBsYWNlaG9sZGVyVGV4dCA9IHNlbGVjdGVkVmFsdWUgPyBcIlwiIDogcGxhY2Vob2xkZXI7XG5cbiAgbGV0IF9pbnB1dEF0dHJpYnV0ZXMgPSB7fTtcbiAgJDoge1xuICAgIF9pbnB1dEF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKGlucHV0QXR0cmlidXRlcywge1xuICAgICAgYXV0b2NvbXBsZXRlOiBcIm9mZlwiLFxuICAgICAgYXV0b2NvcnJlY3Q6IFwib2ZmXCIsXG4gICAgICBzcGVsbGNoZWNrOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgaWYgKCFpc1NlYXJjaGFibGUpIHtcbiAgICAgIF9pbnB1dEF0dHJpYnV0ZXMucmVhZG9ubHkgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gICQ6IHtcbiAgICBsZXQgX2ZpbHRlcmVkSXRlbXM7XG4gICAgbGV0IF9pdGVtcyA9IGl0ZW1zO1xuXG4gICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGl0ZW1zWzBdICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICBfaXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgdmFsdWU6IGl0ZW0sXG4gICAgICAgICAgbGFiZWw6IGl0ZW1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChsb2FkT3B0aW9ucyAmJiBmaWx0ZXJUZXh0Lmxlbmd0aCA9PT0gMCAmJiBvcmlnaW5hbEl0ZW1zQ2xvbmUpIHtcbiAgICAgIF9maWx0ZXJlZEl0ZW1zID0gSlNPTi5wYXJzZShvcmlnaW5hbEl0ZW1zQ2xvbmUpO1xuICAgICAgX2l0ZW1zID0gSlNPTi5wYXJzZShvcmlnaW5hbEl0ZW1zQ2xvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfZmlsdGVyZWRJdGVtcyA9IGxvYWRPcHRpb25zXG4gICAgICAgID8gZmlsdGVyVGV4dC5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IFtdXG4gICAgICAgICAgOiBfaXRlbXNcbiAgICAgICAgOiBfaXRlbXMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IGtlZXBJdGVtID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKGlzTXVsdGkgJiYgc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICBrZWVwSXRlbSA9ICFzZWxlY3RlZFZhbHVlLmZpbmQodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVtvcHRpb25JZGVudGlmaWVyXSA9PT0gaXRlbVtvcHRpb25JZGVudGlmaWVyXTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgha2VlcEl0ZW0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJUZXh0Lmxlbmd0aCA8IDEpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1GaWx0ZXIoXG4gICAgICAgICAgICAgIGdldE9wdGlvbkxhYmVsKGl0ZW0sIGZpbHRlclRleHQpLFxuICAgICAgICAgICAgICBmaWx0ZXJUZXh0LFxuICAgICAgICAgICAgICBpdGVtXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChncm91cEJ5KSB7XG4gICAgICBjb25zdCBncm91cFZhbHVlcyA9IFtdO1xuICAgICAgY29uc3QgZ3JvdXBzID0ge307XG5cbiAgICAgIF9maWx0ZXJlZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGdyb3VwVmFsdWUgPSBncm91cEJ5KGl0ZW0pO1xuXG4gICAgICAgIGlmICghZ3JvdXBWYWx1ZXMuaW5jbHVkZXMoZ3JvdXBWYWx1ZSkpIHtcbiAgICAgICAgICBncm91cFZhbHVlcy5wdXNoKGdyb3VwVmFsdWUpO1xuICAgICAgICAgIGdyb3Vwc1tncm91cFZhbHVlXSA9IFtdO1xuXG4gICAgICAgICAgaWYgKGdyb3VwVmFsdWUpIHtcbiAgICAgICAgICAgIGdyb3Vwc1tncm91cFZhbHVlXS5wdXNoKFxuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGNyZWF0ZUdyb3VwSGVhZGVySXRlbShncm91cFZhbHVlLCBpdGVtKSwge1xuICAgICAgICAgICAgICAgIGlkOiBncm91cFZhbHVlLFxuICAgICAgICAgICAgICAgIGlzR3JvdXBIZWFkZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgaXNTZWxlY3RhYmxlOiBpc0dyb3VwSGVhZGVyU2VsZWN0YWJsZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBncm91cHNbZ3JvdXBWYWx1ZV0ucHVzaChcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHsgaXNHcm91cEl0ZW06ICEhZ3JvdXBWYWx1ZSB9LCBpdGVtKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNvcnRlZEdyb3VwZWRJdGVtcyA9IFtdO1xuXG4gICAgICBncm91cEZpbHRlcihncm91cFZhbHVlcykuZm9yRWFjaChncm91cFZhbHVlID0+IHtcbiAgICAgICAgc29ydGVkR3JvdXBlZEl0ZW1zLnB1c2goLi4uZ3JvdXBzW2dyb3VwVmFsdWVdKTtcbiAgICAgIH0pO1xuXG4gICAgICBmaWx0ZXJlZEl0ZW1zID0gc29ydGVkR3JvdXBlZEl0ZW1zO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWx0ZXJlZEl0ZW1zID0gX2ZpbHRlcmVkSXRlbXM7XG4gICAgfVxuICB9XG5cbiAgYmVmb3JlVXBkYXRlKCgpID0+IHtcbiAgICBpZiAoaXNNdWx0aSAmJiBzZWxlY3RlZFZhbHVlICYmIHNlbGVjdGVkVmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgY2hlY2tTZWxlY3RlZFZhbHVlRm9yRHVwbGljYXRlcygpO1xuICAgIH1cblxuICAgIGlmICghaXNNdWx0aSAmJiBzZWxlY3RlZFZhbHVlICYmIHByZXZfc2VsZWN0ZWRWYWx1ZSAhPT0gc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgaWYgKFxuICAgICAgICAhcHJldl9zZWxlY3RlZFZhbHVlIHx8XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkVmFsdWVbb3B0aW9uSWRlbnRpZmllcl0pICE9PVxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHByZXZfc2VsZWN0ZWRWYWx1ZVtvcHRpb25JZGVudGlmaWVyXSlcbiAgICAgICkge1xuICAgICAgICBkaXNwYXRjaChcInNlbGVjdFwiLCBzZWxlY3RlZFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBpc011bHRpICYmXG4gICAgICBKU09OLnN0cmluZ2lmeShzZWxlY3RlZFZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldl9zZWxlY3RlZFZhbHVlKVxuICAgICkge1xuICAgICAgaWYgKGNoZWNrU2VsZWN0ZWRWYWx1ZUZvckR1cGxpY2F0ZXMoKSkge1xuICAgICAgICBkaXNwYXRjaChcInNlbGVjdFwiLCBzZWxlY3RlZFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29udGFpbmVyICYmIGxpc3RPcGVuICE9PSBwcmV2X2xpc3RPcGVuKSB7XG4gICAgICBpZiAobGlzdE9wZW4pIHtcbiAgICAgICAgbG9hZExpc3QoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZUxpc3QoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmlsdGVyVGV4dCAhPT0gcHJldl9maWx0ZXJUZXh0KSB7XG4gICAgICBpZiAoZmlsdGVyVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIGxpc3RPcGVuID0gdHJ1ZTtcblxuICAgICAgICBpZiAobG9hZE9wdGlvbnMpIHtcbiAgICAgICAgICBnZXRJdGVtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvYWRMaXN0KCk7XG4gICAgICAgICAgbGlzdE9wZW4gPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKGlzTXVsdGkpIHtcbiAgICAgICAgICAgIGFjdGl2ZVNlbGVjdGVkVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRMaXN0KFtdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgbGlzdC4kc2V0KHtcbiAgICAgICAgICBmaWx0ZXJUZXh0XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0ZvY3VzZWQgIT09IHByZXZfaXNGb2N1c2VkKSB7XG4gICAgICBpZiAoaXNGb2N1c2VkIHx8IGxpc3RPcGVuKSB7XG4gICAgICAgIGhhbmRsZUZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNldEZpbHRlcigpO1xuICAgICAgICBpZiAoaW5wdXQpIGlucHV0LmJsdXIoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJldl9maWx0ZXJlZEl0ZW1zICE9PSBmaWx0ZXJlZEl0ZW1zKSB7XG4gICAgICBsZXQgX2ZpbHRlcmVkSXRlbXMgPSBbLi4uZmlsdGVyZWRJdGVtc107XG5cbiAgICAgIGlmIChpc0NyZWF0YWJsZSAmJiBmaWx0ZXJUZXh0KSB7XG4gICAgICAgIGNvbnN0IGl0ZW1Ub0NyZWF0ZSA9IGNyZWF0ZUl0ZW0oZmlsdGVyVGV4dCk7XG4gICAgICAgIGl0ZW1Ub0NyZWF0ZS5pc0NyZWF0b3IgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbVdpdGhGaWx0ZXJWYWx1ZSA9IF9maWx0ZXJlZEl0ZW1zLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1bb3B0aW9uSWRlbnRpZmllcl0gPT09IGl0ZW1Ub0NyZWF0ZVtvcHRpb25JZGVudGlmaWVyXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGV4aXN0aW5nU2VsZWN0aW9uV2l0aEZpbHRlclZhbHVlO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKGlzTXVsdGkpIHtcbiAgICAgICAgICAgIGV4aXN0aW5nU2VsZWN0aW9uV2l0aEZpbHRlclZhbHVlID0gc2VsZWN0ZWRWYWx1ZS5maW5kKHNlbGVjdGlvbiA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uW29wdGlvbklkZW50aWZpZXJdID09PSBpdGVtVG9DcmVhdGVbb3B0aW9uSWRlbnRpZmllcl1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlW29wdGlvbklkZW50aWZpZXJdID09PSBpdGVtVG9DcmVhdGVbb3B0aW9uSWRlbnRpZmllcl1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGV4aXN0aW5nU2VsZWN0aW9uV2l0aEZpbHRlclZhbHVlID0gc2VsZWN0ZWRWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWV4aXN0aW5nSXRlbVdpdGhGaWx0ZXJWYWx1ZSAmJiAhZXhpc3RpbmdTZWxlY3Rpb25XaXRoRmlsdGVyVmFsdWUpIHtcbiAgICAgICAgICBfZmlsdGVyZWRJdGVtcyA9IFsuLi5fZmlsdGVyZWRJdGVtcywgaXRlbVRvQ3JlYXRlXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRMaXN0KF9maWx0ZXJlZEl0ZW1zKTtcbiAgICB9XG5cbiAgICBwcmV2X3NlbGVjdGVkVmFsdWUgPSBzZWxlY3RlZFZhbHVlO1xuICAgIHByZXZfbGlzdE9wZW4gPSBsaXN0T3BlbjtcbiAgICBwcmV2X2ZpbHRlclRleHQgPSBmaWx0ZXJUZXh0O1xuICAgIHByZXZfaXNGb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgIHByZXZfZmlsdGVyZWRJdGVtcyA9IGZpbHRlcmVkSXRlbXM7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNoZWNrU2VsZWN0ZWRWYWx1ZUZvckR1cGxpY2F0ZXMoKSB7XG4gICAgbGV0IG5vRHVwbGljYXRlcyA9IHRydWU7XG4gICAgaWYgKHNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIGNvbnN0IGlkcyA9IFtdO1xuICAgICAgY29uc3QgdW5pcXVlVmFsdWVzID0gW107XG5cbiAgICAgIHNlbGVjdGVkVmFsdWUuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgICBpZiAoIWlkcy5pbmNsdWRlcyh2YWxbb3B0aW9uSWRlbnRpZmllcl0pKSB7XG4gICAgICAgICAgaWRzLnB1c2godmFsW29wdGlvbklkZW50aWZpZXJdKTtcbiAgICAgICAgICB1bmlxdWVWYWx1ZXMucHVzaCh2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vRHVwbGljYXRlcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgc2VsZWN0ZWRWYWx1ZSA9IHVuaXF1ZVZhbHVlcztcbiAgICB9XG4gICAgcmV0dXJuIG5vRHVwbGljYXRlcztcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIHNldExpc3QoaXRlbXMpIHtcbiAgICBhd2FpdCB0aWNrKCk7XG4gICAgaWYgKGxpc3QpIHJldHVybiBsaXN0LiRzZXQoeyBpdGVtcyB9KTtcbiAgICBpZiAobG9hZE9wdGlvbnMgJiYgaXRlbXMubGVuZ3RoID4gMCkgbG9hZExpc3QoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU11bHRpSXRlbUNsZWFyKGV2ZW50KSB7XG4gICAgY29uc3QgeyBkZXRhaWwgfSA9IGV2ZW50O1xuICAgIGNvbnN0IGl0ZW1Ub1JlbW92ZSA9XG4gICAgICBzZWxlY3RlZFZhbHVlW2RldGFpbCA/IGRldGFpbC5pIDogc2VsZWN0ZWRWYWx1ZS5sZW5ndGggLSAxXTtcblxuICAgIGlmIChzZWxlY3RlZFZhbHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgc2VsZWN0ZWRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0ZWRWYWx1ZSA9IHNlbGVjdGVkVmFsdWUuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gaXRlbSAhPT0gaXRlbVRvUmVtb3ZlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlzcGF0Y2goXCJjbGVhclwiLCBpdGVtVG9SZW1vdmUpO1xuXG4gICAgZ2V0UG9zaXRpb24oKTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgIGF3YWl0IHRpY2soKTtcbiAgICBpZiAoIXRhcmdldCB8fCAhY29udGFpbmVyKSByZXR1cm47XG4gICAgY29uc3QgeyB0b3AsIGhlaWdodCwgd2lkdGggfSA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRhcmdldC5zdHlsZVtcIm1pbi13aWR0aFwiXSA9IGAke3dpZHRofXB4YDtcbiAgICB0YXJnZXQuc3R5bGUud2lkdGggPSBgJHtsaXN0QXV0b1dpZHRoID8gXCJhdXRvXCIgOiBcIjEwMCVcIn1gO1xuICAgIHRhcmdldC5zdHlsZS5sZWZ0ID0gXCIwXCI7XG5cbiAgICBpZiAobGlzdFBsYWNlbWVudCA9PT0gXCJ0b3BcIikge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJvdHRvbSA9IGAke2hlaWdodCArIDV9cHhgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuc3R5bGUudG9wID0gYCR7aGVpZ2h0ICsgNX1weGA7XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gdGFyZ2V0O1xuXG4gICAgaWYgKGxpc3RQbGFjZW1lbnQgPT09IFwiYXV0b1wiICYmIGlzT3V0T2ZWaWV3cG9ydCh0YXJnZXQpLmJvdHRvbSkge1xuICAgICAgdGFyZ2V0LnN0eWxlLnRvcCA9IGBgO1xuICAgICAgdGFyZ2V0LnN0eWxlLmJvdHRvbSA9IGAke2hlaWdodCArIDV9cHhgO1xuICAgIH1cblxuICAgIHRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZSkge1xuICAgIGlmICghaXNGb2N1c2VkKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGlzdE9wZW4gPSB0cnVlO1xuICAgICAgICBhY3RpdmVTZWxlY3RlZFZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGlzdE9wZW4gPSB0cnVlO1xuICAgICAgICBhY3RpdmVTZWxlY3RlZFZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJUYWJcIjpcbiAgICAgICAgaWYgKCFsaXN0T3BlbikgaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkJhY2tzcGFjZVwiOlxuICAgICAgICBpZiAoIWlzTXVsdGkgfHwgZmlsdGVyVGV4dC5sZW5ndGggPiAwKSByZXR1cm47XG4gICAgICAgIGlmIChpc011bHRpICYmIHNlbGVjdGVkVmFsdWUgJiYgc2VsZWN0ZWRWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaGFuZGxlTXVsdGlJdGVtQ2xlYXIoXG4gICAgICAgICAgICBhY3RpdmVTZWxlY3RlZFZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBhY3RpdmVTZWxlY3RlZFZhbHVlXG4gICAgICAgICAgICAgIDogc2VsZWN0ZWRWYWx1ZS5sZW5ndGggLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoYWN0aXZlU2VsZWN0ZWRWYWx1ZSA9PT0gMCB8fCBhY3RpdmVTZWxlY3RlZFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBhY3RpdmVTZWxlY3RlZFZhbHVlID1cbiAgICAgICAgICAgIHNlbGVjdGVkVmFsdWUubGVuZ3RoID4gYWN0aXZlU2VsZWN0ZWRWYWx1ZVxuICAgICAgICAgICAgICA/IGFjdGl2ZVNlbGVjdGVkVmFsdWUgLSAxXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICBpZiAobGlzdCkgbGlzdC4kc2V0KHsgaG92ZXJJdGVtSW5kZXg6IC0xIH0pO1xuICAgICAgICBpZiAoIWlzTXVsdGkgfHwgZmlsdGVyVGV4dC5sZW5ndGggPiAwKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGFjdGl2ZVNlbGVjdGVkVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFjdGl2ZVNlbGVjdGVkVmFsdWUgPSBzZWxlY3RlZFZhbHVlLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgc2VsZWN0ZWRWYWx1ZS5sZW5ndGggPiBhY3RpdmVTZWxlY3RlZFZhbHVlICYmXG4gICAgICAgICAgYWN0aXZlU2VsZWN0ZWRWYWx1ZSAhPT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICBhY3RpdmVTZWxlY3RlZFZhbHVlIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICBpZiAobGlzdCkgbGlzdC4kc2V0KHsgaG92ZXJJdGVtSW5kZXg6IC0xIH0pO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWlzTXVsdGkgfHxcbiAgICAgICAgICBmaWx0ZXJUZXh0Lmxlbmd0aCA+IDAgfHxcbiAgICAgICAgICBhY3RpdmVTZWxlY3RlZFZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKGFjdGl2ZVNlbGVjdGVkVmFsdWUgPT09IHNlbGVjdGVkVmFsdWUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGFjdGl2ZVNlbGVjdGVkVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlU2VsZWN0ZWRWYWx1ZSA8IHNlbGVjdGVkVmFsdWUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGFjdGl2ZVNlbGVjdGVkVmFsdWUgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVGb2N1cygpIHtcbiAgICBpc0ZvY3VzZWQgPSB0cnVlO1xuICAgIGlmIChpbnB1dCkgaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUxpc3QoKSB7XG4gICAgcmVzZXRGaWx0ZXIoKTtcbiAgICBhY3RpdmVTZWxlY3RlZFZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKCFsaXN0KSByZXR1cm47XG4gICAgbGlzdC4kZGVzdHJveSgpO1xuICAgIGxpc3QgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgIGlmICh0YXJnZXQucGFyZW50Tm9kZSkgdGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0KTtcbiAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG5cbiAgICBsaXN0ID0gbGlzdDtcbiAgICB0YXJnZXQgPSB0YXJnZXQ7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVXaW5kb3dDbGljayhldmVudCkge1xuICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gICAgY29uc3QgZXZlbnRUYXJnZXQgPVxuICAgICAgZXZlbnQucGF0aCAmJiBldmVudC5wYXRoLmxlbmd0aCA+IDAgPyBldmVudC5wYXRoWzBdIDogZXZlbnQudGFyZ2V0O1xuICAgIGlmIChjb250YWluZXIuY29udGFpbnMoZXZlbnRUYXJnZXQpKSByZXR1cm47XG4gICAgaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgbGlzdE9wZW4gPSBmYWxzZTtcbiAgICBhY3RpdmVTZWxlY3RlZFZhbHVlID0gdW5kZWZpbmVkO1xuICAgIGlmIChpbnB1dCkgaW5wdXQuYmx1cigpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soKSB7XG4gICAgaWYgKGlzRGlzYWJsZWQpIHJldHVybjtcbiAgICBpc0ZvY3VzZWQgPSB0cnVlO1xuICAgIGxpc3RPcGVuID0gIWxpc3RPcGVuO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUNsZWFyKCkge1xuICAgIHNlbGVjdGVkVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgbGlzdE9wZW4gPSBmYWxzZTtcbiAgICBkaXNwYXRjaChcImNsZWFyXCIsIHNlbGVjdGVkVmFsdWUpO1xuICAgIGhhbmRsZUZvY3VzKCk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBsb2FkTGlzdCgpIHtcbiAgICBhd2FpdCB0aWNrKCk7XG4gICAgaWYgKHRhcmdldCAmJiBsaXN0KSByZXR1cm47XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgSXRlbSxcbiAgICAgIGZpbHRlclRleHQsXG4gICAgICBvcHRpb25JZGVudGlmaWVyLFxuICAgICAgbm9PcHRpb25zTWVzc2FnZSxcbiAgICAgIGhpZGVFbXB0eVN0YXRlLFxuICAgICAgaXNWaXJ0dWFsTGlzdCxcbiAgICAgIHNlbGVjdGVkVmFsdWUsXG4gICAgICBpc011bHRpLFxuICAgICAgZ2V0R3JvdXBIZWFkZXJMYWJlbCxcbiAgICAgIGl0ZW1zOiBmaWx0ZXJlZEl0ZW1zLFxuICAgICAgaXRlbUhlaWdodFxuICAgIH07XG5cbiAgICBpZiAoZ2V0T3B0aW9uTGFiZWwpIHtcbiAgICAgIGRhdGEuZ2V0T3B0aW9uTGFiZWwgPSBnZXRPcHRpb25MYWJlbDtcbiAgICB9XG5cbiAgICB0YXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0YXJnZXQuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICBcInotaW5kZXhcIjogMixcbiAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCJcbiAgICB9KTtcblxuICAgIGxpc3QgPSBsaXN0O1xuICAgIHRhcmdldCA9IHRhcmdldDtcbiAgICBpZiAoY29udGFpbmVyKSBjb250YWluZXIuYXBwZW5kQ2hpbGQodGFyZ2V0KTtcblxuICAgIGxpc3QgPSBuZXcgTGlzdCh7XG4gICAgICB0YXJnZXQsXG4gICAgICBwcm9wczogZGF0YVxuICAgIH0pO1xuXG4gICAgbGlzdC4kb24oXCJpdGVtU2VsZWN0ZWRcIiwgZXZlbnQgPT4ge1xuICAgICAgY29uc3QgeyBkZXRhaWwgfSA9IGV2ZW50O1xuXG4gICAgICBpZiAoZGV0YWlsKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBkZXRhaWwpO1xuXG4gICAgICAgIGlmICghaXRlbS5pc0dyb3VwSGVhZGVyIHx8IGl0ZW0uaXNTZWxlY3RhYmxlKSB7XG5cbiAgICAgICAgICBpZiAoaXNNdWx0aSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZSA9IHNlbGVjdGVkVmFsdWUgPyBzZWxlY3RlZFZhbHVlLmNvbmNhdChbaXRlbV0pIDogW2l0ZW1dO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlID0gaXRlbTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNldEZpbHRlcigpO1xuICAgICAgICAgIHNlbGVjdGVkVmFsdWUgPSBzZWxlY3RlZFZhbHVlO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsaXN0T3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgYWN0aXZlU2VsZWN0ZWRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGlzdC4kb24oXCJpdGVtQ3JlYXRlZFwiLCBldmVudCA9PiB7XG4gICAgICBjb25zdCB7IGRldGFpbCB9ID0gZXZlbnQ7XG4gICAgICBpZiAoaXNNdWx0aSkge1xuICAgICAgICBzZWxlY3RlZFZhbHVlID0gc2VsZWN0ZWRWYWx1ZSB8fCBbXTtcbiAgICAgICAgc2VsZWN0ZWRWYWx1ZSA9IFsuLi5zZWxlY3RlZFZhbHVlLCBjcmVhdGVJdGVtKGRldGFpbCldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZWN0ZWRWYWx1ZSA9IGNyZWF0ZUl0ZW0oZGV0YWlsKTtcbiAgICAgIH1cblxuICAgICAgZmlsdGVyVGV4dCA9IFwiXCI7XG4gICAgICBsaXN0T3BlbiA9IGZhbHNlO1xuICAgICAgYWN0aXZlU2VsZWN0ZWRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHJlc2V0RmlsdGVyKCk7XG4gICAgfSk7XG5cbiAgICBsaXN0LiRvbihcImNsb3NlTGlzdFwiLCAoKSA9PiB7XG4gICAgICBsaXN0T3BlbiA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgKGxpc3QgPSBsaXN0KSwgKHRhcmdldCA9IHRhcmdldCk7XG4gICAgZ2V0UG9zaXRpb24oKTtcbiAgfVxuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGlmIChpc0ZvY3VzZWQpIGlucHV0LmZvY3VzKCk7XG4gICAgaWYgKGxpc3RPcGVuKSBsb2FkTGlzdCgpO1xuXG4gICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIG9yaWdpbmFsSXRlbXNDbG9uZSA9IEpTT04uc3RyaW5naWZ5KGl0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgaWYgKGlzTXVsdGkpIHtcbiAgICAgICAgc2VsZWN0ZWRWYWx1ZSA9IHNlbGVjdGVkVmFsdWUubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGl0ZW0sIGxhYmVsOiBpdGVtIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBvbkRlc3Ryb3koKCkgPT4ge1xuICAgIHJlbW92ZUxpc3QoKTtcbiAgfSk7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAuc2VsZWN0Q29udGFpbmVyIHtcbiAgICAtLXBhZGRpbmc6IDAgMTZweDtcbiAgICBcbiAgICBib3JkZXI6IHZhcigtLWJvcmRlciwgMXB4IHNvbGlkICNkOGRiZGYpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlclJhZGl1cywgM3B4KTtcbiAgICBoZWlnaHQ6IHZhcigtLWhlaWdodCwgNDJweCk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiB2YXIoLS1wYWRkaW5nKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLCAjZmZmKTtcbiAgfVxuXG4gIC5zZWxlY3RDb250YWluZXIgaW5wdXQge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgY29sb3I6IHZhcigtLWlucHV0Q29sb3IsICMzZjRmNWYpO1xuICAgIGhlaWdodDogdmFyKC0taGVpZ2h0LCA0MnB4KTtcbiAgICBsaW5lLWhlaWdodDogdmFyKC0taGVpZ2h0LCA0MnB4KTtcbiAgICBwYWRkaW5nOiB2YXIoLS1pbnB1dFBhZGRpbmcsIHZhcigtLXBhZGRpbmcpKTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBmb250LXNpemU6IHZhcigtLWlucHV0Rm9udFNpemUsIDE0cHgpO1xuICAgIGxldHRlci1zcGFjaW5nOiB2YXIoLS1pbnB1dExldHRlclNwYWNpbmcsIC0wLjA4cHgpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiB2YXIoLS1pbnB1dExlZnQsIDApO1xuICB9XG5cbiAgLnNlbGVjdENvbnRhaW5lciBpbnB1dDo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiB2YXIoLS1wbGFjZWhvbGRlckNvbG9yLCAjNzg4NDhmKTtcbiAgfVxuXG4gIC5zZWxlY3RDb250YWluZXIgaW5wdXQ6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICAuc2VsZWN0Q29udGFpbmVyOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWJvcmRlckhvdmVyQ29sb3IsICNiMmI4YmYpO1xuICB9XG5cbiAgLnNlbGVjdENvbnRhaW5lci5mb2N1c2VkIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWJvcmRlckZvY3VzQ29sb3IsICMwMDZmZTgpO1xuICB9XG5cbiAgLnNlbGVjdENvbnRhaW5lci5kaXNhYmxlZCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tZGlzYWJsZWRCYWNrZ3JvdW5kLCAjZWJlZGVmKTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWRpc2FibGVkQm9yZGVyQ29sb3IsICNlYmVkZWYpO1xuICAgIGNvbG9yOiB2YXIoLS1kaXNhYmxlZENvbG9yLCAjYzFjNmNjKTtcbiAgfVxuXG4gIC5zZWxlY3RDb250YWluZXIuZGlzYWJsZWQgaW5wdXQ6OnBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogdmFyKC0tZGlzYWJsZWRQbGFjZWhvbGRlckNvbG9yLCAjYzFjNmNjKTtcbiAgfVxuXG4gIC5zZWxlY3RlZEl0ZW0ge1xuICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS1oZWlnaHQsIDQycHgpO1xuICAgIGhlaWdodDogdmFyKC0taGVpZ2h0LCA0MnB4KTtcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgcGFkZGluZzogdmFyKC0tc2VsZWN0ZWRJdGVtUGFkZGluZywgMCAyMHB4IDAgMCk7XG4gIH1cblxuICAuc2VsZWN0ZWRJdGVtOmZvY3VzIHtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG5cbiAgLmNsZWFyU2VsZWN0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IHZhcigtLWNsZWFyU2VsZWN0UmlnaHQsIDEwcHgpO1xuICAgIHRvcDogdmFyKC0tY2xlYXJTZWxlY3RUb3AsIDExcHgpO1xuICAgIGJvdHRvbTogdmFyKC0tY2xlYXJTZWxlY3RCb3R0b20sIDExcHgpO1xuICAgIHdpZHRoOiB2YXIoLS1jbGVhclNlbGVjdFdpZHRoLCAyMHB4KTtcbiAgICBjb2xvcjogdmFyKC0tY2xlYXJTZWxlY3RDb2xvciwgI2M1Y2FjZik7XG4gICAgZmxleDogbm9uZSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmNsZWFyU2VsZWN0OmhvdmVyIHtcbiAgICBjb2xvcjogdmFyKC0tY2xlYXJTZWxlY3RIb3ZlckNvbG9yLCAjMmMzZTUwKTtcbiAgfVxuXG4gIC5zZWxlY3RDb250YWluZXIuZm9jdXNlZCAuY2xlYXJTZWxlY3Qge1xuICAgIGNvbG9yOiB2YXIoLS1jbGVhclNlbGVjdEZvY3VzQ29sb3IsICMzZjRmNWYpO1xuICB9XG5cbiAgLmluZGljYXRvciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiB2YXIoLS1pbmRpY2F0b3JSaWdodCwgMTBweCk7XG4gICAgdG9wOiB2YXIoLS1pbmRpY2F0b3JUb3AsIDExcHgpO1xuICAgIHdpZHRoOiB2YXIoLS1pbmRpY2F0b3JXaWR0aCwgMjBweCk7XG4gICAgaGVpZ2h0OiB2YXIoLS1pbmRpY2F0b3JIZWlnaHQsIDIwcHgpO1xuICAgIGNvbG9yOiB2YXIoLS1pbmRpY2F0b3JDb2xvciwgI2M1Y2FjZik7XG4gIH1cblxuICAuaW5kaWNhdG9yIHN2ZyB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZpbGw6IHZhcigtLWluZGljYXRvckZpbGwsIGN1cnJlbnRjb2xvcik7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgc3Ryb2tlOiB2YXIoLS1pbmRpY2F0b3JTdHJva2UsIGN1cnJlbnRjb2xvcik7XG4gICAgc3Ryb2tlLXdpZHRoOiAwO1xuICB9XG5cbiAgLnNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogdmFyKC0tc3Bpbm5lclJpZ2h0LCAxMHB4KTtcbiAgICB0b3A6IHZhcigtLXNwaW5uZXJMZWZ0LCAxMXB4KTtcbiAgICB3aWR0aDogdmFyKC0tc3Bpbm5lcldpZHRoLCAyMHB4KTtcbiAgICBoZWlnaHQ6IHZhcigtLXNwaW5uZXJIZWlnaHQsIDIwcHgpO1xuICAgIGNvbG9yOiB2YXIoLS1zcGlubmVyQ29sb3IsICM1MWNlNmMpO1xuICAgIGFuaW1hdGlvbjogcm90YXRlIDAuNzVzIGxpbmVhciBpbmZpbml0ZTtcbiAgfVxuXG4gIC5zcGlubmVyX2ljb24ge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBub25lO1xuICB9XG5cbiAgLnNwaW5uZXJfcGF0aCB7XG4gICAgc3Ryb2tlLWRhc2hhcnJheTogOTA7XG4gICAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kO1xuICB9XG5cbiAgLm11bHRpU2VsZWN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBhZGRpbmc6IHZhcigtLW11bHRpU2VsZWN0UGFkZGluZywgMCAzNXB4IDAgMTZweCk7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgfVxuXG4gIC5tdWx0aVNlbGVjdCA+ICoge1xuICAgIGZsZXg6IDEgMSA1MHB4O1xuICB9XG5cbiAgLnNlbGVjdENvbnRhaW5lci5tdWx0aVNlbGVjdCBpbnB1dCB7XG4gICAgcGFkZGluZzogdmFyKC0tbXVsdGlTZWxlY3RJbnB1dFBhZGRpbmcsIDApO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW46IHZhcigtLW11bHRpU2VsZWN0SW5wdXRNYXJnaW4sIDApO1xuICB9XG5cbiAgLmhhc0Vycm9yIHtcbiAgICBib3JkZXI6IHZhcigtLWVycm9yQm9yZGVyLCAxcHggc29saWQgI2ZmMmQ1NSk7XG4gIH1cblxuICBAa2V5ZnJhbWVzIHJvdGF0ZSB7XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgIH1cbiAgfVxuPC9zdHlsZT5cblxuPHN2ZWx0ZTp3aW5kb3dcbiAgb246Y2xpY2s9e2hhbmRsZVdpbmRvd0NsaWNrfVxuICBvbjprZXlkb3duPXtoYW5kbGVLZXlEb3dufVxuICBvbjpyZXNpemU9e2dldFBvc2l0aW9ufSAvPlxuXG48ZGl2XG4gIGNsYXNzPVwie2NvbnRhaW5lckNsYXNzZXN9XG4gIHtoYXNFcnJvciA/ICdoYXNFcnJvcicgOiAnJ31cIlxuICBzdHlsZT17Y29udGFpbmVyU3R5bGVzfVxuICBvbjpjbGljaz17aGFuZGxlQ2xpY2t9XG4gIGJpbmQ6dGhpcz17Y29udGFpbmVyfT5cblxuICB7I2lmIEljb259XG4gICAgPHN2ZWx0ZTpjb21wb25lbnQgdGhpcz17SWNvbn0gLz5cbiAgey9pZn1cblxuICB7I2lmIGlzTXVsdGkgJiYgc2VsZWN0ZWRWYWx1ZSAmJiBzZWxlY3RlZFZhbHVlLmxlbmd0aCA+IDB9XG4gICAgPHN2ZWx0ZTpjb21wb25lbnRcbiAgICAgIHRoaXM9e011bHRpU2VsZWN0aW9ufVxuICAgICAge3NlbGVjdGVkVmFsdWV9XG4gICAgICB7Z2V0U2VsZWN0aW9uTGFiZWx9XG4gICAgICB7YWN0aXZlU2VsZWN0ZWRWYWx1ZX1cbiAgICAgIHtpc0Rpc2FibGVkfVxuICAgICAgb246bXVsdGlJdGVtQ2xlYXI9e2hhbmRsZU11bHRpSXRlbUNsZWFyfVxuICAgICAgb246Zm9jdXM9e2hhbmRsZUZvY3VzfSAvPlxuICB7L2lmfVxuXG4gIHsjaWYgaXNEaXNhYmxlZH1cbiAgICA8aW5wdXRcbiAgICAgIHsuLi5faW5wdXRBdHRyaWJ1dGVzfVxuICAgICAgYmluZDp0aGlzPXtpbnB1dH1cbiAgICAgIG9uOmZvY3VzPXtoYW5kbGVGb2N1c31cbiAgICAgIGJpbmQ6dmFsdWU9e2ZpbHRlclRleHR9XG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJUZXh0fVxuICAgICAgc3R5bGU9e2lucHV0U3R5bGVzfVxuICAgICAgZGlzYWJsZWQgLz5cbiAgezplbHNlfVxuICAgIDxpbnB1dFxuICAgICAgey4uLl9pbnB1dEF0dHJpYnV0ZXN9XG4gICAgICBiaW5kOnRoaXM9e2lucHV0fVxuICAgICAgb246Zm9jdXM9e2hhbmRsZUZvY3VzfVxuICAgICAgYmluZDp2YWx1ZT17ZmlsdGVyVGV4dH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlclRleHR9XG4gICAgICBzdHlsZT17aW5wdXRTdHlsZXN9IC8+XG4gIHsvaWZ9XG5cbiAgeyNpZiAhaXNNdWx0aSAmJiBzaG93U2VsZWN0ZWRJdGVtfVxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RlZEl0ZW1cIiBvbjpmb2N1cz17aGFuZGxlRm9jdXN9PlxuICAgICAgPHN2ZWx0ZTpjb21wb25lbnRcbiAgICAgICAgdGhpcz17U2VsZWN0aW9ufVxuICAgICAgICBpdGVtPXtzZWxlY3RlZFZhbHVlfVxuICAgICAgICB7Z2V0U2VsZWN0aW9uTGFiZWx9IC8+XG4gICAgPC9kaXY+XG4gIHsvaWZ9XG5cbiAgeyNpZiBzaG93U2VsZWN0ZWRJdGVtICYmIGlzQ2xlYXJhYmxlICYmICFpc0Rpc2FibGVkICYmICFpc1dhaXRpbmd9XG4gICAgPGRpdiBjbGFzcz1cImNsZWFyU2VsZWN0XCIgb246Y2xpY2t8cHJldmVudERlZmF1bHQ9e2hhbmRsZUNsZWFyfT5cbiAgICAgIDxzdmdcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICAgIHZpZXdCb3g9XCItMiAtMiA1MCA1MFwiXG4gICAgICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgIGQ9XCJNMzQuOTIzLDM3LjI1MUwyNCwyNi4zMjhMMTMuMDc3LDM3LjI1MUw5LjQzNiwzMy42MWwxMC45MjMtMTAuOTIzTDkuNDM2LDExLjc2NWwzLjY0MS0zLjY0MUwyNCwxOS4wNDdMMzQuOTIzLDguMTI0XG4gICAgICAgICAgbDMuNjQxLDMuNjQxTDI3LjY0MSwyMi42ODhMMzguNTY0LDMzLjYxTDM0LjkyMywzNy4yNTF6XCIgLz5cbiAgICAgIDwvc3ZnPlxuICAgIDwvZGl2PlxuICB7L2lmfVxuXG4gIHsjaWYgc2hvd0NoZXZyb24gJiYgIXNlbGVjdGVkVmFsdWUgfHwgKCFpc1NlYXJjaGFibGUgJiYgIWlzRGlzYWJsZWQgJiYgIWlzV2FpdGluZyAmJiAoKHNob3dTZWxlY3RlZEl0ZW0gJiYgIWlzQ2xlYXJhYmxlKSB8fCAhc2hvd1NlbGVjdGVkSXRlbSkpfVxuICAgIDxkaXYgY2xhc3M9XCJpbmRpY2F0b3JcIj5cbiAgICAgIDxzdmdcbiAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgICAgICBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgICAgIGNsYXNzPVwiY3NzLTE5YnFoMnJcIj5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBkPVwiTTQuNTE2IDcuNTQ4YzAuNDM2LTAuNDQ2IDEuMDQzLTAuNDgxIDEuNTc2IDBsMy45MDggMy43NDdcbiAgICAgICAgICAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDBcbiAgICAgICAgICAxLjYxNS0wLjQwNiAwLjQxOC00LjY5NSA0LjUwMi00LjY5NSA0LjUwMi0wLjIxNyAwLjIyMy0wLjUwMlxuICAgICAgICAgIDAuMzM1LTAuNzg3IDAuMzM1cy0wLjU3LTAuMTEyLTAuNzg5LTAuMzM1YzBcbiAgICAgICAgICAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgICAgIDwvc3ZnPlxuICAgIDwvZGl2PlxuICB7L2lmfVxuXG4gIHsjaWYgaXNXYWl0aW5nfVxuICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+XG4gICAgICA8c3ZnIGNsYXNzPVwic3Bpbm5lcl9pY29uXCIgdmlld0JveD1cIjI1IDI1IDUwIDUwXCI+XG4gICAgICAgIDxjaXJjbGVcbiAgICAgICAgICBjbGFzcz1cInNwaW5uZXJfcGF0aFwiXG4gICAgICAgICAgY3g9XCI1MFwiXG4gICAgICAgICAgY3k9XCI1MFwiXG4gICAgICAgICAgcj1cIjIwXCJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICBzdHJva2Utd2lkdGg9XCI1XCJcbiAgICAgICAgICBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgLz5cbiAgICAgIDwvc3ZnPlxuICAgIDwvZGl2PlxuICB7L2lmfVxuPC9kaXY+XG4iLCI8c3R5bGU+XG4gICAgOmdsb2JhbChpbnB1dC5hdXRvY29tcGxldGUtaW5wdXQpIHtcbiAgICAgICAgbWFyZ2luOiAwLjllbTtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICB9XG4gICAgLnNlYXJjaCB7XG4gICAgICAgIHdpZHRoOiAxOGVtO1xuICAgICAgICBtYXJnaW46IDAuNmVtO1xuICAgICAgICAtLXBsYWNlaG9sZGVyQ29sb3I6ICM3M2Q1NmI7XG4gICAgICAgIC0tYm9yZGVyUmFkaXVzOiA0cHg7XG4gICAgICAgIC0tY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cbjwvc3R5bGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgZ290byB9IGZyb20gJ0BzYXBwZXIvYXBwJ1xuICAgIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnXG4gICAgaW1wb3J0IFNlbGVjdCBmcm9tICdzdmVsdGUtc2VsZWN0J1xuXG4gICAgbGV0IHNlbGVjdGVkVGVhXG4gICAgbGV0IHRlYXMgPSBbXVxuXG4gICAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS10ZWEub2lzaWZsb3J1cy5jb20vYXBpL3YxL3RlYXMnKVxuICAgICAgICBjb25zdCBub3JtYWxpemUgPSBzdHIgPT5cbiAgICAgICAgICAgIHN0ci5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKVxuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICB0ZWFzID0gKGF3YWl0IHJlcy5qc29uKCkpLmFwaVxuICAgICAgICAgICAgdGVhcyA9IHRlYXMubWFwKHRlYSA9PiAoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZWEuaWRlb2dyYW0sXG4gICAgICAgICAgICAgICAgbGFiZWw6IHRlYS5pZGVvZ3JhbSArICcgLSAnICsgbm9ybWFsaXplKHRlYS5waW55aW4pLFxuICAgICAgICAgICAgICAgIGdyb3VwOiB0ZWEudHlwZVxuICAgICAgICAgICAgfSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGV4dClcbiAgICAgICAgfVxuICAgIH0pXG48L3NjcmlwdD5cblxuPGRpdiBjbGFzcz1cInNlYXJjaFwiPlxuICAgIDxTZWxlY3RcbiAgICAgICAgaXRlbXM9XCJ7dGVhc31cIlxuICAgICAgICBiaW5kOnNlbGVjdGVkVGVhXG4gICAgICAgIHBsYWNlaG9sZGVyPVwicmVjaGVyY2hlXCJcbiAgICAgICAgZ3JvdXBCeT1cInt0ZWEgPT4gdGVhLmdyb3VwfVwiXG4gICAgICAgIG5vT3B0aW9uc01lc3NhZ2U9XCJhdWN1biB0aMOpIHRyb3V2w6lcIlxuICAgICAgICBvbjpzZWxlY3Q9XCJ7dGVhID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGAvZmljaGUtJHt0ZWEuZGV0YWlsLnZhbHVlfWApXG4gICAgICAgIH19XCJcbiAgICAgICAgaW5wdXRTdHlsZXM9XCJjdXJzb3I6IHRleHQ7XCJcbiAgICAvPlxuPC9kaXY+XG4iLCI8c3R5bGU+XG4gICAgbmF2IHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCA2MiwgMCwgMC4xKTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgcGFkZGluZzogMCAxZW07XG4gICAgfVxuXG4gICAgdWwge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxuXG4gICAgLyogY2xlYXJmaXggKi9cbiAgICB1bDo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGNsZWFyOiBib3RoO1xuICAgIH1cblxuICAgIGxpIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgIH1cblxuICAgIFthcmlhLWN1cnJlbnRdIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuXG4gICAgW2FyaWEtY3VycmVudF06OmFmdGVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDFlbSk7XG4gICAgICAgIGhlaWdodDogMnB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCA2MiwgMCk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBib3R0b206IC0xcHg7XG4gICAgfVxuXG4gICAgYSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4yZW07XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgcGFkZGluZzogMWVtIDAuNWVtO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG48L3N0eWxlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9TZWFyY2guc3ZlbHRlJ1xuICAgIGV4cG9ydCBsZXQgc2VnbWVudFxuPC9zY3JpcHQ+XG5cbjxuYXY+XG4gICAgPHVsPlxuICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGFyaWEtY3VycmVudD1cIntzZWdtZW50ID09PSB1bmRlZmluZWQgPyAncGFnZScgOiB1bmRlZmluZWR9XCJcbiAgICAgICAgICAgICAgICBocmVmPVwiLlwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgYWNjdWVpbFxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIHJlbD1cInByZWZldGNoXCJcbiAgICAgICAgICAgICAgICBhcmlhLWN1cnJlbnQ9XCJ7c2VnbWVudCA9PT0gJ2xpc3RlLWRlcy10aGVzLXRvdXMnID8gJ3BhZ2UnIDogdW5kZWZpbmVkfVwiXG4gICAgICAgICAgICAgICAgaHJlZj1cImxpc3RlLWRlcy10aGVzLXRvdXNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIGxpc3RlIGRlcyB0aMOpc1xuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIHJlbD1cInByZWZldGNoXCJcbiAgICAgICAgICAgICAgICBocmVmPVwiZG9jdW1lbnRhdGlvblwiXG4gICAgICAgICAgICAgICAgYXJpYS1jdXJyZW50PVwie3NlZ21lbnQgPT09ICdkb2N1bWVudGF0aW9uJyA/ICdwYWdlJyA6IHVuZGVmaW5lZH1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIGRvY3VtZW50YXRpb25cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpPlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICByZWw9XCJwcmVmZXRjaFwiXG4gICAgICAgICAgICAgICAgaHJlZj1cInRlcm1lc1wiXG4gICAgICAgICAgICAgICAgYXJpYS1jdXJyZW50PVwie3NlZ21lbnQgPT09ICd0ZXJtZXMnID8gJ3BhZ2UnIDogdW5kZWZpbmVkfVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgdGVybWVzXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxTZWFyY2ggLz5cbiAgICAgICAgPC9saT5cblxuICAgIDwvdWw+XG48L25hdj5cbiIsIjxzY3JpcHQ+XG4gICAgaW1wb3J0IE5hdiBmcm9tICcuLi9jb21wb25lbnRzL05hdi5zdmVsdGUnXG5cbiAgICBleHBvcnQgbGV0IHNlZ21lbnRcbjwvc2NyaXB0PlxuXG48bWFpbiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxOYXYge3NlZ21lbnR9IC8+XG4gICAgPGFydGljbGUgY2xhc3M9XCJibG9iQ29udGVudFwiIGRhdGEtdGl0bGU9XCJjb250ZW50XCI+XG4gICAgICAgIDxzbG90IC8+XG4gICAgPC9hcnRpY2xlPlxuPC9tYWluPlxuIiwiLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBTYXBwZXIg4oCUIGRvIG5vdCBlZGl0IGl0IVxuaW1wb3J0ICogYXMgcm91dGVfMCBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2RvY3VtZW50YXRpb24vaW5kZXguanNvbi5qc1wiO1xuaW1wb3J0ICogYXMgcm91dGVfMSBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2RvY3VtZW50YXRpb24vW3NsdWddLmpzb24uanNcIjtcbmltcG9ydCBjb21wb25lbnRfMCBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2luZGV4LnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF8xLCB7IHByZWxvYWQgYXMgcHJlbG9hZF8xIH0gZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9saXN0ZS1kZXMtdGhlcy1bdHlwZV0uc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzIgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ub3VzLWNvbnRhY3Rlci5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfMywgeyBwcmVsb2FkIGFzIHByZWxvYWRfMyB9IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvZG9jdW1lbnRhdGlvbi9pbmRleC5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfNCwgeyBwcmVsb2FkIGFzIHByZWxvYWRfNCB9IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvZG9jdW1lbnRhdGlvbi9bc2x1Z10uc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzUsIHsgcHJlbG9hZCBhcyBwcmVsb2FkXzUgfSBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2ZpY2hlLVtpZGVvZ3JhbV0uc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzYgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy90ZXJtZXMuc3ZlbHRlXCI7XG5pbXBvcnQgcm9vdCBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlXCI7XG5pbXBvcnQgZXJyb3IgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlXCI7XG5cbmNvbnN0IGQgPSBkZWNvZGVVUklDb21wb25lbnQ7XG5cbmV4cG9ydCBjb25zdCBtYW5pZmVzdCA9IHtcblx0c2VydmVyX3JvdXRlczogW1xuXHRcdHtcblx0XHRcdC8vIGRvY3VtZW50YXRpb24vaW5kZXguanNvbi5qc1xuXHRcdFx0cGF0dGVybjogL15cXC9kb2N1bWVudGF0aW9uLmpzb24kLyxcblx0XHRcdGhhbmRsZXJzOiByb3V0ZV8wLFxuXHRcdFx0cGFyYW1zOiAoKSA9PiAoe30pXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGRvY3VtZW50YXRpb24vW3NsdWddLmpzb24uanNcblx0XHRcdHBhdHRlcm46IC9eXFwvZG9jdW1lbnRhdGlvblxcLyhbXlxcL10rPykuanNvbiQvLFxuXHRcdFx0aGFuZGxlcnM6IHJvdXRlXzEsXG5cdFx0XHRwYXJhbXM6IG1hdGNoID0+ICh7IHNsdWc6IGQobWF0Y2hbMV0pIH0pXG5cdFx0fVxuXHRdLFxuXG5cdHBhZ2VzOiBbXG5cdFx0e1xuXHRcdFx0Ly8gaW5kZXguc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcLyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0eyBuYW1lOiBcImluZGV4XCIsIGZpbGU6IFwiaW5kZXguc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzAgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBsaXN0ZS1kZXMtdGhlcy1bdHlwZV0uc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2xpc3RlLWRlcy10aGVzLShbXlxcL10rPylcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwibGlzdGUkNDVkZXMkNDV0aGVzJDQ1JHR5cGVcIiwgZmlsZTogXCJsaXN0ZS1kZXMtdGhlcy1bdHlwZV0uc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzEsIHByZWxvYWQ6IHByZWxvYWRfMSwgcGFyYW1zOiBtYXRjaCA9PiAoeyB0eXBlOiBkKG1hdGNoWzFdKSB9KSB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIG5vdXMtY29udGFjdGVyLnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC9ub3VzLWNvbnRhY3RlclxcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJub3VzJDQ1Y29udGFjdGVyXCIsIGZpbGU6IFwibm91cy1jb250YWN0ZXIuc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzIgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBkb2N1bWVudGF0aW9uL2luZGV4LnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC9kb2N1bWVudGF0aW9uXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0eyBuYW1lOiBcImRvY3VtZW50YXRpb25cIiwgZmlsZTogXCJkb2N1bWVudGF0aW9uL2luZGV4LnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF8zLCBwcmVsb2FkOiBwcmVsb2FkXzMgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBkb2N1bWVudGF0aW9uL1tzbHVnXS5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvZG9jdW1lbnRhdGlvblxcLyhbXlxcL10rPylcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHR7IG5hbWU6IFwiZG9jdW1lbnRhdGlvbl8kc2x1Z1wiLCBmaWxlOiBcImRvY3VtZW50YXRpb24vW3NsdWddLnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF80LCBwcmVsb2FkOiBwcmVsb2FkXzQsIHBhcmFtczogbWF0Y2ggPT4gKHsgc2x1ZzogZChtYXRjaFsxXSkgfSkgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBmaWNoZS1baWRlb2dyYW1dLnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC9maWNoZS0oW15cXC9dKz8pXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0eyBuYW1lOiBcImZpY2hlJDQ1JGlkZW9ncmFtXCIsIGZpbGU6IFwiZmljaGUtW2lkZW9ncmFtXS5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfNSwgcHJlbG9hZDogcHJlbG9hZF81LCBwYXJhbXM6IG1hdGNoID0+ICh7IGlkZW9ncmFtOiBkKG1hdGNoWzFdKSB9KSB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIHRlcm1lcy5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvdGVybWVzXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0eyBuYW1lOiBcInRlcm1lc1wiLCBmaWxlOiBcInRlcm1lcy5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfNiB9XG5cdFx0XHRdXG5cdFx0fVxuXHRdLFxuXG5cdHJvb3QsXG5cdHJvb3RfcHJlbG9hZDogKCkgPT4ge30sXG5cdGVycm9yXG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRfZGlyID0gXCJfX3NhcHBlcl9fL2RldlwiO1xuXG5leHBvcnQgY29uc3Qgc3JjX2RpciA9IFwic3JjXCI7XG5cbmV4cG9ydCBjb25zdCBkZXYgPSB0cnVlOyIsImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRldiwgYnVpbGRfZGlyLCBzcmNfZGlyLCBtYW5pZmVzdCB9IGZyb20gJy4vaW50ZXJuYWwvbWFuaWZlc3Qtc2VydmVyJztcbmltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcbmltcG9ydCBTdHJlYW0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCB6bGliIGZyb20gJ3psaWInO1xuaW1wb3J0IEFwcCBmcm9tICcuL2ludGVybmFsL0FwcC5zdmVsdGUnO1xuXG4vKipcbiAqIEBwYXJhbSB0eXBlTWFwIFtPYmplY3RdIE1hcCBvZiBNSU1FIHR5cGUgLT4gQXJyYXlbZXh0ZW5zaW9uc11cbiAqIEBwYXJhbSAuLi5cbiAqL1xuZnVuY3Rpb24gTWltZSgpIHtcbiAgdGhpcy5fdHlwZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9leHRlbnNpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMuZGVmaW5lKGFyZ3VtZW50c1tpXSk7XG4gIH1cblxuICB0aGlzLmRlZmluZSA9IHRoaXMuZGVmaW5lLmJpbmQodGhpcyk7XG4gIHRoaXMuZ2V0VHlwZSA9IHRoaXMuZ2V0VHlwZS5iaW5kKHRoaXMpO1xuICB0aGlzLmdldEV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uLmJpbmQodGhpcyk7XG59XG5cbi8qKlxuICogRGVmaW5lIG1pbWV0eXBlIC0+IGV4dGVuc2lvbiBtYXBwaW5ncy4gIEVhY2gga2V5IGlzIGEgbWltZS10eXBlIHRoYXQgbWFwc1xuICogdG8gYW4gYXJyYXkgb2YgZXh0ZW5zaW9ucyBhc3NvY2lhdGVkIHdpdGggdGhlIHR5cGUuICBUaGUgZmlyc3QgZXh0ZW5zaW9uIGlzXG4gKiB1c2VkIGFzIHRoZSBkZWZhdWx0IGV4dGVuc2lvbiBmb3IgdGhlIHR5cGUuXG4gKlxuICogZS5nLiBtaW1lLmRlZmluZSh7J2F1ZGlvL29nZycsIFsnb2dhJywgJ29nZycsICdzcHgnXX0pO1xuICpcbiAqIElmIGEgdHlwZSBkZWNsYXJlcyBhbiBleHRlbnNpb24gdGhhdCBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQsIGFuIGVycm9yIHdpbGxcbiAqIGJlIHRocm93bi4gIFRvIHN1cHByZXNzIHRoaXMgZXJyb3IgYW5kIGZvcmNlIHRoZSBleHRlbnNpb24gdG8gYmUgYXNzb2NpYXRlZFxuICogd2l0aCB0aGUgbmV3IHR5cGUsIHBhc3MgYGZvcmNlYD10cnVlLiAgQWx0ZXJuYXRpdmVseSwgeW91IG1heSBwcmVmaXggdGhlXG4gKiBleHRlbnNpb24gd2l0aCBcIipcIiB0byBtYXAgdGhlIHR5cGUgdG8gZXh0ZW5zaW9uLCB3aXRob3V0IG1hcHBpbmcgdGhlXG4gKiBleHRlbnNpb24gdG8gdGhlIHR5cGUuXG4gKlxuICogZS5nLiBtaW1lLmRlZmluZSh7J2F1ZGlvL3dhdicsIFsnd2F2J119LCB7J2F1ZGlvL3gtd2F2JywgWycqd2F2J119KTtcbiAqXG4gKlxuICogQHBhcmFtIG1hcCAoT2JqZWN0KSB0eXBlIGRlZmluaXRpb25zXG4gKiBAcGFyYW0gZm9yY2UgKEJvb2xlYW4pIGlmIHRydWUsIGZvcmNlIG92ZXJyaWRpbmcgb2YgZXhpc3RpbmcgZGVmaW5pdGlvbnNcbiAqL1xuTWltZS5wcm90b3R5cGUuZGVmaW5lID0gZnVuY3Rpb24odHlwZU1hcCwgZm9yY2UpIHtcbiAgZm9yICh2YXIgdHlwZSBpbiB0eXBlTWFwKSB7XG4gICAgdmFyIGV4dGVuc2lvbnMgPSB0eXBlTWFwW3R5cGVdLm1hcChmdW5jdGlvbih0KSB7cmV0dXJuIHQudG9Mb3dlckNhc2UoKX0pO1xuICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4dGVuc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBleHQgPSBleHRlbnNpb25zW2ldO1xuXG4gICAgICAvLyAnKicgcHJlZml4ID0gbm90IHRoZSBwcmVmZXJyZWQgdHlwZSBmb3IgdGhpcyBleHRlbnNpb24uICBTbyBmaXh1cCB0aGVcbiAgICAgIC8vIGV4dGVuc2lvbiwgYW5kIHNraXAgaXQuXG4gICAgICBpZiAoZXh0WzBdID09ICcqJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFmb3JjZSAmJiAoZXh0IGluIHRoaXMuX3R5cGVzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0F0dGVtcHQgdG8gY2hhbmdlIG1hcHBpbmcgZm9yIFwiJyArIGV4dCArXG4gICAgICAgICAgJ1wiIGV4dGVuc2lvbiBmcm9tIFwiJyArIHRoaXMuX3R5cGVzW2V4dF0gKyAnXCIgdG8gXCInICsgdHlwZSArXG4gICAgICAgICAgJ1wiLiBQYXNzIGBmb3JjZT10cnVlYCB0byBhbGxvdyB0aGlzLCBvdGhlcndpc2UgcmVtb3ZlIFwiJyArIGV4dCArXG4gICAgICAgICAgJ1wiIGZyb20gdGhlIGxpc3Qgb2YgZXh0ZW5zaW9ucyBmb3IgXCInICsgdHlwZSArICdcIi4nXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3R5cGVzW2V4dF0gPSB0eXBlO1xuICAgIH1cblxuICAgIC8vIFVzZSBmaXJzdCBleHRlbnNpb24gYXMgZGVmYXVsdFxuICAgIGlmIChmb3JjZSB8fCAhdGhpcy5fZXh0ZW5zaW9uc1t0eXBlXSkge1xuICAgICAgdmFyIGV4dCA9IGV4dGVuc2lvbnNbMF07XG4gICAgICB0aGlzLl9leHRlbnNpb25zW3R5cGVdID0gKGV4dFswXSAhPSAnKicpID8gZXh0IDogZXh0LnN1YnN0cigxKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogTG9va3VwIGEgbWltZSB0eXBlIGJhc2VkIG9uIGV4dGVuc2lvblxuICovXG5NaW1lLnByb3RvdHlwZS5nZXRUeXBlID0gZnVuY3Rpb24ocGF0aCkge1xuICBwYXRoID0gU3RyaW5nKHBhdGgpO1xuICB2YXIgbGFzdCA9IHBhdGgucmVwbGFjZSgvXi4qWy9cXFxcXS8sICcnKS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgZXh0ID0gbGFzdC5yZXBsYWNlKC9eLipcXC4vLCAnJykudG9Mb3dlckNhc2UoKTtcblxuICB2YXIgaGFzUGF0aCA9IGxhc3QubGVuZ3RoIDwgcGF0aC5sZW5ndGg7XG4gIHZhciBoYXNEb3QgPSBleHQubGVuZ3RoIDwgbGFzdC5sZW5ndGggLSAxO1xuXG4gIHJldHVybiAoaGFzRG90IHx8ICFoYXNQYXRoKSAmJiB0aGlzLl90eXBlc1tleHRdIHx8IG51bGw7XG59O1xuXG4vKipcbiAqIFJldHVybiBmaWxlIGV4dGVuc2lvbiBhc3NvY2lhdGVkIHdpdGggYSBtaW1lIHR5cGVcbiAqL1xuTWltZS5wcm90b3R5cGUuZ2V0RXh0ZW5zaW9uID0gZnVuY3Rpb24odHlwZSkge1xuICB0eXBlID0gL15cXHMqKFteO1xcc10qKS8udGVzdCh0eXBlKSAmJiBSZWdFeHAuJDE7XG4gIHJldHVybiB0eXBlICYmIHRoaXMuX2V4dGVuc2lvbnNbdHlwZS50b0xvd2VyQ2FzZSgpXSB8fCBudWxsO1xufTtcblxudmFyIE1pbWVfMSA9IE1pbWU7XG5cbnZhciBzdGFuZGFyZCA9IHtcImFwcGxpY2F0aW9uL2FuZHJldy1pbnNldFwiOltcImV6XCJdLFwiYXBwbGljYXRpb24vYXBwbGl4d2FyZVwiOltcImF3XCJdLFwiYXBwbGljYXRpb24vYXRvbSt4bWxcIjpbXCJhdG9tXCJdLFwiYXBwbGljYXRpb24vYXRvbWNhdCt4bWxcIjpbXCJhdG9tY2F0XCJdLFwiYXBwbGljYXRpb24vYXRvbXN2Yyt4bWxcIjpbXCJhdG9tc3ZjXCJdLFwiYXBwbGljYXRpb24vYmRvY1wiOltcImJkb2NcIl0sXCJhcHBsaWNhdGlvbi9jY3htbCt4bWxcIjpbXCJjY3htbFwiXSxcImFwcGxpY2F0aW9uL2NkbWktY2FwYWJpbGl0eVwiOltcImNkbWlhXCJdLFwiYXBwbGljYXRpb24vY2RtaS1jb250YWluZXJcIjpbXCJjZG1pY1wiXSxcImFwcGxpY2F0aW9uL2NkbWktZG9tYWluXCI6W1wiY2RtaWRcIl0sXCJhcHBsaWNhdGlvbi9jZG1pLW9iamVjdFwiOltcImNkbWlvXCJdLFwiYXBwbGljYXRpb24vY2RtaS1xdWV1ZVwiOltcImNkbWlxXCJdLFwiYXBwbGljYXRpb24vY3Utc2VlbWVcIjpbXCJjdVwiXSxcImFwcGxpY2F0aW9uL2Rhc2greG1sXCI6W1wibXBkXCJdLFwiYXBwbGljYXRpb24vZGF2bW91bnQreG1sXCI6W1wiZGF2bW91bnRcIl0sXCJhcHBsaWNhdGlvbi9kb2Nib29rK3htbFwiOltcImRia1wiXSxcImFwcGxpY2F0aW9uL2Rzc2MrZGVyXCI6W1wiZHNzY1wiXSxcImFwcGxpY2F0aW9uL2Rzc2MreG1sXCI6W1wieGRzc2NcIl0sXCJhcHBsaWNhdGlvbi9lY21hc2NyaXB0XCI6W1wiZWNtYVwiLFwiZXNcIl0sXCJhcHBsaWNhdGlvbi9lbW1hK3htbFwiOltcImVtbWFcIl0sXCJhcHBsaWNhdGlvbi9lcHViK3ppcFwiOltcImVwdWJcIl0sXCJhcHBsaWNhdGlvbi9leGlcIjpbXCJleGlcIl0sXCJhcHBsaWNhdGlvbi9mb250LXRkcGZyXCI6W1wicGZyXCJdLFwiYXBwbGljYXRpb24vZ2VvK2pzb25cIjpbXCJnZW9qc29uXCJdLFwiYXBwbGljYXRpb24vZ21sK3htbFwiOltcImdtbFwiXSxcImFwcGxpY2F0aW9uL2dweCt4bWxcIjpbXCJncHhcIl0sXCJhcHBsaWNhdGlvbi9neGZcIjpbXCJneGZcIl0sXCJhcHBsaWNhdGlvbi9nemlwXCI6W1wiZ3pcIl0sXCJhcHBsaWNhdGlvbi9oanNvblwiOltcImhqc29uXCJdLFwiYXBwbGljYXRpb24vaHlwZXJzdHVkaW9cIjpbXCJzdGtcIl0sXCJhcHBsaWNhdGlvbi9pbmttbCt4bWxcIjpbXCJpbmtcIixcImlua21sXCJdLFwiYXBwbGljYXRpb24vaXBmaXhcIjpbXCJpcGZpeFwiXSxcImFwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZVwiOltcImphclwiLFwid2FyXCIsXCJlYXJcIl0sXCJhcHBsaWNhdGlvbi9qYXZhLXNlcmlhbGl6ZWQtb2JqZWN0XCI6W1wic2VyXCJdLFwiYXBwbGljYXRpb24vamF2YS12bVwiOltcImNsYXNzXCJdLFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiOltcImpzXCIsXCJtanNcIl0sXCJhcHBsaWNhdGlvbi9qc29uXCI6W1wianNvblwiLFwibWFwXCJdLFwiYXBwbGljYXRpb24vanNvbjVcIjpbXCJqc29uNVwiXSxcImFwcGxpY2F0aW9uL2pzb25tbCtqc29uXCI6W1wianNvbm1sXCJdLFwiYXBwbGljYXRpb24vbGQranNvblwiOltcImpzb25sZFwiXSxcImFwcGxpY2F0aW9uL2xvc3QreG1sXCI6W1wibG9zdHhtbFwiXSxcImFwcGxpY2F0aW9uL21hYy1iaW5oZXg0MFwiOltcImhxeFwiXSxcImFwcGxpY2F0aW9uL21hYy1jb21wYWN0cHJvXCI6W1wiY3B0XCJdLFwiYXBwbGljYXRpb24vbWFkcyt4bWxcIjpbXCJtYWRzXCJdLFwiYXBwbGljYXRpb24vbWFuaWZlc3QranNvblwiOltcIndlYm1hbmlmZXN0XCJdLFwiYXBwbGljYXRpb24vbWFyY1wiOltcIm1yY1wiXSxcImFwcGxpY2F0aW9uL21hcmN4bWwreG1sXCI6W1wibXJjeFwiXSxcImFwcGxpY2F0aW9uL21hdGhlbWF0aWNhXCI6W1wibWFcIixcIm5iXCIsXCJtYlwiXSxcImFwcGxpY2F0aW9uL21hdGhtbCt4bWxcIjpbXCJtYXRobWxcIl0sXCJhcHBsaWNhdGlvbi9tYm94XCI6W1wibWJveFwiXSxcImFwcGxpY2F0aW9uL21lZGlhc2VydmVyY29udHJvbCt4bWxcIjpbXCJtc2NtbFwiXSxcImFwcGxpY2F0aW9uL21ldGFsaW5rK3htbFwiOltcIm1ldGFsaW5rXCJdLFwiYXBwbGljYXRpb24vbWV0YWxpbms0K3htbFwiOltcIm1ldGE0XCJdLFwiYXBwbGljYXRpb24vbWV0cyt4bWxcIjpbXCJtZXRzXCJdLFwiYXBwbGljYXRpb24vbW9kcyt4bWxcIjpbXCJtb2RzXCJdLFwiYXBwbGljYXRpb24vbXAyMVwiOltcIm0yMVwiLFwibXAyMVwiXSxcImFwcGxpY2F0aW9uL21wNFwiOltcIm1wNHNcIixcIm00cFwiXSxcImFwcGxpY2F0aW9uL21zd29yZFwiOltcImRvY1wiLFwiZG90XCJdLFwiYXBwbGljYXRpb24vbXhmXCI6W1wibXhmXCJdLFwiYXBwbGljYXRpb24vbi1xdWFkc1wiOltcIm5xXCJdLFwiYXBwbGljYXRpb24vbi10cmlwbGVzXCI6W1wibnRcIl0sXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIjpbXCJiaW5cIixcImRtc1wiLFwibHJmXCIsXCJtYXJcIixcInNvXCIsXCJkaXN0XCIsXCJkaXN0elwiLFwicGtnXCIsXCJicGtcIixcImR1bXBcIixcImVsY1wiLFwiZGVwbG95XCIsXCJleGVcIixcImRsbFwiLFwiZGViXCIsXCJkbWdcIixcImlzb1wiLFwiaW1nXCIsXCJtc2lcIixcIm1zcFwiLFwibXNtXCIsXCJidWZmZXJcIl0sXCJhcHBsaWNhdGlvbi9vZGFcIjpbXCJvZGFcIl0sXCJhcHBsaWNhdGlvbi9vZWJwcy1wYWNrYWdlK3htbFwiOltcIm9wZlwiXSxcImFwcGxpY2F0aW9uL29nZ1wiOltcIm9neFwiXSxcImFwcGxpY2F0aW9uL29tZG9jK3htbFwiOltcIm9tZG9jXCJdLFwiYXBwbGljYXRpb24vb25lbm90ZVwiOltcIm9uZXRvY1wiLFwib25ldG9jMlwiLFwib25ldG1wXCIsXCJvbmVwa2dcIl0sXCJhcHBsaWNhdGlvbi9veHBzXCI6W1wib3hwc1wiXSxcImFwcGxpY2F0aW9uL3BhdGNoLW9wcy1lcnJvcit4bWxcIjpbXCJ4ZXJcIl0sXCJhcHBsaWNhdGlvbi9wZGZcIjpbXCJwZGZcIl0sXCJhcHBsaWNhdGlvbi9wZ3AtZW5jcnlwdGVkXCI6W1wicGdwXCJdLFwiYXBwbGljYXRpb24vcGdwLXNpZ25hdHVyZVwiOltcImFzY1wiLFwic2lnXCJdLFwiYXBwbGljYXRpb24vcGljcy1ydWxlc1wiOltcInByZlwiXSxcImFwcGxpY2F0aW9uL3BrY3MxMFwiOltcInAxMFwiXSxcImFwcGxpY2F0aW9uL3BrY3M3LW1pbWVcIjpbXCJwN21cIixcInA3Y1wiXSxcImFwcGxpY2F0aW9uL3BrY3M3LXNpZ25hdHVyZVwiOltcInA3c1wiXSxcImFwcGxpY2F0aW9uL3BrY3M4XCI6W1wicDhcIl0sXCJhcHBsaWNhdGlvbi9wa2l4LWF0dHItY2VydFwiOltcImFjXCJdLFwiYXBwbGljYXRpb24vcGtpeC1jZXJ0XCI6W1wiY2VyXCJdLFwiYXBwbGljYXRpb24vcGtpeC1jcmxcIjpbXCJjcmxcIl0sXCJhcHBsaWNhdGlvbi9wa2l4LXBraXBhdGhcIjpbXCJwa2lwYXRoXCJdLFwiYXBwbGljYXRpb24vcGtpeGNtcFwiOltcInBraVwiXSxcImFwcGxpY2F0aW9uL3Bscyt4bWxcIjpbXCJwbHNcIl0sXCJhcHBsaWNhdGlvbi9wb3N0c2NyaXB0XCI6W1wiYWlcIixcImVwc1wiLFwicHNcIl0sXCJhcHBsaWNhdGlvbi9wc2tjK3htbFwiOltcInBza2N4bWxcIl0sXCJhcHBsaWNhdGlvbi9yYW1sK3lhbWxcIjpbXCJyYW1sXCJdLFwiYXBwbGljYXRpb24vcmRmK3htbFwiOltcInJkZlwiLFwib3dsXCJdLFwiYXBwbGljYXRpb24vcmVnaW5mbyt4bWxcIjpbXCJyaWZcIl0sXCJhcHBsaWNhdGlvbi9yZWxheC1uZy1jb21wYWN0LXN5bnRheFwiOltcInJuY1wiXSxcImFwcGxpY2F0aW9uL3Jlc291cmNlLWxpc3RzK3htbFwiOltcInJsXCJdLFwiYXBwbGljYXRpb24vcmVzb3VyY2UtbGlzdHMtZGlmZit4bWxcIjpbXCJybGRcIl0sXCJhcHBsaWNhdGlvbi9ybHMtc2VydmljZXMreG1sXCI6W1wicnNcIl0sXCJhcHBsaWNhdGlvbi9ycGtpLWdob3N0YnVzdGVyc1wiOltcImdiclwiXSxcImFwcGxpY2F0aW9uL3Jwa2ktbWFuaWZlc3RcIjpbXCJtZnRcIl0sXCJhcHBsaWNhdGlvbi9ycGtpLXJvYVwiOltcInJvYVwiXSxcImFwcGxpY2F0aW9uL3JzZCt4bWxcIjpbXCJyc2RcIl0sXCJhcHBsaWNhdGlvbi9yc3MreG1sXCI6W1wicnNzXCJdLFwiYXBwbGljYXRpb24vcnRmXCI6W1wicnRmXCJdLFwiYXBwbGljYXRpb24vc2JtbCt4bWxcIjpbXCJzYm1sXCJdLFwiYXBwbGljYXRpb24vc2N2cC1jdi1yZXF1ZXN0XCI6W1wic2NxXCJdLFwiYXBwbGljYXRpb24vc2N2cC1jdi1yZXNwb25zZVwiOltcInNjc1wiXSxcImFwcGxpY2F0aW9uL3NjdnAtdnAtcmVxdWVzdFwiOltcInNwcVwiXSxcImFwcGxpY2F0aW9uL3NjdnAtdnAtcmVzcG9uc2VcIjpbXCJzcHBcIl0sXCJhcHBsaWNhdGlvbi9zZHBcIjpbXCJzZHBcIl0sXCJhcHBsaWNhdGlvbi9zZXQtcGF5bWVudC1pbml0aWF0aW9uXCI6W1wic2V0cGF5XCJdLFwiYXBwbGljYXRpb24vc2V0LXJlZ2lzdHJhdGlvbi1pbml0aWF0aW9uXCI6W1wic2V0cmVnXCJdLFwiYXBwbGljYXRpb24vc2hmK3htbFwiOltcInNoZlwiXSxcImFwcGxpY2F0aW9uL3NpZXZlXCI6W1wic2l2XCIsXCJzaWV2ZVwiXSxcImFwcGxpY2F0aW9uL3NtaWwreG1sXCI6W1wic21pXCIsXCJzbWlsXCJdLFwiYXBwbGljYXRpb24vc3BhcnFsLXF1ZXJ5XCI6W1wicnFcIl0sXCJhcHBsaWNhdGlvbi9zcGFycWwtcmVzdWx0cyt4bWxcIjpbXCJzcnhcIl0sXCJhcHBsaWNhdGlvbi9zcmdzXCI6W1wiZ3JhbVwiXSxcImFwcGxpY2F0aW9uL3NyZ3MreG1sXCI6W1wiZ3J4bWxcIl0sXCJhcHBsaWNhdGlvbi9zcnUreG1sXCI6W1wic3J1XCJdLFwiYXBwbGljYXRpb24vc3NkbCt4bWxcIjpbXCJzc2RsXCJdLFwiYXBwbGljYXRpb24vc3NtbCt4bWxcIjpbXCJzc21sXCJdLFwiYXBwbGljYXRpb24vdGVpK3htbFwiOltcInRlaVwiLFwidGVpY29ycHVzXCJdLFwiYXBwbGljYXRpb24vdGhyYXVkK3htbFwiOltcInRmaVwiXSxcImFwcGxpY2F0aW9uL3RpbWVzdGFtcGVkLWRhdGFcIjpbXCJ0c2RcIl0sXCJhcHBsaWNhdGlvbi92b2ljZXhtbCt4bWxcIjpbXCJ2eG1sXCJdLFwiYXBwbGljYXRpb24vd2FzbVwiOltcIndhc21cIl0sXCJhcHBsaWNhdGlvbi93aWRnZXRcIjpbXCJ3Z3RcIl0sXCJhcHBsaWNhdGlvbi93aW5obHBcIjpbXCJobHBcIl0sXCJhcHBsaWNhdGlvbi93c2RsK3htbFwiOltcIndzZGxcIl0sXCJhcHBsaWNhdGlvbi93c3BvbGljeSt4bWxcIjpbXCJ3c3BvbGljeVwiXSxcImFwcGxpY2F0aW9uL3hhbWwreG1sXCI6W1wieGFtbFwiXSxcImFwcGxpY2F0aW9uL3hjYXAtZGlmZit4bWxcIjpbXCJ4ZGZcIl0sXCJhcHBsaWNhdGlvbi94ZW5jK3htbFwiOltcInhlbmNcIl0sXCJhcHBsaWNhdGlvbi94aHRtbCt4bWxcIjpbXCJ4aHRtbFwiLFwieGh0XCJdLFwiYXBwbGljYXRpb24veG1sXCI6W1wieG1sXCIsXCJ4c2xcIixcInhzZFwiLFwicm5nXCJdLFwiYXBwbGljYXRpb24veG1sLWR0ZFwiOltcImR0ZFwiXSxcImFwcGxpY2F0aW9uL3hvcCt4bWxcIjpbXCJ4b3BcIl0sXCJhcHBsaWNhdGlvbi94cHJvYyt4bWxcIjpbXCJ4cGxcIl0sXCJhcHBsaWNhdGlvbi94c2x0K3htbFwiOltcInhzbHRcIl0sXCJhcHBsaWNhdGlvbi94c3BmK3htbFwiOltcInhzcGZcIl0sXCJhcHBsaWNhdGlvbi94dit4bWxcIjpbXCJteG1sXCIsXCJ4aHZtbFwiLFwieHZtbFwiLFwieHZtXCJdLFwiYXBwbGljYXRpb24veWFuZ1wiOltcInlhbmdcIl0sXCJhcHBsaWNhdGlvbi95aW4reG1sXCI6W1wieWluXCJdLFwiYXBwbGljYXRpb24vemlwXCI6W1wiemlwXCJdLFwiYXVkaW8vM2dwcFwiOltcIiozZ3BwXCJdLFwiYXVkaW8vYWRwY21cIjpbXCJhZHBcIl0sXCJhdWRpby9iYXNpY1wiOltcImF1XCIsXCJzbmRcIl0sXCJhdWRpby9taWRpXCI6W1wibWlkXCIsXCJtaWRpXCIsXCJrYXJcIixcInJtaVwiXSxcImF1ZGlvL21wM1wiOltcIiptcDNcIl0sXCJhdWRpby9tcDRcIjpbXCJtNGFcIixcIm1wNGFcIl0sXCJhdWRpby9tcGVnXCI6W1wibXBnYVwiLFwibXAyXCIsXCJtcDJhXCIsXCJtcDNcIixcIm0yYVwiLFwibTNhXCJdLFwiYXVkaW8vb2dnXCI6W1wib2dhXCIsXCJvZ2dcIixcInNweFwiXSxcImF1ZGlvL3MzbVwiOltcInMzbVwiXSxcImF1ZGlvL3NpbGtcIjpbXCJzaWxcIl0sXCJhdWRpby93YXZcIjpbXCJ3YXZcIl0sXCJhdWRpby93YXZlXCI6W1wiKndhdlwiXSxcImF1ZGlvL3dlYm1cIjpbXCJ3ZWJhXCJdLFwiYXVkaW8veG1cIjpbXCJ4bVwiXSxcImZvbnQvY29sbGVjdGlvblwiOltcInR0Y1wiXSxcImZvbnQvb3RmXCI6W1wib3RmXCJdLFwiZm9udC90dGZcIjpbXCJ0dGZcIl0sXCJmb250L3dvZmZcIjpbXCJ3b2ZmXCJdLFwiZm9udC93b2ZmMlwiOltcIndvZmYyXCJdLFwiaW1hZ2UvYWNlc1wiOltcImV4clwiXSxcImltYWdlL2FwbmdcIjpbXCJhcG5nXCJdLFwiaW1hZ2UvYm1wXCI6W1wiYm1wXCJdLFwiaW1hZ2UvY2dtXCI6W1wiY2dtXCJdLFwiaW1hZ2UvZGljb20tcmxlXCI6W1wiZHJsZVwiXSxcImltYWdlL2VtZlwiOltcImVtZlwiXSxcImltYWdlL2ZpdHNcIjpbXCJmaXRzXCJdLFwiaW1hZ2UvZzNmYXhcIjpbXCJnM1wiXSxcImltYWdlL2dpZlwiOltcImdpZlwiXSxcImltYWdlL2hlaWNcIjpbXCJoZWljXCJdLFwiaW1hZ2UvaGVpYy1zZXF1ZW5jZVwiOltcImhlaWNzXCJdLFwiaW1hZ2UvaGVpZlwiOltcImhlaWZcIl0sXCJpbWFnZS9oZWlmLXNlcXVlbmNlXCI6W1wiaGVpZnNcIl0sXCJpbWFnZS9pZWZcIjpbXCJpZWZcIl0sXCJpbWFnZS9qbHNcIjpbXCJqbHNcIl0sXCJpbWFnZS9qcDJcIjpbXCJqcDJcIixcImpwZzJcIl0sXCJpbWFnZS9qcGVnXCI6W1wianBlZ1wiLFwianBnXCIsXCJqcGVcIl0sXCJpbWFnZS9qcG1cIjpbXCJqcG1cIl0sXCJpbWFnZS9qcHhcIjpbXCJqcHhcIixcImpwZlwiXSxcImltYWdlL2p4clwiOltcImp4clwiXSxcImltYWdlL2t0eFwiOltcImt0eFwiXSxcImltYWdlL3BuZ1wiOltcInBuZ1wiXSxcImltYWdlL3NnaVwiOltcInNnaVwiXSxcImltYWdlL3N2Zyt4bWxcIjpbXCJzdmdcIixcInN2Z3pcIl0sXCJpbWFnZS90MzhcIjpbXCJ0MzhcIl0sXCJpbWFnZS90aWZmXCI6W1widGlmXCIsXCJ0aWZmXCJdLFwiaW1hZ2UvdGlmZi1meFwiOltcInRmeFwiXSxcImltYWdlL3dlYnBcIjpbXCJ3ZWJwXCJdLFwiaW1hZ2Uvd21mXCI6W1wid21mXCJdLFwibWVzc2FnZS9kaXNwb3NpdGlvbi1ub3RpZmljYXRpb25cIjpbXCJkaXNwb3NpdGlvbi1ub3RpZmljYXRpb25cIl0sXCJtZXNzYWdlL2dsb2JhbFwiOltcInU4bXNnXCJdLFwibWVzc2FnZS9nbG9iYWwtZGVsaXZlcnktc3RhdHVzXCI6W1widThkc25cIl0sXCJtZXNzYWdlL2dsb2JhbC1kaXNwb3NpdGlvbi1ub3RpZmljYXRpb25cIjpbXCJ1OG1kblwiXSxcIm1lc3NhZ2UvZ2xvYmFsLWhlYWRlcnNcIjpbXCJ1OGhkclwiXSxcIm1lc3NhZ2UvcmZjODIyXCI6W1wiZW1sXCIsXCJtaW1lXCJdLFwibW9kZWwvM21mXCI6W1wiM21mXCJdLFwibW9kZWwvZ2x0Zitqc29uXCI6W1wiZ2x0ZlwiXSxcIm1vZGVsL2dsdGYtYmluYXJ5XCI6W1wiZ2xiXCJdLFwibW9kZWwvaWdlc1wiOltcImlnc1wiLFwiaWdlc1wiXSxcIm1vZGVsL21lc2hcIjpbXCJtc2hcIixcIm1lc2hcIixcInNpbG9cIl0sXCJtb2RlbC9zdGxcIjpbXCJzdGxcIl0sXCJtb2RlbC92cm1sXCI6W1wid3JsXCIsXCJ2cm1sXCJdLFwibW9kZWwveDNkK2JpbmFyeVwiOltcIip4M2RiXCIsXCJ4M2RielwiXSxcIm1vZGVsL3gzZCtmYXN0aW5mb3NldFwiOltcIngzZGJcIl0sXCJtb2RlbC94M2QrdnJtbFwiOltcIip4M2R2XCIsXCJ4M2R2elwiXSxcIm1vZGVsL3gzZCt4bWxcIjpbXCJ4M2RcIixcIngzZHpcIl0sXCJtb2RlbC94M2QtdnJtbFwiOltcIngzZHZcIl0sXCJ0ZXh0L2NhY2hlLW1hbmlmZXN0XCI6W1wiYXBwY2FjaGVcIixcIm1hbmlmZXN0XCJdLFwidGV4dC9jYWxlbmRhclwiOltcImljc1wiLFwiaWZiXCJdLFwidGV4dC9jb2ZmZWVzY3JpcHRcIjpbXCJjb2ZmZWVcIixcImxpdGNvZmZlZVwiXSxcInRleHQvY3NzXCI6W1wiY3NzXCJdLFwidGV4dC9jc3ZcIjpbXCJjc3ZcIl0sXCJ0ZXh0L2h0bWxcIjpbXCJodG1sXCIsXCJodG1cIixcInNodG1sXCJdLFwidGV4dC9qYWRlXCI6W1wiamFkZVwiXSxcInRleHQvanN4XCI6W1wianN4XCJdLFwidGV4dC9sZXNzXCI6W1wibGVzc1wiXSxcInRleHQvbWFya2Rvd25cIjpbXCJtYXJrZG93blwiLFwibWRcIl0sXCJ0ZXh0L21hdGhtbFwiOltcIm1tbFwiXSxcInRleHQvbWR4XCI6W1wibWR4XCJdLFwidGV4dC9uM1wiOltcIm4zXCJdLFwidGV4dC9wbGFpblwiOltcInR4dFwiLFwidGV4dFwiLFwiY29uZlwiLFwiZGVmXCIsXCJsaXN0XCIsXCJsb2dcIixcImluXCIsXCJpbmlcIl0sXCJ0ZXh0L3JpY2h0ZXh0XCI6W1wicnR4XCJdLFwidGV4dC9ydGZcIjpbXCIqcnRmXCJdLFwidGV4dC9zZ21sXCI6W1wic2dtbFwiLFwic2dtXCJdLFwidGV4dC9zaGV4XCI6W1wic2hleFwiXSxcInRleHQvc2xpbVwiOltcInNsaW1cIixcInNsbVwiXSxcInRleHQvc3R5bHVzXCI6W1wic3R5bHVzXCIsXCJzdHlsXCJdLFwidGV4dC90YWItc2VwYXJhdGVkLXZhbHVlc1wiOltcInRzdlwiXSxcInRleHQvdHJvZmZcIjpbXCJ0XCIsXCJ0clwiLFwicm9mZlwiLFwibWFuXCIsXCJtZVwiLFwibXNcIl0sXCJ0ZXh0L3R1cnRsZVwiOltcInR0bFwiXSxcInRleHQvdXJpLWxpc3RcIjpbXCJ1cmlcIixcInVyaXNcIixcInVybHNcIl0sXCJ0ZXh0L3ZjYXJkXCI6W1widmNhcmRcIl0sXCJ0ZXh0L3Z0dFwiOltcInZ0dFwiXSxcInRleHQveG1sXCI6W1wiKnhtbFwiXSxcInRleHQveWFtbFwiOltcInlhbWxcIixcInltbFwiXSxcInZpZGVvLzNncHBcIjpbXCIzZ3BcIixcIjNncHBcIl0sXCJ2aWRlby8zZ3BwMlwiOltcIjNnMlwiXSxcInZpZGVvL2gyNjFcIjpbXCJoMjYxXCJdLFwidmlkZW8vaDI2M1wiOltcImgyNjNcIl0sXCJ2aWRlby9oMjY0XCI6W1wiaDI2NFwiXSxcInZpZGVvL2pwZWdcIjpbXCJqcGd2XCJdLFwidmlkZW8vanBtXCI6W1wiKmpwbVwiLFwianBnbVwiXSxcInZpZGVvL21qMlwiOltcIm1qMlwiLFwibWpwMlwiXSxcInZpZGVvL21wMnRcIjpbXCJ0c1wiXSxcInZpZGVvL21wNFwiOltcIm1wNFwiLFwibXA0dlwiLFwibXBnNFwiXSxcInZpZGVvL21wZWdcIjpbXCJtcGVnXCIsXCJtcGdcIixcIm1wZVwiLFwibTF2XCIsXCJtMnZcIl0sXCJ2aWRlby9vZ2dcIjpbXCJvZ3ZcIl0sXCJ2aWRlby9xdWlja3RpbWVcIjpbXCJxdFwiLFwibW92XCJdLFwidmlkZW8vd2VibVwiOltcIndlYm1cIl19O1xuXG52YXIgbGl0ZSA9IG5ldyBNaW1lXzEoc3RhbmRhcmQpO1xuXG5mdW5jdGlvbiBnZXRfc2VydmVyX3JvdXRlX2hhbmRsZXIocm91dGVzKSB7XG5cdGFzeW5jIGZ1bmN0aW9uIGhhbmRsZV9yb3V0ZShyb3V0ZSwgcmVxLCByZXMsIG5leHQpIHtcblx0XHRyZXEucGFyYW1zID0gcm91dGUucGFyYW1zKHJvdXRlLnBhdHRlcm4uZXhlYyhyZXEucGF0aCkpO1xuXG5cdFx0Y29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXHRcdC8vICdkZWxldGUnIGNhbm5vdCBiZSBleHBvcnRlZCBmcm9tIGEgbW9kdWxlIGJlY2F1c2UgaXQgaXMgYSBrZXl3b3JkLFxuXHRcdC8vIHNvIGNoZWNrIGZvciAnZGVsJyBpbnN0ZWFkXG5cdFx0Y29uc3QgbWV0aG9kX2V4cG9ydCA9IG1ldGhvZCA9PT0gJ2RlbGV0ZScgPyAnZGVsJyA6IG1ldGhvZDtcblx0XHRjb25zdCBoYW5kbGVfbWV0aG9kID0gcm91dGUuaGFuZGxlcnNbbWV0aG9kX2V4cG9ydF07XG5cdFx0aWYgKGhhbmRsZV9tZXRob2QpIHtcblx0XHRcdGlmIChwcm9jZXNzLmVudi5TQVBQRVJfRVhQT1JUKSB7XG5cdFx0XHRcdGNvbnN0IHsgd3JpdGUsIGVuZCwgc2V0SGVhZGVyIH0gPSByZXM7XG5cdFx0XHRcdGNvbnN0IGNodW5rcyA9IFtdO1xuXHRcdFx0XHRjb25zdCBoZWFkZXJzID0ge307XG5cblx0XHRcdFx0Ly8gaW50ZXJjZXB0IGRhdGEgc28gdGhhdCBpdCBjYW4gYmUgZXhwb3J0ZWRcblx0XHRcdFx0cmVzLndyaXRlID0gZnVuY3Rpb24oY2h1bmspIHtcblx0XHRcdFx0XHRjaHVua3MucHVzaChCdWZmZXIuZnJvbShjaHVuaykpO1xuXHRcdFx0XHRcdHdyaXRlLmFwcGx5KHJlcywgYXJndW1lbnRzKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZXMuc2V0SGVhZGVyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcblx0XHRcdFx0XHRoZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRzZXRIZWFkZXIuYXBwbHkocmVzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHJlcy5lbmQgPSBmdW5jdGlvbihjaHVuaykge1xuXHRcdFx0XHRcdGlmIChjaHVuaykgY2h1bmtzLnB1c2goQnVmZmVyLmZyb20oY2h1bmspKTtcblx0XHRcdFx0XHRlbmQuYXBwbHkocmVzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHRcdFx0cHJvY2Vzcy5zZW5kKHtcblx0XHRcdFx0XHRcdF9fc2FwcGVyX186IHRydWUsXG5cdFx0XHRcdFx0XHRldmVudDogJ2ZpbGUnLFxuXHRcdFx0XHRcdFx0dXJsOiByZXEudXJsLFxuXHRcdFx0XHRcdFx0bWV0aG9kOiByZXEubWV0aG9kLFxuXHRcdFx0XHRcdFx0c3RhdHVzOiByZXMuc3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdHR5cGU6IGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddLFxuXHRcdFx0XHRcdFx0Ym9keTogQnVmZmVyLmNvbmNhdChjaHVua3MpLnRvU3RyaW5nKClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaGFuZGxlX25leHQgPSAoZXJyKSA9PiB7XG5cdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IDUwMDtcblx0XHRcdFx0XHRyZXMuZW5kKGVyci5tZXNzYWdlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwcm9jZXNzLm5leHRUaWNrKG5leHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRhd2FpdCBoYW5kbGVfbWV0aG9kKHJlcSwgcmVzLCBoYW5kbGVfbmV4dCk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRoYW5kbGVfbmV4dChlcnIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBubyBtYXRjaGluZyBoYW5kbGVyIGZvciBtZXRob2Rcblx0XHRcdHByb2Nlc3MubmV4dFRpY2sobmV4dCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGZpbmRfcm91dGUocmVxLCByZXMsIG5leHQpIHtcblx0XHRmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlcykge1xuXHRcdFx0aWYgKHJvdXRlLnBhdHRlcm4udGVzdChyZXEucGF0aCkpIHtcblx0XHRcdFx0aGFuZGxlX3JvdXRlKHJvdXRlLCByZXEsIHJlcywgbmV4dCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRuZXh0KCk7XG5cdH07XG59XG5cbi8qIVxuICogY29va2llXG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IFJvbWFuIFNodHlsbWFuXG4gKiBDb3B5cmlnaHQoYykgMjAxNSBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqIEBwdWJsaWNcbiAqL1xuXG52YXIgcGFyc2VfMSA9IHBhcnNlO1xudmFyIHNlcmlhbGl6ZV8xID0gc2VyaWFsaXplO1xuXG4vKipcbiAqIE1vZHVsZSB2YXJpYWJsZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5cbnZhciBkZWNvZGUgPSBkZWNvZGVVUklDb21wb25lbnQ7XG52YXIgZW5jb2RlID0gZW5jb2RlVVJJQ29tcG9uZW50O1xudmFyIHBhaXJTcGxpdFJlZ0V4cCA9IC87ICovO1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBmaWVsZC1jb250ZW50IGluIFJGQyA3MjMwIHNlYyAzLjJcbiAqXG4gKiBmaWVsZC1jb250ZW50ID0gZmllbGQtdmNoYXIgWyAxKiggU1AgLyBIVEFCICkgZmllbGQtdmNoYXIgXVxuICogZmllbGQtdmNoYXIgICA9IFZDSEFSIC8gb2JzLXRleHRcbiAqIG9icy10ZXh0ICAgICAgPSAleDgwLUZGXG4gKi9cblxudmFyIGZpZWxkQ29udGVudFJlZ0V4cCA9IC9eW1xcdTAwMDlcXHUwMDIwLVxcdTAwN2VcXHUwMDgwLVxcdTAwZmZdKyQvO1xuXG4vKipcbiAqIFBhcnNlIGEgY29va2llIGhlYWRlci5cbiAqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gY29va2llIGhlYWRlciBzdHJpbmcgaW50byBhbiBvYmplY3RcbiAqIFRoZSBvYmplY3QgaGFzIHRoZSB2YXJpb3VzIGNvb2tpZXMgYXMga2V5cyhuYW1lcykgPT4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHJldHVybiB7b2JqZWN0fVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHIgbXVzdCBiZSBhIHN0cmluZycpO1xuICB9XG5cbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KHBhaXJTcGxpdFJlZ0V4cCk7XG4gIHZhciBkZWMgPSBvcHQuZGVjb2RlIHx8IGRlY29kZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBhaXIgPSBwYWlyc1tpXTtcbiAgICB2YXIgZXFfaWR4ID0gcGFpci5pbmRleE9mKCc9Jyk7XG5cbiAgICAvLyBza2lwIHRoaW5ncyB0aGF0IGRvbid0IGxvb2sgbGlrZSBrZXk9dmFsdWVcbiAgICBpZiAoZXFfaWR4IDwgMCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGtleSA9IHBhaXIuc3Vic3RyKDAsIGVxX2lkeCkudHJpbSgpO1xuICAgIHZhciB2YWwgPSBwYWlyLnN1YnN0cigrK2VxX2lkeCwgcGFpci5sZW5ndGgpLnRyaW0oKTtcblxuICAgIC8vIHF1b3RlZCB2YWx1ZXNcbiAgICBpZiAoJ1wiJyA9PSB2YWxbMF0pIHtcbiAgICAgIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XG4gICAgfVxuXG4gICAgLy8gb25seSBhc3NpZ24gb25jZVxuICAgIGlmICh1bmRlZmluZWQgPT0gb2JqW2tleV0pIHtcbiAgICAgIG9ialtrZXldID0gdHJ5RGVjb2RlKHZhbCwgZGVjKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZSBkYXRhIGludG8gYSBjb29raWUgaGVhZGVyLlxuICpcbiAqIFNlcmlhbGl6ZSB0aGUgYSBuYW1lIHZhbHVlIHBhaXIgaW50byBhIGNvb2tpZSBzdHJpbmcgc3VpdGFibGUgZm9yXG4gKiBodHRwIGhlYWRlcnMuIEFuIG9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHNwZWNpZmllZCBjb29raWUgcGFyYW1ldGVycy5cbiAqXG4gKiBzZXJpYWxpemUoJ2ZvbycsICdiYXInLCB7IGh0dHBPbmx5OiB0cnVlIH0pXG4gKiAgID0+IFwiZm9vPWJhcjsgaHR0cE9ubHlcIlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG5hbWUsIHZhbCwgb3B0aW9ucykge1xuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGVuYyA9IG9wdC5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGlmICh0eXBlb2YgZW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIGVuY29kZSBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgbmFtZSBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICB2YXIgdmFsdWUgPSBlbmModmFsKTtcblxuICBpZiAodmFsdWUgJiYgIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHZhbCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICB2YXIgc3RyID0gbmFtZSArICc9JyArIHZhbHVlO1xuXG4gIGlmIChudWxsICE9IG9wdC5tYXhBZ2UpIHtcbiAgICB2YXIgbWF4QWdlID0gb3B0Lm1heEFnZSAtIDA7XG4gICAgaWYgKGlzTmFOKG1heEFnZSkpIHRocm93IG5ldyBFcnJvcignbWF4QWdlIHNob3VsZCBiZSBhIE51bWJlcicpO1xuICAgIHN0ciArPSAnOyBNYXgtQWdlPScgKyBNYXRoLmZsb29yKG1heEFnZSk7XG4gIH1cblxuICBpZiAob3B0LmRvbWFpbikge1xuICAgIGlmICghZmllbGRDb250ZW50UmVnRXhwLnRlc3Qob3B0LmRvbWFpbikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBkb21haW4gaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBEb21haW49JyArIG9wdC5kb21haW47XG4gIH1cblxuICBpZiAob3B0LnBhdGgpIHtcbiAgICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG9wdC5wYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIHBhdGggaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBQYXRoPScgKyBvcHQucGF0aDtcbiAgfVxuXG4gIGlmIChvcHQuZXhwaXJlcykge1xuICAgIGlmICh0eXBlb2Ygb3B0LmV4cGlyZXMudG9VVENTdHJpbmcgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBleHBpcmVzIGlzIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBzdHIgKz0gJzsgRXhwaXJlcz0nICsgb3B0LmV4cGlyZXMudG9VVENTdHJpbmcoKTtcbiAgfVxuXG4gIGlmIChvcHQuaHR0cE9ubHkpIHtcbiAgICBzdHIgKz0gJzsgSHR0cE9ubHknO1xuICB9XG5cbiAgaWYgKG9wdC5zZWN1cmUpIHtcbiAgICBzdHIgKz0gJzsgU2VjdXJlJztcbiAgfVxuXG4gIGlmIChvcHQuc2FtZVNpdGUpIHtcbiAgICB2YXIgc2FtZVNpdGUgPSB0eXBlb2Ygb3B0LnNhbWVTaXRlID09PSAnc3RyaW5nJ1xuICAgICAgPyBvcHQuc2FtZVNpdGUudG9Mb3dlckNhc2UoKSA6IG9wdC5zYW1lU2l0ZTtcblxuICAgIHN3aXRjaCAoc2FtZVNpdGUpIHtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPVN0cmljdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGF4JzpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPUxheCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaWN0JzpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPVN0cmljdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1Ob25lJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gc2FtZVNpdGUgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogVHJ5IGRlY29kaW5nIGEgc3RyaW5nIHVzaW5nIGEgZGVjb2RpbmcgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtmdW5jdGlvbn0gZGVjb2RlXG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHRyeURlY29kZShzdHIsIGRlY29kZSkge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGUoc3RyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxudmFyIGNvb2tpZSA9IHtcblx0cGFyc2U6IHBhcnNlXzEsXG5cdHNlcmlhbGl6ZTogc2VyaWFsaXplXzFcbn07XG5cbnZhciBjaGFycyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXyQnO1xudmFyIHVuc2FmZUNoYXJzID0gL1s8PlxcYlxcZlxcblxcclxcdFxcMFxcdTIwMjhcXHUyMDI5XS9nO1xudmFyIHJlc2VydmVkID0gL14oPzpkb3xpZnxpbnxmb3J8aW50fGxldHxuZXd8dHJ5fHZhcnxieXRlfGNhc2V8Y2hhcnxlbHNlfGVudW18Z290b3xsb25nfHRoaXN8dm9pZHx3aXRofGF3YWl0fGJyZWFrfGNhdGNofGNsYXNzfGNvbnN0fGZpbmFsfGZsb2F0fHNob3J0fHN1cGVyfHRocm93fHdoaWxlfHlpZWxkfGRlbGV0ZXxkb3VibGV8ZXhwb3J0fGltcG9ydHxuYXRpdmV8cmV0dXJufHN3aXRjaHx0aHJvd3N8dHlwZW9mfGJvb2xlYW58ZGVmYXVsdHxleHRlbmRzfGZpbmFsbHl8cGFja2FnZXxwcml2YXRlfGFic3RyYWN0fGNvbnRpbnVlfGRlYnVnZ2VyfGZ1bmN0aW9ufHZvbGF0aWxlfGludGVyZmFjZXxwcm90ZWN0ZWR8dHJhbnNpZW50fGltcGxlbWVudHN8aW5zdGFuY2VvZnxzeW5jaHJvbml6ZWQpJC87XG52YXIgZXNjYXBlZCA9IHtcbiAgICAnPCc6ICdcXFxcdTAwM0MnLFxuICAgICc+JzogJ1xcXFx1MDAzRScsXG4gICAgJy8nOiAnXFxcXHUwMDJGJyxcbiAgICAnXFxcXCc6ICdcXFxcXFxcXCcsXG4gICAgJ1xcYic6ICdcXFxcYicsXG4gICAgJ1xcZic6ICdcXFxcZicsXG4gICAgJ1xcbic6ICdcXFxcbicsXG4gICAgJ1xccic6ICdcXFxccicsXG4gICAgJ1xcdCc6ICdcXFxcdCcsXG4gICAgJ1xcMCc6ICdcXFxcMCcsXG4gICAgJ1xcdTIwMjgnOiAnXFxcXHUyMDI4JyxcbiAgICAnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG59O1xudmFyIG9iamVjdFByb3RvT3duUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE9iamVjdC5wcm90b3R5cGUpLnNvcnQoKS5qb2luKCdcXDAnKTtcbmZ1bmN0aW9uIGRldmFsdWUodmFsdWUpIHtcbiAgICB2YXIgY291bnRzID0gbmV3IE1hcCgpO1xuICAgIGZ1bmN0aW9uIHdhbGsodGhpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN0cmluZ2lmeSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudHMuaGFzKHRoaW5nKSkge1xuICAgICAgICAgICAgY291bnRzLnNldCh0aGluZywgY291bnRzLmdldCh0aGluZykgKyAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb3VudHMuc2V0KHRoaW5nLCAxKTtcbiAgICAgICAgaWYgKCFpc1ByaW1pdGl2ZSh0aGluZykpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQm9vbGVhbic6XG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpbmcuZm9yRWFjaCh3YWxrKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdNYXAnOlxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaW5nKS5mb3JFYWNoKHdhbGspO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvdG8gIT09IE9iamVjdC5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuc29ydCgpLmpvaW4oJ1xcMCcpICE9PSBvYmplY3RQcm90b093blByb3BlcnR5TmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHJpbmdpZnkgYXJiaXRyYXJ5IG5vbi1QT0pPc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0aGluZykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN0cmluZ2lmeSBQT0pPcyB3aXRoIHN5bWJvbGljIGtleXNcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpbmcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gd2Fsayh0aGluZ1trZXldKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2Fsayh2YWx1ZSk7XG4gICAgdmFyIG5hbWVzID0gbmV3IE1hcCgpO1xuICAgIEFycmF5LmZyb20oY291bnRzKVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gZW50cnlbMV0gPiAxOyB9KVxuICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYlsxXSAtIGFbMV07IH0pXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSwgaSkge1xuICAgICAgICBuYW1lcy5zZXQoZW50cnlbMF0sIGdldE5hbWUoaSkpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeSh0aGluZykge1xuICAgICAgICBpZiAobmFtZXMuaGFzKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVzLmdldCh0aGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJpbWl0aXZlKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVByaW1pdGl2ZSh0aGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHR5cGUgPSBnZXRUeXBlKHRoaW5nKTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIk9iamVjdChcIiArIHN0cmluZ2lmeSh0aGluZy52YWx1ZU9mKCkpICsgXCIpXCI7XG4gICAgICAgICAgICBjYXNlICdSZWdFeHAnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGluZy50b1N0cmluZygpO1xuICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibmV3IERhdGUoXCIgKyB0aGluZy5nZXRUaW1lKCkgKyBcIilcIjtcbiAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICB2YXIgbWVtYmVycyA9IHRoaW5nLm1hcChmdW5jdGlvbiAodiwgaSkgeyByZXR1cm4gaSBpbiB0aGluZyA/IHN0cmluZ2lmeSh2KSA6ICcnOyB9KTtcbiAgICAgICAgICAgICAgICB2YXIgdGFpbCA9IHRoaW5nLmxlbmd0aCA9PT0gMCB8fCAodGhpbmcubGVuZ3RoIC0gMSBpbiB0aGluZykgPyAnJyA6ICcsJztcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbXCIgKyBtZW1iZXJzLmpvaW4oJywnKSArIHRhaWwgKyBcIl1cIjtcbiAgICAgICAgICAgIGNhc2UgJ1NldCc6XG4gICAgICAgICAgICBjYXNlICdNYXAnOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5ldyBcIiArIHR5cGUgKyBcIihbXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoc3RyaW5naWZ5KS5qb2luKCcsJykgKyBcIl0pXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBcIntcIiArIE9iamVjdC5rZXlzKHRoaW5nKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gc2FmZUtleShrZXkpICsgXCI6XCIgKyBzdHJpbmdpZnkodGhpbmdba2V5XSk7IH0pLmpvaW4oJywnKSArIFwifVwiO1xuICAgICAgICAgICAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZyk7XG4gICAgICAgICAgICAgICAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGluZykubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIk9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSxcIiArIG9iaiArIFwiKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiT2JqZWN0LmNyZWF0ZShudWxsKVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBzdHIgPSBzdHJpbmdpZnkodmFsdWUpO1xuICAgIGlmIChuYW1lcy5zaXplKSB7XG4gICAgICAgIHZhciBwYXJhbXNfMSA9IFtdO1xuICAgICAgICB2YXIgc3RhdGVtZW50c18xID0gW107XG4gICAgICAgIHZhciB2YWx1ZXNfMSA9IFtdO1xuICAgICAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCB0aGluZykge1xuICAgICAgICAgICAgcGFyYW1zXzEucHVzaChuYW1lKTtcbiAgICAgICAgICAgIGlmIChpc1ByaW1pdGl2ZSh0aGluZykpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKHN0cmluZ2lmeVByaW1pdGl2ZSh0aGluZykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJPYmplY3QoXCIgKyBzdHJpbmdpZnkodGhpbmcudmFsdWVPZigpKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaCh0aGluZy50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgRGF0ZShcIiArIHRoaW5nLmdldFRpbWUoKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyYXknOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwiQXJyYXkoXCIgKyB0aGluZy5sZW5ndGggKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaW5nLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIltcIiArIGkgKyBcIl09XCIgKyBzdHJpbmdpZnkodikpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0JzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIm5ldyBTZXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIi5cIiArIEFycmF5LmZyb20odGhpbmcpLm1hcChmdW5jdGlvbiAodikgeyByZXR1cm4gXCJhZGQoXCIgKyBzdHJpbmdpZnkodikgKyBcIilcIjsgfSkuam9pbignLicpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTWFwJzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIm5ldyBNYXBcIik7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIi5cIiArIEFycmF5LmZyb20odGhpbmcpLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrID0gX2FbMF0sIHYgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInNldChcIiArIHN0cmluZ2lmeShrKSArIFwiLCBcIiArIHN0cmluZ2lmeSh2KSArIFwiKVwiO1xuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcuJykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZykgPT09IG51bGwgPyAnT2JqZWN0LmNyZWF0ZShudWxsKScgOiAne30nKTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpbmcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50c18xLnB1c2goXCJcIiArIG5hbWUgKyBzYWZlUHJvcChrZXkpICsgXCI9XCIgKyBzdHJpbmdpZnkodGhpbmdba2V5XSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKFwicmV0dXJuIFwiICsgc3RyKTtcbiAgICAgICAgcmV0dXJuIFwiKGZ1bmN0aW9uKFwiICsgcGFyYW1zXzEuam9pbignLCcpICsgXCIpe1wiICsgc3RhdGVtZW50c18xLmpvaW4oJzsnKSArIFwifShcIiArIHZhbHVlc18xLmpvaW4oJywnKSArIFwiKSlcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TmFtZShudW0pIHtcbiAgICB2YXIgbmFtZSA9ICcnO1xuICAgIGRvIHtcbiAgICAgICAgbmFtZSA9IGNoYXJzW251bSAlIGNoYXJzLmxlbmd0aF0gKyBuYW1lO1xuICAgICAgICBudW0gPSB+fihudW0gLyBjaGFycy5sZW5ndGgpIC0gMTtcbiAgICB9IHdoaWxlIChudW0gPj0gMCk7XG4gICAgcmV0dXJuIHJlc2VydmVkLnRlc3QobmFtZSkgPyBuYW1lICsgXCJfXCIgOiBuYW1lO1xufVxuZnVuY3Rpb24gaXNQcmltaXRpdmUodGhpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0KHRoaW5nKSAhPT0gdGhpbmc7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpIHtcbiAgICBpZiAodHlwZW9mIHRoaW5nID09PSAnc3RyaW5nJylcbiAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVN0cmluZyh0aGluZyk7XG4gICAgaWYgKHRoaW5nID09PSB2b2lkIDApXG4gICAgICAgIHJldHVybiAndm9pZCAwJztcbiAgICBpZiAodGhpbmcgPT09IDAgJiYgMSAvIHRoaW5nIDwgMClcbiAgICAgICAgcmV0dXJuICctMCc7XG4gICAgdmFyIHN0ciA9IFN0cmluZyh0aGluZyk7XG4gICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ251bWJlcicpXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXigtKT8wXFwuLywgJyQxLicpO1xuICAgIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBnZXRUeXBlKHRoaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGluZykuc2xpY2UoOCwgLTEpO1xufVxuZnVuY3Rpb24gZXNjYXBlVW5zYWZlQ2hhcihjKSB7XG4gICAgcmV0dXJuIGVzY2FwZWRbY10gfHwgYztcbn1cbmZ1bmN0aW9uIGVzY2FwZVVuc2FmZUNoYXJzKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSh1bnNhZmVDaGFycywgZXNjYXBlVW5zYWZlQ2hhcik7XG59XG5mdW5jdGlvbiBzYWZlS2V5KGtleSkge1xuICAgIHJldHVybiAvXltfJGEtekEtWl1bXyRhLXpBLVowLTldKiQvLnRlc3Qoa2V5KSA/IGtleSA6IGVzY2FwZVVuc2FmZUNoYXJzKEpTT04uc3RyaW5naWZ5KGtleSkpO1xufVxuZnVuY3Rpb24gc2FmZVByb3Aoa2V5KSB7XG4gICAgcmV0dXJuIC9eW18kYS16QS1aXVtfJGEtekEtWjAtOV0qJC8udGVzdChrZXkpID8gXCIuXCIgKyBrZXkgOiBcIltcIiArIGVzY2FwZVVuc2FmZUNoYXJzKEpTT04uc3RyaW5naWZ5KGtleSkpICsgXCJdXCI7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnlTdHJpbmcoc3RyKSB7XG4gICAgdmFyIHJlc3VsdCA9ICdcIic7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIGNoYXIgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICB2YXIgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgaWYgKGNoYXIgPT09ICdcIicpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFxcXFwiJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGFyIGluIGVzY2FwZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBlc2NhcGVkW2NoYXJdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPj0gMHhkODAwICYmIGNvZGUgPD0gMHhkZmZmKSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IHN0ci5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGJlZ2lubmluZyBvZiBhIFtoaWdoLCBsb3ddIHN1cnJvZ2F0ZSBwYWlyLFxuICAgICAgICAgICAgLy8gYWRkIHRoZSBuZXh0IHR3byBjaGFyYWN0ZXJzLCBvdGhlcndpc2UgZXNjYXBlXG4gICAgICAgICAgICBpZiAoY29kZSA8PSAweGRiZmYgJiYgKG5leHQgPj0gMHhkYzAwICYmIG5leHQgPD0gMHhkZmZmKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyICsgc3RyWysraV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCJcXFxcdVwiICsgY29kZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCArPSAnXCInO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS90bXB2YXIvanNkb20vYmxvYi9hYTg1YjJhYmYwNzc2NmZmN2JmNWMxZjZkYWFmYjM3MjZmMmYyZGI1L2xpYi9qc2RvbS9saXZpbmcvYmxvYi5qc1xuXG4vLyBmaXggZm9yIFwiUmVhZGFibGVcIiBpc24ndCBhIG5hbWVkIGV4cG9ydCBpc3N1ZVxuY29uc3QgUmVhZGFibGUgPSBTdHJlYW0uUmVhZGFibGU7XG5cbmNvbnN0IEJVRkZFUiA9IFN5bWJvbCgnYnVmZmVyJyk7XG5jb25zdCBUWVBFID0gU3ltYm9sKCd0eXBlJyk7XG5cbmNsYXNzIEJsb2Ige1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzW1RZUEVdID0gJyc7XG5cblx0XHRjb25zdCBibG9iUGFydHMgPSBhcmd1bWVudHNbMF07XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXTtcblxuXHRcdGNvbnN0IGJ1ZmZlcnMgPSBbXTtcblx0XHRsZXQgc2l6ZSA9IDA7XG5cblx0XHRpZiAoYmxvYlBhcnRzKSB7XG5cdFx0XHRjb25zdCBhID0gYmxvYlBhcnRzO1xuXHRcdFx0Y29uc3QgbGVuZ3RoID0gTnVtYmVyKGEubGVuZ3RoKTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGFbaV07XG5cdFx0XHRcdGxldCBidWZmZXI7XG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQnVmZmVyKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gZWxlbWVudDtcblx0XHRcdFx0fSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoZWxlbWVudCkpIHtcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50LmJ1ZmZlciwgZWxlbWVudC5ieXRlT2Zmc2V0LCBlbGVtZW50LmJ5dGVMZW5ndGgpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGVsZW1lbnQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCbG9iKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gZWxlbWVudFtCVUZGRVJdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IGVsZW1lbnQgOiBTdHJpbmcoZWxlbWVudCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNpemUgKz0gYnVmZmVyLmxlbmd0aDtcblx0XHRcdFx0YnVmZmVycy5wdXNoKGJ1ZmZlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpc1tCVUZGRVJdID0gQnVmZmVyLmNvbmNhdChidWZmZXJzKTtcblxuXHRcdGxldCB0eXBlID0gb3B0aW9ucyAmJiBvcHRpb25zLnR5cGUgIT09IHVuZGVmaW5lZCAmJiBTdHJpbmcob3B0aW9ucy50eXBlKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGlmICh0eXBlICYmICEvW15cXHUwMDIwLVxcdTAwN0VdLy50ZXN0KHR5cGUpKSB7XG5cdFx0XHR0aGlzW1RZUEVdID0gdHlwZTtcblx0XHR9XG5cdH1cblx0Z2V0IHNpemUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbQlVGRkVSXS5sZW5ndGg7XG5cdH1cblx0Z2V0IHR5cGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbVFlQRV07XG5cdH1cblx0dGV4dCgpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXNbQlVGRkVSXS50b1N0cmluZygpKTtcblx0fVxuXHRhcnJheUJ1ZmZlcigpIHtcblx0XHRjb25zdCBidWYgPSB0aGlzW0JVRkZFUl07XG5cdFx0Y29uc3QgYWIgPSBidWYuYnVmZmVyLnNsaWNlKGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZU9mZnNldCArIGJ1Zi5ieXRlTGVuZ3RoKTtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFiKTtcblx0fVxuXHRzdHJlYW0oKSB7XG5cdFx0Y29uc3QgcmVhZGFibGUgPSBuZXcgUmVhZGFibGUoKTtcblx0XHRyZWFkYWJsZS5fcmVhZCA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdHJlYWRhYmxlLnB1c2godGhpc1tCVUZGRVJdKTtcblx0XHRyZWFkYWJsZS5wdXNoKG51bGwpO1xuXHRcdHJldHVybiByZWFkYWJsZTtcblx0fVxuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gJ1tvYmplY3QgQmxvYl0nO1xuXHR9XG5cdHNsaWNlKCkge1xuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnNpemU7XG5cblx0XHRjb25zdCBzdGFydCA9IGFyZ3VtZW50c1swXTtcblx0XHRjb25zdCBlbmQgPSBhcmd1bWVudHNbMV07XG5cdFx0bGV0IHJlbGF0aXZlU3RhcnQsIHJlbGF0aXZlRW5kO1xuXHRcdGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZWxhdGl2ZVN0YXJ0ID0gMDtcblx0XHR9IGVsc2UgaWYgKHN0YXJ0IDwgMCkge1xuXHRcdFx0cmVsYXRpdmVTdGFydCA9IE1hdGgubWF4KHNpemUgKyBzdGFydCwgMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbGF0aXZlU3RhcnQgPSBNYXRoLm1pbihzdGFydCwgc2l6ZSk7XG5cdFx0fVxuXHRcdGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVsYXRpdmVFbmQgPSBzaXplO1xuXHRcdH0gZWxzZSBpZiAoZW5kIDwgMCkge1xuXHRcdFx0cmVsYXRpdmVFbmQgPSBNYXRoLm1heChzaXplICsgZW5kLCAwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVsYXRpdmVFbmQgPSBNYXRoLm1pbihlbmQsIHNpemUpO1xuXHRcdH1cblx0XHRjb25zdCBzcGFuID0gTWF0aC5tYXgocmVsYXRpdmVFbmQgLSByZWxhdGl2ZVN0YXJ0LCAwKTtcblxuXHRcdGNvbnN0IGJ1ZmZlciA9IHRoaXNbQlVGRkVSXTtcblx0XHRjb25zdCBzbGljZWRCdWZmZXIgPSBidWZmZXIuc2xpY2UocmVsYXRpdmVTdGFydCwgcmVsYXRpdmVTdGFydCArIHNwYW4pO1xuXHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbXSwgeyB0eXBlOiBhcmd1bWVudHNbMl0gfSk7XG5cdFx0YmxvYltCVUZGRVJdID0gc2xpY2VkQnVmZmVyO1xuXHRcdHJldHVybiBibG9iO1xuXHR9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEJsb2IucHJvdG90eXBlLCB7XG5cdHNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR0eXBlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c2xpY2U6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJsb2IucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdCbG9iJyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuLyoqXG4gKiBmZXRjaC1lcnJvci5qc1xuICpcbiAqIEZldGNoRXJyb3IgaW50ZXJmYWNlIGZvciBvcGVyYXRpb25hbCBlcnJvcnNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBGZXRjaEVycm9yIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgU3RyaW5nICAgICAgbWVzc2FnZSAgICAgIEVycm9yIG1lc3NhZ2UgZm9yIGh1bWFuXG4gKiBAcGFyYW0gICBTdHJpbmcgICAgICB0eXBlICAgICAgICAgRXJyb3IgdHlwZSBmb3IgbWFjaGluZVxuICogQHBhcmFtICAgU3RyaW5nICAgICAgc3lzdGVtRXJyb3IgIEZvciBOb2RlLmpzIHN5c3RlbSBlcnJvclxuICogQHJldHVybiAgRmV0Y2hFcnJvclxuICovXG5mdW5jdGlvbiBGZXRjaEVycm9yKG1lc3NhZ2UsIHR5cGUsIHN5c3RlbUVycm9yKSB7XG4gIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy50eXBlID0gdHlwZTtcblxuICAvLyB3aGVuIGVyci50eXBlIGlzIGBzeXN0ZW1gLCBlcnIuY29kZSBjb250YWlucyBzeXN0ZW0gZXJyb3IgY29kZVxuICBpZiAoc3lzdGVtRXJyb3IpIHtcbiAgICB0aGlzLmNvZGUgPSB0aGlzLmVycm5vID0gc3lzdGVtRXJyb3IuY29kZTtcbiAgfVxuXG4gIC8vIGhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG59XG5cbkZldGNoRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuRmV0Y2hFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGZXRjaEVycm9yO1xuRmV0Y2hFcnJvci5wcm90b3R5cGUubmFtZSA9ICdGZXRjaEVycm9yJztcblxubGV0IGNvbnZlcnQ7XG50cnkge1xuXHRjb252ZXJ0ID0gcmVxdWlyZSgnZW5jb2RpbmcnKS5jb252ZXJ0O1xufSBjYXRjaCAoZSkge31cblxuY29uc3QgSU5URVJOQUxTID0gU3ltYm9sKCdCb2R5IGludGVybmFscycpO1xuXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJQYXNzVGhyb3VnaFwiIGlzbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgUGFzc1Rocm91Z2ggPSBTdHJlYW0uUGFzc1Rocm91Z2g7XG5cbi8qKlxuICogQm9keSBtaXhpblxuICpcbiAqIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2JvZHlcbiAqXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmZ1bmN0aW9uIEJvZHkoYm9keSkge1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcblx0ICAgIF9yZWYkc2l6ZSA9IF9yZWYuc2l6ZTtcblxuXHRsZXQgc2l6ZSA9IF9yZWYkc2l6ZSA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYkc2l6ZTtcblx0dmFyIF9yZWYkdGltZW91dCA9IF9yZWYudGltZW91dDtcblx0bGV0IHRpbWVvdXQgPSBfcmVmJHRpbWVvdXQgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJHRpbWVvdXQ7XG5cblx0aWYgKGJvZHkgPT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRib2R5ID0gbnVsbDtcblx0fSBlbHNlIGlmIChpc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS50b1N0cmluZygpKTtcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIDsgZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSA7IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keSk7XG5cdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclZpZXdcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS5idWZmZXIsIGJvZHkuYnl0ZU9mZnNldCwgYm9keS5ieXRlTGVuZ3RoKTtcblx0fSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtKSA7IGVsc2Uge1xuXHRcdC8vIG5vbmUgb2YgdGhlIGFib3ZlXG5cdFx0Ly8gY29lcmNlIHRvIHN0cmluZyB0aGVuIGJ1ZmZlclxuXHRcdGJvZHkgPSBCdWZmZXIuZnJvbShTdHJpbmcoYm9keSkpO1xuXHR9XG5cdHRoaXNbSU5URVJOQUxTXSA9IHtcblx0XHRib2R5LFxuXHRcdGRpc3R1cmJlZDogZmFsc2UsXG5cdFx0ZXJyb3I6IG51bGxcblx0fTtcblx0dGhpcy5zaXplID0gc2l6ZTtcblx0dGhpcy50aW1lb3V0ID0gdGltZW91dDtcblxuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdGJvZHkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBlcnIubmFtZSA9PT0gJ0Fib3J0RXJyb3InID8gZXJyIDogbmV3IEZldGNoRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgYm9keSB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggJHtfdGhpcy51cmx9OiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpO1xuXHRcdFx0X3RoaXNbSU5URVJOQUxTXS5lcnJvciA9IGVycm9yO1xuXHRcdH0pO1xuXHR9XG59XG5cbkJvZHkucHJvdG90eXBlID0ge1xuXHRnZXQgYm9keSgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLmJvZHk7XG5cdH0sXG5cblx0Z2V0IGJvZHlVc2VkKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkO1xuXHR9LFxuXG5cdC8qKlxuICAqIERlY29kZSByZXNwb25zZSBhcyBBcnJheUJ1ZmZlclxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHRhcnJheUJ1ZmZlcigpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWYpIHtcblx0XHRcdHJldHVybiBidWYuYnVmZmVyLnNsaWNlKGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZU9mZnNldCArIGJ1Zi5ieXRlTGVuZ3RoKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBSZXR1cm4gcmF3IHJlc3BvbnNlIGFzIEJsb2JcbiAgKlxuICAqIEByZXR1cm4gUHJvbWlzZVxuICAqL1xuXHRibG9iKCkge1xuXHRcdGxldCBjdCA9IHRoaXMuaGVhZGVycyAmJiB0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSB8fCAnJztcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWYpIHtcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0Ly8gUHJldmVudCBjb3B5aW5nXG5cdFx0XHRuZXcgQmxvYihbXSwge1xuXHRcdFx0XHR0eXBlOiBjdC50b0xvd2VyQ2FzZSgpXG5cdFx0XHR9KSwge1xuXHRcdFx0XHRbQlVGRkVSXTogYnVmXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMganNvblxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHRqc29uKCkge1xuXHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShidWZmZXIudG9TdHJpbmcoKSk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QobmV3IEZldGNoRXJyb3IoYGludmFsaWQganNvbiByZXNwb25zZSBib2R5IGF0ICR7X3RoaXMyLnVybH0gcmVhc29uOiAke2Vyci5tZXNzYWdlfWAsICdpbnZhbGlkLWpzb24nKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIHRleHRcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0dGV4dCgpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWZmZXIpIHtcblx0XHRcdHJldHVybiBidWZmZXIudG9TdHJpbmcoKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgYnVmZmVyIChub24tc3BlYyBhcGkpXG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdGJ1ZmZlcigpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgdGV4dCwgd2hpbGUgYXV0b21hdGljYWxseSBkZXRlY3RpbmcgdGhlIGVuY29kaW5nIGFuZFxuICAqIHRyeWluZyB0byBkZWNvZGUgdG8gVVRGLTggKG5vbi1zcGVjIGFwaSlcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0dGV4dENvbnZlcnRlZCgpIHtcblx0XHR2YXIgX3RoaXMzID0gdGhpcztcblxuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24gKGJ1ZmZlcikge1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRCb2R5KGJ1ZmZlciwgX3RoaXMzLmhlYWRlcnMpO1xuXHRcdH0pO1xuXHR9XG59O1xuXG4vLyBJbiBicm93c2VycywgYWxsIHByb3BlcnRpZXMgYXJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCb2R5LnByb3RvdHlwZSwge1xuXHRib2R5OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Ym9keVVzZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRhcnJheUJ1ZmZlcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGJsb2I6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRqc29uOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dGV4dDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG5Cb2R5Lm1peEluID0gZnVuY3Rpb24gKHByb3RvKSB7XG5cdGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhCb2R5LnByb3RvdHlwZSkpIHtcblx0XHQvLyBpc3RhbmJ1bCBpZ25vcmUgZWxzZTogZnV0dXJlIHByb29mXG5cdFx0aWYgKCEobmFtZSBpbiBwcm90bykpIHtcblx0XHRcdGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEJvZHkucHJvdG90eXBlLCBuYW1lKTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgbmFtZSwgZGVzYyk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIENvbnN1bWUgYW5kIGNvbnZlcnQgYW4gZW50aXJlIEJvZHkgdG8gYSBCdWZmZXIuXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5LWNvbnN1bWUtYm9keVxuICpcbiAqIEByZXR1cm4gIFByb21pc2VcbiAqL1xuZnVuY3Rpb24gY29uc3VtZUJvZHkoKSB7XG5cdHZhciBfdGhpczQgPSB0aGlzO1xuXG5cdGlmICh0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihgYm9keSB1c2VkIGFscmVhZHkgZm9yOiAke3RoaXMudXJsfWApKTtcblx0fVxuXG5cdHRoaXNbSU5URVJOQUxTXS5kaXN0dXJiZWQgPSB0cnVlO1xuXG5cdGlmICh0aGlzW0lOVEVSTkFMU10uZXJyb3IpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlamVjdCh0aGlzW0lOVEVSTkFMU10uZXJyb3IpO1xuXHR9XG5cblx0bGV0IGJvZHkgPSB0aGlzLmJvZHk7XG5cblx0Ly8gYm9keSBpcyBudWxsXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZXNvbHZlKEJ1ZmZlci5hbGxvYygwKSk7XG5cdH1cblxuXHQvLyBib2R5IGlzIGJsb2Jcblx0aWYgKGlzQmxvYihib2R5KSkge1xuXHRcdGJvZHkgPSBib2R5LnN0cmVhbSgpO1xuXHR9XG5cblx0Ly8gYm9keSBpcyBidWZmZXJcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVzb2x2ZShib2R5KTtcblx0fVxuXG5cdC8vIGlzdGFuYnVsIGlnbm9yZSBpZjogc2hvdWxkIG5ldmVyIGhhcHBlblxuXHRpZiAoIShib2R5IGluc3RhbmNlb2YgU3RyZWFtKSkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVzb2x2ZShCdWZmZXIuYWxsb2MoMCkpO1xuXHR9XG5cblx0Ly8gYm9keSBpcyBzdHJlYW1cblx0Ly8gZ2V0IHJlYWR5IHRvIGFjdHVhbGx5IGNvbnN1bWUgdGhlIGJvZHlcblx0bGV0IGFjY3VtID0gW107XG5cdGxldCBhY2N1bUJ5dGVzID0gMDtcblx0bGV0IGFib3J0ID0gZmFsc2U7XG5cblx0cmV0dXJuIG5ldyBCb2R5LlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdGxldCByZXNUaW1lb3V0O1xuXG5cdFx0Ly8gYWxsb3cgdGltZW91dCBvbiBzbG93IHJlc3BvbnNlIGJvZHlcblx0XHRpZiAoX3RoaXM0LnRpbWVvdXQpIHtcblx0XHRcdHJlc1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYFJlc3BvbnNlIHRpbWVvdXQgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7X3RoaXM0LnVybH0gKG92ZXIgJHtfdGhpczQudGltZW91dH1tcylgLCAnYm9keS10aW1lb3V0JykpO1xuXHRcdFx0fSwgX3RoaXM0LnRpbWVvdXQpO1xuXHRcdH1cblxuXHRcdC8vIGhhbmRsZSBzdHJlYW0gZXJyb3JzXG5cdFx0Ym9keS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRpZiAoZXJyLm5hbWUgPT09ICdBYm9ydEVycm9yJykge1xuXHRcdFx0XHQvLyBpZiB0aGUgcmVxdWVzdCB3YXMgYWJvcnRlZCwgcmVqZWN0IHdpdGggdGhpcyBFcnJvclxuXHRcdFx0XHRhYm9ydCA9IHRydWU7XG5cdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gb3RoZXIgZXJyb3JzLCBzdWNoIGFzIGluY29ycmVjdCBjb250ZW50LWVuY29kaW5nXG5cdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgSW52YWxpZCByZXNwb25zZSBib2R5IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke190aGlzNC51cmx9OiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJvZHkub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcblx0XHRcdGlmIChhYm9ydCB8fCBjaHVuayA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChfdGhpczQuc2l6ZSAmJiBhY2N1bUJ5dGVzICsgY2h1bmsubGVuZ3RoID4gX3RoaXM0LnNpemUpIHtcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYGNvbnRlbnQgc2l6ZSBhdCAke190aGlzNC51cmx9IG92ZXIgbGltaXQ6ICR7X3RoaXM0LnNpemV9YCwgJ21heC1zaXplJykpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGFjY3VtQnl0ZXMgKz0gY2h1bmsubGVuZ3RoO1xuXHRcdFx0YWNjdW0ucHVzaChjaHVuayk7XG5cdFx0fSk7XG5cblx0XHRib2R5Lm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoYWJvcnQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjbGVhclRpbWVvdXQocmVzVGltZW91dCk7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc29sdmUoQnVmZmVyLmNvbmNhdChhY2N1bSwgYWNjdW1CeXRlcykpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdC8vIGhhbmRsZSBzdHJlYW1zIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZCB0b28gbXVjaCBkYXRhIChpc3N1ZSAjNDE0KVxuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYENvdWxkIG5vdCBjcmVhdGUgQnVmZmVyIGZyb20gcmVzcG9uc2UgYm9keSBmb3IgJHtfdGhpczQudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIERldGVjdCBidWZmZXIgZW5jb2RpbmcgYW5kIGNvbnZlcnQgdG8gdGFyZ2V0IGVuY29kaW5nXG4gKiByZWY6IGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvV0QtaHRtbDUtMjAxMTAxMTMvcGFyc2luZy5odG1sI2RldGVybWluaW5nLXRoZS1jaGFyYWN0ZXItZW5jb2RpbmdcbiAqXG4gKiBAcGFyYW0gICBCdWZmZXIgIGJ1ZmZlciAgICBJbmNvbWluZyBidWZmZXJcbiAqIEBwYXJhbSAgIFN0cmluZyAgZW5jb2RpbmcgIFRhcmdldCBlbmNvZGluZ1xuICogQHJldHVybiAgU3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRCb2R5KGJ1ZmZlciwgaGVhZGVycykge1xuXHRpZiAodHlwZW9mIGNvbnZlcnQgIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwYWNrYWdlIGBlbmNvZGluZ2AgbXVzdCBiZSBpbnN0YWxsZWQgdG8gdXNlIHRoZSB0ZXh0Q29udmVydGVkKCkgZnVuY3Rpb24nKTtcblx0fVxuXG5cdGNvbnN0IGN0ID0gaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuXHRsZXQgY2hhcnNldCA9ICd1dGYtOCc7XG5cdGxldCByZXMsIHN0cjtcblxuXHQvLyBoZWFkZXJcblx0aWYgKGN0KSB7XG5cdFx0cmVzID0gL2NoYXJzZXQ9KFteO10qKS9pLmV4ZWMoY3QpO1xuXHR9XG5cblx0Ly8gbm8gY2hhcnNldCBpbiBjb250ZW50IHR5cGUsIHBlZWsgYXQgcmVzcG9uc2UgYm9keSBmb3IgYXQgbW9zdCAxMDI0IGJ5dGVzXG5cdHN0ciA9IGJ1ZmZlci5zbGljZSgwLCAxMDI0KS50b1N0cmluZygpO1xuXG5cdC8vIGh0bWw1XG5cdGlmICghcmVzICYmIHN0cikge1xuXHRcdHJlcyA9IC88bWV0YS4rP2NoYXJzZXQ9KFsnXCJdKSguKz8pXFwxL2kuZXhlYyhzdHIpO1xuXHR9XG5cblx0Ly8gaHRtbDRcblx0aWYgKCFyZXMgJiYgc3RyKSB7XG5cdFx0cmVzID0gLzxtZXRhW1xcc10rP2h0dHAtZXF1aXY9KFsnXCJdKWNvbnRlbnQtdHlwZVxcMVtcXHNdKz9jb250ZW50PShbJ1wiXSkoLis/KVxcMi9pLmV4ZWMoc3RyKTtcblxuXHRcdGlmIChyZXMpIHtcblx0XHRcdHJlcyA9IC9jaGFyc2V0PSguKikvaS5leGVjKHJlcy5wb3AoKSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8geG1sXG5cdGlmICghcmVzICYmIHN0cikge1xuXHRcdHJlcyA9IC88XFw/eG1sLis/ZW5jb2Rpbmc9KFsnXCJdKSguKz8pXFwxL2kuZXhlYyhzdHIpO1xuXHR9XG5cblx0Ly8gZm91bmQgY2hhcnNldFxuXHRpZiAocmVzKSB7XG5cdFx0Y2hhcnNldCA9IHJlcy5wb3AoKTtcblxuXHRcdC8vIHByZXZlbnQgZGVjb2RlIGlzc3VlcyB3aGVuIHNpdGVzIHVzZSBpbmNvcnJlY3QgZW5jb2Rpbmdcblx0XHQvLyByZWY6IGh0dHBzOi8vaHNpdm9uZW4uZmkvZW5jb2RpbmctbWVudS9cblx0XHRpZiAoY2hhcnNldCA9PT0gJ2diMjMxMicgfHwgY2hhcnNldCA9PT0gJ2diaycpIHtcblx0XHRcdGNoYXJzZXQgPSAnZ2IxODAzMCc7XG5cdFx0fVxuXHR9XG5cblx0Ly8gdHVybiByYXcgYnVmZmVycyBpbnRvIGEgc2luZ2xlIHV0Zi04IGJ1ZmZlclxuXHRyZXR1cm4gY29udmVydChidWZmZXIsICdVVEYtOCcsIGNoYXJzZXQpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogRGV0ZWN0IGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICogcmVmOiBodHRwczovL2dpdGh1Yi5jb20vYml0aW5uL25vZGUtZmV0Y2gvaXNzdWVzLzI5NiNpc3N1ZWNvbW1lbnQtMzA3NTk4MTQzXG4gKlxuICogQHBhcmFtICAgT2JqZWN0ICBvYmogICAgIE9iamVjdCB0byBkZXRlY3QgYnkgdHlwZSBvciBicmFuZFxuICogQHJldHVybiAgU3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKG9iaikge1xuXHQvLyBEdWNrLXR5cGluZyBhcyBhIG5lY2Vzc2FyeSBjb25kaXRpb24uXG5cdGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqLmFwcGVuZCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmRlbGV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmdldEFsbCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmhhcyAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLnNldCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIEJyYW5kLWNoZWNraW5nIGFuZCBtb3JlIGR1Y2stdHlwaW5nIGFzIG9wdGlvbmFsIGNvbmRpdGlvbi5cblx0cmV0dXJuIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSAnVVJMU2VhcmNoUGFyYW1zJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgVVJMU2VhcmNoUGFyYW1zXScgfHwgdHlwZW9mIG9iai5zb3J0ID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgVzNDIGBCbG9iYCBvYmplY3QgKHdoaWNoIGBGaWxlYCBpbmhlcml0cyBmcm9tKVxuICogQHBhcmFtICB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0Jsb2Iob2JqKSB7XG5cdHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmoudHlwZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIG9iai5zdHJlYW0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIC9eKEJsb2J8RmlsZSkkLy50ZXN0KG9iai5jb25zdHJ1Y3Rvci5uYW1lKSAmJiAvXihCbG9ifEZpbGUpJC8udGVzdChvYmpbU3ltYm9sLnRvU3RyaW5nVGFnXSk7XG59XG5cbi8qKlxuICogQ2xvbmUgYm9keSBnaXZlbiBSZXMvUmVxIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgIGluc3RhbmNlICBSZXNwb25zZSBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcmV0dXJuICBNaXhlZFxuICovXG5mdW5jdGlvbiBjbG9uZShpbnN0YW5jZSkge1xuXHRsZXQgcDEsIHAyO1xuXHRsZXQgYm9keSA9IGluc3RhbmNlLmJvZHk7XG5cblx0Ly8gZG9uJ3QgYWxsb3cgY2xvbmluZyBhIHVzZWQgYm9keVxuXHRpZiAoaW5zdGFuY2UuYm9keVVzZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBjbG9uZSBib2R5IGFmdGVyIGl0IGlzIHVzZWQnKTtcblx0fVxuXG5cdC8vIGNoZWNrIHRoYXQgYm9keSBpcyBhIHN0cmVhbSBhbmQgbm90IGZvcm0tZGF0YSBvYmplY3Rcblx0Ly8gbm90ZTogd2UgY2FuJ3QgY2xvbmUgdGhlIGZvcm0tZGF0YSBvYmplY3Qgd2l0aG91dCBoYXZpbmcgaXQgYXMgYSBkZXBlbmRlbmN5XG5cdGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtICYmIHR5cGVvZiBib2R5LmdldEJvdW5kYXJ5ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gdGVlIGluc3RhbmNlIGJvZHlcblx0XHRwMSA9IG5ldyBQYXNzVGhyb3VnaCgpO1xuXHRcdHAyID0gbmV3IFBhc3NUaHJvdWdoKCk7XG5cdFx0Ym9keS5waXBlKHAxKTtcblx0XHRib2R5LnBpcGUocDIpO1xuXHRcdC8vIHNldCBpbnN0YW5jZSBib2R5IHRvIHRlZWQgYm9keSBhbmQgcmV0dXJuIHRoZSBvdGhlciB0ZWVkIGJvZHlcblx0XHRpbnN0YW5jZVtJTlRFUk5BTFNdLmJvZHkgPSBwMTtcblx0XHRib2R5ID0gcDI7XG5cdH1cblxuXHRyZXR1cm4gYm9keTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyB0aGUgb3BlcmF0aW9uIFwiZXh0cmFjdCBhIGBDb250ZW50LVR5cGVgIHZhbHVlIGZyb20gfG9iamVjdHxcIiBhc1xuICogc3BlY2lmaWVkIGluIHRoZSBzcGVjaWZpY2F0aW9uOlxuICogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keWluaXQtZXh0cmFjdFxuICpcbiAqIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGluc3RhbmNlLmJvZHkgaXMgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgaW5zdGFuY2UgIEFueSBvcHRpb25zLmJvZHkgaW5wdXRcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdENvbnRlbnRUeXBlKGJvZHkpIHtcblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIG51bGxcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcblx0XHQvLyBib2R5IGlzIHN0cmluZ1xuXHRcdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcblx0fSBlbHNlIGlmIChpc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcblx0XHRyZXR1cm4gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jztcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGJsb2Jcblx0XHRyZXR1cm4gYm9keS50eXBlIHx8IG51bGw7XG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclZpZXdcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmICh0eXBlb2YgYm9keS5nZXRCb3VuZGFyeSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIGRldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdFx0cmV0dXJuIGBtdWx0aXBhcnQvZm9ybS1kYXRhO2JvdW5kYXJ5PSR7Ym9keS5nZXRCb3VuZGFyeSgpfWA7XG5cdH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdC8vIGJvZHkgaXMgc3RyZWFtXG5cdFx0Ly8gY2FuJ3QgcmVhbGx5IGRvIG11Y2ggYWJvdXQgdGhpc1xuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJvZHkgY29uc3RydWN0b3IgZGVmYXVsdHMgb3RoZXIgdGhpbmdzIHRvIHN0cmluZ1xuXHRcdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcblx0fVxufVxuXG4vKipcbiAqIFRoZSBGZXRjaCBTdGFuZGFyZCB0cmVhdHMgdGhpcyBhcyBpZiBcInRvdGFsIGJ5dGVzXCIgaXMgYSBwcm9wZXJ0eSBvbiB0aGUgYm9keS5cbiAqIEZvciB1cywgd2UgaGF2ZSB0byBleHBsaWNpdGx5IGdldCBpdCB3aXRoIGEgZnVuY3Rpb24uXG4gKlxuICogcmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5LXRvdGFsLWJ5dGVzXG4gKlxuICogQHBhcmFtICAgQm9keSAgICBpbnN0YW5jZSAgIEluc3RhbmNlIG9mIEJvZHlcbiAqIEByZXR1cm4gIE51bWJlcj8gICAgICAgICAgICBOdW1iZXIgb2YgYnl0ZXMsIG9yIG51bGwgaWYgbm90IHBvc3NpYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFRvdGFsQnl0ZXMoaW5zdGFuY2UpIHtcblx0Y29uc3QgYm9keSA9IGluc3RhbmNlLmJvZHk7XG5cblxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgbnVsbFxuXHRcdHJldHVybiAwO1xuXHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdHJldHVybiBib2R5LnNpemU7XG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcblx0XHRyZXR1cm4gYm9keS5sZW5ndGg7XG5cdH0gZWxzZSBpZiAoYm9keSAmJiB0eXBlb2YgYm9keS5nZXRMZW5ndGhTeW5jID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gZGV0ZWN0IGZvcm0gZGF0YSBpbnB1dCBmcm9tIGZvcm0tZGF0YSBtb2R1bGVcblx0XHRpZiAoYm9keS5fbGVuZ3RoUmV0cmlldmVycyAmJiBib2R5Ll9sZW5ndGhSZXRyaWV2ZXJzLmxlbmd0aCA9PSAwIHx8IC8vIDEueFxuXHRcdGJvZHkuaGFzS25vd25MZW5ndGggJiYgYm9keS5oYXNLbm93bkxlbmd0aCgpKSB7XG5cdFx0XHQvLyAyLnhcblx0XHRcdHJldHVybiBib2R5LmdldExlbmd0aFN5bmMoKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJlYW1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG4vKipcbiAqIFdyaXRlIGEgQm9keSB0byBhIE5vZGUuanMgV3JpdGFibGVTdHJlYW0gKGUuZy4gaHR0cC5SZXF1ZXN0KSBvYmplY3QuXG4gKlxuICogQHBhcmFtICAgQm9keSAgICBpbnN0YW5jZSAgIEluc3RhbmNlIG9mIEJvZHlcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuZnVuY3Rpb24gd3JpdGVUb1N0cmVhbShkZXN0LCBpbnN0YW5jZSkge1xuXHRjb25zdCBib2R5ID0gaW5zdGFuY2UuYm9keTtcblxuXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0Ly8gYm9keSBpcyBudWxsXG5cdFx0ZGVzdC5lbmQoKTtcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRib2R5LnN0cmVhbSgpLnBpcGUoZGVzdCk7XG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcblx0XHRkZXN0LndyaXRlKGJvZHkpO1xuXHRcdGRlc3QuZW5kKCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJlYW1cblx0XHRib2R5LnBpcGUoZGVzdCk7XG5cdH1cbn1cblxuLy8gZXhwb3NlIFByb21pc2VcbkJvZHkuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG4vKipcbiAqIGhlYWRlcnMuanNcbiAqXG4gKiBIZWFkZXJzIGNsYXNzIG9mZmVycyBjb252ZW5pZW50IGhlbHBlcnNcbiAqL1xuXG5jb25zdCBpbnZhbGlkVG9rZW5SZWdleCA9IC9bXlxcXl9gYS16QS1aXFwtMC05ISMkJSYnKisufH5dLztcbmNvbnN0IGludmFsaWRIZWFkZXJDaGFyUmVnZXggPSAvW15cXHRcXHgyMC1cXHg3ZVxceDgwLVxceGZmXS87XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTmFtZShuYW1lKSB7XG5cdG5hbWUgPSBgJHtuYW1lfWA7XG5cdGlmIChpbnZhbGlkVG9rZW5SZWdleC50ZXN0KG5hbWUpIHx8IG5hbWUgPT09ICcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHtuYW1lfSBpcyBub3QgYSBsZWdhbCBIVFRQIGhlYWRlciBuYW1lYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZSh2YWx1ZSkge1xuXHR2YWx1ZSA9IGAke3ZhbHVlfWA7XG5cdGlmIChpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3QodmFsdWUpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHt2YWx1ZX0gaXMgbm90IGEgbGVnYWwgSFRUUCBoZWFkZXIgdmFsdWVgKTtcblx0fVxufVxuXG4vKipcbiAqIEZpbmQgdGhlIGtleSBpbiB0aGUgbWFwIG9iamVjdCBnaXZlbiBhIGhlYWRlciBuYW1lLlxuICpcbiAqIFJldHVybnMgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqXG4gKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgIEhlYWRlciBuYW1lXG4gKiBAcmV0dXJuICBTdHJpbmd8VW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGZpbmQobWFwLCBuYW1lKSB7XG5cdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdGZvciAoY29uc3Qga2V5IGluIG1hcCkge1xuXHRcdGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSkge1xuXHRcdFx0cmV0dXJuIGtleTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuY29uc3QgTUFQID0gU3ltYm9sKCdtYXAnKTtcbmNsYXNzIEhlYWRlcnMge1xuXHQvKipcbiAgKiBIZWFkZXJzIGNsYXNzXG4gICpcbiAgKiBAcGFyYW0gICBPYmplY3QgIGhlYWRlcnMgIFJlc3BvbnNlIGhlYWRlcnNcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGxldCBpbml0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQ7XG5cblx0XHR0aGlzW01BUF0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5cdFx0aWYgKGluaXQgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG5cdFx0XHRjb25zdCByYXdIZWFkZXJzID0gaW5pdC5yYXcoKTtcblx0XHRcdGNvbnN0IGhlYWRlck5hbWVzID0gT2JqZWN0LmtleXMocmF3SGVhZGVycyk7XG5cblx0XHRcdGZvciAoY29uc3QgaGVhZGVyTmFtZSBvZiBoZWFkZXJOYW1lcykge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHZhbHVlIG9mIHJhd0hlYWRlcnNbaGVhZGVyTmFtZV0pIHtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChoZWFkZXJOYW1lLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFdlIGRvbid0IHdvcnJ5IGFib3V0IGNvbnZlcnRpbmcgcHJvcCB0byBCeXRlU3RyaW5nIGhlcmUgYXMgYXBwZW5kKClcblx0XHQvLyB3aWxsIGhhbmRsZSBpdC5cblx0XHRpZiAoaW5pdCA9PSBudWxsKSA7IGVsc2UgaWYgKHR5cGVvZiBpbml0ID09PSAnb2JqZWN0Jykge1xuXHRcdFx0Y29uc3QgbWV0aG9kID0gaW5pdFtTeW1ib2wuaXRlcmF0b3JdO1xuXHRcdFx0aWYgKG1ldGhvZCAhPSBudWxsKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgbWV0aG9kICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignSGVhZGVyIHBhaXJzIG11c3QgYmUgaXRlcmFibGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHNlcXVlbmNlPHNlcXVlbmNlPEJ5dGVTdHJpbmc+PlxuXHRcdFx0XHQvLyBOb3RlOiBwZXIgc3BlYyB3ZSBoYXZlIHRvIGZpcnN0IGV4aGF1c3QgdGhlIGxpc3RzIHRoZW4gcHJvY2VzcyB0aGVtXG5cdFx0XHRcdGNvbnN0IHBhaXJzID0gW107XG5cdFx0XHRcdGZvciAoY29uc3QgcGFpciBvZiBpbml0KSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBwYWlyICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFpcltTeW1ib2wuaXRlcmF0b3JdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgaXRlcmFibGUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cGFpcnMucHVzaChBcnJheS5mcm9tKHBhaXIpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAoY29uc3QgcGFpciBvZiBwYWlycykge1xuXHRcdFx0XHRcdGlmIChwYWlyLmxlbmd0aCAhPT0gMikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRWFjaCBoZWFkZXIgcGFpciBtdXN0IGJlIGEgbmFtZS92YWx1ZSB0dXBsZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLmFwcGVuZChwYWlyWzBdLCBwYWlyWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gcmVjb3JkPEJ5dGVTdHJpbmcsIEJ5dGVTdHJpbmc+XG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGluaXQpKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBpbml0W2tleV07XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignUHJvdmlkZWQgaW5pdGlhbGl6ZXIgbXVzdCBiZSBhbiBvYmplY3QnKTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBSZXR1cm4gY29tYmluZWQgaGVhZGVyIHZhbHVlIGdpdmVuIG5hbWVcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgSGVhZGVyIG5hbWVcbiAgKiBAcmV0dXJuICBNaXhlZFxuICAqL1xuXHRnZXQobmFtZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHRpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzW01BUF1ba2V5XS5qb2luKCcsICcpO1xuXHR9XG5cblx0LyoqXG4gICogSXRlcmF0ZSBvdmVyIGFsbCBoZWFkZXJzXG4gICpcbiAgKiBAcGFyYW0gICBGdW5jdGlvbiAgY2FsbGJhY2sgIEV4ZWN1dGVkIGZvciBlYWNoIGl0ZW0gd2l0aCBwYXJhbWV0ZXJzICh2YWx1ZSwgbmFtZSwgdGhpc0FyZylcbiAgKiBAcGFyYW0gICBCb29sZWFuICAgdGhpc0FyZyAgIGB0aGlzYCBjb250ZXh0IGZvciBjYWxsYmFjayBmdW5jdGlvblxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0Zm9yRWFjaChjYWxsYmFjaykge1xuXHRcdGxldCB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG5cblx0XHRsZXQgcGFpcnMgPSBnZXRIZWFkZXJzKHRoaXMpO1xuXHRcdGxldCBpID0gMDtcblx0XHR3aGlsZSAoaSA8IHBhaXJzLmxlbmd0aCkge1xuXHRcdFx0dmFyIF9wYWlycyRpID0gcGFpcnNbaV07XG5cdFx0XHRjb25zdCBuYW1lID0gX3BhaXJzJGlbMF0sXG5cdFx0XHQgICAgICB2YWx1ZSA9IF9wYWlycyRpWzFdO1xuXG5cdFx0XHRjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCB0aGlzKTtcblx0XHRcdHBhaXJzID0gZ2V0SGVhZGVycyh0aGlzKTtcblx0XHRcdGkrKztcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBPdmVyd3JpdGUgaGVhZGVyIHZhbHVlcyBnaXZlbiBuYW1lXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgICBIZWFkZXIgbmFtZVxuICAqIEBwYXJhbSAgIFN0cmluZyAgdmFsdWUgIEhlYWRlciB2YWx1ZVxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0c2V0KG5hbWUsIHZhbHVlKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWx1ZSA9IGAke3ZhbHVlfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdHZhbGlkYXRlVmFsdWUodmFsdWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHR0aGlzW01BUF1ba2V5ICE9PSB1bmRlZmluZWQgPyBrZXkgOiBuYW1lXSA9IFt2YWx1ZV07XG5cdH1cblxuXHQvKipcbiAgKiBBcHBlbmQgYSB2YWx1ZSBvbnRvIGV4aXN0aW5nIGhlYWRlclxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICAgSGVhZGVyIG5hbWVcbiAgKiBAcGFyYW0gICBTdHJpbmcgIHZhbHVlICBIZWFkZXIgdmFsdWVcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsdWUgPSBgJHt2YWx1ZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHR2YWxpZGF0ZVZhbHVlKHZhbHVlKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0aWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzW01BUF1ba2V5XS5wdXNoKHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpc1tNQVBdW25hbWVdID0gW3ZhbHVlXTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBDaGVjayBmb3IgaGVhZGVyIG5hbWUgZXhpc3RlbmNlXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgICBuYW1lICBIZWFkZXIgbmFtZVxuICAqIEByZXR1cm4gIEJvb2xlYW5cbiAgKi9cblx0aGFzKG5hbWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHRyZXR1cm4gZmluZCh0aGlzW01BUF0sIG5hbWUpICE9PSB1bmRlZmluZWQ7XG5cdH1cblxuXHQvKipcbiAgKiBEZWxldGUgYWxsIGhlYWRlciB2YWx1ZXMgZ2l2ZW4gbmFtZVxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICBIZWFkZXIgbmFtZVxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0ZGVsZXRlKG5hbWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0aWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRkZWxldGUgdGhpc1tNQVBdW2tleV07XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogUmV0dXJuIHJhdyBoZWFkZXJzIChub24tc3BlYyBhcGkpXG4gICpcbiAgKiBAcmV0dXJuICBPYmplY3RcbiAgKi9cblx0cmF3KCkge1xuXHRcdHJldHVybiB0aGlzW01BUF07XG5cdH1cblxuXHQvKipcbiAgKiBHZXQgYW4gaXRlcmF0b3Igb24ga2V5cy5cbiAgKlxuICAqIEByZXR1cm4gIEl0ZXJhdG9yXG4gICovXG5cdGtleXMoKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0aGlzLCAna2V5Jyk7XG5cdH1cblxuXHQvKipcbiAgKiBHZXQgYW4gaXRlcmF0b3Igb24gdmFsdWVzLlxuICAqXG4gICogQHJldHVybiAgSXRlcmF0b3JcbiAgKi9cblx0dmFsdWVzKCkge1xuXHRcdHJldHVybiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGhpcywgJ3ZhbHVlJyk7XG5cdH1cblxuXHQvKipcbiAgKiBHZXQgYW4gaXRlcmF0b3Igb24gZW50cmllcy5cbiAgKlxuICAqIFRoaXMgaXMgdGhlIGRlZmF1bHQgaXRlcmF0b3Igb2YgdGhlIEhlYWRlcnMgb2JqZWN0LlxuICAqXG4gICogQHJldHVybiAgSXRlcmF0b3JcbiAgKi9cblx0W1N5bWJvbC5pdGVyYXRvcl0oKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0aGlzLCAna2V5K3ZhbHVlJyk7XG5cdH1cbn1cbkhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSGVhZGVycy5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ0hlYWRlcnMnLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhIZWFkZXJzLnByb3RvdHlwZSwge1xuXHRnZXQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRmb3JFYWNoOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c2V0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0YXBwZW5kOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0aGFzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0ZGVsZXRlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0a2V5czogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHZhbHVlczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGVudHJpZXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuZnVuY3Rpb24gZ2V0SGVhZGVycyhoZWFkZXJzKSB7XG5cdGxldCBraW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAna2V5K3ZhbHVlJztcblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaGVhZGVyc1tNQVBdKS5zb3J0KCk7XG5cdHJldHVybiBrZXlzLm1hcChraW5kID09PSAna2V5JyA/IGZ1bmN0aW9uIChrKSB7XG5cdFx0cmV0dXJuIGsudG9Mb3dlckNhc2UoKTtcblx0fSA6IGtpbmQgPT09ICd2YWx1ZScgPyBmdW5jdGlvbiAoaykge1xuXHRcdHJldHVybiBoZWFkZXJzW01BUF1ba10uam9pbignLCAnKTtcblx0fSA6IGZ1bmN0aW9uIChrKSB7XG5cdFx0cmV0dXJuIFtrLnRvTG93ZXJDYXNlKCksIGhlYWRlcnNbTUFQXVtrXS5qb2luKCcsICcpXTtcblx0fSk7XG59XG5cbmNvbnN0IElOVEVSTkFMID0gU3ltYm9sKCdpbnRlcm5hbCcpO1xuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGFyZ2V0LCBraW5kKSB7XG5cdGNvbnN0IGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUpO1xuXHRpdGVyYXRvcltJTlRFUk5BTF0gPSB7XG5cdFx0dGFyZ2V0LFxuXHRcdGtpbmQsXG5cdFx0aW5kZXg6IDBcblx0fTtcblx0cmV0dXJuIGl0ZXJhdG9yO1xufVxuXG5jb25zdCBIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUgPSBPYmplY3Quc2V0UHJvdG90eXBlT2Yoe1xuXHRuZXh0KCkge1xuXHRcdC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuXHRcdGlmICghdGhpcyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykgIT09IEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgb2YgYHRoaXNgIGlzIG5vdCBhIEhlYWRlcnNJdGVyYXRvcicpO1xuXHRcdH1cblxuXHRcdHZhciBfSU5URVJOQUwgPSB0aGlzW0lOVEVSTkFMXTtcblx0XHRjb25zdCB0YXJnZXQgPSBfSU5URVJOQUwudGFyZ2V0LFxuXHRcdCAgICAgIGtpbmQgPSBfSU5URVJOQUwua2luZCxcblx0XHQgICAgICBpbmRleCA9IF9JTlRFUk5BTC5pbmRleDtcblxuXHRcdGNvbnN0IHZhbHVlcyA9IGdldEhlYWRlcnModGFyZ2V0LCBraW5kKTtcblx0XHRjb25zdCBsZW4gPSB2YWx1ZXMubGVuZ3RoO1xuXHRcdGlmIChpbmRleCA+PSBsZW4pIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHZhbHVlOiB1bmRlZmluZWQsXG5cdFx0XHRcdGRvbmU6IHRydWVcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTF0uaW5kZXggPSBpbmRleCArIDE7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHZhbHVlc1tpbmRleF0sXG5cdFx0XHRkb25lOiBmYWxzZVxuXHRcdH07XG5cdH1cbn0sIE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3QuZ2V0UHJvdG90eXBlT2YoW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdIZWFkZXJzSXRlcmF0b3InLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG4vKipcbiAqIEV4cG9ydCB0aGUgSGVhZGVycyBvYmplY3QgaW4gYSBmb3JtIHRoYXQgTm9kZS5qcyBjYW4gY29uc3VtZS5cbiAqXG4gKiBAcGFyYW0gICBIZWFkZXJzICBoZWFkZXJzXG4gKiBAcmV0dXJuICBPYmplY3RcbiAqL1xuZnVuY3Rpb24gZXhwb3J0Tm9kZUNvbXBhdGlibGVIZWFkZXJzKGhlYWRlcnMpIHtcblx0Y29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbih7IF9fcHJvdG9fXzogbnVsbCB9LCBoZWFkZXJzW01BUF0pO1xuXG5cdC8vIGh0dHAucmVxdWVzdCgpIG9ubHkgc3VwcG9ydHMgc3RyaW5nIGFzIEhvc3QgaGVhZGVyLiBUaGlzIGhhY2sgbWFrZXNcblx0Ly8gc3BlY2lmeWluZyBjdXN0b20gSG9zdCBoZWFkZXIgcG9zc2libGUuXG5cdGNvbnN0IGhvc3RIZWFkZXJLZXkgPSBmaW5kKGhlYWRlcnNbTUFQXSwgJ0hvc3QnKTtcblx0aWYgKGhvc3RIZWFkZXJLZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdG9ialtob3N0SGVhZGVyS2V5XSA9IG9ialtob3N0SGVhZGVyS2V5XVswXTtcblx0fVxuXG5cdHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgSGVhZGVycyBvYmplY3QgZnJvbSBhbiBvYmplY3Qgb2YgaGVhZGVycywgaWdub3JpbmcgdGhvc2UgdGhhdCBkb1xuICogbm90IGNvbmZvcm0gdG8gSFRUUCBncmFtbWFyIHByb2R1Y3Rpb25zLlxuICpcbiAqIEBwYXJhbSAgIE9iamVjdCAgb2JqICBPYmplY3Qgb2YgaGVhZGVyc1xuICogQHJldHVybiAgSGVhZGVyc1xuICovXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJzTGVuaWVudChvYmopIHtcblx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG5cdGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG5cdFx0aWYgKGludmFsaWRUb2tlblJlZ2V4LnRlc3QobmFtZSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmpbbmFtZV0pKSB7XG5cdFx0XHRmb3IgKGNvbnN0IHZhbCBvZiBvYmpbbmFtZV0pIHtcblx0XHRcdFx0aWYgKGludmFsaWRIZWFkZXJDaGFyUmVnZXgudGVzdCh2YWwpKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGhlYWRlcnNbTUFQXVtuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0aGVhZGVyc1tNQVBdW25hbWVdID0gW3ZhbF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGVhZGVyc1tNQVBdW25hbWVdLnB1c2godmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoIWludmFsaWRIZWFkZXJDaGFyUmVnZXgudGVzdChvYmpbbmFtZV0pKSB7XG5cdFx0XHRoZWFkZXJzW01BUF1bbmFtZV0gPSBbb2JqW25hbWVdXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGhlYWRlcnM7XG59XG5cbmNvbnN0IElOVEVSTkFMUyQxID0gU3ltYm9sKCdSZXNwb25zZSBpbnRlcm5hbHMnKTtcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiU1RBVFVTX0NPREVTXCIgYXJlbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgU1RBVFVTX0NPREVTID0gaHR0cC5TVEFUVVNfQ09ERVM7XG5cbi8qKlxuICogUmVzcG9uc2UgY2xhc3NcbiAqXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmNsYXNzIFJlc3BvbnNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0bGV0IGJvZHkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG5cdFx0bGV0IG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG5cdFx0Qm9keS5jYWxsKHRoaXMsIGJvZHksIG9wdHMpO1xuXG5cdFx0Y29uc3Qgc3RhdHVzID0gb3B0cy5zdGF0dXMgfHwgMjAwO1xuXHRcdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRzLmhlYWRlcnMpO1xuXG5cdFx0aWYgKGJvZHkgIT0gbnVsbCAmJiAhaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpKSB7XG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IGV4dHJhY3RDb250ZW50VHlwZShib2R5KTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTJDFdID0ge1xuXHRcdFx0dXJsOiBvcHRzLnVybCxcblx0XHRcdHN0YXR1cyxcblx0XHRcdHN0YXR1c1RleHQ6IG9wdHMuc3RhdHVzVGV4dCB8fCBTVEFUVVNfQ09ERVNbc3RhdHVzXSxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRjb3VudGVyOiBvcHRzLmNvdW50ZXJcblx0XHR9O1xuXHR9XG5cblx0Z2V0IHVybCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0udXJsIHx8ICcnO1xuXHR9XG5cblx0Z2V0IHN0YXR1cygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzO1xuXHR9XG5cblx0LyoqXG4gICogQ29udmVuaWVuY2UgcHJvcGVydHkgcmVwcmVzZW50aW5nIGlmIHRoZSByZXF1ZXN0IGVuZGVkIG5vcm1hbGx5XG4gICovXG5cdGdldCBvaygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzID49IDIwMCAmJiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXMgPCAzMDA7XG5cdH1cblxuXHRnZXQgcmVkaXJlY3RlZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uY291bnRlciA+IDA7XG5cdH1cblxuXHRnZXQgc3RhdHVzVGV4dCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzVGV4dDtcblx0fVxuXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5oZWFkZXJzO1xuXHR9XG5cblx0LyoqXG4gICogQ2xvbmUgdGhpcyByZXNwb25zZVxuICAqXG4gICogQHJldHVybiAgUmVzcG9uc2VcbiAgKi9cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIG5ldyBSZXNwb25zZShjbG9uZSh0aGlzKSwge1xuXHRcdFx0dXJsOiB0aGlzLnVybCxcblx0XHRcdHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHRzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG5cdFx0XHRoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG5cdFx0XHRvazogdGhpcy5vayxcblx0XHRcdHJlZGlyZWN0ZWQ6IHRoaXMucmVkaXJlY3RlZFxuXHRcdH0pO1xuXHR9XG59XG5cbkJvZHkubWl4SW4oUmVzcG9uc2UucHJvdG90eXBlKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVzcG9uc2UucHJvdG90eXBlLCB7XG5cdHVybDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHN0YXR1czogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdG9rOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0cmVkaXJlY3RlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHN0YXR1c1RleHQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRoZWFkZXJzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Y2xvbmU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlc3BvbnNlLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnUmVzcG9uc2UnLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5jb25zdCBJTlRFUk5BTFMkMiA9IFN5bWJvbCgnUmVxdWVzdCBpbnRlcm5hbHMnKTtcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiZm9ybWF0XCIsIFwicGFyc2VcIiBhcmVuJ3QgYSBuYW1lZCBleHBvcnQgZm9yIG5vZGUgPDEwXG5jb25zdCBwYXJzZV91cmwgPSBVcmwucGFyc2U7XG5jb25zdCBmb3JtYXRfdXJsID0gVXJsLmZvcm1hdDtcblxuY29uc3Qgc3RyZWFtRGVzdHJ1Y3Rpb25TdXBwb3J0ZWQgPSAnZGVzdHJveScgaW4gU3RyZWFtLlJlYWRhYmxlLnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIFJlcXVlc3QuXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnB1dFxuICogQHJldHVybiAgQm9vbGVhblxuICovXG5mdW5jdGlvbiBpc1JlcXVlc3QoaW5wdXQpIHtcblx0cmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGlucHV0W0lOVEVSTkFMUyQyXSA9PT0gJ29iamVjdCc7XG59XG5cbmZ1bmN0aW9uIGlzQWJvcnRTaWduYWwoc2lnbmFsKSB7XG5cdGNvbnN0IHByb3RvID0gc2lnbmFsICYmIHR5cGVvZiBzaWduYWwgPT09ICdvYmplY3QnICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihzaWduYWwpO1xuXHRyZXR1cm4gISEocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSA9PT0gJ0Fib3J0U2lnbmFsJyk7XG59XG5cbi8qKlxuICogUmVxdWVzdCBjbGFzc1xuICpcbiAqIEBwYXJhbSAgIE1peGVkICAgaW5wdXQgIFVybCBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0gICBPYmplY3QgIGluaXQgICBDdXN0b20gb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5jbGFzcyBSZXF1ZXN0IHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRsZXQgaW5pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cblx0XHRsZXQgcGFyc2VkVVJMO1xuXG5cdFx0Ly8gbm9ybWFsaXplIGlucHV0XG5cdFx0aWYgKCFpc1JlcXVlc3QoaW5wdXQpKSB7XG5cdFx0XHRpZiAoaW5wdXQgJiYgaW5wdXQuaHJlZikge1xuXHRcdFx0XHQvLyBpbiBvcmRlciB0byBzdXBwb3J0IE5vZGUuanMnIFVybCBvYmplY3RzOyB0aG91Z2ggV0hBVFdHJ3MgVVJMIG9iamVjdHNcblx0XHRcdFx0Ly8gd2lsbCBmYWxsIGludG8gdGhpcyBicmFuY2ggYWxzbyAoc2luY2UgdGhlaXIgYHRvU3RyaW5nKClgIHdpbGwgcmV0dXJuXG5cdFx0XHRcdC8vIGBocmVmYCBwcm9wZXJ0eSBhbnl3YXkpXG5cdFx0XHRcdHBhcnNlZFVSTCA9IHBhcnNlX3VybChpbnB1dC5ocmVmKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGNvZXJjZSBpbnB1dCB0byBhIHN0cmluZyBiZWZvcmUgYXR0ZW1wdGluZyB0byBwYXJzZVxuXHRcdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoYCR7aW5wdXR9YCk7XG5cdFx0XHR9XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoaW5wdXQudXJsKTtcblx0XHR9XG5cblx0XHRsZXQgbWV0aG9kID0gaW5pdC5tZXRob2QgfHwgaW5wdXQubWV0aG9kIHx8ICdHRVQnO1xuXHRcdG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0aWYgKChpbml0LmJvZHkgIT0gbnVsbCB8fCBpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwpICYmIChtZXRob2QgPT09ICdHRVQnIHx8IG1ldGhvZCA9PT0gJ0hFQUQnKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignUmVxdWVzdCB3aXRoIEdFVC9IRUFEIG1ldGhvZCBjYW5ub3QgaGF2ZSBib2R5Jyk7XG5cdFx0fVxuXG5cdFx0bGV0IGlucHV0Qm9keSA9IGluaXQuYm9keSAhPSBudWxsID8gaW5pdC5ib2R5IDogaXNSZXF1ZXN0KGlucHV0KSAmJiBpbnB1dC5ib2R5ICE9PSBudWxsID8gY2xvbmUoaW5wdXQpIDogbnVsbDtcblxuXHRcdEJvZHkuY2FsbCh0aGlzLCBpbnB1dEJvZHksIHtcblx0XHRcdHRpbWVvdXQ6IGluaXQudGltZW91dCB8fCBpbnB1dC50aW1lb3V0IHx8IDAsXG5cdFx0XHRzaXplOiBpbml0LnNpemUgfHwgaW5wdXQuc2l6ZSB8fCAwXG5cdFx0fSk7XG5cblx0XHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5pdC5oZWFkZXJzIHx8IGlucHV0LmhlYWRlcnMgfHwge30pO1xuXG5cdFx0aWYgKGlucHV0Qm9keSAhPSBudWxsICYmICFoZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcblx0XHRcdGNvbnN0IGNvbnRlbnRUeXBlID0gZXh0cmFjdENvbnRlbnRUeXBlKGlucHV0Qm9keSk7XG5cdFx0XHRpZiAoY29udGVudFR5cGUpIHtcblx0XHRcdFx0aGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgc2lnbmFsID0gaXNSZXF1ZXN0KGlucHV0KSA/IGlucHV0LnNpZ25hbCA6IG51bGw7XG5cdFx0aWYgKCdzaWduYWwnIGluIGluaXQpIHNpZ25hbCA9IGluaXQuc2lnbmFsO1xuXG5cdFx0aWYgKHNpZ25hbCAhPSBudWxsICYmICFpc0Fib3J0U2lnbmFsKHNpZ25hbCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNpZ25hbCB0byBiZSBhbiBpbnN0YW5jZW9mIEFib3J0U2lnbmFsJyk7XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTFMkMl0gPSB7XG5cdFx0XHRtZXRob2QsXG5cdFx0XHRyZWRpcmVjdDogaW5pdC5yZWRpcmVjdCB8fCBpbnB1dC5yZWRpcmVjdCB8fCAnZm9sbG93Jyxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRwYXJzZWRVUkwsXG5cdFx0XHRzaWduYWxcblx0XHR9O1xuXG5cdFx0Ly8gbm9kZS1mZXRjaC1vbmx5IG9wdGlvbnNcblx0XHR0aGlzLmZvbGxvdyA9IGluaXQuZm9sbG93ICE9PSB1bmRlZmluZWQgPyBpbml0LmZvbGxvdyA6IGlucHV0LmZvbGxvdyAhPT0gdW5kZWZpbmVkID8gaW5wdXQuZm9sbG93IDogMjA7XG5cdFx0dGhpcy5jb21wcmVzcyA9IGluaXQuY29tcHJlc3MgIT09IHVuZGVmaW5lZCA/IGluaXQuY29tcHJlc3MgOiBpbnB1dC5jb21wcmVzcyAhPT0gdW5kZWZpbmVkID8gaW5wdXQuY29tcHJlc3MgOiB0cnVlO1xuXHRcdHRoaXMuY291bnRlciA9IGluaXQuY291bnRlciB8fCBpbnB1dC5jb3VudGVyIHx8IDA7XG5cdFx0dGhpcy5hZ2VudCA9IGluaXQuYWdlbnQgfHwgaW5wdXQuYWdlbnQ7XG5cdH1cblxuXHRnZXQgbWV0aG9kKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5tZXRob2Q7XG5cdH1cblxuXHRnZXQgdXJsKCkge1xuXHRcdHJldHVybiBmb3JtYXRfdXJsKHRoaXNbSU5URVJOQUxTJDJdLnBhcnNlZFVSTCk7XG5cdH1cblxuXHRnZXQgaGVhZGVycygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0uaGVhZGVycztcblx0fVxuXG5cdGdldCByZWRpcmVjdCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0ucmVkaXJlY3Q7XG5cdH1cblxuXHRnZXQgc2lnbmFsKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5zaWduYWw7XG5cdH1cblxuXHQvKipcbiAgKiBDbG9uZSB0aGlzIHJlcXVlc3RcbiAgKlxuICAqIEByZXR1cm4gIFJlcXVlc3RcbiAgKi9cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMpO1xuXHR9XG59XG5cbkJvZHkubWl4SW4oUmVxdWVzdC5wcm90b3R5cGUpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVxdWVzdC5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ1JlcXVlc3QnLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXF1ZXN0LnByb3RvdHlwZSwge1xuXHRtZXRob2Q6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR1cmw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRoZWFkZXJzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0cmVkaXJlY3Q6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRjbG9uZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHNpZ25hbDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBSZXF1ZXN0IHRvIE5vZGUuanMgaHR0cCByZXF1ZXN0IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICAgUmVxdWVzdCAgQSBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcmV0dXJuICBPYmplY3QgICBUaGUgb3B0aW9ucyBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGh0dHAucmVxdWVzdFxuICovXG5mdW5jdGlvbiBnZXROb2RlUmVxdWVzdE9wdGlvbnMocmVxdWVzdCkge1xuXHRjb25zdCBwYXJzZWRVUkwgPSByZXF1ZXN0W0lOVEVSTkFMUyQyXS5wYXJzZWRVUkw7XG5cdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXF1ZXN0W0lOVEVSTkFMUyQyXS5oZWFkZXJzKTtcblxuXHQvLyBmZXRjaCBzdGVwIDEuM1xuXHRpZiAoIWhlYWRlcnMuaGFzKCdBY2NlcHQnKSkge1xuXHRcdGhlYWRlcnMuc2V0KCdBY2NlcHQnLCAnKi8qJyk7XG5cdH1cblxuXHQvLyBCYXNpYyBmZXRjaFxuXHRpZiAoIXBhcnNlZFVSTC5wcm90b2NvbCB8fCAhcGFyc2VkVVJMLmhvc3RuYW1lKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT25seSBhYnNvbHV0ZSBVUkxzIGFyZSBzdXBwb3J0ZWQnKTtcblx0fVxuXG5cdGlmICghL15odHRwcz86JC8udGVzdChwYXJzZWRVUkwucHJvdG9jb2wpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT25seSBIVFRQKFMpIHByb3RvY29scyBhcmUgc3VwcG9ydGVkJyk7XG5cdH1cblxuXHRpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgU3RyZWFtLlJlYWRhYmxlICYmICFzdHJlYW1EZXN0cnVjdGlvblN1cHBvcnRlZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2FuY2VsbGF0aW9uIG9mIHN0cmVhbWVkIHJlcXVlc3RzIHdpdGggQWJvcnRTaWduYWwgaXMgbm90IHN1cHBvcnRlZCBpbiBub2RlIDwgOCcpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXBzIDIuNC0yLjdcblx0bGV0IGNvbnRlbnRMZW5ndGhWYWx1ZSA9IG51bGw7XG5cdGlmIChyZXF1ZXN0LmJvZHkgPT0gbnVsbCAmJiAvXihQT1NUfFBVVCkkL2kudGVzdChyZXF1ZXN0Lm1ldGhvZCkpIHtcblx0XHRjb250ZW50TGVuZ3RoVmFsdWUgPSAnMCc7XG5cdH1cblx0aWYgKHJlcXVlc3QuYm9keSAhPSBudWxsKSB7XG5cdFx0Y29uc3QgdG90YWxCeXRlcyA9IGdldFRvdGFsQnl0ZXMocmVxdWVzdCk7XG5cdFx0aWYgKHR5cGVvZiB0b3RhbEJ5dGVzID09PSAnbnVtYmVyJykge1xuXHRcdFx0Y29udGVudExlbmd0aFZhbHVlID0gU3RyaW5nKHRvdGFsQnl0ZXMpO1xuXHRcdH1cblx0fVxuXHRpZiAoY29udGVudExlbmd0aFZhbHVlKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0NvbnRlbnQtTGVuZ3RoJywgY29udGVudExlbmd0aFZhbHVlKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwIDIuMTFcblx0aWYgKCFoZWFkZXJzLmhhcygnVXNlci1BZ2VudCcpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnbm9kZS1mZXRjaC8xLjAgKCtodHRwczovL2dpdGh1Yi5jb20vYml0aW5uL25vZGUtZmV0Y2gpJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcCAyLjE1XG5cdGlmIChyZXF1ZXN0LmNvbXByZXNzICYmICFoZWFkZXJzLmhhcygnQWNjZXB0LUVuY29kaW5nJykpIHtcblx0XHRoZWFkZXJzLnNldCgnQWNjZXB0LUVuY29kaW5nJywgJ2d6aXAsZGVmbGF0ZScpO1xuXHR9XG5cblx0bGV0IGFnZW50ID0gcmVxdWVzdC5hZ2VudDtcblx0aWYgKHR5cGVvZiBhZ2VudCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGFnZW50ID0gYWdlbnQocGFyc2VkVVJMKTtcblx0fVxuXG5cdGlmICghaGVhZGVycy5oYXMoJ0Nvbm5lY3Rpb24nKSAmJiAhYWdlbnQpIHtcblx0XHRoZWFkZXJzLnNldCgnQ29ubmVjdGlvbicsICdjbG9zZScpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgNC4yXG5cdC8vIGNodW5rZWQgZW5jb2RpbmcgaXMgaGFuZGxlZCBieSBOb2RlLmpzXG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHBhcnNlZFVSTCwge1xuXHRcdG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXG5cdFx0aGVhZGVyczogZXhwb3J0Tm9kZUNvbXBhdGlibGVIZWFkZXJzKGhlYWRlcnMpLFxuXHRcdGFnZW50XG5cdH0pO1xufVxuXG4vKipcbiAqIGFib3J0LWVycm9yLmpzXG4gKlxuICogQWJvcnRFcnJvciBpbnRlcmZhY2UgZm9yIGNhbmNlbGxlZCByZXF1ZXN0c1xuICovXG5cbi8qKlxuICogQ3JlYXRlIEFib3J0RXJyb3IgaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gICBTdHJpbmcgICAgICBtZXNzYWdlICAgICAgRXJyb3IgbWVzc2FnZSBmb3IgaHVtYW5cbiAqIEByZXR1cm4gIEFib3J0RXJyb3JcbiAqL1xuZnVuY3Rpb24gQWJvcnRFcnJvcihtZXNzYWdlKSB7XG4gIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgdGhpcy50eXBlID0gJ2Fib3J0ZWQnO1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gIC8vIGhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG59XG5cbkFib3J0RXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuQWJvcnRFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBYm9ydEVycm9yO1xuQWJvcnRFcnJvci5wcm90b3R5cGUubmFtZSA9ICdBYm9ydEVycm9yJztcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiUGFzc1Rocm91Z2hcIiwgXCJyZXNvbHZlXCIgYXJlbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgUGFzc1Rocm91Z2gkMSA9IFN0cmVhbS5QYXNzVGhyb3VnaDtcbmNvbnN0IHJlc29sdmVfdXJsID0gVXJsLnJlc29sdmU7XG5cbi8qKlxuICogRmV0Y2ggZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgICB1cmwgICBBYnNvbHV0ZSB1cmwgb3IgUmVxdWVzdCBpbnN0YW5jZVxuICogQHBhcmFtICAgT2JqZWN0ICAgb3B0cyAgRmV0Y2ggb3B0aW9uc1xuICogQHJldHVybiAgUHJvbWlzZVxuICovXG5mdW5jdGlvbiBmZXRjaCh1cmwsIG9wdHMpIHtcblxuXHQvLyBhbGxvdyBjdXN0b20gcHJvbWlzZVxuXHRpZiAoIWZldGNoLlByb21pc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ25hdGl2ZSBwcm9taXNlIG1pc3NpbmcsIHNldCBmZXRjaC5Qcm9taXNlIHRvIHlvdXIgZmF2b3JpdGUgYWx0ZXJuYXRpdmUnKTtcblx0fVxuXG5cdEJvZHkuUHJvbWlzZSA9IGZldGNoLlByb21pc2U7XG5cblx0Ly8gd3JhcCBodHRwLnJlcXVlc3QgaW50byBmZXRjaFxuXHRyZXR1cm4gbmV3IGZldGNoLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdC8vIGJ1aWxkIHJlcXVlc3Qgb2JqZWN0XG5cdFx0Y29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwgb3B0cyk7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IGdldE5vZGVSZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0KTtcblxuXHRcdGNvbnN0IHNlbmQgPSAob3B0aW9ucy5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyBodHRwcyA6IGh0dHApLnJlcXVlc3Q7XG5cdFx0Y29uc3Qgc2lnbmFsID0gcmVxdWVzdC5zaWduYWw7XG5cblx0XHRsZXQgcmVzcG9uc2UgPSBudWxsO1xuXG5cdFx0Y29uc3QgYWJvcnQgPSBmdW5jdGlvbiBhYm9ydCgpIHtcblx0XHRcdGxldCBlcnJvciA9IG5ldyBBYm9ydEVycm9yKCdUaGUgdXNlciBhYm9ydGVkIGEgcmVxdWVzdC4nKTtcblx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRpZiAocmVxdWVzdC5ib2R5ICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIFN0cmVhbS5SZWFkYWJsZSkge1xuXHRcdFx0XHRyZXF1ZXN0LmJvZHkuZGVzdHJveShlcnJvcik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5ib2R5KSByZXR1cm47XG5cdFx0XHRyZXNwb25zZS5ib2R5LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuXHRcdH07XG5cblx0XHRpZiAoc2lnbmFsICYmIHNpZ25hbC5hYm9ydGVkKSB7XG5cdFx0XHRhYm9ydCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFib3J0QW5kRmluYWxpemUgPSBmdW5jdGlvbiBhYm9ydEFuZEZpbmFsaXplKCkge1xuXHRcdFx0YWJvcnQoKTtcblx0XHRcdGZpbmFsaXplKCk7XG5cdFx0fTtcblxuXHRcdC8vIHNlbmQgcmVxdWVzdFxuXHRcdGNvbnN0IHJlcSA9IHNlbmQob3B0aW9ucyk7XG5cdFx0bGV0IHJlcVRpbWVvdXQ7XG5cblx0XHRpZiAoc2lnbmFsKSB7XG5cdFx0XHRzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmaW5hbGl6ZSgpIHtcblx0XHRcdHJlcS5hYm9ydCgpO1xuXHRcdFx0aWYgKHNpZ25hbCkgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHRjbGVhclRpbWVvdXQocmVxVGltZW91dCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJlcXVlc3QudGltZW91dCkge1xuXHRcdFx0cmVxLm9uY2UoJ3NvY2tldCcsIGZ1bmN0aW9uIChzb2NrZXQpIHtcblx0XHRcdFx0cmVxVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgbmV0d29yayB0aW1lb3V0IGF0OiAke3JlcXVlc3QudXJsfWAsICdyZXF1ZXN0LXRpbWVvdXQnKSk7XG5cdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0fSwgcmVxdWVzdC50aW1lb3V0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYHJlcXVlc3QgdG8gJHtyZXF1ZXN0LnVybH0gZmFpbGVkLCByZWFzb246ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycikpO1xuXHRcdFx0ZmluYWxpemUoKTtcblx0XHR9KTtcblxuXHRcdHJlcS5vbigncmVzcG9uc2UnLCBmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQocmVxVGltZW91dCk7XG5cblx0XHRcdGNvbnN0IGhlYWRlcnMgPSBjcmVhdGVIZWFkZXJzTGVuaWVudChyZXMuaGVhZGVycyk7XG5cblx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1XG5cdFx0XHRpZiAoZmV0Y2guaXNSZWRpcmVjdChyZXMuc3RhdHVzQ29kZSkpIHtcblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuMlxuXHRcdFx0XHRjb25zdCBsb2NhdGlvbiA9IGhlYWRlcnMuZ2V0KCdMb2NhdGlvbicpO1xuXG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjNcblx0XHRcdFx0Y29uc3QgbG9jYXRpb25VUkwgPSBsb2NhdGlvbiA9PT0gbnVsbCA/IG51bGwgOiByZXNvbHZlX3VybChyZXF1ZXN0LnVybCwgbG9jYXRpb24pO1xuXG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjVcblx0XHRcdFx0c3dpdGNoIChyZXF1ZXN0LnJlZGlyZWN0KSB7XG5cdFx0XHRcdFx0Y2FzZSAnZXJyb3InOlxuXHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGByZWRpcmVjdCBtb2RlIGlzIHNldCB0byBlcnJvcjogJHtyZXF1ZXN0LnVybH1gLCAnbm8tcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdGNhc2UgJ21hbnVhbCc6XG5cdFx0XHRcdFx0XHQvLyBub2RlLWZldGNoLXNwZWNpZmljIHN0ZXA6IG1ha2UgbWFudWFsIHJlZGlyZWN0IGEgYml0IGVhc2llciB0byB1c2UgYnkgc2V0dGluZyB0aGUgTG9jYXRpb24gaGVhZGVyIHZhbHVlIHRvIHRoZSByZXNvbHZlZCBVUkwuXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0Ly8gaGFuZGxlIGNvcnJ1cHRlZCBoZWFkZXJcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzLnNldCgnTG9jYXRpb24nLCBsb2NhdGlvblVSTCk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub2RlanMgc2VydmVyIHByZXZlbnQgaW52YWxpZCByZXNwb25zZSBoZWFkZXJzLCB3ZSBjYW4ndCB0ZXN0IHRoaXMgdGhyb3VnaCBub3JtYWwgcmVxdWVzdFxuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdmb2xsb3cnOlxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDJcblx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblVSTCA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDVcblx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LmNvdW50ZXIgPj0gcmVxdWVzdC5mb2xsb3cpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBtYXhpbXVtIHJlZGlyZWN0IHJlYWNoZWQgYXQ6ICR7cmVxdWVzdC51cmx9YCwgJ21heC1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgNiAoY291bnRlciBpbmNyZW1lbnQpXG5cdFx0XHRcdFx0XHQvLyBDcmVhdGUgYSBuZXcgUmVxdWVzdCBvYmplY3QuXG5cdFx0XHRcdFx0XHRjb25zdCByZXF1ZXN0T3B0cyA9IHtcblx0XHRcdFx0XHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMocmVxdWVzdC5oZWFkZXJzKSxcblx0XHRcdFx0XHRcdFx0Zm9sbG93OiByZXF1ZXN0LmZvbGxvdyxcblx0XHRcdFx0XHRcdFx0Y291bnRlcjogcmVxdWVzdC5jb3VudGVyICsgMSxcblx0XHRcdFx0XHRcdFx0YWdlbnQ6IHJlcXVlc3QuYWdlbnQsXG5cdFx0XHRcdFx0XHRcdGNvbXByZXNzOiByZXF1ZXN0LmNvbXByZXNzLFxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuXHRcdFx0XHRcdFx0XHRib2R5OiByZXF1ZXN0LmJvZHksXG5cdFx0XHRcdFx0XHRcdHNpZ25hbDogcmVxdWVzdC5zaWduYWwsXG5cdFx0XHRcdFx0XHRcdHRpbWVvdXQ6IHJlcXVlc3QudGltZW91dFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDlcblx0XHRcdFx0XHRcdGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMzAzICYmIHJlcXVlc3QuYm9keSAmJiBnZXRUb3RhbEJ5dGVzKHJlcXVlc3QpID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcignQ2Fubm90IGZvbGxvdyByZWRpcmVjdCB3aXRoIGJvZHkgYmVpbmcgYSByZWFkYWJsZSBzdHJlYW0nLCAndW5zdXBwb3J0ZWQtcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDExXG5cdFx0XHRcdFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgPT09IDMwMyB8fCAocmVzLnN0YXR1c0NvZGUgPT09IDMwMSB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzAyKSAmJiByZXF1ZXN0Lm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RPcHRzLm1ldGhvZCA9ICdHRVQnO1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0cy5ib2R5ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0cy5oZWFkZXJzLmRlbGV0ZSgnY29udGVudC1sZW5ndGgnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDE1XG5cdFx0XHRcdFx0XHRyZXNvbHZlKGZldGNoKG5ldyBSZXF1ZXN0KGxvY2F0aW9uVVJMLCByZXF1ZXN0T3B0cykpKTtcblx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcHJlcGFyZSByZXNwb25zZVxuXHRcdFx0cmVzLm9uY2UoJ2VuZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHNpZ25hbCkgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHR9KTtcblx0XHRcdGxldCBib2R5ID0gcmVzLnBpcGUobmV3IFBhc3NUaHJvdWdoJDEoKSk7XG5cblx0XHRcdGNvbnN0IHJlc3BvbnNlX29wdGlvbnMgPSB7XG5cdFx0XHRcdHVybDogcmVxdWVzdC51cmwsXG5cdFx0XHRcdHN0YXR1czogcmVzLnN0YXR1c0NvZGUsXG5cdFx0XHRcdHN0YXR1c1RleHQ6IHJlcy5zdGF0dXNNZXNzYWdlLFxuXHRcdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0XHRzaXplOiByZXF1ZXN0LnNpemUsXG5cdFx0XHRcdHRpbWVvdXQ6IHJlcXVlc3QudGltZW91dCxcblx0XHRcdFx0Y291bnRlcjogcmVxdWVzdC5jb3VudGVyXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCAxMi4xLjEuM1xuXHRcdFx0Y29uc3QgY29kaW5ncyA9IGhlYWRlcnMuZ2V0KCdDb250ZW50LUVuY29kaW5nJyk7XG5cblx0XHRcdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDEyLjEuMS40OiBoYW5kbGUgY29udGVudCBjb2RpbmdzXG5cblx0XHRcdC8vIGluIGZvbGxvd2luZyBzY2VuYXJpb3Mgd2UgaWdub3JlIGNvbXByZXNzaW9uIHN1cHBvcnRcblx0XHRcdC8vIDEuIGNvbXByZXNzaW9uIHN1cHBvcnQgaXMgZGlzYWJsZWRcblx0XHRcdC8vIDIuIEhFQUQgcmVxdWVzdFxuXHRcdFx0Ly8gMy4gbm8gQ29udGVudC1FbmNvZGluZyBoZWFkZXJcblx0XHRcdC8vIDQuIG5vIGNvbnRlbnQgcmVzcG9uc2UgKDIwNClcblx0XHRcdC8vIDUuIGNvbnRlbnQgbm90IG1vZGlmaWVkIHJlc3BvbnNlICgzMDQpXG5cdFx0XHRpZiAoIXJlcXVlc3QuY29tcHJlc3MgfHwgcmVxdWVzdC5tZXRob2QgPT09ICdIRUFEJyB8fCBjb2RpbmdzID09PSBudWxsIHx8IHJlcy5zdGF0dXNDb2RlID09PSAyMDQgfHwgcmVzLnN0YXR1c0NvZGUgPT09IDMwNCkge1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIE5vZGUgdjYrXG5cdFx0XHQvLyBCZSBsZXNzIHN0cmljdCB3aGVuIGRlY29kaW5nIGNvbXByZXNzZWQgcmVzcG9uc2VzLCBzaW5jZSBzb21ldGltZXNcblx0XHRcdC8vIHNlcnZlcnMgc2VuZCBzbGlnaHRseSBpbnZhbGlkIHJlc3BvbnNlcyB0aGF0IGFyZSBzdGlsbCBhY2NlcHRlZFxuXHRcdFx0Ly8gYnkgY29tbW9uIGJyb3dzZXJzLlxuXHRcdFx0Ly8gQWx3YXlzIHVzaW5nIFpfU1lOQ19GTFVTSCBpcyB3aGF0IGNVUkwgZG9lcy5cblx0XHRcdGNvbnN0IHpsaWJPcHRpb25zID0ge1xuXHRcdFx0XHRmbHVzaDogemxpYi5aX1NZTkNfRkxVU0gsXG5cdFx0XHRcdGZpbmlzaEZsdXNoOiB6bGliLlpfU1lOQ19GTFVTSFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gZm9yIGd6aXBcblx0XHRcdGlmIChjb2RpbmdzID09ICdnemlwJyB8fCBjb2RpbmdzID09ICd4LWd6aXAnKSB7XG5cdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVHdW56aXAoemxpYk9wdGlvbnMpKTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGZvciBkZWZsYXRlXG5cdFx0XHRpZiAoY29kaW5ncyA9PSAnZGVmbGF0ZScgfHwgY29kaW5ncyA9PSAneC1kZWZsYXRlJykge1xuXHRcdFx0XHQvLyBoYW5kbGUgdGhlIGluZmFtb3VzIHJhdyBkZWZsYXRlIHJlc3BvbnNlIGZyb20gb2xkIHNlcnZlcnNcblx0XHRcdFx0Ly8gYSBoYWNrIGZvciBvbGQgSUlTIGFuZCBBcGFjaGUgc2VydmVyc1xuXHRcdFx0XHRjb25zdCByYXcgPSByZXMucGlwZShuZXcgUGFzc1Rocm91Z2gkMSgpKTtcblx0XHRcdFx0cmF3Lm9uY2UoJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcblx0XHRcdFx0XHQvLyBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNzUxOTgyOFxuXHRcdFx0XHRcdGlmICgoY2h1bmtbMF0gJiAweDBGKSA9PT0gMHgwOCkge1xuXHRcdFx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUluZmxhdGUoKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVJbmZsYXRlUmF3KCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZm9yIGJyXG5cdFx0XHRpZiAoY29kaW5ncyA9PSAnYnInICYmIHR5cGVvZiB6bGliLmNyZWF0ZUJyb3RsaURlY29tcHJlc3MgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUJyb3RsaURlY29tcHJlc3MoKSk7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBvdGhlcndpc2UsIHVzZSByZXNwb25zZSBhcy1pc1xuXHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHR9KTtcblxuXHRcdHdyaXRlVG9TdHJlYW0ocmVxLCByZXF1ZXN0KTtcblx0fSk7XG59XG4vKipcbiAqIFJlZGlyZWN0IGNvZGUgbWF0Y2hpbmdcbiAqXG4gKiBAcGFyYW0gICBOdW1iZXIgICBjb2RlICBTdGF0dXMgY29kZVxuICogQHJldHVybiAgQm9vbGVhblxuICovXG5mZXRjaC5pc1JlZGlyZWN0ID0gZnVuY3Rpb24gKGNvZGUpIHtcblx0cmV0dXJuIGNvZGUgPT09IDMwMSB8fCBjb2RlID09PSAzMDIgfHwgY29kZSA9PT0gMzAzIHx8IGNvZGUgPT09IDMwNyB8fCBjb2RlID09PSAzMDg7XG59O1xuXG4vLyBleHBvc2UgUHJvbWlzZVxuZmV0Y2guUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG5mdW5jdGlvbiBnZXRfcGFnZV9oYW5kbGVyKFxuXHRtYW5pZmVzdCxcblx0c2Vzc2lvbl9nZXR0ZXJcbikge1xuXHRjb25zdCBnZXRfYnVpbGRfaW5mbyA9IGRldlxuXHRcdD8gKCkgPT4gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ2J1aWxkLmpzb24nKSwgJ3V0Zi04JykpXG5cdFx0OiAoYXNzZXRzID0+ICgpID0+IGFzc2V0cykoSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ2J1aWxkLmpzb24nKSwgJ3V0Zi04JykpKTtcblxuXHRjb25zdCB0ZW1wbGF0ZSA9IGRldlxuXHRcdD8gKCkgPT4gcmVhZF90ZW1wbGF0ZShzcmNfZGlyKVxuXHRcdDogKHN0ciA9PiAoKSA9PiBzdHIpKHJlYWRfdGVtcGxhdGUoYnVpbGRfZGlyKSk7XG5cblx0Y29uc3QgaGFzX3NlcnZpY2Vfd29ya2VyID0gZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMnKSk7XG5cblx0Y29uc3QgeyBzZXJ2ZXJfcm91dGVzLCBwYWdlcyB9ID0gbWFuaWZlc3Q7XG5cdGNvbnN0IGVycm9yX3JvdXRlID0gbWFuaWZlc3QuZXJyb3I7XG5cblx0ZnVuY3Rpb24gYmFpbChyZXEsIHJlcywgZXJyKSB7XG5cdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXG5cdFx0Y29uc3QgbWVzc2FnZSA9IGRldiA/IGVzY2FwZV9odG1sKGVyci5tZXNzYWdlKSA6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InO1xuXG5cdFx0cmVzLnN0YXR1c0NvZGUgPSA1MDA7XG5cdFx0cmVzLmVuZChgPHByZT4ke21lc3NhZ2V9PC9wcmU+YCk7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVfZXJyb3IocmVxLCByZXMsIHN0YXR1c0NvZGUsIGVycm9yKSB7XG5cdFx0aGFuZGxlX3BhZ2Uoe1xuXHRcdFx0cGF0dGVybjogbnVsbCxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogbnVsbCwgY29tcG9uZW50OiBlcnJvcl9yb3V0ZSB9XG5cdFx0XHRdXG5cdFx0fSwgcmVxLCByZXMsIHN0YXR1c0NvZGUsIGVycm9yIHx8IG5ldyBFcnJvcignVW5rbm93biBlcnJvciBpbiBwcmVsb2FkIGZ1bmN0aW9uJykpO1xuXHR9XG5cblx0YXN5bmMgZnVuY3Rpb24gaGFuZGxlX3BhZ2UocGFnZSwgcmVxLCByZXMsIHN0YXR1cyA9IDIwMCwgZXJyb3IgPSBudWxsKSB7XG5cdFx0Y29uc3QgaXNfc2VydmljZV93b3JrZXJfaW5kZXggPSByZXEucGF0aCA9PT0gJy9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sJztcblx0XHRjb25zdCBidWlsZF9pbmZvXG5cblxuXG5cbiA9IGdldF9idWlsZF9pbmZvKCk7XG5cblx0XHRyZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XG5cdFx0cmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsIGRldiA/ICduby1jYWNoZScgOiAnbWF4LWFnZT02MDAnKTtcblxuXHRcdC8vIHByZWxvYWQgbWFpbi5qcyBhbmQgY3VycmVudCByb3V0ZVxuXHRcdC8vIFRPRE8gZGV0ZWN0IG90aGVyIHN0dWZmIHdlIGNhbiBwcmVsb2FkPyBpbWFnZXMsIENTUywgZm9udHM/XG5cdFx0bGV0IHByZWxvYWRlZF9jaHVua3MgPSBBcnJheS5pc0FycmF5KGJ1aWxkX2luZm8uYXNzZXRzLm1haW4pID8gYnVpbGRfaW5mby5hc3NldHMubWFpbiA6IFtidWlsZF9pbmZvLmFzc2V0cy5tYWluXTtcblx0XHRpZiAoIWVycm9yICYmICFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xuXHRcdFx0cGFnZS5wYXJ0cy5mb3JFYWNoKHBhcnQgPT4ge1xuXHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybjtcblxuXHRcdFx0XHQvLyB1c2luZyBjb25jYXQgYmVjYXVzZSBpdCBjb3VsZCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4gdGhhbmtzIHdlYnBhY2shXG5cdFx0XHRcdHByZWxvYWRlZF9jaHVua3MgPSBwcmVsb2FkZWRfY2h1bmtzLmNvbmNhdChidWlsZF9pbmZvLmFzc2V0c1twYXJ0Lm5hbWVdKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChidWlsZF9pbmZvLmJ1bmRsZXIgPT09ICdyb2xsdXAnKSB7XG5cdFx0XHQvLyBUT0RPIGFkZCBkZXBlbmRlbmNpZXMgYW5kIENTU1xuXHRcdFx0Y29uc3QgbGluayA9IHByZWxvYWRlZF9jaHVua3Ncblx0XHRcdFx0LmZpbHRlcihmaWxlID0+IGZpbGUgJiYgIWZpbGUubWF0Y2goL1xcLm1hcCQvKSlcblx0XHRcdFx0Lm1hcChmaWxlID0+IGA8JHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX0+O3JlbD1cIm1vZHVsZXByZWxvYWRcImApXG5cdFx0XHRcdC5qb2luKCcsICcpO1xuXG5cdFx0XHRyZXMuc2V0SGVhZGVyKCdMaW5rJywgbGluayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGxpbmsgPSBwcmVsb2FkZWRfY2h1bmtzXG5cdFx0XHRcdC5maWx0ZXIoZmlsZSA9PiBmaWxlICYmICFmaWxlLm1hdGNoKC9cXC5tYXAkLykpXG5cdFx0XHRcdC5tYXAoKGZpbGUpID0+IHtcblx0XHRcdFx0XHRjb25zdCBhcyA9IC9cXC5jc3MkLy50ZXN0KGZpbGUpID8gJ3N0eWxlJyA6ICdzY3JpcHQnO1xuXHRcdFx0XHRcdHJldHVybiBgPCR7cmVxLmJhc2VVcmx9L2NsaWVudC8ke2ZpbGV9PjtyZWw9XCJwcmVsb2FkXCI7YXM9XCIke2FzfVwiYDtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmpvaW4oJywgJyk7XG5cblx0XHRcdHJlcy5zZXRIZWFkZXIoJ0xpbmsnLCBsaW5rKTtcblx0XHR9XG5cblx0XHRjb25zdCBzZXNzaW9uID0gc2Vzc2lvbl9nZXR0ZXIocmVxLCByZXMpO1xuXG5cdFx0bGV0IHJlZGlyZWN0O1xuXHRcdGxldCBwcmVsb2FkX2Vycm9yO1xuXG5cdFx0Y29uc3QgcHJlbG9hZF9jb250ZXh0ID0ge1xuXHRcdFx0cmVkaXJlY3Q6IChzdGF0dXNDb2RlLCBsb2NhdGlvbikgPT4ge1xuXHRcdFx0XHRpZiAocmVkaXJlY3QgJiYgKHJlZGlyZWN0LnN0YXR1c0NvZGUgIT09IHN0YXR1c0NvZGUgfHwgcmVkaXJlY3QubG9jYXRpb24gIT09IGxvY2F0aW9uKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ29uZmxpY3RpbmcgcmVkaXJlY3RzYCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bG9jYXRpb24gPSBsb2NhdGlvbi5yZXBsYWNlKC9eXFwvL2csICcnKTsgLy8gbGVhZGluZyBzbGFzaCAob25seSlcblx0XHRcdFx0cmVkaXJlY3QgPSB7IHN0YXR1c0NvZGUsIGxvY2F0aW9uIH07XG5cdFx0XHR9LFxuXHRcdFx0ZXJyb3I6IChzdGF0dXNDb2RlLCBtZXNzYWdlKSA9PiB7XG5cdFx0XHRcdHByZWxvYWRfZXJyb3IgPSB7IHN0YXR1c0NvZGUsIG1lc3NhZ2UgfTtcblx0XHRcdH0sXG5cdFx0XHRmZXRjaDogKHVybCwgb3B0cykgPT4ge1xuXHRcdFx0XHRjb25zdCBwYXJzZWQgPSBuZXcgVXJsLlVSTCh1cmwsIGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH0ke3JlcS5iYXNlVXJsID8gcmVxLmJhc2VVcmwgKyAnLycgOicnfWApO1xuXG5cdFx0XHRcdGlmIChvcHRzKSB7XG5cdFx0XHRcdFx0b3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpO1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5jbHVkZV9jb29raWVzID0gKFxuXHRcdFx0XHRcdFx0b3B0cy5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnIHx8XG5cdFx0XHRcdFx0XHRvcHRzLmNyZWRlbnRpYWxzID09PSAnc2FtZS1vcmlnaW4nICYmIHBhcnNlZC5vcmlnaW4gPT09IGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH1gXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGlmIChpbmNsdWRlX2Nvb2tpZXMpIHtcblx0XHRcdFx0XHRcdG9wdHMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMuaGVhZGVycyk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IGNvb2tpZXMgPSBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdFx0Y29va2llLnBhcnNlKHJlcS5oZWFkZXJzLmNvb2tpZSB8fCAnJyksXG5cdFx0XHRcdFx0XHRcdGNvb2tpZS5wYXJzZShvcHRzLmhlYWRlcnMuY29va2llIHx8ICcnKVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2V0X2Nvb2tpZSA9IHJlcy5nZXRIZWFkZXIoJ1NldC1Db29raWUnKTtcblx0XHRcdFx0XHRcdChBcnJheS5pc0FycmF5KHNldF9jb29raWUpID8gc2V0X2Nvb2tpZSA6IFtzZXRfY29va2llXSkuZm9yRWFjaChzdHIgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IC8oW149XSspPShbXjtdKykvLmV4ZWMoc3RyKTtcblx0XHRcdFx0XHRcdFx0aWYgKG1hdGNoKSBjb29raWVzW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHN0ciA9IE9iamVjdC5rZXlzKGNvb2tpZXMpXG5cdFx0XHRcdFx0XHRcdC5tYXAoa2V5ID0+IGAke2tleX09JHtjb29raWVzW2tleV19YClcblx0XHRcdFx0XHRcdFx0LmpvaW4oJzsgJyk7XG5cblx0XHRcdFx0XHRcdG9wdHMuaGVhZGVycy5jb29raWUgPSBzdHI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZldGNoKHBhcnNlZC5ocmVmLCBvcHRzKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0bGV0IHByZWxvYWRlZDtcblx0XHRsZXQgbWF0Y2g7XG5cdFx0bGV0IHBhcmFtcztcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByb290X3ByZWxvYWRlZCA9IG1hbmlmZXN0LnJvb3RfcHJlbG9hZFxuXHRcdFx0XHQ/IG1hbmlmZXN0LnJvb3RfcHJlbG9hZC5jYWxsKHByZWxvYWRfY29udGV4dCwge1xuXHRcdFx0XHRcdGhvc3Q6IHJlcS5oZWFkZXJzLmhvc3QsXG5cdFx0XHRcdFx0cGF0aDogcmVxLnBhdGgsXG5cdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRwYXJhbXM6IHt9XG5cdFx0XHRcdH0sIHNlc3Npb24pXG5cdFx0XHRcdDoge307XG5cblx0XHRcdG1hdGNoID0gZXJyb3IgPyBudWxsIDogcGFnZS5wYXR0ZXJuLmV4ZWMocmVxLnBhdGgpO1xuXG5cblx0XHRcdGxldCB0b1ByZWxvYWQgPSBbcm9vdF9wcmVsb2FkZWRdO1xuXHRcdFx0aWYgKCFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xuXHRcdFx0XHR0b1ByZWxvYWQgPSB0b1ByZWxvYWQuY29uY2F0KHBhZ2UucGFydHMubWFwKHBhcnQgPT4ge1xuXHRcdFx0XHRcdGlmICghcGFydCkgcmV0dXJuIG51bGw7XG5cblx0XHRcdFx0XHQvLyB0aGUgZGVlcGVzdCBsZXZlbCBpcyB1c2VkIGJlbG93LCB0byBpbml0aWFsaXNlIHRoZSBzdG9yZVxuXHRcdFx0XHRcdHBhcmFtcyA9IHBhcnQucGFyYW1zID8gcGFydC5wYXJhbXMobWF0Y2gpIDoge307XG5cblx0XHRcdFx0XHRyZXR1cm4gcGFydC5wcmVsb2FkXG5cdFx0XHRcdFx0XHQ/IHBhcnQucHJlbG9hZC5jYWxsKHByZWxvYWRfY29udGV4dCwge1xuXHRcdFx0XHRcdFx0XHRob3N0OiByZXEuaGVhZGVycy5ob3N0LFxuXHRcdFx0XHRcdFx0XHRwYXRoOiByZXEucGF0aCxcblx0XHRcdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRcdFx0cGFyYW1zXG5cdFx0XHRcdFx0XHR9LCBzZXNzaW9uKVxuXHRcdFx0XHRcdFx0OiB7fTtcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRwcmVsb2FkZWQgPSBhd2FpdCBQcm9taXNlLmFsbCh0b1ByZWxvYWQpO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdHJldHVybiBiYWlsKHJlcSwgcmVzLCBlcnIpXG5cdFx0XHR9XG5cblx0XHRcdHByZWxvYWRfZXJyb3IgPSB7IHN0YXR1c0NvZGU6IDUwMCwgbWVzc2FnZTogZXJyIH07XG5cdFx0XHRwcmVsb2FkZWQgPSBbXTsgLy8gYXBwZWFzZSBUeXBlU2NyaXB0XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdGlmIChyZWRpcmVjdCkge1xuXHRcdFx0XHRjb25zdCBsb2NhdGlvbiA9IFVybC5yZXNvbHZlKChyZXEuYmFzZVVybCB8fCAnJykgKyAnLycsIHJlZGlyZWN0LmxvY2F0aW9uKTtcblxuXHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IHJlZGlyZWN0LnN0YXR1c0NvZGU7XG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0xvY2F0aW9uJywgbG9jYXRpb24pO1xuXHRcdFx0XHRyZXMuZW5kKCk7XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocHJlbG9hZF9lcnJvcikge1xuXHRcdFx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIHByZWxvYWRfZXJyb3Iuc3RhdHVzQ29kZSwgcHJlbG9hZF9lcnJvci5tZXNzYWdlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWdtZW50cyA9IHJlcS5wYXRoLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdFx0XHQvLyBUT0RPIG1ha2UgdGhpcyBsZXNzIGNvbmZ1c2luZ1xuXHRcdFx0Y29uc3QgbGF5b3V0X3NlZ21lbnRzID0gW3NlZ21lbnRzWzBdXTtcblx0XHRcdGxldCBsID0gMTtcblxuXHRcdFx0cGFnZS5wYXJ0cy5mb3JFYWNoKChwYXJ0LCBpKSA9PiB7XG5cdFx0XHRcdGxheW91dF9zZWdtZW50c1tsXSA9IHNlZ21lbnRzW2kgKyAxXTtcblx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm4gbnVsbDtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IHByb3BzID0ge1xuXHRcdFx0XHRzdG9yZXM6IHtcblx0XHRcdFx0XHRwYWdlOiB7XG5cdFx0XHRcdFx0XHRzdWJzY3JpYmU6IHdyaXRhYmxlKHtcblx0XHRcdFx0XHRcdFx0aG9zdDogcmVxLmhlYWRlcnMuaG9zdCxcblx0XHRcdFx0XHRcdFx0cGF0aDogcmVxLnBhdGgsXG5cdFx0XHRcdFx0XHRcdHF1ZXJ5OiByZXEucXVlcnksXG5cdFx0XHRcdFx0XHRcdHBhcmFtc1xuXHRcdFx0XHRcdFx0fSkuc3Vic2NyaWJlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwcmVsb2FkaW5nOiB7XG5cdFx0XHRcdFx0XHRzdWJzY3JpYmU6IHdyaXRhYmxlKG51bGwpLnN1YnNjcmliZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2Vzc2lvbjogd3JpdGFibGUoc2Vzc2lvbilcblx0XHRcdFx0fSxcblx0XHRcdFx0c2VnbWVudHM6IGxheW91dF9zZWdtZW50cyxcblx0XHRcdFx0c3RhdHVzOiBlcnJvciA/IHN0YXR1cyA6IDIwMCxcblx0XHRcdFx0ZXJyb3I6IGVycm9yID8gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yIDogeyBtZXNzYWdlOiBlcnJvciB9IDogbnVsbCxcblx0XHRcdFx0bGV2ZWwwOiB7XG5cdFx0XHRcdFx0cHJvcHM6IHByZWxvYWRlZFswXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsZXZlbDE6IHtcblx0XHRcdFx0XHRzZWdtZW50OiBzZWdtZW50c1swXSxcblx0XHRcdFx0XHRwcm9wczoge31cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xuXHRcdFx0XHRsZXQgbCA9IDE7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZS5wYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnQgPSBwYWdlLnBhcnRzW2ldO1xuXHRcdFx0XHRcdGlmICghcGFydCkgY29udGludWU7XG5cblx0XHRcdFx0XHRwcm9wc1tgbGV2ZWwke2wrK31gXSA9IHtcblx0XHRcdFx0XHRcdGNvbXBvbmVudDogcGFydC5jb21wb25lbnQsXG5cdFx0XHRcdFx0XHRwcm9wczogcHJlbG9hZGVkW2kgKyAxXSB8fCB7fSxcblx0XHRcdFx0XHRcdHNlZ21lbnQ6IHNlZ21lbnRzW2ldXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB7IGh0bWwsIGhlYWQsIGNzcyB9ID0gQXBwLnJlbmRlcihwcm9wcyk7XG5cblx0XHRcdGNvbnN0IHNlcmlhbGl6ZWQgPSB7XG5cdFx0XHRcdHByZWxvYWRlZDogYFske3ByZWxvYWRlZC5tYXAoZGF0YSA9PiB0cnlfc2VyaWFsaXplKGRhdGEpKS5qb2luKCcsJyl9XWAsXG5cdFx0XHRcdHNlc3Npb246IHNlc3Npb24gJiYgdHJ5X3NlcmlhbGl6ZShzZXNzaW9uLCBlcnIgPT4ge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHNlcmlhbGl6ZSBzZXNzaW9uIGRhdGE6ICR7ZXJyLm1lc3NhZ2V9YCk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRlcnJvcjogZXJyb3IgJiYgdHJ5X3NlcmlhbGl6ZShwcm9wcy5lcnJvcilcblx0XHRcdH07XG5cblx0XHRcdGxldCBzY3JpcHQgPSBgX19TQVBQRVJfXz17JHtbXG5cdFx0XHRcdGVycm9yICYmIGBlcnJvcjoke3NlcmlhbGl6ZWQuZXJyb3J9LHN0YXR1czoke3N0YXR1c31gLFxuXHRcdFx0XHRgYmFzZVVybDpcIiR7cmVxLmJhc2VVcmx9XCJgLFxuXHRcdFx0XHRzZXJpYWxpemVkLnByZWxvYWRlZCAmJiBgcHJlbG9hZGVkOiR7c2VyaWFsaXplZC5wcmVsb2FkZWR9YCxcblx0XHRcdFx0c2VyaWFsaXplZC5zZXNzaW9uICYmIGBzZXNzaW9uOiR7c2VyaWFsaXplZC5zZXNzaW9ufWBcblx0XHRcdF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywnKX19O2A7XG5cblx0XHRcdGlmIChoYXNfc2VydmljZV93b3JrZXIpIHtcblx0XHRcdFx0c2NyaXB0ICs9IGBpZignc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKW5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcke3JlcS5iYXNlVXJsfS9zZXJ2aWNlLXdvcmtlci5qcycpO2A7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGZpbGUgPSBbXS5jb25jYXQoYnVpbGRfaW5mby5hc3NldHMubWFpbikuZmlsdGVyKGZpbGUgPT4gZmlsZSAmJiAvXFwuanMkLy50ZXN0KGZpbGUpKVswXTtcblx0XHRcdGNvbnN0IG1haW4gPSBgJHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX1gO1xuXG5cdFx0XHRpZiAoYnVpbGRfaW5mby5idW5kbGVyID09PSAncm9sbHVwJykge1xuXHRcdFx0XHRpZiAoYnVpbGRfaW5mby5sZWdhY3lfYXNzZXRzKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGVnYWN5X21haW4gPSBgJHtyZXEuYmFzZVVybH0vY2xpZW50L2xlZ2FjeS8ke2J1aWxkX2luZm8ubGVnYWN5X2Fzc2V0cy5tYWlufWA7XG5cdFx0XHRcdFx0c2NyaXB0ICs9IGAoZnVuY3Rpb24oKXt0cnl7ZXZhbChcImFzeW5jIGZ1bmN0aW9uIHgoKXt9XCIpO3ZhciBtYWluPVwiJHttYWlufVwifWNhdGNoKGUpe21haW49XCIke2xlZ2FjeV9tYWlufVwifTt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3RyeXtuZXcgRnVuY3Rpb24oXCJpZigwKWltcG9ydCgnJylcIikoKTtzLnNyYz1tYWluO3MudHlwZT1cIm1vZHVsZVwiO3MuY3Jvc3NPcmlnaW49XCJ1c2UtY3JlZGVudGlhbHNcIjt9Y2F0Y2goZSl7cy5zcmM9XCIke3JlcS5iYXNlVXJsfS9jbGllbnQvc2hpbXBvcnRAJHtidWlsZF9pbmZvLnNoaW1wb3J0fS5qc1wiO3Muc2V0QXR0cmlidXRlKFwiZGF0YS1tYWluXCIsbWFpbik7fWRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7fSgpKTtgO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjcmlwdCArPSBgdmFyIHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt0cnl7bmV3IEZ1bmN0aW9uKFwiaWYoMClpbXBvcnQoJycpXCIpKCk7cy5zcmM9XCIke21haW59XCI7cy50eXBlPVwibW9kdWxlXCI7cy5jcm9zc09yaWdpbj1cInVzZS1jcmVkZW50aWFsc1wiO31jYXRjaChlKXtzLnNyYz1cIiR7cmVxLmJhc2VVcmx9L2NsaWVudC9zaGltcG9ydEAke2J1aWxkX2luZm8uc2hpbXBvcnR9LmpzXCI7cy5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1haW5cIixcIiR7bWFpbn1cIil9ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKWA7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjcmlwdCArPSBgPC9zY3JpcHQ+PHNjcmlwdCBzcmM9XCIke21haW59XCI+YDtcblx0XHRcdH1cblxuXHRcdFx0bGV0IHN0eWxlcztcblxuXHRcdFx0Ly8gVE9ETyBtYWtlIHRoaXMgY29uc2lzdGVudCBhY3Jvc3MgYXBwc1xuXHRcdFx0Ly8gVE9ETyBlbWJlZCBidWlsZF9pbmZvIGluIHBsYWNlaG9sZGVyLnRzXG5cdFx0XHRpZiAoYnVpbGRfaW5mby5jc3MgJiYgYnVpbGRfaW5mby5jc3MubWFpbikge1xuXHRcdFx0XHRjb25zdCBjc3NfY2h1bmtzID0gbmV3IFNldCgpO1xuXHRcdFx0XHRpZiAoYnVpbGRfaW5mby5jc3MubWFpbikgY3NzX2NodW5rcy5hZGQoYnVpbGRfaW5mby5jc3MubWFpbik7XG5cdFx0XHRcdHBhZ2UucGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcblx0XHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybjtcblx0XHRcdFx0XHRjb25zdCBjc3NfY2h1bmtzX2Zvcl9wYXJ0ID0gYnVpbGRfaW5mby5jc3MuY2h1bmtzW3BhcnQuZmlsZV07XG5cblx0XHRcdFx0XHRpZiAoY3NzX2NodW5rc19mb3JfcGFydCkge1xuXHRcdFx0XHRcdFx0Y3NzX2NodW5rc19mb3JfcGFydC5mb3JFYWNoKGZpbGUgPT4ge1xuXHRcdFx0XHRcdFx0XHRjc3NfY2h1bmtzLmFkZChmaWxlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0c3R5bGVzID0gQXJyYXkuZnJvbShjc3NfY2h1bmtzKVxuXHRcdFx0XHRcdC5tYXAoaHJlZiA9PiBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJjbGllbnQvJHtocmVmfVwiPmApXG5cdFx0XHRcdFx0LmpvaW4oJycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3R5bGVzID0gKGNzcyAmJiBjc3MuY29kZSA/IGA8c3R5bGU+JHtjc3MuY29kZX08L3N0eWxlPmAgOiAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHVzZXJzIGNhbiBzZXQgYSBDU1Agbm9uY2UgdXNpbmcgcmVzLmxvY2Fscy5ub25jZVxuXHRcdFx0Y29uc3Qgbm9uY2VfYXR0ciA9IChyZXMubG9jYWxzICYmIHJlcy5sb2NhbHMubm9uY2UpID8gYCBub25jZT1cIiR7cmVzLmxvY2Fscy5ub25jZX1cImAgOiAnJztcblxuXHRcdFx0Y29uc3QgYm9keSA9IHRlbXBsYXRlKClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuYmFzZSUnLCAoKSA9PiBgPGJhc2UgaHJlZj1cIiR7cmVxLmJhc2VVcmx9L1wiPmApXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLnNjcmlwdHMlJywgKCkgPT4gYDxzY3JpcHQke25vbmNlX2F0dHJ9PiR7c2NyaXB0fTwvc2NyaXB0PmApXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLmh0bWwlJywgKCkgPT4gaHRtbClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuaGVhZCUnLCAoKSA9PiBgPG5vc2NyaXB0IGlkPSdzYXBwZXItaGVhZC1zdGFydCc+PC9ub3NjcmlwdD4ke2hlYWR9PG5vc2NyaXB0IGlkPSdzYXBwZXItaGVhZC1lbmQnPjwvbm9zY3JpcHQ+YClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuc3R5bGVzJScsICgpID0+IHN0eWxlcyk7XG5cblx0XHRcdHJlcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xuXHRcdFx0cmVzLmVuZChib2R5KTtcblx0XHR9IGNhdGNoKGVycikge1xuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdGJhaWwocmVxLCByZXMsIGVycik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIDUwMCwgZXJyKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24gZmluZF9yb3V0ZShyZXEsIHJlcywgbmV4dCkge1xuXHRcdGlmIChyZXEucGF0aCA9PT0gJy9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sJykge1xuXHRcdFx0Y29uc3QgaG9tZVBhZ2UgPSBwYWdlcy5maW5kKHBhZ2UgPT4gcGFnZS5wYXR0ZXJuLnRlc3QoJy8nKSk7XG5cdFx0XHRoYW5kbGVfcGFnZShob21lUGFnZSwgcmVxLCByZXMpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuXHRcdFx0aWYgKHBhZ2UucGF0dGVybi50ZXN0KHJlcS5wYXRoKSkge1xuXHRcdFx0XHRoYW5kbGVfcGFnZShwYWdlLCByZXEsIHJlcyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIDQwNCwgJ05vdCBmb3VuZCcpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiByZWFkX3RlbXBsYXRlKGRpciA9IGJ1aWxkX2Rpcikge1xuXHRyZXR1cm4gZnMucmVhZEZpbGVTeW5jKGAke2Rpcn0vdGVtcGxhdGUuaHRtbGAsICd1dGYtOCcpO1xufVxuXG5mdW5jdGlvbiB0cnlfc2VyaWFsaXplKGRhdGEsIGZhaWwpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZGV2YWx1ZShkYXRhKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0aWYgKGZhaWwpIGZhaWwoZXJyKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5mdW5jdGlvbiBlc2NhcGVfaHRtbChodG1sKSB7XG5cdGNvbnN0IGNoYXJzID0ge1xuXHRcdCdcIicgOiAncXVvdCcsXG5cdFx0XCInXCI6ICcjMzknLFxuXHRcdCcmJzogJ2FtcCcsXG5cdFx0JzwnIDogJ2x0Jyxcblx0XHQnPicgOiAnZ3QnXG5cdH07XG5cblx0cmV0dXJuIGh0bWwucmVwbGFjZSgvW1wiJyY8Pl0vZywgYyA9PiBgJiR7Y2hhcnNbY119O2ApO1xufVxuXG5mdW5jdGlvbiBtaWRkbGV3YXJlKG9wdHNcblxuXG4gPSB7fSkge1xuXHRjb25zdCB7IHNlc3Npb24sIGlnbm9yZSB9ID0gb3B0cztcblxuXHRsZXQgZW1pdHRlZF9iYXNlcGF0aCA9IGZhbHNlO1xuXG5cdHJldHVybiBjb21wb3NlX2hhbmRsZXJzKGlnbm9yZSwgW1xuXHRcdChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXHRcdFx0aWYgKHJlcS5iYXNlVXJsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bGV0IHsgb3JpZ2luYWxVcmwgfSA9IHJlcTtcblx0XHRcdFx0aWYgKHJlcS51cmwgPT09ICcvJyAmJiBvcmlnaW5hbFVybFtvcmlnaW5hbFVybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG5cdFx0XHRcdFx0b3JpZ2luYWxVcmwgKz0gJy8nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVxLmJhc2VVcmwgPSBvcmlnaW5hbFVybFxuXHRcdFx0XHRcdD8gb3JpZ2luYWxVcmwuc2xpY2UoMCwgLXJlcS51cmwubGVuZ3RoKVxuXHRcdFx0XHRcdDogJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZW1pdHRlZF9iYXNlcGF0aCAmJiBwcm9jZXNzLnNlbmQpIHtcblx0XHRcdFx0cHJvY2Vzcy5zZW5kKHtcblx0XHRcdFx0XHRfX3NhcHBlcl9fOiB0cnVlLFxuXHRcdFx0XHRcdGV2ZW50OiAnYmFzZXBhdGgnLFxuXHRcdFx0XHRcdGJhc2VwYXRoOiByZXEuYmFzZVVybFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRlbWl0dGVkX2Jhc2VwYXRoID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHJlcS5wYXRoID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmVxLnBhdGggPSByZXEudXJsLnJlcGxhY2UoL1xcPy4qLywgJycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuZXh0KCk7XG5cdFx0fSxcblxuXHRcdGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzJykpICYmIHNlcnZlKHtcblx0XHRcdHBhdGhuYW1lOiAnL3NlcnZpY2Utd29ya2VyLmpzJyxcblx0XHRcdGNhY2hlX2NvbnRyb2w6ICduby1jYWNoZSwgbm8tc3RvcmUsIG11c3QtcmV2YWxpZGF0ZSdcblx0XHR9KSxcblxuXHRcdGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzLm1hcCcpKSAmJiBzZXJ2ZSh7XG5cdFx0XHRwYXRobmFtZTogJy9zZXJ2aWNlLXdvcmtlci5qcy5tYXAnLFxuXHRcdFx0Y2FjaGVfY29udHJvbDogJ25vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlJ1xuXHRcdH0pLFxuXG5cdFx0c2VydmUoe1xuXHRcdFx0cHJlZml4OiAnL2NsaWVudC8nLFxuXHRcdFx0Y2FjaGVfY29udHJvbDogZGV2ID8gJ25vLWNhY2hlJyA6ICdtYXgtYWdlPTMxNTM2MDAwLCBpbW11dGFibGUnXG5cdFx0fSksXG5cblx0XHRnZXRfc2VydmVyX3JvdXRlX2hhbmRsZXIobWFuaWZlc3Quc2VydmVyX3JvdXRlcyksXG5cblx0XHRnZXRfcGFnZV9oYW5kbGVyKG1hbmlmZXN0LCBzZXNzaW9uIHx8IG5vb3ApXG5cdF0uZmlsdGVyKEJvb2xlYW4pKTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZV9oYW5kbGVycyhpZ25vcmUsIGhhbmRsZXJzKSB7XG5cdGNvbnN0IHRvdGFsID0gaGFuZGxlcnMubGVuZ3RoO1xuXG5cdGZ1bmN0aW9uIG50aF9oYW5kbGVyKG4sIHJlcSwgcmVzLCBuZXh0KSB7XG5cdFx0aWYgKG4gPj0gdG90YWwpIHtcblx0XHRcdHJldHVybiBuZXh0KCk7XG5cdFx0fVxuXG5cdFx0aGFuZGxlcnNbbl0ocmVxLCByZXMsICgpID0+IG50aF9oYW5kbGVyKG4rMSwgcmVxLCByZXMsIG5leHQpKTtcblx0fVxuXG5cdHJldHVybiAhaWdub3JlXG5cdFx0PyAocmVxLCByZXMsIG5leHQpID0+IG50aF9oYW5kbGVyKDAsIHJlcSwgcmVzLCBuZXh0KVxuXHRcdDogKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdFx0XHRpZiAoc2hvdWxkX2lnbm9yZShyZXEucGF0aCwgaWdub3JlKSkge1xuXHRcdFx0XHRuZXh0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRudGhfaGFuZGxlcigwLCByZXEsIHJlcywgbmV4dCk7XG5cdFx0XHR9XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkX2lnbm9yZSh1cmksIHZhbCkge1xuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSByZXR1cm4gdmFsLnNvbWUoeCA9PiBzaG91bGRfaWdub3JlKHVyaSwgeCkpO1xuXHRpZiAodmFsIGluc3RhbmNlb2YgUmVnRXhwKSByZXR1cm4gdmFsLnRlc3QodXJpKTtcblx0aWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWwodXJpKTtcblx0cmV0dXJuIHVyaS5zdGFydHNXaXRoKHZhbC5jaGFyQ29kZUF0KDApID09PSA0NyA/IHZhbCA6IGAvJHt2YWx9YCk7XG59XG5cbmZ1bmN0aW9uIHNlcnZlKHsgcHJlZml4LCBwYXRobmFtZSwgY2FjaGVfY29udHJvbCB9XG5cblxuXG4pIHtcblx0Y29uc3QgZmlsdGVyID0gcGF0aG5hbWVcblx0XHQ/IChyZXEpID0+IHJlcS5wYXRoID09PSBwYXRobmFtZVxuXHRcdDogKHJlcSkgPT4gcmVxLnBhdGguc3RhcnRzV2l0aChwcmVmaXgpO1xuXG5cdGNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xuXG5cdGNvbnN0IHJlYWQgPSBkZXZcblx0XHQ/IChmaWxlKSA9PiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgZmlsZSkpXG5cdFx0OiAoZmlsZSkgPT4gKGNhY2hlLmhhcyhmaWxlKSA/IGNhY2hlIDogY2FjaGUuc2V0KGZpbGUsIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCBmaWxlKSkpKS5nZXQoZmlsZSk7XG5cblx0cmV0dXJuIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXHRcdGlmIChmaWx0ZXIocmVxKSkge1xuXHRcdFx0Y29uc3QgdHlwZSA9IGxpdGUuZ2V0VHlwZShyZXEucGF0aCk7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGZpbGUgPSBwYXRoLnBvc2l4Lm5vcm1hbGl6ZShkZWNvZGVVUklDb21wb25lbnQocmVxLnBhdGgpKTtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlYWQoZmlsZSk7XG5cblx0XHRcdFx0cmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgdHlwZSk7XG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCBjYWNoZV9jb250cm9sKTtcblx0XHRcdFx0cmVzLmVuZChkYXRhKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IDQwNDtcblx0XHRcdFx0cmVzLmVuZCgnbm90IGZvdW5kJyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5leHQoKTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKXt9XG5cbmV4cG9ydCB7IG1pZGRsZXdhcmUgfTtcbiIsImltcG9ydCBzaXJ2IGZyb20gJ3NpcnYnO1xuaW1wb3J0IHBvbGthIGZyb20gJ3BvbGthJztcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbic7XG5pbXBvcnQgKiBhcyBzYXBwZXIgZnJvbSAnQHNhcHBlci9zZXJ2ZXInO1xuXG5jb25zdCB7IFBPUlQsIE5PREVfRU5WIH0gPSBwcm9jZXNzLmVudjtcbmNvbnN0IGRldiA9IE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuXG5wb2xrYSgpIC8vIFlvdSBjYW4gYWxzbyB1c2UgRXhwcmVzc1xuXHQudXNlKFxuXHRcdGNvbXByZXNzaW9uKHsgdGhyZXNob2xkOiAwIH0pLFxuXHRcdHNpcnYoJ3N0YXRpYycsIHsgZGV2IH0pLFxuXHRcdHNhcHBlci5taWRkbGV3YXJlKClcblx0KVxuXHQubGlzdGVuKFBPUlQsIGVyciA9PiB7XG5cdFx0aWYgKGVycikgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyKTtcblx0fSk7XG4iXSwibmFtZXMiOlsiZ2V0IiwicHJlbG9hZCIsImdldFBpbnlpbiIsIkl0ZW0iLCJJdGVtQ29tcG9uZW50IiwiU2VsZWN0aW9uIiwiU2VsZWN0aW9uQ29tcG9uZW50IiwiTXVsdGlTZWxlY3Rpb24iLCJNdWx0aVNlbGVjdGlvbkNvbXBvbmVudCIsImNvbXBvbmVudF8wIiwiY29tcG9uZW50XzEiLCJwcmVsb2FkXzEiLCJjb21wb25lbnRfMiIsImNvbXBvbmVudF8zIiwicHJlbG9hZF8zIiwiY29tcG9uZW50XzQiLCJwcmVsb2FkXzQiLCJjb21wb25lbnRfNSIsInByZWxvYWRfNSIsImNvbXBvbmVudF82Iiwicm9vdCIsImVycm9yIiwiZXNjYXBlZCIsImZldGNoIiwibm9vcCIsInNhcHBlci5taWRkbGV3YXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsTUFBTSxXQUFXLEdBQUc7QUFDcEIsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUk7QUFDM0MsRUFBRSxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzNFLEVBQUUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQy9CLEVBQUUsQ0FBQyxDQUFDO0FBQ0o7QUFDTyxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQzlCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7QUFDcEIsRUFBRSxjQUFjLEVBQUUsa0JBQWtCO0FBQ3BDLEVBQUUsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxNQUFNLEtBQUssR0FBRyxXQUFXLEVBQUUsQ0FBQztBQUM3QixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2hDOzs7Ozs7O0FDYkEsTUFBTSxFQUFFLEdBQUcs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QkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsa0NBQWtDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDN3NQO0FBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEM7QUFDQSxTQUFTLHdCQUF3QixDQUFDLE1BQU0sRUFBRTtBQUMxQyxDQUFDLGVBQWUsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUNwRCxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMxRDtBQUNBLEVBQUUsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMxQztBQUNBO0FBQ0EsRUFBRSxNQUFNLGFBQWEsR0FBRyxNQUFNLEtBQUssUUFBUSxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDN0QsRUFBRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3RELEVBQUUsSUFBSSxhQUFhLEVBQUU7QUFDckIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO0FBQ2xDLElBQUksTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBQzFDLElBQUksTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLElBQUksTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCO0FBQ0E7QUFDQSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxLQUFLLEVBQUU7QUFDaEMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNyQyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLEtBQUssQ0FBQztBQUNOO0FBQ0EsSUFBSSxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUMxQyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDekMsS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyQyxLQUFLLENBQUM7QUFDTjtBQUNBLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxTQUFTLEtBQUssRUFBRTtBQUM5QixLQUFLLElBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2hELEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDL0I7QUFDQSxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDbEIsTUFBTSxVQUFVLEVBQUUsSUFBSTtBQUN0QixNQUFNLEtBQUssRUFBRSxNQUFNO0FBQ25CLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO0FBQ2xCLE1BQU0sTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO0FBQ3hCLE1BQU0sTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVO0FBQzVCLE1BQU0sSUFBSSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFDbkMsTUFBTSxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUU7QUFDNUMsTUFBTSxDQUFDLENBQUM7QUFDUixLQUFLLENBQUM7QUFDTixJQUFJO0FBQ0o7QUFDQSxHQUFHLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBRyxLQUFLO0FBQ2hDLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixLQUFLLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBQzFCLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUIsS0FBSyxNQUFNO0FBQ1gsS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLEtBQUs7QUFDTCxJQUFJLENBQUM7QUFDTDtBQUNBLEdBQUcsSUFBSTtBQUNQLElBQUksTUFBTSxhQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUU7QUFDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLElBQUk7QUFDSixHQUFHLE1BQU07QUFDVDtBQUNBLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxPQUFPLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQzVDLEVBQUUsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7QUFDOUIsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNyQyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4QyxJQUFJLE9BQU87QUFDWCxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUNULEVBQUUsQ0FBQztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztBQUNwQixJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxNQUFNLEdBQUcsa0JBQWtCLENBQUM7QUFDaEMsSUFBSSxNQUFNLEdBQUcsa0JBQWtCLENBQUM7QUFDaEMsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0JBQWtCLEdBQUcsdUNBQXVDLENBQUM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzdCLEVBQUUsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7QUFDL0IsSUFBSSxNQUFNLElBQUksU0FBUyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDekQsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDZixFQUFFLElBQUksR0FBRyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDMUIsRUFBRSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pDLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7QUFDakM7QUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pDLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQztBQUNBO0FBQ0EsSUFBSSxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDcEIsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QyxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3hEO0FBQ0E7QUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN2QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDL0IsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNyQyxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDdkMsRUFBRSxJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzFCLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7QUFDakM7QUFDQSxFQUFFLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUFFO0FBQ2pDLElBQUksTUFBTSxJQUFJLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3BELEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN0QyxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUNwRCxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QjtBQUNBLEVBQUUsSUFBSSxLQUFLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDaEQsSUFBSSxNQUFNLElBQUksU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDbkQsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztBQUMvQjtBQUNBLEVBQUUsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtBQUMxQixJQUFJLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQ3BFLElBQUksR0FBRyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO0FBQ2xCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDOUMsTUFBTSxNQUFNLElBQUksU0FBUyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsS0FBSztBQUNMO0FBQ0EsSUFBSSxHQUFHLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDcEMsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDaEIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM1QyxNQUFNLE1BQU0sSUFBSSxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNwRCxLQUFLO0FBQ0w7QUFDQSxJQUFJLEdBQUcsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztBQUNoQyxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtBQUNuQixJQUFJLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7QUFDdkQsTUFBTSxNQUFNLElBQUksU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDdkQsS0FBSztBQUNMO0FBQ0EsSUFBSSxHQUFHLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDcEQsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7QUFDcEIsSUFBSSxHQUFHLElBQUksWUFBWSxDQUFDO0FBQ3hCLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO0FBQ2xCLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQztBQUN0QixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtBQUNwQixJQUFJLElBQUksUUFBUSxHQUFHLE9BQU8sR0FBRyxDQUFDLFFBQVEsS0FBSyxRQUFRO0FBQ25ELFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQ2xEO0FBQ0EsSUFBSSxRQUFRLFFBQVE7QUFDcEIsTUFBTSxLQUFLLElBQUk7QUFDZixRQUFRLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztBQUNuQyxRQUFRLE1BQU07QUFDZCxNQUFNLEtBQUssS0FBSztBQUNoQixRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztBQUNoQyxRQUFRLE1BQU07QUFDZCxNQUFNLEtBQUssUUFBUTtBQUNuQixRQUFRLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztBQUNuQyxRQUFRLE1BQU07QUFDZCxNQUFNLEtBQUssTUFBTTtBQUNqQixRQUFRLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQztBQUNqQyxRQUFRLE1BQU07QUFDZCxNQUFNO0FBQ04sUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDMUQsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNoQyxFQUFFLElBQUk7QUFDTixJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNkLElBQUksT0FBTyxHQUFHLENBQUM7QUFDZixHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EsSUFBSSxNQUFNLEdBQUc7QUFDYixDQUFDLEtBQUssRUFBRSxPQUFPO0FBQ2YsQ0FBQyxTQUFTLEVBQUUsV0FBVztBQUN2QixDQUFDLENBQUM7QUFDRjtBQUNBLElBQUksS0FBSyxHQUFHLHdEQUF3RCxDQUFDO0FBQ3JFLElBQUksV0FBVyxHQUFHLCtCQUErQixDQUFDO0FBQ2xELElBQUksUUFBUSxHQUFHLCtYQUErWCxDQUFDO0FBQy9ZLElBQUlDLFNBQU8sR0FBRztBQUNkLElBQUksR0FBRyxFQUFFLFNBQVM7QUFDbEIsSUFBSSxHQUFHLEVBQUUsU0FBUztBQUNsQixJQUFJLEdBQUcsRUFBRSxTQUFTO0FBQ2xCLElBQUksSUFBSSxFQUFFLE1BQU07QUFDaEIsSUFBSSxJQUFJLEVBQUUsS0FBSztBQUNmLElBQUksSUFBSSxFQUFFLEtBQUs7QUFDZixJQUFJLElBQUksRUFBRSxLQUFLO0FBQ2YsSUFBSSxJQUFJLEVBQUUsS0FBSztBQUNmLElBQUksSUFBSSxFQUFFLEtBQUs7QUFDZixJQUFJLElBQUksRUFBRSxLQUFLO0FBQ2YsSUFBSSxRQUFRLEVBQUUsU0FBUztBQUN2QixJQUFJLFFBQVEsRUFBRSxTQUFTO0FBQ3ZCLENBQUMsQ0FBQztBQUNGLElBQUksMkJBQTJCLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakcsU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQ3hCLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFJLFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUN6QixRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFO0FBQ3pDLFlBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQzNELFNBQVM7QUFDVCxRQUFRLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUMvQixZQUFZLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckQsWUFBWSxPQUFPO0FBQ25CLFNBQVM7QUFDVCxRQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdCLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNqQyxZQUFZLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QyxZQUFZLFFBQVEsSUFBSTtBQUN4QixnQkFBZ0IsS0FBSyxRQUFRLENBQUM7QUFDOUIsZ0JBQWdCLEtBQUssUUFBUSxDQUFDO0FBQzlCLGdCQUFnQixLQUFLLFNBQVMsQ0FBQztBQUMvQixnQkFBZ0IsS0FBSyxNQUFNLENBQUM7QUFDNUIsZ0JBQWdCLEtBQUssUUFBUTtBQUM3QixvQkFBb0IsT0FBTztBQUMzQixnQkFBZ0IsS0FBSyxPQUFPO0FBQzVCLG9CQUFvQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLG9CQUFvQixNQUFNO0FBQzFCLGdCQUFnQixLQUFLLEtBQUssQ0FBQztBQUMzQixnQkFBZ0IsS0FBSyxLQUFLO0FBQzFCLG9CQUFvQixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwRCxvQkFBb0IsTUFBTTtBQUMxQixnQkFBZ0I7QUFDaEIsb0JBQW9CLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0Qsb0JBQW9CLElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxTQUFTO0FBQ2xELHdCQUF3QixLQUFLLEtBQUssSUFBSTtBQUN0Qyx3QkFBd0IsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSywyQkFBMkIsRUFBRTtBQUM3Ryx3QkFBd0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ2hGLHFCQUFxQjtBQUNyQixvQkFBb0IsSUFBSSxNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN4RSx3QkFBd0IsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO0FBQ3JGLHFCQUFxQjtBQUNyQixvQkFBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM1RixhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQixJQUFJLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN0QixTQUFTLE1BQU0sQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUQsU0FBUyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN0RCxTQUFTLE9BQU8sQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLEVBQUU7QUFDckMsUUFBUSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QyxLQUFLLENBQUMsQ0FBQztBQUNQLElBQUksU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFO0FBQzlCLFFBQVEsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzlCLFlBQVksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLFNBQVM7QUFDVCxRQUFRLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2hDLFlBQVksT0FBTyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxTQUFTO0FBQ1QsUUFBUSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsUUFBUSxRQUFRLElBQUk7QUFDcEIsWUFBWSxLQUFLLFFBQVEsQ0FBQztBQUMxQixZQUFZLEtBQUssUUFBUSxDQUFDO0FBQzFCLFlBQVksS0FBSyxTQUFTO0FBQzFCLGdCQUFnQixPQUFPLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3BFLFlBQVksS0FBSyxRQUFRO0FBQ3pCLGdCQUFnQixPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4QyxZQUFZLEtBQUssTUFBTTtBQUN2QixnQkFBZ0IsT0FBTyxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUMzRCxZQUFZLEtBQUssT0FBTztBQUN4QixnQkFBZ0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwRyxnQkFBZ0IsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUN4RixnQkFBZ0IsT0FBTyxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQzVELFlBQVksS0FBSyxLQUFLLENBQUM7QUFDdkIsWUFBWSxLQUFLLEtBQUs7QUFDdEIsZ0JBQWdCLE9BQU8sTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoRyxZQUFZO0FBQ1osZ0JBQWdCLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM5SSxnQkFBZ0IsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6RCxnQkFBZ0IsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO0FBQ3BDLG9CQUFvQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDeEQsMEJBQTBCLG9DQUFvQyxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQzFFLDBCQUEwQixxQkFBcUIsQ0FBQztBQUNoRCxpQkFBaUI7QUFDakIsZ0JBQWdCLE9BQU8sR0FBRyxDQUFDO0FBQzNCLFNBQVM7QUFDVCxLQUFLO0FBQ0wsSUFBSSxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7QUFDcEIsUUFBUSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDMUIsUUFBUSxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDOUIsUUFBUSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDMUIsUUFBUSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUM3QyxZQUFZLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsWUFBWSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNwQyxnQkFBZ0IsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGdCQUFnQixPQUFPO0FBQ3ZCLGFBQWE7QUFDYixZQUFZLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QyxZQUFZLFFBQVEsSUFBSTtBQUN4QixnQkFBZ0IsS0FBSyxRQUFRLENBQUM7QUFDOUIsZ0JBQWdCLEtBQUssUUFBUSxDQUFDO0FBQzlCLGdCQUFnQixLQUFLLFNBQVM7QUFDOUIsb0JBQW9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNoRixvQkFBb0IsTUFBTTtBQUMxQixnQkFBZ0IsS0FBSyxRQUFRO0FBQzdCLG9CQUFvQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELG9CQUFvQixNQUFNO0FBQzFCLGdCQUFnQixLQUFLLE1BQU07QUFDM0Isb0JBQW9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUN2RSxvQkFBb0IsTUFBTTtBQUMxQixnQkFBZ0IsS0FBSyxPQUFPO0FBQzVCLG9CQUFvQixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ2pFLG9CQUFvQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNsRCx3QkFBd0IsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEYscUJBQXFCLENBQUMsQ0FBQztBQUN2QixvQkFBb0IsTUFBTTtBQUMxQixnQkFBZ0IsS0FBSyxLQUFLO0FBQzFCLG9CQUFvQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdDLG9CQUFvQixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzFJLG9CQUFvQixNQUFNO0FBQzFCLGdCQUFnQixLQUFLLEtBQUs7QUFDMUIsb0JBQW9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0Msb0JBQW9CLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRTtBQUN2Rix3QkFBd0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakQsd0JBQXdCLE9BQU8sTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNqRixxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLG9CQUFvQixNQUFNO0FBQzFCLGdCQUFnQjtBQUNoQixvQkFBb0IsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksR0FBRyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN4RyxvQkFBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDOUQsd0JBQXdCLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25HLHFCQUFxQixDQUFDLENBQUM7QUFDdkIsYUFBYTtBQUNiLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsUUFBUSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUMzQyxRQUFRLE9BQU8sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3BILEtBQUs7QUFDTCxTQUFTO0FBQ1QsUUFBUSxPQUFPLEdBQUcsQ0FBQztBQUNuQixLQUFLO0FBQ0wsQ0FBQztBQUNELFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUN0QixJQUFJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNsQixJQUFJLEdBQUc7QUFDUCxRQUFRLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDaEQsUUFBUSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pDLEtBQUssUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQ3ZCLElBQUksT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ25ELENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDNUIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7QUFDbkMsQ0FBQztBQUNELFNBQVMsa0JBQWtCLENBQUMsS0FBSyxFQUFFO0FBQ25DLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQ2pDLFFBQVEsT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEMsSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUM7QUFDeEIsUUFBUSxPQUFPLFFBQVEsQ0FBQztBQUN4QixJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUM7QUFDcEMsUUFBUSxPQUFPLElBQUksQ0FBQztBQUNwQixJQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QixJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtBQUNqQyxRQUFRLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUMsSUFBSSxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDeEIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUNELFNBQVMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFO0FBQzdCLElBQUksT0FBT0EsU0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBQ0QsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7QUFDaEMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUNELFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUN0QixJQUFJLE9BQU8sNEJBQTRCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDakcsQ0FBQztBQUNELFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUN2QixJQUFJLE9BQU8sNEJBQTRCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbkgsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRTtBQUM5QixJQUFJLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNyQixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDNUMsUUFBUSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLFFBQVEsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxRQUFRLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtBQUMxQixZQUFZLE1BQU0sSUFBSSxLQUFLLENBQUM7QUFDNUIsU0FBUztBQUNULGFBQWEsSUFBSSxJQUFJLElBQUlBLFNBQU8sRUFBRTtBQUNsQyxZQUFZLE1BQU0sSUFBSUEsU0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLFNBQVM7QUFDVCxhQUFhLElBQUksSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO0FBQ25ELFlBQVksSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0M7QUFDQTtBQUNBLFlBQVksSUFBSSxJQUFJLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxFQUFFO0FBQ3RFLGdCQUFnQixNQUFNLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFDLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsZ0JBQWdCLE1BQU0sSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNsRSxhQUFhO0FBQ2IsU0FBUztBQUNULGFBQWE7QUFDYixZQUFZLE1BQU0sSUFBSSxJQUFJLENBQUM7QUFDM0IsU0FBUztBQUNULEtBQUs7QUFDTCxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUM7QUFDbEIsSUFBSSxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ2pDO0FBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QjtBQUNBLE1BQU0sSUFBSSxDQUFDO0FBQ1gsQ0FBQyxXQUFXLEdBQUc7QUFDZixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDbEI7QUFDQSxFQUFFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxFQUFFLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBLEVBQUUsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2Y7QUFDQSxFQUFFLElBQUksU0FBUyxFQUFFO0FBQ2pCLEdBQUcsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBQ3ZCLEdBQUcsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEMsSUFBSSxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekIsSUFBSSxJQUFJLE1BQU0sQ0FBQztBQUNmLElBQUksSUFBSSxPQUFPLFlBQVksTUFBTSxFQUFFO0FBQ25DLEtBQUssTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUN0QixLQUFLLE1BQU0sSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQzVDLEtBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNsRixLQUFLLE1BQU0sSUFBSSxPQUFPLFlBQVksV0FBVyxFQUFFO0FBQy9DLEtBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkMsS0FBSyxNQUFNLElBQUksT0FBTyxZQUFZLElBQUksRUFBRTtBQUN4QyxLQUFLLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsS0FBSyxNQUFNO0FBQ1gsS0FBSyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ25GLEtBQUs7QUFDTCxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzFCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QixJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QztBQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDekYsRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5QyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDckIsR0FBRztBQUNILEVBQUU7QUFDRixDQUFDLElBQUksSUFBSSxHQUFHO0FBQ1osRUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDN0IsRUFBRTtBQUNGLENBQUMsSUFBSSxJQUFJLEdBQUc7QUFDWixFQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLEVBQUU7QUFDRixDQUFDLElBQUksR0FBRztBQUNSLEVBQUUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELEVBQUU7QUFDRixDQUFDLFdBQVcsR0FBRztBQUNmLEVBQUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvRSxFQUFFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3QixFQUFFO0FBQ0YsQ0FBQyxNQUFNLEdBQUc7QUFDVixFQUFFLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7QUFDbEMsRUFBRSxRQUFRLENBQUMsS0FBSyxHQUFHLFlBQVksRUFBRSxDQUFDO0FBQ2xDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5QixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsRUFBRSxPQUFPLFFBQVEsQ0FBQztBQUNsQixFQUFFO0FBQ0YsQ0FBQyxRQUFRLEdBQUc7QUFDWixFQUFFLE9BQU8sZUFBZSxDQUFDO0FBQ3pCLEVBQUU7QUFDRixDQUFDLEtBQUssR0FBRztBQUNULEVBQUUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN6QjtBQUNBLEVBQUUsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLEVBQUUsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLEVBQUUsSUFBSSxhQUFhLEVBQUUsV0FBVyxDQUFDO0FBQ2pDLEVBQUUsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO0FBQzNCLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQztBQUNyQixHQUFHLE1BQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO0FBQ3hCLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QyxHQUFHLE1BQU07QUFDVCxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QyxHQUFHO0FBQ0gsRUFBRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDekIsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLEdBQUcsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7QUFDdEIsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLEdBQUcsTUFBTTtBQUNULEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JDLEdBQUc7QUFDSCxFQUFFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4RDtBQUNBLEVBQUUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLEVBQUUsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3pFLEVBQUUsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEQsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDO0FBQzlCLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDZCxFQUFFO0FBQ0YsQ0FBQztBQUNEO0FBQ0EsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDeEMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQzNCLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUMzQixDQUFDLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDNUIsQ0FBQyxDQUFDLENBQUM7QUFDSDtBQUNBLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzFELENBQUMsS0FBSyxFQUFFLE1BQU07QUFDZCxDQUFDLFFBQVEsRUFBRSxLQUFLO0FBQ2hCLENBQUMsVUFBVSxFQUFFLEtBQUs7QUFDbEIsQ0FBQyxZQUFZLEVBQUUsSUFBSTtBQUNuQixDQUFDLENBQUMsQ0FBQztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0FBQ2hELEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUI7QUFDQSxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3pCLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbkI7QUFDQTtBQUNBLEVBQUUsSUFBSSxXQUFXLEVBQUU7QUFDbkIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztBQUM5QyxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUNEO0FBQ0EsVUFBVSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0RCxVQUFVLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7QUFDOUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO0FBQ3pDO0FBQ0EsSUFBSSxPQUFPLENBQUM7QUFDWixJQUFJO0FBQ0osQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN2QyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtBQUNkO0FBQ0EsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDM0M7QUFDQTtBQUNBLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDcEIsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEI7QUFDQSxDQUFDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDbEYsS0FBSyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUMzQjtBQUNBLENBQUMsSUFBSSxJQUFJLEdBQUcsU0FBUyxLQUFLLFNBQVMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBQ3BELENBQUMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUNqQyxDQUFDLElBQUksT0FBTyxHQUFHLFlBQVksS0FBSyxTQUFTLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztBQUM3RDtBQUNBLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQ25CO0FBQ0EsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2QsRUFBRSxNQUFNLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDckM7QUFDQSxFQUFFLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxzQkFBc0IsRUFBRTtBQUN4STtBQUNBLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsRUFBRSxNQUFNLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN0QztBQUNBLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRSxFQUFFLE1BQU0sSUFBSSxJQUFJLFlBQVksTUFBTSxFQUFFLENBQUMsTUFBTTtBQUMzQztBQUNBO0FBQ0EsRUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNuQyxFQUFFO0FBQ0YsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUc7QUFDbkIsRUFBRSxJQUFJO0FBQ04sRUFBRSxTQUFTLEVBQUUsS0FBSztBQUNsQixFQUFFLEtBQUssRUFBRSxJQUFJO0FBQ2IsRUFBRSxDQUFDO0FBQ0gsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNsQixDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3hCO0FBQ0EsQ0FBQyxJQUFJLElBQUksWUFBWSxNQUFNLEVBQUU7QUFDN0IsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUcsRUFBRTtBQUNsQyxHQUFHLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUssWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLDRDQUE0QyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3SixHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsRUFBRTtBQUNGLENBQUM7QUFDRDtBQUNBLElBQUksQ0FBQyxTQUFTLEdBQUc7QUFDakIsQ0FBQyxJQUFJLElBQUksR0FBRztBQUNaLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzlCLEVBQUU7QUFDRjtBQUNBLENBQUMsSUFBSSxRQUFRLEdBQUc7QUFDaEIsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDbkMsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsV0FBVyxHQUFHO0FBQ2YsRUFBRSxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ3BELEdBQUcsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzVFLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsSUFBSSxHQUFHO0FBQ1IsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNsRSxFQUFFLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDcEQsR0FBRyxPQUFPLE1BQU0sQ0FBQyxNQUFNO0FBQ3ZCO0FBQ0EsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDaEIsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRTtBQUMxQixJQUFJLENBQUMsRUFBRTtBQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRztBQUNqQixJQUFJLENBQUMsQ0FBQztBQUNOLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsSUFBSSxHQUFHO0FBQ1IsRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDcEI7QUFDQSxFQUFFLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxNQUFNLEVBQUU7QUFDdkQsR0FBRyxJQUFJO0FBQ1AsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ2pCLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLDhCQUE4QixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDckksSUFBSTtBQUNKLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsSUFBSSxHQUFHO0FBQ1IsRUFBRSxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsTUFBTSxFQUFFO0FBQ3ZELEdBQUcsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDNUIsR0FBRyxDQUFDLENBQUM7QUFDTCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxNQUFNLEdBQUc7QUFDVixFQUFFLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGFBQWEsR0FBRztBQUNqQixFQUFFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztBQUNwQjtBQUNBLEVBQUUsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU0sRUFBRTtBQUN2RCxHQUFHLE9BQU8sV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUMsR0FBRyxDQUFDLENBQUM7QUFDTCxFQUFFO0FBQ0YsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ3hDLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUMzQixDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDL0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQ2xDLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUMzQixDQUFDLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDM0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsS0FBSyxFQUFFO0FBQzlCLENBQUMsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQ2hFO0FBQ0EsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQ3hCLEdBQUcsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUMsR0FBRztBQUNILEVBQUU7QUFDRixDQUFDLENBQUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxXQUFXLEdBQUc7QUFDdkIsQ0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkI7QUFDQSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoQyxFQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEYsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUNsQztBQUNBLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQzVCLEVBQUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3RCO0FBQ0E7QUFDQSxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtBQUNwQixFQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9DLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNuQixFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdkIsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM1QixFQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDLElBQUksRUFBRSxJQUFJLFlBQVksTUFBTSxDQUFDLEVBQUU7QUFDaEMsRUFBRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQyxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDaEIsQ0FBQyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkI7QUFDQSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUNwRCxFQUFFLElBQUksVUFBVSxDQUFDO0FBQ2pCO0FBQ0E7QUFDQSxFQUFFLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUN0QixHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUMsWUFBWTtBQUN2QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakIsSUFBSSxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyx1Q0FBdUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDOUgsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0QixHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFHLEVBQUU7QUFDbEMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO0FBQ2xDO0FBQ0EsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLElBQUksTUFBTTtBQUNWO0FBQ0EsSUFBSSxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyw0Q0FBNEMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2SCxJQUFJO0FBQ0osR0FBRyxDQUFDLENBQUM7QUFDTDtBQUNBLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDbkMsR0FBRyxJQUFJLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO0FBQ2hDLElBQUksT0FBTztBQUNYLElBQUk7QUFDSjtBQUNBLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDL0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLElBQUksTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNuRyxJQUFJLE9BQU87QUFDWCxJQUFJO0FBQ0o7QUFDQSxHQUFHLFVBQVUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzlCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxZQUFZO0FBQzdCLEdBQUcsSUFBSSxLQUFLLEVBQUU7QUFDZCxJQUFJLE9BQU87QUFDWCxJQUFJO0FBQ0o7QUFDQSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QjtBQUNBLEdBQUcsSUFBSTtBQUNQLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ2pCO0FBQ0EsSUFBSSxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQywrQ0FBK0MsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxSCxJQUFJO0FBQ0osR0FBRyxDQUFDLENBQUM7QUFDTCxFQUFFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQ3RDLENBQUMsSUFBSSxPQUFPLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDcEMsRUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDhFQUE4RSxDQUFDLENBQUM7QUFDbEcsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDO0FBQ2Q7QUFDQTtBQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDVCxFQUFFLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEMsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4QztBQUNBO0FBQ0EsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUNsQixFQUFFLEdBQUcsR0FBRyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFO0FBQ2xCLEVBQUUsR0FBRyxHQUFHLHdFQUF3RSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzRjtBQUNBLEVBQUUsSUFBSSxHQUFHLEVBQUU7QUFDWCxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDbEIsRUFBRSxHQUFHLEdBQUcsa0NBQWtDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JELEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQyxJQUFJLEdBQUcsRUFBRTtBQUNWLEVBQUUsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxFQUFFLElBQUksT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO0FBQ2pELEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUN2QixHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDLE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDckQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtBQUNoQztBQUNBLENBQUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxVQUFVLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEtBQUssVUFBVSxJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxVQUFVLEVBQUU7QUFDN08sRUFBRSxPQUFPLEtBQUssQ0FBQztBQUNmLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSywwQkFBMEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO0FBQzNKLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDckIsQ0FBQyxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxXQUFXLEtBQUssVUFBVSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxXQUFXLEtBQUssVUFBVSxJQUFJLE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNqVSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDekIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDWixDQUFDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDMUI7QUFDQTtBQUNBLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ3hCLEVBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3hELEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxDQUFDLElBQUksSUFBSSxZQUFZLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO0FBQ3ZFO0FBQ0EsRUFBRSxFQUFFLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUN6QixFQUFFLEVBQUUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQ3pCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEI7QUFDQSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNaLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGtCQUFrQixDQUFDLElBQUksRUFBRTtBQUNsQyxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtBQUNwQjtBQUNBLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDZCxFQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDdEM7QUFDQSxFQUFFLE9BQU8sMEJBQTBCLENBQUM7QUFDcEMsRUFBRSxNQUFNLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDckM7QUFDQSxFQUFFLE9BQU8saURBQWlELENBQUM7QUFDM0QsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzFCO0FBQ0EsRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQzNCLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkM7QUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLHNCQUFzQixFQUFFO0FBQzdFO0FBQ0EsRUFBRSxPQUFPLElBQUksQ0FBQztBQUNkLEVBQUUsTUFBTSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdEM7QUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsRUFBRSxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVUsRUFBRTtBQUNwRDtBQUNBLEVBQUUsT0FBTyxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUQsRUFBRSxNQUFNLElBQUksSUFBSSxZQUFZLE1BQU0sRUFBRTtBQUNwQztBQUNBO0FBQ0EsRUFBRSxPQUFPLElBQUksQ0FBQztBQUNkLEVBQUUsTUFBTTtBQUNSO0FBQ0EsRUFBRSxPQUFPLDBCQUEwQixDQUFDO0FBQ3BDLEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGFBQWEsQ0FBQyxRQUFRLEVBQUU7QUFDakMsQ0FBQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQzVCO0FBQ0E7QUFDQSxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtBQUNwQjtBQUNBLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDWCxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDMUIsRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDbkIsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNuQztBQUNBLEVBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3JCLEVBQUUsTUFBTSxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssVUFBVSxFQUFFO0FBQzlEO0FBQ0EsRUFBRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxJQUFJLENBQUM7QUFDbEUsRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtBQUNoRDtBQUNBLEdBQUcsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDL0IsR0FBRztBQUNILEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDZCxFQUFFLE1BQU07QUFDUjtBQUNBLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDZCxFQUFFO0FBQ0YsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN2QyxDQUFDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDNUI7QUFDQTtBQUNBLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ3BCO0FBQ0EsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDYixFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDMUIsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkM7QUFDQSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkIsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDYixFQUFFLE1BQU07QUFDUjtBQUNBLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixFQUFFO0FBQ0YsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGlCQUFpQixHQUFHLCtCQUErQixDQUFDO0FBQzFELE1BQU0sc0JBQXNCLEdBQUcseUJBQXlCLENBQUM7QUFDekQ7QUFDQSxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUU7QUFDNUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO0FBQ2xELEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxFQUFFO0FBQ0YsQ0FBQztBQUNEO0FBQ0EsU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFO0FBQzlCLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDekMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDO0FBQ25FLEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN6QixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDM0IsQ0FBQyxLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUN4QixFQUFFLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksRUFBRTtBQUNsQyxHQUFHLE9BQU8sR0FBRyxDQUFDO0FBQ2QsR0FBRztBQUNILEVBQUU7QUFDRixDQUFDLE9BQU8sU0FBUyxDQUFDO0FBQ2xCLENBQUM7QUFDRDtBQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixNQUFNLE9BQU8sQ0FBQztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsV0FBVyxHQUFHO0FBQ2YsRUFBRSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDM0Y7QUFDQSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDO0FBQ0EsRUFBRSxJQUFJLElBQUksWUFBWSxPQUFPLEVBQUU7QUFDL0IsR0FBRyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDakMsR0FBRyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9DO0FBQ0EsR0FBRyxLQUFLLE1BQU0sVUFBVSxJQUFJLFdBQVcsRUFBRTtBQUN6QyxJQUFJLEtBQUssTUFBTSxLQUFLLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ2hELEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEMsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBLEdBQUcsT0FBTztBQUNWLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDekQsR0FBRyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLEdBQUcsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ3ZCLElBQUksSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7QUFDdEMsS0FBSyxNQUFNLElBQUksU0FBUyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDMUQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDN0IsS0FBSyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQ2xGLE1BQU0sTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBQy9ELE1BQU07QUFDTixLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLEtBQUs7QUFDTDtBQUNBLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7QUFDOUIsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQzVCLE1BQU0sTUFBTSxJQUFJLFNBQVMsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0FBQ3pFLE1BQU07QUFDTixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25DLEtBQUs7QUFDTCxJQUFJLE1BQU07QUFDVjtBQUNBLElBQUksS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pDLEtBQUssTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0IsS0FBSztBQUNMLElBQUk7QUFDSixHQUFHLE1BQU07QUFDVCxHQUFHLE1BQU0sSUFBSSxTQUFTLENBQUMsd0NBQXdDLENBQUMsQ0FBQztBQUNqRSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO0FBQ1gsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkIsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckIsRUFBRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BDLEVBQUUsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ3pCLEdBQUcsT0FBTyxJQUFJLENBQUM7QUFDZixHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtBQUNuQixFQUFFLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUM5RjtBQUNBLEVBQUUsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1osRUFBRSxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQzNCLEdBQUcsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLEdBQUcsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUMzQixTQUFTLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0I7QUFDQSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0MsR0FBRyxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDUCxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ25CLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLEVBQUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RELEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUNyQixFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNuQixFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNyQixFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixFQUFFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEMsRUFBRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDekIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCLEdBQUcsTUFBTTtBQUNULEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtBQUNYLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ25CLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLEVBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUM3QyxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDZCxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNuQixFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixFQUFFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEMsRUFBRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDekIsR0FBRyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxHQUFHO0FBQ1AsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQixFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxJQUFJLEdBQUc7QUFDUixFQUFFLE9BQU8scUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzVDLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE1BQU0sR0FBRztBQUNWLEVBQUUsT0FBTyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUMsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHO0FBQ3JCLEVBQUUsT0FBTyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDbEQsRUFBRTtBQUNGLENBQUM7QUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvRDtBQUNBLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzdELENBQUMsS0FBSyxFQUFFLFNBQVM7QUFDakIsQ0FBQyxRQUFRLEVBQUUsS0FBSztBQUNoQixDQUFDLFVBQVUsRUFBRSxLQUFLO0FBQ2xCLENBQUMsWUFBWSxFQUFFLElBQUk7QUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDSDtBQUNBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO0FBQzNDLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUMxQixDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDOUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQzFCLENBQUMsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUM3QixDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDMUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQzdCLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUMzQixDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDN0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQzlCLENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQSxTQUFTLFVBQVUsQ0FBQyxPQUFPLEVBQUU7QUFDN0IsQ0FBQyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDNUY7QUFDQSxDQUFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDL0MsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBRyxVQUFVLENBQUMsRUFBRTtBQUMvQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3pCLEVBQUUsR0FBRyxJQUFJLEtBQUssT0FBTyxHQUFHLFVBQVUsQ0FBQyxFQUFFO0FBQ3JDLEVBQUUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLEVBQUUsR0FBRyxVQUFVLENBQUMsRUFBRTtBQUNsQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELEVBQUUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNEO0FBQ0EsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDO0FBQ0EsU0FBUyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQzdDLENBQUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQzFELENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHO0FBQ3RCLEVBQUUsTUFBTTtBQUNSLEVBQUUsSUFBSTtBQUNOLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDVixFQUFFLENBQUM7QUFDSCxDQUFDLE9BQU8sUUFBUSxDQUFDO0FBQ2pCLENBQUM7QUFDRDtBQUNBLE1BQU0sd0JBQXdCLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztBQUN2RCxDQUFDLElBQUksR0FBRztBQUNSO0FBQ0EsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssd0JBQXdCLEVBQUU7QUFDekUsR0FBRyxNQUFNLElBQUksU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7QUFDbkUsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakMsRUFBRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTTtBQUNqQyxRQUFRLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSTtBQUM3QixRQUFRLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO0FBQ2hDO0FBQ0EsRUFBRSxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzFDLEVBQUUsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUM1QixFQUFFLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtBQUNwQixHQUFHLE9BQU87QUFDVixJQUFJLEtBQUssRUFBRSxTQUFTO0FBQ3BCLElBQUksSUFBSSxFQUFFLElBQUk7QUFDZCxJQUFJLENBQUM7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNuQztBQUNBLEVBQUUsT0FBTztBQUNULEdBQUcsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDdkIsR0FBRyxJQUFJLEVBQUUsS0FBSztBQUNkLEdBQUcsQ0FBQztBQUNKLEVBQUU7QUFDRixDQUFDLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RTtBQUNBLE1BQU0sQ0FBQyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUNwRSxDQUFDLEtBQUssRUFBRSxpQkFBaUI7QUFDekIsQ0FBQyxRQUFRLEVBQUUsS0FBSztBQUNoQixDQUFDLFVBQVUsRUFBRSxLQUFLO0FBQ2xCLENBQUMsWUFBWSxFQUFFLElBQUk7QUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsMkJBQTJCLENBQUMsT0FBTyxFQUFFO0FBQzlDLENBQUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5RDtBQUNBO0FBQ0E7QUFDQSxDQUFDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQyxJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7QUFDbEMsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdDLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsb0JBQW9CLENBQUMsR0FBRyxFQUFFO0FBQ25DLENBQUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUMvQixDQUFDLEtBQUssTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0QyxFQUFFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3BDLEdBQUcsU0FBUztBQUNaLEdBQUc7QUFDSCxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUNoQyxHQUFHLEtBQUssTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDMUMsS0FBSyxTQUFTO0FBQ2QsS0FBSztBQUNMLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQzFDLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsS0FBSyxNQUFNO0FBQ1gsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDdEQsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNwQyxHQUFHO0FBQ0gsRUFBRTtBQUNGLENBQUMsT0FBTyxPQUFPLENBQUM7QUFDaEIsQ0FBQztBQUNEO0FBQ0EsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDakQ7QUFDQTtBQUNBLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSxDQUFDO0FBQ2YsQ0FBQyxXQUFXLEdBQUc7QUFDZixFQUFFLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN0RixFQUFFLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwRjtBQUNBLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlCO0FBQ0EsRUFBRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztBQUNwQyxFQUFFLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QztBQUNBLEVBQUUsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUNwRCxHQUFHLE1BQU0sV0FBVyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hELEdBQUcsSUFBSSxXQUFXLEVBQUU7QUFDcEIsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNoRCxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUc7QUFDdEIsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7QUFDaEIsR0FBRyxNQUFNO0FBQ1QsR0FBRyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDO0FBQ3RELEdBQUcsT0FBTztBQUNWLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO0FBQ3hCLEdBQUcsQ0FBQztBQUNKLEVBQUU7QUFDRjtBQUNBLENBQUMsSUFBSSxHQUFHLEdBQUc7QUFDWCxFQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDckMsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLE1BQU0sR0FBRztBQUNkLEVBQUUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ2xDLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsSUFBSSxFQUFFLEdBQUc7QUFDVixFQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDM0UsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLFVBQVUsR0FBRztBQUNsQixFQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDdkMsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLFVBQVUsR0FBRztBQUNsQixFQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUN0QyxFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksT0FBTyxHQUFHO0FBQ2YsRUFBRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbkMsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsS0FBSyxHQUFHO0FBQ1QsRUFBRSxPQUFPLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNuQyxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztBQUNoQixHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtBQUN0QixHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtBQUM5QixHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztBQUN4QixHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtBQUNkLEdBQUcsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO0FBQzlCLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsRUFBRTtBQUNGLENBQUM7QUFDRDtBQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0EsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQzFCLENBQUMsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUM3QixDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDekIsQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQ2pDLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUNqQyxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDOUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQzVCLENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUM5RCxDQUFDLEtBQUssRUFBRSxVQUFVO0FBQ2xCLENBQUMsUUFBUSxFQUFFLEtBQUs7QUFDaEIsQ0FBQyxVQUFVLEVBQUUsS0FBSztBQUNsQixDQUFDLFlBQVksRUFBRSxJQUFJO0FBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNoRDtBQUNBO0FBQ0EsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUM1QixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQzlCO0FBQ0EsTUFBTSwwQkFBMEIsR0FBRyxTQUFTLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUU7QUFDMUIsQ0FBQyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxRQUFRLENBQUM7QUFDNUUsQ0FBQztBQUNEO0FBQ0EsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFO0FBQy9CLENBQUMsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JGLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPLENBQUM7QUFDZCxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDcEIsRUFBRSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEY7QUFDQSxFQUFFLElBQUksU0FBUyxDQUFDO0FBQ2hCO0FBQ0E7QUFDQSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDekIsR0FBRyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsSUFBSSxNQUFNO0FBQ1Y7QUFDQSxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxJQUFJO0FBQ0osR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2QsR0FBRyxNQUFNO0FBQ1QsR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQyxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7QUFDcEQsRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2hDO0FBQ0EsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxFQUFFO0FBQ2pILEdBQUcsTUFBTSxJQUFJLFNBQVMsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0FBQ3hFLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoSDtBQUNBLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQzdCLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDO0FBQzlDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3JDLEdBQUcsQ0FBQyxDQUFDO0FBQ0w7QUFDQSxFQUFFLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNuRTtBQUNBLEVBQUUsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUN6RCxHQUFHLE1BQU0sV0FBVyxHQUFHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JELEdBQUcsSUFBSSxXQUFXLEVBQUU7QUFDcEIsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNoRCxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDdEQsRUFBRSxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDN0M7QUFDQSxFQUFFLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNoRCxHQUFHLE1BQU0sSUFBSSxTQUFTLENBQUMsaURBQWlELENBQUMsQ0FBQztBQUMxRSxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRztBQUN0QixHQUFHLE1BQU07QUFDVCxHQUFHLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksUUFBUTtBQUN4RCxHQUFHLE9BQU87QUFDVixHQUFHLFNBQVM7QUFDWixHQUFHLE1BQU07QUFDVCxHQUFHLENBQUM7QUFDSjtBQUNBO0FBQ0EsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDekcsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckgsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7QUFDcEQsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztBQUN6QyxFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksTUFBTSxHQUFHO0FBQ2QsRUFBRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDbEMsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLEdBQUcsR0FBRztBQUNYLEVBQUUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pELEVBQUU7QUFDRjtBQUNBLENBQUMsSUFBSSxPQUFPLEdBQUc7QUFDZixFQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNuQyxFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksUUFBUSxHQUFHO0FBQ2hCLEVBQUUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ3BDLEVBQUU7QUFDRjtBQUNBLENBQUMsSUFBSSxNQUFNLEdBQUc7QUFDZCxFQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNsQyxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxLQUFLLEdBQUc7QUFDVCxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsRUFBRTtBQUNGLENBQUM7QUFDRDtBQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlCO0FBQ0EsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDN0QsQ0FBQyxLQUFLLEVBQUUsU0FBUztBQUNqQixDQUFDLFFBQVEsRUFBRSxLQUFLO0FBQ2hCLENBQUMsVUFBVSxFQUFFLEtBQUs7QUFDbEIsQ0FBQyxZQUFZLEVBQUUsSUFBSTtBQUNuQixDQUFDLENBQUMsQ0FBQztBQUNIO0FBQ0EsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7QUFDM0MsQ0FBQyxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQzdCLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUMxQixDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDOUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQy9CLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUM1QixDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFO0FBQ3hDLENBQUMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUNsRCxDQUFDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzRDtBQUNBO0FBQ0EsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUM3QixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQy9CLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDakQsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDMUQsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDNUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7QUFDOUQsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksWUFBWSxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsMEJBQTBCLEVBQUU7QUFDL0YsRUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlGQUFpRixDQUFDLENBQUM7QUFDckcsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQy9CLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNuRSxFQUFFLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztBQUMzQixFQUFFO0FBQ0YsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO0FBQzNCLEVBQUUsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVDLEVBQUUsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDdEMsR0FBRyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDM0MsR0FBRztBQUNILEVBQUU7QUFDRixDQUFDLElBQUksa0JBQWtCLEVBQUU7QUFDekIsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDcEQsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFO0FBQ2pDLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsd0RBQXdELENBQUMsQ0FBQztBQUN0RixFQUFFO0FBQ0Y7QUFDQTtBQUNBLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO0FBQzFELEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNqRCxFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDM0IsQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRTtBQUNsQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDM0IsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUMzQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUU7QUFDckMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07QUFDeEIsRUFBRSxPQUFPLEVBQUUsMkJBQTJCLENBQUMsT0FBTyxDQUFDO0FBQy9DLEVBQUUsS0FBSztBQUNQLEVBQUUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxVQUFVLENBQUMsT0FBTyxFQUFFO0FBQzdCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUI7QUFDQSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3hCLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDekI7QUFDQTtBQUNBLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUNEO0FBQ0EsVUFBVSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0RCxVQUFVLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7QUFDOUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO0FBQ3pDO0FBQ0E7QUFDQSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3pDLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNDLE9BQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQzFCO0FBQ0E7QUFDQSxDQUFDLElBQUksQ0FBQ0EsT0FBSyxDQUFDLE9BQU8sRUFBRTtBQUNyQixFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztBQUM1RixFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUdBLE9BQUssQ0FBQyxPQUFPLENBQUM7QUFDOUI7QUFDQTtBQUNBLENBQUMsT0FBTyxJQUFJQSxPQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUNyRDtBQUNBLEVBQUUsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pDLEVBQUUsTUFBTSxPQUFPLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakQ7QUFDQSxFQUFFLE1BQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLEdBQUcsS0FBSyxHQUFHLElBQUksRUFBRSxPQUFPLENBQUM7QUFDdEUsRUFBRSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQ2hDO0FBQ0EsRUFBRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDdEI7QUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHLFNBQVMsS0FBSyxHQUFHO0FBQ2pDLEdBQUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUM3RCxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQixHQUFHLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxZQUFZLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDaEUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxJQUFJO0FBQ0osR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPO0FBQzNDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO0FBQ2hDLEdBQUcsS0FBSyxFQUFFLENBQUM7QUFDWCxHQUFHLE9BQU87QUFDVixHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxnQkFBZ0IsR0FBRztBQUN2RCxHQUFHLEtBQUssRUFBRSxDQUFDO0FBQ1gsR0FBRyxRQUFRLEVBQUUsQ0FBQztBQUNkLEdBQUcsQ0FBQztBQUNKO0FBQ0E7QUFDQSxFQUFFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QixFQUFFLElBQUksVUFBVSxDQUFDO0FBQ2pCO0FBQ0EsRUFBRSxJQUFJLE1BQU0sRUFBRTtBQUNkLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RELEdBQUc7QUFDSDtBQUNBLEVBQUUsU0FBUyxRQUFRLEdBQUc7QUFDdEIsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDZixHQUFHLElBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNyRSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUN2QixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsTUFBTSxFQUFFO0FBQ3hDLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxZQUFZO0FBQ3hDLEtBQUssTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBQ3JGLEtBQUssUUFBUSxFQUFFLENBQUM7QUFDaEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixJQUFJLENBQUMsQ0FBQztBQUNOLEdBQUc7QUFDSDtBQUNBLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFHLEVBQUU7QUFDakMsR0FBRyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyRyxHQUFHLFFBQVEsRUFBRSxDQUFDO0FBQ2QsR0FBRyxDQUFDLENBQUM7QUFDTDtBQUNBLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxHQUFHLEVBQUU7QUFDcEMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUI7QUFDQSxHQUFHLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRDtBQUNBO0FBQ0EsR0FBRyxJQUFJQSxPQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUN6QztBQUNBLElBQUksTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QztBQUNBO0FBQ0EsSUFBSSxNQUFNLFdBQVcsR0FBRyxRQUFRLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN0RjtBQUNBO0FBQ0EsSUFBSSxRQUFRLE9BQU8sQ0FBQyxRQUFRO0FBQzVCLEtBQUssS0FBSyxPQUFPO0FBQ2pCLE1BQU0sTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsK0JBQStCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUM3RixNQUFNLFFBQVEsRUFBRSxDQUFDO0FBQ2pCLE1BQU0sT0FBTztBQUNiLEtBQUssS0FBSyxRQUFRO0FBQ2xCO0FBQ0EsTUFBTSxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7QUFDaEM7QUFDQSxPQUFPLElBQUk7QUFDWCxRQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzdDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNyQjtBQUNBLFFBQVEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQVE7QUFDUixPQUFPO0FBQ1AsTUFBTSxNQUFNO0FBQ1osS0FBSyxLQUFLLFFBQVE7QUFDbEI7QUFDQSxNQUFNLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtBQUNoQyxPQUFPLE1BQU07QUFDYixPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU0sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDN0MsT0FBTyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyw2QkFBNkIsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO0FBQzdGLE9BQU8sUUFBUSxFQUFFLENBQUM7QUFDbEIsT0FBTyxPQUFPO0FBQ2QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU0sTUFBTSxXQUFXLEdBQUc7QUFDMUIsT0FBTyxPQUFPLEVBQUUsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUM1QyxPQUFPLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtBQUM3QixPQUFPLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUM7QUFDbkMsT0FBTyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7QUFDM0IsT0FBTyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7QUFDakMsT0FBTyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07QUFDN0IsT0FBTyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7QUFDekIsT0FBTyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07QUFDN0IsT0FBTyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87QUFDL0IsT0FBTyxDQUFDO0FBQ1I7QUFDQTtBQUNBLE1BQU0sSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDckYsT0FBTyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsMERBQTBELEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0FBQ2xILE9BQU8sUUFBUSxFQUFFLENBQUM7QUFDbEIsT0FBTyxPQUFPO0FBQ2QsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsS0FBSyxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtBQUNySCxPQUFPLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLE9BQU8sV0FBVyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7QUFDcEMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BELE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTSxPQUFPLENBQUNBLE9BQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVELE1BQU0sUUFBUSxFQUFFLENBQUM7QUFDakIsTUFBTSxPQUFPO0FBQ2IsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZO0FBQy9CLElBQUksSUFBSSxNQUFNLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RFLElBQUksQ0FBQyxDQUFDO0FBQ04sR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsQ0FBQztBQUM1QztBQUNBLEdBQUcsTUFBTSxnQkFBZ0IsR0FBRztBQUM1QixJQUFJLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztBQUNwQixJQUFJLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVTtBQUMxQixJQUFJLFVBQVUsRUFBRSxHQUFHLENBQUMsYUFBYTtBQUNqQyxJQUFJLE9BQU8sRUFBRSxPQUFPO0FBQ3BCLElBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO0FBQ3RCLElBQUksT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO0FBQzVCLElBQUksT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO0FBQzVCLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQSxHQUFHLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7QUFDL0gsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDcEQsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsSUFBSSxPQUFPO0FBQ1gsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsTUFBTSxXQUFXLEdBQUc7QUFDdkIsSUFBSSxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVk7QUFDNUIsSUFBSSxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVk7QUFDbEMsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBLEdBQUcsSUFBSSxPQUFPLElBQUksTUFBTSxJQUFJLE9BQU8sSUFBSSxRQUFRLEVBQUU7QUFDakQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDckQsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDcEQsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsSUFBSSxPQUFPO0FBQ1gsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHLElBQUksT0FBTyxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksV0FBVyxFQUFFO0FBQ3ZEO0FBQ0E7QUFDQSxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDdEM7QUFDQSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNLElBQUksRUFBRTtBQUNyQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sTUFBTTtBQUNaLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztBQUNoRCxNQUFNO0FBQ04sS0FBSyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDckQsS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdkIsS0FBSyxDQUFDLENBQUM7QUFDUCxJQUFJLE9BQU87QUFDWCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUcsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixLQUFLLFVBQVUsRUFBRTtBQUM3RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7QUFDcEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDcEQsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsSUFBSSxPQUFPO0FBQ1gsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNuRCxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQixHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxhQUFhLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlCLEVBQUUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxPQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFO0FBQ25DLENBQUMsT0FBTyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLENBQUM7QUFDckYsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBQSxPQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDL0I7QUFDQSxTQUFTLGdCQUFnQjtBQUN6QixDQUFDLFFBQVE7QUFDVCxDQUFDLGNBQWM7QUFDZixFQUFFO0FBQ0YsQ0FBQyxNQUFNLGNBQWMsR0FBRyxBQUNyQixDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2xGLEVBQUUsQUFBb0csQ0FBQztBQUN2RztBQUNBLENBQUMsTUFBTSxRQUFRLEdBQUcsQUFDZixDQUFDLE1BQU0sYUFBYSxDQUFDLE9BQU8sQ0FBQztBQUNoQyxFQUFFLEFBQThDLENBQUM7QUFDakQ7QUFDQSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7QUFDckY7QUFDQSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEdBQUcsUUFBUSxDQUFDO0FBQzNDLENBQUMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNwQztBQUNBLENBQUMsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDOUIsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCO0FBQ0EsRUFBRSxNQUFNLE9BQU8sR0FBRyxBQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxBQUF5QixDQUFDO0FBQzNFO0FBQ0EsRUFBRSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztBQUN2QixFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDbkMsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7QUFDcEQsRUFBRSxXQUFXLENBQUM7QUFDZCxHQUFHLE9BQU8sRUFBRSxJQUFJO0FBQ2hCLEdBQUcsS0FBSyxFQUFFO0FBQ1YsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRTtBQUMxQyxJQUFJO0FBQ0osR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUM7QUFDcEYsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxlQUFlLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEdBQUcsR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUU7QUFDeEUsRUFBRSxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUssNEJBQTRCLENBQUM7QUFDNUUsRUFBRSxNQUFNLFVBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLGNBQWMsRUFBRSxDQUFDO0FBQ3BCO0FBQ0EsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM3QyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLEFBQUssQ0FBQyxVQUFVLENBQUMsQUFBZSxDQUFDLENBQUM7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkgsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7QUFDMUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUk7QUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU87QUFDdEI7QUFDQTtBQUNBLElBQUksZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0UsSUFBSSxDQUFDLENBQUM7QUFDTixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksVUFBVSxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7QUFDdkM7QUFDQSxHQUFHLE1BQU0sSUFBSSxHQUFHLGdCQUFnQjtBQUNoQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsRCxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDdkUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEI7QUFDQSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9CLEdBQUcsTUFBTTtBQUNULEdBQUcsTUFBTSxJQUFJLEdBQUcsZ0JBQWdCO0FBQ2hDLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2xELEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLO0FBQ25CLEtBQUssTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBQ3pELEtBQUssT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLEtBQUssQ0FBQztBQUNOLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hCO0FBQ0EsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvQixHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDM0M7QUFDQSxFQUFFLElBQUksUUFBUSxDQUFDO0FBQ2YsRUFBRSxJQUFJLGFBQWEsQ0FBQztBQUNwQjtBQUNBLEVBQUUsTUFBTSxlQUFlLEdBQUc7QUFDMUIsR0FBRyxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxLQUFLO0FBQ3ZDLElBQUksSUFBSSxRQUFRLEtBQUssUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsRUFBRTtBQUM1RixLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7QUFDOUMsS0FBSztBQUNMLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLElBQUksUUFBUSxHQUFHLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ3hDLElBQUk7QUFDSixHQUFHLEtBQUssRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLEtBQUs7QUFDbkMsSUFBSSxhQUFhLEdBQUcsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDNUMsSUFBSTtBQUNKLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksS0FBSztBQUN6QixJQUFJLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xIO0FBQ0EsSUFBSSxJQUFJLElBQUksRUFBRTtBQUNkLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BDO0FBQ0EsS0FBSyxNQUFNLGVBQWU7QUFDMUIsTUFBTSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7QUFDcEMsTUFBTSxJQUFJLENBQUMsV0FBVyxLQUFLLGFBQWEsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwRyxNQUFNLENBQUM7QUFDUDtBQUNBLEtBQUssSUFBSSxlQUFlLEVBQUU7QUFDMUIsTUFBTSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRDtBQUNBLE1BQU0sTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU07QUFDbkMsT0FBTyxFQUFFO0FBQ1QsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUM3QyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0FBQzlDLE9BQU8sQ0FBQztBQUNSO0FBQ0EsTUFBTSxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUk7QUFDN0UsT0FBTyxNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakQsT0FBTyxJQUFJLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9DLE9BQU8sQ0FBQyxDQUFDO0FBQ1Q7QUFDQSxNQUFNLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3RDLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25CO0FBQ0EsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDaEMsTUFBTTtBQUNOLEtBQUs7QUFDTDtBQUNBLElBQUksT0FBT0EsT0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEMsSUFBSTtBQUNKLEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxJQUFJLFNBQVMsQ0FBQztBQUNoQixFQUFFLElBQUksS0FBSyxDQUFDO0FBQ1osRUFBRSxJQUFJLE1BQU0sQ0FBQztBQUNiO0FBQ0EsRUFBRSxJQUFJO0FBQ04sR0FBRyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsWUFBWTtBQUMvQyxNQUFNLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUNsRCxLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUk7QUFDM0IsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7QUFDbkIsS0FBSyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7QUFDckIsS0FBSyxNQUFNLEVBQUUsRUFBRTtBQUNmLEtBQUssRUFBRSxPQUFPLENBQUM7QUFDZixNQUFNLEVBQUUsQ0FBQztBQUNUO0FBQ0EsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEQ7QUFDQTtBQUNBLEdBQUcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwQyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtBQUNqQyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSTtBQUN4RCxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDNUI7QUFDQTtBQUNBLEtBQUssTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEQ7QUFDQSxLQUFLLE9BQU8sSUFBSSxDQUFDLE9BQU87QUFDeEIsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDM0MsT0FBTyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJO0FBQzdCLE9BQU8sSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO0FBQ3JCLE9BQU8sS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO0FBQ3ZCLE9BQU8sTUFBTTtBQUNiLE9BQU8sRUFBRSxPQUFPLENBQUM7QUFDakIsUUFBUSxFQUFFLENBQUM7QUFDWCxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ1IsSUFBSTtBQUNKO0FBQ0EsR0FBRyxTQUFTLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNoQixHQUFHLElBQUksS0FBSyxFQUFFO0FBQ2QsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUM5QixJQUFJO0FBQ0o7QUFDQSxHQUFHLGFBQWEsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ3JELEdBQUcsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNsQixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUk7QUFDTixHQUFHLElBQUksUUFBUSxFQUFFO0FBQ2pCLElBQUksTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0U7QUFDQSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztBQUN6QyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2Q7QUFDQSxJQUFJLE9BQU87QUFDWCxJQUFJO0FBQ0o7QUFDQSxHQUFHLElBQUksYUFBYSxFQUFFO0FBQ3RCLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsYUFBYSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUUsSUFBSSxPQUFPO0FBQ1gsSUFBSTtBQUNKO0FBQ0EsR0FBRyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEQ7QUFDQTtBQUNBLEdBQUcsTUFBTSxlQUFlLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNiO0FBQ0EsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUs7QUFDbkMsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6QyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUNSLElBQUksQ0FBQyxDQUFDO0FBQ047QUFDQSxHQUFHLE1BQU0sS0FBSyxHQUFHO0FBQ2pCLElBQUksTUFBTSxFQUFFO0FBQ1osS0FBSyxJQUFJLEVBQUU7QUFDWCxNQUFNLFNBQVMsRUFBRSxRQUFRLENBQUM7QUFDMUIsT0FBTyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJO0FBQzdCLE9BQU8sSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO0FBQ3JCLE9BQU8sS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO0FBQ3ZCLE9BQU8sTUFBTTtBQUNiLE9BQU8sQ0FBQyxDQUFDLFNBQVM7QUFDbEIsTUFBTTtBQUNOLEtBQUssVUFBVSxFQUFFO0FBQ2pCLE1BQU0sU0FBUyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTO0FBQ3pDLE1BQU07QUFDTixLQUFLLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQy9CLEtBQUs7QUFDTCxJQUFJLFFBQVEsRUFBRSxlQUFlO0FBQzdCLElBQUksTUFBTSxFQUFFLEtBQUssR0FBRyxNQUFNLEdBQUcsR0FBRztBQUNoQyxJQUFJLEtBQUssRUFBRSxLQUFLLEdBQUcsS0FBSyxZQUFZLEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSTtBQUM3RSxJQUFJLE1BQU0sRUFBRTtBQUNaLEtBQUssS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsS0FBSztBQUNMLElBQUksTUFBTSxFQUFFO0FBQ1osS0FBSyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN6QixLQUFLLEtBQUssRUFBRSxFQUFFO0FBQ2QsS0FBSztBQUNMLElBQUksQ0FBQztBQUNMO0FBQ0EsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7QUFDakMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDZCxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ25ELEtBQUssTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUztBQUN6QjtBQUNBLEtBQUssS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHO0FBQzVCLE1BQU0sU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO0FBQy9CLE1BQU0sS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtBQUNuQyxNQUFNLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzFCLE1BQU0sQ0FBQztBQUNQLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQSxHQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakQ7QUFDQSxHQUFHLE1BQU0sVUFBVSxHQUFHO0FBQ3RCLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUUsSUFBSSxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJO0FBQ3RELEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekUsS0FBSyxDQUFDO0FBQ04sSUFBSSxLQUFLLEVBQUUsS0FBSyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQzlDLElBQUksQ0FBQztBQUNMO0FBQ0EsR0FBRyxJQUFJLE1BQU0sR0FBRyxDQUFDLFlBQVksRUFBRTtBQUMvQixJQUFJLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN6RCxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzlCLElBQUksVUFBVSxDQUFDLFNBQVMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0QsSUFBSSxVQUFVLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNuQztBQUNBLEdBQUcsSUFBSSxrQkFBa0IsRUFBRTtBQUMzQixJQUFJLE1BQU0sSUFBSSxDQUFDLGtFQUFrRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUN0SCxJQUFJO0FBQ0o7QUFDQSxHQUFHLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEcsR0FBRyxNQUFNLElBQUksR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNoRDtBQUNBLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUN4QyxJQUFJLElBQUksVUFBVSxDQUFDLGFBQWEsRUFBRTtBQUNsQyxLQUFLLE1BQU0sV0FBVyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDekYsS0FBSyxNQUFNLElBQUksQ0FBQyx1REFBdUQsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLDRKQUE0SixFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO0FBQ3pZLEtBQUssTUFBTTtBQUNYLEtBQUssTUFBTSxJQUFJLENBQUMsb0ZBQW9GLEVBQUUsSUFBSSxDQUFDLG1FQUFtRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUM1UyxLQUFLO0FBQ0wsSUFBSSxNQUFNO0FBQ1YsSUFBSSxNQUFNLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEQsSUFBSTtBQUNKO0FBQ0EsR0FBRyxJQUFJLE1BQU0sQ0FBQztBQUNkO0FBQ0E7QUFDQTtBQUNBLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO0FBQzlDLElBQUksTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNqQyxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJO0FBQy9CLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPO0FBQ3ZCLEtBQUssTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEU7QUFDQSxLQUFLLElBQUksbUJBQW1CLEVBQUU7QUFDOUIsTUFBTSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJO0FBQzFDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixPQUFPLENBQUMsQ0FBQztBQUNULE1BQU07QUFDTixLQUFLLENBQUMsQ0FBQztBQUNQO0FBQ0EsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbkMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsb0NBQW9DLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsSUFBSSxNQUFNO0FBQ1YsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNuRSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUcsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM3RjtBQUNBLEdBQUcsTUFBTSxJQUFJLEdBQUcsUUFBUSxFQUFFO0FBQzFCLEtBQUssT0FBTyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEUsS0FBSyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqRixLQUFLLE9BQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDekMsS0FBSyxPQUFPLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyw0Q0FBNEMsRUFBRSxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQztBQUNwSSxLQUFLLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLE1BQU0sQ0FBQyxDQUFDO0FBQzlDO0FBQ0EsR0FBRyxHQUFHLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztBQUMzQixHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFO0FBQ2YsR0FBRyxJQUFJLEtBQUssRUFBRTtBQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDeEIsSUFBSSxNQUFNO0FBQ1YsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDckMsSUFBSTtBQUNKLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDNUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssNEJBQTRCLEVBQUU7QUFDakQsR0FBRyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQy9ELEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbkMsR0FBRyxPQUFPO0FBQ1YsR0FBRztBQUNIO0FBQ0EsRUFBRSxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtBQUM1QixHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3BDLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEMsSUFBSSxPQUFPO0FBQ1gsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBLEVBQUUsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNDLEVBQUUsQ0FBQztBQUNILENBQUM7QUFDRDtBQUNBLFNBQVMsYUFBYSxDQUFDLEdBQUcsR0FBRyxTQUFTLEVBQUU7QUFDeEMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBQ0Q7QUFDQSxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ25DLENBQUMsSUFBSTtBQUNMLEVBQUUsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsRUFBRSxDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ2YsRUFBRSxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsRUFBRSxPQUFPLElBQUksQ0FBQztBQUNkLEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQSxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDM0IsQ0FBQyxNQUFNLEtBQUssR0FBRztBQUNmLEVBQUUsR0FBRyxHQUFHLE1BQU07QUFDZCxFQUFFLEdBQUcsRUFBRSxLQUFLO0FBQ1osRUFBRSxHQUFHLEVBQUUsS0FBSztBQUNaLEVBQUUsR0FBRyxHQUFHLElBQUk7QUFDWixFQUFFLEdBQUcsR0FBRyxJQUFJO0FBQ1osRUFBRSxDQUFDO0FBQ0g7QUFDQSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFDRDtBQUNBLFNBQVMsVUFBVSxDQUFDLElBQUk7QUFDeEI7QUFDQTtBQUNBLEdBQUcsRUFBRSxFQUFFO0FBQ1AsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQztBQUNsQztBQUNBLENBQUMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7QUFDOUI7QUFDQSxDQUFDLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ2pDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksS0FBSztBQUN0QixHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7QUFDbEMsSUFBSSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBQzlCLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7QUFDeEUsS0FBSyxXQUFXLElBQUksR0FBRyxDQUFDO0FBQ3hCLEtBQUs7QUFDTDtBQUNBLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxXQUFXO0FBQzdCLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsQ0FBQztBQUNWLElBQUk7QUFDSjtBQUNBLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDMUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ2pCLEtBQUssVUFBVSxFQUFFLElBQUk7QUFDckIsS0FBSyxLQUFLLEVBQUUsVUFBVTtBQUN0QixLQUFLLFFBQVEsRUFBRSxHQUFHLENBQUMsT0FBTztBQUMxQixLQUFLLENBQUMsQ0FBQztBQUNQO0FBQ0EsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDNUIsSUFBSTtBQUNKO0FBQ0EsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQy9CLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDM0MsSUFBSTtBQUNKO0FBQ0EsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNWLEdBQUc7QUFDSDtBQUNBLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ3BFLEdBQUcsUUFBUSxFQUFFLG9CQUFvQjtBQUNqQyxHQUFHLGFBQWEsRUFBRSxxQ0FBcUM7QUFDdkQsR0FBRyxDQUFDO0FBQ0o7QUFDQSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQztBQUN4RSxHQUFHLFFBQVEsRUFBRSx3QkFBd0I7QUFDckMsR0FBRyxhQUFhLEVBQUUscUNBQXFDO0FBQ3ZELEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxLQUFLLENBQUM7QUFDUixHQUFHLE1BQU0sRUFBRSxVQUFVO0FBQ3JCLEdBQUcsYUFBYSxFQUFFLEFBQUssQ0FBQyxVQUFVLENBQUMsQUFBK0I7QUFDbEUsR0FBRyxDQUFDO0FBQ0o7QUFDQSxFQUFFLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7QUFDbEQ7QUFDQSxFQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxPQUFPLElBQUlDLE1BQUksQ0FBQztBQUM3QyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUNEO0FBQ0EsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQzVDLENBQUMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUMvQjtBQUNBLENBQUMsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ3pDLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFO0FBQ2xCLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUNqQixHQUFHO0FBQ0g7QUFDQSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxDQUFDLE1BQU07QUFDZixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztBQUN0RCxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEtBQUs7QUFDeEIsR0FBRyxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFO0FBQ3hDLElBQUksSUFBSSxFQUFFLENBQUM7QUFDWCxJQUFJLE1BQU07QUFDVixJQUFJLFdBQVcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuQyxJQUFJO0FBQ0osR0FBRyxDQUFDO0FBQ0osQ0FBQztBQUNEO0FBQ0EsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNqQyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxDQUFDLElBQUksR0FBRyxZQUFZLE1BQU0sRUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakQsQ0FBQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRCxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFDRDtBQUNBLFNBQVMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUMsTUFBTSxNQUFNLEdBQUcsUUFBUTtBQUN4QixJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUTtBQUNsQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLEFBRUE7QUFDQSxDQUFDLE1BQU0sSUFBSSxHQUFHLEFBQ1gsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pELEVBQUUsQUFBOEcsQ0FBQztBQUNqSDtBQUNBLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxLQUFLO0FBQzVCLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDbkIsR0FBRyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QztBQUNBLEdBQUcsSUFBSTtBQUNQLElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDcEUsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUI7QUFDQSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDbEQsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNqQixJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN6QixJQUFJO0FBQ0osR0FBRyxNQUFNO0FBQ1QsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNWLEdBQUc7QUFDSCxFQUFFLENBQUM7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxTQUFTQSxNQUFJLEVBQUUsRUFBRTs7QUNycUZqQixNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDdkMsTUFBTSxHQUFHLEdBQUcsUUFBUSxLQUFLLGFBQWEsQ0FBQztBQUN2QztBQUNBLEtBQUssRUFBRTtBQUNQLEVBQUUsR0FBRztBQUNMLEVBQUUsV0FBVyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQy9CLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLEVBQUVDLFVBQWlCLEVBQUU7QUFDckIsRUFBRTtBQUNGLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUk7QUFDdEIsRUFBRSxJQUFJLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNyQyxFQUFFLENBQUMsQ0FBQyJ9
