/*
*
MIT License

Copyright (c) 2021 Shashank Gopikrishna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**/


class TableFilter {
    constructor(tableElem, inputElem, counterDisplayElem, options) {
        this.tableElem = tableElem
        this.inputElem = inputElem
        this.counterDisplayElem = counterDisplayElem
        this.options = options || {}
        this.sessionStoreKey = `${window.encodeURIComponent(window.location.href)}.tf_filter_term`

        this.options.persist = this.options.persist !== false // means true by default
        if (this.options.persist) {
            const prev_filter = sessionStorage.getItem(this.sessionStoreKey)
            if (prev_filter)
                this.inputElem.value = prev_filter
        }

        this.inputElem.addEventListener("input", e=>this.filter())
        this.inputElem.addEventListener("keydown", e=>{
            if(e.key=='Escape'|| e.key=='Esc') {
                this.clear()
            }
        })

        this.options.focus = this.options.focus !== false // means true by default
        if (this.options.focus)
            this.inputElem.focus()

        this.orig_bg = this.inputElem.style.backgroundColor
        this.options.input_active_bg = this.options.input_active_bg || this.orig_bg
        this.filter()
    }

    _doesPassFilter(txt, fltr) {
        // if filter starts with "/", then do regex search
        // search term should also end with "/", followed by modifiers
        if (fltr[0]==='/') {
            try {
                let i = fltr.lastIndexOf('/')
                let re = new RegExp(fltr.slice(1, i), fltr.slice(i+1))
                let matched = txt.replace(/\n/g, "\t").match(re)
                return matched ? true : false
            } catch(error) {
                console.log(error)
                return false
            }
        }
        // else apply custom filters syntax. example -
        // "( X | Y ) & Z"
        // this return true if
        //  - X and Z in text OR
        //  - Y and Z in text
        let matches = fltr.matchAll(/(\([^\(]*?\))/g) // matches any embedded rules within parenthesis
        matches = Array.from(matches)
        if (matches.length > 0) {
            // console.log(`matchlen ${matches.length} - ${fltr}`)
            for (let m of matches) {
                let grp = m[1]
                let res = this._doesPassFilter(txt, grp.replace(/\(|\)/g, ''))
                fltr = fltr.replace(grp, res)
            }
        }

        if (fltr.includes("|")) {
            // console.log(`testing OR - ${fltr}`)
            let or_res = []
            for (let sub of fltr.split('|')) {
                let res = this._doesPassFilter(txt, sub)
                or_res.push(res)
            }
            return eval(or_res.join(" | ")) ? true : false
        }

        if (fltr.includes("&")) {
            // console.log(`testing AND - ${fltr}`)
            let and_res = []
            for (let sub of fltr.split('&')) {
                // console.log("sub", sub)
                let res = this._doesPassFilter(txt, sub)
                and_res.push(res)
            }
            return eval(and_res.join(" & ")) ? true : false
        }

        fltr = fltr.trim().toLowerCase()
        if (fltr==='true') return true
        if (fltr==='false') return false
        return txt.toLowerCase().includes(fltr) ? true : false
    }

    _hideRow(tr) {
        tr.style.display = 'none'
    }

    _showRow(tr) {
        tr.style.display = ''
    }

    filter(term) {
        let total = 0
        let visible = 0
        let filter_term = term
        if (filter_term) {
            this.inputElem.value = filter_term
        } else {
            filter_term = this.inputElem.value.trim()
        }
        if (this.options.persist) {
            sessionStorage.setItem(this.sessionStoreKey, filter_term)
        }
        // var t = document.getElementById("job-status-table")
        if (filter_term==="") {
            this.tableElem.querySelectorAll("tbody tr").forEach(tr=>{
                total++
                visible++
                this._showRow(tr)
            })
        } else {
            this.tableElem.querySelectorAll("tbody tr").forEach(tr=>{
                total++
                if (this._doesPassFilter(tr.innerText.trim(), filter_term.trim())) {
                    this._showRow(tr)
                    visible++
                } else {
                    this._hideRow(tr)
                }
            })
        }

        if (this.counterDisplayElem) {
            if (visible === total) {
                this.counterDisplayElem.innerText = `all ${total}`
                this.inputElem.style.backgroundColor = this.orig_bg
            }
            else {
                this.counterDisplayElem.innerText = `${visible} / ${total}`
                this.inputElem.style.backgroundColor = this.options.input_active_bg
            }
        }
    }

    clear() {
        this.inputElem.value = ""
        this.filter()
    }
}
