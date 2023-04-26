(function($) {
    function fixParagraphs(html) {
        html = html.replaceAll(/<\/p><p>/ig, '<br>');
        html = html.replaceAll(/<p>/ig, '');
        html = html.replaceAll(/<\/p>/ig, '');

        return html;
    }

    const observer = new MutationObserver(function(mutations) {
        $('.trp-textarea:not([readonly])').each(function() {
            const element = $(this);
            if (element.data('done')) {
                return;
            }
            element.data('done', true);

            const original = $('.trp-textarea:is([readonly])').val();
            if (!original.includes('<') && !original.includes('>')) {
                return;
            }

            const textarea = $('<textarea></textarea>');
            textarea.val(element.val());
            element.hide();
            element.after(textarea);

            let wait = null;
            const editor = textarea.trumbowyg({
                semantic: {
                    'b': 'strong',
                    'i': 'em',
                    's': 'del',
                    'strike': 'del',
                    'div': 'p'
                },
                btns: [['undo', 'redo'],['strong', 'em', 'underline', 'del'],['superscript', 'subscript', 'viewHTML']],
                tagsToRemove: ['script', 'link'],
                removeformatPasted: true,
                autogrow: true
            }).on('tbwchange', function() {
                if (wait) {
                    clearTimeout(wait);
                }
                wait = setTimeout(function() {
                    editor.trumbowyg('saveRange');
                    element.val(fixParagraphs(textarea.val()));
                    element[0].dispatchEvent(new Event('input'));
                    setTimeout(function() {
                        editor.trumbowyg('restoreRange');
                    }, 5);
                }, 200);
            });
        })
    });

    observer.observe(
        document,
        {
            attributes: false,
            childList: true,
            characterData: false,
            subtree:true
        }
    );
})(jQuery);
