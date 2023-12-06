function getSectionId(element) {
    while (element && element.tagName !== 'SECTION') {
        element = element.parentNode;
    }

    if (element && element.tagName === 'SECTION') {
        return element.id;
    }

    return null;
};

document.addEventListener('click', function (event) {
    // console.log(event.target.tagName);
    if (event.target.tagName === 'H2') {
        var sectionId = getSectionId(event.target);

        // console.log(sectionId);

        if (sectionId) {
            window.location = `${window.location.origin}/#${sectionId}`;
        }
    }
});
