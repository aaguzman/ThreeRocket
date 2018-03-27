class Menu {
    constructor(){
        this.html = document.createElement('div');
        this.html.className = 'menu';
        document.getElementById('Menus').appendChild(this.html);
    }

    setHtml(html){
        this.html.innerHTML = html;
    }
    getHtml(){
        return this.html.innerHTML;
    }
}

export default Menu;