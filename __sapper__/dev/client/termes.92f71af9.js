import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, u as validate_each_argument, p as onMount, v as validate_slots, e as element, t as text$1, f as claim_element, g as children, h as claim_text, b as detach_dev, k as add_location, l as insert_dev, m as append_dev, a as space, c as claim_space, j as attr_dev, z as set_data_dev, D as destroy_each, G as empty, n as noop, I as listen_dev, K as is_function } from './client.0370fdb0.js';

/* src/routes/termes.svelte generated by Svelte v3.21.0 */
const file = "src/routes/termes.svelte";

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[5] = list[i];
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (106:0) {:else}
function create_else_block_1(ctx) {
	let p;
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text$1("chargement des thèmes...");
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t = claim_text(p_nodes, "chargement des thèmes...");
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(p, file, 106, 4, 2741);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(106:0) {:else}",
		ctx
	});

	return block;
}

// (101:12) {:else}
function create_else_block(ctx) {
	let p;
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text$1("chargement des termes...");
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t = claim_text(p_nodes, "chargement des termes...");
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(p, file, 101, 16, 2649);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(101:12) {:else}",
		ctx
	});

	return block;
}

// (80:12) {#each getPinyinByThemes(terms, theme) as term}
function create_each_block_1(ctx) {
	let tr;
	let td0;
	let span;
	let t0_value = /*term*/ ctx[5].ideogram + "";
	let t0;
	let t1;
	let audio;
	let source;
	let source_src_value;
	let audio_id_value;
	let t2;
	let img;
	let img_src_value;
	let t3;
	let td1;
	let t4_value = /*term*/ ctx[5].pinyin + "";
	let t4;
	let t5;
	let dispose;

	const block = {
		c: function create() {
			tr = element("tr");
			td0 = element("td");
			span = element("span");
			t0 = text$1(t0_value);
			t1 = space();
			audio = element("audio");
			source = element("source");
			t2 = space();
			img = element("img");
			t3 = space();
			td1 = element("td");
			t4 = text$1(t4_value);
			t5 = space();
			this.h();
		},
		l: function claim(nodes) {
			tr = claim_element(nodes, "TR", {});
			var tr_nodes = children(tr);
			td0 = claim_element(tr_nodes, "TD", {});
			var td0_nodes = children(td0);
			span = claim_element(td0_nodes, "SPAN", { class: true, title: true });
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, t0_value);
			span_nodes.forEach(detach_dev);
			t1 = claim_space(td0_nodes);
			audio = claim_element(td0_nodes, "AUDIO", { id: true });
			var audio_nodes = children(audio);
			source = claim_element(audio_nodes, "SOURCE", { src: true, type: true });
			audio_nodes.forEach(detach_dev);
			t2 = claim_space(td0_nodes);
			img = claim_element(td0_nodes, "IMG", { class: true, src: true, alt: true });
			td0_nodes.forEach(detach_dev);
			t3 = claim_space(tr_nodes);
			td1 = claim_element(tr_nodes, "TD", {});
			var td1_nodes = children(td1);
			t4 = claim_text(td1_nodes, t4_value);
			td1_nodes.forEach(detach_dev);
			t5 = claim_space(tr_nodes);
			tr_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "tooltip");
			attr_dev(span, "title", "français");
			add_location(span, file, 82, 24, 1870);
			if (source.src !== (source_src_value = "assets/audio/" + /*term*/ ctx[5].ideogram + ".mp3")) attr_dev(source, "src", source_src_value);
			attr_dev(source, "type", "audio/mpeg");
			add_location(source, file, 86, 28, 2067);
			attr_dev(audio, "id", audio_id_value = /*term*/ ctx[5].ideogram);
			add_location(audio, file, 85, 24, 2010);
			attr_dev(img, "class", "icons svelte-1bpn0qh");
			if (img.src !== (img_src_value = "/assets/icons/sound.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "sound");
			add_location(img, file, 91, 24, 2284);
			add_location(td0, file, 81, 20, 1841);
			add_location(td1, file, 98, 20, 2568);
			add_location(tr, file, 80, 16, 1816);
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, tr, anchor);
			append_dev(tr, td0);
			append_dev(td0, span);
			append_dev(span, t0);
			append_dev(td0, t1);
			append_dev(td0, audio);
			append_dev(audio, source);
			append_dev(td0, t2);
			append_dev(td0, img);
			append_dev(tr, t3);
			append_dev(tr, td1);
			append_dev(td1, t4);
			append_dev(tr, t5);
			if (remount) dispose();

			dispose = listen_dev(
				img,
				"click",
				function () {
					if (is_function(playAudio(/*term*/ ctx[5].ideogram))) playAudio(/*term*/ ctx[5].ideogram).apply(this, arguments);
				},
				false,
				false,
				false
			);
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*terms, themes*/ 3 && t0_value !== (t0_value = /*term*/ ctx[5].ideogram + "")) set_data_dev(t0, t0_value);

			if (dirty & /*terms, themes*/ 3 && source.src !== (source_src_value = "assets/audio/" + /*term*/ ctx[5].ideogram + ".mp3")) {
				attr_dev(source, "src", source_src_value);
			}

			if (dirty & /*terms, themes*/ 3 && audio_id_value !== (audio_id_value = /*term*/ ctx[5].ideogram)) {
				attr_dev(audio, "id", audio_id_value);
			}

			if (dirty & /*terms, themes*/ 3 && t4_value !== (t4_value = /*term*/ ctx[5].pinyin + "")) set_data_dev(t4, t4_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(tr);
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(80:12) {#each getPinyinByThemes(terms, theme) as term}",
		ctx
	});

	return block;
}

