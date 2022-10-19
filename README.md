# HTML Table Filter!!

Use this repository as cdn

```html
<script src="https://cdn.jsdelivr.net/gh/shashfrankenstien/lib-tablefilterjs/lib-tablefilter.js"></script>
```
```html
<script src="https://cdn.jsdelivr.net/gh/shashfrankenstien/lib-tablefilterjs@v0.0.3/lib-tablefilter.js"></script>
```

Try the minified version
```html
<script src="https://cdn.jsdelivr.net/gh/shashfrankenstien/lib-tablefilterjs/lib-tablefilter.min.js"></script>
```
```html
<script src="https://cdn.jsdelivr.net/gh/shashfrankenstien/lib-tablefilterjs@v0.0.3/lib-tablefilter.min.js"></script>
```

# Usage

```html
<div id="table-container">
    <h2>HTML Table Filter</h2>

    <input type="text" placeholder="filter">

    <span></span>

    <table>
        ...
    </table>
</div>

</body>

<script src="lib-tablefilter.js" ></script>

<script>
    const table = document.querySelector("#table-container table")
    const filter = document.querySelector("#table-container input")
    const filter_status = document.querySelector("#table-container span")
    options = {
        persist: true,      // 'true' is the default
        focus: true         // 'true' is the default
    }
    const tf = new TableFilter(table, filter, filter_status, options) // filter_status and options are optional
</script>

```

# Example

[lib-tablefilterjs](https://shashfrankenstien.github.io/lib-tablefilterjs/)
