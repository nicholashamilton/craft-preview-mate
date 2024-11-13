/** global: jQuery */
/** global: Craft */
/** global: Garnish */

(function ($) {
    if (!Craft) return;

    Craft.PreviewMate = {
        lpEditorContainer: null,
        lpDevicePreviewContainer: null,
        dpcIframeElement: null,

        onMount() {
            if (!Craft.PreviewMate.hasPreviewButton()) {
                Craft.PreviewMate.clearPreviewModuleChecker();
            }
        },

        previewModuleChecker: setInterval(function () {
            Craft.PreviewMate.init();
        }, 1500),

        clearPreviewModuleChecker() {
            clearInterval(Craft.PreviewMate.previewModuleChecker);
        },

        init() {
            Craft.PreviewMate.lpEditorContainer = document.querySelector('.lp-editor-container');
            Craft.PreviewMate.lpDevicePreviewContainer = document.querySelector('.lp-device-preview-container');

            if (!Craft.PreviewMate.lpEditorContainer || !Craft.PreviewMate.lpDevicePreviewContainer) return;

            Craft.PreviewMate.clearPreviewModuleChecker();

            Craft.PreviewMate.initPreviewModule();
        },

        async initPreviewModule() {
            Craft.PreviewMate.observeLpDpc();
            Craft.PreviewMate.findDpcIframe();
        },

        registerDpcIframe(iframe) {
            Craft.PreviewMate.dpcIframeElement = iframe;

            Craft.PreviewMate.dpcIframeElement.onload = Craft.PreviewMate.handleDpcIframeOnLoadEvent;
            Craft.PreviewMate.handleDpcIframeOnLoadEvent({ currentTarget: Craft.PreviewMate.dpcIframeElement });
        },

        observeLpDpc() {
            const observerConfig = { childList: true };

            function onDpcRender(mutationsList) {
                const hasNewChildNodes = mutationsList.length && mutationsList[0].addedNodes.length && mutationsList[0].type === "childList";
                if (!hasNewChildNodes) return;

                const recentlyAddedNode = mutationsList[0].addedNodes[0];
                const isNewNodeLivePreviewIframe = recentlyAddedNode.tagName === "IFRAME" && recentlyAddedNode.classList.contains("lp-preview");

                if (!isNewNodeLivePreviewIframe) return;

                Craft.PreviewMate.registerDpcIframe(recentlyAddedNode);
            }

            const dpcObserver = new MutationObserver(onDpcRender);
            dpcObserver.observe(Craft.PreviewMate.lpDevicePreviewContainer, observerConfig);
        },

        findDpcIframe() {
            const dpcIframeElement = Craft.PreviewMate.lpDevicePreviewContainer.querySelector('iframe');

            if (!dpcIframeElement) return;

            Craft.PreviewMate.registerDpcIframe(dpcIframeElement);
        },

        handleDpcIframeOnLoadEvent(e) {
            Craft.PreviewMate.dpcIframeElement = e.currentTarget;

            Craft.PreviewMate.attatchPreviewBlockEventListeners(Craft.PreviewMate.dpcIframeElement);
        },

        attatchPreviewBlockEventListeners(iframe) {
            const previewBlocks = iframe.contentWindow.document.body.querySelectorAll('[preview-block-id]');
            const tabPanel = Craft.PreviewMate.lpEditorContainer.querySelector('.pane-tabs');
            previewBlocks.forEach(function (previewBlock) {
                const editorBlock = Craft.PreviewMate.lpEditorContainer.querySelector(`[data-id="${previewBlock.getAttribute('preview-block-id')}"]`);
                if (!editorBlock) return;
                previewBlock.addEventListener('click', function () {
                    //Preview Tabs
                    const editorBlockPanel = editorBlock.closest('.flex-fields[role="tabpanel"]');
                    const hiddenBlockPanels = Craft.PreviewMate.lpEditorContainer.querySelectorAll('.flex-fields.hidden[role="tabpanel"]');
                    // If the block is in a hidden tab panel, switch to that tab.
                    // Otherwise scroll the block into view
                    if (Array.from(hiddenBlockPanels).includes(editorBlockPanel)) {
                        const correspondingTabId = editorBlockPanel.id.replace('-', '-tab-');
                        const targetTab = tabPanel.querySelector(`#${correspondingTabId}`);
                        if (targetTab) {
                            targetTab.click();
                        }
                    }
                    // Bring the editor block into view with smooth scrolling
                    editorBlock.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                });

                previewBlock.addEventListener('mouseenter', function () {
                    previewBlock.classList.add('preview-block-hover');
                    editorBlock.style.border = '1px dashed #9ba3b5';
                });

                previewBlock.addEventListener('mouseleave', function () {
                    previewBlock.classList.remove('preview-block-hover');
                    editorBlock.style.border = '1px dashed transparent';
                });
            });
        },

        hasPreviewButton() {
            return document.querySelector('.preview-btn') ? true : false;
        },
    };

    Craft.PreviewMate.onMount();
})(jQuery);
