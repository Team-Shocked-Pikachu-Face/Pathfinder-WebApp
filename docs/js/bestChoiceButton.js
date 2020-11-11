function configureBestChoiceButton() {
    const bestChoiceButton = document.querySelector('#best_choice_feature > button');
    if (sessionStorage.userProfile) {
        bestChoiceButton.disabled = false;
    } else {
        bestChoiceButton.disabled = true;
        // If the user has not calculated fitness level yet, show the link to the calculation page.
        const guideToCalculator = document.querySelector('#best_choice_feature > p');
        guideToCalculator.hidden = false;
    }
};

/** entry point of this js file */
configureBestChoiceButton();