// (67:0) {#each themes as theme}
function create_each_block(ctx) {
	let h3;
	let t0_value = /*theme*/ ctx[2].ideogram + "";
	let t0;
	let t1;
	let span;
	let t2_value = /*theme*/ ctx[2].pinyin + "";
	let t2;
	let t3;
	let div;
	let table;
	let thead;
	let tr;
	let td0;
	let t4;
	let t5;
	let td1;
	let t6;
	let t7;
	let t8;
	let each_value_1 = getPinyinByThemes(/*terms*/ ctx[0], /*theme*/ ctx[2]);
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let each_1_else_1 = null;

	if (!each_value_1.length) {
		each_1_else_1 = create_else_block(ctx);
	}

	const block = {
		c: function create() {
			h3 = element("h3");
			t0 = text$1(t0_value);
			t1 = space();
			span = element("span");
			t2 = text$1(t2_value);
			t3 = space();
			div = element("div");
			table = element("table");
			thead = element("thead");
			tr = element("tr");
			td0 = element("td");
			t4 = text$1("Chinois traditionnel");
			t5 = space();
			td1 = element("td");
			t6 = text$1("Pinyin");
			t7 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (each_1_else_1) {
				each_1_else_1.c();
			}

			t8 = space();
			this.h();
		},
		l: function claim(nodes) {
			h3 = claim_element(nodes, "H3", { class: true });
			var h3_nodes = children(h3);
			t0 = claim_text(h3_nodes, t0_value);
			t1 = claim_space(h3_nodes);
			span = claim_element(h3_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t2 = claim_text(span_nodes, t2_value);
			span_nodes.forEach(detach_dev);
			h3_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			table = claim_element(div_nodes, "TABLE", { class: true });
			var table_nodes = children(table);
			thead = claim_element(table_nodes, "THEAD", {});
			var thead_nodes = children(thead);
			tr = claim_element(thead_nodes, "TR", {});
			var tr_nodes = children(tr);
			td0 = claim_element(tr_nodes, "TD", {});
			var td0_nodes = children(td0);
			t4 = claim_text(td0_nodes, "Chinois traditionnel");
			td0_nodes.forEach(detach_dev);
			t5 = claim_space(tr_nodes);
			td1 = claim_element(tr_nodes, "TD", {});
			var td1_nodes = children(td1);
			t6 = claim_text(td1_nodes, "Pinyin");
			td1_nodes.forEach(detach_dev);
			tr_nodes.forEach(detach_dev);
			thead_nodes.forEach(detach_dev);
			t7 = claim_space(table_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(table_nodes);
			}

			if (each_1_else_1) {
				each_1_else_1.l(table_nodes);
			}

			table_nodes.forEach(detach_dev);
			t8 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "pinyin svelte-1bpn0qh");
			add_location(span, file, 69, 8, 1454);
			attr_dev(h3, "class", "svelte-1bpn0qh");
			add_location(h3, file, 67, 4, 1416);
			add_location(td0, file, 75, 20, 1631);
			add_location(td1, file, 76, 20, 1681);
			add_location(tr, file, 74, 16, 1606);
			add_location(thead, file, 73, 12, 1582);
			attr_dev(table, "class", "column column-66");
			add_location(table, file, 72, 8, 1537);
			attr_dev(div, "class", "row");
			add_location(div, file, 71, 4, 1511);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h3, anchor);
			append_dev(h3, t0);
			append_dev(h3, t1);
			append_dev(h3, span);
			append_dev(span, t2);
			insert_dev(target, t3, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, table);
			append_dev(table, thead);
			append_dev(thead, tr);
			append_dev(tr, td0);
			append_dev(td0, t4);
			append_dev(tr, t5);
			append_dev(tr, td1);
			append_dev(td1, t6);
			append_dev(table, t7);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(table, null);
			}

			if (each_1_else_1) {
				each_1_else_1.m(table, null);
			}

			append_dev(div, t8);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*themes*/ 2 && t0_value !== (t0_value = /*theme*/ ctx[2].ideogram + "")) set_data_dev(t0, t0_value);
			if (dirty & /*themes*/ 2 && t2_value !== (t2_value = /*theme*/ ctx[2].pinyin + "")) set_data_dev(t2, t2_value);

			if (dirty & /*getPinyinByThemes, terms, themes, playAudio*/ 3) {
				each_value_1 = getPinyinByThemes(/*terms*/ ctx[0], /*theme*/ ctx[2]);
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(table, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;

				if (each_value_1.length) {
					if (each_1_else_1) {
						each_1_else_1.d(1);
						each_1_else_1 = null;
					}
				} else if (!each_1_else_1) {
					each_1_else_1 = create_else_block(ctx);
					each_1_else_1.c();
					each_1_else_1.m(table, null);
				}
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h3);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
			if (each_1_else_1) each_1_else_1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(67:0) {#each themes as theme}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let h2;
	let t0;
	let t1;
	let p;
	let t2;
	let em;
	let t3;
	let t4;
	let each_1_anchor;
	let each_value = /*themes*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let each_1_else = null;

	if (!each_value.length) {
		each_1_else = create_else_block_1(ctx);
	}

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text$1("Termes utilisés");
			t1 = space();
			p = element("p");
			t2 = text$1("Cette page présente une liste des termes en chinois traditionnel employés\n    sur le site avec leurs traduction en\n    ");
			em = element("em");
			t3 = text$1("pinyin");
			t4 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();

			if (each_1_else) {
				each_1_else.c();
			}

			this.h();
		},
		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", {});
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "Termes utilisés");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t2 = claim_text(p_nodes, "Cette page présente une liste des termes en chinois traditionnel employés\n    sur le site avec leurs traduction en\n    ");
			em = claim_element(p_nodes, "EM", {});
			var em_nodes = children(em);
			t3 = claim_text(em_nodes, "pinyin");
			em_nodes.forEach(detach_dev);
			p_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();

			if (each_1_else) {
				each_1_else.l(nodes);
			}

			this.h();
		},
		h: function hydrate() {
			add_location(h2, file, 59, 0, 1214);
			add_location(em, file, 64, 4, 1367);
			add_location(p, file, 61, 0, 1240);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t2);
			append_dev(p, em);
			append_dev(em, t3);
			insert_dev(target, t4, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);

			if (each_1_else) {
				each_1_else.m(target, anchor);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*getPinyinByThemes, terms, themes, playAudio*/ 3) {
				each_value = /*themes*/ ctx[1];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;

				if (each_value.length) {
					if (each_1_else) {
						each_1_else.d(1);
						each_1_else = null;
					}
				} else if (!each_1_else) {
					each_1_else = create_else_block_1(ctx);
					each_1_else.c();
					each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
				}
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t4);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
			if (each_1_else) each_1_else.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function getPinyinByThemes(pinyins, theme) {
	return pinyins.filter(pinyin => pinyin.theme === theme.en);
}

function playAudio(ideogram) {
	document.querySelector(`#${ideogram}`).play();
}

function instance($$self, $$props, $$invalidate) {
	let terms = [];
	let themes = [];

	onMount(async () => {
		const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`);

		if (res.ok) {
			$$invalidate(0, terms = (await res.json()).api);
		} else {
			// 404
			throw new Error(text);
		}

		const res1 = await fetch(`https://api-tea.oisiflorus.com/api/v1/themes`);

		if (res1.ok) {
			$$invalidate(1, themes = (await res1.json()).api);
		} else {
			// 404
			throw new Error(text);
		}
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Termes> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Termes", $$slots, []);

	$$self.$capture_state = () => ({
		onMount,
		terms,
		themes,
		getPinyinByThemes,
		playAudio
	});

	$$self.$inject_state = $$props => {
		if ("terms" in $$props) $$invalidate(0, terms = $$props.terms);
		if ("themes" in $$props) $$invalidate(1, themes = $$props.themes);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [terms, themes];
}

class Termes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Termes",
			options,
			id: create_fragment.name
		});
	}
}

