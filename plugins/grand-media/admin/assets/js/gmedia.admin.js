/**
 * Gmedia Library
 */
var GmediaLibrary = {
    init: function () {
        jQuery('#gm-selected').on('change', function() {
            var val = jQuery(this).val();
            jQuery('.edit-mode-link').each(function() {
                if(val) {
                    jQuery(this).attr('href', jQuery(this).data('href_sel'));
                } else {
                    jQuery(this).attr('href', jQuery(this).data('href'));
                }
            });
        }).trigger('change');

        if(typeof jQuery.fn.datetimepicker === 'function') {
            GmediaLibrary.editmode();
        }

    },
    /**
     * Edit Mode
     */
    editmode: function() {
        // SelectBox for albums
        var combobox_albums = jQuery('.combobox_gmedia_album');
        combobox_albums.selectize({
            create: (combobox_albums.data('create')? true : false),
            persist: false
        });

        if(window.gmedia_categories) {
            var categories = jQuery('.combobox_gmedia_category');
            if(categories.length) {
                var categories_data = window.gmedia_categories.map(function(x) {
                    return {item: x};
                });

                categories.selectize({
                    create: function(input) {
                        if(categories.data('create')) {
                            return {
                                item: input
                            }
                        } else {
                            return false;
                        }
                    },
                    createOnBlur: true,
                    delimiter: ',',
                    maxItems: null,
                    openOnFocus: false,
                    persist: false,
                    options: categories_data,
                    labelField: 'item',
                    valueField: 'item',
                    searchField: ['item'],
                    hideSelected: true
                });
            }
        }

        // Date/Time picker
        var gmedia_date_temp;
        jQuery('.input-group.gmedia_date').datetimepicker({useSeconds: true}).on('dp.show', function() {
            gmedia_date_temp = jQuery('input', this).val();
        }).on('dp.hide', function() {
            if(gmedia_date_temp != jQuery('input', this).val()) {
                jQuery('input', this).trigger('change');
            }
        });

        // Mask for filename input
        var inp_filename = jQuery('input.gmedia-filename').not('[readonly]');
        if(inp_filename.length) {
            inp_filename.alphanum({
                allow: '-_',
                disallow: '',
                allowSpace: false,
                allowNumeric: true,
                allowUpper: true,
                allowLower: true,
                allowCaseless: true,
                allowLatin: true,
                allowOtherCharSets: false,
                forceUpper: false,
                forceLower: false,
                maxLength: NaN
            });
        }

    }
};

/**
 * Gmedia AddMedia
 */
var GmediaAddMedia = {
    init: function () {

        jQuery('#uploader_runtime select').change(function () {
            if ('html4' == jQuery(this).val()) {
                jQuery('#uploader_chunking').addClass('hide');
                jQuery('#uploader_urlstream_upload').addClass('hide');
            } else {
                jQuery('#uploader_chunking').removeClass('hide');
                jQuery('#uploader_urlstream_upload').removeClass('hide');
            }
        });

        var albums = jQuery('select#combobox_gmedia_album');
        if(albums.length) {
            var albums_data = jQuery('option', albums);
            albums.selectize({
                create: function(input) {
                    if(albums.data('create')) {
                        return {
                            value: input,
                            text: input
                        }
                    } else {
                        return false;
                    }
                },
                createOnBlur: true,
                persist: false,
                render: {
                    item: function(item, escape) {
                        if(0 === (parseInt(item.value, 10) || 0)) {
                            return '<div>' + escape(item.text) + '</div>';
                        }
                        if(item.$order) {
                            var data = jQuery(albums_data[item.$order]).data();
                            return '<div>' + escape(data.name) + ' <small>' + escape(data.meta) + '</small></div>';
                        }
                    },
                    option: function(item, escape) {
                        if(0 === (parseInt(item.value) || 0)) {
                            return '<div>' + escape(item.text) + '</div>';
                        }
                        if(item.$order) {
                            var data = jQuery(albums_data[item.$order]).data();
                            return '<div>' + escape(data.name) + ' <small>' + escape(data.meta) + '</small></div>';
                        }
                    }
                }
            });
        }

        if(window.gmedia_tags) {
            var tags = jQuery('#combobox_gmedia_tag');
            if(tags.length) {
                var tags_data = window.gmedia_tags.map(function(x) {
                    return {item: x};
                });

                tags.selectize({
                    create: function(input) {
                        if(tags.data('create')) {
                            return {
                                item: input
                            }
                        } else {
                            return false;
                        }
                    },
                    createOnBlur: true,
                    delimiter: ',',
                    maxItems: null,
                    openOnFocus: false,
                    persist: false,
                    options: tags_data,
                    labelField: 'item',
                    valueField: 'item',
                    searchField: ['item'],
                    hideSelected: true
                });
            }
        }
        if(window.gmedia_categories) {
            var categories = jQuery('#combobox_gmedia_category');
            if(categories.length) {
                var categories_data = window.gmedia_categories.map(function(x) {
                    return {item: x};
                });

                categories.selectize({
                    create: function(input) {
                        if(categories.data('create')) {
                            return {
                                item: input
                            }
                        } else {
                            return false;
                        }
                    },
                    createOnBlur: true,
                    delimiter: ',',
                    maxItems: null,
                    openOnFocus: false,
                    persist: false,
                    options: categories_data,
                    labelField: 'item',
                    valueField: 'item',
                    searchField: ['item'],
                    hideSelected: true
                });
            }
        }


    },
    /**
     * Gmedia Import
     */
    importmode: function() {
    }
};

