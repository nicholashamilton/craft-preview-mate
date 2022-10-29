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

    Craft.PM = {
        settings: {},
        lpEditorContainer: null,
        lpDevicePreviewContainer: null,
        dpcIframeElement: null,

        firstCheck: function() {
            Craft.PM.init();
        },

        previewModuleChecker: setInterval(function () {
            Craft.PM.init();
        }, 1500),

        clearPreviewModuleChecker() {
            clearInterval(Craft.PM.previewModuleChecker);
        },

        init() {
            if (!Craft.PM.hasPreviewButton()) {
                Craft.PM.clearPreviewModuleChecker();
                return;
            }

            Craft.PM.lpEditorContainer = document.querySelector('.lp-editor-container');
            Craft.PM.lpDevicePreviewContainer = document.querySelector(".lp-device-preview-container");

            if (!Craft.PM.lpEditorContainer || !Craft.PM.lpDevicePreviewContainer) return;

            Craft.PM.clearPreviewModuleChecker();

            Craft.PM.initPreviewModule();
        },

        async initPreviewModule() {
            Craft.PM.settings = await Craft.PM.getSettings();

            Craft.PM.initDevicePreviewIframe();

            Craft.PM.observeDevicePreviewContainer();
        },

        observeDevicePreviewContainer() {
            const observerConfig = { childList: true };

            function callback(mutationsList) {
                const hasNewChildNodes = mutationsList.length && mutationsList[0].addedNodes.length && mutationsList[0].type === "childList";
                if (!hasNewChildNodes) return;

                const recentlyAddedNode = mutationsList[0].addedNodes[0];
                const isNewNodeLivePreviewIframe = recentlyAddedNode.tagName === "IFRAME" && recentlyAddedNode.classList.contains("lp-preview");

                if (!isNewNodeLivePreviewIframe) return;

                Craft.PM.dpcIframeElement = recentlyAddedNode;

                Craft.PM.dpcIframeElement.onload = Craft.PM.handlePreviewIframeLoad;
            }

            const dpcObserver = new MutationObserver(callback);
            dpcObserver.observe(Craft.PM.lpDevicePreviewContainer, observerConfig);
        },

        initDevicePreviewIframe() {
            Craft.PM.dpcIframeElement = Craft.PM.lpDevicePreviewContainer.querySelector("iframe");

            if (!Craft.PM.dpcIframeElement) return;

            Craft.PM.attatchPreviewBlockEventListeners(Craft.PM.dpcIframeElement);
            Craft.PM.dpcIframeElement.onload = Craft.PM.handlePreviewIframeLoad;
        },

        handlePreviewIframeLoad(e) {
            Craft.PM.dpcIframeElement = e.currentTarget;

            Craft.PM.attatchPreviewBlockEventListeners(Craft.PM.dpcIframeElement);
        },

        attatchPreviewBlockEventListeners(iframe) {
            Craft.PM.settings.matrixFields.forEach((field) => {
                if (typeof field.handle !== "string") return;
                const matrix_handle = field.handle;

                let editorMatrixQuery = ".matrix.matrix-field#fields-" + matrix_handle + " .blocks div.matrixblock:not(.disabled):not(.superTableMatrix)";
                if (Array.isArray(field.excludeBlocks) && field.excludeBlocks.length) {
                    field.excludeBlocks.forEach(blockHandle => {
                        if (typeof blockHandle === "string") {
                            editorMatrixQuery += ":not([data-type='" + blockHandle + "'])";
                        }
                    });
                }

                const editorBlocks = Craft.PM.lpEditorContainer.querySelectorAll(editorMatrixQuery);
                const previewBlocks = iframe.contentWindow.document.body.querySelectorAll("[preview-block='" + matrix_handle + "']");
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