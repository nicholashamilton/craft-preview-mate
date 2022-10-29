/**
 * PreviewMate plugin for Craft CMS
 *
 * PreviewMate JS
 *
 * @author    Nicholas Hamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 * @link      https://github.com/nicholashamilton
 * @package   PreviewMate
 * @since     1.0.0
 */

/** global: jQuery */
/** global: Craft */
/** global: Garnish */

(function ($) {
    if (!Craft) return;

    Craft.PreviewMate = {
        settings: {},
        lpEditorContainer: null,
        lpDevicePreviewContainer: null,
        dpcIframeElement: null,

        firstCheck: function() {
            Craft.PreviewMate.init();

            if (!Craft.PreviewMate.hasPreviewButton()) {
                Craft.PreviewMate.clearPreviewModuleChecker();
                return;
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
            Craft.PreviewMate.lpDevicePreviewContainer = document.querySelector(".lp-device-preview-container");

            if (!Craft.PreviewMate.lpEditorContainer || !Craft.PreviewMate.lpDevicePreviewContainer) return;

            Craft.PreviewMate.clearPreviewModuleChecker();

            Craft.PreviewMate.initPreviewModule();
        },

        async initPreviewModule() {
            Craft.PreviewMate.settings = await Craft.PreviewMate.getSettings();

            Craft.PreviewMate.initDevicePreviewIframe();

            Craft.PreviewMate.observeDevicePreviewContainer();
        },

        observeDevicePreviewContainer() {
            const observerConfig = { childList: true };

            function callback(mutationsList) {
                const hasNewChildNodes = mutationsList.length && mutationsList[0].addedNodes.length && mutationsList[0].type === "childList";
                if (!hasNewChildNodes) return;

                const recentlyAddedNode = mutationsList[0].addedNodes[0];
                const isNewNodeLivePreviewIframe = recentlyAddedNode.tagName === "IFRAME" && recentlyAddedNode.classList.contains("lp-preview");

                if (!isNewNodeLivePreviewIframe) return;

                Craft.PreviewMate.dpcIframeElement = recentlyAddedNode;

                Craft.PreviewMate.dpcIframeElement.onload = Craft.PreviewMate.handlePreviewIframeLoad;
            }

            const dpcObserver = new MutationObserver(callback);
            dpcObserver.observe(Craft.PreviewMate.lpDevicePreviewContainer, observerConfig);
        },

        initDevicePreviewIframe() {
            Craft.PreviewMate.dpcIframeElement = Craft.PreviewMate.lpDevicePreviewContainer.querySelector("iframe");

            if (!Craft.PreviewMate.dpcIframeElement) return;

            Craft.PreviewMate.attatchPreviewBlockEventListeners(Craft.PreviewMate.dpcIframeElement);
            Craft.PreviewMate.dpcIframeElement.onload = Craft.PreviewMate.handlePreviewIframeLoad;
        },

        handlePreviewIframeLoad(e) {
            Craft.PreviewMate.dpcIframeElement = e.currentTarget;

            Craft.PreviewMate.attatchPreviewBlockEventListeners(Craft.PreviewMate.dpcIframeElement);
        },

        attatchPreviewBlockEventListeners(iframe) {
            Craft.PreviewMate.settings.matrixFields.forEach((field) => {
                if (typeof field.handle !== "string") return;
                const matrixHandle = field.handle;
                const editorBlocksQuery = Craft.PreviewMate.getEditorBlocksQuerySelectorString(matrixHandle, field.excludeBlocks);
                const previewBlocksQuery = Craft.PreviewMate.getPreviewBlocksQueryString(matrixHandle);

                const editorBlocks = Craft.PreviewMate.lpEditorContainer.querySelectorAll(editorBlocksQuery);
                const previewBlocks = iframe.contentWindow.document.body.querySelectorAll(previewBlocksQuery);

                if (editorBlocks.length !== previewBlocks.length) return;

                previewBlocks.forEach(function(preview_block, i) {
                    editorBlocks[i].style.scrollMargin = "60px";

                    preview_block.addEventListener("click", function () {
                        editorBlocks[i].scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    });

                    preview_block.addEventListener("mouseenter", function () {
                        preview_block.classList.add("is-hovering");
                        editorBlocks[i].style.border = "2px solid #9ba3b5";
                    });
            
                    preview_block.addEventListener("mouseleave", function () {
                        preview_block.classList.remove("is-hovering");
                        editorBlocks[i].style.border = "2px solid transparent";
                    });
                });
            });
        },

        getEditorBlocksQuerySelectorString(matrixHandle, excludeBlocks) {
            let editorMatrixQuery = ".matrix.matrix-field#fields-" + matrixHandle + " .blocks div.matrixblock:not(.disabled):not(.superTableMatrix)";
            if (Array.isArray(excludeBlocks) && excludeBlocks.length) {
                excludeBlocks.forEach(blockHandle => {
                    if (typeof blockHandle === "string") {
                        editorMatrixQuery += ":not([data-type='" + blockHandle + "'])";
                    }
                });
            }
            return editorMatrixQuery;
        },

        getPreviewBlocksQueryString(matrixHandle) {
            return "[preview-block='" + matrixHandle + "']";
        },

        hasPreviewButton() {
            const previewBtn = document.querySelector('.preview-btn');
            return previewBtn ? true : false;
        },

        async getSettings() {
            const settingsResponse = {
                enableEditorMenu: false,
                editorMenuMatrixActions: [],
                matrixFields: [],
            };
            try {
                const res = await fetch(window.location.origin + "/preview-mate/api/get-settings", {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    credentials: "include",
                });
                const data = await res.json();
                if (Array.isArray(data.matrixFields)) {
                    settingsResponse.matrixFields = data.matrixFields;
                }
            }
            catch (error) {
                console.log(error);
            }
            return settingsResponse;
        },
    };

})(jQuery);