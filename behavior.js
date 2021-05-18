document.addEventListener("DOMContentLoaded", function(event) {

    var thumbnailElement = document.getElementById("smart_thumbnail");
    if(thumbnailElement)
    {
        thumbnailElement.addEventListener("click", function() {
            //if image is small
            if (thumbnailElement.className == "small")
            {
                thumbnailElement.className = "";
            }else
            {
                thumbnailElement.className = "small";
            }
            
        });
    }

    // Animate text
    var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
    };

    window.onload = function() {
    var elements = document.getElementsByClassName('special-text');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    
    };

    //  Website themes
    if(sessionStorage.getItem("theme") == null)
    {
        sessionStorage.setItem("theme", "light");
    }

    let themeBtn = document.querySelector('.theme-setting');

    themeBtn.addEventListener('click', function(event)
    {
        if(sessionStorage.getItem("theme") == "light")
        {
            sessionStorage.clear();
            sessionStorage.setItem("theme", "dark");
            checkTheme();
        }else
        {
            sessionStorage.clear();
            window.sessionStorage.setItem("theme", "light");
            checkTheme();
        }


    });

    function checkTheme()
    {
        let themeBtn = document.querySelector('.theme-setting');
        let theme = sessionStorage.getItem("theme");
        let body = document.querySelector('body');
        let footer = document.querySelector('footer');
        if(theme == "light")
        {
            body.className = "";
            footer.className = "";
            themeBtn.innerText = "Switch To Dark Theme";

        }else
        {
            body.className = "dark-theme";
            footer.className = "dark-theme";
            themeBtn.innerText = "Switch To Light Theme";
        }
    }

    checkTheme();
    
   
});