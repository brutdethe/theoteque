import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, o as globals, p as onMount, v as validate_slots, e as element, f as claim_element, g as children, b as detach_dev, r as set_style, j as attr_dev, k as add_location, l as insert_dev, n as noop } from './client.e045b614.js';

/* src/components/IconTeaType.svelte generated by Svelte v3.21.0 */

const { Error: Error_1 } = globals;
const file = "src/components/IconTeaType.svelte";

function create_fragment(ctx) {
	let div;

	const block = {
		c: function create() {
			div = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { style: true, class: true });
			children(div).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_style(div, "background", getColor(/*type*/ ctx[0], /*types*/ ctx[1]));
			attr_dev(div, "class", "svelte-lmn4a6");
			add_location(div, file, 38, 0, 920);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*type, types*/ 3) {
				set_style(div, "background", getColor(/*type*/ ctx[0], /*types*/ ctx[1]));
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
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

function getColor(typeParam, types) {
	const typeFind = types.filter(type => type.ideogram === typeParam)[0] || {};
	return "color" in typeFind ? typeFind.color : "white";
}

function instance($$self, $$props, $$invalidate) {
	let { type } = $$props;
	let types = [];

	onMount(async () => {
		const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/type`);

		if (res.ok) {
			$$invalidate(1, types = (await res.json()).api);
		} else {
			// 404
			throw new Error(text);
		}
	});

	const writable_props = ["type"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<IconTeaType> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("IconTeaType", $$slots, []);

	$$self.$set = $$props => {
		if ("type" in $$props) $$invalidate(0, type = $$props.type);
	};

	$$self.$capture_state = () => ({ onMount, type, types, getColor });

	$$self.$inject_state = $$props => {
		if ("type" in $$props) $$invalidate(0, type = $$props.type);
		if ("types" in $$props) $$invalidate(1, types = $$props.types);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [type, types];
}

class IconTeaType extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { type: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "IconTeaType",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*type*/ ctx[0] === undefined && !("type" in props)) {
			console.warn("<IconTeaType> was created without expected prop 'type'");
		}
	}

	get type() {
		throw new Error_1("<IconTeaType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error_1("<IconTeaType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { IconTeaType as I };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvblRlYVR5cGUuNTA2MGEyYWYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0ljb25UZWFUeXBlLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c3R5bGU+XG4gICAgZGl2IHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgd2lkdGg6IDJlbTtcbiAgICAgICAgaGVpZ2h0OiAyZW07XG4gICAgICAgIG1hcmdpbjogMCAwLjVlbTtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiA2cHggN3B4IDVweCAwcHggcmdiYSgxNTYsIDE1NCwgMTU2LCAxKTtcbiAgICAgICAgLW1vei1ib3gtc2hhZG93OiA2cHggN3B4IDVweCAwcHggcmdiYSgxNTYsIDE1NCwgMTU2LCAxKTtcbiAgICAgICAgYm94LXNoYWRvdzogNnB4IDdweCA1cHggMHB4IHJnYmEoMTU2LCAxNTQsIDE1NiwgMSk7XG4gICAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJ1xuXG4gICAgZXhwb3J0IGxldCB0eXBlXG5cbiAgICBsZXQgdHlwZXMgPSBbXVxuXG4gICAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS10ZWEub2lzaWZsb3J1cy5jb20vYXBpL3YxL3R5cGVgKVxuXG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgIHR5cGVzID0gKGF3YWl0IHJlcy5qc29uKCkpLmFwaVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gNDA0XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGV4dClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBnZXRDb2xvcih0eXBlUGFyYW0sIHR5cGVzKSB7XG4gICAgICAgIGNvbnN0IHR5cGVGaW5kID1cbiAgICAgICAgICAgIHR5cGVzLmZpbHRlcih0eXBlID0+IHR5cGUuaWRlb2dyYW0gPT09IHR5cGVQYXJhbSlbMF0gfHwge31cbiAgICAgICAgcmV0dXJuICdjb2xvcicgaW4gdHlwZUZpbmQgPyB0eXBlRmluZC5jb2xvciA6ICd3aGl0ZSdcbiAgICB9XG48L3NjcmlwdD5cblxuPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6IHtnZXRDb2xvcih0eXBlLCB0eXBlcyl9XCI+PC9kaXY+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQXNDeUIsUUFBUSxVQUFDLEdBQUksZUFBRSxHQUFLOzs7Ozs7Ozs7aUNBQXBCLFFBQVEsVUFBQyxHQUFJLGVBQUUsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBcEJoQyxRQUFRLENBQUMsU0FBUyxFQUFFLEtBQUs7T0FDeEIsUUFBUSxHQUNWLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDaEQsT0FBTyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLE9BQU87Ozs7T0FsQjlDLElBQUk7S0FFWCxLQUFLOztDQUVULE9BQU87UUFDRyxHQUFHLFNBQVMsS0FBSzs7TUFFbkIsR0FBRyxDQUFDLEVBQUU7bUJBQ04sS0FBSyxVQUFVLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRzs7O2FBR3BCLEtBQUssQ0FBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
