import { LightningElement, api } from 'lwc';

export default class FileDownload extends LightningElement {
    @api
    content;

    @api
    type;

    @api
    filename;

    //----------------------------
    // handlers
    //----------------------------

    onBtnClckDownload() {
        this.doDownload();
    }

    //----------------------------
    // Actions
    //----------------------------

    doDownload() {
        //Create Blob
        const blob = new Blob(this.content, { type: this.type });

        // Create download URL for blob
        const url = window.URL.createObjectURL(blob);

        //generate anchor for blob-url
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = this.filename;

        anchor.click();

        // cleanup
        anchor.remove();
        document.addEventListener('focus', () => {
            window.URL.revokeObjectURL(blob);
        });
    }
}
