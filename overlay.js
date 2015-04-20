/*
 * Created by Martin Giger
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.
 */

function Overlay(el) {
        this._overlay = el;
        this.hide = this.hide.bind(this);
        this._prevent = this._prevent.bind(this);
        this._overlay.addEventListener("click", this.hide, false);
        this.getDialog().addEventListener("click", this._prevent, true);
        this._overlay.classList.add("so-backdrop");
}

Overlay.prototype = {
    _overlay: "",
    getMain: function() {
        var main = document.getElementsByTagName("MAIN");
        if(main.length == 0) {
            main = document.querySelector("[role='main']");
        }
        else {
            main = main[0];
        }
        return main;
    },
    getDialog: function() {
        var dialog = this._overlay.getElementsByTagName("DIALOG");
        if(dialog.length == 0) {
            dialog = this._overlay.querySelector("[role='dialog']");
        }
        else {
            dialog = dialog[0];
        }
        return dialog;
    },
    show: function() {
        this._overlay.removeAttribute("hidden");
        this.getMain().setAttribute("aria-hidden", true);
        this.getDialog().focus();
    },
    hide: function() {
        this._overlay.setAttribute("hidden", true);
        this.getMain().setAttribute("aria-hidden", false);
        this.getMain().focus();
    },
    _prevent: function(e) {
        if("stopPropagation" in e)
            e.stopPropagation();
        else
            e.preventBubble();
    }
};
