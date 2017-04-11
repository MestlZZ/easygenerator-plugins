let configs = {
    vars: {}
}

class Plugin {
    static load(colors, fonts) {
        clearLocalStorage();

        for( var i = 0; i < colors.length; i++ ) {
            if (!colors[i] || !colors[i].value) {
                return;
            }

            configs.vars[colors[i].key] = colors[i].value;
        }

        for( var i = 0; i < fonts.length; i++ ) {
            for( var prop in fonts[i] ) {
                if (prop === 'key' || prop === 'isGeneralSelected' || prop === 'isGeneralColorSelected' 
                || prop === 'place' || fonts[i][prop] == null) {
                    continue;
                }

                if (prop === 'size') {
                    configs.vars['@' + fonts[i].key + '-' + prop] = fonts[i][prop] + 'px';
                }else{
                    configs.vars['@' + fonts[i].key + '-' + prop] = fonts[i][prop];
                }
            }
        }

        return less.modifyVars(configs.vars);
    }
}

window.LessProcessor = Plugin;
export default Plugin;

function clearLocalStorage() {
    if (!window.localStorage || !less) {
        return;
    }

    var host = window.location.host;
    var protocol = window.location.protocol;
    var keyPrefix = protocol + '//' + host + '/css/colors.less';

    for(var key in window.localStorage) {
        if (!window.localStorage.hasOwnProperty(key)) {
            continue;
        }

        if (key.indexOf(keyPrefix) === 0) {
            delete window.localStorage[key];
        }
    }
}