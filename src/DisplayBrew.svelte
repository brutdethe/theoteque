<style>
    .tea-search {
        text-align: left;
        width: 80%;
        margin: 4em auto;
    }

    .times {
        font-style: italic;
    }

    ul {
        position: absolute;
        z-index: -1;
        top: 350px;
        left: 41.6%;
        width: 50%;
        box-shadow: 1px 1px 1px 1px #ccc;
        width: 280px;
        background: rgb(243, 248, 234);
        margin: 1em auto;
        text-align: left;
        list-style: none;
    }

    li {
        padding: 1em;
    }

    img {
        margin: 0.5em;
        vertical-align: middle;
        display: inline-block;
    }
</style>

<script>
    export let teaSelected

    const display = {
        temperature: temperature => {
            return `${temperature.join('° à ')} °`
        }
    }
</script>

<ul>
    <li>
        <img
            src="assets/temperature.svg"
            alt="température"
            title="température"
            width="30px"
        />
        {display.temperature(teaSelected.temperature)}
    </li>
    <li>
        <img src="assets/temps.svg" alt="durée" title="durée" width="30px" />
        {teaSelected.duration} sec
    </li>
    <li>
        <img
            src="assets/{teaSelected.method}.svg"
            alt="{teaSelected.method}"
            width="50px"
            title="{teaSelected.method}"
        />
        ratio : {teaSelected.quantity}
    </li>
    <li class="times">infuser {teaSelected.times}</li>
</ul>
