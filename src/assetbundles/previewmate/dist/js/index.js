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

            Craft.PreviewMate.attachPreviewBlockEventListeners(Craft.PreviewMate.dpcIframeElement);
        },

        attachPreviewBlockEventListeners(iframe) {
            const previewBlocks = iframe.contentWindow.document.body.querySelectorAll('[data-preview-block-id]');

            const editorTabsContainer = Craft.PreviewMate.lpEditorContainer.querySelector('.lp-toolbar .pane-tabs');
            const hasEditorTabs = !!editorTabsContainer && editorTabsContainer.children.length > 0;

            previewBlocks.forEach(function (previewBlock) {

                const editorBlock = Craft.PreviewMate.lpEditorContainer.querySelector(`[data-id="${previewBlock.dataset.previewBlockId}"]`);
                if (!editorBlock) return;

                previewBlock.addEventListener('click', function () {

                    if (hasEditorTabs) {
                        // Select the editor tab corresponding to this editor block
                        Craft.PreviewMate.selectEditorTab(editorBlock, editorTabsContainer);
                    }

                    // Scroll editor block into view
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

        selectEditorTab(editorBlock, editorTabsContainer) {
            try {
                const tabPanel = editorBlock.closest('[role="tabpanel"]');
                const tabId = tabPanel.getAttribute('aria-labelledby');
                const tab = editorTabsContainer.querySelector(`#${tabId}`);
                if (tab.getAttribute('aria-selected') !== 'true') {
                    tab.click();
                }
            } catch (error) {
                console.error('Preview Mate: Error updating selected editor tab:', error);
            }
        },

        hasPreviewButton() {
            return document.querySelector('.preview-btn') ? true : false;
        },
    };

    Craft.PreviewMate.onMount();
})(jQuery);
