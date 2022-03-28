# HTML Table Filter!!

Use this repository as cdn

```html
<script src="https://cdn.jsdelivr.net/gh/shashfrankenstien/lib-tablefilterjs/lib-tablefilter.js"></script>
<script src="https://cdn.jsdelivr.net/gh/shashfrankenstien/lib-tablefilterjs@v0.0.1/lib-tablefilter.js"></script>
```

Try the minified version
```html
<script src="https://cdn.jsdelivr.net/gh/shashfrankenstien/lib-tablefilterjs/lib-tablefilter.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/shashfrankenstien/lib-tablefilterjs@v0.0.1/lib-tablefilter.min.js"></script>
```

# Usage

```html
<div id="table-container">
    <h2>HTML Table Filter</h2>
    <h4>Table example from w3schools.com</h4>

    <input type="text" placeholder="filter">

    <span id="filter-status"></span>

    <table>
        ...
    </table>
</div>

</body>

<script src="lib-tablefilter.js" ></script>

<script>
    const table = document.querySelector("#table-container table")
    const filter = document.querySelector("#table-container input")
    const filter_status = document.querySelector("#filter-status")
    const tf = new TableFilter(table, filter, filter_status) // filter_status is optional
</script>

```

# Example

[lib-tablefilterjs](https://shashfrankenstien.github.io/lib-tablefilterjs/)