export default Termes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWVzLjkyZjcxYWY5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Rlcm1lcy5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHN0eWxlPlxuICAgIGgzIHtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgbWFyZ2luLXRvcDogMmVtO1xuICAgIH1cblxuICAgIC5waW55aW4ge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1zaXplOiAwLjdlbTtcbiAgICAgICAgY29sb3I6ICM5OTk7XG4gICAgfVxuICAgIGltZyB7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IC0wLjRlbTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lO1xuICAgICAgICB3aWR0aDogNSU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGZpbGw6ICNjY2M7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG48L3N0eWxlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnXG5cbiAgICBsZXQgdGVybXMgPSBbXVxuICAgIGxldCB0aGVtZXMgPSBbXVxuXG4gICAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS10ZWEub2lzaWZsb3J1cy5jb20vYXBpL3YxL3BpbnlpbmApXG5cbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgdGVybXMgPSAoYXdhaXQgcmVzLmpzb24oKSkuYXBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyA0MDRcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzMSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS10ZWEub2lzaWZsb3J1cy5jb20vYXBpL3YxL3RoZW1lc2ApXG5cbiAgICAgICAgaWYgKHJlczEub2spIHtcbiAgICAgICAgICAgIHRoZW1lcyA9IChhd2FpdCByZXMxLmpzb24oKSkuYXBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyA0MDRcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGdldFBpbnlpbkJ5VGhlbWVzKHBpbnlpbnMsIHRoZW1lKSB7XG4gICAgICAgIHJldHVybiBwaW55aW5zLmZpbHRlcihwaW55aW4gPT4gcGlueWluLnRoZW1lID09PSB0aGVtZS5lbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5QXVkaW8oaWRlb2dyYW0pIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWRlb2dyYW19YCkucGxheSgpXG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxoMj5UZXJtZXMgdXRpbGlzw6lzPC9oMj5cblxuPHA+XG4gICAgQ2V0dGUgcGFnZSBwcsOpc2VudGUgdW5lIGxpc3RlIGRlcyB0ZXJtZXMgZW4gY2hpbm9pcyB0cmFkaXRpb25uZWwgZW1wbG95w6lzXG4gICAgc3VyIGxlIHNpdGUgYXZlYyBsZXVycyB0cmFkdWN0aW9uIGVuXG4gICAgPGVtPnBpbnlpbjwvZW0+XG48L3A+XG57I2VhY2ggdGhlbWVzIGFzIHRoZW1lfVxuICAgIDxoMz5cbiAgICAgICAge3RoZW1lLmlkZW9ncmFtfVxuICAgICAgICA8c3BhbiBjbGFzcz1cInBpbnlpblwiPnt0aGVtZS5waW55aW59PC9zcGFuPlxuICAgIDwvaDM+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8dGFibGUgY2xhc3M9XCJjb2x1bW4gY29sdW1uLTY2XCI+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+Q2hpbm9pcyB0cmFkaXRpb25uZWw8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+UGlueWluPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIHsjZWFjaCBnZXRQaW55aW5CeVRoZW1lcyh0ZXJtcywgdGhlbWUpIGFzIHRlcm19XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXBcIiB0aXRsZT1cImZyYW7Dp2Fpc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXJtLmlkZW9ncmFtfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGF1ZGlvIGlkPVwie3Rlcm0uaWRlb2dyYW19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJhc3NldHMvYXVkaW8ve3Rlcm0uaWRlb2dyYW19Lm1wM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJhdWRpby9tcGVnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hdWRpbz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImljb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2ljb25zL3NvdW5kLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwic291bmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOmNsaWNrPVwie3BsYXlBdWRpbyh0ZXJtLmlkZW9ncmFtKX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt0ZXJtLnBpbnlpbn08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgICAgICAgPHA+Y2hhcmdlbWVudCBkZXMgdGVybWVzLi4uPC9wPlxuICAgICAgICAgICAgey9lYWNofVxuICAgICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuezplbHNlfVxuICAgIDxwPmNoYXJnZW1lbnQgZGVzIHRow6htZXMuLi48L3A+XG57L2VhY2h9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBbUY2QixHQUFJLElBQUMsUUFBUTs7Ozs7Ozs7Ozs7O3lCQWVqQixHQUFJLElBQUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxRUFYZSxHQUFJLElBQUMsUUFBUTs7O21EQUY1QixHQUFJLElBQUMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQVVWLFNBQVMsVUFBQyxHQUFJLElBQUMsUUFBUSxJQUF2QixTQUFTLFVBQUMsR0FBSSxJQUFDLFFBQVE7Ozs7Ozs7Ozt3RUFaakMsR0FBSSxJQUFDLFFBQVE7O29HQUlTLEdBQUksSUFBQyxRQUFROzs7O29GQUY1QixHQUFJLElBQUMsUUFBUTs7Ozt3RUFheEIsR0FBSSxJQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBOUIzQixHQUFLLElBQUMsUUFBUTs7OzswQkFDTyxHQUFLLElBQUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7b0JBVXZCLGlCQUFpQixXQUFDLEdBQUssZUFBRSxHQUFLOzs7O2tDQUFuQyxNQUFJOzs7Ozs7bUJBQUosTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0VBWFQsR0FBSyxJQUFDLFFBQVE7a0VBQ08sR0FBSyxJQUFDLE1BQU07OzttQkFVdkIsaUJBQWlCLFdBQUMsR0FBSyxlQUFFLEdBQUs7Ozs7aUNBQW5DLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBQUosTUFBSTs7cUJBQUosTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQWJYLEdBQU07Ozs7Z0NBQVgsTUFBSTs7Ozs7O2lCQUFKLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBQUMsR0FBTTs7OzsrQkFBWCxNQUFJOzs7Ozs7Ozs7Ozs7Ozs7O29DQUFKLE1BQUk7O21CQUFKLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXhDTyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsS0FBSztRQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxFQUFFOzs7U0FHcEQsU0FBUyxDQUFDLFFBQVE7Q0FDdkIsUUFBUSxDQUFDLGFBQWEsS0FBSyxRQUFRLElBQUksSUFBSTs7OztLQTVCM0MsS0FBSztLQUNMLE1BQU07O0NBRVYsT0FBTztRQUNHLEdBQUcsU0FBUyxLQUFLOztNQUVuQixHQUFHLENBQUMsRUFBRTttQkFDTixLQUFLLFVBQVUsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHOzs7YUFHcEIsS0FBSyxDQUFDLElBQUk7OztRQUdsQixJQUFJLFNBQVMsS0FBSzs7TUFFcEIsSUFBSSxDQUFDLEVBQUU7bUJBQ1AsTUFBTSxVQUFVLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRzs7O2FBR3RCLEtBQUssQ0FBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