/**
 * Gmedia Terms
 */
var GmediaTerms = {
    init: function () {

        jQuery('#gm-list-table').data('edit', false);
        jQuery('input.edit_tag_input').keypress(function(e) {
            var tagdiv = jQuery('#tag_' + jQuery(this).data('tag_id'));
            var charCode = e.charCode || e.keyCode || e.which;
            if(charCode == 13) {
                e.preventDefault();
                edit_tag(tagdiv);
            }
        }).blur(function() {
            var tagdiv = jQuery('#tag_' + jQuery(this).data('tag_id'));
            edit_tag(tagdiv);
        });

        jQuery('.edit_tag_link').click(function(e) {
            e.preventDefault();
            var id = jQuery(this).attr('href');
            jQuery(this).hide();
            jQuery(id).find('.edit_tag_form').show().find('input').focus();
            jQuery('#gm-list-table').data('edit', true);
        });
        jQuery('.edit_tag_save').click(function(e) {
            e.preventDefault();
        });

        var input = jQuery('.term-shortcode input');
        input.on('click', function(){
            this.setSelectionRange(0, 0);
            this.setSelectionRange(0, this.value.length);
        });
        input.on('change', function(){
            shortcode_inp_autowidth(this);
        });
        jQuery.each(input, function(i, e){
            shortcode_inp_autowidth(this)
        });
        function shortcode_inp_autowidth(e) {
            var inp = jQuery(e),
                buffer = inp.next('.input-buffer');
            buffer.text(inp.val());
            inp.width(buffer.width());
        }

        function edit_tag(tagdiv) {
            var inp = tagdiv.find('.edit_tag_form input');
            var new_tag_name = jQuery.trim(inp.val());
            var old_tag_name = inp.attr('placeholder');
            if((old_tag_name == new_tag_name) || ('' === new_tag_name) || jQuery.isNumeric()) {
                inp.val(old_tag_name);
                tagdiv.find('.edit_tag_form').hide();
                tagdiv.find('.edit_tag_link').show();
                return;
            }
            var post_data = {
                action: 'gmedia_tag_edit',
                tag_id: inp.data('tag_id'),
                tag_name: new_tag_name,
                _wpnonce: jQuery('#_wpnonce').val()
            };
            jQuery.post(ajaxurl, post_data, function(data, textStatus, jqXHR) {
                console.log(data);
                if(data.error) {
                    //inp.val(inp.attr('placeholder'));
                    jQuery('#gmedia-panel').before(data.error);
                } else {
                    //new_tag_name = new_tag_name.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    inp.attr('placeholder', new_tag_name);
                    tagdiv.find('.edit_tag_link').text(new_tag_name).show();
                    //noinspection JSUnresolvedVariable
                    jQuery('#gmedia-panel').before(data.msg);
                    tagdiv.find('.edit_tag_form').hide();
                }
            });
        }

    }
};

