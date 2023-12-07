let mic = {
    boot(){
        let css = 'ul.genericmilk-mic {position: absolute;padding: 0;background: white;box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08);border-radius: 10px;margin: 0;list-style: none;opacity: 1;margin-top: 0px;transition: opacity .1s ease-in-out, margin-top .1s ease-in-out;outline: none;white-space: nowrap;} ';
        css += 'ul.genericmilk-mic li {min-width: 200px;} ';
        css += 'ul.genericmilk-mic li a {cursor: pointer;display: block;padding: 10px;font-family:Helvetica;} ';
        css += 'ul.genericmilk-mic li a:hover {background-color: #307ed1;color: white;} ';
        css += 'ul.genericmilk-mic li:first-child a {border-top-left-radius: 10px;border-top-right-radius: 10px;} ';
        css += 'ul.genericmilk-mic li:last-child a {border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;} ';
        css += 'ul.genericmilk-mic li.red a {color: red;} ';
        css += 'ul.genericmilk-mic li.red a:hover {background-color: red;color: white;} ';
        css += 'ul.genericmilk-mic:empty {opacity: 0;margin-top: 10px;}';
        
        var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);

        // create an empty ul.mic-ele in the body (no jquery)
        let pullDown = document.createElement('ul');
        pullDown.classList.add('genericmilk-mic');
        pullDown.setAttribute('tabindex', '-1');
    
        document.body.appendChild(pullDown);

        document.querySelector('ul.genericmilk-mic').addEventListener('blur', function(e) {
            let pullDown = document.querySelector('ul.genericmilk-mic');
            pullDown.innerHTML = '';
        });

    },
    drop(e,pkg){

        let pullDown = document.querySelector('ul.genericmilk-mic');
        let items = pullDown.querySelectorAll('li');

        items.forEach((item) => {
            item.removeEventListener('click', item.onclick);
        });

        pullDown.innerHTML = '';
        
        pkg.forEach((value) => {            
            let className = value.class ? value.class : '';
            
            let item = document.createElement('li');
            
            // if value.class is not defined, skip this
            if (className) {
                item.classList.add(className);
            }

            item.setAttribute('data-rand', Math.random() * 1000);
            item.innerHTML = '<a>' + value.name + '</a>';

            item.onclick = (function(val) {
                return function(e) {
                    e.stopPropagation();
                    val.run();
                    pullDown.blur();
                };
            })(value);

            pullDown.appendChild(item);
        });

        let ele = e.target;

        let pos = ele.getBoundingClientRect();
        let x = pos.left;
        let y = pos.top + ele.offsetHeight;

        let sw = window.innerWidth;
        let sh = window.innerHeight;

        let pw = pullDown.offsetWidth;
        let ph = pullDown.offsetHeight;

        if (x + pw + (10 * 2) > sw) {
            x -= pw;
        }

        if (y + ph + (10 * 2) > sh) {
            y -= ph;
        }

        pullDown.style.top = y + 'px';
        pullDown.style.left = x + 'px';

        // focus the pull down
        pullDown.focus();
    }
};
mic.boot();