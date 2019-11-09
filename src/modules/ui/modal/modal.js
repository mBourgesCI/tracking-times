import { LightningElement, track, api } from 'lwc';

export default class Entry extends LightningElement {
    @api
    show() {
        this.showModal();
    }

    @track
    label = {
        title: 'Head',
        button: {
            cancel: 'Close'
        }
    };

    //----------------------
    // Event handler
    //----------------------

    handleButtonClickCancel() {
        this.hideModal();
        this.fireEventCancel();
    }

    //----------------------
    // Busines logig
    //----------------------

    fireEventCancel() {
        var evt;
        evt = new CustomEvent('cancel');
        this.dispatchEvent(evt);
    }

    hideModal() {
        var modalElem;
        modalElem = this.getModalContainer();
        this.setElemDisplay(modalElem, 'none');
    }

    showModal() {
        var modalElem;
        modalElem = this.getModalContainer();
        this.setElemDisplay(modalElem, 'block');
    }

    setElemDisplay(elem, displayValue) {
        elem.style.display = displayValue;
    }

    //----------------------
    // Element getter
    //----------------------

    getModalContainer() {
        return this.template.querySelector('div.modal');
    }
}