var GmediaSelect = {
    msg_stack: function(global) {
        var gm_cb = jQuery('.gm-stack input');
        var sel = jQuery('#gm-stack');
        if(!sel.length) {
            return;
        }

        var arr = sel.val().split(',');
        arr = jQuery.grep(arr, function(e) {
            return (e);
        });

        if(global) {
            var cur = false;
            gm_cb.each(function() {
                cur = jQuery(this);
                if(cur.is(':checked') && (jQuery.inArray(cur.val(), arr) === -1)) {
                    cur.prop('checked', false);
                } else if(!(cur.is(':checked')) && (jQuery.inArray(cur.val(), arr) !== -1)) {
                    cur.prop('checked', true);
                }
            });
        }

        if(sel.data('userid')) {
            var storedData = getStorage('gmuser_' + sel.data('userid') + '_');
            storedData.set(sel.data('key'), arr);
        }
        jQuery('#gm-stack-qty').text(arr.length);
        if(arr.length) {
            jQuery('#gm-stack-btn').removeClass('hidden');
            jQuery('.rel-stack-show').show();
            jQuery('.rel-stack-hide').hide();
        }
        else {
            jQuery('#gm-stack-btn').addClass('hidden');
            jQuery('.rel-stack-show').hide();
            jQuery('.rel-stack-hide').show();
        }
        sel.trigger('change');
    },
    msg_selected: function(obj, global) {
        var gm_cb = jQuery('.' + obj + ' input'),
            qty_v = gm_cb.length,
            sel_v = gm_cb.filter(':checked').length,
            c = jQuery('#cb_global');
        if((sel_v != qty_v) && (0 !== sel_v)) {
            c.css('opacity', '0.5').prop('checked', true);
        } else if((sel_v == qty_v) && (0 !== qty_v)) {
            c.css('opacity', '1').prop('checked', true);
        } else if(0 === sel_v) {
            c.css('opacity', '1').prop('checked', false);
        }

        var sel = jQuery('#gm-selected');
        if(!sel.length) {
            return;
        }

        var arr = sel.val().split(',');

        arr = jQuery.grep(arr, function(e) {
            return (e);
        });
        if(global) {
            var cur = false;
            gm_cb.each(function() {
                cur = jQuery(this);
                if(cur.is(':checked') && (jQuery.inArray(cur.val(), arr) === -1)) {
                    arr.push(cur.val());
                } else if(!(cur.is(':checked')) && (jQuery.inArray(cur.val(), arr) !== -1)) {
                    arr = jQuery.grep(arr, function(e) {
                        return e != cur.val();
                    });
                }
            });
            sel.val(arr.join(','));
        }

        if(sel.data('userid')) {
            var storedData = getStorage('gmuser_' + sel.data('userid') + '_');
            storedData.set(sel.data('key'), arr);
        }
        jQuery('#gm-selected-qty').text(arr.length);
        if(arr.length) {
            jQuery('#gm-selected-btn').removeClass('hidden');
            jQuery('.rel-selected-show').show();
            jQuery('.rel-selected-hide').hide();
        }
        else {
            jQuery('#gm-selected-btn').addClass('hidden');
            jQuery('.rel-selected-show').hide();
            jQuery('.rel-selected-hide').show();
        }
        sel.trigger('change');
    },
    chk_all: function(type, obj) {
        jQuery('.' + obj + ' input').filter(function() {
            return type? jQuery(this).data('type') == type : true;
        }).prop('checked', true).closest('.cb_list-item').addClass('gm-selected');
    },
    chk_none: function(type, obj) {
        jQuery('.' + obj + ' input').filter(function() {
            return type? jQuery(this).data('type') == type : true;
        }).prop('checked', false).closest('.cb_list-item').removeClass('gm-selected');
    },
    chk_toggle: function(type, obj) {
        if(type) {
            if(jQuery('.' + obj + ' input:checked').filter(function() {
                    return jQuery(this).data('type') == type;
                }).length) {
                GmediaSelect.chk_none(type, obj);
            } else {
                GmediaSelect.chk_all(type, obj);
            }
        } else {
            jQuery('.' + obj + ' input').each(function() {
                jQuery(this).prop("checked", !jQuery(this).prop("checked")).closest('.cb_list-item').toggleClass('gm-selected');
            });
        }
    },
    init: function () {
        var cb_global = jQuery('#cb_global'),
            cb_obj = cb_global.data('group');

        if (jQuery('#gm-selected').length) {
            GmediaSelect.msg_selected(cb_obj);
            jQuery('#gm-selected-clear').click(function (e) {
                jQuery('#gm-selected').val('');
                GmediaSelect.chk_none(false, cb_obj);
                GmediaSelect.msg_selected(cb_obj);
                e.preventDefault();
            });
            jQuery('#gm-selected-show').click(function (e) {
                jQuery('#gm-selected-btn').submit();
                e.preventDefault();
            });
            jQuery('#gm-stack-in').click(function (e) {
                e.preventDefault();
                var stack_obj = jQuery('#gm-stack'),
                    sel_obj = jQuery('#gm-selected'),
                    stack = stack_obj.val().split(','),
                    selected = sel_obj.val().split(','),
                    arr = stack.concat(selected);
                arr = jQuery.grep(arr, function(e) {
                    return (e);
                });
                arr = jQuery.unique(arr);
                stack_obj.val(arr.join(','));
                GmediaSelect.msg_stack(true);
                //sel_obj.val('');
                //GmediaSelect.chk_none(false, cb_obj);
                //GmediaSelect.msg_selected(cb_obj);
            });
            jQuery('#gm-stack-out').click(function (e) {
                e.preventDefault();
                var stack_obj = jQuery('#gm-stack'),
                    sel_obj = jQuery('#gm-selected'),
                    stack = stack_obj.val().split(','),
                    selected = sel_obj.val().split(','),
                    arr = jQuery(stack).not(selected).get();
                arr = jQuery.grep(arr, function(e) {
                    return (e);
                });
                arr = jQuery.unique(arr);
                stack_obj.val(arr.join(','));
                GmediaSelect.msg_stack(true);
                //sel_obj.val('');
                //GmediaSelect.chk_none(false, cb_obj);
                //GmediaSelect.msg_selected(cb_obj);
            });
        }
        cb_global.click(function () {
            if (jQuery(this).is(':checked')) {
                GmediaSelect.chk_all(false, cb_obj);
            } else {
                GmediaSelect.chk_none(false, cb_obj);
            }
            GmediaSelect.msg_selected(cb_obj, true);
        });
        jQuery('#cb_global-btn li a').click(function (e) {
            var sel = jQuery(this).data('select');
            switch (sel) {
                case 'total':
                    GmediaSelect.chk_all(false, cb_obj);
                    break;
                case 'none':
                    GmediaSelect.chk_none(false, cb_obj);
                    break;
                case 'reverse':
                    GmediaSelect.chk_toggle(false, cb_obj);
                    break;
                case 'image':
                case 'audio':
                case 'video':
                    GmediaSelect.chk_toggle(sel, cb_obj);
                    break;
            }
            GmediaSelect.msg_selected(cb_obj, true);
            e.preventDefault();
        });
        jQuery('.cb_media-object input:checkbox, .cb_term-object input:checkbox').change(function () {
            var selected = jQuery('#gm-selected'),
                arr = selected.val();
            var cur = jQuery(this).val();
            if (jQuery(this).is(':checked')) {
                if (arr) {
                    arr = arr + ',' + cur;
                } else {
                    arr = cur;
                }
            } else {
                arr = jQuery.grep(arr.split(','), function (a) {
                    return a != cur;
                }).join(',');
            }
            jQuery('#list-item-' + cur).toggleClass('gm-selected');
            selected.val(arr);
            GmediaSelect.msg_selected(cb_obj);
        });

        if (jQuery('#gm-stack').length) {
            GmediaSelect.msg_stack();
            jQuery('#gm-stack-clear').click(function (e) {
                jQuery('#gm-stack').val('');
                jQuery('.gm-stack input').prop('checked', false);
                GmediaSelect.msg_stack();
                e.preventDefault();
            });
            jQuery('#gm-stack-show').click(function (e) {
                jQuery('#gm-stack-btn').submit();
                e.preventDefault();
            });

        }
        jQuery('.gm-stack input:checkbox').change(function () {
            var selected = jQuery('#gm-stack'),
                arr = selected.val();
            var cur = jQuery(this).val();
            if (jQuery(this).is(':checked')) {
                if (arr) {
                    arr = arr + ',' + cur;
                } else {
                    arr = cur;
                }
            } else {
                arr = jQuery.grep(arr.split(','), function (a) {
                    return a != cur;
                }).join(',');
            }
            selected.val(arr);
            GmediaSelect.msg_stack();
        });

        jQuery('.term-label').click(function (e) {
            if ('DIV' == e.target.nodeName) {
                if (!jQuery('#gm-list-table').data('edit')) {
                    var cb = jQuery('input:checkbox', this);
                    cb.prop("checked", !cb.prop("checked")).change();
                    jQuery(this).closest('.term-list-item').toggleClass('gm-selected');
                } else {
                    jQuery('#gm-list-table').data('edit', false);
                }
            }
        });
    }
}

