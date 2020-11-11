const showModal = () => $('.ui.modal').modal('show');
const hideModal = () => $('.ui.modal').modal('hide');

$('.ui.modal').modal({
    closable: false,
    onDeny: function () {
        console.log('Cancel editting best choice settings');
        revertBestChoiceSettings();
    },
    onApprove: function () {
        console.log('Save best choice settings');
        saveBestChoiceSettings();
        filterTrails();
    }
});

function revertBestChoiceSettings() {
    configureModalContent();
}

function saveBestChoiceSettings() {
    saveBestChoiceSwitch();
    saveUserMood();
}

function saveBestChoiceSwitch() {
    const bestChoiceSwitch = document.getElementById('best_choice_switch');
    sessionStorage.setItem('bestChoiceIsEnabled', JSON.stringify(bestChoiceSwitch.checked));
}

function saveUserMood() {
    const selectedMood = document.querySelector('#best_choice_options > select').value;
    sessionStorage.setItem('userMood', selectedMood);
}

function configureModalContent() {
    configureBestChoiceSwitch();
    configureBestChoiceOptions();
}

function configureBestChoiceSwitch() {
    const bestChoiceSwitch = document.getElementById('best_choice_switch');

    if (bestChoiceIsEnabled()) {
        bestChoiceSwitch.checked = true;
    } else {
        bestChoiceSwitch.checked = false;
    }

    bestChoiceSwitch.addEventListener('change', event => {
        if (event.target.checked) {
            showBestChoiceOptions();
        } else {
            hideBestChoiceOptions();
        }
    });
}

function configureBestChoiceOptions() {
    if (bestChoiceIsEnabled()) {
        showBestChoiceOptions();
        loadUserMood();
    } else {
        hideBestChoiceOptions();
    }
}

function bestChoiceIsEnabled() {
    return JSON.parse(sessionStorage.getItem('bestChoiceIsEnabled'));
}

function loadUserMood() {
    const userMood = sessionStorage.getItem('userMood');
    if (userMood) {
        const selectBox = document.querySelector('#best_choice_options > select');
        selectBox.value = userMood; 
    }
}

function showBestChoiceOptions() {
    const bestChoiceOptions = document.getElementById('best_choice_options');
    bestChoiceOptions.hidden = false;
}

function hideBestChoiceOptions() {
    const bestChoiceOptions = document.getElementById('best_choice_options');
    bestChoiceOptions.hidden = true;
}

/** entry point of this js file */
configureModalContent();
