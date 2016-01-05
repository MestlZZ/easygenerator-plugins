(function (review) {
    'use strict';

    review.GeneralReviewDialog = function (reviewService, hintController) {
        var constants = review.constants,
            commentForm = new review.CommentForm(reviewService),
            $dialog = $(review.htmlMarkupProvider.getHtmlMarkup('{{generalReviewDialog.html}}')),
            expandCollapseBtn = new review.controls.Button($dialog, constants.selectors.commentsHeader),
            dialog = {
                show: show
            };

        $dialog.find(constants.selectors.addCommentForm).replaceWith(commentForm.$element);
        expandCollapseBtn.click(toggleSize);

        return dialog;

        function show() {
            $dialog.appendTo(constants.selectors.body);
            commentForm.init();
        }

        function toggleSize() {
            var isExpanded = $dialog.hasClass(constants.css.expanded);
            $dialog.toggleClass(constants.css.expanded);

            if (!isExpanded) {
                commentForm.init();
                if (hintController.isGeneralReviewHintShown()) {
                    hintController.hideGeneralReviewHint();
                }
            }
        }
    };
})(window.review = window.review || {});