var GmediaFunction = {
    confirm: function (txt) {
        if (!txt) {
            return true;
        }
        var r = false;
        //noinspection UnusedCatchParameterJS
        try {
            r = confirm(txt);
        }
        catch (err) {
            alert('Disable Popup Blocker');
        }
        return r;
    },
    init: function () {
        jQuery('#toplevel_page_GrandMedia').addClass('current').removeClass('wp-not-current-submenu');
        if (!("ontouchstart" in document.documentElement)) {
            jQuery('html').addClass('no-touch');
        }

        /*
         jQuery(document).ajaxStart(function(){
         jQuery('body').addClass('gmedia-busy');
         }).ajaxStop(function(){
         jQuery('body').removeClass('gmedia-busy');
         });
         */

        jQuery('[data-confirm]').click(function () {
            return GmediaFunction.confirm(jQuery(this).data('confirm'));
        });

        jQuery('.show-settings-link').click(function (e) {
            e.preventDefault();
            jQuery('#show-settings-link').trigger('click');
        });

        jQuery('.fit-thumbs').click(function (e) {
            e.preventDefault();
            jQuery(this).toggleClass('btn-success btn-default');
            jQuery('.display-as-grid').toggleClass('invert-ratio');
            jQuery.get(jQuery(this).attr('href'), {ajaxload: 1});
        });

        jQuery('.gm-cell-more-btn, .gm-cell-title').click(function () {
            jQuery(this).parent().toggleClass('gm-cell-more-active');
        });

        jQuery('div.gmedia-modal').appendTo('body');
        jQuery('a.gmedia-modal').click(function (e) {
            jQuery('body').addClass('gmedia-busy');
            var modal_div = jQuery(jQuery(this).attr('href'));
            var post_data = {
                action: jQuery(this).data('action'), modal: jQuery(this).data('modal'), _wpnonce: jQuery('#_wpnonce').val()
            };
            jQuery.post(ajaxurl, post_data, function (data, textStatus, jqXHR) {
                if (!data || ('-1' == data)) {
                    jQuery('body').removeClass('gmedia-busy');
                    alert(data);
                    return false;
                }
                jQuery('.modal-dialog', modal_div).html(data);
                modal_div.modal({
                    backdrop: 'static',
                    show: true,
                    keyboard: false
                }).one('hidden.bs.modal', function () {
                    jQuery('.modal-dialog', this).empty();
                });
                jQuery('body').removeClass('gmedia-busy');
            });
            e.preventDefault();
        });

        jQuery('a.gmedit-modal').click(function (e) {
            e.preventDefault();
            var modal_div = jQuery(jQuery(this).data('target'));
            jQuery('.modal-content', modal_div).html(
                jQuery('<iframe />', {
                    name: 'gmeditFrame',
                    id: 'gmeditFrame',
                    width: '100%',
                    height: '500',
                    src: jQuery(this).attr('href')
                }).css({display: 'block', margin: '4px 0'})
            );
            modal_div.modal({
                backdrop: true,
                show: true,
                keyboard: false
            }).one('hidden.bs.modal', function () {
                jQuery('.modal-content', this).empty();
            });
        });

        jQuery('a.preview-modal').click(function (e) {
            e.preventDefault();
            var data = jQuery(this).data(),
                modal_div = jQuery(data['target']);
            jQuery('.modal-title', modal_div).text(jQuery(this).attr('title'));

            if (data['metainfo']) {
                jQuery('.modal-dialog', modal_div).addClass('modal-md');
                jQuery('.modal-body', modal_div).html(jQuery('#metainfo_' + data['metainfo']).html());
            } else {
                var r = data['width'] / data['height'],
                    w = Math.min(jQuery(window).width() * 0.98 - 32, data['width']),
                    h = w / r;
                jQuery('.modal-dialog', modal_div).css({'width': (data['width'] + 32), 'max-width': '98%'});
                jQuery('.modal-body', modal_div).html(
                    jQuery('<iframe />', {
                        name: 'previewFrame',
                        id: 'previewFrame',
                        width: '100%',
                        height: h,
                        src: jQuery(this).attr('href'),
                        load: function () {
                            jQuery(this.contentWindow.document.body).css('margin', 0);
                            jQuery('.modal-backdrop', modal_div).css({'width': (data['width'] + 32), 'min-width': '100%'});
                        }
                    }).css({display: 'block', margin: '4px 0'})
                );
            }

            modal_div.modal({
                backdrop: true,
                show: true
            }).one('hidden.bs.modal', function () {
                jQuery('.modal-title', this).empty();
                jQuery('.modal-body', this).empty();
                jQuery('.modal-dialog', this).removeAttr('style').attr('class', 'modal-dialog');
            });
        });

        jQuery('input.sharelink').on('click focus', function () {
            this.setSelectionRange(0, this.value.length);
        });
        jQuery('input.sharetoemail').on('keyup', function () {
            jQuery('.sharebutton').prop('disabled', !validateEmail(this.value));
        });
        jQuery('.sharebutton').on('click', function () {
            var sharetoemail = jQuery('input.sharetoemail');
            if (!validateEmail(sharetoemail.val())) {
                sharetoemail.focus();
                sharetoemail.parent().addClass('has-error');
                return false;
            }
            var post_data = jQuery('#shareForm').serialize();
            jQuery.post(ajaxurl, post_data, function (data, textStatus, jqXHR) {
                jQuery('body').removeClass('gmedia-busy');
                if (data) {
                    jQuery('#gm-message').append(data);
                }
            });
            jQuery('#shareModal').modal('hide');
        });
        jQuery('a.share-modal').click(function (e) {
            e.preventDefault();
            var data = jQuery(this).data(),
                modal_div = jQuery(data['target']),
                postlink = jQuery(this).attr('href'),
                cloudlink = jQuery(this).attr('data-gmediacloud'),
                sharetoemail = jQuery('input.sharetoemail'),
                cloudlink_checked = false;

            if(postlink) {
                jQuery('.sharelink_post', modal_div).show();
                jQuery('.sharelink_post input', modal_div).val(postlink);
                jQuery('.sharelink_post a', modal_div).attr('href', postlink);
            } else {
                jQuery('.sharelink_post', modal_div).hide();
                jQuery('.sharelink_post input[type="radio"]', modal_div).prop('checked', false);
                cloudlink_checked = true;
            }
            if(cloudlink) {
                jQuery('.sharelink_page', modal_div).show();
                jQuery('.sharelink_page input', modal_div).val(cloudlink);
                jQuery('.sharelink_page a', modal_div).attr('href', cloudlink);
                if(cloudlink_checked){
                    jQuery('.sharelink_page input[type="radio"]', modal_div).prop('checked', true);
                }
            } else {
                jQuery('.sharelink_page', modal_div).hide();
            }
            jQuery('.sharebutton').prop('disabled', !validateEmail(sharetoemail.val()));

            modal_div.modal({
                backdrop: true,
                show: true,
                keyboard: false
            }).one('shown.bs.modal', function () {
                jQuery('input.sharelink', this).focus();
            }).one('hidden.bs.modal', function () {
                jQuery('input.sharelink', this).val('');
            });
        });

        jQuery('.buildquery-modal').click(function (e) {
            e.preventDefault();
            var data = jQuery(this).data(),
                modal_div = jQuery(jQuery(this).attr('href')),
                query_field = jQuery(jQuery(this).attr('id') + '_field');
                query = query_field.val();

            modal_div.modal({
                backdrop: false,
                show: true,
                keyboard: false
            }).one('shown.bs.modal', function () {
                if(query){
                    query = gm_parse_query(query);
                    console.log(query);
                }
            }).one('hidden.bs.modal', function () {});
        });

        jQuery('.buildquerysubmit').on('click', function () {
            var qform = jQuery('#buildQuery :input').filter(function () {
                return !!jQuery(this).val();
            });

            var qform = decodeURIComponent(qform.serialize());
            console.log(qform);
            jQuery('#build_query_field').val(qform);
            jQuery('#buildQuery').modal('hide');
        });
        jQuery('a.newcustomfield-modal').click(function (e) {
            e.preventDefault();
            var data = jQuery(this).data(),
                modal_div = jQuery(jQuery(this).attr('href'));

            modal_div.modal({
                backdrop: false,
                show: true,
                keyboard: false
            }).one('shown.bs.modal', function () {
                jQuery('input.newcustomfield-for-id', this).val(data['gmid']);
            }).one('hidden.bs.modal', function () {
                jQuery(':input.form-control, input.newcustomfield-for-id', this).val('');
                if (jQuery('.newcfield', this).length) {
                    jQuery('a.gmediacustomstuff').click();
                }
            });
        });
        jQuery('.customfieldsubmit').on('click', function () {
            var cform = jQuery('#newCustomFieldForm');
            if (!jQuery('.newcustomfield-for-id', cform).val()) {
                jQuery('#newCustomFieldModal').modal('hide');
                alert('No ID');
                return false;
            }
            var post_data = cform.serialize();
            jQuery.post(ajaxurl, post_data, function (data, textStatus, jqXHR) {
                jQuery('body').removeClass('gmedia-busy');
                if (data.success) {
                    jQuery('#newCustomFieldModal').modal('hide').one('hidden.bs.modal', function () {
                        //noinspection JSUnresolvedVariable
                        if (data.newmeta_form) {
                            //noinspection JSUnresolvedVariable
                            jQuery('#newmeta').replaceWith(data.newmeta_form);
                        }
                    });
                    jQuery('.row:last', '#gmediacustomstuff_' + data.id).append(data.success.data);
                } else {
                    if (data.error) {
                        if ('100' == data.error.code) {
                            jQuery('#newCustomFieldModal').modal('hide');
                        }
                        alert(data.error.message);
                    } else {
                        console.log(data);
                    }
                }
            });
        });
        jQuery('.gmediacustomstuff').on('click', '.delete-custom-field', function () {
            var t = jQuery(this).closest('.form-group'),
                post_data = convertInputsToJSON(jQuery(':input', t));
            if (!post_data) {
                return false;
            }
            var meta_type = jQuery(this).closest('fieldset').attr('data-metatype');
            post_data.action = meta_type + '_delete_custom_field';
            post_data.ID = jQuery(this).closest('form').attr('data-id');
            post_data._customfield_nonce = jQuery('#_customfield_nonce').val();
            jQuery.post(ajaxurl, post_data, function (data, textStatus, jqXHR) {
                jQuery('body').removeClass('gmedia-busy');
                //noinspection JSUnresolvedVariable
                if (data.deleted) {
                    //noinspection JSUnresolvedVariable
                    jQuery.each(data.deleted, function (i, val) {
                        jQuery('.gm-custom-meta-' + val).remove();
                    });
                } else {
                    if (data.error) {
                        alert(data.error.message);
                    } else {
                        console.log(data);
                    }
                }
            });
        });


        jQuery('form.edit-gmedia').on('change', ':input', function () {
            if(jQuery(this).hasClass('edit-gmedia-ignore')){
                return;
            }
            jQuery('body').addClass('gmedia-busy');
            var post_data = {
                action: 'gmedia_update_data', data: jQuery(this).closest('form').serialize(), _wpnonce: jQuery('#_wpnonce').val()
            };
            jQuery.post(ajaxurl, post_data, function (data, textStatus, jqXHR) {
                console.log(data);
                var item = jQuery('#list-item-' + data.ID);
                item.find('.modified').text(data.modified);
                //noinspection JSUnresolvedVariable
                item.find('.status-album').attr('class', 'form-group status-album bg-status-' + data.album_status);
                item.find('.status-item').attr('class', 'form-group status-item bg-status-' + data.status);
                if (data.tags) {
                    item.find('.gmedia_tags_input').val(data.tags);
                }
                //noinspection JSUnresolvedVariable
                if (data.meta_error) {
                    jQuery.each(data.meta_error, function (i, err) {
                        console.log(err);
                        alert(err.meta_key + ': ' + err.message);
                        if (err.meta_value) {
                            jQuery('.gm-custom-field-' + err.meta_id).val(err.meta_value);
                        }
                    });
                }
                jQuery('body').removeClass('gmedia-busy');
            });
        });

        gmedia_DOM.on('click', '.gm-toggle-cb', function (e) {
            var checkBoxes = jQuery(this).attr('href');
            jQuery(checkBoxes + ' :checkbox').each(function () {
                jQuery(this).prop("checked", !jQuery(this).prop("checked"));
            });
            e.preventDefault();
        });
        jQuery('.linkblock').on('click', '[data-href]', function () {
            window.location.href = jQuery(this).data('href');
        });

        jQuery('.gmedia-import').click(function () {
            jQuery('#import-action').val(jQuery(this).attr('name'));
            jQuery('#importModal').modal({
                backdrop: 'static',
                show: true,
                keyboard: false
            }).one('shown.bs.modal', function () {
                jQuery('#import_form').submit();
            }).one('hidden.bs.modal', function () {
                var btn = jQuery('#import-done');
                btn.text(btn.data('reset-text')).prop('disabled', true);
                jQuery('#import_window').attr('src', 'about:blank');
            });
        });

        jQuery('#gmedia_modules').on('click', '.module_install', function (e) {
            e.preventDefault();
            jQuery('body').addClass('gmedia-busy');
            var module = jQuery(this).data('module');
            var btn = jQuery('.module_install').filter('[data-module="' + module + '"]');
            btn.text(btn.data('loading-text'));
            var post_data = {
                action: 'gmedia_module_install', download: jQuery(this).attr('href'), module: module, _wpnonce: jQuery('#_wpnonce').val()
            };
            var pathname = window.location.href;
            jQuery.post(ajaxurl, post_data, function (data, status, xhr) {
                jQuery('#gmedia_modules').load(pathname + ' #gmedia_modules > *').before(data);
                jQuery('body').removeClass('gmedia-busy');
            });
        });

        jQuery('form').on('keydown', ':input:visible:not(:submit,:button,:reset,textarea)', function (e) {
            var charCode = e.charCode || e.keyCode || e.which;
            if (13 == charCode && !jQuery(this).parent().hasClass('selectize-input')) {
                var inputs = jQuery(this).parents("form").eq(0).find(":input:visible");
                var inp = inputs[inputs.index(this) + 1];
                if (inp !== null) {
                    jQuery(inp).focus();
                    var inp_type = jQuery(this).attr('type');
                    if (!!inp_type && (inp_type == 'text' || inp_type == 'number')) {
                        inp.setSelectionRange(0, inp.value.length);
                    }
                }
                e.preventDefault();
                return false;
            }
        });

        var preset_popover = function () {
            jQuery('#module_presets').popover({
                container: '#module_preset',
                content: function () {
                    return jQuery('#_module_presets').html();
                },
                html: true,
                placement: 'bottom'
            }).on('show.bs.popover', function () {
                jQuery(this).addClass('active');
            }).on('hide.bs.popover', function () {
                jQuery(this).removeClass('active');
            });
        };
        preset_popover();
        jQuery('#module_preset').on('click', '.ajax-submit', function (e) {
            e.preventDefault();
            jQuery('body').addClass('gmedia-busy');
            var form = jQuery('#gmedia-edit-term');
            var post_data = form.serializeArray();
            post_data.push({name: jQuery(this).attr('name'), value: 1});
            var pathname = window.location.href;
            jQuery.post(pathname, jQuery.param(post_data), function (data, status, xhr) {
                jQuery('body').removeClass('gmedia-busy');
                data = jQuery(data).find('#gmedia-container');
                jQuery('#gm-message').append(jQuery('#gm-message', data).html());
                jQuery('#save_buttons').html(jQuery('#save_buttons', data).html());
                jQuery('#save_buttons_duplicate').html(jQuery('#save_buttons_duplicate', data).html());
                jQuery('#module_preset').html(jQuery('#module_preset', data).html());
                preset_popover();
            });
        });
        jQuery('body').on('click', function (e) {
            if (jQuery(e.target).data('toggle') !== 'popover'
                && jQuery(e.target).parents('.popover.in').length === 0) {
                jQuery('[data-toggle="popover"]').popover('hide');
            }
        });

        jQuery('#module_preset, .module_presets').on('click', '.delpreset span', function () {
            jQuery('body').addClass('gmedia-busy');
            var module_preset = this;
            var preset_item_li = jQuery(this).closest('li');
            var preset_id = jQuery(this).data('id');
            var post_data = {
                action: 'gmedia_module_preset_delete', preset_id: preset_id, _wpnonce: jQuery('#_wpnonce').val()
            };
            jQuery.post(ajaxurl, post_data, function (data, status, xhr) {
                if (data.error) {
                    jQuery('#gm-message').append(data.error);
                } else {
                    preset_item_li.remove();
                    if('module_presets_list' !== jQuery(this).attr('id')) {
                        var _module_presets = jQuery('#module_preset').find('.popover-content').html();
                        jQuery('#_module_presets').replaceWith('<script type="text/html" id="_module_presets">' + _module_presets + '</script>');
                    }
                }
                jQuery('body').removeClass('gmedia-busy');
            });
        });

        if (jQuery(".panel-fixed-header").length) {
            setPanelHeadersWidth();
            setTimeout(function () {
                setPanelHeadersWidth();
            }, 800);
            jQuery(window).resize(function () {
                setPanelHeadersWidth();
            });
            jQuery('#collapse-menu').click(function () {
                setTimeout(function () {
                    setPanelHeadersWidth();
                }, 10);
            });

            jQuery(window).scroll(function () {
                UpdatePanelHeaders();
                /*clearTimeout(jQuery.data(this, 'scrollTimer'));
                 jQuery.data(this, 'scrollTimer', setTimeout(function() {
                 UpdatePanelHeaders();
                 console.log("Haven't scrolled in 250ms!");
                 }, 250));*/
            }).trigger("scroll");
        }

    }
};



