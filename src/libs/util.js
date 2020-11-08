let util = {
    
};
util.title = function (title) {
    title = title ?'BED - ' + title  : 'BED';
    window.document.title = title;
};

export default util;
