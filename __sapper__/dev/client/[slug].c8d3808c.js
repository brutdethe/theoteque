import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, p as onMount, v as validate_slots, o as globals, a as space, e as element, t as text, q as query_selector_all, b as detach_dev, c as claim_space, f as claim_element, g as children, h as claim_text, k as add_location, j as attr_dev, l as insert_dev, m as append_dev, z as set_data_dev, n as noop } from './client.0c47b8ae.js';

/* src/routes/documentation/[slug].svelte generated by Svelte v3.21.0 */

const { document: document_1 } = globals;
const file = "src/routes/documentation/[slug].svelte";

function create_fragment(ctx) {
	let title_value;
	let t0;
	let h1;
	let t1_value = /*post*/ ctx[0].titre + "";
	let t1;
	let t2;
	let div;
	let raw_value = /*post*/ ctx[0].html + "";
	document_1.title = title_value = /*post*/ ctx[0].titre;

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text(t1_value);
			t2 = space();
			div = element("div");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1ns4ar5\"]", document_1.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, t1_value);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h1, file, 65, 0, 1613);
			attr_dev(div, "class", "content svelte-9deje");
			add_location(div, file, 67, 0, 1636);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, div, anchor);
			div.innerHTML = raw_value;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*post*/ 1 && title_value !== (title_value = /*post*/ ctx[0].titre)) {
				document_1.title = title_value;
			}

			if (dirty & /*post*/ 1 && t1_value !== (t1_value = /*post*/ ctx[0].titre + "")) set_data_dev(t1, t1_value);
			if (dirty & /*post*/ 1 && raw_value !== (raw_value = /*post*/ ctx[0].html + "")) div.innerHTML = raw_value;		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div);
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

async function preload({ params, query }) {
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

function instance($$self, $$props, $$invalidate) {
	onMount(async () => {
		
		[...document.querySelectorAll("a[href^=\"#\"]")].map(x => x.href = document.location + new URL(x.href).hash);
	});

	let { post } = $$props;
	const writable_props = ["post"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<U5Bslugu5D> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("U5Bslugu5D", $$slots, []);

	$$self.$set = $$props => {
		if ("post" in $$props) $$invalidate(0, post = $$props.post);
	};

	$$self.$capture_state = () => ({ preload, onMount, post });

	$$self.$inject_state = $$props => {
		if ("post" in $$props) $$invalidate(0, post = $$props.post);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [post];
}

class U5Bslugu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { post: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bslugu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*post*/ ctx[0] === undefined && !("post" in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'post'");
		}
	}

	get post() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set post(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default U5Bslugu5D;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW3NsdWddLmM4ZDM4MDhjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2RvY3VtZW50YXRpb24vW3NsdWddLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c3R5bGU+XG4gICAgLypcblx0XHRCeSBkZWZhdWx0LCBDU1MgaXMgbG9jYWxseSBzY29wZWQgdG8gdGhlIGNvbXBvbmVudCxcblx0XHRhbmQgYW55IHVudXNlZCBzdHlsZXMgYXJlIGRlYWQtY29kZS1lbGltaW5hdGVkLlxuXHRcdEluIHRoaXMgcGFnZSwgU3ZlbHRlIGNhbid0IGtub3cgd2hpY2ggZWxlbWVudHMgYXJlXG5cdFx0Z29pbmcgdG8gYXBwZWFyIGluc2lkZSB0aGUge3t7cG9zdC5odG1sfX19IGJsb2NrLFxuXHRcdHNvIHdlIGhhdmUgdG8gdXNlIHRoZSA6Z2xvYmFsKC4uLikgbW9kaWZpZXIgdG8gdGFyZ2V0XG5cdFx0YWxsIGVsZW1lbnRzIGluc2lkZSAuY29udGVudFxuXHQqL1xuICAgIC5jb250ZW50IDpnbG9iYWwoaDIpIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjRlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICAuY29udGVudCA6Z2xvYmFsKHByZSkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAxcHggMXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xuICAgICAgICBwYWRkaW5nOiAwLjVlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICBvdmVyZmxvdy14OiBhdXRvO1xuICAgIH1cblxuICAgIC5jb250ZW50IDpnbG9iYWwocHJlKSA6Z2xvYmFsKGNvZGUpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxuXG4gICAgLmNvbnRlbnQgOmdsb2JhbCh1bCkge1xuICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIH1cblxuICAgIC5jb250ZW50IDpnbG9iYWwobGkpIHtcbiAgICAgICAgbWFyZ2luOiAwIDAgMC41ZW0gMDtcbiAgICB9XG48L3N0eWxlPlxuXG48c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZCh7IHBhcmFtcywgcXVlcnkgfSkge1xuICAgICAgICAvLyB0aGUgYHNsdWdgIHBhcmFtZXRlciBpcyBhdmFpbGFibGUgYmVjYXVzZVxuICAgICAgICAvLyB0aGlzIGZpbGUgaXMgY2FsbGVkIFtzbHVnXS5zdmVsdGVcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5mZXRjaChgZG9jdW1lbnRhdGlvbi8ke3BhcmFtcy5zbHVnfS5qc29uYClcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcblxuICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBwb3N0OiBkYXRhIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IocmVzLnN0YXR1cywgZGF0YS5tZXNzYWdlKVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcbiAgICBvbk1vdW50KGFzeW5jICgpID0+IHtcbiAgICAgICAgO1suLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiI1wiXScpXS5tYXAoXG4gICAgICAgICAgICB4ID0+ICh4LmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbiArIG5ldyBVUkwoeC5ocmVmKS5oYXNoKVxuICAgICAgICApXG4gICAgfSlcbiAgICBleHBvcnQgbGV0IHBvc3Rcbjwvc2NyaXB0PlxuXG48c3ZlbHRlOmhlYWQ+XG4gICAgPHRpdGxlPntwb3N0LnRpdHJlfTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48aDE+e3Bvc3QudGl0cmV9PC9oMT5cblxuPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICB7QGh0bWwgcG9zdC5odG1sfVxuPC9kaXY+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7eUJBaUVLLEdBQUksSUFBQyxLQUFLOzs7OzBCQUdKLEdBQUksSUFBQyxJQUFJOzJDQU5SLEdBQUksSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUVBQVYsR0FBSSxJQUFDLEtBQUs7Ozs7K0RBR2pCLEdBQUksSUFBQyxLQUFLO2lFQUdKLEdBQUksSUFBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBbkVNLE9BQU8sR0FBRyxNQUFNLEVBQUUsS0FBSzs7O09BR25DLEdBQUcsU0FBUyxJQUFJLENBQUMsS0FBSyxrQkFBa0IsTUFBTSxDQUFDLElBQUk7O09BQ25ELElBQUksU0FBUyxHQUFHLENBQUMsSUFBSTs7S0FFdkIsR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHO1dBQ1QsSUFBSSxFQUFFLElBQUk7O0VBRW5CLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTzs7Ozs7Q0FSM0MsT0FBTzs7TUFDRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWMsR0FBRyxHQUFHLENBQy9DLENBQUMsSUFBSyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSTs7O09BR3BELElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