window.closeModal = function(id) {
    jQuery('#' + id).modal('hide');
};




/*
 * jQuery functions for GRAND Flash Media
 */
var gmedia_DOM;
jQuery(function ($) {
    gmedia_DOM = $('#gmedia-container');

    GmediaSelect.init();
    GmediaFunction.init();
    GmediaLibrary.init();
    GmediaAddMedia.init();
    GmediaTerms.init();

});

function convertInputsToJSON(form) {
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function () {
        json[this.name] = this.value || '';
    });

    return json;
}

function gm_parse_query(s) {
    var j = {},
        res = s.split(/&/gm).map(function(e) {
            var o = e.split(/=/),
                pt = j;
            if(typeof o[1] == 'undefined'){
                o[1] = '';
            }
            o[0].replace(/^(\w+)\[([^&]*)\]/, '$1][$2').split(/\]\[/).map(function(e, i, a) {
                if(e === ''){
                    e = Object.keys(pt).length;
                }
                pt = (pt[e] = pt[e] || (i == a.length - 1 ? decodeURIComponent(o[1].replace(/\+/,' ')) : {}));
            });
        });
    return j;
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getStorage(keyPprefix) {
    // use document.cookie:
    return {
        set: function (id, data) {
            document.cookie = keyPprefix + id + '=' + encodeURIComponent(data);
        },
        get: function (id) {
            var cookies = document.cookie, parsed = {};
            cookies.replace(/([^=]+)=([^;]*);?\s*/g, function (whole, key, value) {
                parsed[key] = decodeURIComponent(value);
            });
            return parsed[keyPprefix + id];
        }
    };
}

/*
 function gmHashCode(str){
 var l = str.length,
 hash = 5381 * l * (str.charCodeAt(0) + l);
 for(var i = 0; i < str.length; i++){
 hash += Math.floor((str.charCodeAt(i) + i + 0.33) / (str.charCodeAt(l - i - 1) + l) + (str.charCodeAt(i) + l) * (str.charCodeAt(l - i - 1) + i + 0.33));
 }
 return hash;
 }
 function gmCreateKey(site, lic, uuid){
 if(!lic){
 lic = '0:lk';
 }
 if(!uuid){
 uuid = 'xyxx-xxyx-xxxy';
 }
 var d = gmHashCode((site + ':' + lic).toLowerCase());
 var p = d;
 uuid = uuid.replace(/[xy]/g, function(c){
 var r = d % 16 | 0, v = c == 'x'? r : (r & 0x7 | 0x8);
 d = Math.floor(d * 15 / 16);
 return v.toString(16);
 });
 var key = p + ': ' + lic + '-' + uuid;
 return key.toLowerCase();
 }
 */

function UpdatePanelHeaders() {
    jQuery(".panel-fixed-header").each(function () {
        var el = jQuery(this),
            headerRow = jQuery(".panel-heading", this),
            offset = el.offset(),
            scrollTop = jQuery(window).scrollTop(),
            floatingHeader = "panel-floatingHeader",
            absoluteHeader = "panel-absoluteHeader",
            pad_top = jQuery('#wpadminbar').height();

        if ((scrollTop > offset.top - pad_top) && (scrollTop < offset.top - pad_top + (el.height() - headerRow.outerHeight(false)) + 4)) {
            el.addClass(floatingHeader).removeClass(absoluteHeader);
        } else if (scrollTop > (offset.top - pad_top + (el.height() - headerRow.outerHeight(false)))) {
            el.addClass(absoluteHeader).removeClass(floatingHeader);
        } else {
            el.removeClass(absoluteHeader + ' ' + floatingHeader)
        }
    });
}

function setPanelHeadersWidth() {
    jQuery(".panel-fixed-header").each(function () {
        var headerRow = jQuery(".panel-heading", this);
        headerRow.css("width", jQuery(this).innerWidth());
        jQuery(".panel-heading-fake", this).height(headerRow.outerHeight());
    });
}
